import { config } from "dotenv";
config({ path: ".env.local" });
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { blogPosts, services } from "./schema";

async function seed() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  console.log("🌱 Seeding blog posts...");
  await db.insert(blogPosts).values([
    {
      title: "Understanding Your Birth Chart: A Beginner's Guide",
      excerpt:
        "A birth chart is a snapshot of the sky at the exact moment of your birth. Learn how to read and interpret the key elements that shape your personality and life journey.",
      date: "February 10, 2026",
      category: "Astrology Basics",
      readTime: "5 min read",
      iconName: "Star",
    },
    {
      title: "How Yearly Reports Can Help You Plan Better",
      excerpt:
        "Discover how structured yearly insights can help you anticipate key phases, make informed decisions, and align your actions with your goals for better outcomes.",
      date: "February 5, 2026",
      category: "Insights",
      readTime: "4 min read",
      iconName: "BarChart3",
    },
    {
      title: "The Power of Self-Reflection in Personal Growth",
      excerpt:
        "Self-reflection is a powerful tool for growth. Learn practical techniques for developing self-awareness and using structured analysis to improve decision-making.",
      date: "January 28, 2026",
      category: "Personal Growth",
      readTime: "6 min read",
      iconName: "Search",
    },
    {
      title: "Career Planning Through Structured Analysis",
      excerpt:
        "Making career decisions can be overwhelming. Explore how personalized reports and structured consultations can provide clarity on your professional path.",
      date: "January 20, 2026",
      category: "Career",
      readTime: "5 min read",
      iconName: "Briefcase",
    },
    {
      title: "Building Better Relationships with Awareness",
      excerpt:
        "Understanding patterns in your relationships can lead to deeper connections. Learn how self-assessment tools can support healthier communication and bonds.",
      date: "January 15, 2026",
      category: "Relationships",
      readTime: "4 min read",
      iconName: "Heart",
    },
    {
      title: "Financial Planning: Aligning Actions with Timing",
      excerpt:
        "Timing matters in financial decisions. Discover how understanding key phases and patterns can help you make smarter investments and build long-term wealth.",
      date: "January 8, 2026",
      category: "Finance",
      readTime: "5 min read",
      iconName: "Wallet",
    },
  ]);
  console.log("✅ Blog posts seeded");

  console.log("🌱 Seeding services...");
  await db.insert(services).values([
    {
      slug: "1-year",
      title: "1-Year Report",
      subtitle: "Short-Term Clarity",
      duration: "1 Year",
      description:
        "Get a detailed overview of the next 12 months. Understand the key phases, opportunities, and challenges that lie ahead. Perfect for immediate planning and short-term decision-making.",
      highlights: [
        "Monthly breakdown of key influences",
        "Career & financial outlook",
        "Relationship dynamics",
        "Health & wellness guidance",
        "Actionable recommendations",
      ],
      iconName: "CalendarDays",
      accent: "from-[#cfa375] to-[#e8c99b]",
      featured: false,
    },
    {
      slug: "3-year",
      title: "3-Year Report",
      subtitle: "Mid-Term Strategy",
      duration: "3 Years",
      description:
        "Explore the key phases, patterns, and turning points shaping your personal journey over the next three years. Learn how to align with opportunities for growth, balance, and success.",
      highlights: [
        "Year-by-year strategic overview",
        "Major life transition periods",
        "Career growth trajectory",
        "Relationship evolution patterns",
        "Financial planning insights",
        "Personal development milestones",
      ],
      iconName: "BarChart3",
      accent: "from-[#e8c99b] to-[#cfa375]",
      featured: true,
    },
    {
      slug: "5-year",
      title: "5-Year Report",
      subtitle: "Long-Term Vision",
      duration: "5 Years",
      description:
        "A comprehensive long-term analysis covering five years of your journey. Ideal for those who want to plan major life decisions, career shifts, and personal transformation with confidence.",
      highlights: [
        "Comprehensive 5-year roadmap",
        "Long-term career & business strategy",
        "Major milestone predictions",
        "Wealth & asset building phases",
        "Relationship & family planning",
        "Life purpose & spiritual growth",
        "Risk assessment & mitigation",
      ],
      iconName: "Map",
      accent: "from-[#b8894f] to-[#cfa375]",
      featured: false,
    },
  ]);
  console.log("✅ Services seeded");

  console.log("🎉 Seeding complete!");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
