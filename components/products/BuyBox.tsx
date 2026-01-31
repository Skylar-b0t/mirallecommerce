'use client';

import { useState } from 'react';
import { ShoppingCart, Star, Truck, RotateCcw, Shield, CheckCircle } from 'lucide-react';
import { useAppDispatch } from '@/lib/redux/hooks';
import { addToCart } from '@/lib/redux/cartSlice';
import PriceDisplay from '@/components/ui/PriceDisplay';

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
                                ? 'fill-amber-500 text-amber-500'
                                : 'text-gray-300'
                            }`}
                    />
                ))}
                <span className="text-sm text-muted ml-2">
                    {product.rating.toFixed(1)} ({product.numReviews} reviews)
                </span>
            </div>
        );
    };

    return (
        <div className="lg:sticky lg:top-24 space-y-6">
            <div className="surface-card p-6 lg:p-8 space-y-6">
                {/* Brand */}
                <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                        {product.brand}
                    </span>
                </div>

                {/* Product Name */}
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                    {product.name}
                </h1>

                {/* Rating */}
                <div>{renderStars()}</div>

                <div className="border-t border-border pt-6" />

                {/* Price */}
                <PriceDisplay price={product.price} className="!text-4xl" />

                {/* Stock Status */}
                <div>
                    {product.stock > 0 ? (
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-success" />
                            <span className="text-sm font-medium text-success">
                                {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
                            </span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-danger" />
                            <span className="text-sm font-medium text-danger">Out of Stock</span>
                        </div>
                    )}
                </div>

                <div className="border-t border-border pt-6" />

                {/* Quantity Selector */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                        Quantity
                    </label>
                    <div className="flex items-center gap-3 bg-surface border border-border rounded-lg p-2 w-fit">
                        <button
                            onClick={() => handleQuantityChange(-1)}
                            disabled={quantity <= 1}
                            className="w-10 h-10 flex items-center justify-center rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px]"
                            aria-label="Decrease quantity"
                        >
                            <span className="text-xl font-bold">−</span>
                        </button>
                        <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                        <button
                            onClick={() => handleQuantityChange(1)}
                            disabled={quantity >= product.stock}
                            className="w-10 h-10 flex items-center justify-center rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[44px]"
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
                        className="btn-accent w-full text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                    </button>

                    <button
                        disabled={product.stock === 0}
                        className="btn-primary w-full text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Buy Now
                    </button>
                </div>

                <div className="border-t border-border pt-6" />

                {/* Trust Signals - Kenyan Market */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground mb-3">
                        Why Buy from Mirall?
                    </h3>

                    <div className="space-y-3">
                        <div className="flex items-start gap-3 text-sm">
                            <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                            <div>
                                <div className="font-medium text-foreground">Genuine Products</div>
                                <div className="text-xs text-muted">Authorized reseller</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 text-sm">
                            <Shield className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                            <div>
                                <div className="font-medium text-foreground">1 Year Warranty</div>
                                <div className="text-xs text-muted">Manufacturer warranty</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 text-sm">
                            <Truck className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                            <div>
                                <div className="font-medium text-foreground">Fast Delivery in Kenya</div>
                                <div className="text-xs text-muted">Free shipping over KSh 10,000</div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 text-sm">
                            <RotateCcw className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                            <div>
                                <div className="font-medium text-foreground">30-Day Returns</div>
                                <div className="text-xs text-muted">Easy return process</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Mobile CTA */}
            <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-background border-t border-border p-4 z-40">
                <div className="flex gap-3">
                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className="btn-accent flex-1 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ShoppingCart className="w-5 h-5 inline mr-2" />
                        {addedToCart ? 'Added!' : 'Add to Cart'}
                    </button>
                    <button
                        disabled={product.stock === 0}
                        className="btn-primary flex-1 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
}
