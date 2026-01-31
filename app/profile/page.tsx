'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, Save, Loader2, Package, Shield, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function ProfilePage() {
    const { data: session, status, update } = useSession();
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
        if (session?.user) {
            setName(session.user.name || '');
            setEmail(session.user.email || '');
        }
    }, [session, status, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        if (password && password !== confirmPassword) {
            setMessage({ text: 'Passwords do not match', type: 'error' });
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/auth/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    // Only send password if user wants to change it
                    ...(password ? { password } : {})
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to update profile');
            }

            // Update session data
            await update({
                ...session,
                user: {
                    ...session?.user,
                    name: data.user.name
                }
            });

            setMessage({ text: 'Profile updated successfully', type: 'success' });
            setPassword('');
            setConfirmPassword('');
        } catch (error: any) {
            setMessage({ text: error.message, type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--color-accent)]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen py-24">
            <div className="container-premium max-w-4xl">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold">My Profile</h1>
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="btn-secondary flex items-center gap-2 text-red-400 hover:text-red-300 border-red-500/20 hover:border-red-500/40"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Sidebar / Quick Stats */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="surface-elevated rounded-2xl p-6 border border-white/10 text-center">
                            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)] text-3xl font-bold">
                                {session?.user?.name ? session.user.name[0].toUpperCase() : <User className="w-10 h-10" />}
                            </div>
                            <h2 className="text-xl font-bold text-[var(--color-neutral-100)]">{session?.user?.name}</h2>
                            <p className="text-sm text-[var(--color-neutral-400)]">{session?.user?.email}</p>

                            <div className="mt-6 pt-6 border-t border-white/10">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-medium">
                                    <Shield className="w-3 h-3" />
                                    {(session?.user as any)?.role === 'admin' ? 'Administrator' : 'Customer'}
                                </div>
                            </div>
                        </div>

                        <Link href="/orders" className="block surface-elevated rounded-2xl p-6 border border-white/10 hover:border-[var(--color-accent)]/50 transition-all group">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 rounded-lg bg-[var(--color-primary-light)] text-[var(--color-accent)]">
                                        <Package className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[var(--color-neutral-200)] group-hover:text-[var(--color-accent)] transition-colors">My Orders</h3>
                                        <p className="text-xs text-[var(--color-neutral-500)]">View purchase history</p>
                                    </div>
                                </div>
                                <div className="text-[var(--color-neutral-500)] group-hover:translate-x-1 transition-transform">
                                    →
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Main Content - Edit Form */}
                    <div className="lg:col-span-2">
                        <div className="surface-elevated rounded-2xl p-6 lg:p-8 border border-white/10">
                            <h2 className="text-xl font-bold mb-6">Account Details</h2>

                            {message.text && (
                                <div className={`p-4 rounded-lg mb-6 flex items-start gap-3 text-sm ${message.type === 'error'
                                    ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                                    : 'bg-green-500/10 text-green-400 border border-green-500/20'
                                    }`}>
                                    {message.text}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-[var(--color-neutral-400)] uppercase tracking-wider">Personal Information</h3>

                                    <div>
                                        <label className="block text-sm font-medium text-[var(--color-neutral-300)] mb-2">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-500)]" />
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-[var(--color-primary-light)] border border-white/10 rounded-lg text-[var(--color-neutral-100)] placeholder:text-[var(--color-neutral-500)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[var(--color-neutral-300)] mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative opacity-75 cursor-not-allowed">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-500)]" />
                                            <input
                                                type="email"
                                                value={email}
                                                disabled
                                                className="w-full pl-10 pr-4 py-3 bg-[var(--color-primary-light)] border border-white/10 rounded-lg text-[var(--color-neutral-400)] cursor-not-allowed"
                                            />
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--color-neutral-500)]">
                                                Cannot be changed
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="divider-subtle" />

                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold text-[var(--color-neutral-400)] uppercase tracking-wider">Security</h3>

                                    <div>
                                        <label className="block text-sm font-medium text-[var(--color-neutral-300)] mb-2">
                                            New Password <span className="text-[var(--color-neutral-500)] font-normal">(Leave blank to keep current)</span>
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-500)]" />
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-[var(--color-primary-light)] border border-white/10 rounded-lg text-[var(--color-neutral-100)] placeholder:text-[var(--color-neutral-500)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>

                                    {password && (
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--color-neutral-300)] mb-2">
                                                Confirm New Password
                                            </label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-500)]" />
                                                <input
                                                    type="password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className="w-full pl-10 pr-4 py-3 bg-[var(--color-primary-light)] border border-white/10 rounded-lg text-[var(--color-neutral-100)] placeholder:text-[var(--color-neutral-500)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
                                                    placeholder="••••••••"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn-primary w-full sm:w-auto px-8 py-3 flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Saving Changes...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-5 h-5" />
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
