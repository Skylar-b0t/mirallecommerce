'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, Grid3x3, LayoutList } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';

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

function ProductsContent() {
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState('createdAt');
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 12,
        total: 0,
        pages: 0,
    });

    useEffect(() => {
        fetchProducts();
    }, [searchParams, sortBy, pagination.page]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams(searchParams.toString());
            params.set('sort', sortBy);
            params.set('page', pagination.page.toString());
            params.set('limit', pagination.limit.toString());

            const response = await fetch(`/api/products?${params.toString()}`);
            const result = await response.json();

            if (result.success) {
                setProducts(result.data);
                setPagination(result.pagination);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        setPagination((prev) => ({ ...prev, page: newPage }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="bg-[var(--color-surface)] border-b border-white/5">
                <div className="container-premium py-12">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-3">
                        All Products
                    </h1>
                    <p className="text-lg text-[var(--color-neutral-400)]">
                        Discover our complete collection of premium electronics
                    </p>
                </div>
            </div>

            <div className="container-premium py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar - Desktop */}
                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <div className="sticky top-24">
                            <ProductFilters />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        {/* Toolbar */}
                        <div className="surface-elevated rounded-xl p-4 mb-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    {/* Mobile Filter Toggle */}
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="lg:hidden btn-secondary px-4 py-2 text-sm inline-flex items-center gap-2"
                                    >
                                        <SlidersHorizontal className="w-4 h-4" />
                                        Filters
                                    </button>

                                    <p className="text-sm text-[var(--color-neutral-400)]">
                                        <span className="font-semibold text-[var(--color-neutral-200)]">
                                            {pagination.total}
                                        </span>{' '}
                                        products found
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    {/* View Mode Toggle */}
                                    <div className="hidden sm:flex items-center gap-1 bg-[var(--color-primary-light)] border border-white/10 rounded-lg p-1">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2 rounded transition-all ${viewMode === 'grid'
                                                    ? 'bg-[var(--color-accent)] text-white'
                                                    : 'text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-200)]'
                                                }`}
                                            aria-label="Grid view"
                                        >
                                            <Grid3x3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`p-2 rounded transition-all ${viewMode === 'list'
                                                    ? 'bg-[var(--color-accent)] text-white'
                                                    : 'text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-200)]'
                                                }`}
                                            aria-label="List view"
                                        >
                                            <LayoutList className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Sort Dropdown */}
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-4 py-2 bg-[var(--color-primary-light)] border border-white/10 rounded-lg text-sm text-[var(--color-neutral-100)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
                                    >
                                        <option value="createdAt">Newest First</option>
                                        <option value="price-asc">Price: Low to High</option>
                                        <option value="price-desc">Price: High to Low</option>
                                        <option value="rating">Top Rated</option>
                                        <option value="name">Name: A-Z</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Filters */}
                        {showFilters && (
                            <div className="lg:hidden mb-6 animate-fade-in">
                                <ProductFilters />
                            </div>
                        )}

                        {/* Products Grid */}
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="surface-elevated rounded-2xl p-5 animate-pulse"
                                    >
                                        <div className="aspect-square bg-[var(--color-primary-light)] rounded-xl mb-4" />
                                        <div className="space-y-3">
                                            <div className="h-4 bg-[var(--color-primary-light)] rounded w-3/4" />
                                            <div className="h-4 bg-[var(--color-primary-light)] rounded w-1/2" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : products.length === 0 ? (
                            <div className="surface-elevated rounded-2xl p-16 text-center">
                                <p className="text-lg text-[var(--color-neutral-400)] mb-4">
                                    No products found matching your criteria
                                </p>
                                <Link
                                    href="/products"
                                    className="text-[var(--color-accent)] hover:underline font-medium"
                                >
                                    Clear all filters
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div
                                    className={
                                        viewMode === 'grid'
                                            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                                            : 'space-y-4'
                                    }
                                >
                                    {products.map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {pagination.pages > 1 && (
                                    <div className="mt-12 flex justify-center">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handlePageChange(pagination.page - 1)}
                                                disabled={pagination.page === 1}
                                                className="btn-secondary px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Previous
                                            </button>

                                            {[...Array(pagination.pages)].map((_, i) => {
                                                const pageNum = i + 1;
                                                // Show first, last, current, and adjacent pages
                                                if (
                                                    pageNum === 1 ||
                                                    pageNum === pagination.pages ||
                                                    Math.abs(pageNum - pagination.page) <= 1
                                                ) {
                                                    return (
                                                        <button
                                                            key={pageNum}
                                                            onClick={() => handlePageChange(pageNum)}
                                                            className={`px-4 py-2 text-sm rounded-lg transition-all ${pagination.page === pageNum
                                                                    ? 'bg-[var(--color-accent)] text-white'
                                                                    : 'btn-secondary'
                                                                }`}
                                                        >
                                                            {pageNum}
                                                        </button>
                                                    );
                                                } else if (
                                                    pageNum === pagination.page - 2 ||
                                                    pageNum === pagination.page + 2
                                                ) {
                                                    return (
                                                        <span
                                                            key={pageNum}
                                                            className="px-2 text-[var(--color-neutral-500)]"
                                                        >
                                                            ...
                                                        </span>
                                                    );
                                                }
                                                return null;
                                            })}

                                            <button
                                                onClick={() => handlePageChange(pagination.page + 1)}
                                                disabled={pagination.page === pagination.pages}
                                                className="btn-secondary px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen">
                    <div className="bg-[var(--color-surface)] border-b border-white/5">
                        <div className="container-premium py-12">
                            <h1 className="text-4xl lg:text-5xl font-bold mb-3">
                                All Products
                            </h1>
                            <p className="text-lg text-[var(--color-neutral-400)]">Loading...</p>
                        </div>
                    </div>
                </div>
            }
        >
            <ProductsContent />
        </Suspense>
    );
}
