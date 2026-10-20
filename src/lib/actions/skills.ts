"use server";

import { eq, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { skills } from "@/db/schema";
import { requireAdmin } from "@/lib/auth-server";
import { revalidateSite } from "./shared";

export async function addSkill(formData: FormData) {
  await requireAdmin();
  const db = getDb();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  const level = clamp(parseInt(String(formData.get("level") ?? "80"), 10), 0, 100);
  const category = String(formData.get("category") ?? "").trim();
  const icon = String(formData.get("icon") ?? "").trim();

  const rows = await db
    .select({ max: sql<number>`coalesce(max(${skills.sortOrder}), -1)` })
    .from(skills);
  const sortOrder = Number(rows[0]?.max ?? -1) + 1;

  await db
    .insert(skills)
    .values({ id: crypto.randomUUID(), name, level, category, icon, sortOrder });

  revalidateSite();
}

export async function updateSkill(formData: FormData) {
  await requireAdmin();
  const db = getDb();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const name = String(formData.get("name") ?? "").trim();
  const level = clamp(parseInt(String(formData.get("level") ?? "80"), 10), 0, 100);
  const category = String(formData.get("category") ?? "").trim();
  const icon = String(formData.get("icon") ?? "").trim();

  await db.update(skills).set({ name, level, category, icon }).where(eq(skills.id, id));

  revalidateSite();
}

export async function deleteSkill(formData: FormData) {
  await requireAdmin();
  const db = getDb();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await db.delete(skills).where(eq(skills.id, id));
  revalidateSite();
}

function clamp(n: number, min: number, max: number): number {
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
}
