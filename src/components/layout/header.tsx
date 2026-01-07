'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, User, Search, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartItemCount } from '@/stores/cart-store';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const cartItemCount = useCartItemCount();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white'
                }`}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between gap-4">
                    {/* 1. Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-[#D32F2F] p-1.5 rounded-lg">
                            <Store className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">
                            Turen Indah
                        </span>
                    </Link>

                    {/* 2. Search Bar (Desktop) */}
                    <div className="hidden md:flex flex-1 max-w-md mx-4">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Cari material bangunan..."
                                className="pl-9 w-full bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                            />
                        </div>
                    </div>

                    {/* 3. Actions */}
                    <div className="flex items-center gap-2">
                        {/* Mobile Search Toggle (Optional - simplified for now) */}
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Search className="h-5 w-5" />
                        </Button>

                        {/* Cart */}
                        <Link href="/cart">
                            <Button variant="ghost" size="icon" className="relative group">
                                <ShoppingCart className="h-5 w-5 group-hover:text-[#D32F2F] transition-colors" />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D32F2F] text-[10px] font-bold text-white">
                                        {cartItemCount > 99 ? '99+' : cartItemCount}
                                    </span>
                                )}
                            </Button>
                        </Link>

                        {/* User Profile */}
                        <div className="hidden md:block">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <User className="h-5 w-5 hover:text-[#D32F2F] transition-colors" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <Link href="/login">Masuk / Daftar</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile">Akun Saya</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/orders">Pesanan</Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu Content */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t py-4 space-y-4 animate-in slide-in-from-top-2">
                        <div className="px-2">
                            <Input
                                placeholder="Cari material..."
                                className="w-full bg-slate-50"
                            />
                        </div>
                        <nav className="flex flex-col space-y-2">
                            <Link
                                href="/products"
                                className="px-4 py-2 hover:bg-slate-50 font-medium text-sm"
                            >
                                Katalog Produk
                            </Link>
                            <Link
                                href="/about"
                                className="px-4 py-2 hover:bg-slate-50 font-medium text-sm"
                            >
                                Tentang Kami
                            </Link>
                            <Link
                                href="/profile"
                                className="px-4 py-2 hover:bg-slate-50 font-medium text-sm"
                            >
                                Akun Saya
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
