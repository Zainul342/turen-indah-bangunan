/**
 * Checkout Validation API
 * ========================
 * Validates cart before checkout (price + stock verification).
 *
 * @file src/app/api/checkout/validate/route.ts
 * @project Turen Indah Bangunan
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAdminDb } from '@/lib/firebase/admin';
import { verifySessionCookie } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';

// ============================================
// Validation Schema
// ============================================

const validateCartSchema = z.object({
    items: z.array(
        z.object({
            productId: z.string(),
            quantity: z.number().min(1),
        })
    ),
});

// ============================================
// Route Handler
// ============================================

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { items } = validateCartSchema.parse(body);

        const db = getAdminDb();
        const validatedItems: Array<{
            productId: string;
            productName: string;
            productImage: string;
            price: number;
            quantity: number;
            subtotal: number;
            weight: number;
        }> = [];

        const errors: Array<{ productId: string; message: string }> = [];
        let totalWeight = 0;

        // Validate each item against database
        for (const item of items) {
            const productDoc = await db.collection('products').doc(item.productId).get();

            if (!productDoc.exists) {
                errors.push({
                    productId: item.productId,
                    message: 'Produk tidak ditemukan',
                });
                continue;
            }

            const product = productDoc.data();
            if (!product) {
                errors.push({
                    productId: item.productId,
                    message: 'Data produk tidak valid',
                });
                continue;
            }

            // Check stock
            if (product.stock < item.quantity) {
                errors.push({
                    productId: item.productId,
                    message: `Stok tidak cukup. Tersedia: ${product.stock}`,
                });
                continue;
            }

            // Check product status
            if (product.status !== 'active') {
                errors.push({
                    productId: item.productId,
                    message: 'Produk tidak tersedia',
                });
                continue;
            }

            // Use SERVER-SIDE price (never trust client!)
            const validatedItem = {
                productId: item.productId,
                productName: product.name,
                productImage: product.thumbnail || product.images?.[0]?.url || '',
                price: product.price, // Server-side price!
                quantity: item.quantity,
                subtotal: product.price * item.quantity,
                weight: (product.weight || 1000) * item.quantity, // Default 1kg if not specified
            };

            validatedItems.push(validatedItem);
            totalWeight += validatedItem.weight;
        }

        // Calculate totals
        const subtotal = validatedItems.reduce((sum, item) => sum + item.subtotal, 0);

        // Check if user is authenticated (for address pre-fill)
        let userId: string | null = null;
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('tib-session')?.value;
        if (sessionCookie) {
            const session = await verifySessionCookie(sessionCookie);
            userId = session?.uid || null;
        }

        return NextResponse.json({
            success: true,
            data: {
                items: validatedItems,
                subtotal,
                totalWeight,
                isValid: errors.length === 0,
                errors: errors.length > 0 ? errors : undefined,
                userId,
            },
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'Invalid request data',
                        details: error.errors,
                    },
                },
                { status: 400 }
            );
        }

        // eslint-disable-next-line no-console
        console.error('Cart validation error:', error);
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'Failed to validate cart',
                },
            },
            { status: 500 }
        );
    }
}
