import { hashPassword } from "../lib/auth";
import { query } from "../lib/db";

async function main() {
  const name = process.env.ADMIN_NAME || "Sivah Tech Admin";
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required");
  }
  const hash = await hashPassword(password);
  await query(
    "INSERT INTO users (name, email, password_hash, role, is_active) VALUES (?, ?, ?, 'admin', 1) ON DUPLICATE KEY UPDATE name = VALUES(name), password_hash = VALUES(password_hash), is_active = 1",
    [name, email, hash]
  );
  console.log(`Admin user ready: ${email}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
