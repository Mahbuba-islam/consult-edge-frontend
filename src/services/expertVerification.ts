"use server";

import { httpClient } from "@/lib/axious/httpClient";
import { ICreateExpertVerificationPayload, IExpertVerification, IUpdateExpertVerificationStatusPayload } from "../types/expertVerification.types";


// CLIENT/EXPERT: submit verification request (with documents)
export const createExpertVerification = async (
  payload: ICreateExpertVerificationPayload
) => {
  try {
    const formData = new FormData();

    payload.documents.forEach((file) => {
      formData.append("documents", file);
    });

    if (payload.notes) {
      formData.append("notes", payload.notes);
    }

    const response = await httpClient.post<IExpertVerification>(
      "/expert-verification",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response;
  } catch (error) {
    console.error("Error creating expert verification:", error);
    throw error;
  }
};

// ADMIN: get all verification requests
export const getAllExpertVerifications = async () => {
  try {
    const response = await httpClient.get<IExpertVerification[]>(
      "/expert-verification"
    );
    return response;
  } catch (error) {
    console.error("Error fetching expert verifications:", error);
    throw error;
  }
};

// ADMIN: get single verification by id
export const getExpertVerificationById = async (id: string) => {
  try {
    const response = await httpClient.get<IExpertVerification>(
      `/expert-verification/${id}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching expert verification by id:", error);
    throw error;
  }
};

// ADMIN: update verification status
export const updateExpertVerificationStatus = async (
  id: string,
  payload: IUpdateExpertVerificationStatusPayload
) => {
  try {
    const response = await httpClient.put<IExpertVerification>(
      `/expert-verification/${id}`,
      payload
    );
    return response;
  } catch (error) {
    console.error("Error updating expert verification status:", error);
    throw error;
  }
};

// ADMIN: delete verification record
export const deleteExpertVerification = async (id: string) => {
  try {
    const response = await httpClient.delete<{ message: string }>(
      `/expert-verification/${id}`
    );
    return response;
  } catch (error) {
    console.error("Error deleting expert verification:", error);
    throw error;
  }
};