import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, ShieldCheck, MapPin } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-slate-50 pt-8 pb-12 md:pt-16 md:pb-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">

                    {/* Text Content */}
                    <div className="flex flex-col justify-center space-y-8 animate-in slide-in-from-left duration-700">
                        <div className="space-y-4">
                            <div className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-medium text-[#D32F2F]">
                                <span className="flex h-2 w-2 rounded-full bg-[#D32F2F] mr-2 animate-pulse"></span>
                                Melayani Sepenuh Hati - 20+ Cabang
                            </div>
                            <h1 className="text-4xl font-bold tracking-tighter text-slate-900 sm:text-5xl xl:text-6xl/none">
                                Bangun Rumah Impian <br className="hidden md:inline" />
                                <span className="text-[#D32F2F]">Lebih Mudah & Hemat</span>
                            </h1>
                            <p className="max-w-[600px] text-slate-600 md:text-xl leading-relaxed">
                                Pusat bahan bangunan terlengkap di Malang Raya. Semen, keramik, cat, hingga pipa air dengan harga grosir dan pengiriman cepat ke lokasi proyek.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 min-[400px]:flex-row">
                            <Link href="/products">
                                <Button size="lg" className="w-full min-[400px]:w-auto bg-gradient-to-r from-[#D32F2F] to-[#FF6B6B] hover:opacity-90 shadow-lg shadow-red-200 transition-all hover:scale-105">
                                    Belanja Sekarang
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/stores">
                                <Button variant="outline" size="lg" className="w-full min-[400px]:w-auto border-slate-300 hover:bg-slate-50 hover:text-[#D32F2F]">
                                    Cari Toko Terdekat
                                    <MapPin className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        <div className="flex items-center gap-6 text-sm font-medium text-slate-500 pt-4">
                            <div className="flex items-center gap-2">
                                <Truck className="h-5 w-5 text-[#D32F2F]" />
                                <span>Kirim Cepat</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-[#D32F2F]" />
                                <span>Stok Ready</span>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image (Placeholder for now, using CSS pattern + Illustration) */}
                    <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none animate-in slide-in-from-right duration-700 delay-200">
                        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 relative group">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>

                            {/* Replace with actual image later */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-slate-100 to-slate-50">
                                <div className="text-center p-8">
                                    <div className="text-6xl mb-4">🏠🏗️</div>
                                    <p className="text-slate-400 font-medium">Hero Image Placeholder</p>
                                    <p className="text-slate-300 text-sm mt-2">Displaying construction materials</p>
                                </div>
                            </div>

                            {/* Floating Elements decoration */}
                            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-red-100 blur-2xl opacity-60"></div>
                            <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-blue-100 blur-3xl opacity-60"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
