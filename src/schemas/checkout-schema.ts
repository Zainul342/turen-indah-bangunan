/**
 * Checkout Validation Schemas
 * ============================
 * Zod schemas for checkout form validation.
 *
 * @file src/schemas/checkout-schema.ts
 * @project Turen Indah Bangunan
 */

import { z } from 'zod';

// ============================================
// Address Schema
// ============================================

export const addressSchema = z.object({
    label: z.string().min(1, 'Label alamat wajib diisi'),
    recipientName: z
        .string()
        .min(2, 'Nama penerima minimal 2 karakter')
        .max(100, 'Nama penerima maksimal 100 karakter'),
    phone: z
        .string()
        .min(10, 'Nomor telepon minimal 10 digit')
        .max(15, 'Nomor telepon maksimal 15 digit')
        .regex(/^[0-9+\-\s]+$/, 'Format nomor telepon tidak valid'),
    province: z.string().min(1, 'Provinsi wajib dipilih'),
    provinceId: z.string().optional(),
    city: z.string().min(1, 'Kota/Kabupaten wajib dipilih'),
    cityId: z.string().min(1, 'ID kota wajib diisi'),
    district: z.string().min(1, 'Kecamatan wajib diisi'),
    postalCode: z
        .string()
        .min(5, 'Kode pos harus 5 digit')
        .max(5, 'Kode pos harus 5 digit')
        .regex(/^[0-9]+$/, 'Kode pos hanya boleh angka'),
    fullAddress: z
        .string()
        .min(10, 'Alamat lengkap minimal 10 karakter')
        .max(500, 'Alamat lengkap maksimal 500 karakter'),
    isDefault: z.boolean().optional(),
});

export type AddressFormData = z.infer<typeof addressSchema>;

// ============================================
// Shipping Selection Schema
// ============================================

export const shippingSelectionSchema = z.object({
    shippingOptionId: z.string().min(1, 'Pilih metode pengiriman'),
    shippingCode: z.string(),
    shippingService: z.string(),
    shippingCost: z.number().min(0),
    estimatedDelivery: z.string(),
});

export type ShippingSelectionData = z.infer<typeof shippingSelectionSchema>;

// ============================================
// Customer Notes Schema
// ============================================

export const customerNotesSchema = z.object({
    notes: z
        .string()
        .max(500, 'Catatan maksimal 500 karakter')
        .optional()
        .default(''),
});

export type CustomerNotesData = z.infer<typeof customerNotesSchema>;

// ============================================
// Create Order Schema (API Validation)
// ============================================

export const createOrderSchema = z.object({
    shippingAddress: addressSchema,
    shippingMethod: z.string().min(1, 'Metode pengiriman wajib dipilih'),
    shippingCost: z.number().min(0, 'Biaya pengiriman tidak valid'),
    customerNotes: z.string().max(500).optional(),
});

export type CreateOrderData = z.infer<typeof createOrderSchema>;

// ============================================
// Destination Search Schema
// ============================================

export const destinationSearchSchema = z.object({
    query: z.string().min(3, 'Minimal 3 karakter untuk pencarian'),
});

export type DestinationSearchData = z.infer<typeof destinationSearchSchema>;

// ============================================
// Shipping Calculation Request Schema
// ============================================

export const shippingCalculationSchema = z.object({
    destinationCityId: z.string().min(1, 'ID kota tujuan wajib diisi'),
    weight: z.number().min(1, 'Berat minimal 1 gram'),
    subtotal: z.number().min(0, 'Subtotal tidak valid'),
});

export type ShippingCalculationData = z.infer<typeof shippingCalculationSchema>;
