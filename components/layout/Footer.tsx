import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowRight, ShieldCheck, Truck, CreditCard } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-neutral-950 text-white pt-20 pb-10 border-t border-white/10">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">
                                M
                            </div>
                            <span className="font-display font-bold text-2xl tracking-tight text-white">
                                Mirall<span className="text-primary">.</span>
                            </span>
                        </Link>
                        <p className="text-neutral-400 leading-relaxed text-sm">
                            Your destination for premium electronics. We curate the latest tech from top brands, delivering innovation to your doorstep with exceptional service.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-primary hover:text-white transition-all duration-300 border border-white/5 hover:border-primary">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg text-white mb-6">Shop</h3>
                        <ul className="space-y-4">
                            {['Laptops', 'Smartphones', 'Audio', 'Cameras', 'Accessories'].map((item) => (
                                <li key={item}>
                                    <Link href={`/products?category=${item}`} className="text-neutral-400 hover:text-accent transition-colors flex items-center gap-2 group text-sm">
                                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-bold text-lg text-white mb-6">Support</h3>
                        <ul className="space-y-4">
                            {[
                                { name: 'Contact Us', href: '/contact' },
                                { name: 'Shipping Policy', href: '/shipping' },
                                { name: 'Returns & Warranty', href: '/returns' },
                                { name: 'Privacy Policy', href: '/privacy' },
                                { name: 'Track Order', href: '/orders' },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-neutral-400 hover:text-accent transition-colors text-sm">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-bold text-lg text-white mb-6">Contact Us</h3>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary border border-primary/20">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-white text-sm">Our Location</p>
                                    <p className="text-sm text-neutral-400 mt-1">Mirall Technology HQ</p>
                                    <p className="text-sm text-neutral-400">Westlands Commercial Centre</p>
                                    <p className="text-sm text-neutral-400">Nairobi, Kenya</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary border border-primary/20">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-white text-sm">Call Us</p>
                                    <p className="text-sm text-neutral-400 mt-1">+254 718 511 118</p>
                                    <p className="text-xs text-neutral-500">Mon-Fri: 8am - 5pm</p>
                                    <p className="text-xs text-neutral-500">Weekends: 9am - 2pm</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary border border-primary/20">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-white text-sm">Email Us</p>
                                    <p className="text-sm text-neutral-400 mt-1">hello@mirallecommerce.com</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="border-t border-white/10 py-10 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/50 transition-colors group">
                            <div className="p-3 rounded-full bg-white/5 text-secondary group-hover:scale-110 transition-transform">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Authorized Reseller</h4>
                                <p className="text-xs text-neutral-400 mt-1">Genuine products warranty</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/50 transition-colors group">
                            <div className="p-3 rounded-full bg-white/5 text-primary group-hover:scale-110 transition-transform">
                                <Truck className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Fast Delivery</h4>
                                <p className="text-xs text-neutral-400 mt-1">Countrywide shipping available</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/50 transition-colors group">
                            <div className="p-3 rounded-full bg-white/5 text-success group-hover:scale-110 transition-transform">
                                <CreditCard className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Secure Payment</h4>
                                <p className="text-xs text-neutral-400 mt-1">M-Pesa & Card protection</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
                    <p>&copy; {new Date().getFullYear()} Mirall Technology. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
