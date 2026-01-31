'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Eye, Filter } from 'lucide-react';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, paid, delivered
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('/api/orders');
                const data = await res.json();
                if (data.success) {
                    setOrders(data.data);
                }
            } catch (error) {
                console.error('Failed to load orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());

        let matchesFilter = true;
        if (filter === 'pending') matchesFilter = !order.isPaid;
        if (filter === 'paid') matchesFilter = order.isPaid && !order.isDelivered;
        if (filter === 'delivered') matchesFilter = order.isDelivered;

        return matchesSearch && matchesFilter;
    });

    if (loading) return <div className="p-8 text-white">Loading orders...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Orders</h1>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-neutral-400)]" />
                    <input
                        type="text"
                        placeholder="Search by ID, Name, or Email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-[var(--color-primary-light)] border border-white/10 rounded-xl text-[var(--color-neutral-100)] placeholder:text-[var(--color-neutral-500)] focus:outline-[var(--color-accent)]"
                    />
                </div>

                <div className="flex gap-2 bg-[var(--color-primary-light)] p-1 rounded-xl border border-white/10 w-fit">
                    {['all', 'pending', 'paid', 'delivered'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === f
                                    ? 'bg-[var(--color-accent)] text-[var(--color-primary)]'
                                    : 'text-[var(--color-neutral-400)] hover:text-white'
                                }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="surface-elevated rounded-2xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-[var(--color-neutral-300)]">
                        <thead className="bg-white/5 text-[var(--color-neutral-400)] font-medium">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Payment</th>
                                <th className="px-6 py-4">Delivery</th>
                                <th className="px-6 py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-mono text-[var(--color-neutral-100)]">
                                        #{order._id.slice(-6).toUpperCase()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-white font-medium">{order.user?.name || 'Guest'}</span>
                                            <span className="text-xs text-[var(--color-neutral-500)]">{order.user?.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-[var(--color-neutral-400)]">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-white font-medium">
                                        Ksh {order.totalPrice.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.isPaid
                                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                            }`}>
                                            {order.isPaid ? 'Paid' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.isDelivered
                                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                : 'bg-[var(--color-primary-light)] text-[var(--color-neutral-400)] border border-white/5'
                                            }`}>
                                            {order.isDelivered ? 'Delivered' : 'Processing'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link
                                            href={`/admin/orders/${order._id}`}
                                            className="p-2 hover:bg-white/10 rounded-lg text-[var(--color-accent)] transition-colors inline-block"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredOrders.length === 0 && (
                    <div className="p-12 text-center text-[var(--color-neutral-400)]">
                        No orders found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
}
