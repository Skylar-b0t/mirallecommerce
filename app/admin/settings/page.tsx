'use client';

import { useEffect, useState } from 'react';
import { Save, Loader2, Store, CreditCard, Truck, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        storeName: '',
        supportEmail: '',
        currency: 'KES',
        taxRate: 16,
        shippingFee: 0,
        minOrderFreeShipping: 0,
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/settings');
            const data = await res.json();
            if (data.success) {
                setFormData({
                    storeName: data.data.storeName || '',
                    supportEmail: data.data.supportEmail || '',
                    currency: data.data.currency || 'KES',
                    taxRate: data.data.taxRate || 0,
                    shippingFee: data.data.shippingFee || 0,
                    minOrderFreeShipping: data.data.minOrderFreeShipping || 0,
                });
            }
        } catch (error) {
            console.error('Failed to load settings');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.refresh();
                alert('Settings saved successfully');
            } else {
                alert('Failed to save settings');
            }
        } catch (error) {
            console.error('Error saving settings:', error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-neutral-500">Loading settings...</div>;

    return (
        <div className="space-y-6 animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground">Store Settings</h1>

            <form onSubmit={handleSubmit} className="grid gap-6">

                {/* General Settings */}
                <div className="glass-panel p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <Store className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-foreground">General Information</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-500">Store Name</label>
                            <input
                                type="text"
                                value={formData.storeName}
                                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                                className="w-full px-4 py-2 bg-background border border-gray-200 dark:border-white/10 rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-500">Support Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 w-5 h-5 text-neutral-400" />
                                <input
                                    type="email"
                                    value={formData.supportEmail}
                                    onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                                    className="w-full pl-10 px-4 py-2 bg-background border border-gray-200 dark:border-white/10 rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Financial Settings */}
                <div className="glass-panel p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-foreground">Financial & Tax</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-500">Currency Code</label>
                            <select
                                value={formData.currency}
                                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                className="w-full px-4 py-2 bg-background border border-gray-200 dark:border-white/10 rounded-xl"
                            >
                                <option value="KES">KES (Kenyan Shilling)</option>
                                <option value="USD">USD (US Dollar)</option>
                                <option value="EUR">EUR (Euro)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-500">Tax Rate (%)</label>
                            <input
                                type="number"
                                value={formData.taxRate}
                                onChange={(e) => setFormData({ ...formData, taxRate: Number(e.target.value) })}
                                className="w-full px-4 py-2 bg-background border border-gray-200 dark:border-white/10 rounded-xl"
                            />
                        </div>
                    </div>
                </div>

                {/* Shipping Settings */}
                <div className="glass-panel p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                            <Truck className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-foreground">Shipping Configuration</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-500">Base Shipping Fee</label>
                            <input
                                type="number"
                                value={formData.shippingFee}
                                onChange={(e) => setFormData({ ...formData, shippingFee: Number(e.target.value) })}
                                className="w-full px-4 py-2 bg-background border border-gray-200 dark:border-white/10 rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-500">Free Shipping Threshold</label>
                            <input
                                type="number"
                                value={formData.minOrderFreeShipping}
                                onChange={(e) => setFormData({ ...formData, minOrderFreeShipping: Number(e.target.value) })}
                                className="w-full px-4 py-2 bg-background border border-gray-200 dark:border-white/10 rounded-xl"
                            />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="btn-primary px-8 py-3 flex items-center gap-2"
                    >
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
