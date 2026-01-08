"use client";

/**
 * Settings Page
 * ==============
 * Account settings and preferences.
 *
 * @file src/app/(public)/profile/settings/page.tsx
 * @project Turen Indah Bangunan
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Loader2,
    User,
    Mail,
    Phone,
    Lock,
    LogOut,
    Trash2,
    Bell,
    Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { SettingsRow } from "@/components/profile/settings-row";
import { useAuth } from "@/hooks/use-auth";

// ============================================
// Component
// ============================================

export default function SettingsPage() {
    const router = useRouter();
    const { isAuthenticated, isLoading: authLoading, user, logout } = useAuth();

    const [emailPromotions, setEmailPromotions] = useState(true);
    const [whatsappUpdates, setWhatsappUpdates] = useState(true);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/auth/login?redirect=/profile/settings");
        }
    }, [authLoading, isAuthenticated, router]);

    const handleLogout = async () => {
        if (!confirm("Yakin ingin keluar?")) return;

        setIsLoggingOut(true);
        try {
            await logout();
            router.push("/");
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error("Logout error:", err);
            setIsLoggingOut(false);
        }
    };

    const handleDeleteAccount = () => {
        alert("Fitur ini memerlukan konfirmasi lebih lanjut. Hubungi customer support untuk menghapus akun.");
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/profile">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <h1 className="text-xl font-bold text-slate-900">Pengaturan</h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6 space-y-4 max-w-2xl">
                {/* Account Info */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                    <div className="px-4 py-3 border-b border-slate-100">
                        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" />
                            Informasi Akun
                        </h3>
                    </div>
                    <div className="divide-y divide-slate-100">
                        <SettingsRow
                            icon={<User className="h-5 w-5 text-slate-500" />}
                            label="Nama Lengkap"
                            value={user.displayName}
                            onClick={() => router.push("/profile/edit?field=name")}
                        />
                        <SettingsRow
                            icon={<Mail className="h-5 w-5 text-slate-500" />}
                            label="Email"
                            value={user.email}
                            disabled
                            showArrow={false}
                            description="Email tidak dapat diubah"
                        />
                        <SettingsRow
                            icon={<Phone className="h-5 w-5 text-slate-500" />}
                            label="Nomor Telepon"
                            value={user.phone || "Belum diatur"}
                            onClick={() => router.push("/profile/edit?field=phone")}
                        />
                    </div>
                </div>

                {/* Security */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                    <div className="px-4 py-3 border-b border-slate-100">
                        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                            <Shield className="h-4 w-4 text-primary" />
                            Keamanan
                        </h3>
                    </div>
                    <div className="divide-y divide-slate-100">
                        <SettingsRow
                            icon={<Lock className="h-5 w-5 text-slate-500" />}
                            label="Ubah Password"
                            onClick={() => router.push("/profile/change-password")}
                        />
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                    <div className="px-4 py-3 border-b border-slate-100">
                        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                            <Bell className="h-4 w-4 text-primary" />
                            Notifikasi
                        </h3>
                    </div>
                    <div className="divide-y divide-slate-100">
                        <SettingsRow
                            icon={<Mail className="h-5 w-5 text-slate-500" />}
                            label="Email Promosi"
                            description="Terima informasi promo dan diskon"
                            showArrow={false}
                            rightElement={
                                <Switch
                                    checked={emailPromotions}
                                    onCheckedChange={setEmailPromotions}
                                />
                            }
                        />
                        <SettingsRow
                            icon={<Phone className="h-5 w-5 text-slate-500" />}
                            label="WhatsApp Update"
                            description="Update status pesanan via WhatsApp"
                            showArrow={false}
                            rightElement={
                                <Switch
                                    checked={whatsappUpdates}
                                    onCheckedChange={setWhatsappUpdates}
                                />
                            }
                        />
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                    <div className="divide-y divide-slate-100">
                        <SettingsRow
                            icon={<LogOut className="h-5 w-5 text-slate-500" />}
                            label={isLoggingOut ? "Keluar..." : "Keluar"}
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                        />
                        <SettingsRow
                            icon={<Trash2 className="h-5 w-5 text-red-500" />}
                            label="Hapus Akun"
                            variant="danger"
                            onClick={handleDeleteAccount}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
