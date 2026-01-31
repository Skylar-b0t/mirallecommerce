'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
    images: string[];
    productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handlePrevious = () => {
        setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    // Placeholder for when no images
    const displayImages = images.length > 0 ? images : [''];

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-[var(--color-primary-light)] border border-white/6 rounded-2xl overflow-hidden group">
                {/* Image placeholder - replace with actual Image component when images are available */}
                {/* Main Image - Display selected image */}
                {images.length > 0 ? (
                    <img
                        src={images[selectedIndex]}
                        alt={`${productName} - View ${selectedIndex + 1}`}
                        className="w-full h-full object-contain p-4"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-8xl text-[var(--color-neutral-600)]">
                        📱
                    </div>
                )}

                {/* Navigation Arrows - Desktop */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={handlePrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--color-surface)]/90 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--color-surface)]"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-5 h-5 text-[var(--color-neutral-200)]" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--color-surface)]/90 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--color-surface)]"
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-5 h-5 text-[var(--color-neutral-200)]" />
                        </button>
                    </>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                    <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-[var(--color-surface)]/90 backdrop-blur-sm border border-white/10">
                        <span className="text-xs font-medium text-[var(--color-neutral-200)]">
                            {selectedIndex + 1} / {images.length}
                        </span>
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {displayImages.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedIndex(index)}
                            className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 transition-all overflow-hidden ${selectedIndex === index
                                ? 'border-[var(--color-accent)] scale-105'
                                : 'border-white/10 hover:border-white/20'
                                }`}
                        >
                            {image ? (
                                <img
                                    src={image}
                                    alt={`${productName} thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-[var(--color-primary-light)] flex items-center justify-center text-3xl">
                                    📱
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* Mobile Swipe Indicators */}
            {images.length > 1 && (
                <div className="flex justify-center gap-2 lg:hidden">
                    {displayImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${selectedIndex === index
                                ? 'bg-[var(--color-accent)] w-6'
                                : 'bg-[var(--color-neutral-600)]'
                                }`}
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
