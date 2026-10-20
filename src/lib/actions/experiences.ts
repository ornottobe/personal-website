"use server";

import { randomUUID } from "node:crypto";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { experiences } from "@/db/schema";
import { requireAdmin } from "@/lib/auth-server";
import { revalidateSite } from "./shared";

export async function addExperience(formData: FormData) {
  await requireAdmin();
  const organization = String(formData.get("organization") ?? "").trim();
  if (!organization) return;

  const type = String(formData.get("type") ?? "work");
  const role = String(formData.get("role") ?? "").trim();
  const period = String(formData.get("period") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  const rows = await db
    .select({ max: sql<number>`coalesce(max(${experiences.sortOrder}), -1)` })
    .from(experiences);
  const sortOrder = Number(rows[0]?.max ?? -1) + 1;

  await db
    .insert(experiences)
    .values({ id: randomUUID(), type, organization, role, period, description, sortOrder });

  revalidateSite();
}

export async function updateExperience(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const type = String(formData.get("type") ?? "work");
  const organization = String(formData.get("organization") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const period = String(formData.get("period") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  await db
    .update(experiences)
    .set({ type, organization, role, period, description })
    .where(eq(experiences.id, id));

  revalidateSite();
}

export async function deleteExperience(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await db.delete(experiences).where(eq(experiences.id, id));
  revalidateSite();
}
