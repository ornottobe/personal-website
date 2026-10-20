import { addProject, deleteProject, updateProject } from "@/lib/actions/projects";
import { getProjects } from "@/lib/data";
import type { Project } from "@/db/schema";
import { Input, SaveButton, TextArea } from "@/components/admin/ui";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">项目管理</h2>
      <p className="mt-1 text-sm text-slate-500">
        添加、编辑或删除首页展示的项目。
      </p>

      <form
        action={addProject}
        className="mt-8 space-y-4 rounded-2xl border border-indigo-200 bg-indigo-50/50 p-6"
      >
        <h3 className="font-semibold text-slate-900">新增项目</h3>
        <Input name="title" label="项目名称" placeholder="例如：个人网站" />
        <TextArea
          name="description"
          label="项目描述"
          placeholder="一句话介绍这个项目"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input name="link" label="项目链接" placeholder="https://..." />
          <Input name="tags" label="标签（逗号分隔）" placeholder="React,Next.js" />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          添加项目
        </button>
      </form>

      <div className="mt-8 space-y-4">
        {projects.length === 0 && (
          <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-400">
            暂无项目，请先添加。
          </p>
        )}
        {projects.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <form
      action={updateProject}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5"
    >
      <input type="hidden" name="id" value={project.id} />
      <Input name="title" label="项目名称" defaultValue={project.title} />
      <TextArea
        name="description"
        label="项目描述"
        defaultValue={project.description}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="link" label="项目链接" defaultValue={project.link} />
        <Input name="tags" label="标签" defaultValue={project.tags} />
      </div>
      <div className="flex items-center justify-between">
        <SaveButton />
        <button
          formAction={deleteProject}
          className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          删除
        </button>
      </div>
    </form>
  );
}
