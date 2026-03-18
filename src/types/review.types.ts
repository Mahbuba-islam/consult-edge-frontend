export interface Review {
  id: string
  rating: number
  comment: string
  studentId: string
  createdAt: string
}
export interface ReviewWithStudent {
  id: string;
  rating: number;
  comment: string 
  createdAt: string;
  bookingId:string

  student: {
    id: string;
    name: string;
    email: string;
  };
}
export interface CreateReviewPayload {
  bookingId: string;
  rating: number;
  comment: string;
}
