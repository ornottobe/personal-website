import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema";

/**
 * Cloudflare 部署使用 D1（Cloudflare 原生 SQLite 数据库）。
 * - 生产环境：通过 wrangler.jsonc 中的 D1 绑定访问真实数据库。
 * - 本地开发（next dev）：由 next.config.ts 中的 initOpenNextCloudflareForDev
 *   提供 D1 的本地模拟（miniflare）。
 *
 * D1 是无状态的 HTTP 绑定，drizzle 实例是轻量查询构建器，
 * 因此在每次请求/调用中通过 getDb() 获取是安全且推荐的做法。
 */

declare global {
  interface CloudflareEnv {
    DB: D1Database;
  }
}

export function getDb() {
  const { env } = getCloudflareContext();
  return drizzle(env.DB, { schema });
}
