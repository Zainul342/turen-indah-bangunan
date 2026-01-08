/**
 * User Profile API Route
 * ========================
 * GET /api/user - Get current user profile
 * PUT /api/user - Update user profile (name, phone)
 *
 * @file src/app/api/user/route.ts
 * @project Turen Indah Bangunan
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { getAdminDb, getAdminAuth } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

// ============================================
// Validation Schema
// ============================================

const updateProfileSchema = z.object({
    displayName: z.string().min(2, 'Nama minimal 2 karakter').optional(),
    phone: z.string().regex(/^(\+62|62|0)8[1-9][0-9]{6,10}$/, 'Format nomor telepon tidak valid').optional(),
});

// ============================================
// GET Handler - Get User Profile
// ============================================

export async function GET() {
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

        // Get user document
        const userDoc = await db.collection('users').doc(userId).get();

        if (!userDoc.exists) {
            return NextResponse.json(
                { success: false, error: { code: 'NOT_FOUND', message: 'User not found' } },
                { status: 404 }
            );
        }

        const userData = userDoc.data();

        // Get order count
        const ordersSnapshot = await db.collection('orders').where('userId', '==', userId).count().get();
        const orderCount = ordersSnapshot.data().count;

        return NextResponse.json({
            success: true,
            data: {
                id: userDoc.id,
                email: userData?.email,
                displayName: userData?.displayName,
                phone: userData?.phone,
                photoURL: userData?.photoURL,
                role: userData?.role || 'customer',
                addresses: userData?.addresses || [],
                defaultAddressIndex: userData?.defaultAddressIndex || 0,
                createdAt: userData?.createdAt?.toDate?.()?.toISOString() || userData?.createdAt,
                stats: {
                    orderCount,
                    addressCount: (userData?.addresses || []).length,
                },
            },
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching user profile:', error);
        return NextResponse.json(
            { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch profile' } },
            { status: 500 }
        );
    }
}

// ============================================
// PUT Handler - Update User Profile
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

        // Parse and validate body
        const body = await request.json();
        const parseResult = updateProfileSchema.safeParse(body);

        if (!parseResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        code: 'VALIDATION_ERROR',
                        message: 'Data tidak valid',
                        details: parseResult.error.errors,
                    },
                },
                { status: 400 }
            );
        }

        const updates: Record<string, unknown> = {
            updatedAt: FieldValue.serverTimestamp(),
        };

        if (parseResult.data.displayName) {
            updates.displayName = parseResult.data.displayName;
        }
        if (parseResult.data.phone) {
            updates.phone = parseResult.data.phone;
        }

        await db.collection('users').doc(userId).update(updates);

        return NextResponse.json({
            success: true,
            message: 'Profile updated successfully',
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error updating user profile:', error);
        return NextResponse.json(
            { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to update profile' } },
            { status: 500 }
        );
    }
}
