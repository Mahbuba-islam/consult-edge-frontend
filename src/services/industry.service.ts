"use server";


import { httpClient } from "@/lib/axious/httpClient";
import { ICreateIndustryPayload, IIndustry, IUpdateIndustryPayload } from "../types/industry.types";

// -------------------------------
// 📌 Get all industries
// -------------------------------
export const getIndustries = async () => {
  try {
    const response = await httpClient.get<IIndustry[]>("/industries");
    return response;
  } catch (error) {
    console.error("Error fetching industries:", error);
    throw error;
  }
};

// -------------------------------
// 📌 Get industry by ID
// -------------------------------
export const getIndustryById = async (id: string) => {
  try {
    const response = await httpClient.get<IIndustry>(`/industries/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching industry by id:", error);
    throw error;
  }
};

// -------------------------------
// 📌 Create industry (with file upload)
// -------------------------------
export const createIndustry = async (payload: ICreateIndustryPayload) => {
  try {
    const formData = new FormData();
    formData.append("name", payload.name);
    if (payload.description) formData.append("description", payload.description);
    if (payload.icon) formData.append("icon", payload.icon);

    const response = await httpClient.post<IIndustry>("/industries", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response;
  } catch (error) {
    console.error("Error creating industry:", error);
    throw error;
  }
};

// -------------------------------
// 📌 Update industry (with file upload)
// -------------------------------
export const updateIndustry = async (
  id: string,
  payload: IUpdateIndustryPayload
) => {
  try {
    const formData = new FormData();
    if (payload.name) formData.append("name", payload.name);
    if (payload.description)
      formData.append("description", payload.description);
    if (payload.icon) formData.append("icon", payload.icon);

    const response = await httpClient.put<IIndustry>(
      `/industries/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response;
  } catch (error) {
    console.error("Error updating industry:", error);
    throw error;
  }
};

// -------------------------------
// 📌 Delete industry
// -------------------------------
export const deleteIndustry = async (id: string) => {
  try {
    const response = await httpClient.delete<{ message: string }>(
      `/industries/${id}`
    );
    return response;
  } catch (error) {
    console.error("Error deleting industry:", error);
    throw error;
  }
};