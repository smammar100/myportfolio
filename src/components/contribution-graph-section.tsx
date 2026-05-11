import { SectionHeading } from "@/components/section-heading";

const WEEKS = 53;
const DAYS = 7;

function pseudoLevel(week: number, day: number): 0 | 1 | 2 | 3 | 4 {
  const seed = (week * 7 + day) * 9301 + 49297;
  const rnd = (seed % 233280) / 233280;
  if (rnd < 0.42) return 0;
  if (rnd < 0.66) return 1;
  if (rnd < 0.84) return 2;
  if (rnd < 0.95) return 3;
  return 4;
}

function pseudoCount(week: number, day: number, level: number): number {
  if (level === 0) return 0;
  const seed = (week * 7 + day + 1) * 7919;
  const base = Math.abs(seed % (level * 5)) + level * 2;
  return base;
}

const LEVEL_CLASSES: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-muted",
  1: "bg-emerald-200 dark:bg-emerald-900/60",
  2: "bg-emerald-400 dark:bg-emerald-700",
  3: "bg-emerald-600 dark:bg-emerald-500",
  4: "bg-emerald-700 dark:bg-emerald-400",
};

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function ContributionGraphSection() {
  const today = new Date("2025-11-11T00:00:00Z");
  const startDay = today.getUTCDay();
  const totalDays = WEEKS * DAYS;
  const oldest = new Date(today);
  oldest.setUTCDate(today.getUTCDate() - (totalDays - 1 - (DAYS - 1 - startDay)));

  return (
    <section className="py-12">
      <SectionHeading title="Contribution Graph" />
      <div className="overflow-x-auto rounded-xl border border-border bg-card p-4 sm:p-6">
        <div
          className="grid w-full gap-[3px]"
          style={{
            gridTemplateColumns: `repeat(${WEEKS}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${DAYS}, 1fr)`,
            gridAutoFlow: "column",
          }}
        >
          {Array.from({ length: WEEKS * DAYS }).map((_, idx) => {
            const week = Math.floor(idx / DAYS);
            const day = idx % DAYS;
            const level = pseudoLevel(week, day);
            const count = pseudoCount(week, day, level);
            const date = new Date(oldest);
            date.setUTCDate(oldest.getUTCDate() + week * 7 + day);
            const dateStr = formatDate(date);
            return (
              <div
                key={idx}
                title={
                  level === 0
                    ? `No contributions on ${dateStr}`
                    : `${count} contribution${count === 1 ? "" : "s"} on ${dateStr}`
                }
                className={`aspect-square rounded-[3px] ${LEVEL_CLASSES[level]}`}
              />
            );
          })}
        </div>
        <div className="mt-4 flex items-center justify-end gap-2 text-xs text-muted-foreground">
          <span>Less</span>
          {([0, 1, 2, 3, 4] as const).map((l) => (
            <span
              key={l}
              className={`size-2.5 rounded-[3px] ${LEVEL_CLASSES[l]}`}
              aria-hidden
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </section>
  );
}
