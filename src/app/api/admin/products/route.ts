/**
 * Admin Products API Route
 * =========================
 * POST /api/admin/products - Create new product
 * GET /api/admin/products - List all products for admin
 *
 * @file src/app/api/admin/products/route.ts
 * @project Turen Indah Bangunan
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminDb, getAdminAuth } from '@/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { createProductSchema } from '@/schemas/product.schema';

// ============================================
// Helper: Check Admin
// ============================================

async function checkAdmin() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('tib-session')?.value;

    if (!sessionCookie) return null;

    try {
        const decodedClaims = await getAdminAuth().verifySessionCookie(sessionCookie, true);
        const userDoc = await getAdminDb().collection('users').doc(decodedClaims.uid).get();
        const userData = userDoc.data();

        if (userData?.role !== 'admin') return null;
        return decodedClaims.uid;
    } catch {
        return null;
    }
}

// ============================================
// GET Handler - List Products
// ============================================

export async function GET(request: NextRequest) {
    const adminId = await checkAdmin();
    if (!adminId) {
        return NextResponse.json(
            { success: false, error: { code: 'UNAUTHORIZED', message: 'Admin access required' } },
            { status: 401 }
        );
    }

    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '50');
        const status = searchParams.get('status');

        const db = getAdminDb();
        let productsQuery = db.collection('products').orderBy('createdAt', 'desc').limit(limit);

        if (status) {
            productsQuery = productsQuery.where('status', '==', status);
        }

        const snapshot = await productsQuery.get();
        const products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
            updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || doc.data().updatedAt,
        }));

        return NextResponse.json({ success: true, data: products });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching admin products:', error);
        return NextResponse.json(
            { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to fetch products' } },
            { status: 500 }
        );
    }
}

// ============================================
// POST Handler - Create Product
// ============================================

export async function POST(request: NextRequest) {
    const adminId = await checkAdmin();
    if (!adminId) {
        return NextResponse.json(
            { success: false, error: { code: 'UNAUTHORIZED', message: 'Admin access required' } },
            { status: 401 }
        );
    }

    try {
        const body = await request.json();
        const parseResult = createProductSchema.safeParse(body);

        if (!parseResult.success) {
            return NextResponse.json(
                { success: false, error: { code: 'VALIDATION_ERROR', message: 'Data tidak valid', details: parseResult.error.errors } },
                { status: 400 }
            );
        }

        const db = getAdminDb();

        // Check if slug already exists
        const existingSlug = await db.collection('products').where('slug', '==', parseResult.data.slug).limit(1).get();
        if (!existingSlug.empty) {
            return NextResponse.json(
                { success: false, error: { code: 'CONFLICT', message: 'Slug produk sudah digunakan' } },
                { status: 409 }
            );
        }

        const productData = {
            ...parseResult.data,
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
            createdBy: adminId,
            averageRating: 0,
            reviewCount: 0,
            totalSold: 0,
        };

        const docRef = await db.collection('products').add(productData);

        return NextResponse.json({
            success: true,
            data: { id: docRef.id, ...parseResult.data },
        }, { status: 201 });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error creating product:', error);
        return NextResponse.json(
            { success: false, error: { code: 'INTERNAL_ERROR', message: 'Failed to create product' } },
            { status: 500 }
        );
    }
}
