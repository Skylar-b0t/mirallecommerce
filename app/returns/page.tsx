import { RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';

export default function ReturnsPage() {
    return (
        <div className="min-h-screen py-24">
            <div className="container-premium max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Returns & Warranty</h1>

                <div className="space-y-8">
                    <div className="surface-elevated p-8 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <RotateCcw className="w-6 h-6 text-[var(--color-accent)]" />
                            <h2 className="text-2xl font-bold">30-Day Return Policy</h2>
                        </div>
                        <p className="text-[var(--color-neutral-300)] mb-6">
                            If you are not completely satisfied with your purchase, you may return it within 30 days of the delivery date.
                            The item must be unused, in its original packaging, and with all accessories included.
                        </p>

                        <h3 className="text-lg font-semibold mb-3">To be eligible for a return:</h3>
                        <ul className="space-y-2 text-[var(--color-neutral-400)]">
                            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Item must be in new/origina condition</li>
                            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Original packaging must be intact</li>
                            <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Proof of purchase is required</li>
                        </ul>
                    </div>

                    <div className="surface-elevated p-8 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="w-6 h-6 text-[var(--color-accent)]" />
                            <h2 className="text-2xl font-bold">Warranty Information</h2>
                        </div>
                        <p className="text-[var(--color-neutral-300)] mb-4">
                            All products sold by Mirall Technology come with a standard <strong>1-Year Manufacturer Warranty</strong> unless stated otherwise.
                        </p>
                        <p className="text-[var(--color-neutral-300)]">
                            This warranty covers defects in materials and workmanship. It does not cover accidental damage, liquid damage, or misuse.
                        </p>
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                        <h3 className="font-bold mb-2">How to initiate a return</h3>
                        <p className="text-sm text-[var(--color-neutral-400)]">
                            Please contact our support team at <a href="mailto:hello@mirallecommerce.com" className="text-[var(--color-accent)] hover:underline">hello@mirallecommerce.com</a> or call us with your Order ID to start the process.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
