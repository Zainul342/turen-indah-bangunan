/**
 * Next.js Middleware
 * ===================
 * Edge-level route protection.
 * Runs on every request before page renders.
 * 
 * NOTE: Firebase Admin SDK cannot run in Middleware (Edge Runtime).
 * We only check for cookie existence here. 
 * Full verification happens in Layout/Page/API via verifySessionCookie.
 *
 * @file src/middleware.ts
 * @project Turen Indah Bangunan
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ============================================
// Route Configuration
// ============================================

const protectedRoutes = ['/profile', '/orders', '/settings'];
const adminRoutes = ['/admin'];
const guestOnlyRoutes = ['/login', '/register', '/forgot-password'];

// ============================================
// Helper Functions
// ============================================

function isProtectedRoute(pathname: string): boolean {
    return protectedRoutes.some((route) => pathname.startsWith(route));
}

function isAdminRoute(pathname: string): boolean {
    return adminRoutes.some((route) => pathname.startsWith(route));
}

function isGuestOnlyRoute(pathname: string): boolean {
    return guestOnlyRoutes.some((route) => pathname.startsWith(route));
}

// ============================================
// Middleware Function
// ============================================

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get session token from cookie
    const sessionCookie = request.cookies.get('tib-session')?.value;
    const userRole = request.cookies.get('tib-role')?.value;

    const isAuthenticated = !!sessionCookie;
    const isAdmin = userRole === 'admin';

    // ============================================
    // Route Protection Logic
    // ============================================

    // 1. Guest-only routes
    if (isGuestOnlyRoute(pathname) && isAuthenticated) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // 2. Protected routes
    if (isProtectedRoute(pathname) && !isAuthenticated) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // 3. Admin routes
    if (isAdminRoute(pathname)) {
        if (!isAuthenticated) {
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }
        // Note: Role check depends on 'tib-role' cookie which can be spoofed on client.
        // However, the actual DATA fetching in /admin pages receives 403 from API 
        // because API verifies the actual Session Cookie claims.
        // This middleware check is just for UX/Redirection.
        if (!isAdmin) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
    ],
};
