/**
 * Cart API Route
 * ================
 * GET /api/cart - Get user's cart from Firestore
 *
 * @file src/app/api/cart/route.ts
 * @project Turen Indah Bangunan
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminDb, getAdminAuth } from '@/lib/firebase/admin';
import type { Cart, CartItem } from '@/types/cart';

// ============================================
// GET Handler - Get user's cart
// ============================================

export async function GET(request: NextRequest) {
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
                        message: 'Please login to access cart',
                    },
                },
                { status: 401 }
            );
        }

        const sessionCookie = sessionToken;
        const decodedClaims = await getAdminAuth().verifySessionCookie(sessionCookie, true);
        const userId = decodedClaims.uid;
        const db = getAdminDb();

        // Get cart document
        const cartDoc = await db.collection('carts').doc(userId).get();

        if (!cartDoc.exists) {
            // Return empty cart if not exists
            const emptyCart: Cart = {
                items: [],
                itemCount: 0,
                subtotal: 0,
                updatedAt: new Date().toISOString(),
            };

            return NextResponse.json({
                success: true,
                data: emptyCart,
            });
        }

        const cartData = cartDoc.data();
        const items: CartItem[] = cartData?.items || [];

        const cart: Cart = {
            items,
            itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
            subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
            updatedAt: cartData?.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        };

        return NextResponse.json({
            success: true,
            data: cart,
        });
    } catch (error) {
        console.error('Error fetching cart:', error);
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'Failed to fetch cart',
                },
            },
            { status: 500 }
        );
    }
}
