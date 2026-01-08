/**
 * Create Order API
 * ==================
 * Creates order and generates Midtrans payment token.
 *
 * @file src/app/api/checkout/create-order/route.ts
 * @project Turen Indah Bangunan
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAdminDb } from '@/lib/firebase/admin';
import { verifySessionCookie } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';
import { FieldValue } from 'firebase-admin/firestore';

// ============================================
// Types
// ============================================

interface OrderItem {
    productId: string;
    productName: string;
    productImage: string;
    sku: string;
    price: number;
    quantity: number;
    subtotal: number;
}

interface MidtransTokenResponse {
    token: string;
    redirect_url: string;
}

// ============================================
// Validation Schema
// ============================================

const addressSchema = z.object({
    label: z.string(),
    recipientName: z.string().min(2),
    phone: z.string().min(10),
    province: z.string(),
    city: z.string(),
    cityId: z.string(),
    district: z.string(),
    postalCode: z.string(),
    fullAddress: z.string().min(10),
});

const createOrderSchema = z.object({
    shippingAddress: addressSchema,
    shippingMethod: z.string().min(1),
    shippingCost: z.number().min(0),
    customerNotes: z.string().max(500).optional(),
});

// ============================================
// Helper: Generate Order Number
// ============================================

function generateOrderNumber(): string {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `TIB-${dateStr}-${random}`;
}

// ============================================
// Helper: Get Midtrans Token
// ============================================

async function getMidtransToken(
    orderId: string,
    orderNumber: string,
    total: number,
    items: OrderItem[],
    shippingCost: number,
    customer: { name: string; email?: string; phone: string }
): Promise<MidtransTokenResponse | null> {
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
        // eslint-disable-next-line no-console
        console.error('Midtrans server key not configured');
        return null;
    }

    const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';
    const baseUrl = isProduction
        ? 'https://app.midtrans.com/snap/v1/transactions'
        : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

    // Prepare item details for Midtrans
    const itemDetails = items.map((item) => ({
        id: item.productId,
        name: item.productName.substring(0, 50), // Midtrans limit
        price: item.price,
        quantity: item.quantity,
    }));

    // Add shipping as line item
    if (shippingCost > 0) {
        itemDetails.push({
            id: 'SHIPPING',
            name: 'Ongkos Kirim',
            price: shippingCost,
            quantity: 1,
        });
    }

    // Midtrans request payload
    const payload = {
        transaction_details: {
            order_id: orderNumber,
            gross_amount: total,
        },
        item_details: itemDetails,
        customer_details: {
            first_name: customer.name.split(' ')[0],
            last_name: customer.name.split(' ').slice(1).join(' ') || '',
            email: customer.email || 'guest@turenindahbangunan.com',
            phone: customer.phone,
        },
        callbacks: {
            finish: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/success`,
        },
    };

    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(serverKey + ':').toString('base64')}`,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            // eslint-disable-next-line no-console
            console.error('Midtrans API error:', errorData);
            return null;
        }

        return await response.json();
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Midtrans fetch error:', error);
        return null;
    }
}

// ============================================
// Route Handler
// ============================================

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { shippingAddress, shippingMethod, shippingCost, customerNotes } =
            createOrderSchema.parse(body);

        const db = getAdminDb();

        // Get user session (optional for guest checkout)
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('tib-session')?.value;
        let userId = 'guest';
        let userEmail: string | undefined;

        if (sessionCookie) {
            const session = await verifySessionCookie(sessionCookie);
            if (session) {
                userId = session.uid;
                userEmail = session.email || undefined;
            }
        }

        // Fetch user's cart
        const cartItems: OrderItem[] = [];
        let subtotal = 0;

        if (userId !== 'guest') {
            const cartDoc = await db.collection('carts').doc(userId).get();
            if (cartDoc.exists) {
                const cartData = cartDoc.data();
                if (cartData?.items) {
                    // Validate prices from products collection
                    for (const item of cartData.items) {
                        const productDoc = await db.collection('products').doc(item.productId).get();
                        const product = productDoc.data();

                        if (product && product.status === 'active' && product.stock >= item.quantity) {
                            const validatedItem: OrderItem = {
                                productId: item.productId,
                                productName: product.name,
                                productImage: product.thumbnail || '',
                                sku: product.sku || item.productId,
                                price: product.price, // Server-side price!
                                quantity: item.quantity,
                                subtotal: product.price * item.quantity,
                            };
                            cartItems.push(validatedItem);
                            subtotal += validatedItem.subtotal;
                        }
                    }
                }
            }
        }

        // For guests, we'd need items passed in the request (simplified for MVP)
        if (cartItems.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'EMPTY_CART',
                        message: 'Keranjang belanja kosong',
                    },
                },
                { status: 400 }
            );
        }

        // Calculate total
        const total = subtotal + shippingCost;

        // Generate order number
        const orderNumber = generateOrderNumber();

        // Create order document
        const orderData = {
            orderNumber,
            userId,
            customerName: shippingAddress.recipientName,
            customerEmail: userEmail || null,
            customerPhone: shippingAddress.phone,
            items: cartItems,
            itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
            subtotal,
            shippingCost,
            discount: 0,
            total,
            shippingAddress,
            shippingMethod,
            shippingProvider: (shippingMethod.split('_')[0] || 'UNKNOWN').toUpperCase(),
            trackingNumber: null,
            estimatedDelivery: null,
            paymentMethod: 'midtrans',
            paymentStatus: 'pending',
            paymentId: null,
            paidAt: null,
            status: 'pending_payment',
            statusHistory: [
                {
                    status: 'pending_payment',
                    timestamp: FieldValue.serverTimestamp(),
                    updatedBy: 'system',
                },
            ],
            customerNotes: customerNotes || null,
            adminNotes: null,
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
        };

        const orderRef = await db.collection('orders').add(orderData);
        const orderId = orderRef.id;

        // Get Midtrans payment token
        const midtransResult = await getMidtransToken(
            orderId,
            orderNumber,
            total,
            cartItems,
            shippingCost,
            {
                name: shippingAddress.recipientName,
                email: userEmail,
                phone: shippingAddress.phone,
            }
        );

        if (!midtransResult) {
            // Delete order if payment token generation fails
            await orderRef.delete();
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'PAYMENT_ERROR',
                        message: 'Gagal membuat token pembayaran',
                    },
                },
                { status: 500 }
            );
        }

        // Update order with payment ID
        await orderRef.update({
            paymentId: midtransResult.token,
        });

        // Clear user's cart after successful order creation
        if (userId !== 'guest') {
            await db.collection('carts').doc(userId).delete();
        }

        return NextResponse.json({
            success: true,
            data: {
                orderId,
                orderNumber,
                total,
                paymentToken: midtransResult.token,
                redirectUrl: midtransResult.redirect_url,
            },
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'Data tidak valid',
                        details: error.errors,
                    },
                },
                { status: 400 }
            );
        }

        // eslint-disable-next-line no-console
        console.error('Create order error:', error);
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'Gagal membuat pesanan',
                },
            },
            { status: 500 }
        );
    }
}
