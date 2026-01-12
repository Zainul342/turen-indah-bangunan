/**
 * Next.js Middleware
 * ===================
 * Edge-level route protection.
 * Runs on every request before page renders.
 * 
 * ⚠️ SECURITY WARNING: This middleware is OPTIMISTIC UX ONLY.
 * - Cookies (tib-session, tib-role) can be spoofed client-side
 * - NEVER trust middleware for actual security decisions
 * - Real verification happens in Server Components / API routes via verifySessionCookie()
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
// Type Definitions
// ============================================

const ADMIN_ROLES = ['admin', 'superadmin'] as const;
type AdminRole = typeof ADMIN_ROLES[number];

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

function isAdminRole(role: string | undefined): role is AdminRole {
    return role !== undefined && ADMIN_ROLES.includes(role as AdminRole);
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
    const isAdmin = isAdminRole(userRole);

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
        // ⚠️ Role check based on 'tib-role' cookie (can be spoofed!)
        // Real security happens in /admin/layout.tsx via verifySessionCookie()
        // This is just UX optimization to avoid showing admin UI then redirecting
        if (!isAdmin) {
            const homeUrl = new URL('/', request.url);
            homeUrl.searchParams.set('error', 'admin_only');
            return NextResponse.redirect(homeUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
    ],
};
