import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegacyPage, getStaticPageSlugs, normalizeSlug } from "@/lib/legacy-page";
import { LegacyRenderer } from "../legacy-renderer";

export const revalidate = 300;

export function generateStaticParams() {
  return getStaticPageSlugs();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const fileName = normalizeSlug(slug);
    const page = await getLegacyPage(fileName);
    return {
      title: page.title,
      description: page.description,
      alternates: { canonical: `/${fileName}` },
      openGraph: {
        type: fileName === "blog.html" ? "article" : "website",
        title: page.title,
        description: page.description,
        url: `/${fileName}`,
        images: ["/logo.svg"]
      },
      twitter: {
        card: "summary",
        title: page.title,
        description: page.description,
        images: ["/logo.svg"]
      }
    };
  } catch {
    return {};
  }
}

export default async function StaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    return <LegacyRenderer slug={slug} />;
  } catch {
    notFound();
  }
}
