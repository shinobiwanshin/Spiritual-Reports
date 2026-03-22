import { db } from "@/db";
import { services, testimonials } from "@/db/schema";
import { asc } from "drizzle-orm";
import IgLanding from "./ig-landing";

export default async function IgPage() {
  const allServices = await db
    .select()
    .from(services)
    .orderBy(asc(services.price));

  const allTestimonials = await db
    .select()
    .from(testimonials)
    .orderBy(asc(testimonials.createdAt));

  const serviceData = allServices.map((s) => ({
    id: s.id,
    slug: s.slug,
    duration: s.duration,
    title: s.title,
    subtitle: s.subtitle,
    price: s.price,
    description: s.description,
    highlights: s.highlights as string[],
    iconName: s.iconName,
    accent: s.accent,
    featured: s.featured,
  }));

  const testimonialData = allTestimonials.map((t) => ({
    id: t.id,
    name: t.name,
    location: t.location,
    text: t.text,
    rating: t.rating,
    videoUrl: t.videoUrl,
    type: t.type,
  }));

  return <IgLanding services={serviceData} testimonials={testimonialData} />;
}
