import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
    storeName: {
        type: String,
        default: 'Mirall Technology',
    },
    supportEmail: {
        type: String,
        default: 'support@mirall.com',
    },
    currency: {
        type: String,
        default: 'KES',
    },
    taxRate: {
        type: Number,
        default: 16,
    },
    shippingFee: {
        type: Number,
        default: 250,
    },
    minOrderFreeShipping: {
        type: Number,
        default: 10000,
    }
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
