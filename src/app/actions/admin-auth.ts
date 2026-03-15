"use server";

export async function verifyAdminPassword(password: string): Promise<{ ok: boolean }> {
  const expected = process.env.ADMIN_PASSWORD || "1234";
  return { ok: password === expected };
}
