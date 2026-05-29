import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { queryOne, query } from "@/lib/db";
import { getSettings } from "@/lib/settings";

type Blog = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content_html: string;
  meta_title: string;
  meta_description: string;
  featured_image_url: string | null;
  author_name: string;
  published_at: string;
};

async function getBlog(slug: string) {
  return queryOne<Blog>(
    "SELECT id, title, slug, excerpt, content_html, meta_title, meta_description, featured_image_url, author_name, published_at FROM blogs WHERE slug = ? AND status = 'published' LIMIT 1",
    [slug]
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return {};
  return {
    title: blog.meta_title || `${blog.title} | Sivah Tech`,
    description: blog.meta_description || blog.excerpt,
    alternates: { canonical: `/blog/${blog.slug}` },
    openGraph: {
      type: "article",
      title: blog.meta_title || blog.title,
      description: blog.meta_description || blog.excerpt,
      url: `/blog/${blog.slug}`,
      images: [blog.featured_image_url || "/logo.svg"]
    }
  };
}

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [blog, settings] = await Promise.all([getBlog(slug), getSettings()]);
  if (!blog) notFound();
  const related = await query<Pick<Blog, "title" | "slug" | "excerpt">>(
    "SELECT title, slug, excerpt FROM blogs WHERE status = 'published' AND id <> ? ORDER BY published_at DESC LIMIT 3",
    [blog.id]
  );
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.meta_description || blog.excerpt,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://sivahtech.com"}/blog/${blog.slug}`,
    image: blog.featured_image_url || `${process.env.NEXT_PUBLIC_SITE_URL || "https://sivahtech.com"}/logo.svg`,
    author: { "@type": "Organization", name: settings.companyName },
    publisher: { "@type": "Organization", name: settings.companyName },
    datePublished: blog.published_at
  };

  return (
    <main className="site-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="page-hero section-blue">
        <div className="container page-hero-grid">
          <div className="page-hero-copy reveal">
            <p className="eyebrow">Insights</p>
            <h1>{blog.title}</h1>
            <p>{blog.excerpt}</p>
            <div className="hero-chip-row">
              <span>{blog.author_name}</span>
              <span>{new Date(blog.published_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container legal-panel">
          <article dangerouslySetInnerHTML={{ __html: blog.content_html }} />
          <div className="hero-actions" style={{ marginTop: 28 }}>
            <Link className="btn btn-outline" href="/blog.html">
              Back to Insights
            </Link>
            <a className="btn btn-primary" href={`https://www.linkedin.com/shareArticle?mini=true&url=/blog/${blog.slug}`}>
              Share Article
            </a>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="section section-soft">
          <div className="container">
            <div className="section-heading">
              <p className="section-label">Related Posts</p>
              <h2>More thinking from Sivah Tech</h2>
            </div>
            <div className="blog-grid">
              {related.map((item) => (
                <article className="blog-card" key={item.slug}>
                  <div className="blog-card-content">
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                    <Link className="btn btn-outline" href={`/blog/${item.slug}`}>
                      Read More
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
