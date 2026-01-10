import { Star } from "lucide-react";

const REVIEWS = [
    {
        name: "Pur Wanto",
        date: "25 Mei 2025",
        rating: 5,
        text: "Pelayanan sangat ramah, semua lengkap, harga terjangkau. Sangat recomen👍👍👍👍",
        avatar: "PW"
    },
    {
        name: "Hany Ade",
        date: "25 Mei 2025",
        rating: 5,
        text: "Pelayanannya sangat bagus dan ramah, barang juga banyak pilihan kualitas bahan juga bagus.",
        avatar: "HA"
    },
    {
        name: "Mohammad Indi Fahmi",
        date: "25 Mei 2025",
        rating: 5,
        text: "Pelayanananya bagus, hari minggu jg tetap buka👍👍",
        avatar: "MI"
    },
];

export function Testimonials() {
    return (
        <section className="py-16 bg-slate-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-10 md:mb-12 text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">Apa Kata Pelanggan?</h2>
                    <p className="mt-2 text-sm md:text-base text-slate-600">Ribuan kontraktor dan pemilik rumah mempercayai Turen Indah Bangunan.</p>
                </div>

                <div className="grid gap-4 md:gap-6 md:grid-cols-3">
                    {REVIEWS.map((review, i) => (
                        <div key={i} className="rounded-2xl bg-white p-5 md:p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all">
                            <div className="flex items-center gap-1 text-yellow-400 mb-3 md:mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-current" />
                                ))}
                            </div>
                            <p className="text-sm md:text-base text-slate-600 mb-5 md:mb-6 italic leading-relaxed">&quot;{review.text}&quot;</p>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center font-bold text-slate-600 text-sm">
                                    {review.avatar}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900 text-sm">{review.name}</div>
                                    <div className="text-xs text-slate-400">{review.date}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
