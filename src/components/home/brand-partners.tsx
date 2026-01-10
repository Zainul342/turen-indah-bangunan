export function BrandPartners() {
    return (
        <section className="border-y border-slate-100 bg-white py-10 md:py-12">
            <div className="container mx-auto px-4 md:px-6">
                <p className="mb-8 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
                    Mitra Resmi Brand Terpercaya
                </p>
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                    {/* Logo placeholders - Text for MVP */}
                    <span className="text-lg md:text-xl font-black text-slate-800 hover:text-brand transition-colors">SEMEN GRESIK</span>
                    <span className="text-lg md:text-xl font-black text-slate-800 hover:text-brand transition-colors">TIGA RODA</span>
                    <span className="text-lg md:text-xl font-black text-slate-800 hover:text-brand transition-colors">RUCIKA</span>
                    <span className="text-lg md:text-xl font-black text-slate-800 hover:text-brand transition-colors">DULUX</span>
                    <span className="text-lg md:text-xl font-black text-slate-800 hover:text-brand transition-colors">AVIAN</span>
                    <span className="text-lg md:text-xl font-black text-slate-800 hover:text-brand transition-colors">MULIA</span>
                </div>
            </div>
        </section>
    );
}
