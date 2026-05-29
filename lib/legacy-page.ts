import { promises as fs } from "fs";
import path from "path";
import sanitizeHtml from "sanitize-html";
import { queryOne } from "./db";
import { applySettings, getSettings } from "./settings";

export type LegacyPage = {
  slug: string;
  title: string;
  description: string;
  headHtml: string;
  bodyHtml: string;
};

const root = process.cwd();

const allowedFiles = new Set([
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
]);

export function normalizeSlug(slug?: string) {
  if (!slug || slug === "home") return "index.html";
  return slug.endsWith(".html") ? slug : `${slug}.html`;
}

function extractBetween(source: string, start: RegExp, end: RegExp) {
  const startMatch = source.match(start);
  if (!startMatch || startMatch.index === undefined) return "";
  const startIndex = startMatch.index + startMatch[0].length;
  const endMatch = source.slice(startIndex).match(end);
  if (!endMatch || endMatch.index === undefined) return "";
  return source.slice(startIndex, startIndex + endMatch.index);
}

function extractMeta(head: string, name: string) {
  const match = head.match(new RegExp(`<meta\\\\s+name=["']${name}["']\\\\s+content=["']([^"']*)["']`, "i"));
  return match?.[1] || "";
}

function cleanBody(bodyHtml: string) {
  return bodyHtml.replace(new RegExp('<script\\\\s+src=["\']script\\\\.js["\']\\\\s+defer></script>', "gi"), "");
}

export async function getLegacyPage(slug?: string): Promise<LegacyPage> {
  const fileName = normalizeSlug(slug);
  if (!allowedFiles.has(fileName)) throw new Error("Page not found");

  const dbPage = await queryOne<{
    slug: string;
    title: string;
    meta_description: string;
    content_html: string;
    head_html: string;
    status: string;
  }>(
    "SELECT slug, title, meta_description, content_html, head_html, status FROM pages WHERE slug = ? AND status = 'published' LIMIT 1",
    [fileName.replace(".html", "")]
  );

  const settings = await getSettings();

  if (dbPage?.content_html) {
    return {
      slug: fileName,
      title: dbPage.title,
      description: dbPage.meta_description,
      headHtml: applySettings(dbPage.head_html || "", settings),
      bodyHtml: applySettings(sanitizeHtml(dbPage.content_html, { allowedTags: false, allowedAttributes: false }), settings)
    };
  }

  const source = await fs.readFile(path.join(/* turbopackIgnore: true */ root, fileName), "utf8");
  const headHtml = extractBetween(source, /<head>/i, new RegExp("</head>", "i"));
  const bodyHtml = cleanBody(extractBetween(source, /<body>/i, new RegExp("</body>", "i")));
  const title = headHtml.match(new RegExp("<title>(.*?)</title>", "is"))?.[1] || "Sivah Tech";
  const description = extractMeta(headHtml, "description");
  return {
    slug: fileName,
    title,
    description,
    headHtml: applySettings(headHtml, settings),
    bodyHtml: applySettings(bodyHtml, settings)
  };
}

export function getStaticPageSlugs() {
  return [...allowedFiles].map((file) => ({ slug: file }));
}
