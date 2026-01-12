import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, CheckCircle2 } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left: Content */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start z-10">

                        {/* Trust Badge */}
                        <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 pl-1 pr-3 py-1 mb-8 hover:bg-slate-100 transition-colors cursor-default">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D32F2F] text-white">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                            </span>
                            <span className="text-sm font-medium text-slate-700">
                                Pusat Bahan Bangunan Terlengkap
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
                            BANGUN <br />
                            <span className="text-[#D32F2F]">Tanpa Ragu.</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-[540px]">
                            Mitra terpercaya lebih dari 50.000+ kontraktor dan pemilik rumah sejak 2005. Stok pasti ready, 100% original, dan kirim hari ini.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                            <Link href="/products" className="w-full sm:w-auto">
                                <Button className="w-full sm:w-auto h-12 px-8 rounded-lg bg-[#D32F2F] text-white hover:bg-[#B71C1C] font-semibold text-base shadow-xl shadow-red-500/10 transition-all hover:scale-[1.02] active:scale-[0.98]">
                                    Mulai Belanja
                                </Button>
                            </Link>
                            <Link href="/stores" className="w-full sm:w-auto">
                                <Button variant="outline" className="w-full sm:w-auto h-12 px-6 rounded-lg border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-base flex items-center justify-center gap-2 hover:border-slate-300 transition-all">
                                    <PlayCircle className="h-5 w-5 text-[#D32F2F]" />
                                    Cari Cabang
                                </Button>
                            </Link>
                        </div>

                        {/* Social Proof */}
                        <div className="mt-12 pt-8 border-t border-slate-100 w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200 relative overflow-hidden">
                                        {/* Placeholder avatars would go here */}
                                        <Image src={`/images/hero-banner.png`} alt="User" fill className="object-cover opacity-50" />
                                    </div>
                                ))}
                                <div className="h-10 w-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                                    +5k
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-sm font-medium text-slate-600 mt-1">Trustpilot Review <span className="text-slate-400 font-normal">(4.8/5)</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Visual Composition */}
                    <div className="w-full lg:w-1/2 relative lg:h-[600px] flex items-center justify-center">
                        {/* Main Card */}
                        <div className="relative z-10 w-full max-w-[500px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 rotate-[-2deg] hover:rotate-0 transition-transform duration-700 ease-out">
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                                <Image
                                    src="/images/hero-banner.png"
                                    alt="Turen Indah Warehouse"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            </div>

                            {/* Card Content Mockup */}
                            <div className="mt-4 flex items-center justify-between px-2">
                                <div>
                                    <div className="h-2.5 w-32 bg-slate-200 rounded-full mb-2"></div>
                                    <div className="h-2 w-20 bg-slate-100 rounded-full"></div>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-red-50 flex items-center justify-center">
                                    <ArrowRight className="h-4 w-4 text-[#D32F2F]" />
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge 1 (Top Right) */}
                        <div className="absolute top-10 right-0 lg:right-10 bg-white p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 z-20 animate-bounce delay-1000 duration-[3000ms]">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <CheckCircle2 className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-900">Order Completed</p>
                                    <p className="text-[10px] text-slate-500">Just now</p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge 2 (Bottom Left) */}
                        <div className="absolute bottom-20 left-0 lg:left-10 bg-white p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 z-20 animate-pulse duration-[4000ms]">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center text-2xl">
                                    🚛
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-900">Fast Delivery</p>
                                    <p className="text-[10px] text-slate-500">Malang Raya Area</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}