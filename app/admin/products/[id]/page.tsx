'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, Plus, X, Upload, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function ProductFormPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [mode, setMode] = useState<'create' | 'edit'>('create');
    const [unwrappedParams, setUnwrappedParams] = useState<{ id: string } | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Laptops',
        brand: '',
        stock: '',
        images: [] as string[],
        featured: false,
    });

    const categories = ['Laptops', 'Smartphones', 'Audio', 'Cameras', 'Wearables', 'Accessories'];

    // Unwrap params
    useEffect(() => {
        const unwrap = async () => {
            try {
                const resolvedParams = await params;
                setUnwrappedParams(resolvedParams);
            } catch (error) {
                console.error('Failed to unwrap params:', error);
            }
        };
        unwrap();
    }, [params]);

    // Fetch product if editing
    useEffect(() => {
        if (!unwrappedParams) return;

        if (unwrappedParams.id === 'new') {
            setMode('create');
            setLoading(false);
        } else {
            setMode('edit');
            setLoading(true);
            const fetchProduct = async () => {
                try {
                    const res = await fetch(`/api/products/${unwrappedParams.id}`);
                    const data = await res.json();
                    if (data.success) {
                        const p = data.data;
                        setFormData({
                            name: p.name,
                            description: p.description,
                            price: p.price,
                            category: p.category,
                            brand: p.brand,
                            stock: p.stock,
                            images: p.images.length > 0 ? p.images : [],
                            featured: p.featured || false,
                        });
                    } else {
                        alert('Product not found');
                        router.push('/admin/products');
                    }
                } catch (error) {
                    console.error('Failed to fetch product');
                } finally {
                    setLoading(false);
                }
            };
            fetchProduct();
        }
    }, [unwrappedParams, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const payload = {
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock),
            images: formData.images.filter(url => url.trim() !== '')
        };

        if (payload.images.length === 0) {
            alert('At least one image is required');
            setSaving(false);
            return;
        }

        try {
            const url = mode === 'create' ? '/api/products' : `/api/products/${unwrappedParams?.id}`;
            const method = mode === 'create' ? 'POST' : 'PUT';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                router.push('/admin/products');
                router.refresh();
            } else {
                const err = await res.json();
                alert(err.error || 'Failed to save product');
            }
        } catch (error) {
            console.error('Error saving:', error);
            alert('An error occurred');
        } finally {
            setSaving(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const data = new FormData();
        data.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data,
            });
            const result = await res.json();
            if (result.success) {
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, result.url]
                }));
            } else {
                alert('Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Upload error');
        } finally {
            setUploading(false);
            // Reset input
            e.target.value = '';
        }
    };

    const removeImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    if (loading) return <div className="p-8 text-center text-neutral-500">Loading editor...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <Link
                    href="/admin/products"
                    className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-neutral-500 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-3xl font-bold text-foreground">
                    {mode === 'create' ? 'Add New Product' : 'Edit Product'}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-gray-200 dark:border-white/10 p-8 space-y-8 shadow-sm">
                {/* Basic Info */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-foreground border-b border-gray-100 dark:border-white/5 pb-4">Basic Information</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-500">Product Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 bg-background border border-gray-200 dark:border-white/10 rounded-xl text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                                placeholder="e.g. MacBook Pro 16"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-500">Brand</label>
                            <input
                                type="text"
                                required
                                value={formData.brand}
                                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                className="w-full px-4 py-3 bg-background border border-gray-200 dark:border-white/10 rounded-xl text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                                placeholder="e.g. Apple"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-500">Description</label>
                        <textarea
                            required
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-3 bg-background border border-gray-200 dark:border-white/10 rounded-xl text-foreground focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                            placeholder="Detailed product description..."
                        />
                    </div>
                </div>

                {/* Pricing & Inventory */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-foreground border-b border-gray-100 dark:border-white/5 pb-4">Pricing & Inventory</h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-500">Price (KES)</label>
                            <input
                                type="number"
                                required
                                min="0"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full px-4 py-3 bg-background border border-gray-200 dark:border-white/10 rounded-xl text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-500">Stock</label>
                            <input
                                type="number"
                                required
                                min="0"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                className="w-full px-4 py-3 bg-background border border-gray-200 dark:border-white/10 rounded-xl text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-500">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 bg-background border border-gray-200 dark:border-white/10 rounded-xl text-foreground focus:ring-2 focus:ring-primary focus:outline-none appearance-none"
                            >
                                {categories.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-gray-100 dark:border-white/5 pb-4">
                        <h2 className="text-xl font-bold text-foreground">Product Images</h2>
                        <span className="text-sm text-neutral-500">
                            {formData.images.length} images uploaded
                        </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Upload Button */}
                        <label className="aspect-square rounded-xl border-2 border-dashed border-gray-300 dark:border-white/10 hover:border-primary hover:bg-primary/5 cursor-pointer flex flex-col items-center justify-center transition-all group">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                className="hidden"
                                disabled={uploading}
                            />
                            {uploading ? (
                                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                            ) : (
                                <>
                                    <Upload className="w-8 h-8 text-neutral-400 group-hover:text-primary transition-colors mb-2" />
                                    <span className="text-xs font-medium text-neutral-500 group-hover:text-primary">
                                        Upload Image
                                    </span>
                                </>
                            )}
                        </label>

                        {/* Image Previews */}
                        {formData.images.map((url, index) => (
                            <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 group bg-background">
                                <img
                                    src={url}
                                    alt={`Product ${index + 1}`}
                                    className="w-full h-full object-contain p-2"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-sm"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Fallback URL Input (Optional, for external images) */}
                    <div className="pt-4 border-t border-gray-100 dark:border-white/5">
                        <details className="text-sm">
                            <summary className="cursor-pointer text-primary font-medium hover:underline">
                                Add Image via URL instead
                            </summary>
                            <div className="mt-4 flex gap-2">
                                <input
                                    type="url"
                                    placeholder="https://..."
                                    className="flex-1 px-4 py-2 bg-background border border-gray-200 dark:border-white/10 rounded-lg"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            const val = e.currentTarget.value;
                                            if (val) {
                                                setFormData(prev => ({ ...prev, images: [...prev.images, val] }));
                                                e.currentTarget.value = '';
                                            }
                                        }
                                    }}
                                />
                                <button type="button" className="btn-secondary px-4 py-2" onClick={(e) => {
                                    // Trigger handled by input Enter or manually if needed
                                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                    if (input.value) {
                                        setFormData(prev => ({ ...prev, images: [...prev.images, input.value] }));
                                        input.value = '';
                                    }
                                }}>Add</button>
                            </div>
                        </details>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-gray-100 dark:border-white/5 flex justify-end gap-4">
                    <Link
                        href="/admin/products"
                        className="px-6 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-neutral-500 hover:bg-gray-50 dark:hover:bg-white/5 font-medium"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={saving || uploading}
                        className="btn-primary px-8 py-3 rounded-xl font-semibold flex items-center gap-2"
                    >
                        {saving && <Loader2 className="w-5 h-5 animate-spin" />}
                        {mode === 'create' ? 'Create Product' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
