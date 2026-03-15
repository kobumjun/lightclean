import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "누수탐지",
  description: "눈에 보이지 않는 누수 탐지·원인 진단. 천장·벽·배관 점검. 번개배관케어.",
};

export default function LeakDetectionPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--navy)] px-4 py-20 text-white sm:py-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold sm:text-4xl">누수 탐지·진단</h1>
          <p className="mt-4 text-lg text-slate-300">
            천장·벽·바닥에서 물기가 보이거나, 눈에 보이지 않는 누수가 의심될 때 원인을 찾아 드립니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={`tel:${siteConfig.phoneTel}`} className="rounded-full bg-cyan-500 px-6 py-3 font-semibold hover:bg-cyan-600">
              {siteConfig.phone}
            </a>
            <Link href={siteConfig.consultPath} className="rounded-full border-2 border-white px-6 py-3 font-semibold hover:bg-white/10">
              간편상담
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-white px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[var(--navy)]">눈에 안 보이는 누수, 왜 위험한가요?</h2>
          <p className="mt-4 text-[var(--navy-muted)]">
            배관 이음·균열·콘덴싱 등으로 물이 조금씩 새면, 벽·천장 안쪽에서 곰팡이·부식이 진행될 수 있습니다. 조기 점검이 중요합니다.
          </p>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <SectionTitle title="진단 과정" subtitle="현장 확인 후 원인을 파악합니다." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "1", title: "현장 방문", desc: "누수·물기 위치 확인" },
              { step: "2", title: "점검", desc: "배관·이음·주변 상태 확인" },
              { step: "3", title: "원인 파악", desc: "누수 원인 및 구간 진단" },
              { step: "4", title: "안내", desc: "보수·교체 등 조치 안내" },
            ].map((item) => (
              <div key={item.step} className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5 text-center">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-cyan-100 text-lg font-bold text-cyan-800">{item.step}</span>
                <h3 className="mt-3 font-semibold text-[var(--navy)]">{item.title}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-slate-50 px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-[var(--navy)]">점검 가능한 범위</h2>
          <ul className="mt-6 space-y-2 text-[var(--navy-muted)]">
            <li>· 천장·벽면 물기·얼룩</li>
            <li>· 배관 이음·밸브 주변</li>
            <li>· 욕실·주방 배수·급수 배관</li>
            <li>· 옆집·윗집 누수 의심 시</li>
          </ul>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <SectionTitle title="점검의 중요성" />
          <p className="mt-6 text-[var(--navy-muted)]">
            방치하면 습기·곰팡이·구조물 손상으로 이어질 수 있습니다. 의심되시면 미리 점검받는 것을 권합니다.
          </p>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--card-bg)] px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <SectionTitle title="자주 묻는 질문" />
          <ul className="mt-6 space-y-4">
            {[
              { q: "탐지 비용은 얼마인가요?", a: "현장·점검 범위에 따라 다릅니다. 방문 후 견적을 안내해 드립니다." },
              { q: "당일 점검 가능한가요?", a: "일정에 따라 가능합니다. 전화 또는 간편상담으로 문의해 주세요." },
            ].map((item, i) => (
              <li key={i} className="rounded-lg border border-[var(--border)] bg-white p-4">
                <p className="font-semibold text-[var(--navy)]">{item.q}</p>
                <p className="mt-2 text-sm text-[var(--muted)]">{item.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[var(--muted)]">다른 서비스</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link href="/drain-clog" className="rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--navy)]">하수구막힘</Link>
            <Link href="/sink-clog" className="rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--navy)]">싱크대막힘</Link>
            <Link href="/toilet-clog" className="rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--navy)]">변기막힘</Link>
            <Link href="/odor-removal" className="rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--navy)]">악취제거</Link>
          </div>
        </div>
      </section>
    </>
  );
}
