"use server";

import { createClient } from "@/lib/supabase/server";

const BUCKET = "review-images";

/**
 * 후기 이미지 여러 장 업로드.
 * Supabase Storage bucket "review-images" 필요. (public 권장)
 * 항상 직렬화 가능한 객체만 반환하여 클라이언트 오류 방지.
 */
export async function uploadReviewImages(
  formData: FormData
): Promise<{ urls: string[]; error?: string }> {
  try {
    console.log("[uploadReviewImages] start");
    const files = formData.getAll("images") as File[];
    if (!files?.length) {
      console.log("[uploadReviewImages] no files, return empty urls");
      return { urls: [] };
    }
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error("[uploadReviewImages] Supabase env missing");
      return { urls: [], error: "Supabase not configured (env missing)" };
    }

    const supabase = createClient();
    const urls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!(file instanceof File) || !file.size) continue;
      const ext = (file.name && file.name.split(".").pop()) || "jpg";
      const name = `${Date.now()}-${i}.${ext}`;
      const buf = await file.arrayBuffer();
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .upload(name, buf, { contentType: file.type || "image/jpeg", upsert: false });
      if (error) {
        console.error("[uploadReviewImages] storage error:", error.message);
        return { urls: [], error: `Storage: ${error.message}` };
      }
      if (data?.path) {
        const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path);
        urls.push(urlData.publicUrl);
      }
    }
    console.log("[uploadReviewImages] success urls count=", urls.length);
    return { urls };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[uploadReviewImages] catch:", message);
    return { urls: [], error: message };
  }
}
