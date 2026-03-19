import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { authClient } from "@/lib/auth-client";

export default async function AdminNavbarSlot() {
  const session = await authClient.getSession();

  if (!session?.data?.user) {
    return null; // or redirect("/login")
  }

  return <DashboardNavbar user={session.data.user} />;
}
