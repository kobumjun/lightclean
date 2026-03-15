import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const b = siteConfig.business;
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--navy)] text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-bold">{siteConfig.brandName}</p>
            <p className="mt-1 text-sm text-slate-300">{siteConfig.operatingHours}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-200">연락처</p>
            <a href={`tel:${siteConfig.phoneTel}`} className="mt-1 block text-cyan-300 hover:underline">
              {b.phone}
            </a>
            <a
              href={siteConfig.kakaoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-cyan-300 hover:underline"
            >
              카카오톡 상담
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-200">사업자 정보</p>
            <p className="mt-1 text-sm text-slate-400">{b.companyName}</p>
            <p className="text-sm text-slate-400">대표 {b.representative}</p>
            <p className="text-sm text-slate-400">사업자등록번호 {b.registrationNumber}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-200">주소</p>
            <p className="mt-1 text-sm text-slate-400">{b.address}</p>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-700 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
          </p>
          <Link href={siteConfig.consultPath} className="text-sm text-cyan-300 hover:underline">
            간편상담 신청
          </Link>
        </div>
      </div>
    </footer>
  );
}
