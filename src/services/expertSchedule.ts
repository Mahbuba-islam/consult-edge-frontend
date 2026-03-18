export interface IExpertSchedule {
  id: string;
  expertId: string;
  scheduleId: string;
  consultationId?: string | null;
  isBooked: boolean;
  createdAt: string;
  updatedAt: string;

  // Optional nested schedule
  schedule?: {
    id: string;
    startTime: string;
    endTime: string;
  };
}

export interface IAssignExpertSchedulePayload {
  scheduleIds: string[];
}

export interface IUpdateExpertSchedulePayload {
  scheduleId: string;
  isBooked?: boolean;
}