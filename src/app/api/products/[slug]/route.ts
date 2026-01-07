/**
 * Product Detail API
 * ===================
 * GET /api/products/[slug] - Get single product by slug
 *
 * @file src/app/api/products/[slug]/route.ts
 * @project Turen Indah Bangunan
 */

import { NextRequest, NextResponse } from 'next/server';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { Product } from '@/types/product';

// ============================================
// GET Handler
// ============================================

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        if (!slug) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'Product slug is required',
                    },
                },
                { status: 400 }
            );
        }

        // Query by slug
        const productsRef = collection(db, 'products');
        const q = query(
            productsRef,
            where('slug', '==', slug),
            where('status', '==', 'active'),
            limit(1)
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'NOT_FOUND',
                        message: 'Product not found',
                    },
                },
                { status: 404 }
            );
        }

        // Get product data
        const doc = snapshot.docs[0];
        if (!doc) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'NOT_FOUND',
                        message: 'Product not found',
                    },
                },
                { status: 404 }
            );
        }
        const data = doc.data();

        const product: Product = {
            id: doc.id,
            slug: data.slug,
            sku: data.sku,
            name: data.name,
            description: data.description,
            shortDescription: data.shortDescription,
            categoryId: data.categoryId,
            categoryPath: data.categoryPath || [],
            tags: data.tags || [],
            brand: data.brand,
            price: data.price,
            compareAtPrice: data.compareAtPrice,
            discountPercent: data.discountPercent,
            priceTiers: data.priceTiers,
            stock: data.stock,
            stockStatus: data.stockStatus,
            lowStockThreshold: data.lowStockThreshold,
            trackInventory: data.trackInventory,
            images: data.images || [],
            thumbnail: data.thumbnail || data.images?.[0]?.url || '',
            specifications: data.specifications || [],
            weight: data.weight,
            dimensions: data.dimensions,
            unit: data.unit || 'pcs',
            metaTitle: data.metaTitle,
            metaDescription: data.metaDescription,
            status: data.status,
            featured: data.featured,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            reviewCount: data.reviewCount || 0,
            averageRating: data.averageRating || 0,
            totalSold: data.totalSold || 0,
        };

        return NextResponse.json({
            success: true,
            data: product,
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json(
            {
                success: false,
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'Failed to fetch product',
                },
            },
            { status: 500 }
        );
    }
}
