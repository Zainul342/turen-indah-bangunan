import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Blog & Tips | Turen Indah Bangunan",
    description: "Tips dan panduan seputar bahan bangunan, renovasi rumah, dan proyek konstruksi dari Turen Indah Bangunan.",
};

const BLOG_POSTS = [
    {
        id: 1,
        title: "Cara Memilih Semen yang Tepat untuk Proyek Anda",
        excerpt: "Panduan lengkap memilih jenis semen sesuai kebutuhan konstruksi, mulai dari semen PCC hingga semen putih.",
        category: "Tips Konstruksi",
        date: "5 Januari 2026",
        readTime: "5 menit",
        image: "🏗️",
    },
    {
        id: 2,
        title: "Keunggulan Bata Ringan vs Bata Merah Konvensional",
        excerpt: "Perbandingan detail antara bata ringan AAC dan bata merah tradisional untuk membantu Anda memilih yang terbaik.",
        category: "Material",
        date: "3 Januari 2026",
        readTime: "7 menit",
        image: "🧱",
    },
    {
        id: 3,
        title: "Estimasi Biaya Renovasi Rumah Type 36",
        excerpt: "Rincian estimasi biaya untuk renovasi rumah type 36, termasuk material, upah tukang, dan tips hemat.",
        category: "Budgeting",
        date: "1 Januari 2026",
        readTime: "10 menit",
        image: "📊",
    },
    {
        id: 4,
        title: "Panduan Memilih Keramik Lantai Anti Slip",
        excerpt: "Tips memilih keramik lantai yang aman untuk area basah seperti kamar mandi dan dapur.",
        category: "Interior",
        date: "28 Desember 2025",
        readTime: "6 menit",
        image: "🏠",
    },
    {
        id: 5,
        title: "Cara Menghitung Kebutuhan Cat Tembok",
        excerpt: "Rumus dan panduan praktis menghitung kebutuhan cat untuk dinding rumah Anda.",
        category: "Tips Praktis",
        date: "25 Desember 2025",
        readTime: "4 menit",
        image: "🎨",
    },
    {
        id: 6,
        title: "Tren Desain Rumah Minimalis 2026",
        excerpt: "Inspirasi desain rumah minimalis terbaru yang sedang tren di Indonesia.",
        category: "Inspirasi",
        date: "20 Desember 2025",
        readTime: "8 menit",
        image: "✨",
    },
];

const CATEGORIES = [
    "Semua",
    "Tips Konstruksi",
    "Material",
    "Budgeting",
    "Interior",
    "Tips Praktis",
    "Inspirasi",
];

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero */}
            <section className="bg-white border-b py-12">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Blog & Tips Bangunan
                    </h1>
                    <p className="text-slate-600 max-w-2xl">
                        Temukan tips, panduan, dan inspirasi seputar bahan bangunan, renovasi rumah,
                        dan proyek konstruksi dari tim ahli Turen Indah Bangunan.
                    </p>
                </div>
            </section>

            {/* Categories */}
            <section className="bg-white border-b py-4 sticky top-16 z-30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {CATEGORIES.map((cat, i) => (
                            <Button
                                key={cat}
                                variant={i === 0 ? "default" : "outline"}
                                size="sm"
                                className={`whitespace-nowrap ${i === 0 ? "bg-[#D32F2F] hover:bg-[#B71C1C]" : ""}`}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Posts */}
            <section className="py-12">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {BLOG_POSTS.map((post) => (
                            <article
                                key={post.id}
                                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
                            >
                                <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                                    <span className="text-6xl">{post.image}</span>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-[#D32F2F] bg-red-50 px-2 py-1 rounded-full">
                                            <Tag className="h-3 w-3" />
                                            {post.category}
                                        </span>
                                    </div>
                                    <h2 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <div className="flex items-center gap-3">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {post.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {post.readTime}
                                            </span>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-[#D32F2F] p-0 h-auto">
                                            Baca
                                            <ArrowRight className="h-3 w-3 ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-12 bg-[#D32F2F] text-white">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-2xl font-bold mb-4">
                        Dapatkan Tips Terbaru via Email
                    </h2>
                    <p className="text-red-100 mb-6">
                        Jadilah yang pertama mendapat tips dan promo terbaru dari kami
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Masukkan email Anda"
                            className="flex-1 h-12 px-4 rounded-lg text-slate-900 placeholder:text-slate-500"
                        />
                        <Button size="lg" className="h-12 bg-slate-900 hover:bg-slate-800">
                            Subscribe
                        </Button>
                    </div>
                    <div className="mt-6">
                        <Link href="/" className="text-red-100 hover:text-white hover:underline">
                            ← Kembali ke Beranda
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
