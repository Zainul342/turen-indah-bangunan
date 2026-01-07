/**
 * Cart Sync API Route
 * =====================
 * POST /api/cart/sync - Sync cart from client to Firestore
 *
 * @file src/app/api/cart/sync/route.ts
 * @project Turen Indah Bangunan
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminDb, getAdminAuth } from '@/lib/firebase/admin';
import { z } from 'zod';
import type { CartItem } from '@/types/cart';

// ============================================
// Validation Schema
// ============================================

const cartItemSchema = z.object({
    productId: z.string().min(1),
    productName: z.string().min(1),
    productImage: z.string(),
    price: z.number().positive(),
    quantity: z.number().int().positive(),
    addedAt: z.string(),
});

const syncCartSchema = z.object({
    items: z.array(cartItemSchema),
});

// ============================================
// POST Handler - Sync cart to Firestore
// ============================================

// ============================================
// POST Handler - Sync cart to Firestore
// ============================================

export async function POST(request: NextRequest) {
    try {
        // Get session from cookie
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get('tib-session')?.value;

        if (!sessionToken) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'UNAUTHORIZED',
                        message: 'Please login to sync cart',
                    },
                },
                { status: 401 }
            );
        }

        // Parse and validate body
        const body = await request.json();
        const parseResult = syncCartSchema.safeParse(body);

        if (!parseResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'Invalid cart data',
                        details: parseResult.error.errors,
                    },
                },
                { status: 400 }
            );
        }

        const { items: incomingItems } = parseResult.data;
        const sessionCookie = sessionToken;
        const decodedClaims = await getAdminAuth().verifySessionCookie(sessionCookie, true);
        const userId = decodedClaims.uid;
        const db = getAdminDb();

        // 1. Fetch existing cart
        const cartRef = db.collection('carts').doc(userId);
        const cartDoc = await cartRef.get();
        let existingItems: CartItem[] = [];

        if (cartDoc.exists) {
            const data = cartDoc.data();
            existingItems = data?.items || [];
        }

        // 2. MERGE Logic
        // Use a Map to track items by productId for O(1) lookup
        const mergedItemsMap = new Map<string, CartItem>();

        // Add existing items first
        existingItems.forEach((item) => {
            mergedItemsMap.set(item.productId, { ...item });
        });

        // Merge incoming items
        incomingItems.forEach((incomingItem) => {
            if (mergedItemsMap.has(incomingItem.productId)) {
                // Item exists, sum quantity
                const existingItem = mergedItemsMap.get(incomingItem.productId)!;
                existingItem.quantity += incomingItem.quantity;
                // Update price and image to latest from client (optional, but good for sync)
                existingItem.price = incomingItem.price;
                existingItem.productImage = incomingItem.productImage;
                existingItem.productName = incomingItem.productName;
            } else {
                // New item, add to map
                mergedItemsMap.set(incomingItem.productId, { ...incomingItem });
            }
        });

        const mergedItems = Array.from(mergedItemsMap.values());

        // 3. Recalculate Totals
        const itemCount = mergedItems.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = mergedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // 4. Save to Firestore
        await cartRef.set(
            {
                userId,
                items: mergedItems,
                itemCount,
                subtotal,
                updatedAt: new Date(),
            },
            { merge: true }
        );

        return NextResponse.json({
            success: true,
            message: 'Cart synced successfully',
            data: {
                items: mergedItems,
                itemCount,
                subtotal,
                updatedAt: new Date().toISOString(),
            },
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error syncing cart:', error);
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'Failed to sync cart',
                },
            },
            { status: 500 }
        );
    }
}
