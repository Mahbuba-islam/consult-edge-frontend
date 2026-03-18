"use server";


import { httpClient } from "@/lib/axious/httpClient";
import { IExpert, IExpertDetails, IUpdateExpertPayload } from "../types/expert.types";

// Get all experts (public)
export const getExperts = async (queryString?: string) => {
  try {
    const experts = await httpClient.get<IExpert[]>(
      queryString ? `/experts?${queryString}` : "/experts"
    );
    return experts;
  } catch (error) {
    console.log("Error fetching experts:", error);
    throw error;
  }
};

// Get expert by id (public)
export const getExpertById = async (id: string) => {
  try {
    const expert = await httpClient.get<IExpertDetails>(`/experts/${id}`);
    return expert;
  } catch (error) {
    console.log("Error fetching expert by id:", error);
    throw error;
  }
};

// Update expert (ADMIN or EXPERT)
export const updateExpert = async (id: string, payload: IUpdateExpertPayload) => {
  try {
    const response = await httpClient.put<IExpert>(`/experts/${id}`, payload);
    return response;
  } catch (error) {
    console.log("Error updating expert:", error);
    throw error;
  }
};

// Delete expert (ADMIN or EXPERT)
export const deleteExpert = async (id: string) => {
  try {
    const response = await httpClient.delete<{ message: string }>(`/experts/${id}`);
    return response;
  } catch (error) {
    console.log("Error deleting expert:", error);
    throw error;
  }
};