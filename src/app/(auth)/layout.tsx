/**
 * Auth Layout
 * ============
 * Shared layout for authentication pages.
 * Centered design with branding.
 *
 * @file src/app/(auth)/layout.tsx
 * @project Turen Indah Bangunan
 */

import Link from 'next/link';
import { Building2 } from 'lucide-react';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />

            {/* Content */}
            <div className="relative w-full max-w-md">
                {/* Logo & Brand */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 group">
                        <div className="p-2 bg-primary rounded-lg group-hover:bg-primary/90 transition-colors">
                            <Building2 className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">
                            Turen Indah Bangunan
                        </span>
                    </Link>
                </div>

                {/* Auth Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                    {children}
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-muted-foreground mt-8">
                    © {new Date().getFullYear()} Turen Indah Bangunan. All rights reserved.
                </p>
            </div>
        </div>
    );
}
