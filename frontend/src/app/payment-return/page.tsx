"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

type PaymentStatus = "loading" | "success" | "failed";

export default function PaymentReturnPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [status, setStatus] = useState<PaymentStatus>("loading");

  useEffect(() => {
    async function verifyPayment() {
      if (!orderId) {
        setStatus("failed");
        return;
      }

      try {
        const res = await fetch(
          `/api/cashfree/verify-payment?order_id=${orderId}`
        );
        const data = await res.json();

        if (res.ok && data.status === "PAID") {
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch {
        setStatus("failed");
      }
    }

    verifyPayment();
  }, [orderId]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0f0a2e]">
      <div className="bg-[#1a1347] border border-[#cfa375]/20 rounded-2xl p-10 max-w-md w-full text-center shadow-2xl shadow-[#0f0a2e]/50">
        {status === "loading" && (
          <>
            <Loader2 className="w-16 h-16 text-[#cfa375] mx-auto mb-6 animate-spin" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Verifying Payment…
            </h2>
            <p className="text-[#b0a8c8]">Please wait a moment.</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Payment Successful!
            </h2>
            <p className="text-[#b0a8c8] mb-8">
              Your report is being prepared. You will receive it on your
              registered email shortly.
            </p>
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-[#cfa375] to-[#b8894f] hover:from-[#e8c99b] hover:to-[#cfa375] text-[#0f0a2e] font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-[#cfa375]/20"
            >
              Return Home
            </Link>
          </>
        )}

        {status === "failed" && (
          <>
            <XCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Payment Failed
            </h2>
            <p className="text-[#b0a8c8] mb-8">
              Your payment could not be completed. Please try again.
            </p>
            <Link
              href="/ig"
              className="inline-block bg-gradient-to-r from-[#cfa375] to-[#b8894f] hover:from-[#e8c99b] hover:to-[#cfa375] text-[#0f0a2e] font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-[#cfa375]/20"
            >
              Try Again
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
