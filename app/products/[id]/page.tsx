'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Loader2 } from 'lucide-react';
import ImageGallery from '@/components/products/ImageGallery';
import BuyBox from '@/components/products/BuyBox';
import ProductCard from '@/components/products/ProductCard';

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
    specifications?: Record<string, Record<string, string>>;
    features?: string[];
}

export default function ProductDetailPage() {
    const params = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'shipping'>('overview');

    useEffect(() => {
        if (params.id) {
            fetchProduct(params.id as string);
        }
    }, [params.id]);

    const fetchProduct = async (id: string) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/products/${id}`);
            const result = await response.json();

            if (result.success) {
                setProduct(result.data);

                // Fetch related products
                if (result.data.category) {
                    fetchRelatedProducts(result.data.category, id);
                }
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedProducts = async (category: string, excludeId: string) => {
        try {
            const response = await fetch(`/api/products?category=${category}&limit=4`);
            const result = await response.json();

            if (result.success) {
                // Filter out current product
                const filtered = result.data.filter((p: Product) => p._id !== excludeId);
                setRelatedProducts(filtered.slice(0, 4));
            }
        } catch (error) {
            console.error('Error fetching related products:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-[var(--color-accent)] animate-spin mx-auto mb-4" />
                    <p className="text-[var(--color-neutral-400)]">Loading product...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md">
                    <h2 className="text-3xl font-bold mb-3">Product Not Found</h2>
                    <p className="text-[var(--color-neutral-400)] mb-8">
                        The product you're looking for doesn't exist or has been removed.
                    </p>
                    <Link href="/products" className="btn-primary inline-block">
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-20 lg:pb-8">
            {/* Breadcrumb */}
            <div className="bg-[var(--color-surface)] border-b border-white/5">
                <div className="container-premium py-4">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link
                            href="/"
                            className="text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-200)] transition-colors"
                        >
                            Home
                        </Link>
                        <ChevronRight className="w-4 h-4 text-[var(--color-neutral-600)]" />
                        <Link
                            href="/products"
                            className="text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-200)] transition-colors"
                        >
                            Products
                        </Link>
                        <ChevronRight className="w-4 h-4 text-[var(--color-neutral-600)]" />
                        <Link
                            href={`/products?category=${product.category}`}
                            className="text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-200)] transition-colors"
                        >
                            {product.category}
                        </Link>
                        <ChevronRight className="w-4 h-4 text-[var(--color-neutral-600)]" />
                        <span className="text-[var(--color-neutral-200)] font-medium truncate max-w-[200px]">
                            {product.name}
                        </span>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="container-premium py-8 lg:py-12">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Gallery */}
                    <div>
                        <ImageGallery images={product.images} productName={product.name} />
                    </div>

                    {/* Buy Box */}
                    <div>
                        <BuyBox product={product} />
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mt-16">
                    {/* Tab Headers */}
                    <div className="border-b border-white/10 mb-8">
                        <div className="flex gap-8 overflow-x-auto scrollbar-hide">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`pb-4 px-2 font-medium transition-all whitespace-nowrap ${activeTab === 'overview'
                                    ? 'text-[var(--color-accent)] border-b-2 border-[var(--color-accent)]'
                                    : 'text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-200)]'
                                    }`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('specs')}
                                className={`pb-4 px-2 font-medium transition-all whitespace-nowrap ${activeTab === 'specs'
                                    ? 'text-[var(--color-accent)] border-b-2 border-[var(--color-accent)]'
                                    : 'text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-200)]'
                                    }`}
                            >
                                Specifications
                            </button>
                            <button
                                onClick={() => setActiveTab('shipping')}
                                className={`pb-4 px-2 font-medium transition-all whitespace-nowrap ${activeTab === 'shipping'
                                    ? 'text-[var(--color-accent)] border-b-2 border-[var(--color-accent)]'
                                    : 'text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-200)]'
                                    }`}
                            >
                                Shipping & Returns
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="max-w-4xl">
                        {activeTab === 'overview' && (
                            <div className="space-y-6 animate-fade-in">
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">About this product</h2>
                                    <p className="text-[var(--color-neutral-300)] leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>

                                {product.features && product.features.length > 0 && (
                                    <div>
                                        <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                                        <ul className="space-y-3">
                                            {product.features.map((feature, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <span className="w-6 h-6 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <span className="text-[var(--color-accent)] text-sm">✓</span>
                                                    </span>
                                                    <span className="text-[var(--color-neutral-300)]">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'specs' && (
                            <div className="animate-fade-in">
                                <h2 className="text-2xl font-bold mb-6">Technical Specifications</h2>
                                {product.specifications ? (
                                    <div className="space-y-8">
                                        {Object.entries(product.specifications).map(([category, specs]) => (
                                            <div key={category}>
                                                <h3 className="text-lg font-semibold text-[var(--color-accent)] mb-4">
                                                    {category}
                                                </h3>
                                                <table className="w-full">
                                                    <tbody>
                                                        {Object.entries(specs).map(([key, value], index) => (
                                                            <tr
                                                                key={key}
                                                                className={index % 2 === 0 ? 'bg-[var(--color-primary-light)]' : ''}
                                                            >
                                                                <td className="py-3 px-4 text-[var(--color-neutral-400)] font-medium w-1/3">
                                                                    {key}
                                                                </td>
                                                                <td className="py-3 px-4 text-[var(--color-neutral-100)]">
                                                                    {value}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-[var(--color-neutral-400)]">
                                        No specifications available for this product.
                                    </p>
                                )}
                            </div>
                        )}

                        {activeTab === 'shipping' && (
                            <div className="space-y-8 animate-fade-in">
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
                                    <div className="space-y-4 text-[var(--color-neutral-300)]">
                                        <p>
                                            <strong className="text-[var(--color-neutral-100)]">Free Shipping:</strong> On all orders over Ksh 10,000
                                        </p>
                                        <p>
                                            <strong className="text-[var(--color-neutral-100)]">Standard Delivery:</strong> 3-5 business days
                                        </p>
                                        <p>
                                            <strong className="text-[var(--color-neutral-100)]">Express Delivery:</strong> 1-2 business days (additional fee)
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Returns & Exchanges</h2>
                                    <div className="space-y-4 text-[var(--color-neutral-300)]">
                                        <p>
                                            We offer a <strong className="text-[var(--color-neutral-100)]">30-day return policy</strong> on all products. Items must be in original condition with all packaging and accessories.
                                        </p>
                                        <p>
                                            To initiate a return, please contact our customer service team with your order number.
                                        </p>
                                        <p>
                                            Refunds will be processed within 5-7 business days after we receive the returned item.
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Warranty</h2>
                                    <p className="text-[var(--color-neutral-300)]">
                                        All products come with a <strong className="text-[var(--color-neutral-100)]">1-year manufacturer warranty</strong> covering defects in materials and workmanship.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-20">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold">You May Also Like</h2>
                            <Link
                                href={`/products?category=${product.category}`}
                                className="text-[var(--color-accent)] hover:underline font-medium"
                            >
                                View All
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <ProductCard key={relatedProduct._id} product={relatedProduct} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Bottom Sticky Bar */}
            <div className="fixed bottom-0 left-0 right-0 lg:hidden z-40 glass-header border-t border-white/5 p-4">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <div className="text-xs text-[var(--color-neutral-500)]">Price</div>
                        <div className="text-2xl font-bold">Ksh {product.price.toLocaleString()}</div>
                    </div>
                    <button
                        disabled={product.stock === 0}
                        className="btn-primary flex-1 max-w-[200px] disabled:opacity-50"
                    >
                        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
    );
}
