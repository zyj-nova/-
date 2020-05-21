import { resetRouter } from "@/router";

export function resetTokenAndClearUser() {
  // 退出登陆 清除用户资料
  localStorage.removeItem("token");
  localStorage.removeItem("userImg");
  localStorage.removeItem("userName");
  // 重设路由
  resetRouter();
}

export const defaultDocumentTitle = "";
export function getDocumentTitle(pageTitle) {
  if (pageTitle) return `${defaultDocumentTitle} ${pageTitle}`;
  return `${defaultDocumentTitle}`;
}
