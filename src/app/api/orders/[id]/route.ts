/**
 * Order Detail API Route
 * ========================
 * GET /api/orders/[id] - Get single order detail
 *
 * @file src/app/api/orders/[id]/route.ts
 * @project Turen Indah Bangunan
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminDb } from '@/lib/firebase/admin';
import type { Order } from '@/types/order';

// ============================================
// GET Handler
// ============================================

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                {
                    success: false,
                    error: { code: 'VALIDATION_ERROR', message: 'Order ID is required' },
                },
                { status: 400 }
            );
        }

        // Get session
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get('tib-session')?.value;

        if (!sessionToken) {
            return NextResponse.json(
                {
                    success: false,
                    error: { code: 'UNAUTHORIZED', message: 'Please login to view order' },
                },
                { status: 401 }
            );
        }

        const userId = sessionToken;
        const db = getAdminDb();

        // Get order document
        const orderDoc = await db.collection('orders').doc(id).get();

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

        // Check ownership (unless admin)
        const userDoc = await db.collection('users').doc(userId).get();
        const userData = userDoc.data();
        const isAdmin = userData?.role === 'admin';

        if (orderData?.userId !== userId && !isAdmin) {
            return NextResponse.json(
                {
                    success: false,
                    error: { code: 'FORBIDDEN', message: 'Access denied' },
                },
                { status: 403 }
            );
        }

        const order: Order = {
            id: orderDoc.id,
            orderNumber: orderData?.orderNumber,
            userId: orderData?.userId,
            customerName: orderData?.customerName,
            customerEmail: orderData?.customerEmail,
            customerPhone: orderData?.customerPhone,
            items: orderData?.items || [],
            itemCount: orderData?.itemCount,
            subtotal: orderData?.subtotal,
            shippingCost: orderData?.shippingCost,
            discount: orderData?.discount || 0,
            total: orderData?.total,
            shippingAddress: orderData?.shippingAddress,
            shippingMethod: orderData?.shippingMethod,
            shippingProvider: orderData?.shippingProvider,
            trackingNumber: orderData?.trackingNumber,
            estimatedDelivery: orderData?.estimatedDelivery,
            paymentMethod: orderData?.paymentMethod,
            paymentStatus: orderData?.paymentStatus,
            paymentId: orderData?.paymentId,
            paidAt: orderData?.paidAt,
            status: orderData?.status,
            statusHistory: orderData?.statusHistory || [],
            customerNotes: orderData?.customerNotes,
            adminNotes: orderData?.adminNotes,
            createdAt: orderData?.createdAt,
            updatedAt: orderData?.updatedAt,
        };

        return NextResponse.json({
            success: true,
            data: order,
        });
    } catch (error) {
        console.error('Error fetching order:', error);
        return NextResponse.json(
            {
                success: false,
                error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch order' },
            },
            { status: 500 }
        );
    }
}
