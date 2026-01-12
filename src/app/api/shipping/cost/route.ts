/**
 * Shipping Cost API
 * ==================
 * POST /api/shipping/cost - Calculate shipping cost (Hybrid)
 * Hardened version with strict typing, error handling, auth, and caching.
 *
 * Security: Requires valid session cookie to prevent abuse/spam.
 * Performance: Caches RajaOngkir results for 1 hour.
 *
 * @file src/app/api/shipping/cost/route.ts
 * @project Turen Indah Bangunan
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { unstable_cache } from 'next/cache';
import { calculateRajaOngkirCost } from '@/lib/rajaongkir';
import {
    calculateCustomFleetRates,
    getOriginCityId,
    isMalangArea,
    isEligibleForExpedition,
} from '@/lib/shipping-rules';
import { z } from 'zod';
import { ShippingOptionSchema } from '@/types/shipping';
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
// Cached RajaOngkir Fetch
// ============================================

const getCachedRajaOngkirCost = unstable_cache(
    async (originCityId: string, destinationCityId: string, weight: number, courier: string) => {
        return calculateRajaOngkirCost(originCityId, destinationCityId, weight, courier);
    },
    ['rajaongkir-cost'],
    {
        revalidate: 3600, // 1 hour cache
        tags: ['shipping'],
    }
);

// ============================================
// Output Validation Helper
// ============================================

function validateShippingOptions(options: ShippingOption[]): ShippingOption[] {
    return options.map((opt) => {
        const result = ShippingOptionSchema.safeParse(opt);
        if (result.success) {
            return result.data;
        }
        // Log malformed data but don't crash - return sanitized version
        // eslint-disable-next-line no-console
        console.warn('Invalid shipping option:', result.error.errors);
        return {
            code: opt.code || 'UNKNOWN',
            name: opt.name || 'Unknown',
            service: opt.service || '-',
            description: opt.description || '',
            cost: typeof opt.cost === 'number' ? opt.cost : 0,
            etd: opt.etd || '-',
        };
    });
}

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

        // 3. Calculate Custom Fleet Rates (if in Malang Area)
        if (isMalangArea(destinationCityId)) {
            const fleetRates = calculateCustomFleetRates(
                destinationCityId,
                subtotal,
                weight
            );
            shippingOptions.push(...fleetRates);
        }

        // 4. Fetch RajaOngkir Rates (Multiple Couriers - CACHED)
        let rajaOngkirWarning: string | null = null;
        if (isEligibleForExpedition(weight)) {
            try {
                // Fetch multiple couriers in parallel (with caching)
                const courierResults = await Promise.allSettled(
                    couriers.map(async (courier) => {
                        const results = await getCachedRajaOngkirCost(
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

        // 5. Fallback for Empty Options (Heavy Item + Outside Malang)
        if (shippingOptions.length === 0) {
            return NextResponse.json({
                success: true,
                data: [],
                warning: 'Tidak ada opsi pengiriman untuk lokasi/berat ini',
            });
        }

        // 6. Validate & Sort by cheapest
        const validatedOptions = validateShippingOptions(shippingOptions);
        validatedOptions.sort((a, b) => a.cost - b.cost);

        return NextResponse.json({
            success: true,
            data: validatedOptions,
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
