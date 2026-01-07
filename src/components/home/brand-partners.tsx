export function BrandPartners() {
    return (
        <section className="border-y border-slate-100 bg-white py-10">
            <div className="container mx-auto px-4 md:px-6">
                <p className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
                    Mitra Resmi Brand Terpercaya
                </p>
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Logo placeholders - Text for MVP */}
                    <span className="text-xl font-black text-slate-800">SEMEN GRESIK</span>
                    <span className="text-xl font-black text-slate-800">TIGA RODA</span>
                    <span className="text-xl font-black text-slate-800">RUCIKA</span>
                    <span className="text-xl font-black text-slate-800">DULUX</span>
                    <span className="text-xl font-black text-slate-800">AVIAN</span>
                    <span className="text-xl font-black text-slate-800">MULIA</span>
                </div>
            </div>
        </section>
    );
}
