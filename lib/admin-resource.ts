export const resourceTables = {
  pages: "pages",
  services: "services",
  blogs: "blogs",
  blog_categories: "blog_categories",
  faq: "faq",
  testimonials: "testimonials",
  team_members: "team_members",
  case_studies: "case_studies",
  media: "media",
  leads: "leads",
  settings: "settings",
  seo: "seo",
  menus: "menus",
  newsletter_subscribers: "newsletter_subscribers"
} as const;

export type ResourceName = keyof typeof resourceTables;

export function getTable(resource: string) {
  if (!(resource in resourceTables)) return null;
  return resourceTables[resource as ResourceName];
}

export const searchableColumns: Record<ResourceName, string[]> = {
  pages: ["title", "slug", "meta_description"],
  services: ["title", "slug", "excerpt"],
  blogs: ["title", "slug", "excerpt", "author_name"],
  blog_categories: ["name", "slug", "description"],
  faq: ["question", "answer", "category"],
  testimonials: ["name", "role", "company", "quote"],
  team_members: ["name", "role", "bio"],
  case_studies: ["title", "slug", "client_name", "industry", "summary"],
  media: ["file_name", "file_url", "mime_type", "alt_text", "folder"],
  leads: ["name", "email", "phone", "service", "message", "source_page", "notes"],
  settings: ["setting_group", "setting_key", "setting_value"],
  seo: ["entity_type", "slug", "meta_title", "meta_description"],
  menus: ["menu_location", "label", "url"],
  newsletter_subscribers: ["email", "source_page"]
};

export const adminResources: { name: ResourceName; label: string }[] = [
  { name: "pages", label: "Pages" },
  { name: "services", label: "Services" },
  { name: "blogs", label: "Blogs" },
  { name: "blog_categories", label: "Blog Categories" },
  { name: "faq", label: "FAQ" },
  { name: "testimonials", label: "Testimonials" },
  { name: "team_members", label: "Team Members" },
  { name: "case_studies", label: "Case Studies" },
  { name: "media", label: "Media" },
  { name: "leads", label: "Leads" },
  { name: "settings", label: "Settings" },
  { name: "seo", label: "SEO" },
  { name: "menus", label: "Menus" },
  { name: "newsletter_subscribers", label: "Newsletter" }
];
