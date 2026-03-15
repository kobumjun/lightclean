"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { submitConsultation } from "@/app/actions/consultation";

const INITIAL = {
  name: "",
  phone: "",
  inquiryType: "",
  message: "",
  privacyAgreed: false,
};

export function ConsultationForm() {
  const router = useRouter();
  const [form, setForm] = useState(INITIAL);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.privacyAgreed) {
      setError("개인정보 수집·이용에 동의해 주세요.");
      return;
    }
    if (!form.name.trim() || !form.phone.trim()) {
      setError("이름과 연락처를 입력해 주세요.");
      return;
    }
    setSubmitting(true);
    try {
      await submitConsultation({
        name: form.name.trim(),
        phone: form.phone.trim(),
        inquiry_type: form.inquiryType,
        message: form.message.trim(),
        privacy_agreed: form.privacyAgreed,
      });
      const r = siteConfig.consultSubmitRedirect;
      if (r.type === "tel" && r.value) {
        window.location.href = `tel:${r.value.replace(/-/g, "")}`;
        return;
      }
      if (r.type === "sms" && r.value) {
        window.location.href = `sms:${r.value.replace(/-/g, "")}`;
        return;
      }
      if (r.type === "kakao" && r.value) {
        window.open(siteConfig.kakaoUrl, "_blank");
        return;
      }
      router.push("/consult?done=1");
    } catch (err) {
      setError("제출 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-4">
      <div>
        <label htmlFor="consult-name" className="block text-sm font-medium text-[var(--navy)]">
          이름 <span className="text-[var(--cta)]">*</span>
        </label>
        <input
          id="consult-name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          className="mt-1 w-full rounded-lg border border-[var(--border)] px-4 py-2.5 text-[var(--navy)] focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20"
          placeholder="홍길동"
        />
      </div>
      <div>
        <label htmlFor="consult-phone" className="block text-sm font-medium text-[var(--navy)]">
          연락처 <span className="text-[var(--cta)]">*</span>
        </label>
        <input
          id="consult-phone"
          type="tel"
          required
          value={form.phone}
          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
          className="mt-1 w-full rounded-lg border border-[var(--border)] px-4 py-2.5 text-[var(--navy)] focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20"
          placeholder="010-0000-0000"
        />
      </div>
      <div>
        <label htmlFor="consult-type" className="block text-sm font-medium text-[var(--navy)]">
          상담 유형
        </label>
        <select
          id="consult-type"
          value={form.inquiryType}
          onChange={(e) => setForm((p) => ({ ...p, inquiryType: e.target.value }))}
          className="mt-1 w-full rounded-lg border border-[var(--border)] px-4 py-2.5 text-[var(--navy)] focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20"
        >
          <option value="">선택해 주세요</option>
          {siteConfig.serviceTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="consult-message" className="block text-sm font-medium text-[var(--navy)]">
          문의 내용
        </label>
        <textarea
          id="consult-message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          className="mt-1 w-full rounded-lg border border-[var(--border)] px-4 py-2.5 text-[var(--navy)] focus:border-[var(--brand)] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/20"
          placeholder="증상, 주소(대략), 희망 일시 등을 적어 주시면 빠르게 연락드리겠습니다."
        />
      </div>
      <div className="flex items-start gap-2">
        <input
          id="consult-privacy"
          type="checkbox"
          checked={form.privacyAgreed}
          onChange={(e) => setForm((p) => ({ ...p, privacyAgreed: e.target.checked }))}
          className="mt-1 rounded border-[var(--border)] text-[var(--brand)] focus:ring-[var(--brand)]"
        />
        <label htmlFor="consult-privacy" className="text-sm text-[var(--muted)]">
          개인정보 수집·이용에 동의합니다. (필수) 수집 항목: 이름, 연락처, 문의 내용. 목적: 상담 및 출동 서비스 제공.
        </label>
      </div>
      {error && <p className="text-sm text-[var(--cta)]">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-[var(--brand)] py-3.5 font-semibold text-white transition-colors hover:bg-[var(--brand-dark)] disabled:opacity-60"
      >
        {submitting ? "제출 중…" : "상담 신청하기"}
      </button>
    </form>
  );
}
