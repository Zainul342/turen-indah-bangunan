/**
 * Cart Sync API Route
 * =====================
 * POST /api/cart/sync - Sync cart from client to Firestore
 *
 * @file src/app/api/cart/sync/route.ts
 * @project Turen Indah Bangunan
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminDb, getAdminAuth } from '@/lib/firebase/admin';
import { z } from 'zod';
import type { CartItem } from '@/types/cart';
import { mergeCarts, calculateCartTotals } from '@/lib/cart-utils';

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

        const { items } = parseResult.data;
        const sessionCookie = sessionToken;
        const decodedClaims = await getAdminAuth().verifySessionCookie(sessionCookie, true);
        const userId = decodedClaims.uid;
        const db = getAdminDb();

        // 3. Fetch Existing Cart
        const cartDocRef = db.collection('carts').doc(userId);
        const cartDoc = await cartDocRef.get();

        let existingItems: CartItem[] = [];
        if (cartDoc.exists) {
            const data = cartDoc.data();
            existingItems = (data?.items as CartItem[]) || [];
        }

        // 4. SECURITY: Fetch latest prices from Products Collection
        // Collect all Product IDs from both existing and guest items
        const allProductIds = new Set([
            ...existingItems.map(i => i.productId),
            ...items.map(i => i.productId)
        ]);

        const priceMap = new Map<string, number>();

        // Optimized: For now, let's just fetch individual docs in parallel. 
        const productRefs = Array.from(allProductIds).map(id => db.collection('products').doc(id));
        const productSnapshots = await db.getAll(...productRefs);

        productSnapshots.forEach(snap => {
            if (snap.exists) {
                const data = snap.data();
                if (data?.price) {
                    priceMap.set(snap.id, Number(data.price));
                }
            }
        });

        // 5. Merge Logic with Price Validation
        const finalItems = mergeCarts(existingItems, items, priceMap);

        // 6. Recalculate Totals
        const { itemCount, subtotal } = calculateCartTotals(finalItems);

        // 7. Save Merged Cart
        await cartDocRef.set(
            {
                userId,
                items: finalItems,
                itemCount,
                subtotal,
                updatedAt: new Date(),
            },
            { merge: true }
        );

        return NextResponse.json({
            success: true,
            message: 'Cart sync merged successfully',
            data: {
                items: finalItems,
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
