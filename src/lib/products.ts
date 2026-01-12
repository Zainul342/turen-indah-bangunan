/**
 * Product Data Layer
 * ===================
 * Centralized data fetching for products.
 * Separates data from UI for better maintainability and testability.
 *
 * @file src/lib/products.ts
 * @project Turen Indah Bangunan
 */

// ============================================
// Types
// ============================================

export interface ProductData {
    id: string;
    name: string;
    price: number;
    unit: string;
    category: string;
    description: string;
    stock: number;
    specs: { label: string; value: string }[];
    images: string[];
}

// ============================================
// Constants
// ============================================

const FALLBACK_IMAGE = '/products/placeholder.jpg';

// Temporary in-memory DB - will be replaced by Firestore
const PRODUCTS_DB: Record<string, ProductData> = {
    '1': {
        id: '1',
        name: 'Semen Gresik 40kg PCC High Quality',
        price: 65000,
        unit: 'sak',
        category: 'Semen',
        description:
            'Semen Gresik PCC (Portland Composite Cement) adalah bahan pengikat hidrolis hasil penggilingan bersama-sama terak (clinker) semen portland dan gipsum dengan satu atau lebih bahan anorganik, atau hasil pencampuran antara bubuk semen portland dengan bubuk bahan anorganik lain. Cocok untuk bangunan umum, jembatan, jalan raya, bangunan irigasi, dan bahan bangunan beton.',
        stock: 100,
        specs: [
            { label: 'Berat', value: '40 kg' },
            { label: 'Tipe', value: 'PCC' },
            { label: 'Warna', value: 'Abu-abu' },
            { label: 'Kemasan', value: 'Zak Kertas 3 Lapis' },
        ],
        images: ['/products/semen.jpg', '/products/semen-2.jpg'],
    },
    '2': {
        id: '2',
        name: 'Bata Ringan Citicon / Kubik',
        price: 525000,
        unit: 'm3',
        category: 'Bata Ringan',
        description:
            'Bata ringan Citicon adalah beton ringan aerasi yang diproduksi dengan teknologi tinggi. Memiliki berat jenis yang ringan namun kuat tekan yang tinggi. Tahan api, kedap suara, dan presisi tinggi sehingga pemasangan lebih cepat dan rapi. Cocok untuk dinding bangunan bertingkat.',
        stock: 50,
        specs: [
            { label: 'Dimensi', value: '60 x 20 x 10 cm' },
            { label: 'Berat Kering', value: '520 kg/m3' },
            { label: 'Kuat Tekan', value: '4.0 N/mm2' },
            { label: 'Isi per m3', value: '83 pcs (tebal 10cm)' },
        ],
        images: [], // Empty - will use fallback
    },
    '3': {
        id: '3',
        name: 'Cat Dulux Catylac 5kg White',
        price: 135000,
        unit: 'galon',
        category: 'Cat',
        description:
            'Cat interior berkualitas tinggi dengan hasil akhir matte yang elegan. Mudah diaplikasikan dan cepat kering.',
        stock: 25,
        specs: [
            { label: 'Isi', value: '5 kg' },
            { label: 'Warna', value: 'Putih' },
            { label: 'Finish', value: 'Matte' },
            { label: 'Daya Sebar', value: '8-10 m²/liter' },
        ],
        images: ['/products/cat.jpg'],
    },
};

// ============================================
// Data Access Functions
// ============================================

/**
 * Get product by ID
 * Returns null if not found (don't throw - let caller handle)
 */
export async function getProduct(id: string): Promise<ProductData | null> {
    // TODO: Replace with Firestore query
    // const doc = await db.collection('products').doc(id).get();
    // return doc.exists ? { id: doc.id, ...doc.data() } : null;

    const product = PRODUCTS_DB[id];
    if (!product) return null;

    // Return a copy with guaranteed images array
    return {
        ...product,
        images: product.images.length > 0 ? product.images : [FALLBACK_IMAGE],
    };
}

/**
 * Get related products by category
 * Excludes the current product
 */
export async function getRelatedProducts(
    category: string,
    excludeId: string,
    limit = 4
): Promise<ProductData[]> {
    // TODO: Replace with Firestore query
    // const docs = await db.collection('products')
    //   .where('category', '==', category)
    //   .where('id', '!=', excludeId)
    //   .limit(limit)
    //   .get();

    const products = Object.values(PRODUCTS_DB)
        .filter((p) => p.category === category && p.id !== excludeId)
        .slice(0, limit);

    // If not enough in same category, fill with others
    if (products.length < limit) {
        const others = Object.values(PRODUCTS_DB)
            .filter((p) => p.id !== excludeId && !products.find((rp) => rp.id === p.id))
            .slice(0, limit - products.length);
        products.push(...others);
    }

    return products.map((p) => ({
        ...p,
        images: p.images.length > 0 ? p.images : [FALLBACK_IMAGE],
    }));
}

/**
 * Get all product IDs (for static generation)
 */
export async function getAllProductIds(): Promise<string[]> {
    // TODO: Replace with Firestore query
    return Object.keys(PRODUCTS_DB);
}
