"use client";

import { createClient } from "@/lib/supabase/client";

const BUCKET_NAME = "review-images";

/**
 * 클라이언트에서 Supabase Storage로 이미지 1개 직접 업로드 후 public URL 반환.
 * 서버를 거치지 않음.
 */
export async function uploadOneReviewImage(
  file: File
): Promise<{ url: string } | { error: string }> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return { error: "Supabase not configured" };
  }

  const supabase = createClient();
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const filePath = `review-${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
  const contentType = file.type?.startsWith("image/") ? file.type : "image/jpeg";

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, { contentType, upsert: false });

  if (error) return { error: error.message };
  if (!data?.path) return { error: "Upload returned no path" };

  const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path);
  return { url: urlData.publicUrl };
}
