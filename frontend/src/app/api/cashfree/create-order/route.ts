import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders, services } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      reportSlug,
      amount: clientAmount,
      formData,
    } = body;

    // Validate required fields
    if (!firstName || !email || !phone || !reportSlug) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Use client-provided amount, or look up from DB
    let amount = clientAmount;
    if (!amount) {
      const [service] = await db
        .select()
        .from(services)
        .where(eq(services.slug, reportSlug))
        .limit(1);
      amount = service?.price ?? 249;
    }

    // Generate unique order ID
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // Get the origin for return URL
    const origin =
      req.headers.get("origin") ||
      req.headers.get("referer")?.replace(/\/[^/]*$/, "") ||
      "http://localhost:3000";
    const returnUrl = `${origin}/payment/status?order_id=${orderId}`;
    const notifyUrl = `${origin}/api/cashfree/webhook`;

    // Create order with Cashfree
    const orderRequest = {
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
        return_url: returnUrl,
        notify_url: notifyUrl,
      },
      order_note: `Report: ${reportSlug}`,
    };

    console.log("Creating Cashfree order with:", {
      env: process.env.NEXT_PUBLIC_CASHFREE_ENV,
      appId: process.env.CASHFREE_APP_ID?.substring(0, 8) + "...",
      orderId,
      amount,
    });

    const isProd =
      process.env.NEXT_PUBLIC_CASHFREE_ENV?.toUpperCase() === "PRODUCTION";
    const baseUrl = isProd
      ? "https://api.cashfree.com/pg"
      : "https://sandbox.cashfree.com/pg";

    const response = await fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": process.env.CASHFREE_APP_ID!,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
      },
      body: JSON.stringify(orderRequest),
    });

    const orderData = await response.json();

    if (!response.ok) {
      console.error("Cashfree API error:", {
        status: response.status,
        data: orderData,
      });
      return NextResponse.json(
        { error: orderData.message || "Failed to create order" },
        { status: response.status },
      );
    }

    // Save order to database
    await db.insert(orders).values({
      orderId: orderId,
      cfOrderId: orderData.cf_order_id?.toString() || null,
      paymentSessionId: orderData.payment_session_id || null,
      customerName: `${firstName} ${lastName || ""}`.trim(),
      customerEmail: email,
      customerPhone: phone,
      reportSlug: reportSlug,
      amount: amount,
      currency: "INR",
      status: "CREATED",
      formData: formData || null,
    });

    return NextResponse.json({
      paymentSessionId: orderData.payment_session_id,
      orderId: orderId,
      cfOrderId: orderData.cf_order_id,
    });
  } catch (error: unknown) {
    console.error("Error creating Cashfree order:", error);

    const message =
      error instanceof Error ? error.message : "Failed to create order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
