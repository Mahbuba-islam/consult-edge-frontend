"use server";

import { httpClient } from "@/lib/axious/httpClient";
import { ApiErrorResponse } from "@/src/types/api.types";
import { forgotPasswordZodSchema, IForgotPasswordPayload } from "@/src/zod/auth.validation";

/* eslint-disable @typescript-eslint/no-explicit-any */


export const forgotPasswordAction = async (
  payload: IForgotPasswordPayload
): Promise<{ success: boolean; message: string } | ApiErrorResponse> => {
  const parsed = forgotPasswordZodSchema.safeParse(payload);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0].message;
    return { success: false, message: firstError };
  }

  try {
    const response = await httpClient.post("/auth/forgot-password", parsed.data);

    return {
      success: true,
      message: "Reset link sent successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to send reset link",
    };
  }
};