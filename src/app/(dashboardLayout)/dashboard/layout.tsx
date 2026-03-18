export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";


import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import { Roles } from "@/src/constants/roles"
import { getSession } from "@/src/services/user.services";

export default async function DashboardLayout({
  admin,
  student,
  tutor
}: {
  admin: React.ReactNode
  student: React.ReactNode
  tutor: React.ReactNode
}) {

 const {data} = await getSession()
    console.log("dashboard layout", data);
    const user = data.user
    
    console.log('role...',user.role);
   console.log('layout user',user);



  if (!user) {
    return <div className="p-10 text-red-500">Unauthorized</div>
  }

  let content: React.ReactNode = null

  if (user.role === Roles.ADMIN) {
    content = admin
  } else if (user.role === Roles.STUDENT) {
    content = student
  } else if (user.role === Roles.TUTOR) {
    content = tutor
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
     

      <SidebarInset>
        <SiteHeader user={user} />
        {content}
      </SidebarInset>
    </SidebarProvider>
  )
}