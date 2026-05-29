import mysql from "mysql2/promise";

let pool: mysql.Pool | undefined;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      uri: process.env.DATABASE_URL,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
      namedPlaceholders: true
    });
  }
  return pool;
}

export async function query<T = Record<string, unknown>>(sql: string, params: Record<string, unknown> | unknown[] = []) {
  if (!process.env.DATABASE_URL && !process.env.DB_HOST) return [] as T[];
  const [rows] = await getPool().execute(sql, params as never);
  return rows as T[];
}

export async function queryOne<T = Record<string, unknown>>(sql: string, params: Record<string, unknown> | unknown[] = []) {
  const rows = await query<T>(sql, params);
  return rows[0] ?? null;
}
