
"use server";

import { httpClient } from "@/lib/axious/httpClient";
import { IAssignExpertSchedulePayload, IExpertSchedule, IUpdateExpertSchedulePayload } from "../types/expertSchedule.types";



// -------------------------------
// 📌 Assign schedules to expert (EXPERT)
// -------------------------------
export const assignExpertSchedules = async (
  payload: IAssignExpertSchedulePayload
) => {
  try {
    const response = await httpClient.post<IExpertSchedule[]>(
      "/expert-schedules/assign",
      payload
    );
    return response;
  } catch (error) {
    console.error("Error assigning expert schedules:", error);
    throw error;
  }
};

// -------------------------------
// 📌 Get my schedules (EXPERT)
// -------------------------------
export const getMyExpertSchedules = async () => {
  try {
    const response = await httpClient.get<IExpertSchedule[]>(
      "/expert-schedules/my"
    );
    return response;
  } catch (error) {
    console.error("Error fetching my expert schedules:", error);
    throw error;
  }
};

// -------------------------------
// 📌 Admin: get all expert schedules
// -------------------------------
export const getAllExpertSchedules = async () => {
  try {
    const response = await httpClient.get<IExpertSchedule[]>(
      "/expert-schedules"
    );
    return response;
  } catch (error) {
    console.error("Error fetching all expert schedules:", error);
    throw error;
  }
};

// -------------------------------
// 📌 Get expert schedule by composite key (ADMIN)
// -------------------------------
export const getExpertScheduleById = async (
  expertId: string,
  scheduleId: string
) => {
  try {
    const response = await httpClient.get<IExpertSchedule>(
      `/expert-schedules/${expertId}/${scheduleId}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching expert schedule by composite key:", error);
    throw error;
  }
};

// -------------------------------
// 📌 Update my expert schedule (EXPERT)
// -------------------------------
export const updateMyExpertSchedule = async (
  payload: IUpdateExpertSchedulePayload
) => {
  try {
    const response = await httpClient.put<IExpertSchedule>(
      "/expert-schedules/my",
      payload
    );
    return response;
  } catch (error) {
    console.error("Error updating my expert schedule:", error);
    throw error;
  }
};

// -------------------------------
// 📌 Delete my expert schedule (EXPERT)
// -------------------------------
export const deleteMyExpertSchedule = async (scheduleId: string) => {
  try {
    const response = await httpClient.delete<{ message: string }>(
      `/expert-schedules/my/${scheduleId}`
    );
    return response;
  } catch (error) {
    console.error("Error deleting my expert schedule:", error);
    throw error;
  }
};