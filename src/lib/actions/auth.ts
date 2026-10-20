"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSessionToken, verifyPassword } from "@/lib/auth";

export type LoginState = { error?: string };

/** 登录：校验密码，成功后签发会话 Cookie */
export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || !verifyPassword(password, adminPassword)) {
    return { error: "密码错误，请重试" };
  }

  const store = await cookies();
  store.set("session", createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 天
    path: "/",
  });

  redirect("/admin");
}

/** 退出登录 */
export async function logout() {
  const store = await cookies();
  store.delete("session");
  redirect("/admin/login");
}
