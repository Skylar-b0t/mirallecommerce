'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';

export default function ProductFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });

    const categories = [
        'Smartphones',
        'Laptops',
        'Tablets',
        'Accessories',
        'Audio',
        'Cameras',
        'Gaming',
        'Wearables',
    ];

    const brands = [
        'Apple',
        'Samsung',
        'Sony',
        'Dell',
        'HP',
        'Lenovo',
        'Bose',
        'Canon',
        'Nikon',
    ];

    useEffect(() => {
        setSelectedCategory(searchParams.get('category') || '');
        setSelectedBrands(searchParams.get('brand')?.split(',').filter(Boolean) || []);
        setPriceRange({
            min: searchParams.get('minPrice') || '',
            max: searchParams.get('maxPrice') || '',
        });
    }, [searchParams]);

    const applyFilters = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (selectedCategory) {
            params.set('category', selectedCategory);
        } else {
            params.delete('category');
        }

        if (selectedBrands.length > 0) {
            params.set('brand', selectedBrands.join(','));
        } else {
            params.delete('brand');
        }

        if (priceRange.min) {
            params.set('minPrice', priceRange.min);
        } else {
            params.delete('minPrice');
        }

        if (priceRange.max) {
            params.set('maxPrice', priceRange.max);
        } else {
            params.delete('maxPrice');
        }

        params.delete('page');
        router.push(`/products?${params.toString()}`);
    };

    const clearFilters = () => {
        setSelectedCategory('');
        setSelectedBrands([]);
        setPriceRange({ min: '', max: '' });
        router.push('/products');
    };

    const handleBrandToggle = (brand: string) => {
        setSelectedBrands((prev) =>
            prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
        );
    };

    const activeFiltersCount =
        (selectedCategory ? 1 : 0) +
        selectedBrands.length +
        (priceRange.min || priceRange.max ? 1 : 0);

    return (
        <div className="surface-elevated rounded-xl p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[var(--color-neutral-50)]">
                    Filters
                    {activeFiltersCount > 0 && (
                        <span className="ml-2 text-sm text-[var(--color-accent)]">
                            ({activeFiltersCount})
                        </span>
                    )}
                </h3>
                {activeFiltersCount > 0 && (
                    <button
                        onClick={clearFilters}
                        className="text-sm text-[var(--color-neutral-400)] hover:text-[var(--color-accent)] transition-colors"
                    >
                        Clear all
                    </button>
                )}
            </div>

            <div className="divider-subtle" />

            {/* Category Filter */}
            <div>
                <h4 className="text-sm font-semibold text-[var(--color-neutral-200)] mb-3">
                    Category
                </h4>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <label
                            key={category}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <input
                                type="radio"
                                name="category"
                                value={category}
                                checked={selectedCategory === category}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-4 h-4 text-[var(--color-accent)] bg-[var(--color-primary-light)] border-white/20 focus:ring-[var(--color-accent)] focus:ring-2"
                            />
                            <span className="text-sm text-[var(--color-neutral-400)] group-hover:text-[var(--color-neutral-200)] transition-colors">
                                {category}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="divider-subtle" />

            {/* Brand Filter */}
            <div>
                <h4 className="text-sm font-semibold text-[var(--color-neutral-200)] mb-3">
                    Brand
                </h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                    {brands.map((brand) => (
                        <label
                            key={brand}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <input
                                type="checkbox"
                                checked={selectedBrands.includes(brand)}
                                onChange={() => handleBrandToggle(brand)}
                                className="w-4 h-4 text-[var(--color-accent)] bg-[var(--color-primary-light)] border-white/20 rounded focus:ring-[var(--color-accent)] focus:ring-2"
                            />
                            <span className="text-sm text-[var(--color-neutral-400)] group-hover:text-[var(--color-neutral-200)] transition-colors">
                                {brand}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="divider-subtle" />

            {/* Price Range */}
            <div>
                <h4 className="text-sm font-semibold text-[var(--color-neutral-200)] mb-3">
                    Price Range
                </h4>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-[var(--color-neutral-500)] mb-1.5">
                            Min
                        </label>
                        <input
                            type="number"
                            placeholder="$0"
                            value={priceRange.min}
                            onChange={(e) =>
                                setPriceRange((prev) => ({ ...prev, min: e.target.value }))
                            }
                            className="w-full px-3 py-2 bg-[var(--color-primary-light)] border border-white/10 rounded-lg text-sm text-[var(--color-neutral-100)] placeholder:text-[var(--color-neutral-600)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-[var(--color-neutral-500)] mb-1.5">
                            Max
                        </label>
                        <input
                            type="number"
                            placeholder="$9999"
                            value={priceRange.max}
                            onChange={(e) =>
                                setPriceRange((prev) => ({ ...prev, max: e.target.value }))
                            }
                            className="w-full px-3 py-2 bg-[var(--color-primary-light)] border border-white/10 rounded-lg text-sm text-[var(--color-neutral-100)] placeholder:text-[var(--color-neutral-600)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Apply Button */}
            <button
                onClick={applyFilters}
                className="btn-primary w-full text-sm"
            >
                Apply Filters
            </button>
        </div>
    );
}
