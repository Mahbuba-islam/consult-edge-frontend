export interface ISchedule {
  id: string;
  startTime: string;   // ISO string
  endTime: string;     // ISO string
  createdAt: string;
  updatedAt: string;
}

export interface ICreateSchedulePayload {
  startTime: string;
  endTime: string;
}

export interface IUpdateSchedulePayload {
  startTime?: string;
  endTime?: string;
}