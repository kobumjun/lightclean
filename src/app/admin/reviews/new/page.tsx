"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { uploadOneReviewImage } from "@/lib/upload-review-images-client";
import { createReview } from "@/app/actions/reviews";

export default function AdminNewReviewPage() {
  const router = useRouter();
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setError("");

    if (!title.trim()) {
      setError("제목을 입력해 주세요.");
      return;
    }

    setSubmitting(true);
    try {
      const thumbnailUrl = imageUrls.length > 0 ? imageUrls[0] : null;
      const createResult = await createReview({
        title: title.trim(),
        summary: summary.trim(),
        content: content.trim(),
        service_type: serviceType,
        location_text: locationText,
        thumbnail_url: thumbnailUrl ?? null,
        image_urls: imageUrls,
        is_published: isPublished,
      });
      if (createResult.error) {
        setError(createResult.error);
        return;
      }
      if (!createResult.id) {
        setError("저장 후 ID를 받지 못했습니다.");
        return;
      }
      router.push("/admin/reviews");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err ?? "알 수 없는 오류"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/reviews" className="text-[var(--brand)] hover:underline">
          ← 목록
        </Link>
        <h1 className="text-xl font-bold text-[var(--navy)]">새 후기 작성</h1>
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
            placeholder="목록/카드에 보일 한 줄 요약"
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
          <label className="block text-sm font-medium text-[var(--navy)]">작업 지역 (표시용)</label>
          <input
            type="text"
            value={locationText}
            onChange={(e) => setLocationText(e.target.value)}
            className="mt-1 w-full rounded-lg border border-[var(--border)] px-4 py-2.5"
            placeholder="예: 서울 OO구"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--navy)]">이미지 (여러 장)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            disabled={uploading}
            className="mt-1 w-full rounded-lg border border-[var(--border)] px-4 py-2"
          />
          {uploading && <p className="mt-1 text-sm text-[var(--muted)]">업로드 중…</p>}
          {imageUrls.length > 0 && (
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
          )}
          {imageUrls.length > 0 && (
            <p className="mt-1 text-xs text-[var(--muted)]">첫 번째가 썸네일. 삭제하려면 × 를 누르세요.</p>
          )}
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
        {error && <p className="text-sm font-medium text-red-600" role="alert">{error}</p>}
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
