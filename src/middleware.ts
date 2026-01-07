/**
 * Next.js Middleware
 * ===================
 * Edge-level route protection.
 * Runs on every request before page renders.
 *
 * @file src/middleware.ts
 * @project Turen Indah Bangunan
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ============================================
// Route Configuration
// ============================================

// Routes that require authentication
const protectedRoutes = ['/profile', '/orders', '/settings'];

// Routes only for admin
const adminRoutes = ['/admin'];

// Routes only for guests (redirect if logged in)
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
    const sessionToken = request.cookies.get('tib-session')?.value;
    const userRole = request.cookies.get('tib-role')?.value;

    const isAuthenticated = !!sessionToken;
    const isAdmin = userRole === 'admin';

    // ============================================
    // Route Protection Logic
    // ============================================

    // 1. Guest-only routes (login, register)
    // Redirect to home if already logged in
    if (isGuestOnlyRoute(pathname) && isAuthenticated) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // 2. Protected routes (profile, orders)
    // Redirect to login if not authenticated
    if (isProtectedRoute(pathname) && !isAuthenticated) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // 3. Admin routes
    // Redirect to home if not admin
    if (isAdminRoute(pathname)) {
        if (!isAuthenticated) {
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }
        if (!isAdmin) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // Allow request to continue
    return NextResponse.next();
}

// ============================================
// Middleware Config
// ============================================

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api routes (handled separately)
         * - _next/static (static files)
         * - _next/image (image optimization)
         * - favicon.ico
         * - public files
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
    ],
};
