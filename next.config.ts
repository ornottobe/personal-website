import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  /* 关闭 Cache Components / PPR，采用传统动态渲染：
     - 前台实时读取数据库（后台修改后立即生效）
     - 后台基于 Cookie 认证，天然为动态路由 */
  cacheComponents: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// 让本地 next dev 与 OpenNext Cloudflare 适配器集成，
// 在开发环境提供 D1 等 Cloudflare bindings 的本地模拟。
initOpenNextCloudflareForDev();

export default nextConfig;
