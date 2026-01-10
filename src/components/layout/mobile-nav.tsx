"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid2X2, Store, ClipboardList, User } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/products", label: "Katalog", icon: Grid2X2 },
    { href: "/stores", label: "Toko", icon: Store },
    { href: "/orders", label: "Transaksi", icon: ClipboardList },
    { href: "/profile", label: "Akun", icon: User },
];

export function MobileNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 z-40 w-full border-t border-slate-200 bg-white/95 backdrop-blur-sm shadow-[0_-4px_16px_rgba(0,0,0,0.08)] md:hidden">
            <div className="grid h-16 grid-cols-5 items-center px-1">
                {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 py-2 rounded-xl transition-all active:scale-95",
                                isActive 
                                    ? "text-brand bg-red-50" 
                                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                            )}
                        >
                            <Icon
                                className={cn("h-6 w-6 transition-all", isActive && "scale-110")}
                                strokeWidth={isActive ? 2.5 : 2}
                                fill={isActive ? "currentColor" : "none"}
                            />
                            <span className={cn("text-[10px] font-medium transition-all", isActive && "font-bold")}>
                                {label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
