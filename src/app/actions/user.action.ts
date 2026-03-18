
"use server";

import { manageUserStatus } from "@/src/services/admin.services";
import { getAllUsers } from "@/src/services/user.services";


// import { getServerSession } from "next-auth";

// get all users
// export const getUsersAction = async () => {
//   return await getAllUsers();
// };
export const getUsersAction = async () => {
  const res = await getAllUsers();

  if (!res || res.error) {
    return { users: [], error: res?.error ?? { message: "Failed" } };
  }

  return { users: res.data.users ?? [], error: null };
};





export async function setActiveAction(userId: string) {
 await manageUserStatus(userId, "ACTIVE");
}

export async function setBanAction(userId: string) {
  await manageUserStatus(userId, "BANNED");
}


