import Link from "next/link";
import { Package, BrickWall, Hammer, Zap, Layers, Droplet, Wrench } from "lucide-react";

const CATEGORIES = [
    { id: "semen", name: "Semen & Perekat", icon: Package, count: "12+ Produk" },
    { id: "bata-ringan", name: "Bata Ringan", icon: BrickWall, count: "5+ Produk" },
    { id: "builder-hardware", name: "Builder Hardware", icon: Hammer, count: "40+ Produk" },
    { id: "flash", name: "Flash Sale", icon: Zap, count: "Promo Terbatas" },
    { id: "keramik", name: "Keramik Lantai", icon: Layers, count: "100+ Motif" },
    { id: "kran", name: "Kran & Sanitary", icon: Droplet, count: "25+ Model" },
    { id: "plumbing", name: "Pipa Plumbing", icon: Wrench, count: "30+ Ukuran" },
];

export function CategoriesGrid() {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">Kategori Pilihan</h2>
                    <Link href="/products" className="text-sm font-semibold text-[#D32F2F] hover:underline">
                        Lihat Semua
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                    {CATEGORIES.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/products?category=${cat.id}`}
                            className="group flex flex-col items-center justify-center rounded-2xl border border-transparent bg-white shadow-card p-6 text-center transition-all duration-300 hover:shadow-glow-sm hover:-translate-y-1"
                        >
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-100 group-hover:bg-red-50 group-hover:ring-red-100 transition-colors">
                                <cat.icon className="h-6 w-6 text-slate-600 group-hover:text-[#D32F2F]" />
                            </div>
                            <h3 className="font-semibold text-slate-900 text-sm md:text-base group-hover:text-[#D32F2F]">
                                {cat.name}
                            </h3>
                            <span className="mt-1 text-xs text-slate-500">
                                {cat.count}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
