"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, type LoginState } from "@/lib/actions/auth";

const initialState: LoginState = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-slate-900">后台管理</h1>
        <p className="mt-2 text-sm text-slate-500">
          请输入管理密码以继续
        </p>

        <form action={formAction} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              密码
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              placeholder="请输入密码"
            />
          </div>

          {state.error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "登录中…" : "登录"}
          </button>
        </form>

        <Link
          href="/"
          className="mt-6 block text-center text-sm text-slate-400 transition hover:text-indigo-600"
        >
          ← 返回首页
        </Link>
      </div>
    </div>
  );
}
