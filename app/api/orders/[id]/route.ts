import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import dbConnect from '@/lib/db/mongodb';
import Order from '@/models/Order';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { id } = await params;

        const order = await Order.findById(id).populate('user', 'name email');

        if (!order) {
            return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
        }

        // Security check: Allow if admin OR if order belongs to user
        if ((session.user as any).role !== 'admin' && order.user._id.toString() !== (session.user as any).id) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 });
        }

        return NextResponse.json({ success: true, data: order });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        // Only admins can update order status via this route
        if (!session || (session.user as any).role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { id } = await params;
        const data = await req.json();

        const order = await Order.findById(id);

        if (!order) {
            return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
        }

        // Update fields if provided
        if (data.status) order.status = data.status;
        if (typeof data.isPaid === 'boolean') {
            order.isPaid = data.isPaid;
            if (data.isPaid && !order.paidAt) order.paidAt = new Date();
        }
        if (typeof data.isDelivered === 'boolean') {
            order.isDelivered = data.isDelivered;
            if (data.isDelivered && !order.deliveredAt) order.deliveredAt = new Date();
        }

        const updatedOrder = await order.save();

        return NextResponse.json({ success: true, data: updatedOrder });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
