'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Compass, ShoppingBag, Info, Phone, LogIn, LogOut, User } from 'lucide-react';
import { useAppSelector } from '@/lib/redux/hooks';

export default function Navbar() {
    const pathname = usePathname();
    const { totalItems } = useAppSelector((state) => state.cart);
    const { data: session } = useSession();

    const isActive = (path: string) => {
        return pathname === path ? "text-[var(--color-accent)] bg-[var(--color-accent)]/10" : "text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-100)] hover:bg-white/5";
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-surface)]/90 backdrop-blur-xl border-t border-white/10 lg:hidden safe-area-bottom">
            <div className="flex justify-around items-center p-2">
                <Link
                    href="/products"
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${isActive('/products')}`}
                >
                    <Compass className="w-6 h-6" />
                    <span className="text-[10px] font-medium">Explore</span>
                </Link>

                <Link
                    href="/cart"
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all relative ${isActive('/cart')}`}
                >
                    <div className="relative">
                        <ShoppingBag className="w-6 h-6" />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-[var(--color-accent)] text-[var(--color-primary)] text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-pulse-gentle">
                                {totalItems}
                            </span>
                        )}
                    </div>
                    <span className="text-[10px] font-medium">Cart</span>
                </Link>

                {session ? (
                    <div className="flex flex-col items-center gap-1 p-2 rounded-xl text-[var(--color-neutral-400)]">
                        <button onClick={() => signOut()} className="flex flex-col items-center gap-1">
                            <LogOut className="w-6 h-6" />
                            <span className="text-[10px] font-medium">Logout</span>
                        </button>
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${isActive('/login')}`}
                    >
                        <LogIn className="w-6 h-6" />
                        <span className="text-[10px] font-medium">Login</span>
                    </Link>
                )}
            </div>
        </nav>
    );
}
