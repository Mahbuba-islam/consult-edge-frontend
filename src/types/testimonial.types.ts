export interface ITestimonial {
  id: string;
  rating: number;
  comment?: string | null;

  clientId: string;
  expertId: string;
  consultationId?: string | null;

  createdAt: string;
  updatedAt: string;

  client?: {
    id: string;
    fullName: string;
    profilePhoto?: string | null;
  };

  expert?: {
    id: string;
    fullName: string;
    title?: string | null;
    profilePhoto?: string | null;
  };

  consultation?: {
    id: string;
    date: string;
  };
}

export interface ICreateTestimonialPayload {
  rating: number;
  comment?: string;
  consultationId: string;
}

export interface IUpdateTestimonialPayload {
  rating?: number;
  comment?: string;
}