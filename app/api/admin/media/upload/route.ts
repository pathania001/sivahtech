import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { requireAdmin } from "@/lib/api-auth";
import { assertSameOrigin, rateLimit } from "@/lib/security";

const allowed = new Set(["image/jpeg", "image/png", "image/svg+xml", "image/webp"]);

export async function POST(request: NextRequest) {
  const auth = requireAdmin(request);
  if (auth.error) return auth.error;
  const limited = rateLimit(request, 30, 60_000);
  if (limited) return limited;
  const originError = assertSameOrigin(request);
  if (originError) return originError;

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || !allowed.has(file.type)) {
    return NextResponse.json({ error: "Unsupported media type" }, { status: 422 });
  }
  const bytes = Buffer.from(await file.arrayBuffer());
  const extension = file.name.split(".").pop()?.toLowerCase() || "bin";
  const safeName = `${Date.now()}-${file.name.replace(/[^a-z0-9_.-]/gi, "-")}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, safeName), bytes);
  const url = `/uploads/${safeName}`;
  await query("INSERT INTO media (file_name, file_url, mime_type, size_bytes, alt_text) VALUES (?, ?, ?, ?, ?)", [
    file.name,
    url,
    file.type,
    bytes.length,
    form.get("alt") || ""
  ]);
  return NextResponse.json({ ok: true, url, extension });
}
