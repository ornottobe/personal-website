import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 关闭 Cache Components / PPR，采用传统动态渲染：
     - 前台实时读取数据库（后台修改后立即生效）
     - 后台基于 Cookie 认证，天然为动态路由 */
  cacheComponents: false,
  serverExternalPackages: ["better-sqlite3"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
