import type { MetadataRoute } from "next";
import { query } from "@/lib/db";

const staticPages = [
  "index.html",
  "about.html",
  "services.html",
  "work.html",
  "process.html",
  "features.html",
  "pricing.html",
  "blog.html",
  "contact.html",
  "faq.html",
  "testimonials.html",
  "terms.html",
  "privacy.html"
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sivahtech.com";
  const blogs = await query<{ slug: string; updated_at: string }>("SELECT slug, updated_at FROM blogs WHERE status = 'published'");
  return [
    ...staticPages.map((page) => ({
      url: `${siteUrl}/${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "index.html" ? 1 : 0.8
    })),
    ...blogs.map((blog) => ({
      url: `${siteUrl}/blog/${blog.slug}`,
      lastModified: new Date(blog.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.7
    }))
  ];
}
