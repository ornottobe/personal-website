"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { profile } from "@/db/schema";
import { requireAdmin } from "@/lib/auth-server";

/** 更新个人信息（单行，id 固定为 "main"） */
export async function updateProfile(formData: FormData) {
  await requireAdmin();

  const data = {
    name: String(formData.get("name") ?? ""),
    title: String(formData.get("title") ?? ""),
    bio: String(formData.get("bio") ?? ""),
    avatarUrl: String(formData.get("avatarUrl") ?? ""),
    email: String(formData.get("email") ?? ""),
    location: String(formData.get("location") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    website: String(formData.get("website") ?? ""),
    resumeUrl: String(formData.get("resumeUrl") ?? ""),
    updatedAt: new Date(),
  };

  await db
    .insert(profile)
    .values({ id: "main", ...data })
    .onConflictDoUpdate({ target: profile.id, set: data });

  revalidatePath("/");
  revalidatePath("/admin");
}
