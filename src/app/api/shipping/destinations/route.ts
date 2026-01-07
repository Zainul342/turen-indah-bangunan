/**
 * Shipping Destinations API
 * ==========================
 * GET /api/shipping/destinations - Search cities via RajaOngkir
 *
 * @file src/app/api/shipping/destinations/route.ts
 * @project Turen Indah Bangunan
 */

import { NextResponse } from 'next/server';
import { getCities, type RajaOngkirCity } from '@/lib/rajaongkir';
import { isMalangArea } from '@/lib/shipping-rules';

// In-memory cache for cities (since they rarely change)
let cachedCities: RajaOngkirCity[] | null = null;
let lastCacheTime = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function GET() {
    try {
        const now = Date.now();

        // Refresh cache if needed
        if (!cachedCities || now - lastCacheTime > CACHE_DURATION) {
            cachedCities = await getCities();
            lastCacheTime = now;
        }

        // Enrich data with TIB specific info (e.g. flag Malang Area)
        const enrichedCities = cachedCities.map((city) => ({
            ...city,
            isTurenArea: isMalangArea(city.city_id),
            label: `${city.type} ${city.city_name}, ${city.province}`,
        }));

        // Prioritize Malang Area in search (sort to top)
        enrichedCities.sort((a, b) => {
            if (a.isTurenArea && !b.isTurenArea) return -1;
            if (!a.isTurenArea && b.isTurenArea) return 1;
            return 0;
        });

        return NextResponse.json({
            success: true,
            data: enrichedCities,
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching destinations:', error);
        return NextResponse.json(
            {
                success: false,
                error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch destinations' },
            },
            { status: 500 }
        );
    }
}
