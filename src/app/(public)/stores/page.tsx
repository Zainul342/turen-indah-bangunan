import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
    title: "Lokasi Toko | Turen Indah Bangunan",
    description: "Temukan lokasi cabang Turen Indah Bangunan terdekat dengan Anda. 20+ cabang tersebar di Malang Raya.",
};

const ALL_STORES = [
    {
        id: 1,
        name: "TIB Talangsuko Turen (Pusat)",
        address: "Jl. Raya Talang Suko No.15 b, Padi, Talangsuko, Kec. Turen, Kabupaten Malang",
        phone: "+62 812-5246-2983",
        hours: "07:00 - 17:00",
        mapUrl: "https://maps.google.com/?q=TIB+Talangsuko+Turen+Malang",
        isMain: true,
    },
    {
        id: 2,
        name: "TIB Bululawang",
        address: "Jl. Raya Bululawang, Kec. Bululawang, Kabupaten Malang",
        phone: "+62 812-3456-7891",
        hours: "07:00 - 17:00",
        mapUrl: "https://maps.google.com/?q=Bululawang+Malang",
    },
    {
        id: 3,
        name: "TIB Sawojajar",
        address: "Jl. Danau Kerinci Raya No.67, Lesanpuro, Kec. Kedungkandang, Kota Malang",
        phone: "+62 812-3456-7892",
        hours: "07:00 - 17:00",
        mapUrl: "https://maps.google.com/?q=Sawojajar+Malang",
    },
    {
        id: 4,
        name: "TIB Kepanjen",
        address: "Jl. KH. Ahmad Dahlan, Kepanjen, Kabupaten Malang",
        phone: "+62 812-3456-7893",
        hours: "07:00 - 17:00",
        mapUrl: "https://maps.google.com/?q=Kepanjen+Malang",
    },
    {
        id: 5,
        name: "TIB Batu",
        address: "Mojorejo, Kec. Junrejo, Kota Batu",
        phone: "+62 812-3456-7894",
        hours: "07:00 - 17:00",
        mapUrl: "https://maps.google.com/?q=Junrejo+Batu+Malang",
    },
    {
        id: 6,
        name: "TIB Singosari",
        address: "Jl. Raya Singosari, Kec. Singosari, Kabupaten Malang",
        phone: "+62 812-3456-7895",
        hours: "07:00 - 17:00",
        mapUrl: "https://maps.google.com/?q=Singosari+Malang",
    },
    {
        id: 7,
        name: "TIB Lawang",
        address: "Jl. Raya Lawang, Kec. Lawang, Kabupaten Malang",
        phone: "+62 812-3456-7896",
        hours: "07:00 - 17:00",
        mapUrl: "https://maps.google.com/?q=Lawang+Malang",
    },
    {
        id: 8,
        name: "TIB Pakisaji",
        address: "Jl. Raya Pakisaji, Kec. Pakisaji, Kabupaten Malang",
        phone: "+62 812-3456-7897",
        hours: "07:00 - 17:00",
        mapUrl: "https://maps.google.com/?q=Pakisaji+Malang",
    },
    {
        id: 9,
        name: "TIB Gondanglegi",
        address: "Jl. Raya Gondanglegi, Kec. Gondanglegi, Kabupaten Malang",
        phone: "+62 812-3456-7898",
        hours: "07:00 - 17:00",
        mapUrl: "https://maps.google.com/?q=Gondanglegi+Malang",
    },
    {
        id: 10,
        name: "TIB Dampit",
        address: "Jl. Raya Dampit, Kec. Dampit, Kabupaten Malang",
        phone: "+62 812-3456-7899",
        hours: "07:00 - 17:00",
        mapUrl: "https://maps.google.com/?q=Dampit+Malang",
    },
    {
        id: 11,
        name: "TIB Tumpang",
        address: "Jl. Raya Tumpang, Kec. Tumpang, Kabupaten Malang",
        phone: "+62 812-3456-7800",
        hours: "07:00 - 17:00",
        mapUrl: "https://maps.google.com/?q=Tumpang+Malang",
    },
    {
        id: 12,
        name: "TIB Karangploso",
        address: "Jl. Raya Karangploso, Kec. Karangploso, Kabupaten Malang",
        phone: "+62 812-3456-7801",
        hours: "07:00 - 17:00",
        mapUrl: "https://maps.google.com/?q=Karangploso+Malang",
    },
];

export default function StoresPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[#D32F2F] to-[#B71C1C] text-white py-16">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        Lokasi Cabang Kami
                    </h1>
                    <p className="text-red-100 max-w-2xl mx-auto">
                        Dengan 20+ cabang tersebar di seluruh Malang Raya, kami siap melayani kebutuhan material bangunan Anda dengan pengiriman cepat dan harga bersaing.
                    </p>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-8">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126148.36938368!2d112.58!3d-8.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd627f3c6e8e6f5%3A0x4027a76e3524380!2sMalang%2C%20Malang%20City%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1704700000000!5m2!1sen!2sid"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Peta Lokasi Turen Indah Bangunan"
                        />
                    </div>
                </div>
            </section>

            {/* Store List */}
            <section className="py-12">
                <div className="container mx-auto px-4 md:px-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">
                        Semua Cabang ({ALL_STORES.length} Lokasi)
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {ALL_STORES.map((store) => (
                            <div
                                key={store.id}
                                className={`relative bg-white rounded-2xl border p-6 transition-all hover:shadow-lg hover:-translate-y-1 ${store.isMain ? "border-[#D32F2F] ring-1 ring-[#D32F2F]" : "border-slate-200"
                                    }`}
                            >
                                {store.isMain && (
                                    <span className="absolute -top-3 left-4 bg-[#D32F2F] text-white text-xs font-bold px-3 py-1 rounded-full">
                                        Kantor Pusat
                                    </span>
                                )}
                                <h3 className="font-bold text-slate-900 text-lg mb-3">
                                    {store.name}
                                </h3>
                                <div className="space-y-2 text-sm text-slate-600 mb-4">
                                    <div className="flex items-start gap-2">
                                        <MapPin className="h-4 w-4 mt-0.5 text-slate-400 shrink-0" />
                                        <span>{store.address}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-slate-400" />
                                        <a href={`tel:${store.phone}`} className="hover:text-[#D32F2F]">
                                            {store.phone}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-slate-400" />
                                        <span>{store.hours} (Senin - Sabtu)</span>
                                    </div>
                                </div>
                                <a
                                    href={store.mapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button variant="outline" size="sm" className="w-full">
                                        <Navigation className="h-4 w-4 mr-2" />
                                        Petunjuk Arah
                                    </Button>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 bg-white border-t">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                        Butuh Bantuan Menemukan Cabang Terdekat?
                    </h2>
                    <p className="text-slate-600 mb-6">
                        Hubungi kami via WhatsApp untuk informasi lebih lanjut
                    </p>
                    <a
                        href="https://wa.me/6281252462983?text=Halo,%20saya%20ingin%20tanya%20lokasi%20cabang%20terdekat"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button size="lg" className="bg-green-600 hover:bg-green-700">
                            Chat via WhatsApp
                        </Button>
                    </a>
                    <div className="mt-4">
                        <Link href="/products" className="text-[#D32F2F] hover:underline font-medium">
                            ← Kembali ke Katalog Produk
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
