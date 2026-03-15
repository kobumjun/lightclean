"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import {
  getAdReferralInfo,
  shouldShowAdPopupByReferral,
  type AdReferralInfo,
} from "@/lib/ad-referral-info";

const STORAGE_KEY = "lightning-pipe-care-ad-popup-closed";

export function PopupNotice() {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState<AdReferralInfo | null>(null);
  const [copyToast, setCopyToast] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const adPopup = siteConfig.adPopup;
    if (!adPopup.enableAdPopup) return;

    const referralInfo = getAdReferralInfo();
    setInfo(referralInfo);

    const alreadyClosed = adPopup.adPopupShowOnce
      ? sessionStorage.getItem(STORAGE_KEY)
      : null;

    const shouldShow = adPopup.alwaysShowAdPopup
      ? true
      : referralInfo != null && shouldShowAdPopupByReferral(referralInfo);

    if (shouldShow && !alreadyClosed) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    if (siteConfig.adPopup.adPopupShowOnce && typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, "1");
    }
    setOpen(false);
  };

  const handleCopyUrl = async () => {
    if (!info?.currentUrl || typeof navigator?.clipboard === "undefined") return;
    try {
      await navigator.clipboard.writeText(info.currentUrl);
      setCopyToast(true);
      setTimeout(() => setCopyToast(false), 2000);
    } catch {
      setCopyToast(false);
    }
  };

  if (!open || !info) return null;

  const adPopup = siteConfig.adPopup;

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
        className="fixed left-1/2 top-1/2 z-[101] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] shadow-xl"
      >
        <div className="border-b border-[var(--border)] px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <h2
              id="popup-title"
              className="text-lg font-bold text-[var(--navy)]"
            >
              {adPopup.adPopupTitle}
            </h2>
            <button
              type="button"
              onClick={handleClose}
              className="shrink-0 rounded-lg p-1.5 text-[var(--muted)] hover:bg-slate-100 hover:text-[var(--navy)]"
              aria-label="닫기"
            >
              <svg
                className="size-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            {adPopup.adPopupDescription}
          </p>
        </div>

        <div className="max-h-[50vh] overflow-y-auto px-5 py-4">
          <div className="rounded-xl border border-[var(--border)] bg-slate-50/80">
            <table className="w-full text-left text-sm">
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="w-32 shrink-0 py-2.5 pl-3 pr-2 font-medium text-[var(--navy-muted)]">
                    현재 접속 주소
                  </td>
                  <td className="py-2.5 pr-3 font-mono text-xs text-[var(--navy)] break-all">
                    {info.currentUrl}
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2.5 pl-3 pr-2 font-medium text-[var(--navy-muted)]">
                    이전 유입 주소
                  </td>
                  <td className="py-2.5 pr-3 text-[var(--navy)] break-all">
                    {info.referrer}
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2.5 pl-3 pr-2 font-medium text-[var(--navy-muted)]">
                    광고 매체
                  </td>
                  <td className="py-2.5 pr-3 text-[var(--navy)]">
                    {info.utmSource}
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2.5 pl-3 pr-2 font-medium text-[var(--navy-muted)]">
                    광고 유형
                  </td>
                  <td className="py-2.5 pr-3 text-[var(--navy)]">
                    {info.utmMedium}
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="py-2.5 pl-3 pr-2 font-medium text-[var(--navy-muted)]">
                    캠페인명
                  </td>
                  <td className="py-2.5 pr-3 text-[var(--navy)]">
                    {info.utmCampaign}
                  </td>
                </tr>
                {info.utmTerm ? (
                  <tr className="border-b border-slate-200">
                    <td className="py-2.5 pl-3 pr-2 font-medium text-[var(--navy-muted)]">
                      검색/키워드
                    </td>
                    <td className="py-2.5 pr-3 text-[var(--navy)]">
                      {info.utmTerm}
                    </td>
                  </tr>
                ) : null}
                <tr className="border-b border-slate-200">
                  <td className="py-2.5 pl-3 pr-2 font-medium text-[var(--navy-muted)]">
                    유형(콘텐츠)
                  </td>
                  <td className="py-2.5 pr-3 text-[var(--navy)]">
                    {info.utmContent}
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pl-3 pr-2 font-medium text-[var(--navy-muted)]">
                    접속 시각
                  </td>
                  <td className="py-2.5 pr-3 text-[var(--navy)]">
                    {info.accessTime}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="relative flex flex-wrap items-center gap-2 border-t border-[var(--border)] px-5 py-4">
          {copyToast && (
            <div
              role="status"
              className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-lg bg-[var(--navy)] px-3 py-2 text-xs text-white shadow-lg"
            >
              {adPopup.adPopupCopyToast}
            </div>
          )}
          <button
            type="button"
            onClick={handleCopyUrl}
            className="rounded-lg border border-[var(--border)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--navy)] hover:bg-slate-50"
          >
            주소 복사
          </button>
          <Link
            href={siteConfig.consultPath}
            onClick={handleClose}
            className="rounded-lg border border-[var(--brand)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--brand)] hover:bg-[var(--accent-soft)]"
          >
            상담하기
          </Link>
          <button
            type="button"
            onClick={handleClose}
            className="ml-auto rounded-lg bg-[var(--brand)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[var(--brand-dark)]"
          >
            닫기
          </button>
        </div>
      </div>
    </>
  );
}
