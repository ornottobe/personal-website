import { randomUUID } from "node:crypto";
import { db } from "./index";
import { experiences, profile, projects, skills, socialLinks } from "./schema";

/**
 * 种子数据：用于本地开发初始化，以及首次部署后的演示内容。
 * 所有内容都可以在后台管理界面中修改。
 */
async function seed() {
  console.log("开始写入种子数据...");

  // 清空旧数据
  await db.delete(experiences);
  await db.delete(socialLinks);
  await db.delete(projects);
  await db.delete(skills);
  await db.delete(profile);

  // 个人信息（单行）
  await db.insert(profile).values({
    id: "main",
    name: "林晓",
    title: "全栈开发工程师 · Full-Stack Developer",
    bio: "热爱构建优雅、实用的 Web 应用。专注于 React / Next.js / Node.js 技术栈，喜欢把复杂问题拆解成简单、可维护的解决方案。业余时间热衷于开源与写作。",
    avatarUrl: "",
    email: "hello@example.com",
    location: "中国 · 上海",
    phone: "",
    website: "https://example.com",
    resumeUrl: "",
    updatedAt: new Date(),
  });

  // 技能
  const skillSeed = [
    { name: "TypeScript", level: 90, category: "前端", icon: "🟦" },
    { name: "React", level: 90, category: "前端", icon: "⚛️" },
    { name: "Next.js", level: 85, category: "前端", icon: "▲" },
    { name: "Vue", level: 70, category: "前端", icon: "🟢" },
    { name: "Node.js", level: 85, category: "后端", icon: "🟩" },
    { name: "Python", level: 75, category: "后端", icon: "🐍" },
    { name: "PostgreSQL", level: 70, category: "后端", icon: "🐘" },
    { name: "Git", level: 85, category: "工具", icon: "🔧" },
    { name: "Docker", level: 70, category: "工具", icon: "🐳" },
    { name: "Tailwind CSS", level: 85, category: "前端", icon: "🌊" },
  ];
  let i = 0;
  for (const s of skillSeed) {
    await db.insert(skills).values({
      id: randomUUID(),
      name: s.name,
      level: s.level,
      category: s.category,
      icon: s.icon,
      sortOrder: i++,
    });
  }

  // 项目
  const projectSeed = [
    {
      title: "个人网站",
      description: "基于 Next.js 的个人网站，包含前台展示与后台管理，支持在线编辑个人信息。",
      link: "https://example.com",
      imageUrl: "",
      tags: "Next.js,React,Tailwind CSS",
    },
    {
      title: "任务管理应用",
      description: "一个支持看板视图、拖拽排序与团队协作的任务管理工具。",
      link: "https://example.com",
      imageUrl: "",
      tags: "React,Node.js,PostgreSQL",
    },
    {
      title: "数据可视化大屏",
      description: "面向业务运营的实时数据可视化大屏，支持多维度图表与自动刷新。",
      link: "https://example.com",
      imageUrl: "",
      tags: "Vue,ECharts,WebSocket",
    },
  ];
  i = 0;
  for (const p of projectSeed) {
    await db.insert(projects).values({
      id: randomUUID(),
      title: p.title,
      description: p.description,
      link: p.link,
      imageUrl: p.imageUrl,
      tags: p.tags,
      sortOrder: i++,
    });
  }

  // 社交链接
  const socialSeed = [
    { platform: "GitHub", url: "https://github.com", icon: "🐙" },
    { platform: "Email", url: "mailto:hello@example.com", icon: "✉️" },
    { platform: "LinkedIn", url: "https://linkedin.com", icon: "💼" },
    { platform: "微博", url: "https://weibo.com", icon: "🔴" },
  ];
  i = 0;
  for (const s of socialSeed) {
    await db.insert(socialLinks).values({
      id: randomUUID(),
      platform: s.platform,
      url: s.url,
      icon: s.icon,
      sortOrder: i++,
    });
  }

  // 经历
  const expSeed = [
    {
      type: "work",
      organization: "某科技公司",
      role: "高级前端工程师",
      period: "2022 — 至今",
      description: "负责核心产品的前端架构与性能优化，主导组件库建设。",
    },
    {
      type: "work",
      organization: "某互联网公司",
      role: "前端工程师",
      period: "2020 — 2022",
      description: "参与多个 Web 应用的开发与维护，负责用户增长相关功能。",
    },
    {
      type: "education",
      organization: "某大学",
      role: "计算机科学与技术 · 本科",
      period: "2016 — 2020",
      description: "主修计算机科学，参与多个开源项目与编程竞赛。",
    },
  ];
  i = 0;
  for (const e of expSeed) {
    await db.insert(experiences).values({
      id: randomUUID(),
      type: e.type,
      organization: e.organization,
      role: e.role,
      period: e.period,
      description: e.description,
      sortOrder: i++,
    });
  }

  console.log("种子数据写入完成 ✅");
  process.exit(0);
}

seed().catch((err) => {
  console.error("种子数据写入失败:", err);
  process.exit(1);
});
