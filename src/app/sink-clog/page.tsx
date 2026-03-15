import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "싱크대막힘",
  description: "주방 싱크대 배수 막힘, 기름때·음식물 찌꺼기 해결. 번개배관케어.",
};

export default function SinkClogPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--card-bg)] px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">주방</span>
          <h1 className="mt-4 text-3xl font-bold text-[var(--navy)] sm:text-4xl">싱크대 막힘 해결</h1>
          <p className="mt-4 text-lg text-[var(--muted)]">
            음식물·기름때·찌꺼기로 인한 주방 배수 불량. 빠른 출동으로 일상 불편을 해소해 드립니다.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a href={`tel:${siteConfig.phoneTel}`} className="rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white hover:bg-amber-600">
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
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-[var(--navy)]">주방에서 자주 겪는 증상</h2>
              <ul className="mt-4 space-y-3 text-[var(--navy-muted)]">
                <li>· 물이 천천히 빠지거나 잘 안 빠짐</li>
                <li>· 배수구에서 냄새가 남</li>
                <li>· 기름때·찌꺼기가 배관에 쌓인 느낌</li>
                <li>· 싱크대 사용 시 물이 넘침</li>
              </ul>
            </div>
            <div className="rounded-xl bg-amber-50 p-6">
              <h3 className="font-semibold text-[var(--navy)]">왜 막히나요?</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                기름·음식물 찌꺼기가 배관 내벽에 붙어 굵기가 좁아지거나, S자 트랩·배관 구간에 이물이 쌓이면서 발생합니다. 주방 사용이 잦을수록 관리가 필요합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-slate-50 px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <SectionTitle title="방치하면 안 되는 이유" />
          <p className="mx-auto mt-6 max-w-2xl text-center text-[var(--navy-muted)]">
            배수 불량이 길어지면 악취·세균 번식·주방 사용 불가에 이어, 하자 구간이 넓어져 비용이 늘어날 수 있습니다.
          </p>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-bold text-[var(--navy)]">해결 과정</h2>
          <div className="mt-8 flex flex-wrap gap-6">
            {[
              { n: "1", t: "접수" },
              { n: "2", t: "출동·진단" },
              { n: "3", t: "견적·시공" },
              { n: "4", t: "사용 안내" },
            ].map(({ n, t }) => (
              <div key={n} className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">{n}</span>
                <span className="text-[var(--navy-muted)]">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--card-bg)] px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <SectionTitle title="작업 가능한 현장" subtitle="주택·상가·사무실 주방 배수." />
          <p className="mt-4 text-[var(--navy-muted)]">
            일반 주택, 아파트, 빌라, 음식점·카페 주방, 사무실 팬션 등 싱크대 배수 관련 작업을 진행합니다.
          </p>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <SectionTitle title="FAQ" />
          <ul className="mt-6 space-y-3">
            {[
              { q: "비용은 어떻게 되나요?", a: "현장 확인 후 작업 범위에 따라 견적을 안내해 드립니다." },
              { q: "당일 출동 가능한가요?", a: "네. 연중무휴 출동 가능합니다." },
            ].map((item, i) => (
              <li key={i} className="rounded-lg border border-[var(--border)] p-4">
                <p className="font-semibold text-[var(--navy)]">{item.q}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{item.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-[var(--border)] px-4 py-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm text-[var(--muted)]">다른 서비스</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <Link href="/drain-clog" className="text-sm font-medium text-[var(--brand)] hover:underline">하수구막힘</Link>
            <Link href="/toilet-clog" className="text-sm font-medium text-[var(--brand)] hover:underline">변기막힘</Link>
            <Link href="/odor-removal" className="text-sm font-medium text-[var(--brand)] hover:underline">악취제거</Link>
            <Link href="/leak-detection" className="text-sm font-medium text-[var(--brand)] hover:underline">누수탐지</Link>
          </div>
        </div>
      </section>
    </>
  );
}
