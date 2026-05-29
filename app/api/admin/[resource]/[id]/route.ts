import { NextRequest, NextResponse } from "next/server";
import { getTable } from "@/lib/admin-resource";
import { query } from "@/lib/db";
import { requireAdmin } from "@/lib/api-auth";
import { assertSameOrigin, rateLimit } from "@/lib/security";

function cleanRecord(input: Record<string, unknown>) {
  const blocked = new Set(["id", "created_at", "updated_at"]);
  return Object.fromEntries(Object.entries(input).filter(([key, value]) => !blocked.has(key) && value !== undefined));
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ resource: string; id: string }> }) {
  const auth = requireAdmin(request);
  if (auth.error) return auth.error;
  const limited = rateLimit(request, 60, 60_000);
  if (limited) return limited;
  const originError = assertSameOrigin(request);
  if (originError) return originError;
  const { resource, id } = await params;
  const table = getTable(resource);
  if (!table) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  const body = cleanRecord(await request.json());
  const keys = Object.keys(body);
  if (!keys.length) return NextResponse.json({ error: "Empty payload" }, { status: 422 });
  await query(`UPDATE ${table} SET ${keys.map((key) => `${key} = ?`).join(", ")} WHERE id = ?`, [...keys.map((key) => body[key]), id]);
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ resource: string; id: string }> }) {
  const auth = requireAdmin(request);
  if (auth.error) return auth.error;
  const originError = assertSameOrigin(request);
  if (originError) return originError;
  const { resource, id } = await params;
  const table = getTable(resource);
  if (!table) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  await query(`DELETE FROM ${table} WHERE id = ?`, [id]);
  return NextResponse.json({ ok: true });
}
