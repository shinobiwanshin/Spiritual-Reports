import { db } from "@/db";
import { services } from "@/db/schema";
import { asc } from "drizzle-orm";
import IgClient from "./ig-client";

export default async function IgPage() {
  const allServices = await db
    .select()
    .from(services)
    .orderBy(asc(services.price));

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

  return <IgClient services={serviceData} />;
}
