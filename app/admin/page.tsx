import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { query, queryOne } from "@/lib/db";

async function count(table: string) {
  const row = await queryOne<{ total: number }>(`SELECT COUNT(*) as total FROM ${table}`);
  return Number(row?.total || 0);
}

export default async function AdminDashboard() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  const [leads, blogs, services, messages, monthly, activity] = await Promise.all([
    count("leads"),
    count("blogs"),
    count("services"),
    count("leads"),
    query<{ month: string; total: number }>(
      "SELECT DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as total FROM leads GROUP BY month ORDER BY month DESC LIMIT 12"
    ),
    query<{ label: string; created_at: string }>(
      "SELECT CONCAT(name, ' submitted a lead') as label, created_at FROM leads ORDER BY created_at DESC LIMIT 8"
    )
  ]);

  return (
    <div>
      <h1>Dashboard Overview</h1>
      <div className="admin-grid">
        <div className="admin-card"><strong>Total Leads</strong><h2>{leads}</h2></div>
        <div className="admin-card"><strong>Total Blogs</strong><h2>{blogs}</h2></div>
        <div className="admin-card"><strong>Total Services</strong><h2>{services}</h2></div>
        <div className="admin-card"><strong>Total Messages</strong><h2>{messages}</h2></div>
      </div>
      <div className="admin-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <section className="admin-card">
          <h2>Monthly Lead Statistics</h2>
          <table className="admin-table"><tbody>{monthly.map((item) => <tr key={item.month}><td>{item.month}</td><td>{item.total}</td></tr>)}</tbody></table>
        </section>
        <section className="admin-card">
          <h2>Recent Activity</h2>
          <table className="admin-table"><tbody>{activity.map((item) => <tr key={`${item.label}-${item.created_at}`}><td>{item.label}</td><td>{new Date(item.created_at).toLocaleString()}</td></tr>)}</tbody></table>
        </section>
      </div>
    </div>
  );
}
