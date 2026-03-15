"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function FloatingCTA() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center gap-3 border-t border-[var(--border)] bg-[var(--card-bg)]/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] supports-[backdrop-filter]:bg-[var(--card-bg)]/90 sm:bottom-4 sm:left-auto sm:right-4 sm:max-w-sm sm:flex-row sm:rounded-2xl sm:border sm:border-[var(--border)] sm:p-3"
      role="complementary"
      aria-label="전화 및 상담 바로가기"
    >
      <a
        href={`tel:${siteConfig.phoneTel}`}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--cta)] py-3.5 font-semibold text-white transition-colors hover:bg-[var(--cta-hover)] sm:flex-initial sm:px-6"
      >
        <svg className="size-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
        <span>{siteConfig.phone}</span>
      </a>
      <a
        href={siteConfig.kakaoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#FEE500] py-3.5 font-semibold text-[#191919] transition-opacity hover:opacity-90 sm:flex-initial sm:px-6"
        aria-label="카카오톡 상담 열기"
      >
        <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 3c5.8 0 10.5 3.66 10.5 8.18 0 4.52-4.7 8.18-10.5 8.18-1.07 0-2.1-.14-3.08-.4-.54-.15-.99-.1-1.36.2l-1.13.9c-.36.28-.87.36-1.33.18-1.6-.5-2.98-1.4-4.05-2.6C2.58 13.72 2 11.54 2 9.18 2 4.66 6.7 3 12 3z" />
        </svg>
        <span>카카오 상담</span>
      </a>
    </div>
  );
}
