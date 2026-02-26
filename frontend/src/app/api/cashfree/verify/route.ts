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

    // Fetch our order record for additional details first before potential deletion
    const [dbOrder] = await db
      .select()
      .from(orders)
      .where(eq(orders.orderId, orderId))
      .limit(1);

    const isFailed =
      paymentStatus === "FAILED" ||
      paymentStatus === "USER_DROPPED" ||
      paymentStatus === "CANCELLED" ||
      paymentStatus === "VOID";

    let finalStatus = paymentStatus;

    if (isFailed) {
      // Delete the order instead of storing a failed one
      await db.delete(orders).where(eq(orders.orderId, orderId));
    } else if (
      paymentStatus === "ACTIVE" ||
      paymentStatus === "CREATED" ||
      paymentStatus === "PENDING"
    ) {
      // Check if order is older than 30 minutes (1800000 ms)
      if (dbOrder && dbOrder.createdAt) {
        const ageMs =
          new Date().getTime() - new Date(dbOrder.createdAt).getTime();
        if (ageMs > 30 * 60 * 1000) {
          finalStatus = "EXPIRED";
          // Expired/abandoned orders should also be cleaned up
          await db.delete(orders).where(eq(orders.orderId, orderId));
        }
      }
    } else {
      // Update order in our database
      await db
        .update(orders)
        .set({
          status: finalStatus,
          updatedAt: new Date(),
        })
        .where(eq(orders.orderId, orderId));
    }

    return NextResponse.json({
      orderId: orderId,
      status: finalStatus,
      amount: cfOrder.order_amount,
      currency: cfOrder.order_currency,
      customerName:
        dbOrder?.customerName || cfOrder.customer_details?.customer_name,
      customerEmail:
        dbOrder?.customerEmail || cfOrder.customer_details?.customer_email,
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
