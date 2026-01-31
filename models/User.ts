import mongoose, { Schema, models, Model } from 'mongoose';

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    address?: {
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        country?: string;
    };
    phone?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters'],
            select: false, // Don't return password by default
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        address: {
            street: String,
            city: String,
            state: String,
            zipCode: String,
            country: String,
        },
        phone: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

// Create index for email lookups
UserSchema.index({ email: 1 });

const User: Model<IUser> = models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
