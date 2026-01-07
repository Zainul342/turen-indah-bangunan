/**
 * Order Validation Schemas
 * =========================
 * Zod schemas for order-related validation.
 *
 * @file src/schemas/order.schema.ts
 * @project Turen Indah Bangunan
 */

import { z } from 'zod';
import { addressSchema } from './user.schema';

// ============================================
// Create Order Schema
// ============================================

export const createOrderSchema = z.object({
    shippingAddress: addressSchema,
    shippingMethod: z.string().min(1, 'Metode pengiriman wajib dipilih'),
    shippingCost: z.number().min(0, 'Ongkos kirim tidak valid'),
    paymentMethod: z.enum(['bank_transfer', 'ewallet', 'cod'], {
        errorMap: () => ({ message: 'Metode pembayaran tidak valid' }),
    }),
    customerNotes: z.string().max(500).optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

// ============================================
// Update Order Status Schema
// ============================================

export const updateOrderStatusSchema = z.object({
    status: z.enum([
        'pending_payment',
        'processing',
        'confirmed',
        'shipped',
        'delivered',
        'completed',
        'cancelled',
        'refunded',
    ]),
    note: z.string().max(500).optional(),
    trackingNumber: z.string().optional(),
    shippingProvider: z.string().optional(),
});

export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
