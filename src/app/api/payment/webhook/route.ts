/**
 * Payment Webhook API
 * =====================
 * POST /api/payment/webhook - Handle Midtrans notification callback
 *
 * @file src/app/api/payment/webhook/route.ts
 * @project Turen Indah Bangunan
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase/admin';
import {
    verifySignature,
    mapTransactionStatus,
    type MidtransWebhookPayload,
} from '@/lib/midtrans';

// ============================================
// POST Handler
// ============================================

export async function POST(request: NextRequest) {
    try {
        // Parse payload
        const payload: MidtransWebhookPayload = await request.json();

        console.log('Midtrans webhook received:', {
            order_id: payload.order_id,
            transaction_status: payload.transaction_status,
            payment_type: payload.payment_type,
        });

        // Verify signature
        const isValid = verifySignature(payload);
        if (!isValid) {
            console.error('Invalid webhook signature');
            return NextResponse.json(
                { success: false, message: 'Invalid signature' },
                { status: 403 }
            );
        }

        const db = getAdminDb();

        // Find order by orderNumber (which is used as order_id in Midtrans)
        const ordersRef = db.collection('orders');
        const snapshot = await ordersRef
            .where('orderNumber', '==', payload.order_id)
            .limit(1)
            .get();

        if (snapshot.empty) {
            console.error('Order not found:', payload.order_id);
            return NextResponse.json(
                { success: false, message: 'Order not found' },
                { status: 404 }
            );
        }

        const orderDoc = snapshot.docs[0];
        const orderId = orderDoc.id;
        const orderData = orderDoc.data();

        // Map transaction status
        const { paymentStatus, orderStatus } = mapTransactionStatus(
            payload.transaction_status
        );

        // Prepare update data
        const updateData: Record<string, unknown> = {
            paymentStatus,
            paymentId: payload.transaction_id,
            updatedAt: new Date().toISOString(),
        };

        // Update order status if payment is settled
        if (paymentStatus === 'paid') {
            updateData.status = orderStatus;
            updateData.paidAt = new Date().toISOString();

            // Add to status history
            const statusHistory = orderData?.statusHistory || [];
            statusHistory.push({
                status: orderStatus,
                note: `Payment received via ${payload.payment_type}`,
                timestamp: new Date().toISOString(),
                updatedBy: 'system',
            });
            updateData.statusHistory = statusHistory;
        } else if (paymentStatus === 'failed') {
            updateData.status = orderStatus;

            // Add to status history
            const statusHistory = orderData?.statusHistory || [];
            statusHistory.push({
                status: orderStatus,
                note: `Payment ${payload.transaction_status}: ${payload.status_message}`,
                timestamp: new Date().toISOString(),
                updatedBy: 'system',
            });
            updateData.statusHistory = statusHistory;
        }

        // Update order
        await ordersRef.doc(orderId).update(updateData);

        console.log('Order updated:', {
            orderId,
            paymentStatus,
            orderStatus,
        });

        // Return success (Midtrans expects 200 OK)
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Webhook error:', error);
        // Still return 200 to prevent Midtrans retries for parse errors
        return NextResponse.json({ success: false, error: 'Internal error' });
    }
}
