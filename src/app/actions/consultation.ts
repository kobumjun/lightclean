"use server";

import { createClient } from "@/lib/supabase/server";
import type { ConsultationInsert } from "@/types/database";

export async function submitConsultation(data: ConsultationInsert) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Supabase not configured");
  }
  const supabase = createClient();
  const { error } = await supabase.from("consultations").insert({
    name: data.name,
    phone: data.phone,
    inquiry_type: data.inquiry_type ?? "",
    message: data.message ?? "",
    privacy_agreed: data.privacy_agreed ?? false,
  });
  if (error) throw new Error(error.message);
  // 실제 SMS 발송은 여기서 하지 않음. placeholder로 DB 저장만.
}
