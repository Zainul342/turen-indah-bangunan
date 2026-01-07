/**
 * User Validation Schemas
 * ========================
 * Zod schemas for validating user-related forms and data.
 *
 * @file src/schemas/user.schema.ts
 * @project Turen Indah Bangunan
 */

import { z } from 'zod';

// ============================================
// Common Validators
// ============================================

const emailSchema = z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid');

const passwordSchema = z
    .string()
    .min(8, 'Password minimal 8 karakter')
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password harus mengandung huruf besar, huruf kecil, dan angka'
    );

const phoneSchema = z
    .string()
    .regex(/^08\d{9,11}$/, 'Nomor HP tidak valid (contoh: 081234567890)')
    .optional()
    .or(z.literal(''));

const displayNameSchema = z
    .string()
    .min(2, 'Nama minimal 2 karakter')
    .max(50, 'Nama maksimal 50 karakter');

// ============================================
// Auth Schemas
// ============================================

/**
 * Login form validation
 */
export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, 'Password wajib diisi'),
    rememberMe: z.boolean().optional().default(false),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Register form validation
 */
export const registerSchema = z
    .object({
        displayName: displayNameSchema,
        email: emailSchema,
        phone: phoneSchema,
        password: passwordSchema,
        confirmPassword: z.string().min(1, 'Konfirmasi password wajib diisi'),
        acceptTerms: z.boolean().refine((val) => val === true, {
            message: 'Anda harus menyetujui syarat dan ketentuan',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password tidak cocok',
        path: ['confirmPassword'],
    });

export type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * Forgot password form validation
 */
export const forgotPasswordSchema = z.object({
    email: emailSchema,
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

/**
 * Reset password form validation
 */
export const resetPasswordSchema = z
    .object({
        password: passwordSchema,
        confirmPassword: z.string().min(1, 'Konfirmasi password wajib diisi'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password tidak cocok',
        path: ['confirmPassword'],
    });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// ============================================
// Address Schema
// ============================================

export const addressSchema = z.object({
    id: z.string().optional(),
    label: z.string().min(1, 'Label alamat wajib diisi'),
    recipientName: z.string().min(2, 'Nama penerima minimal 2 karakter'),
    phone: z.string().regex(/^08\d{9,11}$/, 'Nomor HP tidak valid'),
    province: z.string().min(1, 'Provinsi wajib dipilih'),
    city: z.string().min(1, 'Kota/Kabupaten wajib dipilih'),
    district: z.string().min(1, 'Kecamatan wajib dipilih'),
    postalCode: z.string().regex(/^\d{5}$/, 'Kode pos harus 5 digit'),
    fullAddress: z.string().min(10, 'Alamat lengkap minimal 10 karakter'),
    isDefault: z.boolean().optional().default(false),
});

export type AddressFormData = z.infer<typeof addressSchema>;

// ============================================
// Profile Schema
// ============================================

export const updateProfileSchema = z.object({
    displayName: displayNameSchema,
    phone: phoneSchema,
    photoURL: z.string().url().optional().or(z.literal('')),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

// ============================================
// B2B Registration Schema
// ============================================

// Base schema for B2B (without refine, so we can extend)
const b2bBaseSchema = z.object({
    displayName: displayNameSchema,
    email: emailSchema,
    phone: phoneSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Konfirmasi password wajib diisi'),
    acceptTerms: z.boolean().refine((val) => val === true, {
        message: 'Anda harus menyetujui syarat dan ketentuan',
    }),
    companyName: z.string().min(2, 'Nama perusahaan minimal 2 karakter'),
    npwp: z
        .string()
        .regex(/^\d{15,16}$/, 'NPWP harus 15-16 digit')
        .optional()
        .or(z.literal('')),
});

export const b2bRegistrationSchema = b2bBaseSchema.refine(
    (data) => data.password === data.confirmPassword,
    {
        message: 'Password tidak cocok',
        path: ['confirmPassword'],
    }
);

export type B2BRegistrationFormData = z.infer<typeof b2bRegistrationSchema>;

