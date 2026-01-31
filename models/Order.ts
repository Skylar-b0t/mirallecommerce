import mongoose, { Schema, models, Model } from 'mongoose';

export interface IOrderItem {
    product: mongoose.Types.ObjectId | string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

export interface IOrder {
    _id?: string;
    user: mongoose.Types.ObjectId | string;
    items: IOrderItem[];
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    paymentMethod: string;
    paymentResult?: {
        id: string;
        status: string;
        email: string;
    };
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: Date;
    isDelivered: boolean;
    deliveredAt?: Date;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt?: Date;
    updatedAt?: Date;
}

const OrderSchema = new Schema<IOrder>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
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
                },
            },
        ],
        shippingAddress: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        paymentMethod: {
            type: String,
            required: true,
            default: 'stripe',
        },
        paymentResult: {
            id: String,
            status: String,
            email: String,
            update_time: String,
        },
        itemsPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        taxPrice: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        shippingPrice: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        totalPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        paidAt: Date,
        isDelivered: {
            type: Boolean,
            required: true,
            default: false,
        },
        deliveredAt: Date,
        status: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

// Create indexes for better query performance
OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ status: 1 });

const Order: Model<IOrder> = models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
