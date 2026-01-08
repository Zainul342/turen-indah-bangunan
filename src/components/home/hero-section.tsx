import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-slate-50">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

            <div className="container relative mx-auto px-4 md:px-6 z-10">
                <div className="flex flex-col lg:flex-row items-stretch min-h-[70vh] gap-8 lg:gap-12">

                    {/* Left: Giant Typography */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center relative z-20 pt-12 lg:pt-0">
                        <div className="inline-flex items-center rounded-full border border-red-100 bg-white/80 backdrop-blur-md px-4 py-1.5 text-sm font-medium text-[#D32F2F] mb-8 w-fit shadow-sm">
                            <span className="flex h-2 w-2 rounded-full bg-[#D32F2F] mr-2 animate-pulse"></span>
                            Melayani Sepenuh Hati - 20+ Cabang
                        </div>

                        {/* Nixtio Token Application: Giant size, Tighter tracking */}
                        <h1 className="font-display text-[15vw] lg:text-nixtio-giant leading-[0.8] tracking-tighter-nixtio font-bold text-slate-900 select-none">
                            BANGUN <br />
                            <span className="text-[#D32F2F]">IMPIAN</span>
                        </h1>

                        <p className="mt-8 max-w-[480px] text-lg text-slate-600 font-light leading-relaxed tracking-tight-nixtio">
                            Pusat bahan bangunan terlengkap di Malang Raya. Hadirkan kualitas premium untuk struktur yang kokoh dan estetika tanpa batas.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link href="/products">
                                <Button size="xl" className="rounded-full bg-[#D32F2F] text-white hover:bg-[#B71C1C] px-[30px] py-[18px] h-auto text-[16px] shadow-xl shadow-red-200/50 transition-all hover:scale-105 active:scale-95">
                                    Mulai Belanja
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/stores">
                                <Button variant="outline" size="xl" className="rounded-full border-slate-200 bg-white/80 backdrop-blur-sm px-[30px] py-[18px] h-auto text-[16px] hover:bg-white hover:text-[#D32F2F] transition-all hover:border-red-100">
                                    Cari Cabang
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right: Fluid Image with Nixtio "U-Shape" Radius */}
                    <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full hidden lg:block">
                        <div className="relative w-full h-full rounded-nixtio-u overflow-hidden shadow-2xl bg-slate-200">
                            <Image
                                src="/images/hero-banner.png"
                                alt="Modern Material Showcase"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-1000"
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            {/* Gradient Overlay for Text Readability at bottom if needed */}
                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                            {/* Floating Glass Stat Card */}
                            <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-lg">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-1">Total Products</p>
                                        <p className="text-white text-3xl font-bold font-display tracking-tighter-nixtio">15k+</p>
                                    </div>
                                    <div className="h-10 w-10 bg-[#D32F2F] rounded-full flex items-center justify-center text-white">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
