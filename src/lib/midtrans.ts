/**
 * Midtrans Client
 * =================
 * Helper functions for Midtrans Snap integration.
 *
 * @file src/lib/midtrans.ts
 * @project Turen Indah Bangunan
 */

import crypto from 'crypto';

// ============================================
// Configuration
// ============================================

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || '';
const MIDTRANS_CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || '';
const IS_PRODUCTION = process.env.MIDTRANS_IS_PRODUCTION === 'true';

const BASE_URL = IS_PRODUCTION
    ? 'https://app.midtrans.com/snap/v1'
    : 'https://app.sandbox.midtrans.com/snap/v1';

// ============================================
// Types
// ============================================

export interface MidtransItemDetail {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export interface MidtransCustomerDetail {
    first_name: string;
    last_name?: string;
    email: string;
    phone: string;
}

export interface CreateTransactionInput {
    orderId: string;
    grossAmount: number;
    items: MidtransItemDetail[];
    customer: MidtransCustomerDetail;
    callbackFinishUrl?: string;
}

export interface MidtransSnapResponse {
    token: string;
    redirect_url: string;
}

export interface MidtransWebhookPayload {
    transaction_time: string;
    transaction_status: string;
    transaction_id: string;
    status_message: string;
    status_code: string;
    signature_key: string;
    payment_type: string;
    order_id: string;
    merchant_id: string;
    gross_amount: string;
    fraud_status?: string;
    currency: string;
}

// ============================================
// Helper Functions
// ============================================

/**
 * Get Base64 encoded authorization header
 */
function getAuthHeader(): string {
    const credentials = Buffer.from(`${MIDTRANS_SERVER_KEY}:`).toString('base64');
    return `Basic ${credentials}`;
}

/**
 * Verify webhook signature from Midtrans
 */
export function verifySignature(payload: MidtransWebhookPayload): boolean {
    const { order_id, status_code, gross_amount, signature_key } = payload;

    const serverKey = MIDTRANS_SERVER_KEY;
    const hash = crypto
        .createHash('sha512')
        .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
        .digest('hex');

    return hash === signature_key;
}

/**
 * Map Midtrans transaction_status to our payment status
 */
export function mapTransactionStatus(status: string): {
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    orderStatus: string;
} {
    switch (status) {
        case 'capture':
        case 'settlement':
            return { paymentStatus: 'paid', orderStatus: 'processing' };
        case 'pending':
            return { paymentStatus: 'pending', orderStatus: 'pending_payment' };
        case 'deny':
        case 'cancel':
        case 'expire':
            return { paymentStatus: 'failed', orderStatus: 'cancelled' };
        case 'refund':
        case 'partial_refund':
            return { paymentStatus: 'refunded', orderStatus: 'refunded' };
        default:
            return { paymentStatus: 'pending', orderStatus: 'pending_payment' };
    }
}

// ============================================
// API Functions
// ============================================

/**
 * Create Snap transaction token
 */
export async function createSnapTransaction(
    input: CreateTransactionInput
): Promise<MidtransSnapResponse> {
    const { orderId, grossAmount, items, customer, callbackFinishUrl } = input;

    const payload = {
        transaction_details: {
            order_id: orderId,
            gross_amount: grossAmount,
        },
        item_details: items.map((item) => ({
            id: item.id,
            name: item.name.substring(0, 50), // Max 50 chars
            price: item.price,
            quantity: item.quantity,
        })),
        customer_details: {
            first_name: customer.first_name,
            last_name: customer.last_name || '',
            email: customer.email,
            phone: customer.phone,
        },
        callbacks: {
            finish: callbackFinishUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/orders/success`,
        },
    };

    const response = await fetch(`${BASE_URL}/transactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAuthHeader(),
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Midtrans API error: ${error}`);
    }

    const data: MidtransSnapResponse = await response.json();
    return data;
}

/**
 * Check if Midtrans is configured
 */
export function isMidtransConfigured(): boolean {
    return !!MIDTRANS_SERVER_KEY && !!MIDTRANS_CLIENT_KEY;
}

/**
 * Get client key for frontend
 */
export function getClientKey(): string {
    return MIDTRANS_CLIENT_KEY;
}

/**
 * Get Snap.js URL based on environment
 */
export function getSnapJsUrl(): string {
    return IS_PRODUCTION
        ? 'https://app.midtrans.com/snap/snap.js'
        : 'https://app.sandbox.midtrans.com/snap/snap.js';
}
