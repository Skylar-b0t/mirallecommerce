'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Truck, CreditCard, CheckCircle, Package, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminOrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [unwrappedParams, setUnwrappedParams] = useState<{ id: string } | null>(null);

    useEffect(() => {
        const unwrap = async () => {
            try {
                const resolvedParams = await params;
                setUnwrappedParams(resolvedParams);
            } catch (error) {
                console.error('Failed to unwrap params:', error);
            }
        };
        unwrap();
    }, [params]);

    useEffect(() => {
        if (!unwrappedParams) return;
        const fetchOrder = async () => {
            try {
                const res = await fetch(`/api/orders/${unwrappedParams.id}`);
                const data = await res.json();
                if (data.success) {
                    setOrder(data.data);
                } else {
                    alert('Order not found');
                    router.push('/admin/orders');
                }
            } catch (error) {
                console.error('Failed to load order');
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [unwrappedParams, router]);

    const updateStatus = async (updates: any) => {
        if (!confirm('Are you sure you want to update the order status?')) return;

        setUpdating(true);
        try {
            const res = await fetch(`/api/orders/${unwrappedParams?.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });
            const data = await res.json();
            if (data.success) {
                setOrder(data.data);
            } else {
                alert('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating:', error);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div className="p-8 text-white">Loading order...</div>;
    if (!order) return null;

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <Link
                    href="/admin/orders"
                    className="p-2 hover:bg-white/10 rounded-lg text-[var(--color-neutral-400)] transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        Order #{order._id.slice(-6).toUpperCase()}
                        <span className={`text-sm px-3 py-1 rounded-full border ${order.isDelivered
                                ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            }`}>
                            {order.isDelivered ? 'Delivered' : 'Processing'}
                        </span>
                    </h1>
                    <p className="text-[var(--color-neutral-400)] text-sm flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3" />
                        Placed on {new Date(order.createdAt).toLocaleString()}
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Items */}
                    <div className="surface-elevated rounded-2xl border border-white/10 overflow-hidden">
                        <div className="p-4 border-b border-white/10 font-bold text-white flex items-center gap-2">
                            <Package className="w-5 h-5 text-[var(--color-accent)]" />
                            Order Items
                        </div>
                        <div className="divide-y divide-white/5">
                            {order.items.map((item: any) => (
                                <div key={item._id} className="p-4 flex gap-4 items-center">
                                    <div className="relative w-16 h-16 rounded-lg bg-[var(--color-primary-light)] overflow-hidden flex-shrink-0">
                                        {item.image && (
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-white">{item.name}</h3>
                                        <p className="text-sm text-[var(--color-neutral-400)]">
                                            Qty: {item.quantity} x Ksh {item.price.toLocaleString()}
                                        </p>
                                    </div>
                                    <p className="font-bold text-white">
                                        Ksh {(item.price * item.quantity).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="surface-elevated rounded-2xl border border-white/10 p-6">
                        <div className="flex items-center gap-2 mb-4 font-bold text-white border-b border-white/5 pb-2">
                            <MapPin className="w-5 h-5 text-[var(--color-accent)]" />
                            Shipping Details
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-[var(--color-neutral-400)]">Recipient</p>
                                <p className="text-white font-medium">{order.user?.name || 'Guest User'}</p>
                                <p className="text-[var(--color-neutral-300)]">{order.user?.email}</p>
                            </div>
                            <div>
                                <p className="text-[var(--color-neutral-400)]">Address</p>
                                <p className="text-white">{order.shippingAddress.street}</p>
                                <p className="text-white">{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
                                <p className="text-white">{order.shippingAddress.country}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Actions */}
                <div className="space-y-6">
                    {/* Status Actions */}
                    <div className="surface-elevated rounded-2xl border border-white/10 p-6 space-y-4">
                        <h3 className="font-bold text-white">Order Actions</h3>

                        {!order.isPaid && (
                            <button
                                onClick={() => updateStatus({ isPaid: true })}
                                disabled={updating}
                                className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl transition-colors font-medium disabled:opacity-50"
                            >
                                <CreditCard className="w-4 h-4" />
                                Mark as Paid
                            </button>
                        )}

                        {!order.isDelivered && (
                            <button
                                onClick={() => updateStatus({ isDelivered: true })}
                                disabled={updating}
                                className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--color-accent)] hover:opacity-90 text-[var(--color-primary)] rounded-xl transition-colors font-bold disabled:opacity-50"
                            >
                                <Truck className="w-4 h-4" />
                                Mark as Delivered
                            </button>
                        )}

                        {order.isPaid && order.isDelivered && (
                            <div className="text-center py-2 text-green-400 font-medium flex items-center justify-center gap-2">
                                <CheckCircle className="w-5 h-5" /> Order Completed
                            </div>
                        )}
                    </div>

                    {/* Summary */}
                    <div className="surface-elevated rounded-2xl border border-white/10 p-6 space-y-3">
                        <h3 className="font-bold text-white border-b border-white/5 pb-2">Order Summary</h3>
                        <div className="flex justify-between text-sm text-[var(--color-neutral-300)]">
                            <span>Subtotal</span>
                            <span>Ksh {order.itemsPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-[var(--color-neutral-300)]">
                            <span>Shipping</span>
                            <span>Ksh {order.shippingPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-[var(--color-neutral-300)]">
                            <span>Tax</span>
                            <span>Ksh {order.taxPrice.toLocaleString()}</span>
                        </div>
                        <div className="pt-3 border-t border-white/5 flex justify-between font-bold text-white text-lg">
                            <span>Total</span>
                            <span>Ksh {order.totalPrice.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
