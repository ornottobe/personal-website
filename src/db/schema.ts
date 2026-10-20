import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * 数据模型说明
 * 这里刻意只使用 text / integer 两种基础类型，
 * 目的是让本地的 SQLite 与生产的 PostgreSQL 可以无痛切换。
 * 主键统一用 text（UUID），由应用层生成，避免自增主键在两个数据库间的差异。
 */

/** 个人信息（单行数据，用于前台各展示区块） */
export const profile = sqliteTable("profile", {
  id: text("id").primaryKey(),
  name: text("name").notNull().default(""),
  title: text("title").notNull().default(""),
  bio: text("bio").notNull().default(""),
  avatarUrl: text("avatar_url").notNull().default(""),
  email: text("email").notNull().default(""),
  location: text("location").notNull().default(""),
  phone: text("phone").notNull().default(""),
  website: text("website").notNull().default(""),
  resumeUrl: text("resume_url").notNull().default(""),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

/** 技能 */
export const skills = sqliteTable("skills", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  level: integer("level").notNull().default(80),
  category: text("category").notNull().default(""),
  icon: text("icon").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

/** 项目 */
export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull().default(""),
  link: text("link").notNull().default(""),
  imageUrl: text("image_url").notNull().default(""),
  tags: text("tags").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

/** 社交链接 */
export const socialLinks = sqliteTable("social_links", {
  id: text("id").primaryKey(),
  platform: text("platform").notNull(),
  url: text("url").notNull(),
  icon: text("icon").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

/** 工作 / 教育经历 */
export const experiences = sqliteTable("experiences", {
  id: text("id").primaryKey(),
  type: text("type").notNull().default("work"), // work | education
  organization: text("organization").notNull(),
  role: text("role").notNull().default(""),
  period: text("period").notNull().default(""),
  description: text("description").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export type Profile = typeof profile.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type SocialLink = typeof socialLinks.$inferSelect;
export type Experience = typeof experiences.$inferSelect;
