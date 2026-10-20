import type { Project } from "@/db/schema";

function splitTags(tags: string): string[] {
  return tags
    .split(/[,，]/)
    .map((t) => t.trim())
    .filter(Boolean);
}

export default function Projects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section id="projects" className="bg-slate-50 py-20">
      <div className="mx-auto w-full max-w-5xl px-6">
        <h2 className="text-3xl font-bold tracking-tight">项目</h2>
        <p className="mt-2 text-slate-500">我做过的一些作品</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => {
            const tags = splitTags(p.tags);
            return (
              <div
                key={p.id}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-slate-900">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {p.description}
                </p>

                {tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 transition group-hover:gap-2 hover:text-indigo-500"
                  >
                    查看项目 <span aria-hidden>→</span>
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
