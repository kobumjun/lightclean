"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 md:hidden"
        aria-hidden
        onClick={onClose}
      />
      <div
        className="fixed right-0 top-0 z-50 flex h-full w-80 max-w-[85vw] flex-col gap-1 border-l border-[var(--border)] bg-[var(--card-bg)] p-4 shadow-xl md:hidden"
        role="dialog"
        aria-label="메뉴"
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <span className="font-bold text-[var(--navy)]">{siteConfig.brandName}</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-2 text-[var(--muted)] hover:bg-slate-100 hover:text-[var(--navy)]"
            aria-label="메뉴 닫기"
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-1 py-4">
          {siteConfig.menus.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`rounded-lg px-4 py-3 text-base font-medium ${
                pathname === item.href
                  ? "bg-[var(--accent-soft)] text-[var(--brand-dark)]"
                  : "text-[var(--navy-muted)] hover:bg-slate-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2 border-t border-[var(--border)] pt-4">
          <Link
            href={siteConfig.consultPath}
            onClick={onClose}
            className="rounded-lg bg-[var(--brand)] py-3 text-center font-semibold text-white"
          >
            간편상담
          </Link>
          <a
            href={`tel:${siteConfig.phoneTel}`}
            onClick={onClose}
            className="rounded-lg border-2 border-[var(--brand)] py-3 text-center font-semibold text-[var(--brand)]"
          >
            {siteConfig.phone}
          </a>
        </div>
      </div>
    </>
  );
}
