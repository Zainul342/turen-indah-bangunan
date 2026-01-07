/**
 * Login Page
 * ===========
 * User login with Email/Password and Google OAuth.
 *
 * @file src/app/(auth)/login/page.tsx
 * @project Turen Indah Bangunan
 */

import type { Metadata } from 'next';
import { LoginForm } from '@/components/auth/login-form';
import { GoogleSignInButton } from '@/components/auth/google-sign-in-button';

export const metadata: Metadata = {
    title: 'Masuk | Turen Indah Bangunan',
    description: 'Masuk ke akun Turen Indah Bangunan Anda',
};

export default function LoginPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">Selamat Datang</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Masuk ke akun Anda untuk melanjutkan
                </p>
            </div>

            {/* Google Sign In */}
            <GoogleSignInButton variant="login" />

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">
                        atau masuk dengan email
                    </span>
                </div>
            </div>

            {/* Email/Password Form */}
            <LoginForm />
        </div>
    );
}
