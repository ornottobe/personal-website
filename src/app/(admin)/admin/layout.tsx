import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import { isAdmin } from "@/lib/auth-server";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminNav />
      <main className="min-w-0 flex-1 p-6 sm:p-10">
        <div className="mx-auto max-w-3xl">{children}</div>
      </main>
    </div>
  );
}
