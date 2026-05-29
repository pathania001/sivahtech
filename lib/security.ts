import { NextRequest, NextResponse } from "next/server";
import { ZodSchema } from "zod";

const buckets = new Map<string, { count: number; reset: number }>();

export function rateLimit(request: NextRequest, limit = 60, windowMs = 60_000) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const key = `${ip}:${request.nextUrl.pathname}`;
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.reset < now) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return null;
  }
  bucket.count += 1;
  if (bucket.count > limit) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  return null;
}

export function validateJson<T>(schema: ZodSchema<T>, data: unknown) {
  const result = schema.safeParse(data);
  if (!result.success) {
    return { error: NextResponse.json({ error: "Invalid input", issues: result.error.flatten() }, { status: 422 }) };
  }
  return { data: result.data };
}

export function assertSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return null;
  const host = request.headers.get("host");
  try {
    if (new URL(origin).host !== host) {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  return null;
}
