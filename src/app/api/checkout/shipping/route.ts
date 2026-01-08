/**
 * Checkout Shipping Calculation API
 * ===================================
 * Calculates shipping options for checkout.
 *
 * @file src/app/api/checkout/shipping/route.ts
 * @project Turen Indah Bangunan
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
    calculateCustomFleetRates,
    isMalangArea,
    getOriginCityId,
} from '@/lib/shipping-rules';
import type { ShippingOption } from '@/types/checkout';

// ============================================
// Validation Schema
// ============================================

const shippingRequestSchema = z.object({
    destinationCityId: z.string().min(1),
    weight: z.number().min(1),
    subtotal: z.number().min(0),
});

// ============================================
// RajaOngkir API Call
// ============================================

interface RajaOngkirService {
    service: string;
    description: string;
    cost: Array<{ value: number; etd: string }>;
}

interface RajaOngkirCourier {
    code: string;
    name: string;
    costs: RajaOngkirService[];
}

async function fetchRajaOngkirRates(
    origin: string,
    destination: string,
    weight: number
): Promise<ShippingOption[]> {
    const apiKey = process.env.RAJAONGKIR_API_KEY;
    if (!apiKey) {
        // eslint-disable-next-line no-console
        console.warn('RajaOngkir API key not configured');
        return [];
    }

    try {
        const response = await fetch('https://rajaongkir.komerce.id/api/v1/calculate/domestic-cost', {
            method: 'POST',
            headers: {
                'key': apiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                origin,
                destination,
                weight,
                courier: 'jne:jnt:sicepat',
            }),
        });

        if (!response.ok) {
            // eslint-disable-next-line no-console
            console.error('RajaOngkir API error:', response.status);
            return [];
        }

        const data = await response.json();

        if (!data.status || !data.data) {
            return [];
        }

        // Transform RajaOngkir response to ShippingOption[]
        const options: ShippingOption[] = [];

        for (const courier of data.data as RajaOngkirCourier[]) {
            for (const service of courier.costs) {
                if (service.cost.length > 0) {
                    const costItem = service.cost[0];
                    if (costItem) {
                        options.push({
                            id: `${courier.code}_${service.service}`.toLowerCase(),
                            code: courier.code.toLowerCase(),
                            name: courier.name,
                            service: service.service,
                            description: service.description,
                            cost: costItem.value,
                            etd: costItem.etd || 'N/A',
                            provider: courier.code.toLowerCase() as ShippingOption['provider'],
                            isFree: false,
                            isRecommended: false,
                        });
                    }
                }
            }
        }

        return options;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('RajaOngkir fetch error:', error);
        return [];
    }
}

// ============================================
// Route Handler
// ============================================

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { destinationCityId, weight, subtotal } = shippingRequestSchema.parse(body);

        const originCityId = getOriginCityId();
        const options: ShippingOption[] = [];

        // 1. Check for TIB Custom Fleet (Malang Area only)
        const customRates = calculateCustomFleetRates(destinationCityId, subtotal, weight);
        for (const rate of customRates) {
            options.push({
                id: `${rate.code}_${rate.service}`.toLowerCase(),
                code: rate.code.toLowerCase(),
                name: rate.name,
                service: rate.service,
                description: rate.description,
                cost: rate.cost,
                etd: rate.etd,
                provider: 'tib_fleet',
                isFree: rate.cost === 0,
                isRecommended: rate.cost === 0, // Free shipping is recommended
            });
        }

        // 2. Fetch RajaOngkir rates (for all destinations)
        const rajaOngkirOptions = await fetchRajaOngkirRates(originCityId, destinationCityId, weight);
        options.push(...rajaOngkirOptions);

        // 3. Sort options: Free first, then by cost ascending
        options.sort((a, b) => {
            if (a.isFree && !b.isFree) return -1;
            if (!a.isFree && b.isFree) return 1;
            return a.cost - b.cost;
        });

        // Mark cheapest paid option as recommended (if no free option)
        const hasFreeOption = options.some((o) => o.isFree);
        if (!hasFreeOption && options.length > 0) {
            const cheapestIndex = options.findIndex((o) => !o.isFree);
            if (cheapestIndex >= 0) {
                const cheapestOption = options[cheapestIndex];
                if (cheapestOption) {
                    cheapestOption.isRecommended = true;
                }
            }
        }

        return NextResponse.json({
            success: true,
            data: {
                options,
                originCity: 'Malang',
                isMalangArea: isMalangArea(destinationCityId),
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
                    },
                },
                { status: 400 }
            );
        }

        // eslint-disable-next-line no-console
        console.error('Shipping calculation error:', error);
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'Failed to calculate shipping',
                },
            },
            { status: 500 }
        );
    }
}
