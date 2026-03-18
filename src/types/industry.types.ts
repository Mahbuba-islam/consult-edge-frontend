export interface IIndustry {
  id: string;
  name: string;
  description?: string;
  icon?: string; // file upload result
  createdAt: string;
  updatedAt: string;
}

export interface ICreateIndustryPayload {
  name: string;
  description?: string;
  icon?: File | null;
}

export interface IUpdateIndustryPayload {
  name?: string;
  description?: string;
  icon?: File | null;
}