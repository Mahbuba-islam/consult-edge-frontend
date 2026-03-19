
import { LayoutDashboard, Users, Star, BarChart } from "lucide-react";
import SidebarItem from "./SideBarItem";

export default function AdminSidebar() {
  return (
    <nav className="p-4 space-y-2">
      <SidebarItem href="/admin" label="Dashboard" icon={<LayoutDashboard size={18} />} />
      <SidebarItem href="/admin/users" label="Users" icon={<Users size={18} />} />
      <SidebarItem href="/admin/testimonials" label="Testimonials" icon={<Star size={18} />} />
      <SidebarItem href="/admin/analytics" label="Analytics" icon={<BarChart size={18} />} />
    </nav>
  );
}