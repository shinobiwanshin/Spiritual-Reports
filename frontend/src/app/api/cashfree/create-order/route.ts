import { NextRequest, NextResponse } from "next/server";

const CASHFREE_BASE_URL =
  process.env.NEXT_PUBLIC_CASHFREE_ENV === "production"
    ? "https://api.cashfree.com/pg"
    : "https://sandbox.cashfree.com/pg";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      reportSlug,
      amount,
    } = body;

    if (!firstName || !email || !phone || !reportSlug || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const orderId = `order_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    const orderPayload = {
      order_id: orderId,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: `cust_${Date.now()}`,
        customer_name: `${firstName} ${lastName || ""}`.trim(),
        customer_email: email,
        customer_phone: phone,
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL || ""}/payment-return?order_id={order_id}`,
        notify_url: `${process.env.NEXT_PUBLIC_APP_URL || ""}/api/cashfree/webhook`,
      },
      order_tags: {
        report: reportSlug,
      },
    };

    const response = await fetch(`${CASHFREE_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": process.env.CASHFREE_APP_ID!,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
        "x-api-version": "2023-08-01",
      },
      body: JSON.stringify(orderPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Failed to create order" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      orderId: data.order_id,
      paymentSessionId: data.payment_session_id,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
