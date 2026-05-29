import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { query } from "@/lib/db";
import { sendLeadEmails } from "@/lib/email";
import { rateLimit, validateJson } from "@/lib/security";

const leadSchema = z.object({
  name: z.string().min(1).max(160),
  email: z.string().email(),
  phone: z.string().max(80).optional().default(""),
  service: z.string().max(160).optional().default("Website enquiry"),
  message: z.string().max(4000).optional().default(""),
  sourcePage: z.string().max(255).optional().default("/")
});

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, 8, 60_000);
  if (limited) return limited;
  const parsed = validateJson(leadSchema, await request.json());
  if (parsed.error) return parsed.error;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "";

  await query(
    "INSERT INTO leads (name, email, phone, service, message, source_page, ip_address, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'new')",
    [parsed.data.name, parsed.data.email, parsed.data.phone, parsed.data.service, parsed.data.message, parsed.data.sourcePage, ip]
  );
  await sendLeadEmails(parsed.data);
  return NextResponse.json({ ok: true });
}
