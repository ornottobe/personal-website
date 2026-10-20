import Link from "next/link";
import type { Profile, SocialLink } from "@/db/schema";

export default function Contact({
  profile,
  socials,
}: {
  profile: Profile | null;
  socials: SocialLink[];
}) {
  const email = profile?.email || "";
  const phone = profile?.phone || "";
  const website = profile?.website || "";
  const location = profile?.location || "";

  const items = [
    { label: "邮箱", value: email, href: email ? `mailto:${email}` : undefined },
    { label: "电话", value: phone },
    { label: "所在地", value: location },
    { label: "网站", value: website, href: website },
  ].filter((i) => i.value);

  return (
    <section id="contact" className="bg-slate-50 py-20">
      <div className="mx-auto w-full max-w-5xl px-6">
        <h2 className="text-3xl font-bold tracking-tight">联系我</h2>
        <p className="mt-2 text-slate-500">欢迎与我交流</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="mt-2 block break-all text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-2 break-all text-sm font-medium text-slate-800">
                  {item.value}
                </p>
              )}
            </div>
          ))}
        </div>

        {socials.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target={s.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
              >
                {s.icon && <span aria-hidden>{s.icon}</span>}
                {s.platform}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function Footer({ name }: { name: string }) {
  return (
    <footer className="border-t border-slate-200 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 text-sm text-slate-400 sm:flex-row">
        <p>© {new Date().getFullYear()} {name || "个人网站"}. 保留所有权利。</p>
        <Link
          href="/admin"
          className="text-slate-400 transition hover:text-indigo-600"
        >
          后台管理
        </Link>
      </div>
    </footer>
  );
}
