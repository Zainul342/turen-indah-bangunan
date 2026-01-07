"use client";

import Link from "next/link";
import { SearchBar } from "./search-bar";
import { ShoppingCart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 md:gap-8">

                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#D32F2F] to-[#FF6B6B] shadow-sm">
                        <span className="font-bold text-white">TB</span>
                    </div>
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
                <div className="flex items-center gap-1 md:gap-3">
                    {/* Mobile Search Icon Trigger (Future: Open Sheet/Modal) */}
                    <Button variant="ghost" size="icon" className="md:hidden text-slate-600">
                        <Search className="h-6 w-6" />
                    </Button>

                    {/* Cart Button */}
                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="relative text-slate-600 hover:text-primary hover:bg-red-50">
                            <ShoppingCart className="h-6 w-6" />
                            {/* Badge */}
                            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D32F2F] text-[10px] font-bold text-white ring-2 ring-white">
                                0
                            </span>
                        </Button>
                    </Link>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden items-center gap-2 md:flex pl-2 border-l border-slate-200">
                        <Link href="/login">
                            <Button variant="ghost" className="text-slate-600 hover:text-primary">
                                Masuk
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button size="sm" className="bg-[#D32F2F] hover:bg-[#B71C1C] rounded-full px-6 font-semibold shadow-md shadow-red-200">
                                Daftar
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
