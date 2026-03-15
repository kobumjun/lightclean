import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "하수구막힘",
  description: "하수구 역류·악취·배수 지연 해결. 번개배관케어 24시간 출동.",
};

export default function DrainClogPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-slate-800 to-slate-900 px-4 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold sm:text-4xl">하수구 막힘, 역류·악취 해결</h1>
          <p className="mt-4 text-lg text-slate-300">
            하수구가 막히면 배수 지연, 악취, 역류까지 이어질 수 있습니다. 원인을 정확히 파악하고 시공해 드립니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={`tel:${siteConfig.phoneTel}`} className="rounded-full bg-cyan-500 px-6 py-3 font-semibold hover:bg-cyan-600">
              {siteConfig.phone}
            </Link>
            <Link href={siteConfig.consultPath} className="rounded-full border-2 border-white px-6 py-3 font-semibold hover:bg-white/10">
              간편상담
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-[var(--navy)]">이런 증상이 있으신가요?</h2>
          <ul className="mt-4 space-y-2 text-[var(--navy-muted)]">
            <li>· 배수가 잘 안 되고 물이 천천히 빠짐</li>
            <li>· 하수구에서 악취가 남</li>
            <li>· 세면대·욕실에서 물이 역류함</li>
            <li>· 빨래할 때 배수구에서 물이 넘침</li>
          </ul>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-slate-50 px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <SectionTitle title="왜 하수구가 막히나요?" />
          <p className="mt-6 text-[var(--navy-muted)]">
            털·비누찌꺼기·이물질이 배관에 쌓이거나, 오래된 배관의 부식·굵기 문제로 배수가 원활하지 않을 수 있습니다.
            아파트 공동 배관·개별 배관 구간을 확인해 원인을 찾아 시공합니다.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-[var(--navy)]">방치 시 생길 수 있는 문제</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "역류로 인한 실내 오염·악취",
              "배수 불가로 생활 불편",
              "하자 확대·인접 세대 영향",
            ].map((t) => (
              <div key={t} className="rounded-lg border border-[var(--border)] bg-white p-4">
                <p className="text-[var(--navy-muted)]">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--card-bg)] px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <SectionTitle title="해결 프로세스" subtitle="전화 접수 후 현장 방문·진단·시공까지." />
          <ol className="mt-8 space-y-4">
            {["전화/간편상담 접수", "현장 방문 및 배관 상태 확인", "원인 파악 및 견적 안내", "시공 및 사용 안내"].map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-bold text-white">{i + 1}</span>
                <span className="text-[var(--navy-muted)]">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <SectionTitle title="작업 가능 사례" />
          <p className="mt-4 text-[var(--navy-muted)]">
            단독주택·아파트·상가 하수구 막힘, 공동 배관 막힘, 세면대·욕실·빨래방 배수 등 다양한 현장을 방문합니다.
          </p>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-slate-50 px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <SectionTitle title="자주 묻는 질문" />
          <ul className="mt-6 space-y-4">
            {[
              { q: "하수구 막힘 비용은 얼마 정도인가요?", a: "현장 상태·작업 범위에 따라 다릅니다. 방문 후 견적을 안내해 드립니다." },
              { q: "당일 출동 가능한가요?", a: "네. 연중무휴 출동 가능하며, 긴급한 경우 우선 배정해 드립니다." },
            ].map((item, i) => (
              <li key={i} className="rounded-lg border border-[var(--border)] bg-white p-4">
                <p className="font-semibold text-[var(--navy)]">{item.q}</p>
                <p className="mt-2 text-sm text-[var(--muted)]">{item.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[var(--muted)]">다른 서비스가 필요하시면</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Link href="/sink-clog" className="rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--navy)] hover:bg-cyan-100">싱크대막힘</Link>
            <Link href="/toilet-clog" className="rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--navy)] hover:bg-cyan-100">변기막힘</Link>
            <Link href="/odor-removal" className="rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--navy)] hover:bg-cyan-100">악취제거</Link>
            <Link href="/leak-detection" className="rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--navy)] hover:bg-cyan-100">누수탐지</Link>
          </div>
        </div>
      </section>
    </>
  );
}
