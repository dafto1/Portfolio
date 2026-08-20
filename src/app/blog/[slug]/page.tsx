import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogMeta } from "@/components/blog/BlogMeta";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} — Shreyas Nikam`, description: post.description };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="blog-page">
      <BlogHeader backLabel="BLOG" />
      <main className="blog-article-layout">
        <TableOfContents headings={post.headings} />
        <article className="blog-article">
          {post.cover ? (
            <div className="blog-hero-image">
              <Image
                src={post.cover}
                alt={post.coverAlt ?? post.title}
                width={2048}
                height={1024}
                priority
                sizes="(max-width: 760px) calc(100vw - 32px), 680px"
              />
            </div>
          ) : null}
          <BlogMeta post={post} />
          <h1>{post.title}</h1>
          <div className="blog-title-rule" />
          <p className="blog-article-lede">{post.description}</p>
          <ArticleBody post={post} />
        </article>
      </main>
    </div>
  );
}
