"use server";

import { createClient } from "@/lib/supabase/server";

const BUCKET = "review-images";

const ALLOWED_EXT = new Set(["jpg", "jpeg", "png", "gif", "webp", "heic"]);

function safeExtension(originalName: string, mimeType: string): string {
  const fromName = originalName?.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "";
  const ext = ALLOWED_EXT.has(fromName) ? fromName : "jpg";
  if (ext !== fromName && mimeType) {
    if (mimeType.includes("png")) return "png";
    if (mimeType.includes("gif")) return "gif";
    if (mimeType.includes("webp")) return "webp";
  }
  return ext || "jpg";
}

/**
 * 후기 이미지 여러 장 업로드.
 * 파일명은 한글/공백/특수문자 제거 후 review-{timestamp}-{index}.jpg 형태로 저장.
 */
export async function uploadReviewImages(
  formData: FormData
): Promise<{ urls: string[]; error?: string }> {
  try {
    const files = formData.getAll("images") as File[];
    console.log("[uploadReviewImages] start, fileCount=", files?.length ?? 0);
    if (!files?.length) {
      return { urls: [] };
    }
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (f instanceof File) {
        console.log("[uploadReviewImages] file", i, "name=", f.name, "type=", f.type, "size=", f.size);
      }
    }
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return { urls: [], error: "Supabase not configured (env missing)" };
    }

    const supabase = createClient();
    const urls: string[] = [];
    const baseTime = Date.now();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!(file instanceof File) || !file.size) continue;
      const ext = safeExtension(file.name || "", file.type || "");
      const path = `review-${baseTime}-${i}.${ext}`;
      console.log("[uploadReviewImages] upload path=", path);

      const buf = await file.arrayBuffer();
      const contentType = file.type && file.type.startsWith("image/") ? file.type : "image/jpeg";
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .upload(path, buf, { contentType, upsert: false });

      if (error) {
        console.error("[uploadReviewImages] storage error fileIndex=", i, "path=", path, "message=", error.message);
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
