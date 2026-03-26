"use server";
import { httpClient } from "@/lib/axious/httpClient";
/* eslint-disable @typescript-eslint/no-explicit-any */


import { setTokenInCookies } from "@/lib/tokenUtils";
import { ApiErrorResponse } from "@/src/types/api.types";
import { ILoginResponse } from "@/src/types/auth.types";
import { IRegisterPayload, registerZodSchema } from "@/src/zod/auth.validation";
import { redirect } from "next/navigation";


export const registerAction = async (
  payload: IRegisterPayload,
  redirectPath?: string
): Promise<ILoginResponse | ApiErrorResponse> => {
  const parsed = registerZodSchema.safeParse(payload);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0].message;
    return { success: false, message: firstError };
  }

  try {
    const response = await httpClient.post<ILoginResponse>(
      "/auth/register",
      parsed.data
    );

    const { accessToken, refreshToken, token, user } = response.data;

    await setTokenInCookies("accessToken", accessToken);
    await setTokenInCookies("refreshToken", refreshToken);
    await setTokenInCookies("better-auth.session_token", token);

    // Redirect to verify email
    redirect(`/verify-email?email=${user.email}`);
  } catch (error: any) {
    if (
      error &&
      typeof error === "object" &&
      "digest" in error &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    return {
      success: false,
      message: error?.response?.data?.message || "Registration failed",
    };
  }
};