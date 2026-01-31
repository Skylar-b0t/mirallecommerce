'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, Clock, CheckCircle, XCircle, ArrowRight, Loader2, ShoppingBag } from 'lucide-react';

interface OrderItem {
    name: string;
    image: string;
    price: number;
    quantity: number;
}

interface Order {
    _id: string;
    createdAt: string;
    totalPrice: number;
    status: string;
    isPaid: boolean;
    items: OrderItem[];
}

export default function OrdersPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
            return;
        }

        if (status === 'authenticated') {
            fetchOrders();
        }
    }, [status, router]);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/orders');
            const data = await res.json();
            if (data.success) {
                setOrders(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch orders', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading || status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--color-accent)]" />
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-screen py-24 container-premium text-center">
                <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-[var(--color-surface)] border border-white/10 flex items-center justify-center">
                        <ShoppingBag className="w-12 h-12 text-[var(--color-neutral-600)]" />
                    </div>
                    <h2 className="text-3xl font-bold mb-3">No orders yet</h2>
                    <p className="text-[var(--color-neutral-400)] mb-8">
                        Looks like you haven't bought anything yet. Explore our products and find something cool!
                    </p>
                    <Link href="/products" className="btn-primary inline-flex items-center gap-2">
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-24">
            <div className="container-premium max-w-4xl">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold">Your Orders</h1>
                    <span className="text-[var(--color-neutral-400)]">{orders.length} orders</span>
                </div>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="surface-elevated rounded-2xl border border-white/10 overflow-hidden">
                            {/* Order Header */}
                            <div className="p-6 border-b border-white/5 bg-white/5 flex flex-wrap gap-4 justify-between items-center">
                                <div className="space-y-1">
                                    <div className="text-sm text-[var(--color-neutral-400)]">Order ID</div>
                                    <div className="font-mono text-[var(--color-accent)]">#{order._id.slice(-6).toUpperCase()}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm text-[var(--color-neutral-400)]">Date Placed</div>
                                    <div className="font-medium text-[var(--color-neutral-200)]">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm text-[var(--color-neutral-400)]">Total Amount</div>
                                    <div className="font-bold text-[var(--color-neutral-50)]">
                                        Ksh {order.totalPrice.toLocaleString()}
                                    </div>
                                </div>
                                <div>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${order.status === 'delivered' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                            order.status === 'shipped' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                order.status === 'cancelled' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                    'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                        }`}>
                                        {order.status === 'delivered' && <CheckCircle className="w-3.5 h-3.5" />}
                                        {order.status === 'shipped' && <Package className="w-3.5 h-3.5" />}
                                        {order.status === 'cancelled' && <XCircle className="w-3.5 h-3.5" />}
                                        {order.status === 'pending' && <Clock className="w-3.5 h-3.5" />}
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="p-6">
                                <div className="flex flex-col gap-4">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex gap-4 items-center">
                                            <div className="w-16 h-16 flex-shrink-0 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center p-1 border border-white/5">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                                ) : (
                                                    <span className="text-xl">📱</span>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-[var(--color-neutral-200)] truncate">
                                                    {item.name}
                                                </h4>
                                                <div className="text-sm text-[var(--color-neutral-500)] mt-1">
                                                    Qty: {item.quantity} × Ksh {item.price.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Actions (Future) */}
                            {/* <div className="px-6 py-4 bg-white/5 border-t border-white/5 text-right">
                                <Link href={`/orders/${order._id}`} className="text-sm text-[var(--color-accent)] hover:underline">
                                    View Details
                                </Link>
                            </div> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
