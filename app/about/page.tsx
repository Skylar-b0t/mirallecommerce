export default function AboutPage() {
    return (
        <div className="min-h-screen py-24">
            <div className="container-premium max-w-4xl">
                <h1 className="text-4xl lg:text-5xl font-bold mb-8">About Mirall Technology</h1>

                <div className="surface-elevated rounded-2xl p-8 border border-white/10 space-y-6 text-[var(--color-neutral-300)] leading-relaxed">
                    <p className="text-lg text-[var(--color-neutral-100)] font-medium">
                        Mirall Technology is Nairobi's premier destination for high-end electronics and gadgets.
                        Established with a vision to bring world-class technology to Kenya, we specialize in premium
                        smartphones, laptops, audio gear, and photography equipment.
                    </p>

                    <h2 className="text-2xl font-bold text-[var(--color-neutral-100)] pt-4">Our Mission</h2>
                    <p>
                        To empower professionals, creatives, and tech enthusiasts by providing access to the latest
                        authentic technology, backed by exceptional knowledge and support.
                    </p>

                    <h2 className="text-2xl font-bold text-[var(--color-neutral-100)] pt-4">Why Choose Mirall?</h2>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <span className="text-[var(--color-accent)] font-bold">•</span>
                            <span>
                                <strong className="text-[var(--color-neutral-100)]">Authenticity Guarantee:</strong> We are authorized resellers for major brands including Apple, Samsung, Sony, and Dell.
                            </span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[var(--color-accent)] font-bold">•</span>
                            <span>
                                <strong className="text-[var(--color-neutral-100)]">Expert Support:</strong> Our team consists of tech enthusiasts who understand your needs.
                            </span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[var(--color-accent)] font-bold">•</span>
                            <span>
                                <strong className="text-[var(--color-neutral-100)]">Premium Experience:</strong> From our curated online store to our delivery service, quality is our priority.
                            </span>
                        </li>
                    </ul>

                    <div className="pt-8 border-t border-white/10 mt-8">
                        <p className="font-mono text-sm text-[var(--color-neutral-400)]">
                            Based in Westlands Commercial Centre, Nairobi, Kenya.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
