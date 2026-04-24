import { db } from "@/db";
import { services } from "@/db/schema";
import { asc } from "drizzle-orm";
import IgLanding from "./ig/ig-landing";

export default async function HomePage() {
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

  return <IgLanding services={serviceData} />;
}
