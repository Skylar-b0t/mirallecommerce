'use client';

import { useState } from 'react';
import { ShoppingCart, Heart, Star, Truck, RotateCcw, Shield, Package } from 'lucide-react';
import { useAppDispatch } from '@/lib/redux/hooks';
import { addToCart } from '@/lib/redux/cartSlice';

interface Product {
    _id: string;
    name: string;
    brand: string;
    price: number;
    stock: number;
    rating: number;
    numReviews: number;
    images: string[];
}

interface BuyBoxProps {
    product: Product;
}

export default function BuyBox({ product }: BuyBoxProps) {
    const dispatch = useAppDispatch();
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                id: product._id,
                name: product.name,
                price: product.price,
                image: product.images[0] || '',
                quantity,
                stock: product.stock,
            })
        );
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const handleQuantityChange = (delta: number) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1 && newQuantity <= product.stock) {
            setQuantity(newQuantity);
        }
    };

    const renderStars = () => {
        return (
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating)
                            ? 'fill-[var(--color-accent)] text-[var(--color-accent)]'
                            : 'text-[var(--color-neutral-600)]'
                            }`}
                    />
                ))}
                <span className="text-sm text-[var(--color-neutral-400)] ml-2">
                    {product.rating.toFixed(1)} ({product.numReviews} reviews)
                </span>
            </div>
        );
    };

    return (
        <div className="lg:sticky lg:top-24 space-y-6">
            <div className="surface-elevated rounded-2xl p-6 lg:p-8 space-y-6">
                {/* Brand */}
                <div>
                    <span className="text-xs font-bold text-[var(--color-accent)] uppercase tracking-wider">
                        {product.brand}
                    </span>
                </div>

                {/* Product Name */}
                <h1 className="text-3xl lg:text-4xl font-bold text-[var(--color-neutral-50)] leading-tight">
                    {product.name}
                </h1>

                {/* Rating */}
                <div>{renderStars()}</div>

                <div className="divider-subtle" />

                {/* Price */}
                <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-[var(--color-neutral-50)]">
                        Ksh {product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-[var(--color-neutral-500)]">KES</span>
                </div>

                {/* Stock Status */}
                <div>
                    {product.stock > 0 ? (
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-sm font-medium text-green-500">
                                {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
                            </span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <span className="text-sm font-medium text-red-500">Out of Stock</span>
                        </div>
                    )}
                </div>

                <div className="divider-subtle" />

                {/* Quantity Selector */}
                <div>
                    <label className="block text-sm font-medium text-[var(--color-neutral-300)] mb-3">
                        Quantity
                    </label>
                    <div className="flex items-center gap-3 bg-[var(--color-primary-light)] border border-white/10 rounded-lg p-2 w-fit">
                        <button
                            onClick={() => handleQuantityChange(-1)}
                            disabled={quantity <= 1}
                            className="w-10 h-10 flex items-center justify-center rounded hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="Decrease quantity"
                        >
                            <span className="text-xl font-bold">−</span>
                        </button>
                        <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                        <button
                            onClick={() => handleQuantityChange(1)}
                            disabled={quantity >= product.stock}
                            className="w-10 h-10 flex items-center justify-center rounded hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="Increase quantity"
                        >
                            <span className="text-xl font-bold">+</span>
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className="btn-primary w-full text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                    </button>

                    <button
                        disabled={product.stock === 0}
                        className="btn-secondary w-full text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Buy Now
                    </button>

                    <button className="w-full py-3 flex items-center justify-center gap-2 text-[var(--color-neutral-400)] hover:text-[var(--color-accent)] transition-colors">
                        <Heart className="w-5 h-5" />
                        <span className="text-sm font-medium">Add to Wishlist</span>
                    </button>
                </div>

                <div className="divider-subtle" />

                {/* Trust Badges */}
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                        <Truck className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0" />
                        <div>
                            <div className="font-medium text-[var(--color-neutral-200)]">Free Shipping</div>
                            <div className="text-xs text-[var(--color-neutral-500)]">On orders over Ksh 10,000</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                        <RotateCcw className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0" />
                        <div>
                            <div className="font-medium text-[var(--color-neutral-200)]">30-Day Returns</div>
                            <div className="text-xs text-[var(--color-neutral-500)]">Easy return process</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                        <Shield className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0" />
                        <div>
                            <div className="font-medium text-[var(--color-neutral-200)]">1-Year Warranty</div>
                            <div className="text-xs text-[var(--color-neutral-500)]">Manufacturer warranty</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                        <Package className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0" />
                        <div>
                            <div className="font-medium text-[var(--color-neutral-200)]">Secure Packaging</div>
                            <div className="text-xs text-[var(--color-neutral-500)]">Protected delivery</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Info Card */}
            <div className="surface-elevated rounded-xl p-6 bg-[var(--color-primary-light)] border border-white/10">
                <h3 className="text-sm font-semibold text-[var(--color-neutral-200)] mb-3">
                    Why Buy from Mirall?
                </h3>
                <ul className="space-y-2 text-sm text-[var(--color-neutral-400)]">
                    <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Authorized reseller with official warranty</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Expert customer support team</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Fast and secure shipping</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
