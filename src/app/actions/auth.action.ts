"use server"


import { authClient } from "@/lib/auth-client"
import { getSession, registerUser } from "@/src/services/user.services"


import { redirect } from "next/navigation"

// export async function logoutAction() {
//   await authClient.signOut()
//   redirect("/")   
// }

export async function logoutAction() {
  await authClient.signOut()
  redirect("/")
}
export async function registerUserAction(data: {
  userId: string;
  name: string;
  email: string;
  role: "STUDENT" | "TUTOR";
}) {
  return await registerUser(data);
}







export const getSessionAction = async () => {
  const res = await getSession();

  if (res.error) {
    return {
      success: false,
      data: null,
      error: res.error,
    };
  }

  return {
    success: true,
    data: res.data,
    error: null,
  };
};


//sign up action

export async function signUpAction(data: {
  name: string;
  email: string;
  password: string;
}) {
  return await authClient.signUp.email({
    name: data.name,
    email: data.email,
    password: data.password,
  });
}


export async function signInAction(data: {
  email: string;
  password: string;
}) {
  return await authClient.signIn.email({
    email: data.email,
    password: data.password,
  });
}
