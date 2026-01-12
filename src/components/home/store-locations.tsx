"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Dynamically import to avoid SSR issues with Leaflet
const StoreMap = dynamic(
    () => import("@/components/shared/store-map").then((mod) => mod.StoreMap),
    { ssr: false, loading: () => <div className="h-full w-full bg-slate-100 animate-pulse rounded-2xl" /> }
);

const STORES = [
    { name: "TIB Talangsuko Turen (Pusat)", address: "Jl. Raya Talang Suko No.15 b, Padi, Talangsuko", lat: -8.1347, lng: 112.6986 },
    { name: "TIB Bululawang", address: "Bululawang, Kec. Bululawang, Kabupaten Malang", lat: -8.0456, lng: 112.6658 },
    { name: "TIB Sawojajar", address: "Jl. Danau Kerinci Raya No.67, Lesanpuro", lat: -7.9685, lng: 112.6648 },
    { name: "TIB Kepanjen", address: "Jl. KH. Ahmad Dahlan, Kepanjen", lat: -8.1342, lng: 112.5646 },
    { name: "TIB Batu", address: "Mojorejo, Kec. Junrejo, Kota Batu", lat: -7.8847, lng: 112.5288 },
];

export function StoreLocations() {
    return (
        <section className="py-16 bg-white overflow-hidden relative">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 mb-4">
                            Lokasi Kami
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-4">
                            Dekat dengan Proyek Anda
                        </h2>
                        <p className="text-sm md:text-base text-slate-600 mb-8 leading-relaxed">
                            Dengan lebih dari 20 cabang tersebar di Malang Raya, kami memastikan pengiriman material bangunan
                            lebih cepat, hemat ongkir, dan tepat waktu ke lokasi proyek Anda.
                        </p>

                        <div className="space-y-4">
                            {STORES.map((store, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/50 transition-colors group cursor-pointer"
                                >
                                    <div className="mt-1 h-9 w-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-600 transition-all">
                                        <MapPin className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{store.name}</h4>
                                        <p className="text-sm text-slate-500">{store.address}</p>
                                    </div>
                                    <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500" />
                                </div>
                            ))}
                        </div>

                        <div className="mt-8">
                            <Link href="/stores">
                                <Button variant="outline" className="w-full">
                                    Lihat Semua 20+ Cabang
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* OpenStreetMap with Markers */}
                    <div className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden bg-slate-100 shadow-xl border border-slate-200">
                        <StoreMap stores={STORES} />
                    </div>
                </div>
            </div>
        </section>
    );
}
