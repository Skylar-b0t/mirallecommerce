'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, Grid3x3, LayoutList, ChevronLeft, ChevronRight, X } from 'lucide-react';
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

    const category = searchParams.get('category');

    const getPageTitle = () => {
        if (!category) return 'All Products';
        return category.charAt(0).toUpperCase() + category.slice(1);
    };

    const getPageDescription = () => {
        if (!category) {
            return 'Discover our complete collection of premium electronics. From flagship smartphones to high-performance workstations.';
        }

        const descriptions: Record<string, string> = {
            laptops: 'High-performance laptops for work, gaming, and creativity. Top brands, best prices.',
            smartphones: 'Latest flagship smartphones with cutting-edge technology and premium features.',
            audio: 'Immersive audio experience with premium headphones, earbuds, and speakers.',
            cameras: 'Capture life\'s moments with professional-grade cameras and photography equipment.',
            accessories: 'Essential accessories to enhance your devices and tech lifestyle.',
            tablets: 'Versatile tablets for productivity and entertainment on the go.',
            gaming: 'Level up with high-performance gaming gear and consoles.',
        };

        return descriptions[category.toLowerCase()] || `Discover our premium selection of ${category.toLowerCase()}. Genuine products with warranty.`;
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header */}
            <div className="bg-surface border-b border-gray-200 dark:border-white/5 py-12 md:py-16">
                <div className="container-custom">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-3 text-foreground">
                        {getPageTitle()}
                    </h1>
                    <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl">
                        {getPageDescription()}
                    </p>
                </div>
            </div>

            <div className="container-custom py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar - Desktop */}
                    <aside className="hidden lg:block w-72 flex-shrink-0">
                        <div className="sticky top-24 space-y-8">
                            <div className="glass-panel rounded-2xl p-6">
                                <ProductFilters />
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        {/* Toolbar */}
                        <div className="glass-panel rounded-2xl p-4 mb-8">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                                    {/* Mobile Filter Toggle */}
                                    <button
                                        onClick={() => setShowFilters(true)}
                                        className="lg:hidden btn-secondary px-4 py-2 text-sm inline-flex items-center gap-2"
                                    >
                                        <SlidersHorizontal className="w-4 h-4" />
                                        Filters
                                    </button>

                                    <p className="text-sm text-neutral-500">
                                        Showing <span className="font-semibold text-foreground">{products.length}</span> of <span className="font-semibold text-foreground">{pagination.total}</span> products
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                                    {/* View Mode Toggle */}
                                    <div className="hidden sm:flex items-center gap-1 bg-gray-100 dark:bg-white/5 p-1 rounded-lg">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2 rounded-md transition-all ${viewMode === 'grid'
                                                ? 'bg-white dark:bg-slate-800 text-primary shadow-sm'
                                                : 'text-neutral-400 hover:text-foreground'
                                                }`}
                                            aria-label="Grid view"
                                        >
                                            <Grid3x3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`p-2 rounded-md transition-all ${viewMode === 'list'
                                                ? 'bg-white dark:bg-slate-800 text-primary shadow-sm'
                                                : 'text-neutral-400 hover:text-foreground'
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
                                        className="px-4 py-2 bg-gray-100 dark:bg-white/5 border-none rounded-xl text-sm text-foreground focus:ring-2 focus:ring-primary cursor-pointer"
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

                        {/* Mobile Filters Overlay */}
                        {showFilters && (
                            <div className="fixed inset-0 z-50 lg:hidden">
                                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
                                <div className="absolute right-0 top-0 bottom-0 w-[300px] bg-surface p-6 shadow-2xl overflow-y-auto">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold">Filters</h2>
                                        <button onClick={() => setShowFilters(false)} className="p-2 text-neutral-500 hover:text-foreground">
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <ProductFilters />
                                </div>
                            </div>
                        )}

                        {/* Products Grid */}
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="bg-white dark:bg-white/5 rounded-2xl p-4 animate-pulse border border-gray-100 dark:border-white/5"
                                    >
                                        <div className="aspect-[4/5] bg-gray-200 dark:bg-white/10 rounded-xl mb-4" />
                                        <div className="space-y-3">
                                            <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-3/4" />
                                            <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-1/2" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : products.length === 0 ? (
                            <div className="glass-panel rounded-2xl p-16 text-center">
                                <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <SlidersHorizontal className="w-8 h-8 text-neutral-400" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">No products found</h3>
                                <p className="text-neutral-500 mb-6 max-w-sm mx-auto">
                                    Try adjusting your filters or search query to find what you're looking for.
                                </p>
                                <Link
                                    href="/products"
                                    className="text-primary hover:underline font-medium"
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
                                        <div className="flex items-center gap-2 bg-surface p-2 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm">
                                            <button
                                                onClick={() => handlePageChange(pagination.page - 1)}
                                                disabled={pagination.page === 1}
                                                className="btn-secondary p-2 aspect-square flex items-center justify-center disabled:opacity-50"
                                            >
                                                <ChevronLeft className="w-4 h-4" />
                                            </button>

                                            {[...Array(pagination.pages)].map((_, i) => {
                                                const pageNum = i + 1;
                                                if (
                                                    pageNum === 1 ||
                                                    pageNum === pagination.pages ||
                                                    Math.abs(pageNum - pagination.page) <= 1
                                                ) {
                                                    return (
                                                        <button
                                                            key={pageNum}
                                                            onClick={() => handlePageChange(pageNum)}
                                                            className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${pagination.page === pageNum
                                                                ? 'bg-primary text-white shadow-md'
                                                                : 'text-neutral-500 hover:bg-gray-100 dark:hover:bg-white/5'
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
                                                            className="px-2 text-neutral-400"
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
                                                className="btn-secondary p-2 aspect-square flex items-center justify-center disabled:opacity-50"
                                            >
                                                <ChevronRight className="w-4 h-4" />
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
                <div className="min-h-screen bg-background">
                    <div className="container-custom py-12">
                        <div className="animate-pulse space-y-4">
                            <div className="h-12 bg-gray-200 dark:bg-white/10 rounded-xl w-1/3" />
                            <div className="h-6 bg-gray-200 dark:bg-white/10 rounded-xl w-1/2" />
                        </div>
                    </div>
                </div>
            }
        >
            <ProductsContent />
        </Suspense>
    );
}
