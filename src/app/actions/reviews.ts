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
  const slugStr = typeof slug === "string" ? slug.trim() : "";
  console.log("[getReviewBySlug] slug param:", JSON.stringify(slugStr));
  if (!slugStr) return null;
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }
  const supabase = createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("slug", slugStr)
    .eq("is_published", true)
    .single();
  if (error) {
    console.error("[getReviewBySlug] error:", error.message);
    return null;
  }
  if (!data) return null;
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

function safeSlugFromTitle(title: string): string {
  const t = (title || "").trim();
  const safe = `${Date.now()}-${t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80)}`;
  const out = safe.length > 12 ? safe : `${Date.now()}-post`;
  return out;
}

export async function createReview(
  input: Omit<ReviewInsert, "slug"> & { slug?: string }
): Promise<{ id?: string; error?: string }> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return { error: "Supabase not configured (env missing)" };
    }
    const supabase = createClient();
    const slug = safeSlugFromTitle(input.title || "");
    console.log("[createReview] slug to save:", slug);
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
    revalidatePath(`/reviews/${slug}`);
    console.log("[createReview] success id=", data?.id, "slug=", slug);
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
    const { data: existing } = await supabase.from("reviews").select("slug").eq("id", id).single();
    const { error } = await supabase.from("reviews").update(input).eq("id", id);
    if (error) return { error: error.message };
    revalidatePath("/reviews");
    revalidatePath("/");
    if (existing?.slug) revalidatePath(`/reviews/${existing.slug}`);
    if (typeof input.slug === "string" && input.slug.trim()) revalidatePath(`/reviews/${input.slug.trim()}`);
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
