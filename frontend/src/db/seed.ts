import { config } from "dotenv";
config({ path: ".env.local" });
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { blogPosts, services, testimonials } from "./schema";

async function seed() {
  if (process.env.NODE_ENV === "production" && process.env.FORCE_SEED !== "true") {
    console.error("⛔ Refusing to seed in production. Set FORCE_SEED=true to override.");
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  console.log("🌱 Seeding blog posts...");
  await db.delete(blogPosts);
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
        "Discover how structured yearly insights can explore key themes and support your personal reflection and planning.",
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
        "Making career decisions can be challenging. Explore how personalized reports and structured reflections can support your professional journey planning.",
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
  await db.delete(services);
  await db.insert(services).values([
    {
      slug: "1-year",
      title: "1-Year Report",
      subtitle: "Structured Reflection",
      duration: "1 Year",
      description:
        "Explore astrological insights for the next 12 months. Discover key themes and patterns to support your self-reflection and decision-making.",
      highlights: [
        "Monthly theme exploration",
        "Career reflection points",
        "Relationship pattern insights",
        "Personal wellness perspectives",
        "Actionable reflection prompts",
      ],
      iconName: "CalendarDays",
      accent: "from-[#cfa375] to-[#e8c99b]",
      featured: false,
    },
    {
      slug: "3-year",
      title: "3-Year Report",
      subtitle: "Medium-Term Patterns",
      duration: "3 Years",
      description:
        "Explore astrological patterns and key themes shaping your journey over the next three years. Support your personal growth and reflection.",
      highlights: [
        "Year-by-year theme overview",
        "Key transition period insights",
        "Career reflection points",
        "Relationship pattern exploration",
        "Financial awareness themes",
        "Personal development perspectives",
      ],
      iconName: "BarChart3",
      accent: "from-[#e8c99b] to-[#cfa375]",
      featured: true,
    },
    {
      slug: "5-year",
      title: "5-Year Report",
      subtitle: "Comprehensive Journey",
      duration: "5 Years",
      description:
        "A comprehensive astrological analysis exploring five years of themes and patterns. Support major life reflections and personal growth planning.",
      highlights: [
        "5-year pattern overview",
        "Career & business theme exploration",
        "Key milestone perspectives",
        "Wealth & asset awareness themes",
        "Relationship & family reflection",
        "Life purpose & growth insights",
        "Decision-making support framework",
      ],
      iconName: "Map",
      accent: "from-[#b8894f] to-[#cfa375]",
      featured: false,
    },
  ]);
  console.log("✅ Services seeded");

  console.log("🌱 Seeding testimonials...");
  await db.delete(testimonials);
  await db.insert(testimonials).values([
    {
      name: "Ananya S.",
      location: "Mumbai",
      text: "I found the 5-year report to be a thoughtful exploration of astrological themes. The analysis provided helpful perspectives for reflection during my career transition.",
      rating: 5,
      type: "text",
    },
    {
      name: "Rajesh K.",
      location: "London",
      text: "The report offers deep astrological insights. I appreciated the detailed analysis and found the content to be well-structured and spiritually resonant.",
      rating: 5,
      type: "text",
    },
    {
      name: "Priya M.",
      location: "Bangalore",
      text: "A beautifully crafted report that explores astrological themes and patterns. I found it spiritually meaningful and helpful for personal reflection.",
      rating: 5,
      type: "text",
    },
    {
      name: "Vikram R.",
      location: "Delhi",
      text: "The insights in the report provided interesting perspectives on astrological themes relevant to my life. I found the analysis thoughtful and well-presented.",
      rating: 5,
      type: "text",
    },
    {
      name: "Video Testimony 1",
      location: null,
      videoUrl: "/videos/testimony1.mp4",
      type: "video",
    },
    {
      name: "Video Testimony 2",
      location: null,
      videoUrl: "/videos/testimony2.mp4",
      type: "video",
    },
  ]);
  console.log("✅ Testimonials seeded");

  console.log("🎉 Seeding complete!");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
