"use server";

import { createClient } from "@/lib/supabase/server";

const BUCKET = "review-images";

/**
 * 후기 이미지 여러 장 업로드.
 * Supabase Storage bucket "review-images" 필요. (public 권장)
 * RLS에서 anon insert 허용 또는 서비스 역할 사용.
 */
export async function uploadReviewImages(
  formData: FormData
): Promise<{ urls: string[]; error?: string }> {
  const files = formData.getAll("images") as File[];
  if (!files.length) return { urls: [] };
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { urls: [], error: "Supabase not configured" };
  }

  const supabase = createClient();
  const urls: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!(file instanceof File) || !file.size) continue;
    const ext = file.name.split(".").pop() || "jpg";
    const name = `${Date.now()}-${i}.${ext}`;
    const buf = await file.arrayBuffer();
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .upload(name, buf, { contentType: file.type || "image/jpeg", upsert: false });
    if (error) return { urls: [], error: error.message };
    if (data?.path) {
      const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path);
      urls.push(urlData.publicUrl);
    }
  }
  return { urls };
}
