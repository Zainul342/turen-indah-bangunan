/**
 * Shipping Cost API
 * ==================
 * POST /api/shipping/cost - Calculate shipping cost (Hybrid)
 * Hardened version with strict typing and error handling.
 *
 * @file src/app/api/shipping/cost/route.ts
 * @project Turen Indah Bangunan
 */

import { NextRequest, NextResponse } from 'next/server';
import { calculateRajaOngkirCost } from '@/lib/rajaongkir';
import {
    calculateCustomFleetRates,
    getOriginCityId,
    isMalangArea,
    isEligibleForExpedition,
} from '@/lib/shipping-rules';
import { z } from 'zod';
import type { ShippingOption } from '@/types/shipping';

// ============================================
// Validation Schema
// ============================================

const costSchema = z.object({
    destinationCityId: z.string().min(1),
    weight: z.number().min(1), // in grams
    subtotal: z.number().min(0),
});

// ============================================
// POST Handler
// ============================================

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parseResult = costSchema.safeParse(body);

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

        const { destinationCityId, weight, subtotal } = parseResult.data;
        const originCityId = getOriginCityId();
        const shippingOptions: ShippingOption[] = [];

        // 1. Calculate Custom Fleet Rates (if in Malang Area)
        if (isMalangArea(destinationCityId)) {
            const fleetRates = calculateCustomFleetRates(
                destinationCityId,
                subtotal,
                weight
            );
            shippingOptions.push(...fleetRates);
        }

        // 2. Fetch RajaOngkir Rates (Hybrid strategy)
        if (isEligibleForExpedition(weight)) {
            try {
                const courier = 'jne'; // Can be made dynamic from env or request
                const rajaOngkirResults = await calculateRajaOngkirCost(
                    originCityId,
                    destinationCityId,
                    weight,
                    courier
                );

                if (rajaOngkirResults.length > 0 && rajaOngkirResults[0]) {
                    const result = rajaOngkirResults[0];
                    const jneCosts: ShippingOption[] = result.costs.map((cost) => ({
                        code: result.code.toUpperCase(), // 'JNE'
                        name: result.name,
                        service: cost.service,
                        description: cost.description,
                        cost: cost.cost[0]?.value || 0,
                        etd: cost.cost[0]?.etd ? `${cost.cost[0].etd} Hari` : '-',
                    }));
                    shippingOptions.push(...jneCosts);
                }
            } catch (roError) {
                console.warn('RajaOngkir fetch failed:', roError);
                // Don't fail the whole request, just return what we have (e.g. maybe just fleet)
            }
        }

        // 3. Fallback for Empty Options (Heavy Item + Outside Malang)
        if (shippingOptions.length === 0) {
            // Return success but empty data, frontend explains why
            return NextResponse.json({
                success: true,
                data: [],
                message: 'No shipping options available (Item potentially too heavy for expedition)'
            });
        }

        // 4. Sort by cheapest
        shippingOptions.sort((a, b) => a.cost - b.cost);

        return NextResponse.json({
            success: true,
            data: shippingOptions,
        });
    } catch (error) {
        console.error('Error calculating shipping:', error);
        return NextResponse.json(
            {
                success: false,
                error: { code: 'INTERNAL_ERROR', message: 'Failed to calculate shipping' },
            },
            { status: 500 }
        );
    }
}
