import { redirect, notFound } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { adminResources } from "@/lib/admin-resource";
import { ResourceManager } from "./resource-manager";

export default async function ResourcePage({ params }: { params: Promise<{ resource: string }> }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  const { resource } = await params;
  const item = adminResources.find((entry) => entry.name === resource);
  if (!item) notFound();
  return <ResourceManager resource={item.name} label={item.label} />;
}
