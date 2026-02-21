import Link from "next/link";
import type { Metadata } from "next";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { getIcon } from "@/lib/icon-map";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Shivabakthi",
  description:
    "Read our latest articles on astrology, spiritual growth, self-improvement, and personalized insights.",
};

export default async function BlogPage() {
  const posts = await db.select().from(blogPosts);

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#cfa375] text-sm font-semibold uppercase tracking-wider mb-3">
            Our Blog
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Insights & <span className="gold-gradient-text">Articles</span>
          </h1>
          <p className="text-[#b0a8c8] text-lg max-w-2xl mx-auto leading-relaxed">
            Explore our latest articles on self-improvement, structured
            analysis, career planning, relationships, and more.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#cfa375] to-transparent mx-auto mt-6" />
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            const Icon = getIcon(post.iconName);
            return (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="glass-card rounded-2xl overflow-hidden group cursor-pointer block hover:ring-1 hover:ring-[#cfa375]/20 transition-all"
              >
                {/* Image or icon banner */}
                {post.image ? (
                  <div className="h-40 relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a2e]/40 to-transparent" />
                  </div>
                ) : (
                  <div className="h-40 bg-gradient-to-br from-[#1a1347] to-[#241a5e] flex items-center justify-center group-hover:from-[#241a5e] group-hover:to-[#1a1347] transition-all duration-500">
                    <Icon className="w-10 h-10 text-[#cfa375]" />
                  </div>
                )}

                <div className="p-6">
                  {/* Category & Read time */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-[#cfa375]/10 text-[#cfa375] text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-xs text-[#b0a8c8]">
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#cfa375] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-[#b0a8c8] leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Footer: Date + Read more */}
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-[#b0a8c8]/60">{post.date}</p>
                    <span className="text-xs text-[#cfa375] font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read more <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-16 text-center">
          <div className="glass-card rounded-2xl p-8 inline-block">
            <p className="text-[#b0a8c8] text-sm">
              More articles coming soon. Stay tuned for weekly updates on
              personal growth, career insights, and structured self-analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
