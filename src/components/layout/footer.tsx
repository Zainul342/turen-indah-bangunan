"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

// Social media URLs - update these with actual company accounts
const SOCIAL_LINKS = {
    instagram: "https://instagram.com/turenindahbangunan",
    facebook: "https://facebook.com/turenindahbangunan",
};

export function Footer() {
    return (
        <footer className="border-t bg-white pt-16 pb-8 text-slate-600 hidden md:block">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/images/93c2488a85.webp"
                                alt="Turen Indah Bangunan Logo"
                                width={36}
                                height={36}
                                className="h-9 w-9 object-contain"
                            />
                            <span className="text-xl font-bold text-slate-900">Turen Indah</span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-500">
                            Pusat bahan bangunan terlengkap dan termurah di Malang Raya.
                            Melayani eceran dan grosir dengan pengiriman cepat ke lokasi proyek Anda.
                        </p>
                        <div className="flex gap-2">
                            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-white border-slate-200">
                                    <Instagram className="h-4 w-4" />
                                </Button>
                            </a>
                            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-white border-slate-200">
                                    <Facebook className="h-4 w-4" />
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/* Perusahaan */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-slate-900">Perusahaan</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="hover:text-primary transition-colors">Tentang Kami</Link></li>
                            <li><Link href="/stores" className="hover:text-primary transition-colors">Lokasi Toko</Link></li>
                            <li><Link href="/karir" className="hover:text-primary transition-colors">Karir</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog & Tips</Link></li>
                        </ul>
                    </div>

                    {/* Produk */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-slate-900">Kategori Populer</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/products?category=semen" className="hover:text-primary transition-colors">Semen & Perekat</Link></li>
                            <li><Link href="/products?category=bata-ringan" className="hover:text-primary transition-colors">Bata Ringan</Link></li>
                            <li><Link href="/products?category=cat" className="hover:text-primary transition-colors">Cat Tembok</Link></li>
                            <li><Link href="/products?category=keramik" className="hover:text-primary transition-colors">Keramik Lantai</Link></li>
                            <li><Link href="/products?category=plumbing" className="hover:text-primary transition-colors">Pipa & Plumbing</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-slate-900">Hubungi Kami</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex flex-col gap-1">
                                <span className="font-medium text-slate-900">WhatsApp Order:</span>
                                <a href="https://wa.me/6281252462983" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">+62 812-5246-2983</a>
                            </li>
                            <li className="flex flex-col gap-1">
                                <span className="font-medium text-slate-900">Email:</span>
                                <a href="mailto:info@turenindah.com" className="hover:text-primary transition-colors">info@turenindah.com</a>
                            </li>
                            <li className="flex flex-col gap-1">
                                <span className="font-medium text-slate-900">Alamat Pusat:</span>
                                <span>Jl. Raya Talang Suko No.15,<br />Turen, Kab. Malang, Jawa Timur</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
                    <p>&copy; 2026 Turen Indah Bangunan. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="/privacy" className="hover:text-slate-600">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-slate-600">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
