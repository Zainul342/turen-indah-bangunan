/**
 * Firebase Connection Test
 * =========================
 * Simple script to verify Firebase connection is working.
 *
 * Run with: npx tsx scripts/test-firebase-connection.ts
 *
 * @file scripts/test-firebase-connection.ts
 * @project Turen Indah Bangunan
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
};

function log(message: string, status: 'success' | 'error' | 'warn' | 'info') {
    const colorMap = {
        success: colors.green,
        error: colors.red,
        warn: colors.yellow,
        info: colors.cyan,
    };
    const icon = {
        success: '✅',
        error: '❌',
        warn: '⚠️',
        info: 'ℹ️',
    };
    console.log(
        `${colorMap[status]}${icon[status]} ${message}${colors.reset}`
    );
}

async function testFirebaseConnection() {
    console.log('\n========================================');
    console.log('🔥 Firebase Connection Test');
    console.log('========================================\n');

    // Load environment variables
    const dotenv = await import('dotenv');
    dotenv.config({ path: '.env.local' });

    // Check environment variables
    console.log('1️⃣ Checking environment variables...\n');

    const requiredVars = [
        'NEXT_PUBLIC_FIREBASE_API_KEY',
        'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
        'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
        'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
        'NEXT_PUBLIC_FIREBASE_APP_ID',
    ];

    let allVarsPresent = true;
    for (const varName of requiredVars) {
        if (process.env[varName]) {
            log(`${varName}: ✓ (set)`, 'success');
        } else {
            log(`${varName}: ✗ (missing)`, 'error');
            allVarsPresent = false;
        }
    }

    if (!allVarsPresent) {
        log('\nMissing required environment variables!', 'error');
        log('Please copy .env.example to .env.local and fill in values.', 'warn');
        process.exit(1);
    }

    // Initialize Firebase
    console.log('\n2️⃣ Initializing Firebase...\n');

    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    try {
        const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        log(`Firebase app initialized: ${app.name}`, 'success');
        log(`Project ID: ${app.options.projectId}`, 'info');
    } catch (error) {
        log(`Failed to initialize Firebase: ${error}`, 'error');
        process.exit(1);
    }

    // Test Firestore connection
    console.log('\n3️⃣ Testing Firestore connection...\n');

    try {
        const db = getFirestore();
        log('Firestore instance created', 'success');

        // Try to read from a collection (will work even if empty)
        const testSnapshot = await getDocs(collection(db, 'products'));
        log(`Firestore connected! Found ${testSnapshot.size} documents in 'products'`, 'success');
    } catch (error) {
        log(`Firestore error: ${error}`, 'error');
        log('This might be due to security rules or network issues.', 'warn');
    }

    // Test Auth initialization
    console.log('\n4️⃣ Testing Auth initialization...\n');

    try {
        const auth = getAuth();
        log('Auth instance created', 'success');
        log(`Auth domain: ${auth.config.authDomain}`, 'info');
    } catch (error) {
        log(`Auth error: ${error}`, 'error');
    }

    // Test Storage initialization
    console.log('\n5️⃣ Testing Storage initialization...\n');

    try {
        const storage = getStorage();
        log('Storage instance created', 'success');
        log(`Storage bucket: ${storage.app.options.storageBucket}`, 'info');
    } catch (error) {
        log(`Storage error: ${error}`, 'error');
    }

    // Summary
    console.log('\n========================================');
    log('Firebase connection test completed!', 'success');
    console.log('========================================\n');

    process.exit(0);
}

// Run the test
testFirebaseConnection().catch((error) => {
    console.error('Unexpected error:', error);
    process.exit(1);
});
