import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import User from '@/models/User';

/**
 * TEMPORARY ADMIN PROMOTION ENDPOINT
 * Use this ONCE to promote your account to admin, then DELETE this file for security
 * 
 * Usage: POST /api/promote-admin
 * Body: { "email": "your-email@example.com", "secret": "your-secret-key" }
 */

export async function POST(req: NextRequest) {
    try {
        const { email, secret } = await req.json();

        // Security check - use environment variable
        if (secret !== process.env.ADMIN_PROMOTION_SECRET) {
            return NextResponse.json(
                { success: false, message: 'Invalid secret key' },
                { status: 403 }
            );
        }

        if (!email) {
            return NextResponse.json(
                { success: false, message: 'Email is required' },
                { status: 400 }
            );
        }

        await dbConnect();

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        if (user.role === 'admin') {
            return NextResponse.json(
                { success: true, message: 'User is already an admin' }
            );
        }

        user.role = 'admin';
        await user.save();

        return NextResponse.json({
            success: true,
            message: `User ${email} has been promoted to admin`,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error: any) {
        console.error('Admin promotion error:', error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
