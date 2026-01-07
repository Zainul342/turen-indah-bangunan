/**
 * RajaOngkir Client
 * ==================
 * Helper functions for RajaOngkir API interactions.
 *
 * @file src/lib/rajaongkir.ts
 * @project Turen Indah Bangunan
 */

// ============================================
// Configuration
// ============================================

const RAJAONGKIR_API_KEY = process.env.RAJAONGKIR_API_KEY || '';
const RAJAONGKIR_BASE_URL = 'https://api.rajaongkir.com/starter'; // Use 'starter' or 'pro'

// ============================================
// Types
// ============================================

export interface RajaOngkirCity {
    city_id: string;
    province_id: string;
    province: string;
    type: string;
    city_name: string;
    postal_code: string;
}

export interface RajaOngkirCostResult {
    code: string;
    name: string;
    costs: {
        service: string;
        description: string;
        cost: {
            value: number;
            etd: string;
            note: string;
        }[];
    }[];
}

// ============================================
// Helper Functions
// ============================================

async function fetchRajaOngkir<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers = {
        key: RAJAONGKIR_API_KEY,
        ...options.headers,
    };

    const response = await fetch(`${RAJAONGKIR_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`RajaOngkir API Error: ${error}`);
    }

    const json = await response.json();

    if (json.rajaongkir.status.code !== 200) {
        throw new Error(`RajaOngkir Error: ${json.rajaongkir.status.description}`);
    }

    return json.rajaongkir.results;
}

// ============================================
// API Functions
// ============================================

/**
 * Get all cities (cached recommended)
 */
export async function getCities(): Promise<RajaOngkirCity[]> {
    // In production, you might want to cache this response
    return fetchRajaOngkir<RajaOngkirCity[]>('/city');
}

/**
 * Calculate shipping cost
 */
export async function calculateRajaOngkirCost(
    origin: string,
    destination: string,
    weight: number, // in grams
    courier: string // jne, pos, tiki
): Promise<RajaOngkirCostResult[]> {
    const body = new URLSearchParams({
        origin,
        destination,
        weight: weight.toString(),
        courier,
    });

    return fetchRajaOngkir<RajaOngkirCostResult[]>('/cost', {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
    });
}
