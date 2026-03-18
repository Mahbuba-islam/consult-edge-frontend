"use server";

import { httpClient } from "@/lib/axious/httpClient";
import { ICreateSchedulePayload, ISchedule, IUpdateSchedulePayload } from "../types/schedule.types";



// -------------------------------
// 📌 Get all schedules
// -------------------------------
export const getSchedules = async () => {
  try {
    const response = await httpClient.get<ISchedule[]>("/schedules");
    return response;
  } catch (error) {
    console.error("Error fetching schedules:", error);
    throw error;
  }
};

// -------------------------------
// 📌 Get schedule by ID
// -------------------------------
export const getScheduleById = async (id: string) => {
  try {
    const response = await httpClient.get<ISchedule>(`/schedules/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching schedule by id:", error);
    throw error;
  }
};

// -------------------------------
// 📌 Create schedule
// -------------------------------
export const createSchedule = async (payload: ICreateSchedulePayload) => {
  try {
    const response = await httpClient.post<ISchedule>("/schedules", payload);
    return response;
  } catch (error) {
    console.error("Error creating schedule:", error);
    throw error;
  }
};

// -------------------------------
// 📌 Update schedule
// -------------------------------
export const updateSchedule = async (
  id: string,
  payload: IUpdateSchedulePayload
) => {
  try {
    const response = await httpClient.put<ISchedule>(
      `/schedules/${id}`,
      payload
    );
    return response;
  } catch (error) {
    console.error("Error updating schedule:", error);
    throw error;
  }
};

// -------------------------------
// 📌 Delete schedule
// -------------------------------
export const deleteSchedule = async (id: string) => {
  try {
    const response = await httpClient.delete<{ message: string }>(
      `/schedules/${id}`
    );
    return response;
  } catch (error) {
    console.error("Error deleting schedule:", error);
    throw error;
  }
};