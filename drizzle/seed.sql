-- 种子数据：用于首次部署后的演示内容，均可通过后台管理界面修改。
-- id 使用固定 UUID，保证唯一即可。

-- 个人信息（单行，id 固定为 "main"）
INSERT INTO profile (id, name, title, bio, avatar_url, email, location, phone, website, resume_url, updated_at)
VALUES (
  'main',
  '林晓',
  '全栈开发工程师 · Full-Stack Developer',
  '热爱构建优雅、实用的 Web 应用。专注于 React / Next.js / Node.js 技术栈，喜欢把复杂问题拆解成简单、可维护的解决方案。业余时间热衷于开源与写作。',
  '',
  'hello@example.com',
  '中国 · 上海',
  '',
  'https://example.com',
  '',
  CAST(strftime('%s','now') AS INTEGER)
);

-- 技能
INSERT INTO skills (id, name, level, category, icon, sort_order) VALUES
('00000000-0000-0000-0000-000000000101', 'TypeScript', 90, '前端', '🟦', 0),
('00000000-0000-0000-0000-000000000102', 'React', 90, '前端', '⚛️', 1),
('00000000-0000-0000-0000-000000000103', 'Next.js', 85, '前端', '▲', 2),
('00000000-0000-0000-0000-000000000104', 'Vue', 70, '前端', '🟢', 3),
('00000000-0000-0000-0000-000000000105', 'Node.js', 85, '后端', '🟩', 4),
('00000000-0000-0000-0000-000000000106', 'Python', 75, '后端', '🐍', 5),
('00000000-0000-0000-0000-000000000107', 'PostgreSQL', 70, '后端', '🐘', 6),
('00000000-0000-0000-0000-000000000108', 'Git', 85, '工具', '🔧', 7),
('00000000-0000-0000-0000-000000000109', 'Docker', 70, '工具', '🐳', 8),
('00000000-0000-0000-0000-00000000010a', 'Tailwind CSS', 85, '前端', '🌊', 9);

-- 项目
INSERT INTO projects (id, title, description, link, image_url, tags, sort_order) VALUES
('10000000-0000-0000-0000-000000000001', '个人网站', '基于 Next.js 的个人网站，包含前台展示与后台管理，支持在线编辑个人信息。', 'https://example.com', '', 'Next.js,React,Tailwind CSS', 0),
('10000000-0000-0000-0000-000000000002', '任务管理应用', '一个支持看板视图、拖拽排序与团队协作的任务管理工具。', 'https://example.com', '', 'React,Node.js,PostgreSQL', 1),
('10000000-0000-0000-0000-000000000003', '数据可视化大屏', '面向业务运营的实时数据可视化大屏，支持多维度图表与自动刷新。', 'https://example.com', '', 'Vue,ECharts,WebSocket', 2);

-- 社交链接
INSERT INTO social_links (id, platform, url, icon, sort_order) VALUES
('20000000-0000-0000-0000-000000000001', 'GitHub', 'https://github.com', '🐙', 0),
('20000000-0000-0000-0000-000000000002', 'Email', 'mailto:hello@example.com', '✉️', 1),
('20000000-0000-0000-0000-000000000003', 'LinkedIn', 'https://linkedin.com', '💼', 2),
('20000000-0000-0000-0000-000000000004', '微博', 'https://weibo.com', '🔴', 3);

-- 工作 / 教育经历
INSERT INTO experiences (id, type, organization, role, period, description, sort_order) VALUES
('30000000-0000-0000-0000-000000000001', 'work', '某科技公司', '高级前端工程师', '2022 — 至今', '负责核心产品的前端架构与性能优化，主导组件库建设。', 0),
('30000000-0000-0000-0000-000000000002', 'work', '某互联网公司', '前端工程师', '2020 — 2022', '参与多个 Web 应用的开发与维护，负责用户增长相关功能。', 1),
('30000000-0000-0000-0000-000000000003', 'education', '某大学', '计算机科学与技术 · 本科', '2016 — 2020', '主修计算机科学，参与多个开源项目与编程竞赛。', 2);
