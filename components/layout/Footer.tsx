'use client';

import Link from 'next/link';
import { Shield, Truck, RotateCcw, Headphones, Mail } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const trustBadges = [
        { icon: Truck, label: 'Free Shipping', detail: 'On orders Ksh 10,000+' },
        { icon: Shield, label: 'Secure Payment', detail: '100% Protected' },
        { icon: RotateCcw, label: '30-Day Returns', detail: 'Easy process' },
        { icon: Headphones, label: '24/7 Support', detail: 'Expert help' },
    ];

    const footerLinks = {
        Shop: [
            { label: 'All Products', href: '/products' },
            { label: 'Laptops', href: '/products?category=Laptops' },
            { label: 'Smartphones', href: '/products?category=Smartphones' },
            { label: 'Audio', href: '/products?category=Audio' },
            { label: 'Cameras', href: '/products?category=Cameras' },
        ],
        Support: [
            { label: 'Contact Us', href: '/contact' },
            { label: 'Shipping Info', href: '/shipping' },
            { label: 'Returns', href: '/returns' },
            { label: 'Warranty', href: '/warranty' },
            { label: 'FAQ', href: '/faq' },
        ],
        Company: [
            { label: 'About Us', href: '/about' },
            { label: 'Careers', href: '/careers' },
            { label: 'Press', href: '/press' },
            { label: 'Sustainability', href: '/sustainability' },
            { label: 'Authorized Reseller', href: '/authorized' },
        ],
        Legal: [
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' },
            { label: 'Cookie Policy', href: '/cookies' },
            { label: 'Accessibility', href: '/accessibility' },
        ],
    };

    return (
        <footer className="bg-[var(--color-surface)] border-t border-white/5 mt-auto">
            {/* Trust Badges Section */}
            <div className="border-b border-white/5">
                <div className="container-premium py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {trustBadges.map((badge) => (
                            <div key={badge.label} className="flex flex-col items-center text-center group">
                                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-light)] border border-white/10 flex items-center justify-center mb-3 group-hover:border-[var(--color-accent)]/30 transition-all">
                                    <badge.icon className="w-5 h-5 text-[var(--color-accent)]" />
                                </div>
                                <h4 className="text-sm font-semibold text-[var(--color-neutral-100)] mb-1">
                                    {badge.label}
                                </h4>
                                <p className="text-xs text-[var(--color-neutral-500)]">{badge.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container-premium py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4 group">
                            <div className="w-10 h-10 bg-[var(--color-accent)] rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                                <span className="text-white font-bold text-xl">M</span>
                            </div>
                            <span className="text-2xl font-semibold tracking-tight text-[var(--color-neutral-50)]">
                                Mirall
                            </span>
                        </Link>
                        <p className="text-sm text-[var(--color-neutral-400)] leading-relaxed mb-6 max-w-xs">
                            Premium electronics for professionals and enthusiasts. Based in Nairobi, Kenya.
                        </p>

                        {/* Newsletter */}
                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-[var(--color-neutral-100)] mb-3">
                                Stay Updated
                            </h4>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-500)]" />
                                    <input
                                        type="email"
                                        placeholder="Your email"
                                        className="w-full pl-10 pr-3 py-2.5 bg-[var(--color-primary-light)] border border-white/10 rounded-lg text-sm text-[var(--color-neutral-100)] placeholder:text-[var(--color-neutral-500)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
                                    />
                                </div>
                                <button className="btn-primary px-4 py-2.5 text-sm whitespace-nowrap">
                                    Subscribe
                                </button>
                            </div>
                        </div>

                        {/* Eco Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-2 bg-[var(--color-primary-light)] border border-white/10 rounded-lg">
                            <span className="text-green-500 text-xs">●</span>
                            <span className="text-xs text-[var(--color-neutral-400)]">Carbon Neutral Shipping</span>
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-sm font-semibold text-[var(--color-neutral-100)] mb-4 tracking-wide">
                                {title}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-200)] transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5">
                <div className="container-premium py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--color-neutral-500)]">
                        <p>© {currentYear} Mirall Technology. All rights reserved. | Nairobi, Kenya</p>
                        <div className="flex items-center gap-6">
                            <span className="badge badge-neutral">Authorized Reseller</span>
                            <span className="badge badge-neutral">Energy Star Partner</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
