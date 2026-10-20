import type { Skill } from "@/db/schema";

function groupByCategory(skills: Skill[]): Map<string, Skill[]> {
  const map = new Map<string, Skill[]>();
  for (const s of skills) {
    const cat = s.category || "其他";
    const list = map.get(cat) ?? [];
    list.push(s);
    map.set(cat, list);
  }
  return map;
}

export default function Skills({ skills }: { skills: Skill[] }) {
  const groups = groupByCategory(skills);

  if (skills.length === 0) return null;

  return (
    <section id="skills" className="mx-auto w-full max-w-5xl px-6 py-20">
      <h2 className="text-3xl font-bold tracking-tight">技能</h2>
      <p className="mt-2 text-slate-500">我的技术栈与熟练度</p>

      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...groups.entries()].map(([category, list]) => (
          <div
            key={category}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
          >
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-indigo-600">
              {category}
            </h3>
            <ul className="space-y-4">
              {list.map((s) => (
                <li key={s.id}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium text-slate-800">
                      {s.icon && <span aria-hidden>{s.icon}</span>}
                      {s.name}
                    </span>
                    <span className="text-slate-400">{s.level}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500"
                      style={{ width: `${Math.min(100, Math.max(0, s.level))}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
