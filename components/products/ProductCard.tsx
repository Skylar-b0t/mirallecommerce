'use client';

import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import { useAppDispatch } from '@/lib/redux/hooks';
import { addToCart } from '@/lib/redux/cartSlice';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    images: string[];
    stock: number;
    rating: number;
    numReviews: number;
}

interface ProductCardProps {
    product: Product;
    priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
    const dispatch = useAppDispatch();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        if (product.stock > 0) {
            dispatch(
                addToCart({
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0] || '',
                    quantity: 1,
                    stock: product.stock,
                })
            );
        }
    };

    // Render star rating
    const renderStars = () => {
        return (
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < Math.floor(product.rating)
                            ? 'fill-[var(--color-accent)] text-[var(--color-accent)]'
                            : 'text-[var(--color-neutral-600)]'
                            }`}
                    />
                ))}
                <span className="text-xs text-[var(--color-neutral-500)] ml-1">
                    ({product.numReviews})
                </span>
            </div>
        );
    };

    return (
        <Link
            href={`/products/${product._id}`}
            className="surface-elevated-hover rounded-2xl p-5 group block"
        >
            {/* Product Image */}
            <div className="relative aspect-square bg-[var(--color-primary-light)] rounded-xl mb-4 overflow-hidden">
                {product.images && product.images.length > 0 ? (
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-6xl text-[var(--color-neutral-600)]">
                        📱
                    </div>
                )}

                {/* Stock Badge */}
                {product.stock <= 5 && product.stock > 0 && (
                    <div className="absolute top-3 left-3">
                        <span className="badge badge-warning text-xs">
                            Only {product.stock} left
                        </span>
                    </div>
                )}

                {product.stock === 0 && (
                    <div className="absolute inset-0 bg-[var(--color-surface)]/90 backdrop-blur-sm flex items-center justify-center">
                        <span className="badge badge-neutral">Out of Stock</span>
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="space-y-3">
                {/* Brand */}
                <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[var(--color-accent)] uppercase tracking-wide">
                        {product.brand}
                    </span>
                    {renderStars()}
                </div>

                {/* Name */}
                <h3 className="text-base font-semibold text-[var(--color-neutral-50)] line-clamp-2 leading-snug group-hover:text-[var(--color-accent)] transition-colors">
                    {product.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-[var(--color-neutral-400)] line-clamp-2 leading-relaxed">
                    {product.description}
                </p>

                {/* Price & Action */}
                <div className="flex items-center justify-between pt-2">
                    <div>
                        <div className="text-2xl font-bold text-[var(--color-neutral-50)]">
                            Ksh {product.price.toLocaleString()}
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className="w-10 h-10 rounded-lg bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] disabled:bg-[var(--color-neutral-700)] disabled:cursor-not-allowed flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                        aria-label="Add to cart"
                    >
                        <ShoppingCart className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
        </Link>
    );
}
