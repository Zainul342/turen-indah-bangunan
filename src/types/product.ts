/**
 * Product Types
 * ==============
 * TypeScript type definitions for product-related data.
 * Matches Firestore schema in docs/database.md
 *
 * @file src/types/product.ts
 * @project Turen Indah Bangunan
 */

import type { Timestamp } from 'firebase/firestore';

// ============================================
// Sub-types
// ============================================

export interface ProductImage {
    url: string;
    alt: string;
    order: number;
}

export interface Specification {
    name: string;
    value: string;
}

export interface PriceTier {
    minQty: number;
    price: number;
}

export interface ProductDimensions {
    length: number;
    width: number;
    height: number;
}

// ============================================
// Stock Status
// ============================================

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';
export type ProductStatus = 'active' | 'draft' | 'archived';

// ============================================
// Product Interface (Firestore)
// ============================================

export interface Product {
    // Identity
    id: string;
    slug: string;
    sku: string;

    // Basic Info
    name: string;
    description: string;
    shortDescription?: string;

    // Categorization
    categoryId: string;
    categoryPath: string[];
    tags: string[];
    brand?: string;

    // Pricing
    price: number;
    compareAtPrice?: number;
    discountPercent?: number;
    priceTiers?: PriceTier[];

    // Inventory
    stock: number;
    stockStatus: StockStatus;
    lowStockThreshold: number;
    trackInventory: boolean;

    // Media
    images: ProductImage[];
    thumbnail: string;

    // Specifications
    specifications: Specification[];
    weight: number; // in grams
    dimensions?: ProductDimensions;
    unit: string; // "pcs", "kg", "m³", etc.

    // SEO
    metaTitle?: string;
    metaDescription?: string;

    // Status
    status: ProductStatus;
    featured: boolean;

    // Metadata
    createdAt: Timestamp;
    updatedAt: Timestamp;

    // Stats (denormalized)
    reviewCount: number;
    averageRating: number;
    totalSold: number;
}

// ============================================
// API Response Types
// ============================================

/**
 * Product for list view (lighter version)
 */
export interface ProductListItem {
    id: string;
    slug: string;
    name: string;
    price: number;
    compareAtPrice?: number;
    discountPercent?: number;
    thumbnail: string;
    stock: number;
    stockStatus: StockStatus;
    categoryId: string;
    brand?: string;
    averageRating: number;
    reviewCount: number;
}

/**
 * Pagination info
 */
export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

/**
 * Product list API response
 */
export interface ProductListResponse {
    success: true;
    data: {
        products: ProductListItem[];
        pagination: Pagination;
    };
}

/**
 * Single product API response
 */
export interface ProductDetailResponse {
    success: true;
    data: Product;
}

// ============================================
// Query Types
// ============================================

export type ProductSortOption = 'newest' | 'oldest' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'bestseller';

export interface ProductQueryParams {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    sort?: ProductSortOption;
    status?: ProductStatus;
    featured?: boolean;
    minPrice?: number;
    maxPrice?: number;
}
