"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "lightning-pipe-care-popup-closed";

export function PopupNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const closed = sessionStorage.getItem(STORAGE_KEY);
    if (!closed) setOpen(true);
  }, []);

  const handleClose = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  const handleCopyDomain = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.origin);
      // 간단 피드백 가능 (선택)
    }
  };

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[100] bg-black/50"
        aria-hidden
        onClick={handleClose}
      />
      <div
        role="dialog"
        aria-labelledby="popup-title"
        aria-modal="true"
        className="fixed left-1/2 top-1/2 z-[101] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="popup-title" className="text-lg font-bold text-[var(--navy)]">
            광고 접근 안내
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="shrink-0 rounded-lg p-1 text-[var(--muted)] hover:bg-slate-100 hover:text-[var(--navy)]"
            aria-label="닫기"
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="mt-3 text-sm text-[var(--muted)]">
          본 사이트는 광고를 통해 접근하신 경우, 접근 경로·일시 등을 안내해 드릴 수 있습니다.
          문의 시 아래 도메인 정보를 활용해 주세요.
        </p>
        <div className="mt-4 rounded-lg bg-slate-50 p-3">
          <p className="text-xs text-[var(--muted)]">접근 도메인 예시</p>
          <table className="mt-1 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-1.5 font-medium text-[var(--navy)]">구분</th>
                <th className="py-1.5 font-medium text-[var(--navy)]">내용</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-1.5 text-[var(--muted)]">도메인</td>
                <td className="py-1.5 font-mono text-xs">(현재 접속 주소)</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-1.5 text-[var(--muted)]">접근일시</td>
                <td className="py-1.5">-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={handleCopyDomain}
            className="rounded-lg border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--navy)] hover:bg-slate-50"
          >
            도메인 복사
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--brand-dark)]"
          >
            확인
          </button>
        </div>
      </div>
    </>
  );
}
