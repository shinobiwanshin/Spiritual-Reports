"use client";

import { useState, useRef } from "react";
import { ImageIcon, X, Upload, ArrowLeft, HelpCircle } from "lucide-react";
import Link from "next/link";

interface BlogPostFormProps {
  action: (formData: FormData) => Promise<void>;
  initialData?: {
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    iconName: string;
    content: string | null;
    image: string | null;
  };
}

const ICON_OPTIONS = [
  "FileText",
  "Star",
  "Heart",
  "BarChart3",
  "Search",
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
  "Compass",
  "Gem",
  "Shield",
  "Feather",
  "Zap",
];

const CATEGORY_OPTIONS = [
  "Astrology Basics",
  "Insights",
  "Personal Growth",
  "Career",
  "Relationships",
  "Finance",
  "Spirituality",
  "Wellness",
  "General",
];

export function BlogPostForm({ action, initialData }: BlogPostFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image || null,
  );
  const [keepExistingImage, setKeepExistingImage] = useState(
    !!initialData?.image,
  );
  const [submitting, setSubmitting] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreview(ev.target?.result as string);
        setKeepExistingImage(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setKeepExistingImage(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#cfa375]/40 focus:border-[#cfa375]/40 transition-all";
  const labelClasses =
    "block text-xs text-[#cfa375] font-semibold uppercase tracking-wider mb-2";

  return (
    <form
      action={async (formData) => {
        setSubmitting(true);
        formData.set("keepExistingImage", keepExistingImage ? "true" : "false");
        try {
          await action(formData);
        } finally {
          setSubmitting(false);
        }
      }}
      className="space-y-8 max-w-3xl"
    >
      {/* Title */}
      <div>
        <label className={labelClasses}>Title</label>
        <input
          name="title"
          type="text"
          required
          defaultValue={initialData?.title || ""}
          placeholder="Enter post title..."
          className={inputClasses}
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className={labelClasses}>Excerpt</label>
        <textarea
          name="excerpt"
          required
          rows={3}
          defaultValue={initialData?.excerpt || ""}
          placeholder="Write a brief summary..."
          className={inputClasses + " resize-none"}
        />
      </div>

      {/* Category & Read Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>Category</label>
          <select
            name="category"
            required
            defaultValue={initialData?.category || ""}
            className={inputClasses}
          >
            <option value="" disabled>
              Select category
            </option>
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClasses}>Read Time</label>
          <input
            name="readTime"
            type="text"
            defaultValue={initialData?.readTime || "5 min read"}
            placeholder="e.g. 5 min read"
            className={inputClasses}
          />
        </div>
      </div>

      {/* Icon */}
      <div>
        <label className={labelClasses}>Icon</label>
        <select
          name="iconName"
          defaultValue={initialData?.iconName || "FileText"}
          className={inputClasses}
        >
          {ICON_OPTIONS.map((icon) => (
            <option key={icon} value={icon}>
              {icon}
            </option>
          ))}
        </select>
      </div>

      {/* Image Upload */}
      <div>
        <label className={labelClasses}>Cover Image</label>
        {/* Single persistent file input — never destroyed */}
        <input
          ref={fileInputRef}
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        {imagePreview ? (
          <div className="relative w-full max-w-md">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full aspect-video object-cover rounded-xl border border-white/10"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-red-500/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-white/20 transition-colors text-xs flex items-center gap-1"
            >
              <Upload className="w-3 h-3" /> Replace
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center w-full max-w-md aspect-video rounded-xl border-2 border-dashed border-white/10 hover:border-[#cfa375]/30 cursor-pointer transition-colors bg-white/[0.02]"
          >
            <Upload className="w-8 h-8 text-white/20 mb-2" />
            <span className="text-sm text-white/40">Click to upload image</span>
            <span className="text-xs text-white/20 mt-1">
              JPG, PNG, WEBP (max 5MB)
            </span>
          </button>
        )}
      </div>

      {/* Content */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className={labelClasses + " mb-0"}>Content</label>
          <button
            type="button"
            onClick={() => setShowGuide(!showGuide)}
            className="text-xs text-[#cfa375]/70 hover:text-[#cfa375] transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#cfa375]/10 hover:border-[#cfa375]/30 hover:bg-[#cfa375]/5"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            {showGuide ? "Hide Guide" : "Markdown Guide"}
          </button>
        </div>

        {/* Markdown Guide Panel */}
        {showGuide && (
          <div className="mb-4 p-5 rounded-xl bg-white/[0.03] border border-[#cfa375]/15 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <p className="text-xs text-[#cfa375] font-semibold uppercase tracking-wider">
              Supported Markdown Syntax
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Each example: raw → rendered */}
              <div className="space-y-3">
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">
                  You write
                </p>
                <div className="space-y-2 font-mono text-xs text-white/60 bg-white/[0.02] rounded-lg p-3 border border-white/5">
                  <p>## Section Heading</p>
                  <p>### Sub Heading</p>
                  <p className="mt-1">- Bullet point item</p>
                  <p>- **Bold label**: description</p>
                  <p className="mt-1">1. Numbered item</p>
                  <p>2. Another numbered item</p>
                  <p className="mt-1">&gt; A blockquote or highlight</p>
                  <p className="mt-1">Regular paragraph text</p>
                  <p className="mt-1">(empty line = spacing)</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">
                  It renders as
                </p>
                <div className="space-y-2 rounded-lg p-3 border border-white/5 bg-white/[0.02]">
                  <h2 className="text-base font-bold text-white">
                    Section Heading
                  </h2>
                  <h3 className="text-sm font-semibold text-white">
                    Sub Heading
                  </h3>
                  <div className="flex items-start gap-2 text-xs text-[#b0a8c8]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-1.5 flex-shrink-0" />
                    Bullet point item
                  </div>
                  <div className="flex items-start gap-2 text-xs text-[#b0a8c8]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-1.5 flex-shrink-0" />
                    <span>
                      <strong className="text-white">Bold label</strong>:
                      description
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-[#b0a8c8]">
                    <span className="w-5 h-5 rounded-full bg-[#cfa375]/10 flex items-center justify-center text-[#cfa375] text-[9px] font-bold flex-shrink-0">
                      1
                    </span>
                    Numbered item
                  </div>
                  <div className="flex items-start gap-2 text-xs text-[#b0a8c8]">
                    <span className="w-5 h-5 rounded-full bg-[#cfa375]/10 flex items-center justify-center text-[#cfa375] text-[9px] font-bold flex-shrink-0">
                      2
                    </span>
                    Another numbered item
                  </div>
                  <blockquote className="border-l-2 border-[#cfa375] pl-3 text-xs text-[#cfa375]/80 italic">
                    A blockquote or highlight
                  </blockquote>
                  <p className="text-xs text-[#b0a8c8]">
                    Regular paragraph text
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <textarea
          name="content"
          rows={16}
          defaultValue={initialData?.content || ""}
          placeholder={
            "Write your blog post content here...\n\nUse ## for headings\nUse - for bullet points\nUse > for blockquotes\nUse **bold** for emphasis"
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
              ? "Update Post"
              : "Publish Post"}
        </button>
        <Link
          href="/admin"
          className="px-6 py-3 rounded-xl border border-white/10 text-sm text-white/60 hover:text-white hover:border-white/20 transition-all"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
