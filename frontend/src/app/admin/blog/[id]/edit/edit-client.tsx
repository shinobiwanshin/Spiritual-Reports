"use client";

import { updatePost } from "../../../actions/blog";
import { BlogPostForm } from "../../../blog-form";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  iconName: string;
  content: string | null;
  image: string | null;
}

export function EditPostClient({ post }: { post: Post }) {
  const boundUpdatePost = updatePost.bind(null, post.id);

  return <BlogPostForm initialData={post} action={boundUpdatePost} />;
}
