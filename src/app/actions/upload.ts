"use server";

import { createClient } from "@/lib/supabase/server";

const BUCKET_NAME = "REVIEW-IMAGES";

/**
 * 후기 이미지 여러 장 업로드.
 * Supabase Dashboard의 bucket 이름(REVIEW-IMAGES)과 대소문자 일치.
 */
export async function uploadReviewImages(
  formData: FormData
): Promise<{ urls: string[]; error?: string }> {
  console.log("upload start");
  try {
    const files = formData.getAll("images") as File[];
    if (!files?.length) return { urls: [] };
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return { urls: [], error: "Supabase not configured (env missing)" };
    }

    console.log("bucket:", BUCKET_NAME);
    const supabase = createClient();
    const urls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!(file instanceof File) || !file.size) continue;

      const fileExt = file.name?.split(".").pop()?.toLowerCase() || "jpg";
      const safeExt = /^[a-z0-9]+$/.test(fileExt) ? fileExt : "jpg";
      const fileName = `review-${Date.now()}-${i}.${safeExt}`;
      const filePath = fileName;

      console.log("file name:", file.name);
      console.log("file size:", file.size);

      const buf = await file.arrayBuffer();
      const contentType = file.type?.startsWith("image/") ? file.type : "image/jpeg";
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, buf, { contentType, upsert: false });

      if (error) {
        console.error("storage error:", error);
        return { urls: [], error: error.message };
      }
      if (data?.path) {
        const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path);
        urls.push(urlData.publicUrl);
      }
    }
    return { urls };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("upload catch:", message);
    return { urls: [], error: message };
  }
}
