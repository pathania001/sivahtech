import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { cookieName, getUserByEmail, signAdminToken, verifyPassword } from "@/lib/auth";
import { assertSameOrigin, rateLimit, validateJson } from "@/lib/security";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, 10, 60_000);
  if (limited) return limited;
  const originError = assertSameOrigin(request);
  if (originError) return originError;
  const parsed = validateJson(schema, await request.json());
  if (parsed.error) return parsed.error;

  const user = await getUserByEmail(parsed.data.email);
  if (!user || !user.is_active || !(await verifyPassword(parsed.data.password, user.password_hash))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signAdminToken({ id: user.id, name: user.name, email: user.email, role: user.role });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
  return response;
}
