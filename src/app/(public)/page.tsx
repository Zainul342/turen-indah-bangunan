import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Truck, ShieldCheck, CreditCard, Clock } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="flex flex-col gap-12 pb-12">
            {/* 1. Hero Section */}
            <section className="relative bg-slate-900 overflow-hidden">
                {/* Background Pattern (Simple CSS gradient for now) */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800 z-0" />

                <div className="container relative z-10 mx-auto px-4 md:px-6 py-20 md:py-32 flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
                        Bangun Masa Depan <br className="hidden md:block" />
                        <span className="text-[#D32F2F]">Bersama Kami</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-8">
                        Pusat bahan bangunan terlengkap di Malang Raya.
                        Harga transparan, stok real-time, dan pengiriman cepat ke lokasi proyek Anda.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/products">
                            <Button size="lg" className="bg-[#D32F2F] hover:bg-[#B71C1C] h-12 px-8 text-base">
                                Belanja Sekarang
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-transparent text-white border-slate-600 hover:bg-slate-800 hover:text-white">
                                Pelajari Lebih Lanjut
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2. Value Props */}
            <section className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="p-3 bg-red-50 rounded-full mb-4 text-[#D32F2F]">
                                {feature.icon}
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                            <p className="text-sm text-slate-500">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Categories */}
            <section className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Kategori Pilihan</h2>
                    <Link href="/products" className="text-[#D32F2F] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                        Lihat Semua <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((cat, idx) => (
                        <Link
                            key={idx}
                            href={`/categories/${cat.slug}`}
                            className="group flex flex-col items-center p-4 bg-white border border-slate-200 rounded-xl hover:border-[#D32F2F] hover:shadow-md transition-all pt-6"
                        >
                            {/* Placeholder for Category Image */}
                            <div className="w-16 h-16 bg-slate-100 rounded-full mb-4 flex items-center justify-center text-2xl group-hover:bg-red-50 transition-colors">
                                {cat.emoji}
                            </div>
                            <span className="font-semibold text-slate-700 group-hover:text-[#D32F2F] text-center">
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 4. CTA B2B (Optional) */}
            <section className="container mx-auto px-4 md:px-6">
                <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center md:text-left md:flex items-center justify-between">
                    <div className="max-w-2xl mb-6 md:mb-0">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Kontraktor atau Pemilik Toko?</h2>
                        <p className="text-slate-300">
                            Dapatkan harga khusus B2B, term pembayaran fleksibel, dan prioritas pengiriman untuk kebutuhan proyek besar Anda.
                        </p>
                    </div>
                    <Link href="/b2b">
                        <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                            Daftar Akun Bisnis
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

const features = [
    {
        title: 'Pengiriman Cepat',
        description: 'Armada sendiri menjamin barang sampai tepat waktu.',
        icon: <Truck className="h-6 w-6" />,
    },
    {
        title: 'Pembayaran Aman',
        description: 'Transaksi aman dengan berbagai metode pembayaran.',
        icon: <ShieldCheck className="h-6 w-6" />,
    },
    {
        title: 'Harga Terbaik',
        description: 'Harga kompetitif langsung dari distributor tangan pertama.',
        icon: <CreditCard className="h-6 w-6" />,
    },
    {
        title: 'Layanan 24/7',
        description: 'Pemesanan online kapan saja, dimana saja.',
        icon: <Clock className="h-6 w-6" />,
    },
];

const categories = [
    { name: 'Semen & Pasir', slug: 'semen', emoji: '🧱' },
    { name: 'Cat & Pelapis', slug: 'cat', emoji: '🎨' },
    { name: 'Lantai/Dinding', slug: 'lantai', emoji: '🏠' },
    { name: 'Pintu & Jendela', slug: 'pintu', emoji: '🚪' },
    { name: 'Plumbing', slug: 'plumbing', emoji: '🚿' },
    { name: 'Alat Tukang', slug: 'tools', emoji: '🔨' },
];
