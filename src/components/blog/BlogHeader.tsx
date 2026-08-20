import Link from "next/link";
import { ThemeToggle } from "@/components/blog/ThemeToggle";

export function BlogHeader({ backLabel = "SITE" }: { backLabel?: string }) {
  return (
    <header className="blog-header">
      <div className="blog-header-inner">
        <Link href={backLabel === "SITE" ? "/#intro" : "/blog"} className="blog-back-link">
          ← {backLabel}
        </Link>
        <Link href="/blog" className="blog-mark">
          Shreyas<span>&apos; blogs</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
