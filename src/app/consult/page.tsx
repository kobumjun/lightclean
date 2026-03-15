"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { SectionTitle } from "@/components/SectionTitle";
import { ConsultationForm } from "@/components/ConsultationForm";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

function ConsultContent() {
  const searchParams = useSearchParams();
  const done = searchParams.get("done");

  if (done === "1") {
    return (
      <div className="mx-auto max-w-lg rounded-xl border border-[var(--border)] bg-white p-8 text-center">
        <h2 className="text-xl font-bold text-[var(--navy)]">상담 신청이 접수되었습니다</h2>
        <p className="mt-4 text-[var(--muted)]">
          입력하신 연락처로 빠른 시일 내에 연락드리겠습니다.
        </p>
        <p className="mt-4 text-sm text-[var(--muted)]">
          바로 연락을 원하시면{" "}
          <a href={`tel:${siteConfig.phoneTel}`} className="font-medium text-[var(--brand)] hover:underline">
            {siteConfig.phone}
          </a>
          으로 전화 주세요.
        </p>
        <Link href="/" className="mt-6 inline-block rounded-lg bg-[var(--brand)] px-6 py-2.5 font-medium text-white hover:bg-[var(--brand-dark)]">
          홈으로
        </Link>
      </div>
    );
  }

  return (
    <>
      <SectionTitle
        title="간편상담 신청"
        subtitle="이름·연락처·증상을 적어 주시면 빠르게 연락드립니다."
      />
      <div className="mt-10">
        <ConsultationForm />
      </div>
    </>
  );
}

export default function ConsultPage() {
  return (
    <section className="px-4 py-14 sm:py-18">
      <div className="mx-auto max-w-2xl">
        <Suspense fallback={<p className="text-center text-[var(--muted)]">로딩 중…</p>}>
          <ConsultContent />
        </Suspense>
      </div>
    </section>
  );
}
