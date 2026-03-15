"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--card-bg)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--card-bg)]/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-18 sm:px-6">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-[var(--navy)] sm:text-xl"
          aria-label={`${siteConfig.brandName} 홈`}
        >
          {siteConfig.brandName}
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="메인 메뉴">
          {siteConfig.menus.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "bg-[var(--accent-soft)] text-[var(--brand-dark)]"
                  : "text-[var(--navy-muted)] hover:bg-slate-100 hover:text-[var(--navy)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href={siteConfig.consultPath}
            className="rounded-full bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-dark)]"
          >
            간편상담
          </Link>
          <a
            href={`tel:${siteConfig.phoneTel}`}
            className="rounded-full border-2 border-[var(--brand)] px-4 py-2 text-sm font-semibold text-[var(--brand)] transition-colors hover:bg-[var(--accent-soft)]"
          >
            {siteConfig.phone}
          </a>
        </div>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-lg md:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="메뉴 열기"
          aria-expanded={mobileOpen}
        >
          <svg className="size-6 text-[var(--navy)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
