import { Briefcase, MapPin, Clock, Users, Heart, Coffee } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Karir | Turen Indah Bangunan",
    description: "Bergabunglah dengan tim Turen Indah Bangunan. Temukan peluang karir di berbagai cabang kami di Malang Raya.",
};

const JOB_LISTINGS = [
    {
        id: 1,
        title: "Sales Counter",
        location: "Semua Cabang",
        type: "Full-time",
        description: "Melayani pelanggan, memberikan informasi produk, dan memproses transaksi penjualan.",
    },
    {
        id: 2,
        title: "Kasir",
        location: "TIB Talangsuko (Pusat)",
        type: "Full-time",
        description: "Memproses pembayaran, mengelola kas, dan membuat laporan harian.",
    },
    {
        id: 3,
        title: "Staff Gudang",
        location: "Semua Cabang",
        type: "Full-time",
        description: "Mengelola stok barang, menerima pengiriman, dan menyiapkan pesanan.",
    },
    {
        id: 4,
        title: "Driver Pengiriman",
        location: "Malang Raya",
        type: "Full-time",
        description: "Mengantarkan pesanan ke lokasi pelanggan dengan aman dan tepat waktu.",
    },
    {
        id: 5,
        title: "Admin Kantor",
        location: "TIB Talangsuko (Pusat)",
        type: "Full-time",
        description: "Mengelola administrasi kantor, input data, dan koordinasi antar cabang.",
    },
];

const BENEFITS = [
    { icon: Heart, title: "Asuransi Kesehatan", desc: "BPJS Kesehatan & Ketenagakerjaan" },
    { icon: Coffee, title: "Tunjangan Makan", desc: "Uang makan harian" },
    { icon: Users, title: "Lingkungan Kerja", desc: "Tim yang solid & supportive" },
    { icon: Briefcase, title: "Jenjang Karir", desc: "Kesempatan promosi jabatan" },
];

export default function KarirPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero */}
            <section className="bg-gradient-to-br from-[#D32F2F] to-[#B71C1C] text-white py-16">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Bergabung dengan Tim Kami
                    </h1>
                    <p className="text-red-100 max-w-2xl mx-auto">
                        Kami selalu mencari talenta terbaik untuk bergabung dengan keluarga besar Turen Indah Bangunan.
                        Temukan peluang karir yang sesuai dengan Anda.
                    </p>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-12 bg-slate-50">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-xl font-bold text-slate-900 text-center mb-8">
                        Mengapa Bergabung dengan Kami?
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {BENEFITS.map((item, i) => (
                            <div key={i} className="bg-white rounded-xl p-6 text-center shadow-sm">
                                <div className="h-10 w-10 rounded-lg bg-red-50 flex items-center justify-center mx-auto mb-3">
                                    <item.icon className="h-5 w-5 text-[#D32F2F]" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                                <p className="text-sm text-slate-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Job Listings */}
            <section className="py-12">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">
                        Lowongan Tersedia
                    </h2>
                    <div className="space-y-4">
                        {JOB_LISTINGS.map((job) => (
                            <div
                                key={job.id}
                                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-900 mb-2">
                                            {job.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-2">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                {job.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {job.type}
                                            </span>
                                        </div>
                                        <p className="text-slate-600">{job.description}</p>
                                    </div>
                                    <a
                                        href={`https://wa.me/6281252462983?text=Halo,%20saya%20tertarik%20dengan%20lowongan%20${encodeURIComponent(job.title)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button className="bg-[#D32F2F] hover:bg-[#B71C1C] whitespace-nowrap">
                                            Lamar via WhatsApp
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-12 bg-slate-50 border-t">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">
                        Tidak menemukan posisi yang sesuai?
                    </h2>
                    <p className="text-slate-600 mb-6">
                        Kirimkan CV Anda untuk posisi mendatang
                    </p>
                    <a
                        href="mailto:karir@turenindah.com?subject=Lamaran%20Kerja"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button variant="outline" size="lg">
                            Kirim CV ke karir@turenindah.com
                        </Button>
                    </a>
                    <div className="mt-4">
                        <Link href="/" className="text-[#D32F2F] hover:underline font-medium">
                            ← Kembali ke Beranda
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
