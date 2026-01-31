import { NextRequest, NextResponse } from 'next/server';
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

        // Handle User (Guest Checkout)
        // In a real app with Auth, we would get the user from the session.
        // Here we will find or create a user based on email.
        let userId = data.user;

        if (!userId && data.shippingAddress && data.shippingAddress.email) {
            const email = data.shippingAddress.email;
            let user = await User.findOne({ email });

            if (!user) {
                // Create a guest user
                // We generate a random password since they are guest
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
                state: data.shippingAddress.city, // Using city as state for simplified form
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
            status: 'pending', // Case sensitive enum match
        });

        return NextResponse.json({ success: true, data: order });
    } catch (error: any) {
        console.error('Order creation error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 }).limit(10);
        return NextResponse.json({ success: true, data: orders });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
