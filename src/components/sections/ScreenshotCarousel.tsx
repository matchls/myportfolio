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
            <div
              className="overflow-hidden border-2 border-border"
              style={{ boxShadow: "3px 3px 0 var(--color-pixel-shadow)" }}
            >
              <Image
                src={src}
                alt={`${title} — screenshot ${index + 1}`}
                width={375}
                height={812}
                loading={index === 0 ? "eager" : "lazy"}
                unoptimized
                className="h-auto w-full"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => scrollByOne(-1)}
        aria-label="Screenshot précédent"
        className="absolute left-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center border-2 border-border bg-bg text-text-muted transition-all hover:border-accent hover:text-accent"
        style={{ boxShadow: "2px 2px 0 var(--color-pixel-shadow)" }}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </button>
      <button
        onClick={() => scrollByOne(1)}
        aria-label="Screenshot suivant"
        className="absolute right-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center border-2 border-border bg-bg text-text-muted transition-all hover:border-accent hover:text-accent"
        style={{ boxShadow: "2px 2px 0 var(--color-pixel-shadow)" }}
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
