/**
 * Session API Route
 * ==================
 * Manages authentication session cookies using Firebase Admin SDK.
 * Uses secure Session Cookies instead of raw UIDs.
 *
 * POST   - Create session cookie
 * GET    - Verify session cookie
 * DELETE - Revoke session
 *
 * @file src/app/api/auth/session/route.ts
 * @project Turen Indah Bangunan
 */

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminAuth, getAdminDb } from '@/lib/firebase/admin';

// Cookie configuration
const EXPIRES_IN = 60 * 60 * 24 * 5 * 1000; // 5 days
const COOKIE_NAME = 'tib-session';
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: EXPIRES_IN / 1000,
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

        const auth = getAdminAuth();

        // Verify the ID token first
        const decodedToken = await auth.verifyIdToken(idToken);

        // Check if user has logged in recently
        if (new Date().getTime() / 1000 - decodedToken.auth_time > 5 * 60) {
            return NextResponse.json(
                { error: 'Recent sign-in required' },
                { status: 401 }
            );
        }

        // Create session cookie
        const sessionCookie = await auth.createSessionCookie(idToken, {
            expiresIn: EXPIRES_IN,
        });

        // Get user role
        const uid = decodedToken.uid;
        const userDoc = await getAdminDb().collection('users').doc(uid).get();
        const userData = userDoc.data();
        const role = userData?.role || 'customer';

        // Set cookies
        const cookieStore = await cookies();
        cookieStore.set(COOKIE_NAME, sessionCookie, COOKIE_OPTIONS);

        // Role cookie (Not HTTPOnly, for client-side UI logic)
        // Note: Do NOT trust this for security checks on server
        cookieStore.set('tib-role', role, {
            ...COOKIE_OPTIONS,
            httpOnly: false,
        });

        return NextResponse.json({ success: true, role });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Session creation error:', error);
        return NextResponse.json(
            { error: 'Unauthorized' },
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
        const sessionCookie = cookieStore.get(COOKIE_NAME)?.value;

        if (!sessionCookie) {
            return NextResponse.json({ authenticated: false }, { status: 200 });
        }

        // Verify session cookie
        const decodedClaims = await getAdminAuth().verifySessionCookie(
            sessionCookie,
            true // checkRevoked
        );

        return NextResponse.json({
            authenticated: true,
            user: {
                uid: decodedClaims.uid,
                email: decodedClaims.email,
            },
        });
    } catch {
        // Session verification failed (expired or invalid)
        return NextResponse.json({ authenticated: false }, { status: 200 });
    }
}

// ============================================
// DELETE - Logout
// ============================================

export async function DELETE() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(COOKIE_NAME)?.value;

    if (sessionCookie) {
        try {
            const decodedClaims = await getAdminAuth().verifySessionCookie(sessionCookie);
            await getAdminAuth().revokeRefreshTokens(decodedClaims.sub);
        } catch {
            // Ignore error if cookie is invalid, just clear it
        }
    }

    cookieStore.delete(COOKIE_NAME);
    cookieStore.delete('tib-role');

    return NextResponse.json({ success: true });
}
