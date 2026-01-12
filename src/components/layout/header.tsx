"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";


export function Header() {
    const { itemCount } = useCart();
    const [hasMounted, setHasMounted] = useState(false);

    // Prevent hydration mismatch - only render cart badge after client mount
    useEffect(() => {
        setHasMounted(true);
    }, []);

    return (
        <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-12">

                {/* Logo Section - Brand Vibe update */}
                <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
                    <Image
                        src="/images/93c2488a85.webp"
                        alt="Turen Indah Bangunan Logo"
                        width={36}
                        height={36}
                        className="h-9 w-9 object-contain"
                        priority
                    />
                    <div className="flex flex-col justify-center">
                        <span className="font-display text-xl font-bold tracking-tight text-slate-950 leading-none">
                            Turen Indah
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation - Clean & Readable */}
                <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
                    {[
                        { name: "Beranda", href: "/" },
                        { name: "Produk", href: "/products" },
                        { name: "Cabang", href: "/stores" },
                        { name: "Promo", href: "/promo" },
                    ].map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[15px] font-medium text-slate-600 hover:text-[#D32F2F] transition-all hover:-translate-y-0.5"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {/* Search & Cart */}
                    <div className="flex items-center gap-1 pr-4 border-r border-slate-200">
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-[#D32F2F] hover:bg-transparent w-9 h-9">
                            <Search className="h-[18px] w-[18px]" />
                        </Button>

                        <Link href="/cart">
                            <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-[#D32F2F] hover:bg-transparent w-9 h-9">
                                <ShoppingCart className="h-[18px] w-[18px]" />
                                {/* Badge */}
                                {hasMounted && itemCount > 0 && (
                                    <span className="absolute top-0 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#D32F2F] text-[9px] font-bold text-white ring-2 ring-white">
                                        {itemCount > 9 ? "9+" : itemCount}
                                    </span>
                                )}
                            </Button>
                        </Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden items-center gap-3 md:flex">
                        <Link href="/login">
                            <Button variant="ghost" className="rounded-full text-[14px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-5 h-11">
                                Masuk
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button className="bg-[#D32F2F] text-white hover:bg-[#B71C1C] text-[14px] font-semibold rounded-full px-7 h-11 shadow-lg shadow-red-500/20 transition-all hover:scale-105 active:scale-95">
                                Daftar
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
