import { NextRequest, NextResponse } from "next/server";
import { Cashfree, CFEnvironment } from "cashfree-pg";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";

function getCashfree() {
  return new Cashfree(
    process.env.NEXT_PUBLIC_CASHFREE_ENV === "PRODUCTION"
      ? CFEnvironment.PRODUCTION
      : CFEnvironment.SANDBOX,
    process.env.CASHFREE_APP_ID,
    process.env.CASHFREE_SECRET_KEY,
  );
}

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

    // Fetch order status from Cashfree
    const cashfree = getCashfree();
    const response = await cashfree.PGFetchOrder(orderId);
    const cfOrder = response.data;

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
