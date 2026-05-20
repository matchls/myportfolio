"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  screenshots: readonly string[];
  title: string;
};

export function ScreenshotCarousel({ screenshots, title }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByOne(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const itemWidth = track.firstElementChild?.clientWidth ?? 0;
    track.scrollBy({ left: direction * itemWidth, behavior: "smooth" });
  }

  return (
    <div className="relative my-4">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
        aria-label={`Screenshots de ${title}`}
      >
        {screenshots.map((src, index) => (
          <div key={src} className="ml-2 shrink-0 snap-start" style={{ width: "min(180px, 48%)" }}>
            <Image
              src={src}
              alt={`${title} — screenshot ${index + 1}`}
              width={375}
              height={812}
              loading={index === 0 ? "eager" : "lazy"}
              unoptimized
              className="h-auto w-full rounded-md"
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => scrollByOne(-1)}
        aria-label="Screenshot précédent"
        className="border-border/70 bg-bg/80 text-text-muted hover:text-accent absolute top-1/2 left-1.5 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full border backdrop-blur-sm transition-colors"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </button>
      <button
        onClick={() => scrollByOne(1)}
        aria-label="Screenshot suivant"
        className="border-border/70 bg-bg/80 text-text-muted hover:text-accent absolute top-1/2 right-1.5 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full border backdrop-blur-sm transition-colors"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
