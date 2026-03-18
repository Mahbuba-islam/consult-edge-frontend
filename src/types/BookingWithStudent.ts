export interface BookingWithStudent {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED";

  student: {
    id: string;
    name: string;
    email: string;
  } | null;
}