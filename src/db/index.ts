import { mkdirSync } from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

/**
 * 本地开发使用 SQLite（better-sqlite3）。
 * 部署到 Vercel + Neon 时，此文件会切换为 PostgreSQL 客户端，
 * schema 定义（src/db/schema.ts）中的 text/integer 类型保持不变。
 */

const DB_PATH = process.env.DATABASE_URL ?? path.join(process.cwd(), "data", "sqlite.db");

// 确保数据目录存在（SQLite 需要目录已存在才能创建文件）
if (!DB_PATH.startsWith("postgres")) {
  mkdirSync(path.dirname(DB_PATH), { recursive: true });
}

// 开发模式下热重载会重复 import，用 globalThis 缓存连接，避免重复打开数据库
const globalForDb = globalThis as unknown as {
  sqlite?: Database.Database;
};

const sqlite = globalForDb.sqlite ?? new Database(DB_PATH);
sqlite.pragma("journal_mode = WAL");

if (process.env.NODE_ENV !== "production") {
  globalForDb.sqlite = sqlite;
}

export const db = drizzle(sqlite, { schema });
