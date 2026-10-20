import { defineConfig } from "drizzle-kit";

/**
 * Drizzle Kit 配置（本地 SQLite 版本）。
 * 部署到 Neon PostgreSQL 时，将 dialect 改为 postgresql，
 * 并替换 dbCredentials 为 DATABASE_URL。
 */
export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "./data/sqlite.db",
  },
});
