"use server";

import { createClient } from "@/lib/supabase/server";

/** Supabase Dashboard Storage bucket 이름과 정확히 일치 (대소문자 포함). 스키마 주석: review-images */
const BUCKET_NAME = "review-images";
export async function uploadReviewImages(
  formData: FormData
): Promise<{ urls: string[]; error?: string }> {
  try {
    const files = formData.getAll("images") as File[];
    if (!files?.length) return { urls: [] };
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return { urls: [], error: "Supabase not configured (env missing)" };
    }
    const supabase = createClient();
    const urls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!(file instanceof File) || !file.size) continue;

      const fileExt = file.name?.split(".").pop()?.toLowerCase() || "jpg";
      const safeExt = /^[a-z0-9]+$/.test(fileExt) ? fileExt : "jpg";
      const fileName = `review-${Date.now()}-${i}.${safeExt}`;
      const filePath = fileName;

      console.log("[이미지 업로드] bucket:", BUCKET_NAME, "upload path:", filePath, "file name:", file.name);

      const buf = await file.arrayBuffer();
      const contentType = file.type?.startsWith("image/") ? file.type : "image/jpeg";
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, buf, { contentType, upsert: false });

      if (error) {
        const errMsg = error?.message ?? "Unknown storage error";
        console.error("[이미지 업로드] error.message:", errMsg);
        return { urls: [], error: errMsg };
      }
      if (data?.path) {
        const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path);
        urls.push(urlData.publicUrl);
      }
    }
    return { urls };
  } catch (err) {
    const message = String(err instanceof Error ? err.message : err ?? "Unknown error");
    console.error("[이미지 업로드] catch:", message);
    return { urls: [], error: message };
  }
}
