/**
 * Login Form Component
 * =====================
 * Email/Password login form with validation.
 *
 * @file src/components/auth/login-form.tsx
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
import { loginSchema, type LoginFormData } from '@/schemas/user.schema';

export function LoginForm() {
    const router = useRouter();
    const { loginWithEmail, isLoading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        setError(null);

        const result = await loginWithEmail(data.email, data.password);

        if ('error' in result) {
            setError(result.error.message);
            return;
        }

        // Redirect to home or intended page
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

            {/* Password */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                        href="/forgot-password"
                        className="text-sm text-primary hover:underline"
                    >
                        Lupa password?
                    </Link>
                </div>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        autoComplete="current-password"
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

            {/* Remember Me */}
            <div className="flex items-center space-x-2">
                <Checkbox id="rememberMe" {...register('rememberMe')} />
                <Label htmlFor="rememberMe" className="text-sm font-normal">
                    Ingat saya
                </Label>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Masuk...
                    </>
                ) : (
                    'Masuk'
                )}
            </Button>

            {/* Register Link */}
            <p className="text-center text-sm text-muted-foreground">
                Belum punya akun?{' '}
                <Link href="/register" className="text-primary hover:underline">
                    Daftar sekarang
                </Link>
            </p>
        </form>
    );
}

export default LoginForm;
