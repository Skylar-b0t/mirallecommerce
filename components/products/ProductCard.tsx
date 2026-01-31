'use client';

import Link from 'next/link';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { useAppDispatch } from '@/lib/redux/hooks';
import { addToCart } from '@/lib/redux/cartSlice';
import Image from 'next/image';

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

    const discount = product.stock < 5 ? 10 : 0; // Simulated discount logic for demo

    return (
        <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden hover:shadow-soft-lg hover:border-primary/20 transition-all duration-300 hover:translate-y-[-4px]">
            {/* Image Container */}
            <Link href={`/products/${product._id}`} className="block relative aspect-[4/5] bg-gray-50 dark:bg-white/5 overflow-hidden">
                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                    {product.stock <= 5 && product.stock > 0 && (
                        <span className="badge badge-warning text-xs shadow-sm bg-amber-100 text-amber-700 border-none">
                            Low Stock
                        </span>
                    )}
                    {discount > 0 && (
                        <span className="badge bg-red-500 text-white border-none text-xs shadow-sm">
                            -10%
                        </span>
                    )}
                </div>

                {product.images?.[0] ? (
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                        priority={priority}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-4xl">📱</div>
                )}

                {/* Overlay Action */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className="w-full btn-primary py-3 flex items-center justify-center gap-2 shadow-xl"
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
            </Link>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">{product.brand}</p>
                    <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">{product.rating}</span>
                    </div>
                </div>

                <Link href={`/products/${product._id}`} className="block group-hover:text-primary transition-colors">
                    <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
                </Link>

                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-lg font-bold text-foreground">
                        Ksh {product.price.toLocaleString()}
                    </span>
                    {discount > 0 && (
                        <span className="text-sm text-neutral-400 line-through">
                            Ksh {Math.round(product.price * 1.1).toLocaleString()}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
