"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

export default function SidebarItem({ href, label, icon }: SidebarItemProps) {
  const pathname = usePathname();
  const active = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition",
        active
          ? "bg-primary/10 text-primary"
          : "text-gray-700 hover:bg-gray-100"
      )}
    >
      {icon}
      {label}
    </Link>
  );
}