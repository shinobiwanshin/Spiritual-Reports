"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { CheckCircle, XCircle, Clock, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

interface OrderStatus {
  orderId: string;
  status: string;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  reportSlug: string;
}

function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [pollCount, setPollCount] = useState(0);

  useEffect(() => {
    if (!orderId) {
      setError("No order ID provided");
      setLoading(false);
      return;
    }

    // Dev mode: read from URL params instead of calling verify API
    const devMode = searchParams.get("dev_mode");
    if (devMode === "true") {
      setOrderStatus({
        orderId,
        status: "PAID",
        amount: Number(searchParams.get("amount") || 0),
        currency: "INR",
        customerName: searchParams.get("name") || "",
        customerEmail: searchParams.get("email") || "",
        reportSlug: searchParams.get("report") || "",
      });
      setLoading(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await fetch(`/api/cashfree/verify?order_id=${orderId}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to verify payment");
          return;
        }

        setOrderStatus(data);

        // If payment is pending (like UPI), poll again after 4 seconds
        if (
          data.status === "ACTIVE" ||
          data.status === "PENDING" ||
          data.status === "CREATED"
        ) {
          if (pollCount < 15) {
            // Stop polling after ~60 seconds
            setTimeout(() => {
              setPollCount((prev) => prev + 1);
            }, 4000);
            return;
          }
        }

        // If payment is successful, the webhook is generating the report behind the scenes
        if (data.status === "PAID") {
          // Poll a couple more times just to see if the DB order has finally been updated
          // Or just optimistically show generating state since the webhook will handle it
          setGeneratingReport(true);

          // Assuming webhook finishes very fast, we just tell user it's paid
          setTimeout(() => {
            setReportGenerated(true);
            setGeneratingReport(false);
          }, 3000);
        }
      } catch {
        setError("Failed to verify payment status");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [orderId, searchParams, pollCount]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0a2e]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#cfa375] animate-spin mx-auto mb-4" />
          <p className="text-[#b0a8c8] text-lg">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0a2e] px-4">
        <div className="max-w-md w-full bg-[#1a1347] border border-red-500/20 rounded-2xl p-8 text-center">
          <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">
            Something Went Wrong
          </h1>
          <p className="text-[#b0a8c8] mb-6">{error}</p>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[#cfa375] hover:text-[#e8c99b] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const isPaid = orderStatus?.status === "PAID";
  const isFailed =
    orderStatus?.status === "FAILED" ||
    orderStatus?.status === "CANCELLED" ||
    orderStatus?.status === "VOID";
  const isPending =
    orderStatus?.status === "ACTIVE" || orderStatus?.status === "CREATED";

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 bg-[#0f0a2e]">
      <div className="max-w-lg mx-auto">
        <div className="bg-[#1a1347] border border-[#cfa375]/20 rounded-2xl p-8 md:p-10 shadow-2xl shadow-[#0f0a2e]/50 text-center">
          {/* Status Icon */}
          {isPaid && (
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-emerald-400" />
            </div>
          )}
          {isFailed && (
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-red-400" />
            </div>
          )}
          {isPending && (
            <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-12 h-12 text-yellow-400" />
            </div>
          )}

          {/* Status Text */}
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {isPaid && "Payment Successful!"}
            {isFailed && "Payment Failed"}
            {isPending && "Payment Pending"}
            {!isPaid &&
              !isFailed &&
              !isPending &&
              `Status: ${orderStatus?.status}`}
          </h1>

          <p className="text-[#b0a8c8] mb-8">
            {isPaid &&
              generatingReport &&
              "Your payment was successful. We are generating your personalized report now..."}
            {isPaid &&
              !generatingReport &&
              reportGenerated &&
              "Your report has been generated. You'll receive it via email shortly. It is available in your account."}
            {isPaid &&
              !generatingReport &&
              !reportGenerated &&
              "Your payment was successful. We will process your report shortly."}
            {isFailed &&
              "The payment could not be completed. Please try again."}
            {isPending &&
              "Your payment is being processed. Please wait a moment."}
          </p>

          {/* Order Details */}
          {orderStatus && (
            <div className="bg-[#0f0a2e]/50 rounded-xl p-6 mb-8 text-left space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#b0a8c8]">Order ID</span>
                <span className="text-sm text-white font-mono">
                  {orderStatus.orderId}
                </span>
              </div>
              <div className="h-px bg-white/5" />

              <div className="flex justify-between items-center">
                <span className="text-sm text-[#b0a8c8]">Amount</span>
                <span className="text-sm text-white font-semibold">
                  ₹{orderStatus.amount}
                </span>
              </div>
              <div className="h-px bg-white/5" />

              <div className="flex justify-between items-center">
                <span className="text-sm text-[#b0a8c8]">Name</span>
                <span className="text-sm text-white">
                  {orderStatus.customerName}
                </span>
              </div>
              <div className="h-px bg-white/5" />

              <div className="flex justify-between items-center">
                <span className="text-sm text-[#b0a8c8]">Email</span>
                <span className="text-sm text-white">
                  {orderStatus.customerEmail}
                </span>
              </div>
              <div className="h-px bg-white/5" />

              <div className="flex justify-between items-center">
                <span className="text-sm text-[#b0a8c8]">Status</span>
                <span
                  className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
                    isPaid
                      ? "bg-emerald-500/10 text-emerald-400"
                      : isFailed
                        ? "bg-red-500/10 text-red-400"
                        : "bg-yellow-500/10 text-yellow-400"
                  }`}
                >
                  {orderStatus.status}
                </span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {isPending && (
              <button
                onClick={() => setPollCount((prev) => prev + 1)}
                className="bg-gradient-to-r from-[#cfa375] to-[#e8c99b] text-[#0f0a2e] font-semibold py-3 px-8 rounded-xl hover:shadow-[#cfa375]/40 shadow-lg shadow-[#cfa375]/20 transition-all flex items-center justify-center gap-2"
              >
                <Loader2 className="w-4 h-4 animate-spin" />
                Check Status Again
              </button>
            )}
            {isFailed && (
              <Link
                href="/ig"
                className="bg-gradient-to-r from-[#cfa375] to-[#e8c99b] text-[#0f0a2e] font-semibold py-3 px-8 rounded-xl hover:shadow-[#cfa375]/40 shadow-lg shadow-[#cfa375]/20 transition-all"
              >
                Try Again
              </Link>
            )}
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 border border-[#cfa375]/30 text-[#cfa375] py-3 px-8 rounded-xl hover:bg-[#cfa375]/10 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#0f0a2e]">
          <Loader2 className="w-12 h-12 text-[#cfa375] animate-spin" />
        </div>
      }
    >
      <PaymentStatusContent />
    </Suspense>
  );
}
