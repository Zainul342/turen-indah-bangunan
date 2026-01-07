/**
 * Shipping Rules Logic
 * =====================
 * Custom shipping logic for Turen Indah Bangunan.
 * Handles detection of Malang Area and Custom Fleet rates.
 *
 * @file src/lib/shipping-rules.ts
 * @project Turen Indah Bangunan
 */

// ============================================
// Configuration
// ============================================

// RajaOngkir City IDs for Malang Raya
// Allow override via env, default to Malang Raya (Kab=255, Kota=256, Batu=53)
const MALANG_AREA_IDS = (process.env.NEXT_PUBLIC_LOCAL_CITY_IDS || '255,256,53').split(',');
// 255 = Kab. Malang, 256 = Kota Malang, 53 = Kota Batu

const ORIGIN_CITY_ID = '255'; // Turen (Kab. Malang)
const MAX_EXPEDITION_WEIGHT = 50000; // 50kg limit for standard expedition API

export interface CustomShippingOption {
    code: string;
    name: string;
    service: string;
    description: string;
    cost: number;
    etd: string;
}

// ============================================
// Logic Functions
// ============================================

/**
 * Check if the destination city is in Malang Raya
 */
export function isMalangArea(cityId: string): boolean {
    return MALANG_AREA_IDS.includes(cityId);
}

/**
 * Check if order is eligible for Standard Expedition (JNE, etc.)
 */
export function isEligibleForExpedition(weight: number): boolean {
    return weight <= MAX_EXPEDITION_WEIGHT;
}

/**
 * Calculate Custom Fleet shipping options
 */
export function calculateCustomFleetRates(
    cityId: string,
    subtotal: number,
    weight: number
): CustomShippingOption[] {
    // Logic: Must be in Malang Area
    if (!isMalangArea(cityId)) {
        return [];
    }

    const options: CustomShippingOption[] = [];

    // 1. Pickup at Store (Always available locally)
    options.push({
        code: 'TIB_FLEET',
        name: 'Ambil di Toko',
        service: 'PICKUP',
        description: 'Ambil sendiri di toko terdekat',
        cost: 0,
        etd: 'Hari ini',
    });

    // 2. Armada TIB Rules
    // Free Shipping rule: Order > 2jt in Malang
    const minOrderForFreeShipping = 2000000;

    if (subtotal >= minOrderForFreeShipping) {
        options.push({
            code: 'TIB_FLEET',
            name: 'Armada TIB',
            service: 'FREE',
            description: 'Gratis Ongkir (Armada Toko)',
            cost: 0,
            etd: '1-3 Hari',
        });
    } else {
        // Flat rate for small orders in Malang
        options.push({
            code: 'TIB_FLEET',
            name: 'Armada TIB',
            service: 'REG',
            description: 'Pengiriman Standar (Armada Toko)',
            cost: 50000,
            etd: '1-3 Hari',
        });
    }

    return options;
}

export function getOriginCityId(): string {
    return ORIGIN_CITY_ID;
}
