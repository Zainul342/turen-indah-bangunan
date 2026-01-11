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
                        {/* Trust Badge */}
                        <div className="inline-flex items-center rounded-full border border-red-100 bg-white/80 backdrop-blur-md px-4 py-1.5 text-sm font-medium text-brand mb-8 w-fit shadow-sm">
                            <span className="flex h-2 w-2 rounded-full bg-brand mr-2 animate-pulse"></span>
                            Pusat Bahan Bangunan Terlengkap di Malang Raya
                        </div>

                        {/* Hero Title - Responsive Typography */}
                        {/* Hero Title - Responsive Typography */}
                        <h1 className="text-[clamp(4.5rem,14vw,9rem)] leading-[0.85] tracking-tight text-nix-black select-none">
                            <span className="font-heading font-black tracking-tighter block mb-1">BANGUN</span>
                            <span className="font-aesthetic font-normal italic block text-slate-800">
                                Tanpa Ragu<span className="text-brand font-bold not-italic">.</span>
                            </span>
                        </h1>

                        <p className="mt-8 max-w-[480px] text-base md:text-lg text-nix-gray font-normal leading-relaxed tracking-nix-normal">
                            Stok pasti ready, 100% original, dan kirim hari ini. Mitra terpercaya lebih dari 50.000+ kontraktor dan pemilik rumah sejak 2005.
                        </p>

                        <div className="mt-10 mb-12 flex flex-wrap gap-4">
                            <Link href="/products">
                                <Button variant="brand" size="lg" className="shadow-xl shadow-red-200/50 hover:scale-105 active:scale-95">
                                    Belanja Sekarang
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="https://wa.me/6281252462983" target="_blank">
                                <Button variant="outline" size="lg" className="bg-white/80 backdrop-blur-sm hover:bg-white hover:text-[#25D366] hover:border-[#25D366]">
                                    Konsultasi via WA
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right: Hero Image */}
                    <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full hidden lg:block">
                        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-slate-200">
                            <Image
                                src="/images/hero-banner.png"
                                alt="Modern Material Showcase"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-1000"
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                            {/* Floating Glass Stat Card */}
                            <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-xl">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-white/80 text-xs font-semibold uppercase tracking-wider mb-1">Total Products</p>
                                        <p className="text-white text-3xl font-bold font-display tracking-tighter">15k+</p>
                                    </div>
                                    <div className="h-10 w-10 bg-brand rounded-full flex items-center justify-center text-white">
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