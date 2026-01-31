import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken, generatePassword, getTimestamp } from '@/lib/mpesa';

export async function POST(req: NextRequest) {
    try {
        const { phoneNumber, amount } = await req.json();

        // Format phone number (must start with 254)
        const formattedPhone = phoneNumber.startsWith('0')
            ? `254${phoneNumber.slice(1)}`
            : phoneNumber;

        const accessToken = await getAccessToken();
        const shortcode = process.env.MPESA_SHORTCODE || "174379"; // Sandbox default
        const passkey = process.env.MPESA_PASSKEY || "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"; // Sandbox default
        const timestamp = getTimestamp();
        const password = generatePassword(shortcode, passkey, timestamp);

        const stkPushUrl = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
        const callbackUrl = process.env.MPESA_CALLBACK_URL || "https://mydomain.com/api/mpesa/callback";

        const requestBody = {
            BusinessShortCode: shortcode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: Math.ceil(amount), // Amount must be integer
            PartyA: formattedPhone,
            PartyB: shortcode,
            PhoneNumber: formattedPhone,
            CallBackURL: callbackUrl,
            AccountReference: "MirallTech",
            TransactionDesc: "Payment for Electronics",
        };

        const response = await fetch(stkPushUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        if (data.ResponseCode === "0") {
            return NextResponse.json({ success: true, message: "STK Push sent", data });
        } else {
            return NextResponse.json({ success: false, message: "Failed to send STK Push", error: data }, { status: 400 });
        }

    } catch (error) {
        console.error("STK Push error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
