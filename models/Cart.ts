import mongoose, { Schema, models, Model } from 'mongoose';

export interface ICartItem {
    product: mongoose.Types.ObjectId | string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    stock: number;
}

export interface ICart {
    _id?: string;
    user: mongoose.Types.ObjectId | string;
    items: ICartItem[];
    createdAt?: Date;
    updatedAt?: Date;
}

const CartSchema = new Schema<ICart>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                image: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                    min: 0,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                    default: 1,
                },
                stock: {
                    type: Number,
                    required: true,
                    min: 0,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Create index for user lookups
CartSchema.index({ user: 1 });

const Cart: Model<ICart> = models.Cart || mongoose.model<ICart>('Cart', CartSchema);

export default Cart;
