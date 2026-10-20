import {
  addSocialLink,
  deleteSocialLink,
  updateSocialLink,
} from "@/lib/actions/socials";
import { getSocialLinks } from "@/lib/data";
import type { SocialLink } from "@/db/schema";
import { Input, SaveButton } from "@/components/admin/ui";

export default async function AdminSocialsPage() {
  const socials = await getSocialLinks();

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">社交链接管理</h2>
      <p className="mt-1 text-sm text-slate-500">
        添加、编辑或删除首页展示的社交链接。
      </p>

      <form
        action={addSocialLink}
        className="mt-8 space-y-4 rounded-2xl border border-indigo-200 bg-indigo-50/50 p-6"
      >
        <h3 className="font-semibold text-slate-900">新增链接</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input name="platform" label="平台名称" placeholder="例如：GitHub" />
          <Input name="icon" label="图标（emoji）" placeholder="例如：🐙" />
        </div>
        <Input name="url" label="链接地址" placeholder="https://..." />
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          添加链接
        </button>
      </form>

      <div className="mt-8 space-y-4">
        {socials.length === 0 && (
          <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-400">
            暂无社交链接，请先添加。
          </p>
        )}
        {socials.map((social) => (
          <SocialRow key={social.id} social={social} />
        ))}
      </div>
    </div>
  );
}

function SocialRow({ social }: { social: SocialLink }) {
  return (
    <form
      action={updateSocialLink}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5"
    >
      <input type="hidden" name="id" value={social.id} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="platform" label="平台名称" defaultValue={social.platform} />
        <Input name="icon" label="图标" defaultValue={social.icon} />
      </div>
      <Input name="url" label="链接地址" defaultValue={social.url} />
      <div className="flex items-center justify-between">
        <SaveButton />
        <button
          formAction={deleteSocialLink}
          className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          删除
        </button>
      </div>
    </form>
  );
}
