import type { Profile, SocialLink } from "@/db/schema";

function initialOf(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "?";
  return [...trimmed][0].toUpperCase();
}

export default function Hero({
  profile,
  socials,
}: {
  profile: Profile | null;
  socials: SocialLink[];
}) {
  const name = profile?.name || "你的名字";
  const title = profile?.title || "你的头衔";
  const bio = profile?.bio || "";
  const avatarUrl = profile?.avatarUrl || "";
  const location = profile?.location || "";

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* 渐变装饰背景 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-600/30 blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center sm:py-32">
        {/* 头像 */}
        <div className="mb-6 h-28 w-28 overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 ring-4 ring-white/10 sm:h-32 sm:w-32">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-5xl font-bold text-white">
              {initialOf(name)}
            </span>
          )}
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{name}</h1>
        <p className="mt-3 text-lg font-medium text-indigo-300 sm:text-xl">{title}</p>

        {location && (
          <p className="mt-2 text-sm text-slate-400">📍 {location}</p>
        )}

        {bio && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300">
            {bio}
          </p>
        )}

        {/* 社交链接 */}
        {socials.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target={s.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white/30 hover:bg-white/10"
              >
                {s.icon && <span aria-hidden>{s.icon}</span>}
                {s.platform}
              </a>
            ))}
          </div>
        )}

        <a
          href="#projects"
          className="mt-12 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
        >
          查看我的项目
          <span aria-hidden>↓</span>
        </a>
      </div>
    </section>
  );
}
