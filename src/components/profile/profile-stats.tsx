"use client";

/**
 * Profile Stats
 * ==============
 * Quick stats cards showing order count, addresses, member since.
 *
 * @file src/components/profile/profile-stats.tsx
 * @project Turen Indah Bangunan
 */

import { Package, MapPin, Star } from "lucide-react";

// ============================================
// Props
// ============================================

interface ProfileStatsProps {
    orderCount: number;
    addressCount: number;
    memberSince: string;
}

// ============================================
// Helper
// ============================================

function formatMemberSince(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
        month: "short",
        year: "numeric",
    });
}

// ============================================
// Component
// ============================================

export function ProfileStats({ orderCount, addressCount, memberSince }: ProfileStatsProps) {
    const stats = [
        {
            icon: Package,
            value: orderCount.toString(),
            label: "Pesanan",
            color: "text-blue-600",
            bgColor: "bg-blue-50",
        },
        {
            icon: MapPin,
            value: addressCount.toString(),
            label: "Alamat",
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
        {
            icon: Star,
            value: formatMemberSince(memberSince),
            label: "Member",
            color: "text-yellow-600",
            bgColor: "bg-yellow-50",
        },
    ];

    return (
        <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, idx) => (
                <div
                    key={idx}
                    className={`${stat.bgColor} rounded-2xl p-4 text-center`}
                >
                    <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-2`} />
                    <p className="font-bold text-slate-900">{stat.value}</p>
                    <p className="text-xs text-slate-600">{stat.label}</p>
                </div>
            ))}
        </div>
    );
}
