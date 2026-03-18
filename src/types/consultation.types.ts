export type ConsultationStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

export type PaymentStatus = "UNPAID" | "PAID" | "REFUNDED";

export interface IConsultation {
  id: string;
  clientId: string;
  expertId: string;
  expertScheduleId: string;

  status: ConsultationStatus;
  paymentStatus: PaymentStatus;

  videoCallId?: string | null;
  date: string;

  createdAt: string;
  updatedAt: string;

  // Optional nested relations
  expert?: {
    id: string;
    fullName: string;
    title?: string;
    profilePhoto?: string;
  };

  client?: {
    id: string;
    fullName: string;
    email: string;
  };

  schedule?: {
    id: string;
    startTime: string;
    endTime: string;
  };
}

export interface IBookConsultationPayload {
  expertScheduleId: string;
}

export interface IUpdateConsultationStatusPayload {
  status: ConsultationStatus;
}

export interface IPaymentInitiatePayload {
  amount: number;
  currency: string;
  successUrl: string;
  cancelUrl: string;
}