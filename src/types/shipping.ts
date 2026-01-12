/**
 * Shipping Types
 * ===============
 * Strict type definitions for shipping options.
 *
 * @file src/types/shipping.ts
 */

import { z } from 'zod';

// ============================================
// Zod Schemas (Runtime Validation)
// ============================================

export const ShippingOptionSchema = z.object({
    code: z.string(),
    name: z.string(),
    service: z.string(),
    description: z.string(),
    cost: z.number(),
    etd: z.string(),
    currency: z.string().optional(),
});

// ============================================
// TypeScript Interfaces
// ============================================

export type ShippingOption = z.infer<typeof ShippingOptionSchema>;

export interface ShippingCostRequest {
    destinationCityId: string;
    weight: number;
    subtotal: number;
    couriers?: ('jne' | 'pos' | 'jnt' | 'sicepat')[];
}

export interface ShippingCostResponse {
    success: boolean;
    data?: ShippingOption[];
    warning?: string;
    error?: {
        code: string;
        message: string;
        details?: unknown;
    };
}
