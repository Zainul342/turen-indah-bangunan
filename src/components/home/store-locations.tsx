import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORES = [
    { name: "TIB Talangsuko Turen (Pusat)", address: "Jl. Raya Talang Suko No.15 b, Padi, Talangsuko" },
    { name: "TIB Bululawang", address: "Bululawang, Kec. Bululawang, Kabupaten Malang" },
    { name: "TIB Sawojajar", address: "Jl. Danau Kerinci Raya No.67, Lesanpuro" },
    { name: "TIB Kepanjen", address: "Jl. KH. Ahmad Dahlan, Kepanjen" },
    { name: "TIB Batu", address: "Mojorejo, Kec. Junrejo, Kota Batu" },
];

export function StoreLocations() {
    return (
        <section className="py-16 bg-white overflow-hidden relative">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 mb-4">
                            Lokasi Kami
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">
                            Dekat dengan Proyek Anda
                        </h2>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            Dengan lebih dari 20 cabang tersebar di Malang Raya, kami memastikan pengiriman material bangunan
                            lebih cepat, hemat ongkir, dan tepat waktu ke lokasi proyek Anda.
                        </p>

                        <div className="space-y-4">
                            {STORES.map((store, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/50 transition-colors group cursor-pointer">
                                    <div className="mt-1 h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
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

                    {/* Map Placeholder */}
                    <div className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden bg-slate-100 shadow-xl border border-slate-200">
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
                            <div className="text-center">
                                <MapPin className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                                <span className="text-slate-500 font-medium">Interactive Map Integration</span>
                                <p className="text-xs text-slate-400">Google Maps API</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
