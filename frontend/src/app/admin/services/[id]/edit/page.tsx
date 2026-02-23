import { db } from "@/db";
import { services } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { EditServiceClient } from "./edit-client";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditServicePage({ params }: Props) {
  const { id } = await params;
  const service = await db
    .select()
    .from(services)
    .where(eq(services.id, parseInt(id)))
    .then((rows) => rows[0]);

  if (!service) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Edit Service</h1>
        <p className="text-sm text-white/50 mt-1">
          Editing &ldquo;{service.title}&rdquo;
        </p>
      </div>
      <EditServiceClient
        id={service.id}
        initialData={{
          slug: service.slug,
          title: service.title,
          subtitle: service.subtitle,
          duration: service.duration,
          description: service.description,
          highlights: service.highlights as string[],
          iconName: service.iconName,
          accent: service.accent,
          featured: service.featured,
          price: service.price,
        }}
      />
    </div>
  );
}
