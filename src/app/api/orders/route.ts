/**
 * Orders API Route
 * ==================
 * POST /api/orders - Create new order
 * GET /api/orders - Get user's order history
 *
 * @file src/app/api/orders/route.ts
 * @project Turen Indah Bangunan
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminDb, getAdminAuth } from '@/lib/firebase/admin';
import { createOrderSchema } from '@/schemas/order.schema';
import type { Order, OrderItem, OrderListItem, StatusHistory } from '@/types/order';
import type { CartItem } from '@/types/cart';

// ============================================
// Helper Functions
// ============================================

/**
 * Generate order number: TIB-YYYYMMDD-XXX
 */
async function generateOrderNumber(db: FirebaseFirestore.Firestore): Promise<string> {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
    const prefix = `TIB-${dateStr}`;

    // Get today's order count
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const ordersRef = db.collection('orders');
    const snapshot = await ordersRef
        .where('createdAt', '>=', startOfDay)
        .where('createdAt', '<=', endOfDay)
        .count()
        .get();

    const count = snapshot.data().count + 1;
    const orderNumber = `${prefix}-${String(count).padStart(3, '0')}`;

    return orderNumber;
}

/**
 * Convert cart items to order items
 */
function cartItemsToOrderItems(cartItems: CartItem[]): OrderItem[] {
    return cartItems.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        productImage: item.productImage,
        sku: '', // Will be fetched from product if needed
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
    }));
}

// ============================================
// POST Handler - Create Order
// ============================================

export async function POST(request: NextRequest) {
    try {
        // Get session
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get('tib-session')?.value;

        if (!sessionToken) {
            return NextResponse.json(
                {
                    success: false,
                    error: { code: 'UNAUTHORIZED', message: 'Please login to create order' },
                },
                { status: 401 }
            );
        }

        const sessionCookie = sessionToken;
        const decodedClaims = await getAdminAuth().verifySessionCookie(sessionCookie, true);
        const userId = decodedClaims.uid;
        const db = getAdminDb();

        // Parse and validate body
        const body = await request.json();
        const parseResult = createOrderSchema.safeParse(body);

        if (!parseResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'Invalid order data',
                        details: parseResult.error.errors,
                    },
                },
                { status: 400 }
            );
        }

        const input = parseResult.data;

        // Get user's cart
        const cartDoc = await db.collection('carts').doc(userId).get();
        if (!cartDoc.exists) {
            return NextResponse.json(
                {
                    success: false,
                    error: { code: 'CART_EMPTY', message: 'Cart is empty' },
                },
                { status: 400 }
            );
        }

        const cartData = cartDoc.data();
        const cartItems: CartItem[] = cartData?.items || [];

        if (cartItems.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: { code: 'CART_EMPTY', message: 'Cart is empty' },
                },
                { status: 400 }
            );
        }

        // Get user data
        const userDoc = await db.collection('users').doc(userId).get();
        const userData = userDoc.data();

        // Calculate totals
        const orderItems = cartItemsToOrderItems(cartItems);
        const subtotal = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
        const total = subtotal + input.shippingCost;

        // Generate order number
        const orderNumber = await generateOrderNumber(db);

        // Create initial status history
        const now = new Date();
        const initialStatus: StatusHistory = {
            status: 'pending_payment',
            note: 'Order created, waiting for payment',
            timestamp: now.toISOString(),
            updatedBy: 'system',
        };

        // Create order document
        const orderRef = db.collection('orders').doc();
        const order: Omit<Order, 'id'> = {
            orderNumber,
            userId,
            customerName: userData?.displayName || input.shippingAddress.recipientName,
            customerEmail: userData?.email || '',
            customerPhone: userData?.phone || input.shippingAddress.phone,
            items: orderItems,
            itemCount: orderItems.reduce((sum, item) => sum + item.quantity, 0),
            subtotal,
            shippingCost: input.shippingCost,
            discount: 0,
            total,
            shippingAddress: input.shippingAddress,
            shippingMethod: input.shippingMethod,
            paymentMethod: input.paymentMethod,
            paymentStatus: 'pending',
            status: 'pending_payment',
            statusHistory: [initialStatus],
            customerNotes: input.customerNotes,
            createdAt: now.toISOString(),
            updatedAt: now.toISOString(),
        };

        await orderRef.set(order);

        // Clear user's cart
        await db.collection('carts').doc(userId).delete();

        // TODO: Generate Midtrans payment token here
        // For now, return without payment token

        return NextResponse.json(
            {
                success: true,
                data: {
                    orderId: orderRef.id,
                    orderNumber,
                    total,
                    // paymentToken: will be added when Midtrans is integrated
                },
            },
            { status: 201 }
        );
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error creating order:', error);
        return NextResponse.json(
            {
                success: false,
                error: { code: 'INTERNAL_ERROR', message: 'Failed to create order' },
            },
            { status: 500 }
        );
    }
}

// ============================================
// GET Handler - Get Order History
// ============================================

export async function GET() {
    try {
        // Get session
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get('tib-session')?.value;

        if (!sessionToken) {
            return NextResponse.json(
                {
                    success: false,
                    error: { code: 'UNAUTHORIZED', message: 'Please login to view orders' },
                },
                { status: 401 }
            );
        }

        const sessionCookie = sessionToken;
        const decodedClaims = await getAdminAuth().verifySessionCookie(sessionCookie, true);
        const userId = decodedClaims.uid;
        const db = getAdminDb();

        // Get user's orders
        const snapshot = await db
            .collection('orders')
            .where('userId', '==', userId)
            .orderBy('createdAt', 'desc')
            .limit(50)
            .get();

        const orders: OrderListItem[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                orderNumber: data.orderNumber,
                status: data.status,
                paymentStatus: data.paymentStatus,
                total: data.total,
                itemCount: data.itemCount,
                createdAt: data.createdAt,
            };
        });

        return NextResponse.json({
            success: true,
            data: { orders },
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching orders:', error);
        return NextResponse.json(
            {
                success: false,
                error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch orders' },
            },
            { status: 500 }
        );
    }
}
