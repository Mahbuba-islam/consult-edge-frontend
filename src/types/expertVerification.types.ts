export type VerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface IExpertVerification {
  id: string;
  expertId: string;
  status: VerificationStatus;
  notes?: string;
  verifiedBy?: string | null;
  verifiedAt?: string | null;
  createdAt: string;
  updatedAt: string;

  expert?: {
    id: string;
    fullName: string;
    email: string;
    title?: string;
    profilePhoto?: string;
  };
}

export interface ICreateExpertVerificationPayload {
  documents: File[];
  notes?: string;
}

export interface IUpdateExpertVerificationStatusPayload {
  status: VerificationStatus;
  notes?: string;
}