import { Truck, ShieldCheck, Clock, Award } from "lucide-react";

const USPS = [
    {
        icon: Truck,
        title: "Kirim Hari Ini",
        description: "Pesan pagi, dikirim hari ini. Armada sendiri, tidak nunggu kurir.",
    },
    {
        icon: ShieldCheck,
        title: "100% Produk Asli",
        description: "Garansi uang kembali 2x lipat jika barang palsu. Distributor resmi.",
    },
    {
        icon: Clock,
        title: "Stok Pasti Ada",
        description: "Data stok real-time. Yang Anda lihat di website, itu yang ada di gudang.",
    },
    {
        icon: Award,
        title: "Harga Distributor",
        description: "Langsung dari pabrik. Harga tangan pertama tanpa markup perantara.",
    },
];

export function USPSection() {
    return (
        <section className="border-y border-slate-100 bg-white py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 md:gap-10">
                    {USPS.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center sm:items-start sm:text-left group">
                            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-red-50 text-brand border border-red-100 group-hover:scale-110 group-hover:bg-red-100 transition-all">
                                <item.icon className="h-7 w-7" />
                            </div>
                            <h3 className="mb-2 text-base md:text-lg font-bold text-slate-900">{item.title}</h3>
                            <p className="text-sm leading-relaxed text-slate-600">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
