import { NextRequest, NextResponse } from "next/server";
import { getTable, searchableColumns, type ResourceName } from "@/lib/admin-resource";
import { query } from "@/lib/db";
import { requireAdmin } from "@/lib/api-auth";
import { assertSameOrigin, rateLimit } from "@/lib/security";

function cleanRecord(input: Record<string, unknown>) {
  const blocked = new Set(["id", "created_at", "updated_at"]);
  return Object.fromEntries(Object.entries(input).filter(([key, value]) => !blocked.has(key) && value !== undefined));
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
  const auth = requireAdmin(request);
  if (auth.error) return auth.error;
  const { resource } = await params;
  const table = getTable(resource);
  if (!table) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  const search = request.nextUrl.searchParams.get("search");
  const status = request.nextUrl.searchParams.get("status");
  const clauses: string[] = [];
  const values: unknown[] = [];
  if (search) {
    const columns = searchableColumns[resource as ResourceName];
    clauses.push(`(${columns.map((column) => `${column} LIKE ?`).join(" OR ")})`);
    columns.forEach(() => values.push(`%${search}%`));
  }
  if (status) {
    clauses.push("status = ?");
    values.push(status);
  }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const rows = await query(`SELECT * FROM ${table} ${where} ORDER BY updated_at DESC LIMIT 200`, values);
  return NextResponse.json({ rows });
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ resource: string }> }) {
  const auth = requireAdmin(request);
  if (auth.error) return auth.error;
  const limited = rateLimit(request, 60, 60_000);
  if (limited) return limited;
  const originError = assertSameOrigin(request);
  if (originError) return originError;
  const { resource } = await params;
  const table = getTable(resource);
  if (!table) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  const body = cleanRecord(await request.json());
  const keys = Object.keys(body);
  if (!keys.length) return NextResponse.json({ error: "Empty payload" }, { status: 422 });
  const placeholders = keys.map(() => "?").join(", ");
  await query(`INSERT INTO ${table} (${keys.join(", ")}) VALUES (${placeholders})`, keys.map((key) => body[key]));
  return NextResponse.json({ ok: true });
}
