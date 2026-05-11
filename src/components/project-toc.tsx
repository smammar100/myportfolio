"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  title: string;
}

interface ProjectTocProps {
  items: TocItem[];
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      {...props}
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function ChevronUpDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m7 15 5 5 5-5M7 9l5-5 5 5" />
    </svg>
  );
}

export function ProjectToc({ items }: ProjectTocProps) {
  const [activeId, setActiveId] = React.useState<string | null>(
    items[0]?.id ?? null
  );
  const [progress, setProgress] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  React.useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const pct =
        total > 0 ? Math.min(100, Math.max(0, (h.scrollTop / total) * 100)) : 0;
      setProgress(Math.round(pct));
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const activeItem = items.find((i) => i.id === activeId) ?? items[0];

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 left-1/2 z-50 w-[min(20rem,calc(100vw-2rem))] -translate-x-1/2"
    >
      <div className="overflow-hidden rounded-2xl bg-neutral-900 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur dark:bg-neutral-900">
        {open ? (
          <ul className="max-h-72 overflow-y-auto border-b border-white/10 py-1.5">
            {items.map((item) => {
              const isActive = item.id === activeId;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block px-4 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-white/[0.07] font-medium text-white"
                        : "text-white/55 hover:bg-white/[0.04] hover:text-white"
                    )}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        ) : null}

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle table of contents"
          className="flex w-full items-center gap-3 px-3 py-2.5 transition-colors hover:bg-white/[0.04]"
        >
          <MenuIcon className="size-4 shrink-0 text-white/60" />
          <span className="flex-1 truncate text-left text-sm font-medium text-white">
            {activeItem?.title ?? "Contents"}
          </span>
          <ChevronUpDownIcon className="size-4 shrink-0 text-white/60" />
          <span className="shrink-0 rounded-md bg-emerald-400 px-2 py-0.5 text-xs font-semibold tabular-nums text-emerald-950 tracking-tight">
            {progress}%
          </span>
        </button>
      </div>
    </div>
  );
}
