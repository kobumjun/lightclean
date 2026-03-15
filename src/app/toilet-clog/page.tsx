import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "변기막힘",
  description: "변기 막힘·역류 긴급 출동. 위생·급한 상황 대응. 번개배관케어.",
};

export default function ToiletClogPage() {
  return (
    <>
      <section className="bg-[var(--navy)] px-4 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">긴급 출동</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">변기 막힘·역류, 빠르게 해결합니다</h1>
          <p className="mt-4 text-slate-300">
            변기 물 넘침·막힘은 위생과 불편이 크므로 신속한 대응이 필요합니다. 전화 한 통이면 출동합니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={`tel:${siteConfig.phoneTel}`} className="inline-flex items-center gap-2 rounded-full bg-[var(--cta)] px-6 py-3.5 font-semibold hover:bg-[var(--cta-hover)]">
              <span>{siteConfig.phone}</span>
            </a>
            <Link href={siteConfig.consultPath} className="rounded-full border-2 border-white px-6 py-3 font-semibold hover:bg-white/10">
              간편상담
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--border)] bg-white px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-[var(--navy)]">증상과 원인</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-[var(--border)] p-5">
              <h3 className="font-semibold text-[var(--navy)]">흔한 증상</h3>
              <ul className="mt-2 text-sm text-[var(--muted)]">
                <li>· 변기 물이 안 내려감</li>
                <li>· 물이 넘침·역류</li>
                <li>· 배수 소리만 나고 안 빠짐</li>
              </ul>
            </div>
            <div className="rounded-xl border border-[var(--border)] p-5">
              <h3 className="font-semibold text-[var(--navy)]">발생 원인</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                이물질·과다한 휴지·배관 굵기·굴곡 구간 막힘 등으로 발생합니다. 변기 본체부터 하수 연결부까지 확인해 시공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <SectionTitle title="방치 시 문제" subtitle="위생과 주변 피해를 줄이기 위해 빠른 조치가 필요합니다." />
          <ul className="mt-6 flex flex-wrap gap-3">
            {["실내 오염", "악취·세균", "인접 세대 영향", "하자 확대"].map((t) => (
              <li key={t} className="rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-800">{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-slate-50 px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <SectionTitle title="해결 프로세스" />
          <ol className="mt-8 space-y-4">
            {["전화/간편상담 접수", "신속 출동", "변기·배관 상태 확인 및 견적", "시공 및 사용 안내"].map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--cta)] text-sm font-bold text-white">{i + 1}</span>
                <span className="text-[var(--navy-muted)]">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-[var(--navy)]">작업 가능 사례</h2>
          <p className="mt-4 text-[var(--navy-muted)]">
            일반 변기 막힘, 양변기·좌변기, 공동주택·단독주택 변기 배수 등 다양한 현장을 방문합니다.
          </p>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--card-bg)] px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <SectionTitle title="자주 묻는 질문" />
          <ul className="mt-6 space-y-4">
            {[
              { q: "급한데 얼마나 빨리 오나요?", a: "접수 후 가능한 한 빠르게 출동합니다. 지역에 따라 차이가 있습니다." },
              { q: "비용은 어떻게 되나요?", a: "현장 확인 후 작업 범위에 따라 견적을 안내해 드립니다." },
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
            <Link href="/odor-removal" className="rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--navy)]">악취제거</Link>
            <Link href="/leak-detection" className="rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--navy)]">누수탐지</Link>
          </div>
        </div>
      </section>
    </>
  );
}
