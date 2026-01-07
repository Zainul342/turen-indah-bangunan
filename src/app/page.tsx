export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-primary mb-4">
                    Turen Indah Bangunan
                </h1>
                <p className="text-xl text-muted-foreground">
                    Platform E-Commerce Bahan Bangunan Modern
                </p>
                <div className="mt-8 flex gap-4 justify-center">
                    <div className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium">
                        Next.js 15 ✓
                    </div>
                    <div className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium">
                        TypeScript ✓
                    </div>
                    <div className="px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium">
                        Tailwind CSS ✓
                    </div>
                </div>
            </div>
        </main>
    );
}
