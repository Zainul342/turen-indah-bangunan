/**
 * Auth Provider
 * ==============
 * Wraps the app with Firebase Auth state listener.
 * Syncs Firebase Auth state → Zustand store automatically.
 *
 * @file src/components/providers/auth-provider.tsx
 * @project Turen Indah Bangunan
 */

'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import {
    subscribeToAuthState,
    getUserDocument,
    checkAndPromoteAdmin,
} from '@/lib/firebase/auth';
import type { UserState } from '@/types/user';
import type { User as FirebaseUser } from 'firebase/auth';
import type { Timestamp } from 'firebase/firestore';

// ============================================
// Props
// ============================================

interface AuthProviderProps {
    children: React.ReactNode;
}

// ============================================
// Helper
// ============================================

function timestampToString(timestamp: Timestamp | undefined): string {
    if (!timestamp) return new Date().toISOString();
    return timestamp.toDate().toISOString();
}

async function firebaseUserToState(
    firebaseUser: FirebaseUser
): Promise<UserState | null> {
    const userDoc = await getUserDocument(firebaseUser.uid);

    if (!userDoc) {
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

// ============================================
// Auth Provider Component
// ============================================

export function AuthProvider({ children }: AuthProviderProps) {
    const { setUser, clearUser, setInitialized, setLoading } = useAuthStore();

    useEffect(() => {
        setLoading(true);

        // Subscribe to Firebase Auth state changes
        const unsubscribe = subscribeToAuthState(async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // Check and promote admin if needed
                    await checkAndPromoteAdmin(firebaseUser);

                    // Convert to UserState and update store
                    const userState = await firebaseUserToState(firebaseUser);
                    setUser(userState);
                } catch (error) {
                    console.error('Error syncing user state:', error);
                    clearUser();
                }
            } else {
                clearUser();
            }

            setInitialized(true);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [setUser, clearUser, setInitialized, setLoading]);

    return <>{children}</>;
}

export default AuthProvider;
