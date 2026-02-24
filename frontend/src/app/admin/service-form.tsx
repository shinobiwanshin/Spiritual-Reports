"use client";

import { useState } from "react";
import Link from "next/link";

interface ServiceFormProps {
  action: (formData: FormData) => Promise<void>;
  initialData?: {
    slug: string;
    title: string;
    subtitle: string;
    duration: string;
    description: string;
    highlights: string[];
    iconName: string;
    accent: string;
    featured: boolean | null;
    price: number;
  };
}

const ICON_OPTIONS = [
  "Calendar",
  "CalendarDays",
  "BarChart3",
  "Compass",
  "Star",
  "Heart",
  "FileText",
  "Briefcase",
  "Wallet",
  "Moon",
  "Sun",
  "Flame",
  "Eye",
  "Mountain",
  "Sparkles",
  "Infinity",
  "BookOpen",
  "Gem",
  "Shield",
  "Zap",
  "Clock",
];

const ACCENT_OPTIONS = [
  { label: "Gold", value: "#cfa375" },
  { label: "Blue", value: "#6b93d6" },
  { label: "Purple", value: "#9b7dd4" },
  { label: "Green", value: "#6bc9a8" },
  { label: "Rose", value: "#d67b8a" },
  { label: "Amber", value: "#d6a56b" },
];

export function ServiceForm({ action, initialData }: ServiceFormProps) {
  const [submitting, setSubmitting] = useState(false);

  const inputClasses =
    "w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#cfa375]/40 focus:border-[#cfa375]/40 transition-all";
  const labelClasses =
    "block text-xs text-[#cfa375] font-semibold uppercase tracking-wider mb-2";

  return (
    <form
      action={async (formData) => {
        setSubmitting(true);
        try {
          await action(formData);
        } finally {
          setSubmitting(false);
        }
      }}
      className="space-y-8 max-w-3xl"
    >
      {/* Title & Slug */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>Title</label>
          <input
            name="title"
            type="text"
            required
            defaultValue={initialData?.title || ""}
            placeholder="e.g. 3-Year Report"
            className={inputClasses}
          />
        </div>
        <div>
          <label className={labelClasses}>Slug</label>
          <input
            name="slug"
            type="text"
            required
            defaultValue={initialData?.slug || ""}
            placeholder="e.g. 3-year-report"
            className={inputClasses}
          />
        </div>
      </div>

      {/* Subtitle & Duration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>Subtitle</label>
          <input
            name="subtitle"
            type="text"
            required
            defaultValue={initialData?.subtitle || ""}
            placeholder="e.g. Mid-Term Strategy"
            className={inputClasses}
          />
        </div>
        <div>
          <label className={labelClasses}>Duration</label>
          <input
            name="duration"
            type="text"
            required
            defaultValue={initialData?.duration || ""}
            placeholder="e.g. 3 Years"
            className={inputClasses}
          />
        </div>
      </div>

      {/* Price & Icon & Accent */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label className={labelClasses}>Price (₹)</label>
          <input
            name="price"
            type="number"
            required
            min={0}
            defaultValue={initialData?.price || 249}
            className={inputClasses}
          />
        </div>
        <div>
          <label className={labelClasses}>Icon</label>
          <select
            name="iconName"
            defaultValue={initialData?.iconName || "CalendarDays"}
            className={inputClasses}
          >
            {ICON_OPTIONS.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClasses}>Accent Color</label>
          <select
            name="accent"
            defaultValue={initialData?.accent || "#cfa375"}
            className={inputClasses}
          >
            {ACCENT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Featured */}
      <div className="flex items-center gap-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            name="featured"
            type="checkbox"
            defaultChecked={initialData?.featured ?? false}
            value="true"
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white/60 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#cfa375]/60 peer-checked:after:bg-white" />
        </label>
        <span className="text-sm text-white/60">
          Mark as Featured (Most Popular)
        </span>
      </div>

      {/* Description */}
      <div>
        <label className={labelClasses}>Description</label>
        <textarea
          name="description"
          required
          rows={3}
          defaultValue={initialData?.description || ""}
          placeholder="Brief description of this service..."
          className={inputClasses + " resize-none"}
        />
      </div>

      {/* Highlights */}
      <div>
        <label className={labelClasses}>
          Highlights{" "}
          <span className="text-white/30 font-normal normal-case">
            (one per line)
          </span>
        </label>
        <textarea
          name="highlights"
          required
          rows={6}
          defaultValue={initialData?.highlights?.join("\n") || ""}
          placeholder={
            "Monthly breakdown of key influences\nCareer & financial outlook\nRelationship dynamics\nHealth & wellness guidance"
          }
          className={
            inputClasses + " resize-y font-mono text-xs leading-relaxed"
          }
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#cfa375] to-[#e8c99b] text-[#0f0a2e] text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting
            ? "Saving..."
            : initialData
              ? "Update Service"
              : "Create Service"}
        </button>
        <Link
          href="/admin/services"
          className="px-6 py-3 rounded-xl border border-white/10 text-sm text-white/60 hover:text-white hover:border-white/20 transition-all"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
