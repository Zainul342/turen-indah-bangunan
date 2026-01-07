/**
 * Session API Route
 * ==================
 * Manages authentication session cookies.
 *
 * POST   - Create session (set cookie after login)
 * GET    - Verify session & return user info
 * DELETE - Clear session (logout)
 *
 * @file src/app/api/auth/session/route.ts
 * @project Turen Indah Bangunan
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminAuth, getAdminDb } from '@/lib/firebase/admin';

// Cookie configuration
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
};

// ============================================
// POST - Create Session
// ============================================

export async function POST(request: NextRequest) {
    try {
        const { idToken } = await request.json();

        if (!idToken) {
            return NextResponse.json(
                { error: 'ID token is required' },
                { status: 400 }
            );
        }

        // Verify the ID token with Firebase Admin
        const decodedToken = await getAdminAuth().verifyIdToken(idToken);
        const uid = decodedToken.uid;

        // Get user role from Firestore
        const userDoc = await getAdminDb().collection('users').doc(uid).get();
        const userData = userDoc.data();
        const role = userData?.role || 'customer';

        // Create session cookie
        const cookieStore = await cookies();

        // Set session token (using UID for simplicity, could use custom session token)
        cookieStore.set('tib-session', uid, COOKIE_OPTIONS);
        cookieStore.set('tib-role', role, {
            ...COOKIE_OPTIONS,
            httpOnly: false, // Role can be read by client for UI purposes
        });

        return NextResponse.json({
            success: true,
            user: {
                uid,
                email: decodedToken.email,
                role,
            },
        });
    } catch (error) {
        console.error('Session creation error:', error);
        return NextResponse.json(
            { error: 'Failed to create session' },
            { status: 401 }
        );
    }
}

// ============================================
// GET - Verify Session
// ============================================

export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get('tib-session')?.value;

        if (!sessionToken) {
            return NextResponse.json(
                { authenticated: false, user: null },
                { status: 200 }
            );
        }

        // Get user data from Firestore using UID from cookie
        const userDoc = await getAdminDb().collection('users').doc(sessionToken).get();

        if (!userDoc.exists) {
            // Clear invalid session
            cookieStore.delete('tib-session');
            cookieStore.delete('tib-role');

            return NextResponse.json(
                { authenticated: false, user: null },
                { status: 200 }
            );
        }

        const userData = userDoc.data();

        return NextResponse.json({
            authenticated: true,
            user: {
                uid: sessionToken,
                email: userData?.email,
                displayName: userData?.displayName,
                role: userData?.role,
                photoURL: userData?.photoURL,
            },
        });
    } catch (error) {
        console.error('Session verification error:', error);
        return NextResponse.json(
            { authenticated: false, error: 'Session verification failed' },
            { status: 500 }
        );
    }
}

// ============================================
// DELETE - Clear Session (Logout)
// ============================================

export async function DELETE() {
    try {
        const cookieStore = await cookies();

        // Clear session cookies
        cookieStore.delete('tib-session');
        cookieStore.delete('tib-role');

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Session deletion error:', error);
        return NextResponse.json(
            { error: 'Failed to clear session' },
            { status: 500 }
        );
    }
}
