import type {
  ContributionCalendar,
  ContributionLevel,
} from "@/types/portfolio";

// Monochrome ramp keyed off `--foreground` (black in light mode, white in
// dark mode), so the same classes invert with the theme automatically:
// shades of black on light, shades of white on dark — matching the site.
const LEVEL_CLASSES: Record<ContributionLevel, string> = {
  0: "bg-foreground/[0.06]",
  1: "bg-foreground/20",
  2: "bg-foreground/40",
  3: "bg-foreground/65",
  4: "bg-foreground",
};

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function weekday(iso: string): number {
  return new Date(`${iso}T00:00:00Z`).getUTCDay();
}

export function ContributionGraph({
  calendar,
}: {
  calendar: ContributionCalendar;
}) {
  const weekCount = calendar.weeks.length;

  return (
    <div className="overflow-x-auto rounded-xl bg-surface-2 shadow-surface-2 p-4 sm:p-6">
      <div
        className="grid w-full gap-[3px]"
        style={{
          gridTemplateColumns: `repeat(${weekCount}, minmax(0, 1fr))`,
          gridTemplateRows: "repeat(7, 1fr)",
        }}
      >
        {calendar.weeks.map((week, weekIndex) =>
          week.days.map((day) => (
            <div
              key={day.date}
              title={
                day.level === 0
                  ? `No contributions on ${formatDate(day.date)}`
                  : `${day.count} contribution${
                      day.count === 1 ? "" : "s"
                    } on ${formatDate(day.date)}`
              }
              className={`aspect-square rounded-[3px] ${LEVEL_CLASSES[day.level]}`}
              style={{
                gridColumnStart: weekIndex + 1,
                gridRowStart: weekday(day.date) + 1,
              }}
            />
          ))
        )}
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
  );
}
