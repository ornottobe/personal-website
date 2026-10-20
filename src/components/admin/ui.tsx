/** 后台表单通用控件 */

export function Input({
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

export function TextArea({
  label,
  name,
  defaultValue = "",
  rows = 3,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-500">
        {label}
      </label>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />
    </div>
  );
}

export function SaveButton() {
  return (
    <button
      type="submit"
      className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
    >
      保存
    </button>
  );
}
