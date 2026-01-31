'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAppSelector } from '@/lib/redux/hooks';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { totalItems } = useAppSelector((state) => state.cart);

    const categories = [
        'Laptops',
        'Smartphones',
        'Audio',
        'Cameras',
        'Wearables',
        'Accessories',
    ];

    return (
        <header className="sticky top-0 z-50 surface-elevated backdrop-blur-md bg-[var(--color-surface)]/95">
            {/* Top Bar - Trust Signals */}
            <div className="border-b border-white/5">
                <div className="container-premium">
                    <div className="flex items-center justify-between h-10 text-xs">
                        <div className="flex items-center gap-6 text-[var(--color-neutral-400)]">
                            <span className="hidden md:inline">Free shipping on orders over Ksh 10,000</span>
                            <span className="hidden lg:inline">•</span>
                            <span className="hidden lg:inline">30-day returns</span>
                        </div>
                        <div className="flex items-center gap-4 text-[var(--color-neutral-400)]">
                            <Link href="/support" className="hover:text-[var(--color-neutral-200)] transition-colors">
                                Support
                            </Link>
                            <span className="hidden sm:inline">•</span>
                            <Link href="/track" className="hidden sm:inline hover:text-[var(--color-neutral-200)] transition-colors">
                                Track Order
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="container-premium">
                <div className="flex items-center justify-between h-[var(--header-height)]">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-[var(--color-accent)] rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                            <span className="text-white font-bold text-lg">M</span>
                        </div>
                        <span className="text-xl font-semibold tracking-tight text-[var(--color-neutral-50)]">
                            Mirall
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {categories.map((category) => (
                            <Link
                                key={category}
                                href={`/products?category=${category}`}
                                className="px-4 py-2 text-sm font-medium text-[var(--color-neutral-300)] hover:text-[var(--color-neutral-50)] hover:bg-white/5 rounded-lg transition-all"
                            >
                                {category}
                            </Link>
                        ))}
                    </nav>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-500)]" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-primary-light)] border border-white/10 rounded-lg text-sm text-[var(--color-neutral-100)] placeholder:text-[var(--color-neutral-500)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-5 h-5 text-[var(--color-neutral-300)]" />
                            ) : (
                                <Menu className="w-5 h-5 text-[var(--color-neutral-300)]" />
                            )}
                        </button>

                        {/* Account */}
                        <Link
                            href="/account"
                            className="hidden sm:flex items-center gap-2 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors group"
                        >
                            <User className="w-5 h-5 text-[var(--color-neutral-400)] group-hover:text-[var(--color-neutral-200)]" />
                        </Link>

                        {/* Cart */}
                        <Link
                            href="/cart"
                            className="relative flex items-center gap-2 px-3 py-2 hover:bg-white/5 rounded-lg transition-colors group"
                        >
                            <ShoppingCart className="w-5 h-5 text-[var(--color-neutral-400)] group-hover:text-[var(--color-neutral-200)]" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-accent)] text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="md:hidden pb-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-500)]" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-primary-light)] border border-white/10 rounded-lg text-sm text-[var(--color-neutral-100)] placeholder:text-[var(--color-neutral-500)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden border-t border-white/5 animate-fade-in">
                    <div className="container-premium py-4">
                        <nav className="flex flex-col gap-1">
                            {categories.map((category) => (
                                <Link
                                    key={category}
                                    href={`/products?category=${category}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-4 py-3 text-sm font-medium text-[var(--color-neutral-300)] hover:text-[var(--color-neutral-50)] hover:bg-white/5 rounded-lg transition-all"
                                >
                                    {category}
                                </Link>
                            ))}
                            <div className="divider-subtle my-2" />
                            <Link
                                href="/account"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-4 py-3 text-sm font-medium text-[var(--color-neutral-300)] hover:text-[var(--color-neutral-50)] hover:bg-white/5 rounded-lg transition-all"
                            >
                                Account
                            </Link>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}
