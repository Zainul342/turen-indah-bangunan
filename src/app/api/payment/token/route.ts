/**
 * Payment Token API
 * ==================
 * POST /api/payment/token - Create Midtrans Snap token for order
 *
 * @file src/app/api/payment/token/route.ts
 * @project Turen Indah Bangunan
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminDb } from '@/lib/firebase/admin';
import {
    createSnapTransaction,
    isMidtransConfigured,
    type MidtransItemDetail,
} from '@/lib/midtrans';
import { z } from 'zod';

// ============================================
// Validation Schema
// ============================================

const createTokenSchema = z.object({
    orderId: z.string().min(1, 'Order ID is required'),
});

// ============================================
// POST Handler
// ============================================

export async function POST(request: NextRequest) {
    try {
        // Check if Midtrans is configured
        if (!isMidtransConfigured()) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'PAYMENT_NOT_CONFIGURED',
                        message: 'Payment gateway is not configured',
                    },
                },
                { status: 503 }
            );
        }

        // Get session
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get('tib-session')?.value;

        if (!sessionToken) {
            return NextResponse.json(
                {
                    success: false,
                    error: { code: 'UNAUTHORIZED', message: 'Please login' },
                },
                { status: 401 }
            );
        }

        const userId = sessionToken;
        const db = getAdminDb();

        // Parse and validate body
        const body = await request.json();
        const parseResult = createTokenSchema.safeParse(body);

        if (!parseResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'Invalid request',
                        details: parseResult.error.errors,
                    },
                },
                { status: 400 }
            );
        }

        const { orderId } = parseResult.data;

        // Get order
        const orderDoc = await db.collection('orders').doc(orderId).get();

        if (!orderDoc.exists) {
            return NextResponse.json(
                {
                    success: false,
                    error: { code: 'NOT_FOUND', message: 'Order not found' },
                },
                { status: 404 }
            );
        }

        const orderData = orderDoc.data();

        // Verify ownership
        if (orderData?.userId !== userId) {
            return NextResponse.json(
                {
                    success: false,
                    error: { code: 'FORBIDDEN', message: 'Access denied' },
                },
                { status: 403 }
            );
        }

        // Check if already paid
        if (orderData?.paymentStatus === 'paid') {
            return NextResponse.json(
                {
                    success: false,
                    error: { code: 'ALREADY_PAID', message: 'Order is already paid' },
                },
                { status: 400 }
            );
        }

        // Build item details
        const items: MidtransItemDetail[] = orderData?.items.map((item: { productId: string; productName: string; price: number; quantity: number }) => ({
            id: item.productId,
            name: item.productName,
            price: item.price,
            quantity: item.quantity,
        })) || [];

        // Add shipping as item
        if (orderData?.shippingCost > 0) {
            items.push({
                id: 'shipping',
                name: `Shipping (${orderData.shippingMethod})`,
                price: orderData.shippingCost,
                quantity: 1,
            });
        }

        // Parse customer name
        const nameParts = (orderData?.customerName || '').split(' ');
        const firstName = nameParts[0] || 'Customer';
        const lastName = nameParts.slice(1).join(' ') || '';

        // Create Snap token
        const snapResponse = await createSnapTransaction({
            orderId: orderData?.orderNumber,
            grossAmount: orderData?.total,
            items,
            customer: {
                first_name: firstName,
                last_name: lastName,
                email: orderData?.customerEmail || '',
                phone: orderData?.customerPhone || '',
            },
        });

        // Update order with payment token (optional, for reference)
        await db.collection('orders').doc(orderId).update({
            paymentToken: snapResponse.token,
            updatedAt: new Date().toISOString(),
        });

        return NextResponse.json({
            success: true,
            data: {
                token: snapResponse.token,
                redirectUrl: snapResponse.redirect_url,
            },
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error creating payment token:', error);
        return NextResponse.json(
            {
                success: false,
                error: { code: 'INTERNAL_ERROR', message: 'Failed to create payment token' },
            },
            { status: 500 }
        );
    }
}
