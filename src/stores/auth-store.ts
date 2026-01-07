/**
 * Auth Store (Zustand)
 * =====================
 * Client-side auth state management.
 *
 * @file src/stores/auth-store.ts
 * @project Turen Indah Bangunan
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { UserState, UserRole } from '@/types/user';

// ============================================
// Store Types
// ============================================

interface AuthState {
    // State
    user: UserState | null;
    isLoading: boolean;
    isInitialized: boolean;

    // Computed (implemented as getters in selectors)
    // isAuthenticated, isAdmin, etc.

    // Actions
    setUser: (user: UserState | null) => void;
    setLoading: (isLoading: boolean) => void;
    setInitialized: (isInitialized: boolean) => void;
    clearUser: () => void;
    updateUser: (updates: Partial<UserState>) => void;
}

// ============================================
// Store Implementation
// ============================================

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            // Initial state
            user: null,
            isLoading: true,
            isInitialized: false,

            // Actions
            setUser: (user) => set({ user, isLoading: false }),

            setLoading: (isLoading) => set({ isLoading }),

            setInitialized: (isInitialized) => set({ isInitialized, isLoading: false }),

            clearUser: () => set({ user: null, isLoading: false }),

            updateUser: (updates) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...updates } : null,
                })),
        }),
        {
            name: 'tib-auth-storage',
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({
                // Only persist user data, not loading states
                user: state.user,
            }),
        }
    )
);

// ============================================
// Selectors (for optimized re-renders)
// ============================================

export const selectUser = (state: AuthState) => state.user;
export const selectIsLoading = (state: AuthState) => state.isLoading;
export const selectIsInitialized = (state: AuthState) => state.isInitialized;

export const selectIsAuthenticated = (state: AuthState) =>
    state.user !== null && state.user.role !== 'guest';

export const selectIsAdmin = (state: AuthState) =>
    state.user?.role === 'admin';

export const selectIsB2B = (state: AuthState) =>
    state.user?.role === 'b2b';

export const selectUserRole = (state: AuthState): UserRole =>
    state.user?.role || 'guest';

// ============================================
// Hook Shortcuts
// ============================================

export const useUser = () => useAuthStore(selectUser);
export const useIsAuthenticated = () => useAuthStore(selectIsAuthenticated);
export const useIsAdmin = () => useAuthStore(selectIsAdmin);
export const useUserRole = () => useAuthStore(selectUserRole);
