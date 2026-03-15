import Link from "next/link";
import type { ReviewRow } from "@/types/database";

interface ReviewCardProps {
  review: ReviewRow;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const thumb = review.thumbnail_url || (Array.isArray(review.image_urls) && review.image_urls[0]) || null;
  const date = new Date(review.created_at).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={`/reviews/${review.slug}`}
      className="group block overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card-bg)] shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
        {thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt=""
            className="size-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-[var(--muted)]">
            <svg className="size-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
            </svg>
          </div>
        )}
        {review.service_type && (
          <span className="absolute left-2 top-2 rounded bg-[var(--navy)]/80 px-2 py-0.5 text-xs text-white">
            {review.service_type}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-[var(--navy)] line-clamp-2 group-hover:text-[var(--brand)]">
          {review.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-[var(--muted)]">{review.summary}</p>
        <p className="mt-2 text-xs text-[var(--muted)]">{date}</p>
      </div>
    </Link>
  );
}
