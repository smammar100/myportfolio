"use client";

import * as React from "react";
import type { Tune } from "@/lib/about-data";

interface TunesGridProps {
  tunes: Tune[];
}

export function TunesGrid({ tunes }: TunesGridProps) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  return (
    <ul className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6">
      {tunes.map((tune, idx) => {
        const isHovered = hovered === idx;
        return (
          <li
            key={tune.title}
            className="relative flex flex-col items-center"
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(idx)}
            onBlur={() => setHovered(null)}
            tabIndex={0}
          >
            <div className="relative aspect-square w-full">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full transition-transform duration-500 ease-out"
                style={{
                  background: `radial-gradient(circle at center, ${tune.vinylColor} 0%, ${tune.vinylColor} 18%, #0a0a0a 19%, #1a1a1a 30%, #0a0a0a 45%, #1a1a1a 60%, #0a0a0a 80%)`,
                  transform: isHovered
                    ? "translateY(-45%) rotate(45deg)"
                    : "translateY(0) rotate(0deg)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                }}
              >
                <span
                  className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ background: "var(--background)" }}
                />
              </div>
              <div
                className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-black/10 shadow-lg"
                style={{ background: tune.gradient }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_50%)]" />
              </div>
            </div>
            <div
              className="pointer-events-none mt-3 rounded-lg bg-neutral-900 px-3 py-1.5 text-center text-white shadow-lg ring-1 ring-white/10 transition-opacity duration-200"
              style={{ opacity: isHovered ? 1 : 0 }}
            >
              <p className="text-xs font-semibold tracking-wide uppercase">
                {tune.title}
              </p>
              <p className="text-[11px] text-white/60">{tune.artist}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
