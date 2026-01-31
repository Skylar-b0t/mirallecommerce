import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import Product from '@/models/Product';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const searchParams = request.nextUrl.searchParams;
        const category = searchParams.get('category');
        const search = searchParams.get('search');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const brand = searchParams.get('brand');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '12');
        const sort = searchParams.get('sort') || 'createdAt';

        // Build query
        const query: any = {};

        if (category) {
            query.category = category;
        }

        if (search) {
            query.$text = { $search: search };
        }

        if (brand) {
            query.brand = brand;
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }

        // Calculate pagination
        const skip = (page - 1) * limit;

        // Determine sort order
        let sortOption: any = {};
        switch (sort) {
            case 'price-asc':
                sortOption = { price: 1 };
                break;
            case 'price-desc':
                sortOption = { price: -1 };
                break;
            case 'rating':
                sortOption = { rating: -1 };
                break;
            case 'name':
                sortOption = { name: 1 };
                break;
            default:
                sortOption = { createdAt: -1 };
        }

        // Fetch products
        const products = await Product.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit)
            .lean();

        // Get total count for pagination
        const total = await Product.countDocuments(query);

        return NextResponse.json({
            success: true,
            data: products,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();

        const product = await Product.create(body);

        return NextResponse.json({
            success: true,
            data: product,
        }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating product:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create product' },
            { status: 400 }
        );
    }
}
