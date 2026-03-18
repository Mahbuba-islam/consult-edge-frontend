export const Features = {
  STUDENT: {
    BOOKING: true,
    REVIEWS: true,
    PROFILE: true,
  },

  TUTOR: {
    PROFILE: true,
    AVAILABILITY: true,
    SESSIONS: true,
    REVIEWS: true,
  },

  ADMIN: {
    USERS: true,
    BOOKINGS: true,
    CATEGORIES: true,
   
  }
} as const;

export type FeatureKey =
  | keyof typeof Features.STUDENT
  | keyof typeof Features.TUTOR
  | keyof typeof Features.ADMIN;