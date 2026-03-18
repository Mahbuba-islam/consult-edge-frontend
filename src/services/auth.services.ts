"use server";

import { httpClient } from "@/lib/axious/httpClient";
import { ApiResponse } from "../types/api.types";


export const getNewTokensWithRefreshToken = async (
  refreshToken: string
): Promise<ApiResponse<{ accessToken: string }>> => {
  try {
    const response = await httpClient.post<{ accessToken: string }>(
      "/auth/refresh-token",
      { refreshToken }
    );

    return response;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};