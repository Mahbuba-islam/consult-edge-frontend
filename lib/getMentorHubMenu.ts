import { Roles } from "@/src/constants/roles"

export interface MenuItem {
  title: string
  url: string
}

export const getMentorHubMenu = (role?: Roles): MenuItem[] => {
  const baseMenu: MenuItem[] = [
    { title: "Home", url: "/" },
    { title: "Find Tutors", url: "/tutors" },
    { title: "Become a Tutor", url: "/become-tutor" },
    { title: "Blogs", url: "/blogs" },
    { title: "About", url: "/about" },
  ]

  if (!role) {
    // user not logged in
    return [
      ...baseMenu,
      { title: "Login", url: "/login" },
      { title: "Signup", url: "/signup" },
    ]
  }

  // logged-in user
  return [
    ...baseMenu,
    {
      title: "Dashboard",
      url:
        role === Roles.ADMIN
          ? "/dashboard/admin"
          : role === Roles.TUTOR
          ? "/dashboard/tutor"
          : "/dashboard/student",
    },
  ]
}