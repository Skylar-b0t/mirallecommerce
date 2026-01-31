import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowRight, ShieldCheck, Truck, CreditCard } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-surface border-t border-gray-200 dark:border-white/5 pt-16 pb-8">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">
                                M
                            </div>
                            <span className="font-display font-bold text-2xl tracking-tight text-foreground">
                                Mirall<span className="text-primary">.</span>
                            </span>
                        </Link>
                        <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                            Your destination for premium electronics. We curate the latest tech from top brands, delivering innovation to your doorstep with exceptional service.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-primary hover:text-white transition-all duration-300">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-display font-semibold text-lg text-foreground mb-6">Shop</h3>
                        <ul className="space-y-4">
                            {['Laptops', 'Smartphones', 'Audio', 'Cameras', 'Accessories'].map((item) => (
                                <li key={item}>
                                    <Link href={`/products?category=${item}`} className="text-neutral-500 dark:text-neutral-400 hover:text-primary transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-display font-semibold text-lg text-foreground mb-6">Support</h3>
                        <ul className="space-y-4">
                            {[
                                { name: 'Contact Us', href: '/contact' },
                                { name: 'Shipping Policy', href: '/shipping' },
                                { name: 'Returns & Warranty', href: '/returns' },
                                { name: 'Privacy Policy', href: '/privacy' },
                                { name: 'Track Order', href: '/orders' },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-neutral-500 dark:text-neutral-400 hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-display font-semibold text-lg text-foreground mb-6">Contact</h3>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">Our Location</p>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Westlands, Nairobi, Kenya</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">Call Us</p>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">+254 700 000 000</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-foreground">Email Us</p>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">support@mirall.co.ke</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="border-t border-gray-200 dark:border-white/5 py-8 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                            <ShieldCheck className="w-8 h-8 text-secondary" />
                            <div>
                                <h4 className="font-semibold text-foreground">Authorized Reseller</h4>
                                <p className="text-xs text-neutral-500">Genuine products warranty</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                            <Truck className="w-8 h-8 text-primary" />
                            <div>
                                <h4 className="font-semibold text-foreground">Free Shipping</h4>
                                <p className="text-xs text-neutral-500">On orders over KES 10,000</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                            <CreditCard className="w-8 h-8 text-success" />
                            <div>
                                <h4 className="font-semibold text-foreground">Secure Payment</h4>
                                <p className="text-xs text-neutral-500">M-Pesa & Card protection</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <p>&copy; {new Date().getFullYear()} Mirall Technology. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
