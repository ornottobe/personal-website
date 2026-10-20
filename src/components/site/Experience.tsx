import type { Experience } from "@/db/schema";

export default function Experience({
  experiences,
}: {
  experiences: Experience[];
}) {
  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="mx-auto w-full max-w-5xl px-6 py-20">
      <h2 className="text-3xl font-bold tracking-tight">经历</h2>
      <p className="mt-2 text-slate-500">工作与教育背景</p>

      <ol className="relative mt-10 space-y-8 border-l border-slate-200 pl-8">
        {experiences.map((e) => {
          const isEducation = e.type === "education";
          return (
            <li key={e.id} className="relative">
              <span
                className={`absolute -left-[41px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full ring-4 ring-white ${
                  isEducation ? "bg-fuchsia-500" : "bg-indigo-500"
                }`}
              />
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="text-lg font-semibold text-slate-900">
                  {e.organization}
                </h3>
                <span className="text-sm font-medium text-indigo-600">{e.role}</span>
              </div>
              <p className="mt-1 text-sm text-slate-400">{e.period}</p>
              {e.description && (
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {e.description}
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
