"use server";

import { createClient } from "@/lib/supabase/server";

/** Supabase Dashboard Storage bucket 이름과 정확히 일치 (대소문자 포함) */
const BUCKET_NAME = "review-images";

export type UploadResult =
  | { success: true; urls: string[] }
  | { success: false; error: string };

export async function uploadReviewImages(formData: FormData): Promise<UploadResult> {
  try {
    const raw = formData.getAll("images");
    const files = raw.filter((item): item is File => item instanceof File && item.size > 0);

    if (files.length === 0) {
      return { success: true, urls: [] };
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return { success: false, error: "[이미지 업로드] Supabase not configured (env missing)" };
    }

    const supabase = createClient();
    const urls: string[] = [];

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
      const safeName = `review-${Date.now()}-${index}.${ext}`;

      console.log("[upload] bucket", BUCKET_NAME);
      console.log("[upload] file", file.name, file.size, file.type);
      console.log("[upload] path", safeName);

      const buf = await file.arrayBuffer();
      const contentType = file.type?.startsWith("image/") ? file.type : "image/jpeg";

      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(safeName, buf, { contentType, upsert: false });

      if (error) {
        console.error("[upload] error", error);
        return { success: false, error: `[이미지 업로드] ${error.message}` };
      }

      if (data?.path) {
        const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path);
        urls.push(urlData.publicUrl);
      }
    }

    return { success: true, urls };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err ?? "Unknown error");
    console.error("[upload] catch", err);
    return { success: false, error: `[이미지 업로드] ${message}` };
  }
}
