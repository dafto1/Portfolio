import { compileMDX } from "next-mdx-remote/rsc";
import type { BlogPost } from "@/lib/blog";

function headingId(children: React.ReactNode) {
  return String(children).toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
}

export async function ArticleBody({ post }: { post: BlogPost }) {
  const { content } = await compileMDX({
    source: post.content,
    components: {
      h2: ({ children }) => <h2 id={headingId(children)}>{children}</h2>,
      h3: ({ children }) => <h3>{children}</h3>,
      a: ({ href, children }) => <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noreferrer" : undefined}>{children}</a>,
    },
  });

  return <div className="blog-prose">{content}</div>;
}
