import { Truck, Clock, MapPin } from 'lucide-react';

export default function ShippingPage() {
    return (
        <div className="min-h-screen py-24">
            <div className="container-premium max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Shipping & Delivery</h1>

                <div className="grid gap-6 mb-12">
                    <div className="surface-elevated p-6 rounded-2xl border border-white/10 flex gap-4 items-start">
                        <div className="p-3 bg-[var(--color-primary-light)] rounded-lg text-[var(--color-accent)]">
                            <Truck className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Free Delivery</h3>
                            <p className="text-[var(--color-neutral-300)]">
                                We offer free standard shipping on all orders over <strong className="text-[var(--color-neutral-50)]">Ksh 10,000</strong> within Nairobi.
                                For orders under this amount, a flat rate of Ksh 300 applies.
                            </p>
                        </div>
                    </div>

                    <div className="surface-elevated p-6 rounded-2xl border border-white/10 flex gap-4 items-start">
                        <div className="p-3 bg-[var(--color-primary-light)] rounded-lg text-[var(--color-accent)]">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Delivery Times</h3>
                            <ul className="space-y-2 text-[var(--color-neutral-300)]">
                                <li>• <strong className="text-[var(--color-neutral-50)]">Nairobi & Environs:</strong> 1-2 Business Days (Often Same Day)</li>
                                <li>• <strong className="text-[var(--color-neutral-50)]">Upcountry (Major Towns):</strong> 2-3 Business Days</li>
                                <li>• <strong className="text-[var(--color-neutral-50)]">Remote Areas:</strong> 3-5 Business Days</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="surface-elevated p-8 rounded-2xl border border-white/10">
                    <h2 className="text-2xl font-bold mb-4">Our Delivery Partners</h2>
                    <p className="text-[var(--color-neutral-300)] mb-4">
                        We partner with reliable courier services including Wells Fargo and G4S to ensure your electronics reach you safely.
                    </p>
                    <p className="text-[var(--color-neutral-300)]">
                        All high-value shipments are fully insured during transit. You will receive a tracking number via SMS/Email once your order has been dispatched.
                    </p>
                </div>
            </div>
        </div>
    );
}
