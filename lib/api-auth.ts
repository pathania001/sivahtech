import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "./auth";

export function requireAdmin(request: NextRequest) {
  const token = request.cookies.get("sivah_admin_token")?.value;
  if (!token) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  try {
    return { user: verifyAdminToken(token) };
  } catch {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
}
