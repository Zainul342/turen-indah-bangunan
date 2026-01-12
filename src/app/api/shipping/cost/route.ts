/**
 * Shipping Cost API
 * ==================
 * POST /api/shipping/cost - Calculate shipping cost (Hybrid)
 * Hardened version with strict typing, error handling, and auth.
 *
 * Security: Requires valid session cookie to prevent abuse/spam.
 *
 * @file src/app/api/shipping/cost/route.ts
 * @project Turen Indah Bangunan
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
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
    couriers: z.array(z.enum(['jne', 'pos', 'jnt', 'sicepat'])).optional().default(['jne', 'jnt', 'pos']),
});

// ============================================
// POST Handler
// ============================================

export async function POST(request: NextRequest) {
    try {
        // 1. Session Verification (prevent abuse/spam)
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('tib-session')?.value;

        if (!sessionCookie) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'UNAUTHORIZED',
                        message: 'Session required',
                    },
                },
                { status: 401 }
            );
        }

        // 2. Validate Request
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

        const { destinationCityId, weight, subtotal, couriers } = parseResult.data;
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

        // 2. Fetch RajaOngkir Rates (Multiple Couriers)
        let rajaOngkirWarning: string | null = null;
        if (isEligibleForExpedition(weight)) {
            try {
                // Fetch multiple couriers in parallel
                const courierResults = await Promise.allSettled(
                    couriers.map(async (courier) => {
                        const results = await calculateRajaOngkirCost(
                            originCityId,
                            destinationCityId,
                            weight,
                            courier
                        );
                        return { courier, results };
                    })
                );

                // Process successful results
                courierResults.forEach((result) => {
                    if (result.status === 'fulfilled' && result.value.results.length > 0) {
                        const courierData = result.value.results[0];
                        if (courierData) {
                            const options: ShippingOption[] = courierData.costs.map((cost) => ({
                                code: courierData.code.toUpperCase(),
                                name: courierData.name,
                                service: cost.service,
                                description: cost.description,
                                cost: cost.cost[0]?.value || 0,
                                etd: cost.cost[0]?.etd ? `${cost.cost[0].etd} Hari` : '-',
                            }));
                            shippingOptions.push(...options);
                        }
                    }
                });

                // Check if all failed
                const allFailed = courierResults.every((result) => result.status === 'rejected');
                if (allFailed) {
                    rajaOngkirWarning = 'Layanan ekspedisi sedang gangguan. Hanya opsi lokal tersedia.';
                }
            } catch (roError) {
                // eslint-disable-next-line no-console
                console.warn('RajaOngkir fetch failed:', roError);
                rajaOngkirWarning = 'Layanan ekspedisi sedang gangguan. Hanya opsi lokal tersedia.';
            }
        }

        // 3. Fallback for Empty Options (Heavy Item + Outside Malang)
        if (shippingOptions.length === 0) {
            // Return success but empty data, frontend explains why
            return NextResponse.json({
                success: true,
                data: [],
                warning: 'Tidak ada opsi pengiriman untuk lokasi/berat ini',
            });
        }

        // 4. Sort by cheapest
        shippingOptions.sort((a, b) => a.cost - b.cost);

        return NextResponse.json({
            success: true,
            data: shippingOptions,
            warning: rajaOngkirWarning || undefined,
        });
    } catch (error) {
        // eslint-disable-next-line no-console
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
