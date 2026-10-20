"use server";

import { randomUUID } from "node:crypto";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { requireAdmin } from "@/lib/auth-server";
import { revalidateSite } from "./shared";

export async function addProject(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;

  const description = String(formData.get("description") ?? "").trim();
  const link = String(formData.get("link") ?? "").trim();
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const tags = String(formData.get("tags") ?? "").trim();

  const rows = await db
    .select({ max: sql<number>`coalesce(max(${projects.sortOrder}), -1)` })
    .from(projects);
  const sortOrder = Number(rows[0]?.max ?? -1) + 1;

  await db
    .insert(projects)
    .values({ id: randomUUID(), title, description, link, imageUrl, tags, sortOrder });

  revalidateSite();
}

export async function updateProject(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const link = String(formData.get("link") ?? "").trim();
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const tags = String(formData.get("tags") ?? "").trim();

  await db
    .update(projects)
    .set({ title, description, link, imageUrl, tags })
    .where(eq(projects.id, id));

  revalidateSite();
}

export async function deleteProject(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await db.delete(projects).where(eq(projects.id, id));
  revalidateSite();
}
