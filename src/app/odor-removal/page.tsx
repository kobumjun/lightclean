import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "악취제거",
  description: "배관·트랩·욕실 악취 원인 진단 및 제거. 번개배관케어.",
};

export default function OdorRemovalPage() {
  return (
    <>
      <section className="border-b border-[var(--border)] bg-[var(--card-bg)] px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold text-[var(--navy)] sm:text-4xl">악취 제거 서비스</h1>
          <p className="mt-4 text-lg text-[var(--muted)]">
            배관·트랩·드라이트랩에서 나는 냄새의 원인을 찾아 제거하고, 재발 방지까지 안내해 드립니다.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href={`tel:${siteConfig.phoneTel}`} className="rounded-xl bg-[var(--brand)] px-6 py-3 font-semibold text-white hover:bg-[var(--brand-dark)]">
              {siteConfig.phone}
            </a>
            <Link href={siteConfig.consultPath} className="rounded-xl border-2 border-[var(--navy)] px-6 py-3 font-semibold text-[var(--navy)] hover:bg-slate-100">
              간편상담
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <SectionTitle title="악취가 나는 흔한 원인" />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { title: "드라이트랩 건조", desc: "사용 빈도가 낮은 배수구는 트랩 물이 말라 가스가 역류할 수 있습니다." },
              { title: "배관 내부 찌꺼기", desc: "배관 벽에 쌓인 오염물에서 냄새가 날 수 있습니다." },
              { title: "배관 균열·이음", desc: "배관 손상·이음 부위로 악취가 새어 나올 수 있습니다." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-[var(--border)] bg-white p-5">
                <h3 className="font-semibold text-[var(--navy)]">{item.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-slate-50 px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-[var(--navy)]">진단·해결 과정</h2>
          <p className="mt-4 text-[var(--navy-muted)]">
            현장에서 냄새 발생 위치를 확인하고, 트랩·배관 상태를 점검합니다. 원인에 따라 세척·보수·교체 등을 안내해 드립니다.
          </p>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <SectionTitle title="작업 가능 범위" />
          <ul className="mt-6 flex flex-wrap gap-3">
            {["욕실 배수구", "주방 싱크대", "드라이트랩", "세면대", "배관 세척·점검"].map((t) => (
              <li key={t} className="rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--navy)]">{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--card-bg)] px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <SectionTitle title="FAQ" />
          <ul className="mt-6 space-y-4">
            {[
              { q: "냄새 원인을 꼭 찾나요?", a: "네. 현장에서 발생 위치와 원인을 확인한 뒤 적절한 시공을 안내해 드립니다." },
              { q: "비용은 어떻게 되나요?", a: "점검·작업 범위에 따라 다릅니다. 방문 후 견적을 안내해 드립니다." },
            ].map((item, i) => (
              <li key={i} className="rounded-lg border border-[var(--border)] p-4">
                <p className="font-semibold text-[var(--navy)]">{item.q}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{item.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm text-[var(--muted)]">다른 서비스</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <Link href="/drain-clog" className="text-sm font-medium text-[var(--brand)] hover:underline">하수구막힘</Link>
            <Link href="/sink-clog" className="text-sm font-medium text-[var(--brand)] hover:underline">싱크대막힘</Link>
            <Link href="/toilet-clog" className="text-sm font-medium text-[var(--brand)] hover:underline">변기막힘</Link>
            <Link href="/leak-detection" className="text-sm font-medium text-[var(--brand)] hover:underline">누수탐지</Link>
          </div>
        </div>
      </section>
    </>
  );
}
