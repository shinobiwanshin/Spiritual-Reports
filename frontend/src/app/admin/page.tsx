import Link from "next/link";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { desc } from "drizzle-orm";
import { PlusCircle, Pencil, Trash2, FileText, ImageIcon } from "lucide-react";
import { DeleteButton } from "./delete-button";

export default async function AdminDashboard() {
  const posts = await db
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.createdAt));

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-sm text-white/50 mt-1">
            {posts.length} post{posts.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#cfa375] to-[#e8c99b] text-[#0f0a2e] text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <PlusCircle className="w-4 h-4" />
          New Post
        </Link>
      </div>

      {/* Posts Table */}
      {posts.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
          <FileText className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/50 text-sm">No blog posts yet.</p>
          <Link
            href="/admin/blog/new"
            className="text-[#cfa375] text-sm mt-2 inline-block hover:underline"
          >
            Create your first post →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors group"
            >
              {/* Image thumbnail */}
              <div className="w-14 h-14 rounded-lg bg-[#1a1347] flex items-center justify-center shrink-0 overflow-hidden">
                {post.image ? (
                  <img
                    src={post.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-6 h-6 text-white/20" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white truncate">
                  {post.title}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="px-2 py-0.5 rounded-full bg-[#cfa375]/10 text-[#cfa375] text-xs">
                    {post.category}
                  </span>
                  <span className="text-xs text-white/40">{post.date}</span>
                  <span className="text-xs text-white/40">{post.readTime}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  href={`/admin/blog/${post.id}/edit`}
                  className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </Link>
                <DeleteButton postId={post.id} postTitle={post.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
