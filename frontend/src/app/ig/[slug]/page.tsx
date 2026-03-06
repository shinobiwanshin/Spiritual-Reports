import { db } from "@/db";
import { services } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { notFound } from "next/navigation";
import ReportClient from "./report-client";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [service] = await db
    .select()
    .from(services)
    .where(eq(services.slug, slug))
    .limit(1);

  if (!service) {
    return { title: "Report Not Found — Shivabakthi" };
  }

  return {
    title: `${service.title} — Shivabakthi`,
    description: service.description,
  };
}

export default async function ReportPage({ params }: Props) {
  const { slug } = await params;

  // Fetch the specific service
  const [service] = await db
    .select()
    .from(services)
    .where(eq(services.slug, slug))
    .limit(1);

  if (!service) {
    notFound();
  }

  // Fetch all services for the plan switcher
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

  return <ReportClient services={serviceData} currentSlug={slug} />;
}
