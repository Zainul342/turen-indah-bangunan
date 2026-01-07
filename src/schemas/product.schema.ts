/**
 * Product Validation Schemas
 * ===========================
 * Zod schemas for product-related validation.
 *
 * @file src/schemas/product.schema.ts
 * @project Turen Indah Bangunan
 */

import { z } from 'zod';

// ============================================
// Query Params Schema
// ============================================

export const productQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    category: z.string().optional(),
    search: z.string().optional(),
    sort: z
        .enum(['newest', 'oldest', 'price_asc', 'price_desc', 'name_asc', 'name_desc', 'bestseller'])
        .default('newest'),
    status: z.enum(['active', 'draft', 'archived']).optional(),
    featured: z.coerce.boolean().optional(),
    minPrice: z.coerce.number().positive().optional(),
    maxPrice: z.coerce.number().positive().optional(),
});

export type ProductQueryInput = z.infer<typeof productQuerySchema>;

// ============================================
// Sub-schemas
// ============================================

export const productImageSchema = z.object({
    url: z.string().url(),
    alt: z.string().min(1),
    order: z.number().int().min(0),
});

export const specificationSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1),
});

export const priceTierSchema = z.object({
    minQty: z.number().int().positive(),
    price: z.number().positive(),
});

export const dimensionsSchema = z.object({
    length: z.number().positive(),
    width: z.number().positive(),
    height: z.number().positive(),
});

// ============================================
// Create Product Schema
// ============================================

export const createProductSchema = z.object({
    // Required fields
    name: z.string().min(1, 'Nama produk wajib diisi').max(200),
    slug: z
        .string()
        .min(1)
        .max(200)
        .regex(/^[a-z0-9-]+$/, 'Slug hanya boleh huruf kecil, angka, dan strip'),
    sku: z.string().min(1, 'SKU wajib diisi').max(50),
    description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
    categoryId: z.string().min(1, 'Kategori wajib dipilih'),
    price: z.number().positive('Harga harus lebih dari 0'),

    // Optional fields
    shortDescription: z.string().max(500).optional(),
    categoryPath: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    brand: z.string().optional(),
    compareAtPrice: z.number().positive().optional(),
    discountPercent: z.number().min(0).max(100).optional(),
    priceTiers: z.array(priceTierSchema).optional(),

    // Inventory
    stock: z.number().int().min(0).default(0),
    lowStockThreshold: z.number().int().min(0).default(10),
    trackInventory: z.boolean().default(true),

    // Media
    images: z.array(productImageSchema).default([]),
    thumbnail: z.string().url().optional(),

    // Specifications
    specifications: z.array(specificationSchema).default([]),
    weight: z.number().positive().default(0),
    dimensions: dimensionsSchema.optional(),
    unit: z.string().default('pcs'),

    // SEO
    metaTitle: z.string().max(60).optional(),
    metaDescription: z.string().max(160).optional(),

    // Status
    status: z.enum(['active', 'draft', 'archived']).default('draft'),
    featured: z.boolean().default(false),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

// ============================================
// Update Product Schema
// ============================================

export const updateProductSchema = createProductSchema.partial();

export type UpdateProductInput = z.infer<typeof updateProductSchema>;
