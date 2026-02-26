import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    // Get the raw body for signature verification
    const rawBody = await req.text();

    // Extract webhook headers
    const signature = req.headers.get("x-webhook-signature") || "";
    const timestamp = req.headers.get("x-webhook-timestamp") || "";

    if (!signature || !timestamp) {
      console.error("Missing webhook signature or timestamp headers");
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // Verify webhook signature manually using crypto
    try {
      const generatedSignature = crypto
        .createHmac("sha256", process.env.CASHFREE_SECRET_KEY as string)
        .update(timestamp + rawBody)
        .digest("base64");

      if (generatedSignature !== signature) {
        throw new Error("Signature mismatch");
      }
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Process the webhook event
    const eventData = JSON.parse(rawBody);
    const data = eventData.data as Record<string, unknown> | undefined;
    const orderData = data?.order as Record<string, unknown> | undefined;

    if (orderData) {
      const orderId = orderData.order_id as string | undefined;
      const orderStatus = orderData.order_status as string | undefined;

      if (orderId && orderStatus) {
        // Update the order status in our database (idempotent)
        await db
          .update(orders)
          .set({
            status: orderStatus,
            updatedAt: new Date(),
          })
          .where(eq(orders.orderId, orderId));

        console.log(
          `Webhook: Order ${orderId} updated to status ${orderStatus}`,
        );
      }
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ status: "ok" });
  } catch (error: unknown) {
    console.error("Webhook processing error:", error);
    // Return 200 even on internal errors to prevent Cashfree retries for bad code
    return NextResponse.json({ status: "ok" });
  }
}
