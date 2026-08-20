import Link from "next/link";
import { BlogMeta } from "@/components/blog/BlogMeta";
import type { BlogPost } from "@/lib/blog";

export function BlogListItem({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-list-item">
      <div className="blog-list-copy">
        <BlogMeta post={post} />
        <h2>{post.title}</h2>
        <p>{post.description}</p>
      </div>
      <div className="blog-list-arrow" aria-hidden="true">↗</div>
    </Link>
  );
}
