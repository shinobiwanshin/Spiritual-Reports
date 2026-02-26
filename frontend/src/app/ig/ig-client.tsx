"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
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
} from "lucide-react";
import VideoBackground from "@/components/VideoBackground";
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

export default function IgClient({ services }: { services: ServiceVariant[] }) {
  // Default to the featured service, or first one
  const featuredIndex = services.findIndex((s) => s.featured);
  const [selectedVariant, setSelectedVariant] = useState(
    featuredIndex >= 0 ? featuredIndex : 0,
  );
  const selected = services[selectedVariant];

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
        const data = await res.json();
        setGeoResults(Array.isArray(data) ? data : []);
        setShowGeoDropdown(true);
      } catch {
        setGeoResults([]);
      } finally {
        setGeoLoading(false);
      }
    }, 300);
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
        cashfree = await load({
          mode:
            process.env.NEXT_PUBLIC_CASHFREE_ENV === "PRODUCTION"
              ? "production"
              : "sandbox",
        });
      } catch (err) {
        throw new Error("Failed to initialize payment gateway");
      }

      // Call create-order API
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

  if (!services.length) {
    return (
      <div className="min-h-screen bg-[#0f0a2e] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/50 text-lg mb-4">
            No services available yet.
          </p>
          <Link href="/" className="text-[#cfa375] hover:underline">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const SelectedIcon = getIcon(selected.iconName);

  return (
    <div className="min-h-screen bg-[#0f0a2e] text-white relative overflow-hidden">
      {/* Video background — fixed behind everything */}
      <div className="fixed inset-0 z-0">
        <VideoBackground overlayOpacity={0.55} />
      </div>

      {/* ─── Hero Section ─── */}
      <section className="relative z-10 pt-28 pb-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#cfa375]/10 border border-[#cfa375]/20 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#cfa375]" />
            <span className="text-xs font-semibold text-[#cfa375] uppercase tracking-wider">
              Guided by Ancient Wisdom
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            This Is Not a{" "}
            <span className="gold-gradient-text">Coincidence</span>
          </h1>

          <p className="text-[#b0a8c8] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-4">
            Among countless websites and astrologers, you are here — and that
            matters.
          </p>

          <p className="text-[#b0a8c8]/70 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-6">
            Under the grace of{" "}
            <span className="text-[#cfa375] font-semibold">Lord Shiva</span>,
            this is offered as sincere spiritual guidance — not superstition,
            not false promises.
          </p>

          {/* Philosophy lines */}
          <div className="max-w-xl mx-auto mb-8 space-y-4">
            <div className="w-12 h-px bg-[#cfa375]/30 mx-auto" />
            <p className="text-white/80 text-sm sm:text-base leading-relaxed italic">
              Life moves in phases. Some expand you. Some test you. Some prepare
              you.
            </p>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
              Astrology does not control destiny. It reveals{" "}
              <span className="text-[#cfa375] font-semibold">timing</span>.
              <br />
              And when timing is understood, decisions become calmer — and
              calmer decisions{" "}
              <span className="text-white font-medium">change outcomes</span>.
            </p>
            <div className="w-12 h-px bg-[#cfa375]/30 mx-auto" />
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-[#cfa375] fill-[#cfa375]"
                  />
                ))}
              </div>
              <span>4.9/5 Rating</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> 10,000+ Seekers
            </span>
            <div className="h-4 w-px bg-white/10" />
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4" /> 65+ Page Reports
            </span>
            <div className="h-4 w-px bg-white/10" />
            <span className="flex items-center gap-1.5">
              <Timer className="w-4 h-4" /> Delivered in 24hrs
            </span>
          </div>
        </div>
      </section>

      {/* ─── Report Variant Selector ─── */}
      <section className="relative z-10 px-6 pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Choose the Depth of{" "}
              <span className="gold-gradient-text">Insight</span>
            </h2>
            <p className="text-[#b0a8c8] text-sm">
              That aligns with where you stand today
            </p>
          </div>

          <div
            className={`grid grid-cols-1 ${services.length === 2 ? "md:grid-cols-2 max-w-3xl mx-auto" : services.length >= 3 ? "md:grid-cols-3" : "max-w-md mx-auto"} gap-5`}
          >
            {services.map((variant, index) => {
              const isSelected = selectedVariant === index;
              const Icon = getIcon(variant.iconName);
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariant(index)}
                  className={`relative text-left rounded-2xl p-6 transition-all duration-300 overflow-hidden group ${
                    isSelected
                      ? "bg-gradient-to-b from-[#1a1347] to-[#0f0a2e] border-2 border-[#cfa375] shadow-xl shadow-[#cfa375]/15 scale-[1.02]"
                      : "bg-[#1a1347]/40 border border-white/10 hover:border-[#cfa375]/30 hover:bg-[#1a1347]/60"
                  }`}
                >
                  {/* Popular badge */}
                  {variant.featured && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#cfa375] to-[#e8c99b] py-1.5 text-center">
                      <span className="text-[10px] font-bold text-[#0f0a2e] uppercase tracking-widest">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className={variant.featured ? "pt-6" : ""}>
                    {/* Icon + Duration */}
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="w-8 h-8 text-[#cfa375]" />
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          isSelected
                            ? "bg-[#cfa375]/20 text-[#cfa375]"
                            : "bg-white/5 text-white/50"
                        }`}
                      >
                        {variant.duration}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-1">
                      {variant.title}
                    </h3>
                    <p className="text-xs text-[#cfa375] font-medium mb-3">
                      {variant.subtitle}
                    </p>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-3xl font-bold text-white">
                        ₹{variant.price}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#b0a8c8] leading-relaxed mb-4">
                      {variant.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2">
                      {variant.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isSelected ? "text-[#cfa375]" : "text-white/30"
                            }`}
                          />
                          <span className="text-xs text-[#b0a8c8]">{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Selection indicator */}
                    <div
                      className={`mt-5 w-full py-2.5 rounded-xl text-center text-sm font-semibold transition-all ${
                        isSelected
                          ? "bg-[#cfa375] text-[#0f0a2e]"
                          : "bg-white/5 text-white/40 group-hover:bg-white/10"
                      }`}
                    >
                      {isSelected ? "✓ Selected" : "Select Plan"}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Form Section ─── */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#1a1347] border border-[#cfa375]/20 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-[#0f0a2e]/50">
            {/* Form header */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Enter Your Birth Details
              </h3>
              <p className="text-[#b0a8c8] text-sm">
                We need your birth details for accurate Vedic analysis
              </p>
              {/* Selected plan pill */}
              <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-[#cfa375]/10 border border-[#cfa375]/20">
                <SelectedIcon className="w-4 h-4 text-[#cfa375]" />
                <span className="text-sm font-semibold text-[#cfa375]">
                  {selected.title} — ₹{selected.price}
                </span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-5 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-[#cfa375] font-semibold uppercase tracking-wider pl-1">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      placeholder="Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-white placeholder-white/20 focus:outline-none focus:border-[#cfa375]/50 transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#cfa375] font-semibold uppercase tracking-wider pl-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Surname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-xl py-2.5 px-3 text-white placeholder-white/20 focus:outline-none focus:border-[#cfa375]/50 transition-colors"
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#cfa375] font-semibold uppercase tracking-wider pl-1">
                  Date of Birth
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-3 w-3.5 h-3.5 text-white/40" />
                    <select
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                      required
                      className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-xl py-2.5 pl-8 pr-2 text-white/80 focus:outline-none focus:border-[#cfa375]/50 appearance-none text-sm"
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
                    className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-xl py-2.5 px-3 text-white/80 focus:outline-none focus:border-[#cfa375]/50 appearance-none text-sm"
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
                    className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-xl py-2.5 px-3 text-white/80 focus:outline-none focus:border-[#cfa375]/50 appearance-none text-sm"
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
                <label className="text-xs text-[#cfa375] font-semibold uppercase tracking-wider pl-1">
                  Time of Birth
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="relative">
                    <Clock className="absolute left-2.5 top-3 w-3.5 h-3.5 text-white/40" />
                    <select
                      value={hour}
                      onChange={(e) => setHour(e.target.value)}
                      required
                      className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-xl py-2.5 pl-8 pr-2 text-white/80 focus:outline-none focus:border-[#cfa375]/50 appearance-none text-sm"
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
                    className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-xl py-2.5 px-3 text-white/80 focus:outline-none focus:border-[#cfa375]/50 appearance-none text-sm"
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
                    className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-xl py-2.5 px-3 text-white/80 focus:outline-none focus:border-[#cfa375]/50 appearance-none text-sm"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>

              {/* Place of Birth — Autocomplete */}
              <div className="space-y-1.5" ref={geoDropdownRef}>
                <label className="text-xs text-[#cfa375] font-semibold uppercase tracking-wider pl-1">
                  Place of Birth
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-white/40" />
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
                    className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-white placeholder-white/20 focus:outline-none focus:border-[#cfa375]/50 transition-colors"
                  />
                  {geoLoading && (
                    <div className="absolute right-3 top-3">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-[#cfa375] font-semibold uppercase tracking-wider pl-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                    <input
                      type="email"
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-white placeholder-white/20 focus:outline-none focus:border-[#cfa375]/50 transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#cfa375] font-semibold uppercase tracking-wider pl-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                    <input
                      type="tel"
                      placeholder="+91..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full bg-[#0f0a2e]/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-3 text-white placeholder-white/20 focus:outline-none focus:border-[#cfa375]/50 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#cfa375] to-[#b8894f] hover:from-[#e8c99b] hover:to-[#cfa375] text-[#0f0a2e] font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-[#cfa375]/20 hover:shadow-[#cfa375]/40 hover:-translate-y-0.5 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
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
          </div>

          {/* Bottom trust row */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-white/40">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Secure Payment</span>
            </div>
            <div className="h-3.5 w-px bg-white/10" />
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4" /> SSL Encrypted
            </span>
            <div className="h-3.5 w-px bg-white/10" />
            <span className="flex items-center gap-1.5">
              <Send className="w-4 h-4" /> Sent via Email
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
