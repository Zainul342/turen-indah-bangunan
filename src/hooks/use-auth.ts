/**
 * useAuth Hook
 * =============
 * Custom hook that combines Firebase Auth state with Zustand store.
 * Provides auth actions and state in one convenient hook.
 *
 * @file src/hooks/use-auth.ts
 * @project Turen Indah Bangunan
 */

'use client';

import { useCallback } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import {
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    signOutUser,
    resetPassword,
    checkAndPromoteAdmin,
    getUserDocument,
} from '@/lib/firebase/auth';
import type { RegisterData, UserState, AuthError } from '@/types/user';
import type { User as FirebaseUser } from 'firebase/auth';
import type { Timestamp } from 'firebase/firestore';
// import { auth } from '@/lib/firebase/config';

// ============================================
// Helper Functions
// ============================================

/**
 * Convert Firestore Timestamp to ISO string
 */
function timestampToString(timestamp: Timestamp | undefined): string {
    if (!timestamp) return new Date().toISOString();
    return timestamp.toDate().toISOString();
}

/**
 * Convert Firebase User + Firestore doc to UserState
 */
async function firebaseUserToState(
    firebaseUser: FirebaseUser
): Promise<UserState | null> {
    const userDoc = await getUserDocument(firebaseUser.uid);

    if (!userDoc) {
        // Basic user state if no Firestore doc yet
        return {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || '',
            photoURL: firebaseUser.photoURL || undefined,
            role: 'customer',
            addresses: [],
            defaultAddressIndex: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString(),
        };
    }

    return {
        id: userDoc.id,
        email: userDoc.email,
        displayName: userDoc.displayName,
        phone: userDoc.phone,
        photoURL: userDoc.photoURL,
        role: userDoc.role,
        addresses: userDoc.addresses,
        defaultAddressIndex: userDoc.defaultAddressIndex,
        companyName: userDoc.companyName,
        npwp: userDoc.npwp,
        creditLimit: userDoc.creditLimit,
        creditUsed: userDoc.creditUsed,
        createdAt: timestampToString(userDoc.createdAt),
        updatedAt: timestampToString(userDoc.updatedAt),
        lastLoginAt: timestampToString(userDoc.lastLoginAt),
    };
}

/**
 * Create session cookie via API
 */
async function createSession(firebaseUser: FirebaseUser): Promise<void> {
    try {
        const idToken = await firebaseUser.getIdToken();
        await fetch('/api/auth/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken }),
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to create session:', error);
    }
}

/**
 * Clear session cookie via API
 */
async function clearSession(): Promise<void> {
    try {
        await fetch('/api/auth/session', { method: 'DELETE' });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to clear session:', error);
    }
}

// ============================================
// useAuth Hook
// ============================================

export function useAuth() {
    const {
        user,
        isLoading,
        isInitialized,
        setUser,
        setLoading,
        clearUser,
    } = useAuthStore();

    // Computed values
    const isAuthenticated = user !== null && user.role !== 'guest';
    const isAdmin = user?.role === 'admin';
    const isB2B = user?.role === 'b2b';

    /**
     * Register new user
     */
    const register = useCallback(
        async (
            data: RegisterData
        ): Promise<{ success: true } | { error: AuthError }> => {
            setLoading(true);

            const result = await signUpWithEmail(data);

            if ('error' in result) {
                setLoading(false);
                return { error: result.error };
            }

            // Check if should be promoted to admin
            await checkAndPromoteAdmin(result.user);

            // Create session cookie for middleware
            await createSession(result.user);

            // Fetch and set user state
            const userState = await firebaseUserToState(result.user);
            setUser(userState);

            return { success: true };
        },
        [setLoading, setUser]
    );

    /**
     * Login with email/password
     */
    const loginWithEmail = useCallback(
        async (
            email: string,
            password: string
        ): Promise<{ success: true } | { error: AuthError }> => {
            setLoading(true);

            const result = await signInWithEmail(email, password);

            if ('error' in result) {
                setLoading(false);
                return { error: result.error };
            }

            // Check if should be promoted to admin
            await checkAndPromoteAdmin(result.user);

            // Create session cookie for middleware
            await createSession(result.user);

            // Fetch and set user state
            const userState = await firebaseUserToState(result.user);
            setUser(userState);

            return { success: true };
        },
        [setLoading, setUser]
    );

    /**
     * Login with Google OAuth
     */
    const loginWithGoogle = useCallback(async (): Promise<
        { success: true } | { error: AuthError }
    > => {
        setLoading(true);

        const result = await signInWithGoogle();

        if ('error' in result) {
            setLoading(false);
            return { error: result.error };
        }

        // Check if should be promoted to admin
        await checkAndPromoteAdmin(result.user);

        // Create session cookie for middleware
        await createSession(result.user);

        // Fetch and set user state
        const userState = await firebaseUserToState(result.user);
        setUser(userState);

        return { success: true };
    }, [setLoading, setUser]);

    /**
     * Logout
     */
    const logout = useCallback(async (): Promise<
        { success: true } | { error: AuthError }
    > => {
        setLoading(true);

        const result = await signOutUser();

        if ('error' in result) {
            setLoading(false);
            return { error: result.error };
        }

        // Clear session cookie
        await clearSession();

        clearUser();
        return { success: true };
    }, [setLoading, clearUser]);

    /**
     * Send password reset email
     */
    const sendPasswordReset = useCallback(
        async (email: string): Promise<{ success: true } | { error: AuthError }> => {
            return await resetPassword(email);
        },
        []
    );

    /**
     * Sync Firebase user to store (called by AuthProvider)
     */
    const syncUser = useCallback(
        async (firebaseUser: FirebaseUser | null) => {
            if (firebaseUser) {
                const userState = await firebaseUserToState(firebaseUser);
                setUser(userState);
            } else {
                clearUser();
            }
        },
        [setUser, clearUser]
    );

    return {
        // State
        user,
        isLoading,
        isInitialized,
        isAuthenticated,
        isAdmin,
        isB2B,

        // Actions
        register,
        loginWithEmail,
        loginWithGoogle,
        logout,
        sendPasswordReset,
        syncUser,
    };
}

export default useAuth;
