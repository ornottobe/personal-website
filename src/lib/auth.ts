import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * 极简、无状态的后台登录认证。
 * 方案：密码来自环境变量 ADMIN_PASSWORD；
 * 登录成功后签发一个 HMAC-SHA256 签名的会话 Cookie（无需数据库存储会话）。
 */

function secret(): string {
  return process.env.ADMIN_PASSWORD ?? "dev-only-secret";
}

function sign(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

/** 生成会话令牌（登录成功后写入 Cookie） */
export function createSessionToken(): string {
  return sign("admin-session");
}

/** 校验会话令牌是否有效 */
export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const expected = sign("admin-session");
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** 校验登录密码（恒定时间比较，防止时序攻击） */
export function verifyPassword(input: string, expected: string): boolean {
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
