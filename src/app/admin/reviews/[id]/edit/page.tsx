"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { getReviewByIdForAdmin, updateReview } from "@/app/actions/reviews";
import { uploadOneReviewImage } from "@/lib/upload-review-images-client";
import type { ReviewRow } from "@/types/database";

export default function AdminEditReviewPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [review, setReview] = useState<ReviewRow | null>(null);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [locationText, setLocationText] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getReviewByIdForAdmin(id).then((r) => {
      if (r) {
        setReview(r);
        setTitle(r.title);
        setSummary(r.summary || "");
        setContent(r.content || "");
        setServiceType(r.service_type || "");
        setLocationText(r.location_text || "");
        setIsPublished(r.is_published);
        setImageUrls(Array.isArray(r.image_urls) ? r.image_urls : []);
      }
      setLoading(false);
    });
  }, [id]);

  const handleNewFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    const validFiles = Array.from(files).filter((f): f is File => f instanceof File && f.size > 0);
    if (validFiles.length === 0) return;

    setError("");
    setUploading(true);
    const newUrls: string[] = [];
    for (const file of validFiles) {
      const result = await uploadOneReviewImage(file);
      if ("error" in result) {
        setError(`[이미지 업로드] ${result.error}`);
        setUploading(false);
        return;
      }
      newUrls.push(result.url);
    }
    setImageUrls((prev) => [...prev, ...newUrls]);
    setUploading(false);
    e.target.value = "";
  };

  const removeImageUrl = (url: string) => {
    setImageUrls((prev) => prev.filter((u) => u !== url));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!review) return;
    setError("");

    if (!title.trim()) {
      setError("제목을 입력해 주세요.");
      return;
    }

    setSubmitting(true);
    try {
      const thumbnailUrl = imageUrls[0] || review.thumbnail_url || null;
      const updateError = await updateReview(review.id, {
        title: title.trim(),
        summary: summary.trim(),
        content: content.trim(),
        service_type: serviceType,
        location_text: locationText,
        thumbnail_url: thumbnailUrl,
        image_urls: imageUrls,
        is_published: isPublished,
      });
      if (updateError.error) {
        setError(updateError.error);
        return;
      }
      router.push("/admin/reviews");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err ?? "저장 실패"));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-[var(--muted)]">로딩 중…</p>
      </div>
    );
  }
  if (!review) {
    return (
      <div className="px-4 py-10">
        <p className="text-[var(--cta)]">후기를 찾을 수 없습니다.</p>
        <Link href="/admin/reviews" className="mt-4 inline-block text-[var(--brand)] hover:underline">
          목록으로
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/reviews" className="text-[var(--brand)] hover:underline">
          ← 목록
        </Link>
        <h1 className="text-xl font-bold text-[var(--navy)]">후기 수정</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-[var(--border)] bg-white p-6">
        <div>
          <label className="block text-sm font-medium text-[var(--navy)]">제목 *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[var(--border)] px-4 py-2.5"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--navy)]">요약</label>
          <input
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[var(--border)] px-4 py-2.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--navy)]">본문</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="mt-1 w-full rounded-lg border border-[var(--border)] px-4 py-2.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--navy)]">서비스 유형</label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[var(--border)] px-4 py-2.5"
          >
            <option value="">선택</option>
            {siteConfig.serviceTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--navy)]">작업 지역</label>
          <input
            type="text"
            value={locationText}
            onChange={(e) => setLocationText(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[var(--border)] px-4 py-2.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--navy)]">이미지</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {imageUrls.map((url) => (
              <div key={url} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="h-20 w-20 rounded object-cover" />
                <button
                  type="button"
                  onClick={() => removeImageUrl(url)}
                  className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs text-white hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <p className="mt-1 text-xs text-[var(--muted)]">삭제하려면 × 를 누르세요. 순서는 저장 시 반영됩니다.</p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleNewFileChange}
            disabled={uploading}
            className="mt-2 w-full rounded-lg border border-[var(--border)] px-4 py-2"
          />
          {uploading && <p className="mt-1 text-sm text-[var(--muted)]">업로드 중…</p>}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="rounded border-[var(--border)]"
          />
          <label htmlFor="published" className="text-sm text-[var(--navy)]">공개</label>
        </div>
        {error && <p className="text-sm text-[var(--cta)]">{error}</p>}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-[var(--brand)] px-6 py-2.5 font-medium text-white hover:bg-[var(--brand-dark)] disabled:opacity-60"
          >
            {submitting ? "저장 중…" : "저장"}
          </button>
          <Link href="/admin/reviews" className="rounded-lg border border-[var(--border)] px-6 py-2.5 font-medium hover:bg-slate-50">
            취소
          </Link>
        </div>
      </form>
    </div>
  );
}
