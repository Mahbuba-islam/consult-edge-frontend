import { ReactNode } from "react"
import { User } from "./user.types"
import {TutorProfile} from "./expert.types"
export interface Booking {
  student: User
  startTime: ReactNode
  id: string
  tutor: TutorProfile
  studentId: string
  date: string
  status: "CONFIRMED" | "COMPLETED" | "CANCELED"
}
