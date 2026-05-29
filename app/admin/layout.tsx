import Link from "next/link";
import { getCurrentAdmin } from "@/lib/auth";
import { adminResources } from "@/lib/admin-resource";
import "./admin.css";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();
  if (!admin) return <>{children}</>;

  return (
    <div className="admin-shell">
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <h2>Sivah Tech CMS</h2>
          <p>{admin.email}</p>
          <Link href="/admin">Dashboard</Link>
          {adminResources.map((resource) => (
            <Link key={resource.name} href={`/admin/${resource.name}`}>
              {resource.label}
            </Link>
          ))}
          <form action="/api/auth/logout" method="post">
            <button className="admin-logout" type="submit">
              Logout
            </button>
          </form>
        </aside>
        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
}
