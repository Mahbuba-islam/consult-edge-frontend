import { sidebarItems } from "@/src/constants/sidebar-items";

import { Roles } from "@/src/constants/roles";
import { Features } from "./features";

export function getSidebarForRole(role: Roles) {
  const roleFeatures = Features[role];

  return sidebarItems[role].filter(item => {
    if (!item.feature) return true;

    return item.feature in roleFeatures;
  });
}
