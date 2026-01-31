'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Search, ShoppingCart, User, Menu, X, LogOut, Sun, Moon, Laptop, Smartphone, Headphones, Watch, Camera, ArrowRight, Package, ChevronRight } from 'lucide-react';
import { useAppSelector } from '@/lib/redux/hooks';
import { ThemeToggle } from '../ui/ThemeToggle';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { totalItems } = useAppSelector((state) => state.cart);
    const { data: session, status } = useSession();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Laptops', href: '/products?category=Laptops' },
        { name: 'Smartphones', href: '/products?category=Smartphones' },
        { name: 'Audio', href: '/products?category=Audio' },
        { name: 'Cameras', href: '/products?category=Cameras' },
        { name: 'Wearables', href: '/products?category=Wearables' },
        { name: 'Accessories', href: '/products?category=Accessories' },
        { name: 'Contact Us', href: '/contact' },
    ];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const query = (e.currentTarget.elements.namedItem('search') as HTMLInputElement).value;
        if (query.trim()) {
            router.push(`/products?search=${encodeURIComponent(query)}`);
        }
    };

    return (
        <header
            className={`sticky top-0 left-0 right-0 z-50 bg-background border-b border-border transition-shadow duration-200 ${isScrolled || isMobileMenuOpen ? 'shadow-sm' : ''
                }`}
        >
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[var(--header-height)]">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group z-50">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/25 group-hover:scale-105 transition-transform duration-300">
                        M
                    </div>
                    <span className="font-display font-bold text-xl tracking-tight text-foreground">
                        Mirall<span className="text-primary">.</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? 'text-primary' : 'text-neutral-600 dark:text-neutral-300'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    {/* Search - Desktop */}
                    <form onSubmit={handleSubmit} className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 dark:bg-white/5 border border-transparent focus-within:border-primary/50 focus-within:bg-white dark:focus-within:bg-black/20 focus-within:ring-2 focus-within:ring-primary/20 transition-all w-64">
                        <Search className="w-4 h-4 text-neutral-400" />
                        <input
                            type="text"
                            name="search"
                            placeholder="Search devices..."
                            className="bg-transparent border-none outline-none text-sm text-foreground placeholder:text-neutral-400 w-full"
                        />
                    </form>

                    <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-white/10">
                        <ThemeToggle />

                        {session ? (
                            <div className="relative group">
                                <Link
                                    href="/profile"
                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-neutral-600 dark:text-neutral-300 transition-colors"
                                >
                                    {session.user?.image ? (
                                        <img src={session.user.image} alt={session.user.name || 'User'} className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10" />
                                    ) : (
                                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                                            {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                    )}
                                </Link>
                                {/* Dropdown */}
                                <div className="absolute right-0 top-full mt-2 w-56 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right z-50">
                                    <div className="px-4 py-3 border-b border-gray-100 dark:border-white/5 mb-2">
                                        <p className="text-sm font-medium text-foreground truncate">{session.user?.name}</p>
                                        <p className="text-xs text-neutral-500 truncate">{session.user?.email}</p>
                                    </div>
                                    <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-primary">
                                        <User className="w-4 h-4" /> Profile
                                    </Link>
                                    <Link href="/orders" className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-primary">
                                        <Package className="w-4 h-4" /> Orders
                                    </Link>
                                    {(session.user as any).role === 'admin' && (
                                        <Link href="/admin/products" className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-600 dark:text-neutral-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-primary">
                                            <ChevronRight className="w-4 h-4" /> Admin Dashboard
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => signOut()}
                                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 mt-2"
                                    >
                                        <LogOut className="w-4 h-4" /> Sign out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link href="/login" className="btn-primary py-2 px-4 text-sm shadow-md shadow-primary/20">
                                Sign In
                            </Link>
                        )}

                        <Link
                            href="/cart"
                            className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-neutral-600 dark:text-neutral-300 transition-colors group"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-neutral-600 dark:text-neutral-300"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-neutral-950 z-[100] lg:hidden transition-transform duration-300 md:duration-200 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <span className="text-xl font-bold text-white">Menu</span>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 text-neutral-400 hover:text-white transition-colors"
                    >
                        <X className="w-8 h-8" />
                    </button>
                </div>

                <div className="flex flex-col gap-6 p-6 overflow-y-auto max-h-[calc(100vh-80px)]">
                    <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus-within:border-accent transition-colors">
                        <Search className="w-5 h-5 text-neutral-400" />
                        <input
                            type="text"
                            name="search"
                            placeholder="Search products..."
                            className="bg-transparent border-none outline-none text-base text-white w-full placeholder:text-neutral-500"
                        />
                    </form>

                    <div className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-xl font-semibold text-neutral-200 hover:text-white hover:bg-white/5 py-4 px-4 rounded-lg transition-colors flex items-center justify-between group"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                                <ArrowRight className="w-5 h-5 text-neutral-600 group-hover:text-accent transition-colors" />
                            </Link>
                        ))}
                    </div>

                    <div className="border-t border-white/10 pt-6 space-y-4">
                        {status === 'authenticated' ? (
                            <>
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-3 text-neutral-200 py-2 hover:text-white transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <User className="w-5 h-5" />
                                    My Profile
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="flex items-center gap-3 text-red-400 py-2 w-full hover:text-red-300 transition-colors"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <Link
                                    href="/login"
                                    className="btn-primary w-full text-center py-3 bg-white text-neutral-950 hover:bg-neutral-200 border-none"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/register"
                                    className="btn-secondary w-full text-center py-3 border-white/20 text-white hover:bg-white/10"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Create Account
                                </Link>
                            </div>
                        )}

                        <div className="pt-4 pb-8">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
