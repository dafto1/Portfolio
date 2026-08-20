import { formatPostDate, type BlogPost } from "@/lib/blog";

export function BlogMeta({ post }: { post: BlogPost }) {
  return (
    <div className="blog-meta">
      <span>{formatPostDate(post.date)}</span>
      <span>·</span>
      <span>{post.readingTime}</span>
      <span>·</span>
      <span>{post.category}</span>
    </div>
  );
}
