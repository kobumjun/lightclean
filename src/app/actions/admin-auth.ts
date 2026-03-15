"use server";

export async function verifyAdminPassword(password: string): Promise<{ ok: boolean }> {
  const expected = process.env.ADMIN_PASSWORD || "1234";
  const ok = password === expected;
  console.log("[Admin auth] received password length=", password?.length, "expected length=", expected?.length, "ok=", ok);
  return { ok };
}
