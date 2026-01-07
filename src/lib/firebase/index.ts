/**
 * Firebase Barrel Export
 * =======================
 * Re-export all Firebase utilities from a single entry point.
 *
 * @file src/lib/firebase/index.ts
 * @project Turen Indah Bangunan
 */

// Client-side exports
export { auth, db, storage } from './config';
export { default as firebaseApp } from './config';

// Note: Admin exports should be imported directly from './admin'
// to ensure they're only used in server-side code.

// Export types for convenience
export type { User } from 'firebase/auth';
export type { DocumentData, QuerySnapshot } from 'firebase/firestore';
