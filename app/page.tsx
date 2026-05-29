import type { Metadata } from "next";
import { getLegacyPage } from "@/lib/legacy-page";
import { LegacyRenderer } from "./legacy-renderer";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegacyPage("index.html");
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: "/index.html" },
    openGraph: {
      type: "website",
      title: page.title,
      description: page.description,
      url: "/index.html",
      images: ["/logo.svg"]
    },
    twitter: {
      card: "summary",
      title: page.title,
      description: page.description,
      images: ["/logo.svg"]
    }
  };
}

export default function HomePage() {
  return <LegacyRenderer slug="index.html" />;
}
