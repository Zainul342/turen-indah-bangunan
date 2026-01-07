/**
 * Firebase Client Configuration
 * ==============================
 * Client-side Firebase SDK initialization.
 * Uses NEXT_PUBLIC_* environment variables (safe to expose).
 *
 * @file src/lib/firebase/config.ts
 * @project Turen Indah Bangunan
 */

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Firebase configuration from environment variables
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Validate required environment variables
function validateConfig(): void {
    const requiredVars = [
        'NEXT_PUBLIC_FIREBASE_API_KEY',
        'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
        'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
        'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
        'NEXT_PUBLIC_FIREBASE_APP_ID',
    ];

    const missing = requiredVars.filter((varName) => !process.env[varName]);

    if (missing.length > 0) {
        console.warn(
            `⚠️ Missing Firebase environment variables: ${missing.join(', ')}\n` +
            'Make sure to create .env.local file with required values.\n' +
            'See .env.example for reference.'
        );
    }
}

// Initialize Firebase (singleton pattern to prevent multiple instances)
function initializeFirebase(): FirebaseApp {
    if (typeof window !== 'undefined') {
        validateConfig();
    }

    // Check if Firebase app already exists (for Next.js hot reload)
    if (getApps().length > 0) {
        return getApp();
    }

    return initializeApp(firebaseConfig);
}

// Firebase app instance
const app = initializeFirebase();

// Firebase services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

// Export app instance
export default app;
