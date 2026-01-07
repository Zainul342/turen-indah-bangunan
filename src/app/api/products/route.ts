/**
 * Products List API
 * ==================
 * GET /api/products - Get paginated product list with filters
 *
 * @file src/app/api/products/route.ts
 * @project Turen Indah Bangunan
 */

import { NextRequest, NextResponse } from 'next/server';
import {
    collection,
    query,
    where,
    orderBy,
    limit as firestoreLimit,
    getDocs,
    getCountFromServer,
    DocumentData,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { productQuerySchema } from '@/schemas/product.schema';
import type { ProductListItem, Pagination, ProductSortOption } from '@/types/product';

// ============================================
// Helper Functions
// ============================================

function getSortField(sort: ProductSortOption): { field: string; direction: 'asc' | 'desc' } {
    switch (sort) {
        case 'newest':
            return { field: 'createdAt', direction: 'desc' };
        case 'oldest':
            return { field: 'createdAt', direction: 'asc' };
        case 'price_asc':
            return { field: 'price', direction: 'asc' };
        case 'price_desc':
            return { field: 'price', direction: 'desc' };
        case 'name_asc':
            return { field: 'name', direction: 'asc' };
        case 'name_desc':
            return { field: 'name', direction: 'desc' };
        case 'bestseller':
            return { field: 'totalSold', direction: 'desc' };
        default:
            return { field: 'createdAt', direction: 'desc' };
    }
}

function mapDocToProductListItem(doc: DocumentData): ProductListItem {
    const data = doc.data();
    return {
        id: doc.id,
        slug: data.slug,
        name: data.name,
        price: data.price,
        compareAtPrice: data.compareAtPrice,
        discountPercent: data.discountPercent,
        thumbnail: data.thumbnail || data.images?.[0]?.url || '',
        stock: data.stock,
        stockStatus: data.stockStatus,
        categoryId: data.categoryId,
        brand: data.brand,
        averageRating: data.averageRating || 0,
        reviewCount: data.reviewCount || 0,
    };
}

// ============================================
// GET Handler
// ============================================

export async function GET(request: NextRequest) {
    try {
        // ... (Zod validation etc)
        const { searchParams } = new URL(request.url);
        const rawParams = Object.fromEntries(searchParams.entries());

        const parseResult = productQuerySchema.safeParse(rawParams);
        if (!parseResult.success) {
            return NextResponse.json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Invalid query' } }, { status: 400 });
        }
        const params = parseResult.data;
        const { page, limit, category, search, sort, status, featured, minPrice, maxPrice } = params;

        // Build Firestore query
        const productsRef = collection(db, 'products');
        const constraints: Parameters<typeof query>[1][] = [];

        constraints.push(where('status', '==', status || 'active'));
        if (category) constraints.push(where('categoryId', '==', category));
        if (featured !== undefined) constraints.push(where('featured', '==', featured));
        if (minPrice !== undefined) constraints.push(where('price', '>=', minPrice));
        if (maxPrice !== undefined) constraints.push(where('price', '<=', maxPrice));

        const { field: sortField, direction: sortDirection } = getSortField(sort);
        constraints.push(orderBy(sortField, sortDirection));
        constraints.push(firestoreLimit(limit));

        // Build query
        const productsQuery = query(productsRef, ...constraints);

        // Execute query
        const snapshot = await getDocs(productsQuery);
        let products: ProductListItem[] = snapshot.docs.map(mapDocToProductListItem);

        if (search) {
            const searchLower = search.toLowerCase();
            products = products.filter(p => p.name.toLowerCase().includes(searchLower) || p.brand?.toLowerCase().includes(searchLower));
        }

        const countQuery = query(productsRef, where('status', '==', status || 'active'), ...(category ? [where('categoryId', '==', category)] : []));
        const countSnapshot = await getCountFromServer(countQuery);
        const total = countSnapshot.data().count;

        const pagination: Pagination = { page, limit, total, totalPages: Math.ceil(total / limit) };

        return NextResponse.json({ success: true, data: { products, pagination } });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching products:', error);
        return NextResponse.json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch products' } }, { status: 500 });
    }
}
