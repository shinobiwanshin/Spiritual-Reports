import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Astra Spiritual",
  description:
    "Read our latest articles on astrology, spiritual growth, self-improvement, and personalized insights.",
};

const blogPosts = [
  {
    id: 1,
    title: "Understanding Your Birth Chart: A Beginner's Guide",
    excerpt:
      "A birth chart is a snapshot of the sky at the exact moment of your birth. Learn how to read and interpret the key elements that shape your personality and life journey.",
    date: "February 10, 2026",
    category: "Astrology Basics",
    readTime: "5 min read",
    icon: "🌟",
  },
  {
    id: 2,
    title: "How Yearly Reports Can Help You Plan Better",
    excerpt:
      "Discover how structured yearly insights can help you anticipate key phases, make informed decisions, and align your actions with your goals for better outcomes.",
    date: "February 5, 2026",
    category: "Insights",
    readTime: "4 min read",
    icon: "📊",
  },
  {
    id: 3,
    title: "The Power of Self-Reflection in Personal Growth",
    excerpt:
      "Self-reflection is a powerful tool for growth. Learn practical techniques for developing self-awareness and using structured analysis to improve decision-making.",
    date: "January 28, 2026",
    category: "Personal Growth",
    readTime: "6 min read",
    icon: "🔍",
  },
  {
    id: 4,
    title: "Career Planning Through Structured Analysis",
    excerpt:
      "Making career decisions can be overwhelming. Explore how personalized reports and structured consultations can provide clarity on your professional path.",
    date: "January 20, 2026",
    category: "Career",
    readTime: "5 min read",
    icon: "💼",
  },
  {
    id: 5,
    title: "Building Better Relationships with Awareness",
    excerpt:
      "Understanding patterns in your relationships can lead to deeper connections. Learn how self-assessment tools can support healthier communication and bonds.",
    date: "January 15, 2026",
    category: "Relationships",
    readTime: "4 min read",
    icon: "❤️",
  },
  {
    id: 6,
    title: "Financial Planning: Aligning Actions with Timing",
    excerpt:
      "Timing matters in financial decisions. Discover how understanding key phases and patterns can help you make smarter investments and build long-term wealth.",
    date: "January 8, 2026",
    category: "Finance",
    readTime: "5 min read",
    icon: "💰",
  },
];

export default function BlogPage() {
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
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* Icon banner */}
              <div className="h-40 bg-gradient-to-br from-[#1a1347] to-[#241a5e] flex items-center justify-center text-5xl group-hover:from-[#241a5e] group-hover:to-[#1a1347] transition-all duration-500">
                {post.icon}
              </div>

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

                {/* Date */}
                <p className="text-xs text-[#b0a8c8]/60">{post.date}</p>
              </div>
            </article>
          ))}
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
