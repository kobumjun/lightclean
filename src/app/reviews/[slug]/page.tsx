import { notFound } from "next/navigation";
import Link from "next/link";
import { getReviewBySlug } from "@/app/actions/reviews";
import { ReviewGallery } from "@/components/ReviewGallery";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 0;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (!slug?.trim()) return { title: "후기 없음" };
  const review = await getReviewBySlug(slug);
  if (!review) return { title: "후기 없음" };
  return {
    title: review.title,
    description: review.summary,
  };
}

export default async function ReviewDetailPage({ params }: Props) {
  const { slug } = await params;
  console.log("[ReviewDetailPage] params.slug=", slug);
  if (!slug || typeof slug !== "string" || !slug.trim()) notFound();
  const review = await getReviewBySlug(slug);
  if (!review) notFound();

  const date = new Date(review.created_at).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const imageUrls = Array.isArray(review.image_urls) ? review.image_urls : [];

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <header>
          {review.service_type && (
            <span className="rounded bg-[var(--brand)]/10 px-2 py-0.5 text-sm font-medium text-[var(--brand)]">
              {review.service_type}
            </span>
          )}
          <h1 className="mt-3 text-2xl font-bold text-[var(--navy)] sm:text-3xl">
            {review.title}
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">{date}</p>
          {review.location_text && (
            <p className="mt-1 text-sm text-[var(--muted)]">작업 지역: {review.location_text}</p>
          )}
        </header>

        <div className="mt-8">
          <ReviewGallery imageUrls={imageUrls} title={review.title} />
        </div>

        <div className="prose prose-slate mt-8 max-w-none">
          <div className="whitespace-pre-wrap text-[var(--navy-muted)]">{review.content}</div>
        </div>

        <footer className="mt-12 border-t border-[var(--border)] pt-8">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-[var(--brand)] hover:underline"
          >
            ← 작업후기 목록
          </Link>
        </footer>
      </article>

      <section className="border-t border-[var(--border)] bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[var(--muted)]">상담이 필요하시면 연락 주세요.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <a href={`tel:${siteConfig.phoneTel}`} className="font-semibold text-[var(--brand)] hover:underline">
              {siteConfig.phone}
            </a>
            <Link href={siteConfig.consultPath} className="font-semibold text-[var(--brand)] hover:underline">
              간편상담
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
