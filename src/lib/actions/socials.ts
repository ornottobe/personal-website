"use server";

import { randomUUID } from "node:crypto";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { socialLinks } from "@/db/schema";
import { requireAdmin } from "@/lib/auth-server";
import { revalidateSite } from "./shared";

export async function addSocialLink(formData: FormData) {
  await requireAdmin();
  const platform = String(formData.get("platform") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();
  if (!platform || !url) return;

  const icon = String(formData.get("icon") ?? "").trim();

  const rows = await db
    .select({ max: sql<number>`coalesce(max(${socialLinks.sortOrder}), -1)` })
    .from(socialLinks);
  const sortOrder = Number(rows[0]?.max ?? -1) + 1;

  await db.insert(socialLinks).values({ id: randomUUID(), platform, url, icon, sortOrder });

  revalidateSite();
}

export async function updateSocialLink(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const platform = String(formData.get("platform") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();
  const icon = String(formData.get("icon") ?? "").trim();

  await db
    .update(socialLinks)
    .set({ platform, url, icon })
    .where(eq(socialLinks.id, id));

  revalidateSite();
}

export async function deleteSocialLink(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await db.delete(socialLinks).where(eq(socialLinks.id, id));
  revalidateSite();
}
