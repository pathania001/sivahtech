import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { queryOne } from "./db";

export type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const cookieName = "sivah_admin_token";

function jwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is required");
  return secret;
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export function signAdminToken(user: AdminUser) {
  return jwt.sign(user, jwtSecret(), { expiresIn: "8h" });
}

export function verifyAdminToken(token: string) {
  return jwt.verify(token, jwtSecret()) as AdminUser;
}

export async function getCurrentAdmin() {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return null;
  try {
    return verifyAdminToken(token);
  } catch {
    return null;
  }
}

export async function getUserByEmail(email: string) {
  return queryOne<AdminUser & { password_hash: string; is_active: number }>(
    "SELECT id, name, email, password_hash, role, is_active FROM users WHERE email = ? LIMIT 1",
    [email]
  );
}

export { cookieName };
