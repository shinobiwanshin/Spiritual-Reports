"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  Mail,
  Smartphone,
  User,
  CheckCircle,
  Sparkles,
  Star,
  ShieldCheck,
  ArrowRight,
  FileText,
  Timer,
  Lock,
  Send,
  Loader2,
  ChevronRight,
} from "lucide-react";
import VideoBackground from "@/components/VideoBackground";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { getIcon } from "@/lib/icon-map";
import { load } from "@cashfreepayments/cashfree-js";

/* ───────────────────────────── Types ───────────────────────────── */

export interface ServiceVariant {
  id: number;
  slug: string;
  duration: string;
  title: string;
  subtitle: string;
  price: number;
  description: string;
  highlights: string[];
  iconName: string;
  accent: string;
  featured: boolean | null;
}

/* ──────────────────────────────── Component ──────────────────────────────── */

export default function ReportClient({
  services,
  currentSlug,
}: {
  services: ServiceVariant[];
  currentSlug: string;
}) {
  const router = useRouter();

  // Find the current service by slug
  const currentIndex = services.findIndex((s) => s.slug === currentSlug);
  const selected = services[currentIndex >= 0 ? currentIndex : 0];
  const SelectedIcon = getIcon(selected.iconName);

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [amPm, setAmPm] = useState("AM");
  const [birthPlace, setBirthPlace] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Geo autocomplete state
  type GeoResult = {
    name: string;
    completeName: string;
    latitude: number;
    longitude: number;
    timezoneOffset: number;
    timezone: string;
    country: string;
  };
  const [geoResults, setGeoResults] = useState<GeoResult[]>([]);
  const [showGeoDropdown, setShowGeoDropdown] = useState(false);
  const [selectedGeo, setSelectedGeo] = useState<GeoResult | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const geoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const geoDropdownRef = useRef<HTMLDivElement>(null);

  // Debounced geo search
  const searchGeo = useCallback((query: string) => {
    if (geoTimerRef.current) clearTimeout(geoTimerRef.current);
    if (query.trim().length < 2) {
      setGeoResults([]);
      setShowGeoDropdown(false);
      return;
    }
    geoTimerRef.current = setTimeout(async () => {
      setGeoLoading(true);
      try {
        const res = await fetch("/api/geo-search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ location: query }),
        });
        if (res.status === 429) {
          setError("Rate limit exceeded. Please type slower or wait a moment.");
          setGeoResults([]);
          return;
        }
        const data = await res.json();
        setGeoResults(Array.isArray(data) ? data : []);
        setShowGeoDropdown(true);
      } catch {
        setGeoResults([]);
      } finally {
        setGeoLoading(false);
      }
    }, 800);
  }, []);

  const handleBirthPlaceChange = (value: string) => {
    setBirthPlace(value);
    setSelectedGeo(null);
    searchGeo(value);
  };

  const selectGeoResult = (geo: GeoResult) => {
    setBirthPlace(geo.completeName);
    setSelectedGeo(geo);
    setShowGeoDropdown(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        geoDropdownRef.current &&
        !geoDropdownRef.current.contains(e.target as Node)
      ) {
        setShowGeoDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Basic validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !day ||
      !month ||
      !year ||
      !hour ||
      !minute ||
      !amPm ||
      !birthPlace
    ) {
      setError("Please fill in all details.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Determine report duration from selected variant
      const durationMap: Record<string, number> = {
        "1-year": 1,
        "3-year": 3,
        "5-year": 5,
        "1 year": 1,
        "3 years": 3,
        "5 years": 5,
      };
      const duration = durationMap[selected.duration.toLowerCase()] || 1;

      let cashfree;
      try {
        const isProd =
          process.env.NEXT_PUBLIC_CASHFREE_ENV?.toUpperCase() === "PRODUCTION";
        cashfree = await load({
          mode: isProd ? "production" : "sandbox",
        });
      } catch (err) {
        throw new Error("Failed to initialize payment gateway");
      }

      // Call create-order API — linked to THIS specific report
      const response = await fetch("/api/cashfree/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          reportSlug: selected.slug,
          amount: selected.price,
          formData: {
            firstName,
            lastName,
            email,
            phone,
            dateOfBirth: { day, month, year },
            timeOfBirth: { hour, minute, amPm },
            birthPlace,
            duration,
            ...(selectedGeo && {
              latitude: selectedGeo.latitude,
              longitude: selectedGeo.longitude,
              timezoneOffset: selectedGeo.timezoneOffset,
            }),
          },
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create order");
      }

      if (data.paymentSessionId) {
        let checkoutOptions = {
          paymentSessionId: data.paymentSessionId,
          returnUrl: `${window.location.origin}/payment/status?order_id=${data.orderId}`,
          redirectTarget: "_self" as const,
        };
        await cashfree.checkout(checkoutOptions);
      } else {
        throw new Error("Payment session ID not found.");
      }

      setIsSubmitting(false);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      setIsSubmitting(false);
    }
  };

  /* ──────────── Input class helpers ──────────── */
  const inputCls =
    "w-full bg-[#0f0a2e]/60 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/25 focus:outline-none focus:border-[#cfa375]/50 focus:ring-1 focus:ring-[#cfa375]/20 transition-all text-sm";
  const inputWithIconCls = `${inputCls} pl-11`;
  const selectCls =
    "w-full bg-[#0f0a2e]/60 border border-white/10 rounded-xl py-3 px-4 text-white/80 focus:outline-none focus:border-[#cfa375]/50 focus:ring-1 focus:ring-[#cfa375]/20 appearance-none text-sm transition-all";
  const labelCls =
    "text-xs text-[#cfa375] font-semibold uppercase tracking-wider pl-1";

  return (
    <div className="min-h-screen bg-[#0f0a2e] text-white relative overflow-hidden">
      {/* Video background */}
      <div className="fixed inset-0 z-0">
        <VideoBackground overlayOpacity={0.6} src="/output-1080p.mp4" />
      </div>

      {/* ─── Breadcrumb ─── */}
      <div className="relative z-10 pt-24 pb-4 px-6">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-white/40">
            <Link href="/" className="hover:text-white/60 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/ig" className="hover:text-white/60 transition-colors">
              Reports
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#cfa375]">{selected.title}</span>
          </nav>
        </div>
      </div>

      {/* ─── Main Content: Split Layout ─── */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* ── LEFT: Report Details (2/5) ── */}
            <div className="lg:col-span-2 space-y-6">
              {/* Report Header */}
              <div className="animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#cfa375]/10 border border-[#cfa375]/20 mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-[#cfa375]" />
                  <span className="text-xs font-semibold text-[#cfa375] uppercase tracking-wider">
                    {selected.duration} Report
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-2">
                  {selected.title}
                </h1>
                <p className="text-[#cfa375] font-medium text-sm mb-4">
                  {selected.subtitle}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-bold text-white">
                    ₹{selected.price}
                  </span>
                  <span className="text-sm text-white/40">/report</span>
                </div>

                <p className="text-[#b0a8c8] text-sm leading-relaxed">
                  {selected.description}
                </p>
              </div>

              {/* Highlights Card */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 backdrop-blur-sm animate-fade-in-up">
                <h3 className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-4">
                  What's Included
                </h3>
                <ul className="space-y-3">
                  {selected.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#cfa375]" />
                      <span className="text-sm text-[#b0a8c8]">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust indicators */}
              <div className="grid grid-cols-2 gap-3 animate-fade-in-up">
                {[
                  {
                    icon: Star,
                    label: "4.9/5 Rating",
                    cols: "col-span-1 md:col-span-1",
                  },
                  {
                    icon: ShieldCheck,
                    label: "100+ orders in the last 24 hours",
                    cols: "col-span-2 text-[13px] md:col-span-1 md:text-xs",
                    highlight: true,
                  },
                  {
                    icon: FileText,
                    label: `${selected.duration.toLowerCase().includes("1") ? "30" : selected.duration.toLowerCase().includes("3") ? "50" : "80"}+ Page Report`,
                    cols: "col-span-1 md:col-span-1",
                  },
                  {
                    icon: Send,
                    label: "Delivered via Email",
                    cols: "col-span-1 md:col-span-1",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2.5 px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-xs ${item.cols} ${item.highlight ? "text-white font-semibold border-white/10 bg-white/[0.05]" : "text-white/50"}`}
                  >
                    <item.icon
                      className={
                        item.highlight
                          ? "w-5 h-5 text-[#10b981]"
                          : "w-4 h-4 text-[#cfa375]/60"
                      }
                    />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Plan Switcher */}
              {services.length > 1 && (
                <div className="animate-fade-in-up">
                  <h3 className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-3">
                    Other Plans
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => {
                      const isActive = s.slug === currentSlug;
                      return (
                        <button
                          key={s.id}
                          onClick={() => {
                            if (!isActive) router.push(`/ig/${s.slug}`);
                          }}
                          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                            isActive
                              ? "bg-[#cfa375] text-[#0f0a2e] shadow-lg shadow-[#cfa375]/20"
                              : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white/70"
                          }`}
                        >
                          {s.title} — ₹{s.price}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* ── RIGHT: Form (3/5) ── */}
            <div className="lg:col-span-3">
              <div className="bg-[#1a1347]/80 border border-[#cfa375]/15 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/30 backdrop-blur-md animate-fade-in-up">
                {/* Form header */}
                <div className="text-center mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#cfa375]/20 to-[#cfa375]/5 flex items-center justify-center mx-auto mb-4">
                    <SelectedIcon className="w-7 h-7 text-[#cfa375]" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1">
                    Enter Your Birth Details
                  </h2>
                  <p className="text-[#b0a8c8] text-xs">
                    Accurate details enable precise Vedic analysis
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-5 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-sm text-center">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name fields */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className={labelCls}>First Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 w-4 h-4 text-white/30" />
                        <input
                          type="text"
                          placeholder="Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          className={inputWithIconCls}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className={labelCls}>Last Name</label>
                      <input
                        type="text"
                        placeholder="Surname"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-1.5">
                    <label className={labelCls}>Date of Birth</label>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3.5 w-3.5 h-3.5 text-white/30" />
                        <select
                          value={day}
                          onChange={(e) => setDay(e.target.value)}
                          required
                          className={`${selectCls} pl-9`}
                        >
                          <option value="">Day</option>
                          {Array.from({ length: 31 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        required
                        className={selectCls}
                      >
                        <option value="">Month</option>
                        {[
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                        ].map((m, i) => (
                          <option key={m} value={i + 1}>
                            {m}
                          </option>
                        ))}
                      </select>
                      <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                        className={selectCls}
                      >
                        <option value="">Year</option>
                        {Array.from({ length: 100 }, (_, i) => (
                          <option key={2026 - i} value={2026 - i}>
                            {2026 - i}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Time of Birth */}
                  <div className="space-y-1.5">
                    <label className={labelCls}>Time of Birth</label>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="relative">
                        <Clock className="absolute left-3 top-3.5 w-3.5 h-3.5 text-white/30" />
                        <select
                          value={hour}
                          onChange={(e) => setHour(e.target.value)}
                          required
                          className={`${selectCls} pl-9`}
                        >
                          <option value="">Hr</option>
                          {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <select
                        value={minute}
                        onChange={(e) => setMinute(e.target.value)}
                        required
                        className={selectCls}
                      >
                        <option value="">Min</option>
                        {Array.from({ length: 60 }, (_, i) => (
                          <option key={i} value={i}>
                            {i.toString().padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                      <select
                        value={amPm}
                        onChange={(e) => setAmPm(e.target.value)}
                        required
                        className={selectCls}
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Place of Birth — Autocomplete */}
                  <div className="space-y-1.5" ref={geoDropdownRef}>
                    <label className={labelCls}>Place of Birth</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-white/30" />
                      <input
                        type="text"
                        placeholder="Type city name..."
                        value={birthPlace}
                        onChange={(e) => handleBirthPlaceChange(e.target.value)}
                        onFocus={() => {
                          if (geoResults.length > 0) setShowGeoDropdown(true);
                        }}
                        autoComplete="off"
                        required
                        className={inputWithIconCls}
                      />
                      {geoLoading && (
                        <div className="absolute right-3.5 top-3.5">
                          <div className="w-4 h-4 border-2 border-[#cfa375]/30 border-t-[#cfa375] rounded-full animate-spin" />
                        </div>
                      )}
                      {/* Autocomplete dropdown */}
                      {showGeoDropdown && geoResults.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1347] border border-[#cfa375]/30 rounded-xl overflow-hidden z-50 shadow-xl shadow-black/30">
                          {geoResults.map((geo, i) => (
                            <button
                              key={`${geo.completeName}-${i}`}
                              type="button"
                              onClick={() => selectGeoResult(geo)}
                              className="w-full text-left px-4 py-3 hover:bg-[#cfa375]/10 transition-colors border-b border-white/5 last:border-b-0"
                            >
                              <div className="text-sm text-white font-medium">
                                {geo.name}
                              </div>
                              <div className="text-xs text-white/40 mt-0.5">
                                {geo.completeName}{" "}
                                {geo.country && `· ${geo.country}`}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    {selectedGeo && (
                      <div className="flex items-center gap-2 text-xs text-white/30 pl-1">
                        <span>
                          📍 {selectedGeo.latitude.toFixed(4)}°,{" "}
                          {selectedGeo.longitude.toFixed(4)}°
                        </span>
                        <span>· TZ: {selectedGeo.timezone}</span>
                      </div>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className={labelCls}>Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-white/30" />
                        <input
                          type="email"
                          placeholder="you@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className={inputWithIconCls}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className={labelCls}>Phone Number</label>
                      <div className="relative">
                        <Smartphone className="absolute left-3.5 top-3.5 w-4 h-4 text-white/30" />
                        <input
                          type="tel"
                          placeholder="+91..."
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className={inputWithIconCls}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#cfa375] to-[#b8894f] hover:from-[#e8c99b] hover:to-[#cfa375] text-[#0f0a2e] font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-[#cfa375]/20 hover:shadow-[#cfa375]/40 hover:-translate-y-0.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Proceeding to Payment...
                        </>
                      ) : (
                        <>
                          Proceed to Payment — ₹{selected.price}
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-white/30 mt-4">
                      By continuing, you agree to our{" "}
                      <Link
                        href="/terms-and-conditions"
                        className="underline hover:text-white/50"
                      >
                        Terms
                      </Link>{" "}
                      &{" "}
                      <Link
                        href="/privacy-policy"
                        className="underline hover:text-white/50"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </div>
                </form>

                {/* Bottom trust row */}
                <div className="flex flex-wrap items-center justify-center gap-5 mt-6 pt-5 border-t border-white/[0.06] text-xs text-white/35">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>100% Secure</span>
                  </div>
                  <div className="h-3 w-px bg-white/10" />
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" /> SSL Encrypted
                  </span>
                  <div className="h-3 w-px bg-white/10" />
                  <span className="flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5" /> Sent via Email
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <TestimonialCarousel />
    </div>
  );
}
