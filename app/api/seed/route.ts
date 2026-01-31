import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import Product from '@/models/Product';

const products = [
    // Laptops
    {
        name: 'MacBook Pro 16" M3 Max',
        description: 'The most powerful MacBook Pro ever. Blazing fast M3 Max chip, stunning Liquid Retina XDR display, and 22 hours of battery life.',
        price: 450000,
        category: 'Laptops',
        brand: 'Apple',
        images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=1000'],
        stock: 10,
        rating: 4.9,
        numReviews: 12
    },
    {
        name: 'Dell XPS 15',
        description: 'High-performance laptop with 4K OLED display, Intel Core i9, and NVIDIA RTX 4060. Perfect for creators.',
        price: 285000,
        category: 'Laptops',
        brand: 'Dell',
        images: ['https://images.unsplash.com/photo-1593642632823-8f78536788c6?auto=format&fit=crop&q=80&w=1000'],
        stock: 15,
        rating: 4.7,
        numReviews: 24
    },
    {
        name: 'HP Spectre x360',
        description: '2-in-1 convertible laptop with stunning design, long battery life, and powerful performance.',
        price: 220000,
        category: 'Laptops',
        brand: 'HP',
        images: ['https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&q=80&w=1000'],
        stock: 8,
        rating: 4.6,
        numReviews: 18
    },
    {
        name: 'Lenovo ThinkPad X1 Carbon',
        description: 'Ultralight business laptop with carbon fiber chassis, legendary keyboard, and robust security features.',
        price: 245000,
        category: 'Laptops',
        brand: 'Lenovo',
        images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1000'],
        stock: 20,
        rating: 4.8,
        numReviews: 30
    },

    // Smartphones
    {
        name: 'iPhone 15 Pro Max',
        description: 'Titanium design, A17 Pro chip, 48MP Main camera, and USB-C. The ultimate iPhone experience.',
        price: 210000,
        category: 'Smartphones',
        brand: 'Apple',
        images: ['https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=1000'],
        stock: 25,
        rating: 4.9,
        numReviews: 542
    },
    {
        name: 'Samsung Galaxy S24 Ultra',
        description: 'Galaxy AI is here. Titanium frame, 200MP camera, and built-in S Pen.',
        price: 195000,
        category: 'Smartphones',
        brand: 'Samsung',
        images: ['https://images.unsplash.com/photo-1610945431162-b5cc5972f20a?auto=format&fit=crop&q=80&w=1000'],
        stock: 30,
        rating: 4.8,
        numReviews: 320
    },
    {
        name: 'Google Pixel 8 Pro',
        description: 'The most advanced Pixel phones yet, featuring Google AI and the best Pixel Camera.',
        price: 155000,
        category: 'Smartphones',
        brand: 'Google',
        images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff23?auto=format&fit=crop&q=80&w=1000'],
        stock: 12,
        rating: 4.7,
        numReviews: 156
    },
    {
        name: 'Samsung Galaxy Z Fold 5',
        description: 'Unfold an immersive entertainment experience. The ultimate multitasking powerhouse.',
        price: 260000,
        category: 'Smartphones',
        brand: 'Samsung',
        images: ['https://images.unsplash.com/photo-1663499479905-243ce4b4458d?auto=format&fit=crop&q=80&w=1000'],
        stock: 5,
        rating: 4.6,
        numReviews: 45
    },

    // Audio
    {
        name: 'Sony WH-1000XM5',
        description: 'Industry-leading noise canceling headphones with exceptional sound quality and crystal clear calls.',
        price: 48000,
        category: 'Audio',
        brand: 'Sony',
        images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1000'],
        stock: 50,
        rating: 4.9,
        numReviews: 890
    },
    {
        name: 'AirPods Pro (2nd Gen)',
        description: 'Rich audio. Next-level Active Noise Cancellation. Adaptive Transparency.',
        price: 38000,
        category: 'Audio',
        brand: 'Apple',
        images: ['https://images.unsplash.com/photo-1603351154351-5cfcf2795d2d?auto=format&fit=crop&q=80&w=1000'],
        stock: 100,
        rating: 4.8,
        numReviews: 1200
    },
    {
        name: 'JBL Flip 6',
        description: 'Bold JBL Original Pro Sound with 2-way speaker system for loud, crystal clear, powerful sound.',
        price: 15000,
        category: 'Audio',
        brand: 'JBL',
        images: ['https://images.unsplash.com/photo-1612222161690-318e815615d0?auto=format&fit=crop&q=80&w=1000'],
        stock: 75,
        rating: 4.7,
        numReviews: 650
    },

    // Cameras
    {
        name: 'Sony Alpha a7 IV',
        description: 'Full-frame mirrorless camera with 33MP sensor, 4K 60p video, and real-time Eye AF.',
        price: 320000,
        category: 'Cameras',
        brand: 'Sony',
        images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000'],
        stock: 8,
        rating: 4.9,
        numReviews: 45
    },
    {
        name: 'Canon EOS R6 Mark II',
        description: 'Versatile full-frame mirrorless camera for photos and video. Fast, accurate autofocus.',
        price: 295000,
        category: 'Cameras',
        brand: 'Canon',
        images: ['https://images.unsplash.com/photo-1519638831568-d9897f54ed69?auto=format&fit=crop&q=80&w=1000'],
        stock: 6,
        rating: 4.8,
        numReviews: 32
    },
    {
        name: 'DJI Mini 4 Pro',
        description: 'Mini camera drone with 4K HDR video, omnidirectional obstacle sensing, and extended flight time.',
        price: 135000,
        category: 'Cameras',
        brand: 'DJI',
        images: ['https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80&w=1000'],
        stock: 15,
        rating: 4.8,
        numReviews: 85
    },

    // Wearables
    {
        name: 'Apple Watch Series 9',
        description: 'Smarter. Brighter. Mightier. Featuring double tap, a magical way to use your Apple Watch without touching the screen.',
        price: 65000,
        category: 'Wearables',
        brand: 'Apple',
        images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=1000'],
        stock: 40,
        rating: 4.8,
        numReviews: 320
    },
    {
        name: 'Samsung Galaxy Watch 6 classic',
        description: 'The return of the rotating bezel. Advanced sleep coaching and heart health monitoring.',
        price: 55000,
        category: 'Wearables',
        brand: 'Samsung',
        images: ['https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=1000'],
        stock: 35,
        rating: 4.7,
        numReviews: 180
    },

    // Accessories
    {
        name: 'Logitech MX Master 3S',
        description: 'Performance wireless mouse with 8K DPI track-on-glass sensor and quiet clicks.',
        price: 16500,
        category: 'Accessories',
        brand: 'Logitech',
        images: ['https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&q=80&w=1000'],
        stock: 60,
        rating: 4.9,
        numReviews: 450
    },
    {
        name: 'Anker 737 Power Bank',
        description: '24,000mAh capacity with 140W fast charging. Charge laptops, phones, and tablets on the go.',
        price: 18500,
        category: 'Accessories',
        brand: 'Anker',
        images: ['https://images.unsplash.com/photo-1620703875326-e17f4ba2c58a?auto=format&fit=crop&q=80&w=1000'],
        stock: 45,
        rating: 4.8,
        numReviews: 210
    }
];

export async function GET() {
    try {
        await dbConnect();

        // Remove existing products to avoid duplicates
        await Product.deleteMany({});

        // Insert new products
        await Product.insertMany(products);

        return NextResponse.json({
            success: true,
            message: 'Database seeded successfully',
            count: products.length
        });
    } catch (error: any) {
        console.error('Seeding error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
