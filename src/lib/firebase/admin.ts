/**
 * Firebase Admin SDK Configuration
 * ==================================
 * Server-side only Firebase Admin SDK initialization.
 * Uses non-public environment variables (NEVER expose to client).
 *
 * @file src/lib/firebase/admin.ts
 * @project Turen Indah Bangunan
 *
 * IMPORTANT: Only use this file in:
 * - API routes (/app/api/*)
 * - Server Actions
 * - getServerSideProps
 *
 * NEVER import this file in client-side components!
 */

import * as admin from 'firebase-admin';

// Check if running on server
function isServer(): boolean {
    return typeof window === 'undefined';
}

// Validate admin environment variables
function validateAdminConfig(): void {
    const requiredVars = [
        'FIREBASE_ADMIN_PROJECT_ID',
        'FIREBASE_ADMIN_CLIENT_EMAIL',
        'FIREBASE_ADMIN_PRIVATE_KEY',
    ];

    const missing = requiredVars.filter((varName) => !process.env[varName]);

    if (missing.length > 0) {
        // eslint-disable-next-line no-console
        console.warn(
            `⚠️ Missing Firebase Admin environment variables: ${missing.join(', ')}\n` +
            'Firebase Admin SDK will not work until these are configured.\n' +
            'See .env.example for reference.'
        );
    }
}

// Initialize Firebase Admin (singleton pattern)
function initializeAdmin(): admin.app.App | null {
    // Only run on server
    if (!isServer()) {
        // eslint-disable-next-line no-console
        console.error(
            '❌ Firebase Admin SDK should only be used on the server side!'
        );
        return null;
    }

    // Validate config
    validateAdminConfig();

    // Already initialized
    if (admin.apps.length > 0) {
        return admin.app();
    }

    // Check for required credentials
    const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

    // If credentials are missing, return null but don't crash
    if (!projectId || !clientEmail || !privateKey) {
        // eslint-disable-next-line no-console
        console.warn(
            '⚠️ Firebase Admin credentials not configured. Server-side features disabled.'
        );
        return null;
    }

    try {
        return admin.initializeApp({
            credential: admin.credential.cert({
                projectId,
                clientEmail,
                // Handle newline escaping in private key
                privateKey: privateKey.replace(/\\n/g, '\n'),
            }),
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('❌ Failed to initialize Firebase Admin:', error);
        return null;
    }
}

// Initialize admin app
const adminApp = initializeAdmin();

// Export admin services (with null checks)
export const adminAuth = adminApp ? admin.auth() : null;
export const adminDb = adminApp ? admin.firestore() : null;
export const adminStorage = adminApp ? admin.storage() : null;

// Export admin instance
export default admin;

/**
 * Helper to check if Admin SDK is initialized
 */
export function isAdminInitialized(): boolean {
    return adminApp !== null;
}

/**
 * Helper to get admin auth (throws if not initialized)
 */
export function getAdminAuth(): admin.auth.Auth {
    if (!adminAuth) {
        throw new Error(
            'Firebase Admin Auth not initialized. Check your environment variables.'
        );
    }
    return adminAuth;
}

/**
 * Helper to get admin firestore (throws if not initialized)
 */
export function getAdminDb(): admin.firestore.Firestore {
    if (!adminDb) {
        throw new Error(
            'Firebase Admin Firestore not initialized. Check your environment variables.'
        );
    }
    return adminDb;
}
