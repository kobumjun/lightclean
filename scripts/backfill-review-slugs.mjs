/**
 * 기존 리뷰 중 slug가 비어있거나 중복된 행에 안전한 slug를 채웁니다.
 * 사용: node scripts/backfill-review-slugs.mjs
 * .env.local 의 NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY 필요.
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnv() {
  const path = resolve(root, ".env.local");
  if (!existsSync(path)) return;
  const content = readFileSync(path, "utf8");
  for (const line of content.split("\n")) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
  }
}

loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key);

function safeSlug(title, id) {
  const t = (title || "").trim();
  const part = t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "post";
  return `${Date.now()}-${id.slice(0, 8)}-${part.slice(0, 40)}`;
}

async function main() {
  const { data: rows, error } = await supabase.from("reviews").select("id, slug, title");
  if (error) {
    console.error("fetch error:", error.message);
    process.exit(1);
  }
  const needFix = [];
  const slugs = new Set();
  for (const row of rows || []) {
    const s = (row.slug ?? "").trim();
    if (!s || slugs.has(s)) needFix.push(row);
    else slugs.add(s);
  }
  if (needFix.length === 0) {
    console.log("No rows need slug backfill.");
    return;
  }
  console.log("Backfilling slug for", needFix.length, "rows.");
  for (const row of needFix) {
    const newSlug = safeSlug(row.title, row.id);
    const { error: up } = await supabase.from("reviews").update({ slug: newSlug }).eq("id", row.id);
    if (up) console.error("update error for", row.id, up.message);
    else console.log("Updated", row.id, "->", newSlug);
  }
}

main();
