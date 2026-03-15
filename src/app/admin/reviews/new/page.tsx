"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { uploadReviewImages } from "@/app/actions/upload";
import { createReview } from "@/app/actions/reviews";

export default function AdminNewReviewPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [locationText, setLocationText] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setImages(Array.from(files));
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
      let imageUrls: string[] = [];
      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((file) => formData.append("images", file));
        const result = await uploadReviewImages(formData);
        if (!result.success) {
          setError(result.error);
          return;
        }
        imageUrls = result.urls ?? [];
      }
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
        setError(`[DB 저장] ${createResult.error}`);
        return;
      }
      if (!createResult.id) {
        setError("[DB 저장] 저장 후 ID를 받지 못했습니다.");
        return;
      }
      console.log("[Review save] success id=", createResult.id);
      router.push("/admin/reviews");
      router.refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err ?? "알 수 없는 오류");
      setError(msg);
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
            className="mt-1 w-full rounded-lg border border-[var(--border)] px-4 py-2"
          />
          {images.length > 0 && (
            <p className="mt-1 text-sm text-[var(--muted)]">{images.length}개 파일 선택됨. 첫 번째가 썸네일로 사용됩니다.</p>
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
