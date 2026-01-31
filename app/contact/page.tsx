'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, MessageSquare, Clock } from 'lucide-react';

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setLoading(false);
        setSent(true);
        setFormData({ name: '', email: '', subject: '', message: '' });

        // Reset success message after 5 seconds
        setTimeout(() => setSent(false), 5000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="min-h-screen py-24">
            <div className="container-premium">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-[var(--color-neutral-400)] bg-clip-text text-transparent">
                        Get in Touch
                    </h1>
                    <p className="text-[var(--color-neutral-300)] text-lg">
                        Have a question about our products or your order? We're here to help.
                        Chat with our friendly team 24/7.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-12">
                        {/* Quick Stats */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="surface-elevated p-6 rounded-2xl border border-white/10">
                                <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)] mb-4">
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Chat to sales</h3>
                                <p className="text-[var(--color-neutral-400)] text-sm mb-4">Speak to our friendly team.</p>
                                <a href="mailto:hello@mirallecommerce.com" className="text-[var(--color-accent)] font-medium hover:underline">
                                    hello@mirallecommerce.com
                                </a>
                            </div>
                            <div className="surface-elevated p-6 rounded-2xl border border-white/10">
                                <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)] mb-4">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Business Hours</h3>
                                <p className="text-[var(--color-neutral-400)] text-sm mb-4">Mon-Fri from 8am to 5pm.</p>
                                <p className="text-[var(--color-neutral-200)] font-medium">
                                    Weekends: 9am - 2pm
                                </p>
                            </div>
                        </div>

                        {/* Location/Contact Details */}
                        <div className="space-y-8">
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center flex-shrink-0 border border-white/10">
                                    <MapPin className="w-5 h-5 text-[var(--color-neutral-200)]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Visit us</h3>
                                    <p className="text-[var(--color-neutral-300)] leading-relaxed">
                                        Mirall Technology HQ<br />
                                        Westlands Commercial Centre<br />
                                        Nairobi, Kenya
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center flex-shrink-0 border border-white/10">
                                    <Phone className="w-5 h-5 text-[var(--color-neutral-200)]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2">Call us</h3>
                                    <p className="text-[var(--color-neutral-400)] mb-2">Mon-Fri from 8am to 5pm.</p>
                                    <a href="tel:+254718511118" className="text-[var(--color-accent)] font-medium hover:underline">
                                        +254 718 511 118
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="surface-elevated rounded-3xl p-8 lg:p-10 border border-white/10 shadow-2xl">
                        <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

                        {sent ? (
                            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-8 text-center animate-fade-in">
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                                    <Send className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-green-400 mb-2">Message Sent!</h3>
                                <p className="text-[var(--color-neutral-300)]">
                                    Thank you for contacting us. We'll get back to you shortly.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-[var(--color-neutral-400)] mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-[var(--color-primary-light)] border border-white/10 rounded-xl text-[var(--color-neutral-100)] placeholder:text-[var(--color-neutral-500)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-[var(--color-neutral-400)] mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-[var(--color-primary-light)] border border-white/10 rounded-xl text-[var(--color-neutral-100)] placeholder:text-[var(--color-neutral-500)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-[var(--color-neutral-400)] mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-[var(--color-primary-light)] border border-white/10 rounded-xl text-[var(--color-neutral-100)] placeholder:text-[var(--color-neutral-500)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-[var(--color-neutral-400)] mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 bg-[var(--color-primary-light)] border border-white/10 rounded-xl text-[var(--color-neutral-100)] placeholder:text-[var(--color-neutral-500)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full btn-primary py-4 flex items-center justify-center gap-2 font-semibold text-lg"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            SendMessage
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
