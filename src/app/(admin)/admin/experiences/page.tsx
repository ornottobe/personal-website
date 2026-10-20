import {
  addExperience,
  deleteExperience,
  updateExperience,
} from "@/lib/actions/experiences";
import { getExperiences } from "@/lib/data";
import type { Experience } from "@/db/schema";
import { Input, SaveButton, TextArea } from "@/components/admin/ui";

export default async function AdminExperiencesPage() {
  const experiences = await getExperiences();

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">经历管理</h2>
      <p className="mt-1 text-sm text-slate-500">
        添加、编辑或删除首页展示的工作与教育经历。
      </p>

      <form
        action={addExperience}
        className="mt-8 space-y-4 rounded-2xl border border-indigo-200 bg-indigo-50/50 p-6"
      >
        <h3 className="font-semibold text-slate-900">新增经历</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <TypeSelect name="type" defaultValue="work" />
          <Input name="organization" label="公司 / 学校" placeholder="例如：某科技公司" />
          <Input name="role" label="职位 / 专业" placeholder="例如：前端工程师" />
          <Input name="period" label="时间段" placeholder="例如：2022 — 至今" />
        </div>
        <TextArea name="description" label="描述" placeholder="补充说明" />
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          添加经历
        </button>
      </form>

      <div className="mt-8 space-y-4">
        {experiences.length === 0 && (
          <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-400">
            暂无经历，请先添加。
          </p>
        )}
        {experiences.map((experience) => (
          <ExperienceRow key={experience.id} experience={experience} />
        ))}
      </div>
    </div>
  );
}

function ExperienceRow({ experience }: { experience: Experience }) {
  return (
    <form
      action={updateExperience}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5"
    >
      <input type="hidden" name="id" value={experience.id} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TypeSelect name="type" defaultValue={experience.type} />
        <Input
          name="organization"
          label="公司 / 学校"
          defaultValue={experience.organization}
        />
        <Input name="role" label="职位 / 专业" defaultValue={experience.role} />
        <Input name="period" label="时间段" defaultValue={experience.period} />
      </div>
      <TextArea
        name="description"
        label="描述"
        defaultValue={experience.description}
      />
      <div className="flex items-center justify-between">
        <SaveButton />
        <button
          formAction={deleteExperience}
          className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          删除
        </button>
      </div>
    </form>
  );
}

function TypeSelect({
  name,
  defaultValue = "work",
}: {
  name: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-500">
        类型
      </label>
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      >
        <option value="work">工作经历</option>
        <option value="education">教育经历</option>
      </select>
    </div>
  );
}
