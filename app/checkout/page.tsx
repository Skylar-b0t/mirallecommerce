'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { clearCart } from '@/lib/redux/cartSlice';
import {
    ArrowLeft,
    CreditCard,
    Smartphone,
    Banknote,
    CheckCircle,
    MapPin,
    User,
    Mail,
    Phone,
    Building,
    Package
} from 'lucide-react';

type PaymentMethod = 'mpesa' | 'card' | 'cod';

interface ShippingForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    notes: string;
}

export default function CheckoutPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { items, totalItems, totalPrice } = useAppSelector((state) => state.cart);

    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mpesa');
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [formData, setFormData] = useState<ShippingForm>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: 'Nairobi',
        postalCode: '',
        notes: '',
    });

    const shippingCost = totalPrice >= 10000 ? 0 : 500;
    const taxRate = 0.16;
    const taxAmount = totalPrice * taxRate;
    const finalTotal = totalPrice + shippingCost + taxAmount;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate order processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsProcessing(false);
        setOrderPlaced(true);
        dispatch(clearCart());
    };

    // Redirect to cart if empty and no order placed
    if (items.length === 0 && !orderPlaced) {
        return (
            <div className="min-h-screen flex items-center justify-center py-20">
                <div className="text-center max-w-md">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-[var(--color-surface)] border border-white/10 flex items-center justify-center">
                        <Package className="w-12 h-12 text-[var(--color-neutral-600)]" />
                    </div>
                    <h2 className="text-3xl font-bold mb-3">Your cart is empty</h2>
                    <p className="text-[var(--color-neutral-400)] mb-8">
                        Add some items to your cart before checking out
                    </p>
                    <Link href="/products" className="btn-primary inline-flex items-center gap-2">
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    // Order confirmation
    if (orderPlaced) {
        return (
            <div className="min-h-screen flex items-center justify-center py-20">
                <div className="text-center max-w-lg">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                    <h2 className="text-4xl font-bold mb-3 text-[var(--color-neutral-50)]">Order Confirmed!</h2>
                    <p className="text-lg text-[var(--color-neutral-400)] mb-2">
                        Thank you for shopping with Mirall Technology
                    </p>
                    <p className="text-sm text-[var(--color-neutral-500)] mb-8">
                        Order confirmation has been sent to {formData.email}
                    </p>
                    <div className="surface-elevated rounded-xl p-6 mb-8 text-left">
                        <h3 className="font-semibold text-[var(--color-neutral-200)] mb-4">Order Details</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-[var(--color-neutral-400)]">Order ID</span>
                                <span className="font-mono text-[var(--color-accent)]">MT-{Date.now().toString(36).toUpperCase()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[var(--color-neutral-400)]">Payment Method</span>
                                <span className="text-[var(--color-neutral-200)]">
                                    {paymentMethod === 'mpesa' ? 'M-Pesa' : paymentMethod === 'card' ? 'Card' : 'Cash on Delivery'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[var(--color-neutral-400)]">Delivery Address</span>
                                <span className="text-[var(--color-neutral-200)]">{formData.city}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <Link href="/products" className="btn-secondary">
                            Continue Shopping
                        </Link>
                        <Link href="/" className="btn-primary">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12">
            <div className="container-premium">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/cart"
                        className="inline-flex items-center gap-2 text-sm text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-200)] transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Cart
                    </Link>
                    <h1 className="text-4xl lg:text-5xl font-bold">Checkout</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column - Forms */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Shipping Information */}
                            <div className="surface-elevated rounded-2xl p-6 lg:p-8">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-[var(--color-accent)]" />
                                    Shipping Information
                                </h2>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--color-neutral-300)] mb-2">
                                            First Name *
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-500)]" />
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-[var(--color-primary-light)] border border-white/10 rounded-lg text-[var(--color-neutral-100)] placeholder:text-[var(--color-neutral-500)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
                                                placeholder="John"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[var(--color-neutral-300)] mb-2">
                                            Last Name *
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-500)]" />
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-[var(--color-primary-light)] border border-white/10 rounded-lg text-[var(--color-neutral-100)] placeholder:text-[var(--color-neutral-500)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
                                                placeholder="Doe"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[var(--color-neutral-300)] mb-2">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-500)]" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-[var(--color-primary-light)] border border-white/10 rounded-lg text-[var(--color-neutral-100)] placeholder:text-[var(--color-neutral-500)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[var(--color-neutral-300)] mb-2">
                                            Phone Number *
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-500)]" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-[var(--color-primary-light)] border border-white/10 rounded-lg text-[var(--color-neutral-100)] placeholder:text-[var(--color-neutral-500)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
                                                placeholder="0712 345 678"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-[var(--color-neutral-300)] mb-2">
                                            Street Address *
                                        </label>
                                        <div className="relative">
                                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-neutral-500)]" />
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 bg-[var(--color-primary-light)] border border-white/10 rounded-lg text-[var(--color-neutral-100)] placeholder:text-[var(--color-neutral-500)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
                                                placeholder="123 Kenyatta Avenue, Westlands"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[var(--color-neutral-300)] mb-2">
                                            City *
                                        </label>
                                        <select
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-[var(--color-primary-light)] border border-white/10 rounded-lg text-[var(--color-neutral-100)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
                                        >
                                            <option value="Nairobi">Nairobi</option>
                                            <option value="Mombasa">Mombasa</option>
                                            <option value="Kisumu">Kisumu</option>
                                            <option value="Nakuru">Nakuru</option>
                                            <option value="Eldoret">Eldoret</option>
                                            <option value="Thika">Thika</option>
                                            <option value="Malindi">Malindi</option>
                                            <option value="Nyeri">Nyeri</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[var(--color-neutral-300)] mb-2">
                                            Postal Code
                                        </label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 bg-[var(--color-primary-light)] border border-white/10 rounded-lg text-[var(--color-neutral-100)] placeholder:text-[var(--color-neutral-500)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
                                            placeholder="00100"
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-[var(--color-neutral-300)] mb-2">
                                            Delivery Notes (Optional)
                                        </label>
                                        <textarea
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className="w-full px-4 py-3 bg-[var(--color-primary-light)] border border-white/10 rounded-lg text-[var(--color-neutral-100)] placeholder:text-[var(--color-neutral-500)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all resize-none"
                                            placeholder="Any special delivery instructions..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="surface-elevated rounded-2xl p-6 lg:p-8">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <CreditCard className="w-5 h-5 text-[var(--color-accent)]" />
                                    Payment Method
                                </h2>

                                <div className="grid sm:grid-cols-3 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('mpesa')}
                                        className={`p-4 rounded-xl border-2 transition-all text-left ${paymentMethod === 'mpesa'
                                                ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10'
                                                : 'border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <Smartphone className={`w-8 h-8 mb-3 ${paymentMethod === 'mpesa' ? 'text-[var(--color-accent)]' : 'text-[var(--color-neutral-400)]'}`} />
                                        <div className="font-semibold text-[var(--color-neutral-100)]">M-Pesa</div>
                                        <div className="text-xs text-[var(--color-neutral-500)]">Pay via mobile money</div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('card')}
                                        className={`p-4 rounded-xl border-2 transition-all text-left ${paymentMethod === 'card'
                                                ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10'
                                                : 'border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <CreditCard className={`w-8 h-8 mb-3 ${paymentMethod === 'card' ? 'text-[var(--color-accent)]' : 'text-[var(--color-neutral-400)]'}`} />
                                        <div className="font-semibold text-[var(--color-neutral-100)]">Card</div>
                                        <div className="text-xs text-[var(--color-neutral-500)]">Visa, Mastercard</div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('cod')}
                                        className={`p-4 rounded-xl border-2 transition-all text-left ${paymentMethod === 'cod'
                                                ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10'
                                                : 'border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <Banknote className={`w-8 h-8 mb-3 ${paymentMethod === 'cod' ? 'text-[var(--color-accent)]' : 'text-[var(--color-neutral-400)]'}`} />
                                        <div className="font-semibold text-[var(--color-neutral-100)]">Cash on Delivery</div>
                                        <div className="text-xs text-[var(--color-neutral-500)]">Pay when delivered</div>
                                    </button>
                                </div>

                                {paymentMethod === 'mpesa' && (
                                    <div className="mt-6 p-4 bg-[var(--color-primary-light)] rounded-lg border border-white/10">
                                        <p className="text-sm text-[var(--color-neutral-400)]">
                                            You will receive an M-Pesa prompt on <strong className="text-[var(--color-neutral-200)]">{formData.phone || 'your phone'}</strong> to complete the payment.
                                        </p>
                                    </div>
                                )}

                                {paymentMethod === 'card' && (
                                    <div className="mt-6 p-4 bg-[var(--color-primary-light)] rounded-lg border border-white/10">
                                        <p className="text-sm text-[var(--color-neutral-400)]">
                                            You will be redirected to a secure payment gateway to complete your transaction.
                                        </p>
                                    </div>
                                )}

                                {paymentMethod === 'cod' && (
                                    <div className="mt-6 p-4 bg-[var(--color-primary-light)] rounded-lg border border-white/10">
                                        <p className="text-sm text-[var(--color-neutral-400)]">
                                            Pay with cash when your order is delivered. Additional Ksh 100 handling fee applies.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="surface-elevated rounded-2xl p-6 lg:p-8 sticky top-24 space-y-6">
                                <h2 className="text-xl font-bold">Order Summary</h2>

                                {/* Cart Items */}
                                <div className="space-y-4 max-h-64 overflow-y-auto">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="w-16 h-16 flex-shrink-0 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center p-1">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                                ) : (
                                                    <span className="text-2xl">📱</span>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-sm text-[var(--color-neutral-200)] truncate">
                                                    {item.name}
                                                </h4>
                                                <p className="text-xs text-[var(--color-neutral-500)]">
                                                    Qty: {item.quantity}
                                                </p>
                                                <p className="text-sm font-semibold text-[var(--color-accent)]">
                                                    Ksh {(item.price * item.quantity).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="divider-subtle" />

                                {/* Price Breakdown */}
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[var(--color-neutral-400)]">Subtotal ({totalItems} items)</span>
                                        <span className="font-medium text-[var(--color-neutral-100)]">
                                            Ksh {totalPrice.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-[var(--color-neutral-400)]">Shipping</span>
                                        <span className="font-medium text-[var(--color-neutral-100)]">
                                            {shippingCost === 0 ? (
                                                <span className="text-green-500">FREE</span>
                                            ) : (
                                                `Ksh ${shippingCost.toLocaleString()}`
                                            )}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-[var(--color-neutral-400)]">VAT (16%)</span>
                                        <span className="font-medium text-[var(--color-neutral-100)]">
                                            Ksh {Math.round(taxAmount).toLocaleString()}
                                        </span>
                                    </div>

                                    {paymentMethod === 'cod' && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-[var(--color-neutral-400)]">COD Fee</span>
                                            <span className="font-medium text-[var(--color-neutral-100)]">
                                                Ksh 100
                                            </span>
                                        </div>
                                    )}

                                    <div className="divider-subtle" />

                                    <div className="flex justify-between">
                                        <span className="font-semibold text-[var(--color-neutral-100)]">Total</span>
                                        <span className="text-2xl font-bold text-[var(--color-accent)]">
                                            Ksh {Math.round(finalTotal + (paymentMethod === 'cod' ? 100 : 0)).toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Place Order Button */}
                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className="btn-primary w-full py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isProcessing ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-5 h-5" />
                                            Place Order
                                        </>
                                    )}
                                </button>

                                {/* Security Badge */}
                                <div className="text-center text-xs text-[var(--color-neutral-500)]">
                                    <span className="inline-flex items-center gap-1">
                                        🔒 Secure checkout powered by Mirall Technology
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
