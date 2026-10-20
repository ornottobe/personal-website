import { addSkill, deleteSkill, updateSkill } from "@/lib/actions/skills";
import { getSkills } from "@/lib/data";
import type { Skill } from "@/db/schema";

export default async function AdminSkillsPage() {
  const skills = await getSkills();

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">技能管理</h2>
      <p className="mt-1 text-sm text-slate-500">
        添加、编辑或删除首页展示的技能。
      </p>

      {/* 新增技能 */}
      <form
        action={addSkill}
        className="mt-8 space-y-4 rounded-2xl border border-indigo-200 bg-indigo-50/50 p-6"
      >
        <h3 className="font-semibold text-slate-900">新增技能</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input name="name" label="名称" placeholder="例如：React" />
          <Input
            name="icon"
            label="图标（emoji，可选）"
            placeholder="例如：⚛️"
          />
          <Input
            name="category"
            label="分类"
            placeholder="例如：前端"
          />
          <Input
            name="level"
            label="熟练度（0-100）"
            type="number"
            placeholder="80"
            defaultValue="80"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          添加技能
        </button>
      </form>

      {/* 技能列表 */}
      <div className="mt-8 space-y-4">
        {skills.length === 0 && (
          <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-400">
            暂无技能，请先添加。
          </p>
        )}
        {skills.map((skill) => (
          <SkillRow key={skill.id} skill={skill} />
        ))}
      </div>
    </div>
  );
}

function SkillRow({ skill }: { skill: Skill }) {
  return (
    <form
      action={updateSkill}
      className="rounded-2xl border border-slate-200 bg-white p-5"
    >
      <input type="hidden" name="id" value={skill.id} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="name" label="名称" defaultValue={skill.name} />
        <Input
          name="icon"
          label="图标"
          defaultValue={skill.icon}
          placeholder="emoji"
        />
        <Input name="category" label="分类" defaultValue={skill.category} />
        <Input
          name="level"
          label="熟练度"
          type="number"
          defaultValue={String(skill.level)}
        />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          保存
        </button>
        <button
          formAction={deleteSkill}
          className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          删除
        </button>
      </div>
    </form>
  );
}

function Input({
  label,
  name,
  defaultValue = "",
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-500">
        {label}
      </label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />
    </div>
  );
}
