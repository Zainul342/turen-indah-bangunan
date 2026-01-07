/**
 * Register Form Component
 * ========================
 * Registration form with validation.
 *
 * @file src/components/auth/register-form.tsx
 * @project Turen Indah Bangunan
 */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/use-auth';
import { registerSchema, type RegisterFormData } from '@/schemas/user.schema';

export function RegisterForm() {
    const router = useRouter();
    const { register: registerUser, isLoading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            displayName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            acceptTerms: false,
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        setError(null);

        const result = await registerUser({
            email: data.email,
            password: data.password,
            displayName: data.displayName,
            phone: data.phone || undefined,
        });

        if ('error' in result) {
            setError(result.error.message);
            return;
        }

        // Redirect to home
        router.push('/');
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Error Alert */}
            {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                    {error}
                </div>
            )}

            {/* Name */}
            <div className="space-y-2">
                <Label htmlFor="displayName">Nama Lengkap</Label>
                <Input
                    id="displayName"
                    type="text"
                    placeholder="John Doe"
                    autoComplete="name"
                    disabled={isLoading}
                    {...register('displayName')}
                />
                {errors.displayName && (
                    <p className="text-sm text-red-600">{errors.displayName.message}</p>
                )}
            </div>

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

            {/* Phone */}
            <div className="space-y-2">
                <Label htmlFor="phone">
                    No. HP <span className="text-muted-foreground">(opsional)</span>
                </Label>
                <Input
                    id="phone"
                    type="tel"
                    placeholder="081234567890"
                    autoComplete="tel"
                    disabled={isLoading}
                    {...register('phone')}
                />
                {errors.phone && (
                    <p className="text-sm text-red-600">{errors.phone.message}</p>
                )}
            </div>

            {/* Password */}
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Minimal 8 karakter"
                        autoComplete="new-password"
                        disabled={isLoading}
                        {...register('password')}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        tabIndex={-1}
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-sm text-red-600">{errors.password.message}</p>
                )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <div className="relative">
                    <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Ulangi password"
                        autoComplete="new-password"
                        disabled={isLoading}
                        {...register('confirmPassword')}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        tabIndex={-1}
                    >
                        {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-2">
                <Checkbox id="acceptTerms" {...register('acceptTerms')} className="mt-1" />
                <Label htmlFor="acceptTerms" className="text-sm font-normal leading-relaxed">
                    Saya menyetujui{' '}
                    <Link href="/terms" className="text-primary hover:underline">
                        Syarat & Ketentuan
                    </Link>{' '}
                    dan{' '}
                    <Link href="/privacy" className="text-primary hover:underline">
                        Kebijakan Privasi
                    </Link>
                </Label>
            </div>
            {errors.acceptTerms && (
                <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>
            )}

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Mendaftar...
                    </>
                ) : (
                    'Daftar'
                )}
            </Button>

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground">
                Sudah punya akun?{' '}
                <Link href="/login" className="text-primary hover:underline">
                    Masuk di sini
                </Link>
            </p>
        </form>
    );
}

export default RegisterForm;
