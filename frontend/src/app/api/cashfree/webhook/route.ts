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
      const isFailed =
        newStatus === "FAILED" ||
        newStatus === "USER_DROPPED" ||
        newStatus === "CANCELLED" ||
        newStatus === "VOID";

      if (isFailed) {
        // Delete the order instead of storing a failed one
        await db.delete(orders).where(eq(orders.orderId, orderId));
        console.log(
          `Webhook: Order ${orderId} deleted due to failed status ${newStatus}`,
        );
      } else {
        // Update the order status in our database
        await db
          .update(orders)
          .set({
            status: newStatus,
            updatedAt: new Date(),
          })
          .where(eq(orders.orderId, orderId));

        console.log(`Webhook: Order ${orderId} updated to status ${newStatus}`);
      }

      // If PAID, trigger report generation
      if (newStatus === "PAID") {
        const [dbOrder] = await db
          .select()
          .from(orders)
          .where(eq(orders.orderId, orderId))
          .limit(1);

        if (dbOrder && dbOrder.formData) {
          console.log(`Webhook: Processing CAPI tracking and report generation for Order ${orderId}`);
          
          // Execute CAPI Tracking Event
          try {
            const hashData = (str: string | null) => str ? crypto.createHash("sha256").update(str.trim().toLowerCase()).digest("hex") : undefined;
            const metaCapiData = (dbOrder.formData as any).metaCapiData || {};
            
            const eventPayload = {
              data: [
                {
                  event_name: "Purchase",
                  event_time: Math.floor(Date.now() / 1000),
                  event_id: dbOrder.orderId,
                  action_source: "website",
                  user_data: {
                    client_ip_address: metaCapiData.clientIpAddress || undefined,
                    client_user_agent: metaCapiData.clientUserAgent || undefined,
                    external_id: [hashData(dbOrder.customerEmail)],
                    em: [hashData(dbOrder.customerEmail)],
                    ph: [hashData(dbOrder.customerPhone || "")].filter(Boolean),
                    fn: [hashData(dbOrder.customerName?.split(" ")[0] || "")].filter(Boolean),
                    fbc: metaCapiData.fbc || undefined,
                    fbp: metaCapiData.fbp || undefined,
                  },
                  custom_data: {
                    currency: dbOrder.currency || "INR",
                    value: dbOrder.amount,
                  }
                }
              ]
            };

            const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || "956360896845471";
            const capiToken = process.env.META_CAPI_TOKEN;

            if (capiToken) {
              const capiRes = await fetch(`https://graph.facebook.com/v25.0/${pixelId}/events?access_token=${capiToken}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(eventPayload),
              });
              const data = await capiRes.json();
              if (!capiRes.ok) {
                console.error(`Webhook: Failed to send CAPI event for Order ${orderId}`, data);
              } else {
                console.log(`Webhook: Sent CAPI Purchase event for Order ${orderId}`, data);
              }
            } else {
              console.warn("Webhook: META_CAPI_TOKEN is missing. Server CAPI tracking skipped.");
            }
          } catch (capiErr) {
            console.error("Webhook: Failed to execute CAPI logic:", capiErr);
          }

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
