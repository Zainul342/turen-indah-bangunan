/**
 * Shipping Cost API
 * ==================
 * POST /api/shipping/cost - Calculate shipping cost (Hybrid)
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
        const shippingOptions: any[] = [];

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
        // Check eligibility first (weight limit)
        if (isEligibleForExpedition(weight)) {
            try {
                // Use 'zne' (JNE) as representative courier, can loop ['jne', 'jnt', 'sicepat'] if needed
                const courier = 'jne';
                const rajaOngkirResults = await calculateRajaOngkirCost(
                    originCityId,
                    destinationCityId,
                    weight,
                    courier
                );

                if (rajaOngkirResults.length > 0 && rajaOngkirResults[0]) {
                    const result = rajaOngkirResults[0];
                    const jneCosts = result.costs.map((cost) => ({
                        code: 'JNE',
                        name: 'JNE',
                        service: cost.service,
                        description: cost.description,
                        cost: cost.cost[0]?.value || 0,
                        etd: cost.cost[0]?.etd ? `${cost.cost[0].etd} Hari` : '-',
                    }));
                    shippingOptions.push(...jneCosts);
                }
            } catch (roError) {
                console.warn('RajaOngkir fetch failed:', roError);
            }
        }

        // 3. Fallback / Warning used for Heavy Items outside Malang
        if (shippingOptions.length === 0) {
            // If weight is heavy and not in Malang, return empty or specific instruction
            // Frontend should handle empty options as "Contact Admin for Shipping"
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
