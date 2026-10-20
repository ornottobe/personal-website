/**
 * 极简、无状态的后台登录认证（Cloudflare Workers 兼容，使用 Web Crypto API）。
 * 方案：密码来自环境变量 ADMIN_PASSWORD；
 * 登录成功后签发一个 HMAC-SHA256 签名的会话 Cookie（无需数据库存储会话）。
 */

function secret(): string {
  return process.env.ADMIN_PASSWORD ?? "dev-only-secret";
}

async function sign(value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** 生成会话令牌（登录成功后写入 Cookie） */
export async function createSessionToken(): Promise<string> {
  return sign("admin-session");
}

/** 校验会话令牌是否有效 */
export async function verifySessionToken(
  token: string | undefined | null,
): Promise<boolean> {
  if (!token) return false;
  const expected = await sign("admin-session");
  return timingSafeEqual(token, expected);
}

/** 校验登录密码（恒定时间比较，防止时序攻击） */
export function verifyPassword(input: string, expected: string): boolean {
  return timingSafeEqual(input, expected);
}

/** 恒定时间字符串比较，防止时序攻击 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}
