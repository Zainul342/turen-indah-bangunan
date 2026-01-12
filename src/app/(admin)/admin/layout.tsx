/**
 * Admin Layout - Server-Side Verification Gate
 * =============================================
 * CRITICAL: This layout prevents privilege escalation by verifying
 * the Firebase session cookie on every admin page load.
 * 
 * DO NOT TRUST middleware `tib-role` cookie - it can be spoofed client-side.
 * This layout is the REAL security boundary.
 *
 * @file src/app/(admin)/admin/layout.tsx
 * @project Turen Indah Bangunan
 */

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAdminAuth, getAdminDb } from '@/lib/firebase/admin';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('tib-session')?.value;

    // No session cookie → redirect to login
    if (!sessionCookie) {
        redirect('/login?redirect=/admin');
    }

    try {
        // Verify session cookie (this is the REAL security check)
        const auth = getAdminAuth();
        const decodedToken = await auth.verifySessionCookie(
            sessionCookie,
            true // checkRevoked - important for logout/security
        );

        // Get user role from Firestore (source of truth)
        const db = getAdminDb();
        const userDoc = await db.collection('users').doc(decodedToken.uid).get();
        const userData = userDoc.data();
        const role = userData?.role;

        // Check if user is admin
        if (role !== 'admin') {
            // Not admin → redirect home with error
            redirect('/?error=admin_only');
        }

        // Success → render admin pages
        return <>{children}</>;
    } catch {
        // Session verification failed (expired, invalid, revoked)
        // Clear bad cookies
        cookieStore.delete('tib-session');
        cookieStore.delete('tib-role');

        // Redirect to home
        redirect('/?error=session_expired');
    }
}
