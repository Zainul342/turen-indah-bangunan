/**
 * Shipping Types
 * ===============
 * Strict type definitions for shipping options.
 *
 * @file src/types/shipping.ts
 */

export interface ShippingOption {
    code: string;       // 'JNE', 'TIB_FLEET', etc.
    name: string;       // Human readable name
    service: string;    // 'REG', 'YES', 'FREE', 'PICKUP'
    description: string;
    cost: number;
    etd: string;        // Estimated arrival
    currency?: string;
}

export interface ShippingCostRequest {
    destinationCityId: string;
    weight: number;
    subtotal: number;
}

export interface ShippingCostResponse {
    success: boolean;
    data?: ShippingOption[];
    error?: {
        code: string;
        message: string;
        details?: unknown;
    };
}
