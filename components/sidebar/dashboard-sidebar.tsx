import { Roles } from "@/src/constants/roles";
import { getSidebarForRole } from "@/src/constants/getSidebarForRole";
import { SidebarItem } from "@/src/constants/sidebar-items";

import { User } from "@/src/types/user.types";

export default function Sidebar({ user } :{user:User}) {
  const items = getSidebarForRole(user.role as unknown as Roles);

  return (
    <div className="sidebar">
      {items.map((item:SidebarItem )=> (
        <a key={item.href} href={item.href} className="sidebar-link">
          <item.icon className="w-5 h-5" />
          {item.label}
        </a>
      ))}
      


    </div>
  );
}