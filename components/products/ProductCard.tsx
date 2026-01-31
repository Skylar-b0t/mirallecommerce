'use client';

import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import { useAppDispatch } from '@/lib/redux/hooks';
import { addToCart } from '@/lib/redux/cartSlice';
import Image from 'next/image';
import PriceDisplay from '@/components/ui/PriceDisplay';
import TrustBadge from '@/components/ui/TrustBadge';

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
        e.stopPropagation();
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

    const discount = product.stock < 5 ? 10 : 0; // Simulated discount logic
    const originalPrice = discount > 0 ? Math.round(product.price * 1.1) : undefined;

    return (
        <div className="surface-card overflow-hidden hover:shadow-md transition-shadow duration-200">
            {/* Image Container */}
            <Link href={`/products/${product._id}`} className="block relative aspect-[4/5] bg-gray-50 overflow-hidden">
                {/* Stock Badge */}
                {product.stock <= 5 && product.stock > 0 && (
                    <div className="absolute top-3 left-3 z-10">
                        <span className="badge badge-warning text-xs">
                            Low Stock
                        </span>
                    </div>
                )}

                {product.images?.[0] ? (
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-contain p-6"
                        priority={priority}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-4xl">📱</div>
                )}
            </Link>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">{product.brand}</p>
                    <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-xs font-medium text-muted">{product.rating}</span>
                    </div>
                </div>

                <Link href={`/products/${product._id}`}>
                    <h3 className="font-semibold text-foreground line-clamp-2 mb-2 min-h-[2.5rem]">{product.name}</h3>
                </Link>

                <PriceDisplay
                    price={product.price}
                    originalPrice={originalPrice}
                    className="mb-3"
                />

                {/* Trust Signals */}
                <div className="flex flex-wrap gap-2 mb-3 text-xs">
                    <TrustBadge icon="check" text="Genuine" />
                    <TrustBadge icon="shield" text="1 Yr Warranty" />
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 min-h-[44px] ${product.stock > 0
                            ? 'bg-accent text-accent-foreground hover:opacity-90 active:scale-[0.98]'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    {product.stock > 0 ? (
                        <>
                            <ShoppingCart className="w-4 h-4" /> Add to Cart
                        </>
                    ) : (
                        'Out of Stock'
                    )}
                </button>
            </div>
        </div>
    );
}
