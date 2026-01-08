import { Building2, Target, Eye, Users, Award, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Tentang Kami | Turen Indah Bangunan",
    description: "Mengenal lebih dekat Turen Indah Bangunan - Pusat bahan bangunan terlengkap dan termurah di Malang Raya sejak 2005.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold mb-4">
                            Sejak 2005
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-6">
                            Tentang Turen Indah Bangunan
                        </h1>
                        <p className="text-lg text-slate-300 leading-relaxed">
                            Berawal dari toko bangunan kecil di Turen, kini kami telah berkembang menjadi
                            jaringan retail bahan bangunan terbesar di Malang Raya dengan lebih dari 20 cabang.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-[#D32F2F] text-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl md:text-5xl font-bold mb-2">20+</div>
                            <div className="text-red-100">Cabang</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold mb-2">19</div>
                            <div className="text-red-100">Tahun Pengalaman</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
                            <div className="text-red-100">Produk</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
                            <div className="text-red-100">Pelanggan</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="py-16">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-slate-50 rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                    <Eye className="h-6 w-6 text-blue-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">Visi</h2>
                            </div>
                            <p className="text-slate-600 leading-relaxed">
                                Menjadi jaringan retail bahan bangunan terpercaya dan terdepan di Jawa Timur,
                                dengan menghadirkan produk berkualitas, harga kompetitif, dan pelayanan terbaik
                                untuk mendukung pembangunan Indonesia.
                            </p>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
                                    <Target className="h-6 w-6 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">Misi</h2>
                            </div>
                            <ul className="text-slate-600 space-y-2">
                                <li>• Menyediakan produk bahan bangunan berkualitas dengan harga terjangkau</li>
                                <li>• Memberikan pelayanan cepat dan ramah kepada setiap pelanggan</li>
                                <li>• Memperluas jangkauan cabang untuk kemudahan akses pelanggan</li>
                                <li>• Membangun kemitraan jangka panjang dengan supplier dan kontraktor</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-2xl font-bold text-slate-900 text-center mb-12">
                        Nilai-Nilai Kami
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Building2, title: "Integritas", desc: "Jujur dan transparan dalam setiap transaksi" },
                            { icon: Users, title: "Pelayanan", desc: "Mengutamakan kepuasan pelanggan" },
                            { icon: Award, title: "Kualitas", desc: "Hanya menjual produk berkualitas" },
                            { icon: TrendingUp, title: "Inovasi", desc: "Terus berkembang dan meningkatkan layanan" },
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm">
                                <div className="h-12 w-12 rounded-xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                                    <item.icon className="h-6 w-6 text-[#D32F2F]" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        Siap Memulai Proyek Anda?
                    </h2>
                    <p className="text-slate-600 mb-6">
                        Kunjungi cabang terdekat atau belanja online sekarang
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/stores">
                            <Button variant="outline" size="lg">
                                Temukan Cabang Terdekat
                            </Button>
                        </Link>
                        <Link href="/products">
                            <Button size="lg" className="bg-[#D32F2F] hover:bg-[#B71C1C]">
                                Belanja Sekarang
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
