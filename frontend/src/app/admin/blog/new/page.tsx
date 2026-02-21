import { createPost } from "../../actions/blog";
import { BlogPostForm } from "../../blog-form";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Create New Post</h1>
      <BlogPostForm action={createPost} />
    </div>
  );
}
