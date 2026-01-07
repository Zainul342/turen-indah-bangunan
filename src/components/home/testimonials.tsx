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
                <div className="mb-10 text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">Apa Kata Pelanggan?</h2>
                    <p className="mt-2 text-slate-500">Ribuan kontraktor dan pemilik rumah mempercayai Turen Indah Bangunan.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {REVIEWS.map((review, i) => (
                        <div key={i} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
                            <div className="flex items-center gap-1 text-yellow-400 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-current" />
                                ))}
                            </div>
                            <p className="text-slate-600 mb-6 italic">&quot;{review.text}&quot;</p>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-sm">
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
