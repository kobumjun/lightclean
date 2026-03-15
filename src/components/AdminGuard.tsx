"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ADMIN_KEY = "admin-authenticated";

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(ADMIN_KEY) === "1";
}

export function setAdminAuthenticated(value: boolean) {
  if (typeof window === "undefined") return;
  if (value) sessionStorage.setItem(ADMIN_KEY, "1");
  else sessionStorage.removeItem(ADMIN_KEY);
}

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const ok = isAdminAuthenticated();
    setAllowed(ok);
    setReady(true);
  }, [pathname]);

  useEffect(() => {
    if (!ready) return;
    if (!allowed && pathname !== "/admin" && pathname?.startsWith("/admin")) {
      router.replace("/admin");
    }
  }, [ready, allowed, pathname, router]);

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-[var(--muted)]">확인 중…</p>
      </div>
    );
  }

  return <>{children}</>;
}
