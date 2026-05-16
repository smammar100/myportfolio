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

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Row 1 of the grid is the month header; rows 2–8 are Sun…Sat. Only
// Mon/Wed/Fri get a label (like GitHub) to avoid clutter.
const WEEKDAY_LABELS: Record<number, string> = { 1: "Mon", 3: "Wed", 5: "Fri" };

function utcDate(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`);
}

function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] ?? s[v] ?? s[0]}`;
}

/** GitHub-style label: "10 contributions on May 11th." */
function dayLabel(iso: string, count: number): string {
  const d = utcDate(iso);
  const month = d.toLocaleDateString("en-US", {
    month: "long",
    timeZone: "UTC",
  });
  const date = `${month} ${ordinal(d.getUTCDate())}`;
  if (count === 0) return `No contributions on ${date}.`;
  return `${count} contribution${count === 1 ? "" : "s"} on ${date}.`;
}

export function ContributionGraph({
  calendar,
}: {
  calendar: ContributionCalendar;
}) {
  const weekCount = calendar.weeks.length;

  // A month label sits above the first week whose leading day rolls into
  // a new month (GitHub's approach). Grid column is offset by 2: column 1
  // is the weekday-label gutter, so week i lives in column i + 2.
  const monthLabels: { col: number; label: string }[] = [];
  let prevMonth = -1;
  calendar.weeks.forEach((week, i) => {
    const first = week.days[0];
    if (!first) return;
    const m = utcDate(first.date).getUTCMonth();
    if (m !== prevMonth) {
      monthLabels.push({ col: i + 2, label: MONTHS[m] });
      prevMonth = m;
    }
  });

  return (
    <div className="rounded-xl bg-surface-2 shadow-surface-2 p-4 sm:p-6">
      <div
        className="grid w-full gap-[3px]"
        style={{
          gridTemplateColumns: `auto repeat(${weekCount}, minmax(0, 1fr))`,
          gridTemplateRows: "auto repeat(7, 1fr)",
        }}
      >
        {/* Month labels — grid row 1 */}
        {monthLabels.map(({ col, label }) => (
          <span
            key={`${label}-${col}`}
            className="select-none whitespace-nowrap text-xs leading-none text-muted-foreground"
            style={{ gridRow: 1, gridColumnStart: col }}
            aria-hidden
          >
            {label}
          </span>
        ))}

        {/* Weekday labels — grid column 1 (Mon / Wed / Fri) */}
        {Object.entries(WEEKDAY_LABELS).map(([weekday, label]) => (
          <span
            key={label}
            className="select-none self-center justify-self-end pr-2 text-xs leading-none text-muted-foreground"
            style={{ gridColumn: 1, gridRowStart: Number(weekday) + 2 }}
            aria-hidden
          >
            {label}
          </span>
        ))}

        {/* Day cells */}
        {calendar.weeks.map((week, weekIndex) =>
          week.days.map((day) => {
            const label = dayLabel(day.date, day.count);
            return (
              <div
                key={day.date}
                className="group/day relative"
                style={{
                  gridColumnStart: weekIndex + 2,
                  gridRowStart: utcDate(day.date).getUTCDay() + 2,
                }}
              >
                <div
                  tabIndex={0}
                  aria-label={label}
                  className={`aspect-square rounded-[3px] outline-none ring-foreground/40 focus-visible:ring-2 ${LEVEL_CLASSES[day.level]}`}
                />
                {/* CSS-only tooltip — works even though the site hides the
                    native cursor (which suppresses the browser's `title`
                    tooltip). Inverted surface like the project TOC popover:
                    black box on light, white box on dark. Quick fade with a
                    short hover-intent delay; instant on the way out. */}
                <span
                  role="tooltip"
                  className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground opacity-0 shadow-lg transition-opacity duration-100 ease-in after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:border-[5px] after:border-transparent after:border-t-primary after:content-[''] group-hover/day:opacity-100 group-hover/day:delay-300 group-focus-within/day:opacity-100"
                >
                  {label}
                </span>
              </div>
            );
          })
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
