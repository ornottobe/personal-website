import { asc } from "drizzle-orm";
import { getDb } from "@/db";
import {
  experiences,
  profile,
  projects,
  skills,
  socialLinks,
} from "@/db/schema";

/** 数据读取层：前台与后台共用的查询函数 */

export async function getProfile() {
  const db = getDb();
  const rows = await db.select().from(profile).limit(1);
  return rows[0] ?? null;
}

export async function getSkills() {
  const db = getDb();
  return db.select().from(skills).orderBy(asc(skills.sortOrder));
}

export async function getProjects() {
  const db = getDb();
  return db.select().from(projects).orderBy(asc(projects.sortOrder));
}

export async function getSocialLinks() {
  const db = getDb();
  return db.select().from(socialLinks).orderBy(asc(socialLinks.sortOrder));
}

export async function getExperiences() {
  const db = getDb();
  return db.select().from(experiences).orderBy(asc(experiences.sortOrder));
}
