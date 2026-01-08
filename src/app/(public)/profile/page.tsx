"use client";

/**
 * Profile Page
 * =============
 * User profile overview with stats and addresses.
 *
 * @file src/app/(public)/profile/page.tsx
 * @project Turen Indah Bangunan
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Loader2,
    Settings,
    Plus,
    Package,
    Heart,
    MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileStats } from "@/components/profile/profile-stats";
import { AddressCard } from "@/components/profile/address-card";
import { useAuth } from "@/hooks/use-auth";
import type { Address } from "@/types/user";

// ============================================
// Types
// ============================================

interface UserProfile {
    id: string;
    email: string;
    displayName: string;
    phone?: string;
    photoURL?: string;
    addresses: Address[];
    createdAt: string;
    stats: {
        orderCount: number;
        addressCount: number;
    };
}

// ============================================
// Component
// ============================================

export default function ProfilePage() {
    const router = useRouter();
    const { isAuthenticated, isLoading: authLoading } = useAuth();

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/auth/login?redirect=/profile");
        }
    }, [authLoading, isAuthenticated, router]);

    // Fetch profile
    useEffect(() => {
        async function fetchProfile() {
            if (!isAuthenticated) return;

            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch("/api/user");
                const data = await response.json();

                if (data.success) {
                    setProfile(data.data);
                } else {
                    setError(data.error?.message || "Gagal memuat profil");
                }
            } catch {
                setError("Terjadi kesalahan. Silakan coba lagi.");
            } finally {
                setIsLoading(false);
            }
        }

        if (isAuthenticated) {
            fetchProfile();
        }
    }, [isAuthenticated]);

    // Address actions
    const handleDeleteAddress = async (addressId: string) => {
        if (!confirm("Hapus alamat ini?")) return;

        try {
            const response = await fetch(`/api/user/addresses?id=${addressId}`, {
                method: "DELETE",
            });
            const data = await response.json();

            if (data.success && profile) {
                setProfile({
                    ...profile,
                    addresses: profile.addresses.filter((a) => a.id !== addressId),
                    stats: {
                        ...profile.stats,
                        addressCount: profile.stats.addressCount - 1,
                    },
                });
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error("Failed to delete address:", err);
        }
    };

    const handleSetDefault = async (addressId: string) => {
        try {
            const address = profile?.addresses.find((a) => a.id === addressId);
            if (!address) return;

            await fetch("/api/user/addresses", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...address, isDefault: true }),
            });

            // Refresh profile
            const response = await fetch("/api/user");
            const data = await response.json();
            if (data.success) {
                setProfile(data.data);
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error("Failed to set default address:", err);
        }
    };

    if (authLoading || isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>Coba Lagi</Button>
            </div>
        );
    }

    if (!profile) return null;

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" asChild>
                                <Link href="/">
                                    <ArrowLeft className="h-5 w-5" />
                                </Link>
                            </Button>
                            <h1 className="text-xl font-bold text-slate-900">Profil Saya</h1>
                        </div>
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/profile/settings">
                                <Settings className="h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6 space-y-6 max-w-2xl">
                {/* Profile Header */}
                <ProfileHeader
                    displayName={profile.displayName}
                    email={profile.email}
                    phone={profile.phone}
                    photoURL={profile.photoURL}
                />

                {/* Stats */}
                <ProfileStats
                    orderCount={profile.stats.orderCount}
                    addressCount={profile.stats.addressCount}
                    memberSince={profile.createdAt}
                />

                {/* Addresses */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            Alamat Tersimpan
                        </h3>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/profile/addresses/new">
                                <Plus className="h-4 w-4 mr-1" />
                                Tambah
                            </Link>
                        </Button>
                    </div>

                    {profile.addresses.length === 0 ? (
                        <div className="text-center py-8 text-slate-500">
                            <MapPin className="h-10 w-10 mx-auto mb-2 text-slate-300" />
                            <p>Belum ada alamat tersimpan</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {profile.addresses.map((address) => (
                                <AddressCard
                                    key={address.id}
                                    address={address}
                                    onDelete={handleDeleteAddress}
                                    onSetDefault={handleSetDefault}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <h3 className="font-semibold text-slate-900 mb-3">Menu Cepat</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" asChild className="h-auto py-4 flex-col gap-2">
                            <Link href="/orders">
                                <Package className="h-5 w-5 text-primary" />
                                <span>Pesanan Saya</span>
                            </Link>
                        </Button>
                        <Button variant="outline" asChild className="h-auto py-4 flex-col gap-2">
                            <Link href="/wishlist">
                                <Heart className="h-5 w-5 text-primary" />
                                <span>Wishlist</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
