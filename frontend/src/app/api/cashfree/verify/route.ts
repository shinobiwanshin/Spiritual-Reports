import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("order_id");

    if (!orderId) {
      return NextResponse.json(
        { error: "order_id is required" },
        { status: 400 },
      );
    }

    const isProd = process.env.NEXT_PUBLIC_CASHFREE_ENV === "PRODUCTION";
    const baseUrl = isProd
      ? "https://api.cashfree.com/pg"
      : "https://sandbox.cashfree.com/pg";

    const response = await fetch(`${baseUrl}/orders/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": process.env.CASHFREE_APP_ID!,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
      },
      cache: "no-store",
    });

    const cfOrder = await response.json();

    if (!response.ok) {
      console.error("Cashfree API error:", cfOrder);
      return NextResponse.json(
        { error: cfOrder.message || "Failed to fetch order status" },
        { status: response.status },
      );
    }

    // Determine payment status
    const paymentStatus = cfOrder.order_status || "UNKNOWN";

    // Update order in our database
    await db
      .update(orders)
      .set({
        status: paymentStatus,
        updatedAt: new Date(),
      })
      .where(eq(orders.orderId, orderId));

    // Fetch our order record for additional details
    const [dbOrder] = await db
      .select()
      .from(orders)
      .where(eq(orders.orderId, orderId))
      .limit(1);

    return NextResponse.json({
      orderId: orderId,
      status: paymentStatus,
      amount: cfOrder.order_amount,
      currency: cfOrder.order_currency,
      customerName: dbOrder?.customerName,
      customerEmail: dbOrder?.customerEmail,
      reportSlug: dbOrder?.reportSlug,
      formData: dbOrder?.formData,
    });
  } catch (error: unknown) {
    console.error("Error verifying Cashfree order:", error);

    const message =
      error instanceof Error ? error.message : "Failed to verify order";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
