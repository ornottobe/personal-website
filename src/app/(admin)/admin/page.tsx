import { updateProfile } from "@/lib/actions/profile";
import { getProfile } from "@/lib/data";

export default async function AdminProfilePage() {
  const profile = await getProfile();

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">个人信息</h2>
      <p className="mt-1 text-sm text-slate-500">
        编辑首页展示的姓名、头衔、简介与联系方式。
      </p>

      <form
        action={updateProfile}
        className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6"
      >
        <Field label="姓名" name="name" defaultValue={profile?.name ?? ""} />
        <Field
          label="头衔 / 职位"
          name="title"
          defaultValue={profile?.title ?? ""}
          placeholder="例如：全栈开发工程师"
        />

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            个人简介
          </label>
          <textarea
            name="bio"
            rows={4}
            defaultValue={profile?.bio ?? ""}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <Field
          label="头像 URL（可选，留空则显示首字母）"
          name="avatarUrl"
          defaultValue={profile?.avatarUrl ?? ""}
          placeholder="https://..."
        />
        <Field
          label="邮箱"
          name="email"
          type="email"
          defaultValue={profile?.email ?? ""}
        />
        <Field
          label="所在地"
          name="location"
          defaultValue={profile?.location ?? ""}
        />
        <Field
          label="电话（可选）"
          name="phone"
          defaultValue={profile?.phone ?? ""}
        />
        <Field
          label="个人网站（可选）"
          name="website"
          defaultValue={profile?.website ?? ""}
        />
        <Field
          label="简历链接（可选）"
          name="resumeUrl"
          defaultValue={profile?.resumeUrl ?? ""}
        />

        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          保存修改
        </button>
      </form>
    </div>
  );
}

function Field({
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
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
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
