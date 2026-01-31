'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAppSelector } from '@/lib/redux/hooks';
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const cartItems = useAppSelector((state) => state.cart.totalItems);

    const categories = [
        'Smartphones',
        'Laptops',
        'Tablets',
        'Accessories',
        'Audio',
        'Cameras',
        'Gaming',
        'Wearables',
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white shadow-lg sticky top-0 z-50">
            {/* Top Bar */}
            <div className="border-b border-purple-700/30">
                <div className="container mx-auto px-4 py-2 flex justify-between items-center text-sm">
                    <p className="text-purple-200">Free shipping on orders over $100</p>
                    <div className="flex gap-4">
                        <Link href="/track-order" className="hover:text-purple-300 transition">
                            Track Order
                        </Link>
                        <Link href="/support" className="hover:text-purple-300 transition">
                            Support
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg group-hover:scale-110 transition-transform">
                            <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Mirall
                        </span>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for products..."
                                className="w-full px-4 py-3 pl-12 rounded-full bg-white/10 backdrop-blur-sm border border-purple-500/30 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 text-white placeholder-purple-200/50 transition"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition font-medium"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/account"
                            className="hidden md:flex items-center gap-2 hover:text-purple-300 transition"
                        >
                            <User className="w-5 h-5" />
                            <span>Account</span>
                        </Link>
                        <Link href="/cart" className="relative group">
                            <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            {cartItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                                    {cartItems}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Categories - Desktop */}
                <div className="hidden md:flex items-center justify-center gap-6 mt-4 pt-4 border-t border-purple-700/30">
                    {categories.map((category) => (
                        <Link
                            key={category}
                            href={`/products?category=${category}`}
                            className="text-sm hover:text-purple-300 transition relative group"
                        >
                            {category}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-purple-700/30 bg-slate-900/95 backdrop-blur-sm">
                    <div className="container mx-auto px-4 py-4">
                        {/* Mobile Search */}
                        <form onSubmit={handleSearch} className="mb-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full px-4 py-2 pl-10 rounded-lg bg-white/10 border border-purple-500/30 focus:border-purple-400 focus:outline-none text-white placeholder-purple-200/50"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-300" />
                            </div>
                        </form>

                        {/* Mobile Categories */}
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <Link
                                    key={category}
                                    href={`/products?category=${category}`}
                                    className="block py-2 hover:text-purple-300 transition"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {category}
                                </Link>
                            ))}
                            <Link
                                href="/account"
                                className="block py-2 hover:text-purple-300 transition border-t border-purple-700/30 mt-2 pt-4"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                My Account
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
