
import { LayoutDashboard, Calendar, Star, User } from "lucide-react";
import SidebarItem from "./SideBarItem";

export default function ClientSidebar() {
  return (
    <nav className="p-4 space-y-2">
      <SidebarItem href="/client" label="Dashboard" icon={<LayoutDashboard size={18} />} />
      <SidebarItem href="/client/bookings" label="My Bookings" icon={<Calendar size={18} />} />
      <SidebarItem href="/client/testimonials" label="My Testimonials" icon={<Star size={18} />} />
      <SidebarItem href="/client/profile" label="Profile" icon={<User size={18} />} />
    </nav>
  );
}