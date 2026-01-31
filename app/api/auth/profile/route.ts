import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/route';
import dbConnect from '@/lib/db/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function PUT(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { name, password, email } = await req.json();

        if (!name && !password) {
            return NextResponse.json({ message: 'Nothing to update' }, { status: 400 });
        }

        await dbConnect();

        const user = await User.findById((session.user as any).id);

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Update Name
        if (name) {
            user.name = name;
        }

        // Update Email (Optional, risky without verification)
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return NextResponse.json({ message: 'Email already in use' }, { status: 400 });
            }
            user.email = email;
        }

        // Update Password
        if (password) {
            if (password.length < 6) {
                return NextResponse.json({ message: 'Password must be at least 6 characters' }, { status: 400 });
            }
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        return NextResponse.json({
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error: any) {
        console.error('Profile update error:', error);
        return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
