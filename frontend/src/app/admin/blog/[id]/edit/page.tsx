import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { EditPostClient } from "./edit-client";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const post = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, parseInt(id)))
    .then((rows) => rows[0]);

  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Edit Post</h1>
      <EditPostClient post={post} />
    </div>
  );
}
