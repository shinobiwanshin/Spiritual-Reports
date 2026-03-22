import { config } from "dotenv";
config({ path: ".env.local" });
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { testimonials } from "./schema";

async function seedTestimonials() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  console.log("🌱 Seeding ONLY testimonials...");
  await db.insert(testimonials).values([
    {
      name: "Ananya S.",
      location: "Mumbai",
      text: "The 5-year report gave me immense clarity during my career transition. The timing was astoundingly accurate, helping me make decisions with confidence.",
      rating: 5,
      type: "text",
    },
    {
      name: "Rajesh K.",
      location: "London",
      text: "Incredibly deep analysis. The guidance on my relationship phase was spot on. It's not just astrology, it's a true roadmap for the soul.",
      rating: 5,
      type: "text",
    },
    {
      name: "Priya M.",
      location: "Bangalore",
      text: "The 3-year reading helped me navigate a very tough period with calmness. Beautifully written, deeply spiritual, and practically helpful.",
      rating: 5,
      type: "text",
    },
    {
      name: "Vikram R.",
      location: "Delhi",
      text: "I was skeptical at first, but the insights provided were too specific to be generalized. It completely changed my perspective on my upcoming years.",
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
}

seedTestimonials().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
