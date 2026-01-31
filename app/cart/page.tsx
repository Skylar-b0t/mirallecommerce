'use client';

import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { removeFromCart, updateQuantity, clearCart } from '@/lib/redux/cartSlice';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Package } from 'lucide-react';

export default function CartPage() {
    const dispatch = useAppDispatch();
    const { items, totalItems, totalPrice } = useAppSelector((state) => state.cart);

    const handleUpdateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity > 0) {
            dispatch(updateQuantity({ id, quantity: newQuantity }));
        }
    };

    const handleRemove = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const handleClearCart = () => {
        if (confirm('Are you sure you want to clear your cart?')) {
            dispatch(clearCart());
        }
    };

    const shippingCost = totalPrice >= 10000 ? 0 : 500;
    const taxRate = 0.16; // Kenya VAT
    const taxAmount = totalPrice * taxRate;
    const finalTotal = totalPrice + shippingCost + taxAmount;

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center py-20">
                <div className="text-center max-w-md">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-[var(--color-surface)] border border-white/10 flex items-center justify-center">
                        <ShoppingBag className="w-12 h-12 text-[var(--color-neutral-600)]" />
                    </div>
                    <h2 className="text-3xl font-bold mb-3">Your cart is empty</h2>
                    <p className="text-[var(--color-neutral-400)] mb-8">
                        Discover our premium electronics and start building your perfect setup
                    </p>
                    <Link href="/products" className="btn-primary inline-flex items-center gap-2">
                        Start Shopping
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12">
            <div className="container-premium">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-3">Shopping Cart</h1>
                    <p className="text-lg text-[var(--color-neutral-400)]">
                        {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Clear Cart Button */}
                        <div className="flex justify-end">
                            <button
                                onClick={handleClearCart}
                                className="text-sm text-[var(--color-neutral-400)] hover:text-red-500 transition-colors"
                            >
                                Clear all items
                            </button>
                        </div>

                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="surface-elevated rounded-xl p-6"
                            >
                                <div className="flex gap-6">
                                    {/* Product Image */}
                                    <div className="w-24 h-24 flex-shrink-0 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center p-2">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-contain"
                                            />
                                        ) : (
                                            <span className="text-4xl">📱</span>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-[var(--color-neutral-50)] mb-2 truncate">
                                            {item.name}
                                        </h3>
                                        <p className="text-2xl font-bold text-[var(--color-accent)] mb-4">
                                            Ksh {item.price.toLocaleString()}
                                        </p>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-3 bg-[var(--color-primary-light)] border border-white/10 rounded-lg p-1">
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center font-medium">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                    disabled={item.quantity >= item.stock}
                                                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => handleRemove(item.id)}
                                                className="text-[var(--color-neutral-400)] hover:text-red-500 transition-colors flex items-center gap-2"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                <span className="text-sm">Remove</span>
                                            </button>
                                        </div>

                                        {item.quantity >= item.stock && (
                                            <p className="text-sm text-orange-500 mt-2">
                                                Maximum stock reached
                                            </p>
                                        )}
                                    </div>

                                    {/* Subtotal */}
                                    <div className="text-right hidden sm:block">
                                        <p className="text-sm text-[var(--color-neutral-500)] mb-1">
                                            Subtotal
                                        </p>
                                        <p className="text-xl font-bold text-[var(--color-neutral-50)]">
                                            Ksh {(item.price * item.quantity).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="surface-elevated rounded-xl p-6 sticky top-24 space-y-6">
                            <h2 className="text-xl font-bold">Order Summary</h2>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[var(--color-neutral-400)]">
                                        Subtotal ({totalItems} items)
                                    </span>
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
                                        Ksh {taxAmount.toLocaleString()}
                                    </span>
                                </div>

                                <div className="divider-subtle" />

                                <div className="flex justify-between">
                                    <span className="font-semibold text-[var(--color-neutral-100)]">
                                        Total
                                    </span>
                                    <span className="text-2xl font-bold text-[var(--color-accent)]">
                                        Ksh {finalTotal.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            {/* Free Shipping Progress */}
                            {totalPrice < 10000 && (
                                <div className="bg-[var(--color-primary-light)] border border-white/10 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <Package className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-[var(--color-neutral-200)] mb-1">
                                                Almost there!
                                            </p>
                                            <p className="text-xs text-[var(--color-neutral-400)]">
                                                Add Ksh {(10000 - totalPrice).toLocaleString()} more to get{' '}
                                                <span className="font-semibold text-green-500">free shipping</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <Link
                                    href="/checkout"
                                    className="btn-primary w-full text-center inline-block"
                                >
                                    Proceed to Checkout
                                </Link>
                                <Link
                                    href="/products"
                                    className="btn-secondary w-full text-center inline-block"
                                >
                                    Continue Shopping
                                </Link>
                            </div>

                            {/* Trust Badges */}
                            <div className="pt-4 space-y-2 text-xs text-[var(--color-neutral-500)]">
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Secure checkout</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>30-day returns</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Authorized reseller</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
