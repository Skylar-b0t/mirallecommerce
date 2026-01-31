import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db/mongodb';
import Order from '@/models/Order';
import User from '@/models/User';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const data = await req.json();

        // Validate required fields
        if (!data.orderItems || data.orderItems.length === 0) {
            return NextResponse.json({ success: false, message: 'No order items' }, { status: 400 });
        }

        // Handle User (Guest Checkout vs Logged In)
        let userId = data.user;

        if (!userId && data.shippingAddress && data.shippingAddress.email) {
            const email = data.shippingAddress.email;
            let user = await User.findOne({ email });

            if (!user) {
                // Create a guest user
                user = await User.create({
                    name: `${data.shippingAddress.firstName} ${data.shippingAddress.lastName}`,
                    email: email,
                    password: Math.random().toString(36).slice(-8), // Dummy password
                    role: 'user',
                });
            }
            userId = user._id;
        }

        if (!userId) {
            return NextResponse.json({ success: false, message: 'User information missing' }, { status: 400 });
        }

        const order = await Order.create({
            items: data.orderItems.map((item: any) => ({
                product: item.id,
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: item.quantity
            })),
            user: userId,
            shippingAddress: {
                street: data.shippingAddress.address,
                city: data.shippingAddress.city,
                state: data.shippingAddress.city,
                zipCode: data.shippingAddress.postalCode || '00000',
                country: 'Kenya',
            },
            paymentMethod: data.paymentMethod,
            itemsPrice: data.itemsPrice,
            taxPrice: data.taxPrice,
            shippingPrice: data.shippingPrice,
            totalPrice: data.totalPrice,
            isPaid: false,
            isDelivered: false,
            status: 'pending',
        });

        return NextResponse.json({ success: true, data: order });
    } catch (error: any) {
        console.error('Order creation error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        // If admin, return all orders. If user, return only own orders.
        let query = {};
        if ((session.user as any).role !== 'admin') {
            query = { user: (session.user as any).id };
        }

        const orders = await Order.find(query)
            .populate('user', 'name email')
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: orders });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
