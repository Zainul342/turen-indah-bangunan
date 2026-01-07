import Link from 'next/link';
import { Store, Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* 1. Brand & About */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Store className="h-6 w-6 text-[#D32F2F]" />
                            <span className="text-xl font-bold text-white">
                                Turen Indah
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-xs">
                            Pusat belanja bahan bangunan terlengkap dan termurah di Malang Raya.
                            Melayani kebutuhan proyek konstruksi dan renovasi rumah Anda.
                        </p>
                    </div>

                    {/* 2. Quick Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Belanja</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/products" className="hover:text-white transition-colors">
                                    Semua Produk
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/semen" className="hover:text-white transition-colors">
                                    Semen & Pasir
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/cat" className="hover:text-white transition-colors">
                                    Cat & Pelapis
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories/lantai" className="hover:text-white transition-colors">
                                    Lantai & Dinding
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 3. Support */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Bantuan</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/how-to-order" className="hover:text-white transition-colors">
                                    Cara Pemesanan
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping" className="hover:text-white transition-colors">
                                    Info Pengiriman
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-white transition-colors">
                                    Syarat & Ketentuan
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white transition-colors">
                                    Hubungi Kami
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* 4. Contact */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Kontak</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-[#D32F2F] shrink-0" />
                                <span>Jl. Raya Turen No. 123, Kabupaten Malang, Jawa Timur</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-[#D32F2F] shrink-0" />
                                <span>+62 812-3456-7890</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-[#D32F2F] shrink-0" />
                                <span>info@turenindah.com</span>
                            </li>
                        </ul>
                        <div className="flex gap-4 mt-6">
                            <Link href="#" className="hover:text-white transition-colors">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="hover:text-white transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800 bg-slate-950/50">
                <div className="container mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Turen Indah Bangunan. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-slate-300">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
