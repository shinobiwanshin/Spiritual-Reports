"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
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

export async function createPost(formData: FormData) {
  await requireAdmin();

  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const category = formData.get("category") as string;
  const readTime = formData.get("readTime") as string;
  const iconName = formData.get("iconName") as string;
  const content = formData.get("content") as string;
  const imageFile = formData.get("image") as File | null;

  let image: string | null = null;
  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    image = `data:${imageFile.type};base64,${buffer.toString("base64")}`;
  }

  const now = new Date();
  const date = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  await db.insert(blogPosts).values({
    title,
    excerpt,
    category,
    readTime: readTime || "5 min read",
    iconName: iconName || "FileText",
    content: content || null,
    image,
    date,
  });

  revalidatePath("/blog");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updatePost(id: number, formData: FormData) {
  await requireAdmin();

  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const category = formData.get("category") as string;
  const readTime = formData.get("readTime") as string;
  const iconName = formData.get("iconName") as string;
  const content = formData.get("content") as string;
  const imageFile = formData.get("image") as File | null;
  const keepExistingImage = formData.get("keepExistingImage") as string;

  let image: string | null | undefined = undefined; // undefined = no change
  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    image = `data:${imageFile.type};base64,${buffer.toString("base64")}`;
  } else if (keepExistingImage !== "true") {
    image = null; // explicitly removed
  }

  const updateData: Record<string, unknown> = {
    title,
    excerpt,
    category,
    readTime: readTime || "5 min read",
    iconName: iconName || "FileText",
    content: content || null,
  };

  if (image !== undefined) {
    updateData.image = image;
  }

  await db.update(blogPosts).set(updateData).where(eq(blogPosts.id, id));

  revalidatePath("/blog");
  revalidatePath(`/blog/${id}`);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deletePost(id: number) {
  await requireAdmin();

  await db.delete(blogPosts).where(eq(blogPosts.id, id));

  revalidatePath("/blog");
  revalidatePath("/admin");
  redirect("/admin");
}
