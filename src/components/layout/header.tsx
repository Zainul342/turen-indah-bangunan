"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "./search-bar";
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
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 md:gap-8">

                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
                    <Image
                        src="/images/93c2488a85.webp"
                        alt="Turen Indah Bangunan Logo"
                        width={40}
                        height={40}
                        className="h-10 w-10 object-contain"
                        priority
                    />
                    <div className="flex flex-col leading-none">
                        <span className="text-lg font-bold text-slate-900">Turen Indah</span>
                        <span className="text-[10px] font-medium text-slate-500 tracking-wide uppercase">Bangunan</span>
                    </div>
                </Link>

                {/* Desktop Search */}
                <div className="hidden flex-1 md:block max-w-xl">
                    <SearchBar />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 md:gap-3">
                    {/* Mobile Search Icon Trigger */}
                    <Button variant="ghost" size="icon" className="md:hidden text-slate-600 hover:text-brand hover:bg-red-50">
                        <Search className="h-5 w-5" />
                    </Button>

                    {/* Cart Button */}
                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="relative text-slate-600 hover:text-brand hover:bg-red-50 transition-colors">
                            <ShoppingCart className="h-5 w-5" />
                            {/* Badge */}
                            {hasMounted && itemCount > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white ring-2 ring-white shadow-sm">
                                    {itemCount > 99 ? "99" : itemCount}
                                </span>
                            )}
                        </Button>
                    </Link>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden items-center gap-2 md:flex pl-3 ml-1 border-l border-slate-200">
                        <Link href="/login">
                            <Button variant="ghost" className="text-slate-600 hover:text-brand hover:bg-red-50">
                                Masuk
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button variant="brand" size="sm" className="shadow-md shadow-red-200/50">
                                Daftar
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
