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
        <nav className="fixed bottom-0 left-0 z-40 w-full border-t bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] md:hidden">
            <div className="grid h-16 grid-cols-5 items-center">
                {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 transition-colors active:scale-95",
                                isActive ? "text-primary" : "text-slate-500 hover:text-slate-900"
                            )}
                        >
                            <Icon
                                className={cn("h-6 w-6 transition-all", isActive && "fill-current")}
                                strokeWidth={isActive ? 2.5 : 2}
                            />
                            <span className={cn("text-[10px] font-medium", isActive && "font-bold")}>
                                {label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
