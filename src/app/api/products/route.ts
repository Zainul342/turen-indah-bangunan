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
    startAfter,
    getDocs,
    getCountFromServer,
    DocumentData,
    Query,
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
        // Parse query parameters
        const { searchParams } = new URL(request.url);
        const rawParams = Object.fromEntries(searchParams.entries());

        // Validate with Zod
        const parseResult = productQuerySchema.safeParse(rawParams);
        if (!parseResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'Invalid query parameters',
                        details: parseResult.error.errors,
                    },
                },
                { status: 400 }
            );
        }

        const params = parseResult.data;
        const { page, limit, category, search, sort, status, featured, minPrice, maxPrice } = params;

        // Build Firestore query
        const productsRef = collection(db, 'products');
        const constraints: Parameters<typeof query>[1][] = [];

        // Always filter active products for public API
        constraints.push(where('status', '==', status || 'active'));

        // Category filter
        if (category) {
            constraints.push(where('categoryId', '==', category));
        }

        // Featured filter
        if (featured !== undefined) {
            constraints.push(where('featured', '==', featured));
        }

        // Price range filters
        if (minPrice !== undefined) {
            constraints.push(where('price', '>=', minPrice));
        }
        if (maxPrice !== undefined) {
            constraints.push(where('price', '<=', maxPrice));
        }

        // Sorting
        const { field: sortField, direction: sortDirection } = getSortField(sort);
        constraints.push(orderBy(sortField, sortDirection));

        // Pagination limit
        constraints.push(firestoreLimit(limit));

        // Build query
        let productsQuery = query(productsRef, ...constraints);

        // Execute query
        const snapshot = await getDocs(productsQuery);

        // Map documents to ProductListItem
        let products: ProductListItem[] = snapshot.docs.map(mapDocToProductListItem);

        // Client-side search filter (Firestore doesn't support full-text search)
        if (search) {
            const searchLower = search.toLowerCase();
            products = products.filter(
                (p) =>
                    p.name.toLowerCase().includes(searchLower) ||
                    p.brand?.toLowerCase().includes(searchLower)
            );
        }

        // Get total count for pagination
        const countQuery = query(
            productsRef,
            where('status', '==', status || 'active'),
            ...(category ? [where('categoryId', '==', category)] : [])
        );
        const countSnapshot = await getCountFromServer(countQuery);
        const total = countSnapshot.data().count;

        // Build pagination info
        const pagination: Pagination = {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        };

        // Return response
        return NextResponse.json({
            success: true,
            data: {
                products,
                pagination,
            },
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'Failed to fetch products',
                },
            },
            { status: 500 }
        );
    }
}
