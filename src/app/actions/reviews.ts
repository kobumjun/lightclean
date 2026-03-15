"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ReviewRow, ReviewInsert, ReviewUpdate } from "@/types/database";

export async function getPublishedReviews(limit = 20): Promise<ReviewRow[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return [];
  }
  const supabase = createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) return [];
  return (data as ReviewRow[]) ?? [];
}

export async function getReviewBySlug(slug: string): Promise<ReviewRow | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }
  const supabase = createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();
  if (error || !data) return null;
  return data as ReviewRow;
}

export async function getAllReviewsForAdmin(): Promise<ReviewRow[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return [];
  }
  const supabase = createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return [];
  return (data as ReviewRow[]) ?? [];
}

export async function getReviewByIdForAdmin(id: string): Promise<ReviewRow | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }
  const supabase = createClient();
  const { data, error } = await supabase.from("reviews").select("*").eq("id", id).single();
  if (error || !data) return null;
  return data as ReviewRow;
}

function slugify(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u3131-\u318E\uAC00-\uD7A3-]+/g, "")
    .toLowerCase() || "post";
}

export async function createReview(
  input: Omit<ReviewInsert, "slug"> & { slug?: string }
): Promise<{ id?: string; error?: string }> {
  try {
    console.log("[createReview] start");
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error("[createReview] Supabase env missing");
      return { error: "Supabase not configured (env missing)" };
    }
    const supabase = createClient();
    const slug = input.slug?.trim() || slugify(input.title);
    const payload = {
      title: input.title,
      slug,
      summary: input.summary ?? "",
      content: input.content ?? "",
      service_type: input.service_type ?? "",
      location_text: input.location_text ?? "",
      thumbnail_url: input.thumbnail_url ?? null,
      image_urls: Array.isArray(input.image_urls) ? input.image_urls : [],
      is_published: input.is_published ?? true,
    };
    console.log("[createReview] insert payload keys=", Object.keys(payload));
    const { data, error } = await supabase
      .from("reviews")
      .insert(payload)
      .select("id")
      .single();
    if (error) {
      console.error("[createReview] insert error:", error.message, "code=", error.code);
      return { error: `DB: ${error.message}` };
    }
    revalidatePath("/reviews");
    revalidatePath("/");
    console.log("[createReview] success id=", data?.id);
    return { id: data?.id ?? undefined };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[createReview] catch:", message);
    return { error: message };
  }
}

export async function updateReview(
  id: string,
  input: ReviewUpdate
): Promise<{ error?: string }> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return { error: "Supabase not configured" };
    }
    const supabase = createClient();
    const { error } = await supabase.from("reviews").update(input).eq("id", id);
    if (error) return { error: error.message };
    revalidatePath("/reviews");
    revalidatePath("/");
    return {};
  } catch (err) {
    const message = err instanceof Error ? err.message : "수정 중 오류가 발생했습니다.";
    return { error: message };
  }
}

export async function deleteReview(id: string): Promise<{ error?: string }> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return { error: "Supabase not configured" };
    }
    const supabase = createClient();
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) return { error: error.message };
    revalidatePath("/reviews");
    revalidatePath("/");
    return {};
  } catch (err) {
    const message = err instanceof Error ? err.message : "삭제 중 오류가 발생했습니다.";
    return { error: message };
  }
}

export async function toggleReviewPublished(id: string): Promise<{ error?: string }> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return { error: "Supabase not configured" };
    }
    const supabase = createClient();
    const { data } = await supabase.from("reviews").select("is_published").eq("id", id).single();
    if (!data) return { error: "Not found" };
    const { error } = await supabase
      .from("reviews")
      .update({ is_published: !data.is_published })
      .eq("id", id);
    if (error) return { error: error.message };
    revalidatePath("/reviews");
    revalidatePath("/");
    return {};
  } catch (err) {
    const message = err instanceof Error ? err.message : "전환 중 오류가 발생했습니다.";
    return { error: message };
  }
}
