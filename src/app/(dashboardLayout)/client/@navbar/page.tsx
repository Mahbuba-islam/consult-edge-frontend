
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { authClient } from "@/lib/auth-client";

export default async function ClientNavbarSlot() {
  const { data } = await authClient.getSession();
  return <DashboardNavbar user={data?.user} />;
}