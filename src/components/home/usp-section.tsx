import { Truck, ShieldCheck, Clock, Award } from "lucide-react";

const USPS = [
    {
        icon: Truck,
        title: "Pengiriman Cepat",
        description: "Armada sendiri siap antar ke lokasi proyek Anda hari ini.",
    },
    {
        icon: ShieldCheck,
        title: "Jaminan Kualitas",
        description: "Produk 100% original dari distributor resmi pabrik.",
    },
    {
        icon: Clock,
        title: "Stok Real-time",
        description: "Cek stok langsung di website tanpa perlu telpon toko.",
    },
    {
        icon: Award,
        title: "Harga Grosir",
        description: "Dapatkan harga termurah untuk pembelian jumlah besar.",
    },
];

export function USPSection() {
    return (
        <section className="border-y border-slate-100 bg-white py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {USPS.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#D32F2F]">
                                <item.icon className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-lg font-bold text-slate-900">{item.title}</h3>
                            <p className="text-sm leading-relaxed text-slate-500">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
