/**
 * Register Page
 * ==============
 * User registration with Email/Password and Google OAuth.
 *
 * @file src/app/(auth)/register/page.tsx
 * @project Turen Indah Bangunan
 */

import type { Metadata } from 'next';
import { RegisterForm } from '@/components/auth/register-form';
import { GoogleSignInButton } from '@/components/auth/google-sign-in-button';

export const metadata: Metadata = {
    title: 'Daftar | Turen Indah Bangunan',
    description: 'Buat akun Turen Indah Bangunan baru',
};

export default function RegisterPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">Buat Akun Baru</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Daftar untuk mulai berbelanja
                </p>
            </div>

            {/* Google Sign Up */}
            <GoogleSignInButton variant="register" />

            {/* Divider */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">
                        atau daftar dengan email
                    </span>
                </div>
            </div>

            {/* Registration Form */}
            <RegisterForm />
        </div>
    );
}
