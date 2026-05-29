import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { query } from "@/lib/db";
import { rateLimit, validateJson } from "@/lib/security";

const schema = z.object({
  email: z.string().email(),
  sourcePage: z.string().max(255).optional().default("/")
});

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, 10, 60_000);
  if (limited) return limited;
  const parsed = validateJson(schema, await request.json());
  if (parsed.error) return parsed.error;
  await query(
    "INSERT INTO newsletter_subscribers (email, source_page, status) VALUES (?, ?, 'active') ON DUPLICATE KEY UPDATE status = 'active', updated_at = CURRENT_TIMESTAMP",
    [parsed.data.email, parsed.data.sourcePage]
  );
  return NextResponse.json({ ok: true });
}
