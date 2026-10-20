import { revalidatePath } from "next/cache";

/**
 * 数据变更后刷新前台首页与整个后台（layout + 所有子页），
 * 让修改立即在界面上生效。
 */
export function revalidateSite() {
  revalidatePath("/");
  revalidatePath("/admin", "layout");
}
