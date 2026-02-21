import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { getIcon } from "@/lib/icon-map";
import Link from "next/link";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, parseInt(id)))
    .then((rows) => rows[0]);

  if (!post) return { title: "Post Not Found — Shivabakthi" };

  return {
    title: `${post.title} — Shivabakthi`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params;
  const post = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, parseInt(id)))
    .then((rows) => rows[0]);

  if (!post) notFound();

  const Icon = getIcon(post.iconName);

  // Simple markdown-like rendering for headings, lists, blockquotes
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4">
            {trimmed.replace("## ", "")}
          </h2>
        );
      }
      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={i} className="text-xl font-semibold text-white mt-8 mb-3">
            {trimmed.replace("### ", "")}
          </h3>
        );
      }
      if (trimmed.startsWith("> ")) {
        return (
          <blockquote
            key={i}
            className="border-l-4 border-[#cfa375] pl-4 my-6 text-[#cfa375]/90 italic text-base leading-relaxed"
          >
            {trimmed.replace("> ", "")}
          </blockquote>
        );
      }
      if (trimmed.startsWith("- **")) {
        const match = trimmed.match(/^- \*\*(.+?)\*\*:?\s*(.*)/);
        if (match) {
          return (
            <li
              key={i}
              className="flex items-start gap-3 text-[#b0a8c8] text-base leading-relaxed"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2.5 flex-shrink-0" />
              <span>
                <strong className="text-white">{match[1]}</strong>
                {match[2] ? `: ${match[2]}` : ""}
              </span>
            </li>
          );
        }
      }
      if (trimmed.startsWith("- ")) {
        return (
          <li
            key={i}
            className="flex items-start gap-3 text-[#b0a8c8] text-base leading-relaxed"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#cfa375] mt-2.5 flex-shrink-0" />
            <span>{trimmed.replace("- ", "")}</span>
          </li>
        );
      }
      if (/^\d+\.\s/.test(trimmed)) {
        const num = trimmed.match(/^(\d+)\.\s/)?.[1];
        const text = trimmed.replace(/^\d+\.\s/, "");
        const boldMatch = text.match(/^\*\*(.+?)\*\*:?\s*(.*)/);
        return (
          <li
            key={i}
            className="flex items-start gap-3 text-[#b0a8c8] text-base leading-relaxed"
          >
            <span className="w-6 h-6 rounded-full bg-[#cfa375]/10 flex items-center justify-center text-[#cfa375] text-xs font-bold flex-shrink-0 mt-0.5">
              {num}
            </span>
            <span>
              {boldMatch ? (
                <>
                  <strong className="text-white">{boldMatch[1]}</strong>
                  {boldMatch[2] ? `: ${boldMatch[2]}` : ""}
                </>
              ) : (
                text
              )}
            </span>
          </li>
        );
      }
      if (trimmed === "") {
        return <div key={i} className="h-2" />;
      }
      return (
        <p key={i} className="text-[#b0a8c8] text-base leading-relaxed">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#cfa375] text-sm font-medium hover:text-[#e8c99b] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <div className="glass-card rounded-3xl overflow-hidden mb-8">
          {/* Banner: image or icon fallback */}
          {post.image ? (
            <div className="h-64 sm:h-80 relative overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a2e]/60 to-transparent" />
            </div>
          ) : (
            <div className="h-48 bg-gradient-to-br from-[#1a1347] to-[#241a5e] flex items-center justify-center">
              <Icon className="w-16 h-16 text-[#cfa375]" />
            </div>
          )}

          <div className="p-8 md:p-10">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#cfa375]/10 text-[#cfa375] text-xs font-medium">
                <Tag className="w-3 h-3" />
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-[#b0a8c8]">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
              <span className="text-xs text-[#b0a8c8]/60">{post.date}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-[#b0a8c8] leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="glass-card rounded-3xl p-8 md:p-10">
          <div className="space-y-1">
            {post.content ? (
              renderContent(post.content)
            ) : (
              <p className="text-[#b0a8c8] text-center py-12">
                Full article coming soon. Stay tuned!
              </p>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-3">
              Want Personalized Insights?
            </h3>
            <p className="text-[#b0a8c8] text-sm mb-6 max-w-md mx-auto">
              Get a detailed report tailored to your unique profile with
              actionable recommendations.
            </p>
            <Link
              href="/services"
              className="gold-btn px-8 py-3 rounded-full text-sm font-semibold inline-block"
            >
              Explore Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
