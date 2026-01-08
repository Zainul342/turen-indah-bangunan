/**
 * User Addresses API Route
 * ==========================
 * POST /api/user/addresses - Add new address
 * PUT /api/user/addresses - Update address
 * DELETE /api/user/addresses - Delete address
 *
 * @file src/app/api/user/addresses/route.ts
 * @project Turen Indah Bangunan
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { getAdminDb, getAdminAuth } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import type { Address } from '@/types/user';

// ============================================
// Validation Schema
// ============================================

const addressSchema = z.object({
    id: z.string().optional(),
    label: z.string().min(1, 'Label wajib diisi'),
    recipientName: z.string().min(2, 'Nama penerima minimal 2 karakter'),
    phone: z.string().regex(/^(\+62|62|0)8[1-9][0-9]{6,10}$/, 'Format nomor telepon tidak valid'),
    province: z.string().min(1, 'Provinsi wajib diisi'),
    city: z.string().min(1, 'Kota wajib diisi'),
    district: z.string().min(1, 'Kecamatan wajib diisi'),
    postalCode: z.string().min(5, 'Kode pos minimal 5 digit'),
    fullAddress: z.string().min(10, 'Alamat lengkap minimal 10 karakter'),
    isDefault: z.boolean().optional(),
});

// ============================================
// POST Handler - Add New Address
// ============================================

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('tib-session')?.value;

        if (!sessionCookie) {
            return NextResponse.json(
                { success: false, error: { code: 'UNAUTHORIZED', message: 'Please login' } },
                { status: 401 }
            );
        }

        const decodedClaims = await getAdminAuth().verifySessionCookie(sessionCookie, true);
        const userId = decodedClaims.uid;
        const db = getAdminDb();

        const body = await request.json();
        const parseResult = addressSchema.safeParse(body);

        if (!parseResult.success) {
            return NextResponse.json(
                { success: false, error: { code: 'VALIDATION_ERROR', message: 'Data tidak valid', details: parseResult.error.errors } },
                { status: 400 }
            );
        }

        // Get current user
        const userDoc = await db.collection('users').doc(userId).get();
        const userData = userDoc.data();
        const currentAddresses: Address[] = userData?.addresses || [];

        // Generate unique ID
        const newAddress: Address = {
            ...parseResult.data,
            id: `addr_${Date.now()}`,
            isDefault: parseResult.data.isDefault || currentAddresses.length === 0,
        };

        // If new address is default, update others
        let updatedAddresses = currentAddresses;
        if (newAddress.isDefault) {
            updatedAddresses = currentAddresses.map((addr) => ({ ...addr, isDefault: false }));
        }

        updatedAddresses.push(newAddress);

        await db.collection('users').doc(userId).update({
            addresses: updatedAddresses,
            defaultAddressIndex: newAddress.isDefault ? updatedAddresses.length - 1 : userData?.defaultAddressIndex || 0,
            updatedAt: FieldValue.serverTimestamp(),
        });

        return NextResponse.json({
            success: true,
            data: newAddress,
        }, { status: 201 });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error adding address:', error);
        return NextResponse.json(
            { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to add address' } },
            { status: 500 }
        );
    }
}

// ============================================
// PUT Handler - Update Address
// ============================================

export async function PUT(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('tib-session')?.value;

        if (!sessionCookie) {
            return NextResponse.json(
                { success: false, error: { code: 'UNAUTHORIZED', message: 'Please login' } },
                { status: 401 }
            );
        }

        const decodedClaims = await getAdminAuth().verifySessionCookie(sessionCookie, true);
        const userId = decodedClaims.uid;
        const db = getAdminDb();

        const body = await request.json();
        const parseResult = addressSchema.safeParse(body);

        if (!parseResult.success || !parseResult.data.id) {
            return NextResponse.json(
                { success: false, error: { code: 'VALIDATION_ERROR', message: 'Data tidak valid' } },
                { status: 400 }
            );
        }

        // Get current user
        const userDoc = await db.collection('users').doc(userId).get();
        const userData = userDoc.data();
        const currentAddresses: Address[] = userData?.addresses || [];

        const addressIndex = currentAddresses.findIndex((addr) => addr.id === parseResult.data.id);
        if (addressIndex === -1) {
            return NextResponse.json(
                { success: false, error: { code: 'NOT_FOUND', message: 'Address not found' } },
                { status: 404 }
            );
        }

        // Update address
        let updatedAddresses = [...currentAddresses];

        // If setting as default, update others
        if (parseResult.data.isDefault) {
            updatedAddresses = updatedAddresses.map((addr) => ({ ...addr, isDefault: false }));
        }

        updatedAddresses[addressIndex] = {
            ...updatedAddresses[addressIndex],
            ...parseResult.data,
            isDefault: parseResult.data.isDefault ?? updatedAddresses[addressIndex]?.isDefault ?? false,
        };

        await db.collection('users').doc(userId).update({
            addresses: updatedAddresses,
            defaultAddressIndex: parseResult.data.isDefault ? addressIndex : userData?.defaultAddressIndex || 0,
            updatedAt: FieldValue.serverTimestamp(),
        });

        return NextResponse.json({
            success: true,
            message: 'Address updated successfully',
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error updating address:', error);
        return NextResponse.json(
            { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to update address' } },
            { status: 500 }
        );
    }
}

// ============================================
// DELETE Handler - Delete Address
// ============================================

export async function DELETE(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('tib-session')?.value;

        if (!sessionCookie) {
            return NextResponse.json(
                { success: false, error: { code: 'UNAUTHORIZED', message: 'Please login' } },
                { status: 401 }
            );
        }

        const decodedClaims = await getAdminAuth().verifySessionCookie(sessionCookie, true);
        const userId = decodedClaims.uid;
        const db = getAdminDb();

        const { searchParams } = new URL(request.url);
        const addressId = searchParams.get('id');

        if (!addressId) {
            return NextResponse.json(
                { success: false, error: { code: 'VALIDATION_ERROR', message: 'Address ID required' } },
                { status: 400 }
            );
        }

        // Get current user
        const userDoc = await db.collection('users').doc(userId).get();
        const userData = userDoc.data();
        const currentAddresses: Address[] = userData?.addresses || [];

        const addressIndex = currentAddresses.findIndex((addr) => addr.id === addressId);
        if (addressIndex === -1) {
            return NextResponse.json(
                { success: false, error: { code: 'NOT_FOUND', message: 'Address not found' } },
                { status: 404 }
            );
        }

        // Remove address
        const updatedAddresses = currentAddresses.filter((addr) => addr.id !== addressId);

        // If deleted was default, set first as default
        if (currentAddresses[addressIndex]?.isDefault && updatedAddresses.length > 0) {
            const firstAddress = updatedAddresses[0];
            if (firstAddress) {
                updatedAddresses[0] = { ...firstAddress, isDefault: true };
            }
        }

        await db.collection('users').doc(userId).update({
            addresses: updatedAddresses,
            defaultAddressIndex: 0,
            updatedAt: FieldValue.serverTimestamp(),
        });

        return NextResponse.json({
            success: true,
            message: 'Address deleted successfully',
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error deleting address:', error);
        return NextResponse.json(
            { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to delete address' } },
            { status: 500 }
        );
    }
}
