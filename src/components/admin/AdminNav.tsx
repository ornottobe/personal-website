"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/actions/auth";

const navItems = [
  { href: "/admin", label: "个人信息", icon: "👤" },
  { href: "/admin/skills", label: "技能", icon: "🛠️" },
  { href: "/admin/projects", label: "项目", icon: "📦" },
  { href: "/admin/socials", label: "社交链接", icon: "🔗" },
  { href: "/admin/experiences", label: "经历", icon: "🎓" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-5">
        <h1 className="text-lg font-bold text-slate-900">后台管理</h1>
        <p className="text-xs text-slate-400">编辑网站内容</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span aria-hidden>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-slate-200 p-4">
        <Link
          href="/"
          target="_blank"
          className="block rounded-lg px-3 py-2 text-center text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          查看网站 ↗
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="block w-full rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
          >
            退出登录
          </button>
        </form>
      </div>
    </aside>
  );
}
