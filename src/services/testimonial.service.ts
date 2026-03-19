"use server";

import { httpClient } from "@/lib/axious/httpClient";
import { ITestimonial } from "../types/testimonial.types";


// -------------------------------
// 📌 Create testimonial (CLIENT)
// -------------------------------
export const createTestimonial = async (payload: {
  rating: number;
  comment?: string;
  consultationId: string;
}) => {
  try {
    const response = await httpClient.post<ITestimonial>(
      "/testimonials",
      payload
    );
    return response;
  } catch (error) {
    console.error("Error creating testimonial:", error);
    throw error;
  }
};

// -------------------------------
// 📌 Get all testimonials (ADMIN)
// -------------------------------
export const getTestimonials = async () => {
  try {
    const response = await httpClient.get<ITestimonial[]>("/testimonials");
    return response;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw error;
  }
};

// -------------------------------
// 📌 Get testimonials by expert
// -------------------------------
export const getTestimonialsByExpert = async (expertId: string) => {
  try {
    const response = await httpClient.get<ITestimonial[]>(
      `/testimonials/expert/${expertId}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching expert testimonials:", error);
    throw error;
  }
};

// -------------------------------
// 📌 Update testimonial (CLIENT)
// -------------------------------
export const updateTestimonial = async (
  id: string,
  payload: { rating?: number; comment?: string }
) => {
  try {
    const response = await httpClient.put<ITestimonial>(
      `/testimonials/${id}`,
      payload
    );
    return response;
  } catch (error) {
    console.error("Error updating testimonial:", error);
    throw error;
  }
};

// -------------------------------
// 📌 Delete testimonial (CLIENT)
// -------------------------------
export const deleteTestimonial = async (id: string) => {
  try {
    const response = await httpClient.delete<{ message: string }>(
      `/testimonials/${id}`
    );
    return response;
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    throw error;
  }
};