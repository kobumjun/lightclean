import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { PopupNotice } from "@/components/PopupNotice";
import { siteConfig } from "@/lib/site-config";
import { getPublishedReviews } from "@/app/actions/reviews";

export default async function HomePage() {
  const reviews = await getPublishedReviews(6);

  return (
    <>
      <PopupNotice />

      {/* 히어로 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--navy)] via-[var(--navy-muted)] to-[var(--brand-dark)] px-4 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            배관·하수구·누수, 막힘 해결은
            <br />
            <span className="text-cyan-300">{siteConfig.brandName}</span>에 맡기세요
          </h1>
          <p className="mt-4 text-lg text-slate-200 sm:text-xl">
            연중무휴 24시간 출동. 빠른 현장 확인과 정확한 시공으로 신뢰를 드립니다.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`tel:${siteConfig.phoneTel}`}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--cta)] px-6 py-3.5 font-semibold text-white hover:bg-[var(--cta-hover)]"
            >
              <span>{siteConfig.phone}</span>
            </Link>
            <Link
              href={siteConfig.consultPath}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white px-6 py-3.5 font-semibold text-white hover:bg-white/10"
            >
              간편상담 신청
            </Link>
          </div>
        </div>
      </section>

      {/* 서비스 바로가기 */}
      <section className="border-b border-[var(--border)] bg-[var(--card-bg)] px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionTitle title="서비스 안내" subtitle="증상에 맞는 서비스를 선택해 주세요." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/drain-clog", label: "하수구막힘", desc: "역류·악취·배수 지연" },
              { href: "/sink-clog", label: "싱크대막힘", desc: "주방 배수·기름·음식물" },
              { href: "/toilet-clog", label: "변기막힘", desc: "급한 막힘·역류 대응" },
              { href: "/odor-removal", label: "악취제거", desc: "배관·트랩 냄새" },
              { href: "/leak-detection", label: "누수탐지", desc: "숨은 누수·점검" },
              { href: "/reviews", label: "작업후기", desc: "고객 후기·작업 사례" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col rounded-xl border border-[var(--border)] bg-white p-5 shadow-sm transition-all hover:border-[var(--brand)] hover:shadow-md"
              >
                <span className="font-semibold text-[var(--navy)] group-hover:text-[var(--brand)]">{item.label}</span>
                <span className="mt-1 text-sm text-[var(--muted)]">{item.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 출동 프로세스 */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionTitle title="출동·처리 프로세스" subtitle="전화 한 통이면 현장까지 빠르게 대응합니다." />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "연락", desc: "전화 또는 간편상담으로 접수" },
              { step: "02", title: "출동", desc: "현장 방문 및 원인 파악" },
              { step: "03", title: "견적", desc: "작업 범위·비용 안내" },
              { step: "04", title: "시공", desc: "작업 후 사용 안내" },
            ].map((item) => (
              <div key={item.step} className="relative rounded-xl bg-[var(--card-bg)] p-6 shadow-sm ring-1 ring-[var(--border)]">
                <span className="text-2xl font-bold text-[var(--brand)]/30">{item.step}</span>
                <h3 className="mt-2 font-semibold text-[var(--navy)]">{item.title}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 업체 강점 */}
      <section className="border-y border-[var(--border)] bg-[var(--accent-soft)]/50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionTitle title="왜 번개배관케어인가요?" subtitle="신뢰와 빠른 대응을 약속합니다." />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "연중무휴 24시간 출동으로 긴급 상황에도 빠르게 대응합니다.",
              "장비와 경험을 바탕으로 원인을 정확히 진단하고 시공합니다.",
              "작업 후 사용 방법과 관리 요령을 안내해 재발을 줄입니다.",
            ].map((text, i) => (
              <li key={i} className="flex gap-3 rounded-lg bg-white p-4 shadow-sm">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-bold text-white">{i + 1}</span>
                <span className="text-[var(--navy-muted)]">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 자주 발생하는 문제 */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionTitle title="자주 발생하는 문제" subtitle="이런 증상이 있으시면 연락 주세요." />
          <div className="mt-10 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card-bg)]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-slate-50">
                  <th className="px-4 py-3 font-semibold text-[var(--navy)]">증상</th>
                  <th className="px-4 py-3 font-semibold text-[var(--navy)]">대응 서비스</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["하수구 역류·악취·물 잘 안 내려감", "하수구막힘"],
                  ["싱크대 물 빠짐 느림·기름때·냄새", "싱크대막힘"],
                  ["변기 물 넘침·막힘·급한 상황", "변기막힘"],
                  ["배관·욕실·주방에서 냄새", "악취제거"],
                  ["천장·벽 누수·물기·습기", "누수탐지"],
                ].map(([symptom, service]) => (
                  <tr key={symptom} className="border-b border-[var(--border)] last:border-0">
                    <td className="px-4 py-3 text-[var(--navy-muted)]">{symptom}</td>
                    <td className="px-4 py-3 font-medium text-[var(--brand)]">{service}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 작업 가능 범위 */}
      <section className="border-t border-[var(--border)] bg-[var(--card-bg)] px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionTitle title="작업 가능 범위" subtitle="주거·상가·사무실 등 다양한 현장을 방문합니다." />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {["주택·아파트", "상가·음식점", "사무실", "빌라·원룸", "공장·창고"].map((item) => (
              <span
                key={item}
                className="rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--navy)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 고객 신뢰 요소 */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionTitle title="고객 신뢰 요소" subtitle="투명한 견적과 책임 시공을 원칙으로 합니다." />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { title: "사전 견적", desc: "현장 확인 후 작업 범위와 비용을 먼저 안내합니다." },
              { title: "정확한 원인 파악", desc: "단순 뚫기보다 원인 진단을 통해 재발을 줄입니다." },
              { title: "사후 관리", desc: "작업 후 사용 방법과 주의사항을 안내합니다." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-[var(--border)] bg-white p-6 text-center shadow-sm">
                <h3 className="font-semibold text-[var(--navy)]">{item.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 후기 미리보기 */}
      <section className="border-y border-[var(--border)] bg-slate-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionTitle title="작업 후기" subtitle="고객님들의 생생한 후기입니다." />
          {reviews.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r) => (
                <Link
                  key={r.id}
                  href={`/reviews/${r.slug}`}
                  className="group block overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm hover:shadow-md"
                >
                  <div className="aspect-video bg-slate-100">
                    {(r.thumbnail_url ?? r.image_urls?.[0]) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={r.thumbnail_url ?? r.image_urls?.[0]}
                        alt=""
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    ) : null}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[var(--navy)] line-clamp-1 group-hover:text-[var(--brand)]">{r.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-[var(--muted)]">{r.summary}</p>
                    <p className="mt-2 text-xs text-[var(--muted)]">
                      {new Date(r.created_at).toLocaleDateString("ko-KR")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-10 text-center text-[var(--muted)]">등록된 후기가 없습니다.</p>
          )}
          <div className="mt-10 text-center">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--brand)] px-6 py-2.5 font-semibold text-[var(--brand)] hover:bg-[var(--accent-soft)]"
            >
              작업후기 더 보기
            </Link>
          </div>
        </div>
      </section>

      {/* 간편상담 유도 배너 */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-[var(--brand)] to-[var(--accent)] px-6 py-12 text-center text-white sm:py-16">
          <h2 className="text-2xl font-bold sm:text-3xl">지금 바로 상담받으세요</h2>
          <p className="mt-2 text-white/90">이름·연락처·증상만 적어 주시면 빠르게 연락드립니다.</p>
          <Link
            href={siteConfig.consultPath}
            className="mt-6 inline-block rounded-full bg-white px-8 py-3 font-semibold text-[var(--brand)] hover:bg-slate-100"
          >
            간편상담 신청
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[var(--border)] bg-[var(--card-bg)] px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionTitle title="자주 묻는 질문" />
          <ul className="mt-10 space-y-4">
            {[
              { q: "출동 비용은 어떻게 되나요?", a: "현장 방문 후 증상과 작업 범위를 확인한 뒤 견적을 안내해 드립니다. 부담 없이 전화 주세요." },
              { q: "야간·주말에도 출동 가능한가요?", a: "네. 연중무휴 24시간 출동 가능합니다. 긴급한 경우에도 신속히 대응해 드립니다." },
              { q: "작업 후 보증이 있나요?", a: "작업 내용에 따라 보증 기간을 안내해 드립니다. 시공 품질에 책임을 지고 있습니다." },
            ].map((item, i) => (
              <li key={i} className="rounded-lg border border-[var(--border)] bg-white p-4">
                <p className="font-semibold text-[var(--navy)]">{item.q}</p>
                <p className="mt-2 text-sm text-[var(--muted)]">{item.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
