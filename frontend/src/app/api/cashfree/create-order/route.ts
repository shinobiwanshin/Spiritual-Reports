import { NextRequest, NextResponse } from "next/server";
import { Cashfree, CFEnvironment } from "cashfree-pg";
import { db } from "@/db";
import { orders, services } from "@/db/schema";
import { eq } from "drizzle-orm";

// Initialize Cashfree on each request to pick up fresh env vars
function getCashfree() {
  return new Cashfree(
    process.env.NEXT_PUBLIC_CASHFREE_ENV === "PRODUCTION"
      ? CFEnvironment.PRODUCTION
      : CFEnvironment.SANDBOX,
    process.env.CASHFREE_APP_ID,
    process.env.CASHFREE_SECRET_KEY,
  );
}

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
      },
      order_note: `Report: ${reportSlug}`,
    };

    console.log("Creating Cashfree order with:", {
      env: process.env.NEXT_PUBLIC_CASHFREE_ENV,
      appId: process.env.CASHFREE_APP_ID?.substring(0, 8) + "...",
      orderId,
      amount,
    });

    const cashfree = getCashfree();
    const response = await cashfree.PGCreateOrder(orderRequest);
    const orderData = response.data;

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
    // Log detailed Cashfree error response
    const axiosError = error as {
      response?: { data?: unknown; status?: number };
    };
    if (axiosError?.response) {
      console.error("Cashfree API error:", {
        status: axiosError.response.status,
        data: JSON.stringify(axiosError.response.data),
      });
    } else {
      console.error("Error creating Cashfree order:", error);
    }

    const cfMessage = axiosError?.response?.data;
    const message =
      typeof cfMessage === "object" &&
      cfMessage !== null &&
      "message" in cfMessage
        ? String((cfMessage as { message: string }).message)
        : error instanceof Error
          ? error.message
          : "Failed to create order";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
