/**
 * Shared Testimonial types used across the application.
 */

export type TestimonialType = "text" | "video";

export interface Testimonial {
  id: number;
  name: string;
  location: string | null;
  text: string | null;
  rating: number | null;
  videoUrl: string | null;
  type: TestimonialType;
  date?: string | null;
  sortOrder?: number | null;
}
