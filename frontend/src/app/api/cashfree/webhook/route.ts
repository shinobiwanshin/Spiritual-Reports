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
    console.log("WEBHOOK BODY:", JSON.stringify(eventData, null, 2));

    const type = eventData.type;
    const data = eventData.data as Record<string, unknown> | undefined;
    const orderData = data?.order as Record<string, unknown> | undefined;
    const paymentData = data?.payment as Record<string, unknown> | undefined;

    let orderId = orderData?.order_id as string | undefined;
    let newStatus = "UNKNOWN";

    if (
      type === "PAYMENT_SUCCESS_WEBHOOK" &&
      paymentData?.payment_status === "SUCCESS"
    ) {
      newStatus = "PAID";
    } else if (orderData?.order_status) {
      newStatus = orderData.order_status as string;
    }

    if (orderId && newStatus !== "UNKNOWN") {
      // Update the order status in our database
      await db
        .update(orders)
        .set({
          status: newStatus,
          updatedAt: new Date(),
        })
        .where(eq(orders.orderId, orderId));

      console.log(`Webhook: Order ${orderId} updated to status ${newStatus}`);

      // If PAID, trigger report generation
      if (newStatus === "PAID") {
        const [dbOrder] = await db
          .select()
          .from(orders)
          .where(eq(orders.orderId, orderId))
          .limit(1);

        if (dbOrder && dbOrder.formData) {
          console.log(
            `Webhook: Triggering report generation for Order ${orderId}`,
          );
          try {
            const reportUrl = new URL(
              "/api/report/generate",
              req.url,
            ).toString();
            const reportRes = await fetch(reportUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(dbOrder.formData),
            });

            if (!reportRes.ok) {
              console.error(
                `Webhook: Failed to generate report for ${orderId}`,
                await reportRes.text(),
              );
            } else {
              console.log(
                `Webhook: Successfully generated report for ${orderId}`,
              );
            }
          } catch (genErr) {
            console.error(
              `Webhook: Error fetching report generation for ${orderId}`,
              genErr,
            );
          }
        } else {
          console.warn(`Webhook: No formData found for Order ${orderId}`);
        }
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
