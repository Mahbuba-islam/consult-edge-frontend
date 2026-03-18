"use server";

import { httpClient } from "@/lib/axios/httpClient";
import {
  IConsultation,
  IBookConsultationPayload,
  IUpdateConsultationStatusPayload,
  IPaymentInitiatePayload,
} from "@/types/consultation.types";

// -------------------------------
// 📌 Book a consultation (CLIENT)
// -------------------------------
export const bookConsultation = async (payload: IBookConsultationPayload) => {
  try {
    const response = await httpClient.post<IConsultation>(
      "/consultations/book",
      payload
    );
    return response;
  } catch (error) {
    console.error("Error booking consultation:", error);
    throw error;
  }
};

// -------------------------------
// 📌 Initiate payment (CLIENT)
// -------------------------------
export const initiateConsultationPayment = async (
  consultationId: string,
  payload: IPaymentInitiatePayload
) => {
  try {
    const response = await httpClient.post<{ paymentUrl: string }>(
      `/consultations/${consultationId}/initiate-payment`,
      payload
    );
    return response;
  } catch (error) {
    console.error("Error initiating payment:", error);
    throw error;
  }
};

// -------------------------------
// 📌 Get my consultations (CLIENT)
// -------------------------------
export const getMyConsultations = async () => {
  try {
    const response = await httpClient.get<IConsultation[]>(
      "/consultations/my"
    );
    return response;
  } catch (error) {
    console.error("Error fetching my consultations:", error);
    throw error;
  }
};

// -------------------------------
// 📌 Get expert consultations (EXPERT)
// -------------------------------
export const getExpertConsultations = async () => {
  try {
    const response = await httpClient.get<IConsultation[]>(
      "/consultations/expert"
    );
    return response;
  } catch (error) {
    console.error("Error fetching expert consultations:", error);
    throw error;
  }
};

// -------------------------------
// 📌 Get all consultations (ADMIN)
// -------------------------------
export const getAllConsultations = async () => {
  try {
    const response = await httpClient.get<IConsultation[]>(
      "/consultations/admin"
    );
    return response;
  } catch (error) {
    console.error("Error fetching all consultations:", error);
    throw error;
  }
};

// -------------------------------
// 📌 Get consultation by ID
// -------------------------------
export const getConsultationById = async (id: string) => {
  try {
    const response = await httpClient.get<IConsultation>(
      `/consultations/${id}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching consultation by id:", error);
    throw error;
  }
};

// -------------------------------
// 📌 Update consultation status (ADMIN/EXPERT)
// -------------------------------
export const updateConsultationStatus = async (
  id: string,
  payload: IUpdateConsultationStatusPayload
) => {
  try {
    const response = await httpClient.put<IConsultation>(
      `/consultations/${id}/status`,
      payload
    );
    return response;
  } catch (error) {
    console.error("Error updating consultation status:", error);
    throw error;
  }
};

// -------------------------------
// 📌 Delete consultation (ADMIN)
// -------------------------------
export const deleteConsultation = async (id: string) => {
  try {
    const response = await httpClient.delete<{ message: string }>(
      `/consultations/${id}`
    );
    return response;
  } catch (error) {
    console.error("Error deleting consultation:", error);
    throw error;
  }
};