/**
 * Forgot Password Page
 * =====================
 * Password reset request page.
 *
 * @file src/app/(auth)/forgot-password/page.tsx
 * @project Turen Indah Bangunan
 */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { ArrowLeft, Loader2, Mail, CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import {
    forgotPasswordSchema,
    type ForgotPasswordFormData,
} from '@/schemas/user.schema';

export default function ForgotPasswordPage() {
    const { sendPasswordReset } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setError(null);
        setIsLoading(true);

        const result = await sendPasswordReset(data.email);

        setIsLoading(false);

        if ('error' in result) {
            setError(result.error.message);
            return;
        }

        setIsSuccess(true);
    };

    // Success State
    if (isSuccess) {
        return (
            <div className="space-y-6 text-center">
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Email Terkirim</h1>
                    <p className="text-sm text-muted-foreground mt-2">
                        Kami telah mengirimkan link reset password ke email Anda. Silakan
                        cek inbox atau folder spam.
                    </p>
                </div>
                <Button asChild className="w-full">
                    <Link href="/login">Kembali ke Login</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Back Link */}
            <Link
                href="/login"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke login
            </Link>

            {/* Header */}
            <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Lupa Password?</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Masukkan email Anda dan kami akan mengirimkan link untuk reset
                    password.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Error Alert */}
                {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="nama@email.com"
                        autoComplete="email"
                        disabled={isLoading}
                        {...register('email')}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-600">{errors.email.message}</p>
                    )}
                </div>

                {/* Submit */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Mengirim...
                        </>
                    ) : (
                        'Kirim Link Reset'
                    )}
                </Button>
            </form>
        </div>
    );
}
