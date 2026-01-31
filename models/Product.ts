import mongoose, { Schema, models, Model } from 'mongoose';

export interface IProduct {
    _id?: string;
    name: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    images: string[];
    specifications: Record<string, Record<string, string>>;
    features: string[];
    stock: number;
    featured: boolean;
    rating: number;
    numReviews: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const ProductSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
            maxlength: [200, 'Product name cannot exceed 200 characters'],
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
            maxlength: [2000, 'Description cannot exceed 2000 characters'],
        },
        price: {
            type: Number,
            required: [true, 'Product price is required'],
            min: [0, 'Price cannot be negative'],
        },
        category: {
            type: String,
            required: [true, 'Product category is required'],
            enum: ['Smartphones', 'Laptops', 'Tablets', 'Accessories', 'Audio', 'Cameras', 'Gaming', 'Wearables'],
        },
        brand: {
            type: String,
            required: [true, 'Product brand is required'],
            trim: true,
        },
        images: {
            type: [String],
            required: [true, 'At least one product image is required'],
            validate: {
                validator: function (v: string[]) {
                    return v && v.length > 0;
                },
                message: 'Product must have at least one image',
            },
        },
        specifications: {
            type: Map,
            of: Map, // Allow nested map for categories
            default: {},
        },
        features: {
            type: [String],
            default: [],
        },
        stock: {
            type: Number,
            required: [true, 'Stock quantity is required'],
            min: [0, 'Stock cannot be negative'],
            default: 0,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        rating: {
            type: Number,
            default: 0,
            min: [0, 'Rating cannot be less than 0'],
            max: [5, 'Rating cannot exceed 5'],
        },
        numReviews: {
            type: Number,
            default: 0,
            min: [0, 'Number of reviews cannot be negative'],
        },
    },
    {
        timestamps: true,
    }
);

// Create indexes for better query performance
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ category: 1, price: 1 });
ProductSchema.index({ brand: 1 });
ProductSchema.index({ featured: 1 });

const Product: Model<IProduct> = models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
