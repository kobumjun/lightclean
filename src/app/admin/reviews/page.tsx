"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllReviewsForAdmin, deleteReview, toggleReviewPublished } from "@/app/actions/reviews";
import type { ReviewRow } from "@/types/database";
import { setAdminAuthenticated } from "@/components/AdminGuard";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => getAllReviewsForAdmin().then((list) => {
    setReviews(list);
    setLoading(false);
  });

  useEffect(() => {
    load();
  }, []);

  const handleToggle = async (id: string) => {
    await toggleReviewPublished(id);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 이 후기를 삭제할까요?")) return;
    await deleteReview(id);
    load();
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    window.location.href = "/admin";
  };

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-[var(--muted)]">로딩 중…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <h1 className="text-2xl font-bold text-[var(--navy)]">후기 관리</h1>
        <div className="flex gap-2">
          <Link
            href="/admin/reviews/new"
            className="rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--brand-dark)]"
          >
            새 후기 작성
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--navy)] hover:bg-slate-100"
          >
            로그아웃
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-[var(--border)] bg-white">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-slate-50">
              <th className="px-4 py-3 font-semibold text-[var(--navy)]">제목</th>
              <th className="px-4 py-3 font-semibold text-[var(--navy)]">유형</th>
              <th className="px-4 py-3 font-semibold text-[var(--navy)]">공개</th>
              <th className="px-4 py-3 font-semibold text-[var(--navy)]">작성일</th>
              <th className="px-4 py-3 font-semibold text-[var(--navy)]">관리</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r.id} className="border-b border-[var(--border)] last:border-0">
                <td className="px-4 py-3 font-medium text-[var(--navy)]">{r.title}</td>
                <td className="px-4 py-3 text-[var(--muted)]">{r.service_type || "-"}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => handleToggle(r.id)}
                    className={`rounded px-2 py-0.5 text-xs font-medium ${r.is_published ? "bg-green-100 text-green-800" : "bg-slate-200 text-slate-600"}`}
                  >
                    {r.is_published ? "공개" : "비공개"}
                  </button>
                </td>
                <td className="px-4 py-3 text-[var(--muted)]">
                  {new Date(r.created_at).toLocaleDateString("ko-KR")}
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/reviews/${r.id}/edit`} className="text-[var(--brand)] hover:underline">
                    수정
                  </Link>
                  {" · "}
                  <button
                    type="button"
                    onClick={() => handleDelete(r.id)}
                    className="text-red-600 hover:underline"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {reviews.length === 0 && (
          <p className="py-12 text-center text-[var(--muted)]">등록된 후기가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
