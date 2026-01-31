'use client';

import { useEffect, useState } from 'react';
import { DollarSign, Package, ShoppingBag, Users, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/admin/stats');
                const data = await res.json();
                if (data.success) {
                    setStats(data.data);
                }
            } catch (error) {
                console.error('Failed to load stats');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div className="text-white">Loading stats...</div>;
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Revenue"
                    value={`Ksh ${stats?.totalRevenue.toLocaleString()}`}
                    icon={DollarSign}
                    trend="+12.5%"
                />
                <StatCard
                    title="Total Orders"
                    value={stats?.totalOrders}
                    icon={ShoppingBag}
                    trend="+8.2%"
                />
                <StatCard
                    title="Products"
                    value={stats?.totalProducts}
                    icon={Package}
                    trend="+2"
                />
                <StatCard
                    title="Customers"
                    value={stats?.totalUsers}
                    icon={Users}
                    trend="+15%"
                />
            </div>

            {/* Recent Orders */}
            <div className="surface-elevated rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Recent Orders</h2>
                    <Link href="/admin/orders" className="text-sm text-[var(--color-accent)] hover:underline">
                        View All
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-[var(--color-neutral-300)]">
                        <thead className="bg-white/5 text-[var(--color-neutral-400)] font-medium">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {stats?.recentOrders.map((order: any) => (
                                <tr key={order._id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-mono text-[var(--color-neutral-100)]">
                                        #{order._id.slice(-6).toUpperCase()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {order.user?.name || 'Guest'}
                                    </td>
                                    <td className="px-6 py-4">
                                        Ksh {order.totalPrice.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${order.isPaid ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                                            }`}>
                                            {order.isPaid ? 'Paid' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-[var(--color-neutral-500)]">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, trend }: any) {
    return (
        <div className="surface-elevated p-6 rounded-2xl border border-white/10">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-[var(--color-primary-light)] rounded-xl border border-white/5">
                    <Icon className="w-6 h-6 text-[var(--color-accent)]" />
                </div>
                <span className="flex items-center text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                    {trend} <ArrowUpRight className="w-3 h-3 ml-1" />
                </span>
            </div>
            <h3 className="text-[var(--color-neutral-400)] text-sm mb-1">{title}</h3>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    );
}
