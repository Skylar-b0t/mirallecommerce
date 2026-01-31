import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import Product from '@/models/Product';
import User from '@/models/User';

export async function GET() {
    try {
        await dbConnect();

        // Clear existing products
        await Product.deleteMany({});
        // console.log('Connected to DB, proceeding to check collections...');

        const products = [
            {
                name: 'Framework Laptop 16',
                description: 'A high-performance, modular, and upgradeable 16-inch laptop. Designed to be repairable and customizable, featuring the latest AMD Ryzen processors and dedicated graphics capabilities.',
                price: 1699.00,
                category: 'Laptops',
                brand: 'Framework',
                images: ['https://frame.work/assets/framework_laptop_16/top_down-8d76d6.png'],
                stock: 15,
                rating: 4.8,
                numReviews: 124,
                featured: true,
                features: [
                    'Fully modular and repairable design',
                    'Hot-swappable input modules',
                    'Expansion Bay for GPU upgrades',
                    'High-resolution 165Hz display',
                    'QMK-compatible keyboard'
                ],
                specifications: {
                    'Performance': {
                        'Processor': 'AMD Ryzen™ 9 7940HS',
                        'Graphics': 'AMD Radeon™ RX 7700S',
                        'RAM': '32GB DDR5-5600',
                        'Storage': '1TB WD_BLACK™ SN850X'
                    },
                    'Display': {
                        'Size': '16.0 inch',
                        'Resolution': '2560 x 1600 (16:10)',
                        'Refresh Rate': '165Hz',
                        'Brightness': '500 nits'
                    },
                    'Battery': {
                        'Capacity': '85Wh',
                        'Charger': '180W USB-C'
                    },
                    'Dimensions': {
                        'Weight': '2.1 kg (Graphics Module adds 0.3 kg)',
                        'Thickness': '18 mm'
                    }
                }
            },
            {
                name: 'Nothing Phone (2)',
                description: 'A smartphone that celebrates your individuality. Featuring the iconic Glyph Interface, a refined Nothing OS 2.0, and a dual 50MP camera system.',
                price: 699.00,
                category: 'Smartphones',
                brand: 'Nothing',
                images: ['https://intl.nothing.tech/cdn/shop/files/Phone_2_PDP_Gallery_Dark_Grey_01.png?v=1689065983'],
                stock: 42,
                rating: 4.6,
                numReviews: 89,
                featured: true,
                features: [
                    'Unique Glyph Interface',
                    'Nothing OS 2.0 (clean Android)',
                    'Dual 50MP camera system',
                    'Snapdragon® 8+ Gen 1',
                    'Sustainable materials'
                ],
                specifications: {
                    'Display': {
                        'Type': 'LTPO OLED',
                        'Size': '6.7 inches',
                        'Refresh Rate': '1-120Hz adaptive'
                    },
                    'Camera': {
                        'Main': '50 MP Sony IMX890',
                        'Ultra-wide': '50 MP Samsung JN1',
                        'Front': '32 MP Sony IMX615'
                    },
                    'Performance': {
                        'Chipset': 'Snapdragon® 8+ Gen 1',
                        'RAM': '12GB',
                        'Storage': '256GB'
                    }
                }
            },
            {
                name: 'Sony WH-1000XM5',
                description: 'Industry-leading noise cancelling wireless headphones with exceptional sound quality, crystal clear hands-free calling, and long battery life.',
                price: 398.00,
                category: 'Audio',
                brand: 'Sony',
                images: ['https://www.sony.com/image/6145c1d32e6ac8e63a46c912dc33c5bb?fmt=png-alpha&wid=660&hei=660'],
                stock: 120,
                rating: 4.9,
                numReviews: 450,
                featured: true,
                features: [
                    'Industry-leading noise cancellation',
                    'Integrated Processor V1',
                    'Up to 30-hour battery life',
                    'Crystal clear hands-free calling',
                    'Multipoint connection'
                ],
                specifications: {
                    'Audio': {
                        'Driver Unit': '30mm',
                        'Frequency Response': '4Hz-40,000Hz',
                        'Audio Format': 'LDAC, AAC, SBC'
                    },
                    'Features': {
                        'NC': 'Auto NC Optimizer',
                        'Bluetooth': 'Version 5.2'
                    },
                    'Battery': {
                        'Life': 'Max. 30 hrs (NC ON)',
                        'Charging Time': 'Approx. 3.5 hrs'
                    }
                }
            },
            {
                name: 'Dell XPS 15',
                description: 'High-performance 15-inch laptop with a stunning 3.5K OLED display and 13th Gen Intel processors. Perfect for creators and power users.',
                price: 2199.00,
                category: 'Laptops',
                brand: 'Dell',
                images: ['https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9530/media-gallery/gray/notebook-xps-15-9530-gray-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=402&qlt=100,1&resMode=sharp2&size=402,402&chrss=full'],
                stock: 8,
                rating: 4.7,
                numReviews: 210,
                featured: false,
                features: [
                    '3.5K OLED InfinityEdge touch display',
                    'NVIDIA® GeForce RTX™ 4050',
                    'Premium aluminum chassis',
                    'Quad-speaker design',
                    'Long battery life'
                ],
                specifications: {
                    'Performance': {
                        'CPU': '13th Gen Intel® Core™ i7-13700H',
                        'GPU': 'NVIDIA® GeForce RTX™ 4050 6GB',
                        'RAM': '32GB DDR5'
                    },
                    'Display': {
                        'Type': '3.5K OLED Touch',
                        'Size': '15.6 inch',
                        'Resolution': '3456 x 2160'
                    }
                }
            },
            {
                name: 'iPad Pro 12.9"',
                description: 'The ultimate iPad experience with the astonishing M2 chip, next-level Apple Pencil hover experience, and ProRes video capture.',
                price: 1099.00,
                category: 'Tablets',
                brand: 'Apple',
                images: ['https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-13-select-wifi-spacegray-202210?wid=940&hei=1112&fmt=png-alpha&.v=1664411207213'],
                stock: 25,
                rating: 4.9,
                numReviews: 320,
                featured: true,
                features: [
                    'M2 chip with 8-core CPU and 10-core GPU',
                    '12.9-inch Liquid Retina XDR display',
                    'ProMotion technology',
                    'Face ID',
                    'Thunderbolt / USB 4'
                ],
                specifications: {
                    'Chip': {
                        'Model': 'Apple M2',
                        'CPU': '8-core',
                        'GPU': '10-core'
                    },
                    'Display': {
                        'Type': 'Liquid Retina XDR',
                        'Technology': 'Mini-LED'
                    }
                }
            }
        ];

        await Product.create(products);

        return NextResponse.json({
            success: true,
            message: 'Database seeded successfully',
            count: products.length
        });
    } catch (error: any) {
        console.error('Seed error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
