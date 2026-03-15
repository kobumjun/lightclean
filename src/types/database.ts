/**
 * Supabase DB 타입 (reviews, consultations)
 */

export interface ReviewRow {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  service_type: string;
  location_text: string;
  thumbnail_url: string | null;
  image_urls: string[];
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ConsultationRow {
  id: string;
  name: string;
  phone: string;
  inquiry_type: string;
  message: string;
  privacy_agreed: boolean;
  created_at: string;
}

export type ReviewInsert = Omit<
  ReviewRow,
  "id" | "created_at" | "updated_at"
> & { id?: string; created_at?: string; updated_at?: string };

export type ReviewUpdate = Partial<
  Omit<ReviewRow, "id" | "created_at">
> & { updated_at?: string };

export type ConsultationInsert = Omit<ConsultationRow, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};
