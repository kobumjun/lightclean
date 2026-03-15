"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { setAdminAuthenticated } from "@/components/AdminGuard";
import { verifyAdminPassword } from "@/app/actions/admin-auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const passwordValue = (passwordRef.current?.value ?? "") as string;
    if (typeof window !== "undefined") {
      console.log("[Admin] submit: password length=", passwordValue.length, "firstChar=", passwordValue ? passwordValue[0] : "(empty)");
    }
    setError("");
    const { ok } = await verifyAdminPassword(passwordValue);
    if (typeof window !== "undefined") {
      console.log("[Admin] verifyAdminPassword result ok=", ok);
    }
    if (ok) {
      setAdminAuthenticated(true);
      router.replace("/admin/reviews");
    } else {
      setError("비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-6 shadow-sm">
        <h1 className="text-xl font-bold text-[var(--navy)]">관리자 로그인</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">비밀번호를 입력하세요.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="admin-pw" className="block text-sm font-medium text-[var(--navy)]">
              비밀번호
            </label>
            <input
              ref={passwordRef}
              id="admin-pw"
              name="password"
              type="password"
              className="mt-1 w-full rounded-lg border border-[var(--border)] px-4 py-2.5"
              placeholder="숫자 비밀번호"
              autoComplete="off"
              required
            />
          </div>
          {error && <p className="text-sm text-[var(--cta)]">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-lg bg-[var(--navy)] py-2.5 font-medium text-white hover:bg-[var(--navy-muted)]"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
