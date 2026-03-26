import { IIndustry } from "./industry.types";

export interface IExpert {
  id: string;
  fullName: string;
  email: string;
  title?: string;
  consultationFee:string
  profilePhoto?:string
   industry?:IIndustry
  bio?: string;
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateExpertPayload {
  name?: string;
  title?: string;
  bio?: string;
  avatar?: string;
}



export interface IExpertDetails extends IExpert {
  // industry?: {
  //   id: string;
  //   name: string;
  //   description?: string;
  //   icon?: string;
  // };

  schedules?: Array<{
    id: string;
    startDateTime: string;
    endDateTime: string;
    isBooked: boolean;
  }>;

  testimonials?: Array<{
    id: string;
    rating: number;
    comment: string;
    createdAt: string;
  }>;

  verification?: {
    id: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    notes?: string;
    verifiedBy?: string;
    verifiedAt?: string;
  };
}
