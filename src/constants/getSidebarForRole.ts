import { Roles, sidebarItems } from "./sidebar-items";

export function getSidebarForRole(role: Roles) {
  return sidebarItems[role] ?? [];
}