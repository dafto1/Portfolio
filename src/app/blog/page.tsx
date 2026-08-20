import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogListItem } from "@/components/blog/BlogListItem";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog — Shreyas Nikam",
  description: "Engineering notes, experiments, and things I am learning.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="blog-page">
      <BlogHeader />
      <main className="blog-index">
        <h1>Shreyas&apos; blogs</h1>
        <p className="blog-intro-description">engineering notes, experiments, and things I&apos;m learning.</p>
        <section className="blog-list" aria-label="Blog posts">
          {posts.length ? posts.map((post) => <BlogListItem key={post.slug} post={post} />) : <p className="blog-empty">No posts published yet.</p>}
        </section>
      </main>
    </div>
  );
}
