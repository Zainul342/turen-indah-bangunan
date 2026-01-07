interface ProductSpec {
    label: string;
    value: string;
}

interface ProductSpecsProps {
    specs: ProductSpec[];
}

export function ProductSpecs({ specs }: ProductSpecsProps) {
    if (!specs || specs.length === 0) return null;

    return (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
                <h3 className="font-semibold text-slate-900">Spesifikasi Produk</h3>
            </div>
            <div className="divide-y divide-slate-100">
                {specs.map((spec, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 px-6 py-3 text-sm">
                        <div className="font-medium text-slate-500">{spec.label}</div>
                        <div className="col-span-2 text-slate-900 font-medium">{spec.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
