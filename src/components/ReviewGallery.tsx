"use client";

import { useState } from "react";

interface ReviewGalleryProps {
  imageUrls: string[];
  title: string;
}

export function ReviewGallery({ imageUrls, title }: ReviewGalleryProps) {
  const [current, setCurrent] = useState(0);
  const list = Array.isArray(imageUrls) && imageUrls.length > 0 ? imageUrls : [];

  if (list.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={list[current]}
          alt={`${title} - ${current + 1}`}
          className="size-full object-contain"
        />
      </div>
      {list.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {list.map((url, i) => (
            <button
              key={url}
              type="button"
              onClick={() => setCurrent(i)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 ${
                i === current ? "border-[var(--brand)]" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
