import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken } from "@/lib/auth";

/** 当前请求是否已登录（供 Server Component / Server Action 使用） */
export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get("session")?.value);
}

/** 确保已登录，否则重定向到登录页（供 Server Action 使用） */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }
}
