import { SectionTitle } from "@/components/SectionTitle";
import { ReviewCard } from "@/components/ReviewCard";
import { getPublishedReviews } from "@/app/actions/reviews";
import type { ReviewRow } from "@/types/database";

export const metadata = {
  title: "작업후기",
  description: "번개배관케어 고객 작업 후기·작업 사례입니다.",
};

export const revalidate = 0;

export default async function ReviewsPage() {
  const reviews: ReviewRow[] = await getPublishedReviews(50);

  return (
    <>
      <section className="border-b border-[var(--border)] bg-[var(--card-bg)] px-4 py-14 sm:py-18">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            title="작업 후기"
            subtitle="고객님들의 생생한 후기와 작업 사례를 소개합니다."
          />
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          {reviews.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-[var(--border)] bg-white py-16 text-center">
              <p className="text-[var(--muted)]">등록된 작업 후기가 없습니다.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
