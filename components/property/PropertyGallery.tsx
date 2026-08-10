"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/shared/Container";

export default function PropertyGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: direction * 360, behavior: "smooth" });
  };

  return (
    <section className="bg-navy-50/40 py-8 sm:py-10">
      <Container>
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {images.map((src, i) => (
              <div
                key={src + i}
                className="relative h-44 w-64 shrink-0 snap-start overflow-hidden rounded-2xl sm:h-56 sm:w-80"
              >
                <Image
                  src={src}
                  alt={`${name} — photo ${i + 1}`}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Scroll gallery left"
            className="absolute left-0 top-1/2 hidden h-10 w-10 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy-900 shadow-lg transition-colors hover:bg-orange-50 sm:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Scroll gallery right"
            className="absolute right-0 top-1/2 hidden h-10 w-10 -translate-y-1/2 translate-x-4 items-center justify-center rounded-full bg-white text-navy-900 shadow-lg transition-colors hover:bg-orange-50 sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </Container>
    </section>
  );
}
