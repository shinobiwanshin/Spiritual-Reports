"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/db";
import { services } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const role = (user.privateMetadata as { role?: string })?.role;
  if (role !== "Admin") throw new Error("Forbidden: Admin access required");

  return userId;
}

export async function createService(formData: FormData) {
  await requireAdmin();

  const slug = formData.get("slug") as string;
  const title = formData.get("title") as string;
  const subtitle = formData.get("subtitle") as string;
  const duration = formData.get("duration") as string;
  const description = formData.get("description") as string;
  const highlightsRaw = formData.get("highlights") as string;
  const iconName = formData.get("iconName") as string;
  const accent = formData.get("accent") as string;
  const featured = formData.get("featured") === "true";
  const price = parseInt(formData.get("price") as string) || 249;

  const highlights = highlightsRaw
    .split("\n")
    .map((h) => h.trim())
    .filter(Boolean);

  await db.insert(services).values({
    slug,
    title,
    subtitle,
    duration,
    description,
    highlights,
    iconName: iconName || "FileText",
    accent: accent || "#cfa375",
    featured,
    price,
  });

  revalidatePath("/ig");
  revalidatePath("/services");
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function updateService(id: number, formData: FormData) {
  await requireAdmin();

  const slug = formData.get("slug") as string;
  const title = formData.get("title") as string;
  const subtitle = formData.get("subtitle") as string;
  const duration = formData.get("duration") as string;
  const description = formData.get("description") as string;
  const highlightsRaw = formData.get("highlights") as string;
  const iconName = formData.get("iconName") as string;
  const accent = formData.get("accent") as string;
  const featured = formData.get("featured") === "true";
  const price = parseInt(formData.get("price") as string) || 249;

  const highlights = highlightsRaw
    .split("\n")
    .map((h) => h.trim())
    .filter(Boolean);

  await db
    .update(services)
    .set({
      slug,
      title,
      subtitle,
      duration,
      description,
      highlights,
      iconName: iconName || "FileText",
      accent: accent || "#cfa375",
      featured,
      price,
    })
    .where(eq(services.id, id));

  revalidatePath("/ig");
  revalidatePath("/services");
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function deleteService(id: number) {
  await requireAdmin();

  await db.delete(services).where(eq(services.id, id));

  revalidatePath("/ig");
  revalidatePath("/services");
  revalidatePath("/admin/services");
  redirect("/admin/services");
}
