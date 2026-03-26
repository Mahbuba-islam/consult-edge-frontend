"use server";

import { httpClient } from "@/lib/axious/httpClient";
import { ApiErrorResponse } from "@/src/types/api.types";

/* eslint-disable @typescript-eslint/no-explicit-any */


export const resendVerificationAction = async (
  email: string
): Promise<{ success: boolean; message: string } | ApiErrorResponse> => {
  if (!email) {
    return { success: false, message: "Email is required" };
  }

  try {
    const response = await httpClient.post("/auth/resend-verification", { email });

    return {
      success: true,
      message: "Verification email sent",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to resend verification email",
    };
  }
};