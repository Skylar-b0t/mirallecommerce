import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import User from '@/models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        // Simple security check (middleware covers mostly, but double check)
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const totalRevenue = await Order.aggregate([
            { $match: { isPaid: true } },
            { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]);

        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalUsers = await User.countDocuments();

        const recentOrders = await Order.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 })
            .limit(5);

        return NextResponse.json({
            success: true,
            data: {
                totalRevenue: totalRevenue[0]?.total || 0,
                totalOrders,
                totalProducts,
                totalUsers,
                recentOrders
            }
        });

    } catch (error: any) {
        console.error('Admin Stats Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
