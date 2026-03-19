/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTestimonial,
  deleteTestimonial,
  getTestimonialsByExpert,
  updateTestimonial,
} from "@/src/services/testimonial.service";

// ------------------------------
// GET testimonials by expert
// ------------------------------
export const useExpertTestimonials = (expertId: string) => {
  return useQuery({
    queryKey: ["testimonials", expertId],
    queryFn: () => getTestimonialsByExpert(expertId),
  });
};

// ------------------------------
// CREATE testimonial
// ------------------------------
export const useCreateTestimonial = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createTestimonial,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
};

// ------------------------------
// UPDATE testimonial
// ------------------------------
export const useUpdateTestimonial = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      updateTestimonial(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
};

// ------------------------------
// DELETE testimonial
// ------------------------------
export const useDeleteTestimonial = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteTestimonial,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
};