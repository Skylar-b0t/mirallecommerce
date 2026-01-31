import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/mongodb';
import Order from '@/models/Order';

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        console.log("M-Pesa Callback Data:", JSON.stringify(data, null, 2));

        const { Body } = data;
        const { stkCallback } = Body;

        if (stkCallback.ResultCode === 0) {
            // Payment Successful
            const checkoutRequestID = stkCallback.CheckoutRequestID;
            const amount = stkCallback.CallbackMetadata.Item.find((item: any) => item.Name === 'Amount').Value;
            const mpesaReceiptNumber = stkCallback.CallbackMetadata.Item.find((item: any) => item.Name === 'MpesaReceiptNumber').Value;
            const phoneNumber = stkCallback.CallbackMetadata.Item.find((item: any) => item.Name === 'PhoneNumber').Value;

            await dbConnect();

            // Find order by CheckoutRequestID (we need to store this when initiating payment)
            // For now, we might need to rely on metadata or just log it if we didn't store the ID.
            // A robust implementation would store the CheckoutRequestID in the Order model first.

            // Assuming we updated the Order model to store 'paymentResult.id' as the CheckoutRequestID
            const order = await Order.findOne({ 'paymentResult.id': checkoutRequestID });

            if (order) {
                order.isPaid = true;
                order.paidAt = new Date();
                order.paymentResult = {
                    id: checkoutRequestID,
                    status: 'COMPLETED',
                    email: mpesaReceiptNumber, // Storing receipt number in email field
                };
                await order.save();
                console.log(`Order ${order._id} marked as paid.`);
            } else {
                console.warn(`Order not found for CheckoutRequestID: ${checkoutRequestID}`);
            }

            return NextResponse.json({ success: true });
        } else {
            // Payment Failed/Cancelled
            console.warn("M-Pesa payment failed or cancelled");
            return NextResponse.json({ success: true }); // Acknowledge receipt anyway
        }
    } catch (error) {
        console.error("Callback error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
