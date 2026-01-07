/**
 * User Types
 * ===========
 * TypeScript type definitions for user-related data.
 * Matches Firestore schema defined in docs/database.md
 *
 * @file src/types/user.ts
 * @project Turen Indah Bangunan
 */

import type { Timestamp } from 'firebase/firestore';

// ============================================
// Role Definitions
// ============================================

/**
 * User roles for RBAC
 * - guest: Not logged in (anonymous session)
 * - customer: Registered user (email verified)
 * - admin: Staff with full access
 * - b2b: Business customer with special pricing
 */
export type UserRole = 'guest' | 'customer' | 'admin' | 'b2b';

// ============================================
// Address Types
// ============================================

export interface Address {
    id: string;
    label: string; // "Rumah", "Kantor", etc.
    recipientName: string;
    phone: string;
    province: string;
    city: string;
    district: string;
    postalCode: string;
    fullAddress: string;
    isDefault: boolean;
}

// ============================================
// User Types
// ============================================

/**
 * User document stored in Firestore
 * Path: /users/{userId}
 */
export interface User {
    // Identity
    id: string; // Firebase Auth UID
    email: string;
    phone?: string;
    displayName: string;
    photoURL?: string;

    // Role
    role: UserRole;

    // Profile
    addresses: Address[];
    defaultAddressIndex: number;

    // B2B specific (optional)
    companyName?: string;
    npwp?: string;
    creditLimit?: number;
    creditUsed?: number;

    // Metadata
    createdAt: Timestamp;
    updatedAt: Timestamp;
    lastLoginAt: Timestamp;
}

/**
 * User data for client-side state (without Firestore Timestamps)
 * Used in Zustand store and React components
 */
export interface UserState {
    id: string;
    email: string;
    phone?: string;
    displayName: string;
    photoURL?: string;
    role: UserRole;
    addresses: Address[];
    defaultAddressIndex: number;
    companyName?: string;
    npwp?: string;
    creditLimit?: number;
    creditUsed?: number;
    createdAt: string; // ISO string
    updatedAt: string;
    lastLoginAt: string;
}

// ============================================
// Auth Types
// ============================================

export interface AuthCredentials {
    email: string;
    password: string;
}

export interface RegisterData extends AuthCredentials {
    displayName: string;
    phone?: string;
}

export interface AuthError {
    code: string;
    message: string;
}

// ============================================
// Permission Helpers
// ============================================

/**
 * Check if user has admin role
 */
export function isAdmin(user: User | UserState | null): boolean {
    return user?.role === 'admin';
}

/**
 * Check if user is authenticated (not guest)
 */
export function isAuthenticated(user: User | UserState | null): boolean {
    return user !== null && user.role !== 'guest';
}

/**
 * Check if user is B2B customer
 */
export function isB2B(user: User | UserState | null): boolean {
    return user?.role === 'b2b';
}
