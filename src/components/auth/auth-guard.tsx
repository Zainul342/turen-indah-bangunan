/**
 * AuthGuard Component
 * ====================
 * Client-side protection wrapper for authenticated content.
 *
 * Usage:
 * <AuthGuard>Protected content</AuthGuard>
 * <AuthGuard requiredRole="admin">Admin only</AuthGuard>
 *
 * @file src/components/auth/auth-guard.tsx
 * @project Turen Indah Bangunan
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import type { UserRole } from '@/types/user';

// ============================================
// Props
// ============================================

interface AuthGuardProps {
    children: React.ReactNode;
    requiredRole?: UserRole;
    fallback?: React.ReactNode;
    redirectTo?: string;
}

// ============================================
// Loading Component
// ============================================

function LoadingScreen() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Memuat...</p>
            </div>
        </div>
    );
}

// ============================================
// AuthGuard Component
// ============================================

export function AuthGuard({
    children,
    requiredRole,
    fallback,
    redirectTo = '/login',
}: AuthGuardProps) {
    const router = useRouter();
    const { user, isAuthenticated, isInitialized, isLoading } = useAuth();

    useEffect(() => {
        // Wait for auth to initialize
        if (!isInitialized || isLoading) return;

        // Not authenticated → redirect to login
        if (!isAuthenticated) {
            const currentPath = window.location.pathname;
            router.push(`${redirectTo}?redirect=${encodeURIComponent(currentPath)}`);
            return;
        }

        // Check role requirement
        if (requiredRole && user?.role !== requiredRole) {
            // Special case: admin route but not admin
            if (requiredRole === 'admin') {
                router.push('/');
            }
        }
    }, [isAuthenticated, isInitialized, isLoading, requiredRole, user, router, redirectTo]);

    // Still loading
    if (!isInitialized || isLoading) {
        return fallback || <LoadingScreen />;
    }

    // Not authenticated
    if (!isAuthenticated) {
        return fallback || <LoadingScreen />;
    }

    // Role check failed
    if (requiredRole && user?.role !== requiredRole) {
        return fallback || <LoadingScreen />;
    }

    // All checks passed
    return <>{children}</>;
}

// ============================================
// Higher-Order Component Version
// ============================================

export function withAuth<P extends object>(
    Component: React.ComponentType<P>,
    requiredRole?: UserRole
) {
    return function ProtectedComponent(props: P) {
        return (
            <AuthGuard requiredRole={requiredRole}>
                <Component {...props} />
            </AuthGuard>
        );
    };
}

export default AuthGuard;
