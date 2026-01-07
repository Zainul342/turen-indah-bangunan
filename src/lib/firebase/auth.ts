/**
 * Firebase Auth Helpers
 * ======================
 * Authentication functions for Email/Password and Google OAuth.
 *
 * @file src/lib/firebase/auth.ts
 * @project Turen Indah Bangunan
 */

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    sendPasswordResetEmail,
    updateProfile,
    onAuthStateChanged,
    type User as FirebaseUser,
    type UserCredential,
} from 'firebase/auth';
import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    serverTimestamp,
    // Timestamp,
} from 'firebase/firestore';
import { auth, db } from './config';
import type { User, UserRole, RegisterData, AuthError } from '@/types/user';

// ============================================
// Google OAuth Provider
// ============================================

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account',
});

// ============================================
// Error Handling
// ============================================

/**
 * Convert Firebase auth error to user-friendly message
 */
export function getAuthErrorMessage(errorCode: string): string {
    const errorMessages: Record<string, string> = {
        'auth/email-already-in-use': 'Email sudah terdaftar. Silakan login.',
        'auth/invalid-email': 'Format email tidak valid.',
        'auth/user-disabled': 'Akun ini telah dinonaktifkan.',
        'auth/user-not-found': 'Email tidak terdaftar.',
        'auth/wrong-password': 'Password salah.',
        'auth/invalid-credential': 'Email atau password salah.',
        'auth/too-many-requests': 'Terlalu banyak percobaan. Coba lagi nanti.',
        'auth/weak-password': 'Password terlalu lemah.',
        'auth/popup-closed-by-user': 'Login dibatalkan.',
        'auth/network-request-failed': 'Koneksi internet bermasalah.',
        'auth/requires-recent-login': 'Silakan login ulang untuk melanjutkan.',
    };

    return errorMessages[errorCode] || 'Terjadi kesalahan. Silakan coba lagi.';
}

/**
 * Handle auth errors consistently
 */
function handleAuthError(error: unknown): AuthError {
    const firebaseError = error as { code?: string; message?: string };
    return {
        code: firebaseError.code || 'unknown',
        message: getAuthErrorMessage(firebaseError.code || ''),
    };
}

// ============================================
// User Document Management
// ============================================

/**
 * Create user document in Firestore after registration
 */
export async function createUserDocument(
    firebaseUser: FirebaseUser,
    additionalData?: Partial<User>
): Promise<void> {
    const userRef = doc(db, 'users', firebaseUser.uid);
    const userSnap = await getDoc(userRef);

    // Only create if doesn't exist
    if (!userSnap.exists()) {
        const userData: Omit<User, 'createdAt' | 'updatedAt' | 'lastLoginAt'> & {
            createdAt: ReturnType<typeof serverTimestamp>;
            updatedAt: ReturnType<typeof serverTimestamp>;
            lastLoginAt: ReturnType<typeof serverTimestamp>;
        } = {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || additionalData?.displayName || '',
            photoURL: firebaseUser.photoURL || undefined,
            phone: additionalData?.phone || undefined,
            role: 'customer', // Default role
            addresses: [],
            defaultAddressIndex: 0,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            lastLoginAt: serverTimestamp(),
            ...additionalData,
        };

        await setDoc(userRef, userData);
    } else {
        // Update last login time
        await updateDoc(userRef, {
            lastLoginAt: serverTimestamp(),
        });
    }
}

/**
 * Get user document from Firestore
 */
export async function getUserDocument(userId: string): Promise<User | null> {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        return userSnap.data() as User;
    }

    return null;
}

/**
 * Get user's role from Firestore
 */
export async function getUserRole(userId: string): Promise<UserRole> {
    const user = await getUserDocument(userId);
    return user?.role || 'guest';
}

/**
 * Update user role (admin only operation)
 */
export async function updateUserRole(
    userId: string,
    newRole: UserRole
): Promise<void> {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
        role: newRole,
        updatedAt: serverTimestamp(),
    });
}

// ============================================
// Email/Password Authentication
// ============================================

/**
 * Register new user with email and password
 */
export async function signUpWithEmail(
    data: RegisterData
): Promise<{ user: FirebaseUser } | { error: AuthError }> {
    try {
        const credential: UserCredential = await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password
        );

        // Update display name in Firebase Auth
        await updateProfile(credential.user, {
            displayName: data.displayName,
        });

        // Create user document in Firestore
        await createUserDocument(credential.user, {
            displayName: data.displayName,
            phone: data.phone,
        });

        return { user: credential.user };
    } catch (error) {
        return { error: handleAuthError(error) };
    }
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(
    email: string,
    password: string
): Promise<{ user: FirebaseUser } | { error: AuthError }> {
    try {
        const credential: UserCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        // Update last login in Firestore
        await createUserDocument(credential.user);

        return { user: credential.user };
    } catch (error) {
        return { error: handleAuthError(error) };
    }
}

// ============================================
// Google OAuth Authentication
// ============================================

/**
 * Sign in with Google OAuth popup
 */
export async function signInWithGoogle(): Promise<
    { user: FirebaseUser } | { error: AuthError }
> {
    try {
        const credential: UserCredential = await signInWithPopup(
            auth,
            googleProvider
        );

        // Create or update user document
        await createUserDocument(credential.user);

        return { user: credential.user };
    } catch (error) {
        return { error: handleAuthError(error) };
    }
}

// ============================================
// Sign Out
// ============================================

/**
 * Sign out current user
 */
export async function signOutUser(): Promise<{ success: true } | { error: AuthError }> {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return { error: handleAuthError(error) };
    }
}

// ============================================
// Password Reset
// ============================================

/**
 * Send password reset email
 */
export async function resetPassword(
    email: string
): Promise<{ success: true } | { error: AuthError }> {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true };
    } catch (error) {
        return { error: handleAuthError(error) };
    }
}

// ============================================
// Auth State Observer
// ============================================

/**
 * Subscribe to auth state changes
 * Returns unsubscribe function
 */
export function subscribeToAuthState(
    callback: (user: FirebaseUser | null) => void
): () => void {
    return onAuthStateChanged(auth, callback);
}

/**
 * Get current user (synchronous)
 */
export function getCurrentUser(): FirebaseUser | null {
    return auth.currentUser;
}

// ============================================
// Admin Helpers
// ============================================

// Initial admin email (from user requirement)
const INITIAL_ADMIN_EMAIL = 'akuzainul176@gmail.com';

/**
 * Check if email should be auto-promoted to admin
 * Used during initial setup only
 */
export function shouldBeAdmin(email: string): boolean {
    return email.toLowerCase() === INITIAL_ADMIN_EMAIL.toLowerCase();
}

/**
 * Promote user to admin if they're in the initial admin list
 * Call this after successful registration/login
 */
export async function checkAndPromoteAdmin(
    firebaseUser: FirebaseUser
): Promise<void> {
    if (firebaseUser.email && shouldBeAdmin(firebaseUser.email)) {
        const userDoc = await getUserDocument(firebaseUser.uid);
        if (userDoc && userDoc.role !== 'admin') {
            await updateUserRole(firebaseUser.uid, 'admin');
            // eslint-disable-next-line no-console
            console.log(`✅ User ${firebaseUser.email} promoted to admin`);
        }
    }
}
