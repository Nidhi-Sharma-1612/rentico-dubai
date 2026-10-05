"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { ListingReview } from "@/lib/guesty/bookingApi";

const INITIAL_COUNT = 5;

export default function PropertyReviews({ reviews }: { reviews: ListingReview[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? reviews : reviews.slice(0, INITIAL_COUNT);
  const remaining = reviews.length - INITIAL_COUNT;

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-4">
        {visible.map((review) => (
          <li key={review.id} className="flex flex-col gap-3 rounded-2xl border border-navy-900/8 bg-white p-5">
            <div className="flex items-center justify-between text-xs text-navy-900/50">
              <span className="flex items-center gap-0.5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
                ))}
              </span>
              <time dateTime={review.date}>
                {new Date(review.date).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
              </time>
            </div>
            <p className="text-sm leading-relaxed text-navy-900/70">{review.text}</p>
          </li>
        ))}
      </ul>

      {remaining > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="self-center rounded-full border border-navy-900/15 px-5 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:border-orange-300 hover:text-orange-600"
        >
          {expanded ? "Show less reviews" : `Show more reviews (${remaining} remaining)`}
        </button>
      )}
    </div>
  );
}
