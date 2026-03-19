
import { LayoutDashboard, Calendar, Star, BarChart } from "lucide-react";
import SidebarItem from "./SideBarItem";

export default function ExpertSidebar() {
  return (
    <nav className="p-4 space-y-2">
      <SidebarItem href="/expert" label="Dashboard" icon={<LayoutDashboard size={18} />} />
      <SidebarItem href="/expert/schedule" label="My Schedule" icon={<Calendar size={18} />} />
      <SidebarItem href="/expert/testimonials" label="Testimonials" icon={<Star size={18} />} />
      <SidebarItem href="/expert/analytics" label="Analytics" icon={<BarChart size={18} />} />
    </nav>
  );
}