import { config } from "dotenv";
config({ path: ".env.local" });
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { testimonials } from "./schema";

async function seedTestimonials() {
  if (process.env.NODE_ENV === "production" && process.env.FORCE_SEED !== "true") {
    console.error("⛔ Refusing to seed in production. Set FORCE_SEED=true to override.");
    process.exit(1);
  }

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("Missing DATABASE_URL environment variable");
  }
  const sql = neon(dbUrl);
  const db = drizzle(sql);

  console.log("🗑️  Clearing existing testimonials...");
  await db.delete(testimonials);

  console.log("🌱 Seeding testimonials...");
  await db.insert(testimonials).values([
    // --- Video Testimonials ---
    {
      name: "User 1",
      type: "video",
      videoUrl: "https://www.youtube.com/embed/vTElbk2aN98",
      rating: 5,
      sortOrder: 1,
    },
    {
      name: "User 2",
      type: "video",
      videoUrl: "https://www.youtube.com/embed/cmR0Y1ttEo4",
      rating: 5,
      sortOrder: 2,
    },
    {
      name: "User 3",
      type: "video",
      videoUrl: "https://www.youtube.com/embed/9GnFpsgb1jk",
      rating: 5,
      sortOrder: 3,
    },
    {
      name: "User 4",
      type: "video",
      videoUrl: "https://www.youtube.com/embed/g4fCCWLczfo",
      rating: 5,
      sortOrder: 4,
    },
    // --- Text Testimonials ---
    {
      name: "Ramesh K.",
      location: "Mumbai",
      text: "The 3-year report was terrifyingly accurate. It mapped out my career shift and timeline flawlessly. I feel so much more prepared for what's coming.",
      rating: 5,
      type: "text",
      date: "a week ago",
      sortOrder: 4,
    },
    {
      name: "Sneha V.",
      location: "Bangalore",
      text: "I was struggling with relationship compatibility issues, but the detailed insights in my generated report gave me exactly the clarity I needed to move forward.",
      rating: 5,
      type: "text",
      date: "a month ago",
      sortOrder: 5,
    },
    {
      name: "Amit P.",
      location: "Delhi",
      text: "The sheer depth of the 5-year life path reading is incredible. It's not generic astrology; it's a personalized, highly actionable roadmap for your soul.",
      rating: 5,
      type: "text",
      date: "a month ago",
      sortOrder: 6,
    },
    {
      name: "Deepa N.",
      location: "Chennai",
      text: "I generated the 1-year basic report out of curiosity, and I was so blown away by the timeline accuracy that I immediately upgraded to the 5-year master report.",
      rating: 5,
      type: "text",
      date: "2 months ago",
      sortOrder: 7,
    },
    {
      name: "Vikram S.",
      location: "Hyderabad",
      text: "Shivabakthi provides the absolute best digital astrology reports available. The detailed section on my financial cycles directly helped me make a smart investment.",
      rating: 5,
      type: "text",
      date: "4 months ago",
      sortOrder: 8,
    },
    {
      name: "Anjali R.",
      location: "Pune",
      text: "Every single timeline predicted in my custom generated report happened exactly as stated. The remedies suggested also brought immense peace to my daily life.",
      rating: 5,
      type: "text",
      date: "6 months ago",
      sortOrder: 9,
    },
  ]);
  console.log("✅ Testimonials seeded (3 videos + 6 text reviews)");
}

seedTestimonials().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
