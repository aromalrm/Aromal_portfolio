"use client";

import { useMemo, useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface ContributionDay {
  date: Date;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionResponse {
  total: number;
  days: { date: string; count: number; level: number }[];
}

// Deterministic seeded RNG so server & client render identically (no hydration mismatch)
function seededContributions(): ContributionDay[] {
  const days: ContributionDay[] = [];
  const today = new Date();
  const start = new Date(today);
  start.setFullYear(start.getFullYear() - 1);
  start.setDate(start.getDate() - start.getDay());

  let s = 54321;
  const rng = () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 4294967296;
  };

  for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
    const weekend = d.getDay() === 0 || d.getDay() === 6;
    const p = weekend ? 0.3 : 0.65;
    let count = 0;
    if (rng() < p) {
      const r = rng();
      if (r < 0.3) count = Math.floor(rng() * 3) + 1;
      else if (r < 0.6) count = Math.floor(rng() * 5) + 3;
      else if (r < 0.85) count = Math.floor(rng() * 8) + 6;
      else count = Math.floor(rng() * 15) + 10;
    }
    const level =
      count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 9 ? 3 : 4;
    days.push({ date: new Date(d), count, level: level as 0 | 1 | 2 | 3 | 4 });
  }
  return days;
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const DARK = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
const LIGHT = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

export function ContributionGraph() {
  const fallbackDays = useMemo(() => seededContributions(), []);
  const [days, setDays] = useState(fallbackDays);
  const [total, setTotal] = useState(() =>
    fallbackDays.reduce((sum, day) => sum + day.count, 0),
  );

  useEffect(() => {
    fetch("/api/github-contributions")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: ContributionResponse | null) => {
        if (!data?.days?.length) return;
        setDays(
          data.days.map((day) => ({
            date: new Date(`${day.date}T00:00:00`),
            count: day.count,
            level: Math.min(day.level, 4) as 0 | 1 | 2 | 3 | 4,
          })),
        );
        setTotal(data.total);
      })
      .catch(() => undefined);
  }, []);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const palette = !mounted || resolvedTheme === "dark" ? DARK : LIGHT;

  const yearRange = `${days[0]?.date.getFullYear()}–${String(
    days[days.length - 1]?.date.getFullYear(),
  ).slice(2)}`;

  const weeks: ContributionDay[][] = [];
  let cur: ContributionDay[] = [];
  days.forEach((day, i) => {
    cur.push(day);
    if (cur.length === 7 || i === days.length - 1) {
      weeks.push(cur);
      cur = [];
    }
  });

  const monthLabels: { label: string; weekIndex: number }[] = [];
  weeks.forEach((week, wi) => {
    const first = week[0];
    if (first && (wi === 0 || first.date.getDate() <= 7)) {
      const m = MONTHS[first.date.getMonth()];
      if (!monthLabels.length || monthLabels[monthLabels.length - 1].label !== m)
        monthLabels.push({ label: m, weekIndex: wi });
    }
  });

  return (
    <section
      className="px-5 py-5 flex flex-col items-center"
      aria-label="Contribution activity"
    >
      <p className="text-[11.5px] font-semibold text-foreground mb-3 text-center">
        {total.toLocaleString()} contributions{" "}
        <span className="text-muted-foreground font-normal">· {yearRange}</span>
      </p>

      <div className="overflow-x-auto max-w-full scrollbar-hide">
        <div className="min-w-max mx-auto">
          {/* Month labels */}
          <div className="flex gap-[2px] mb-0.5">
            {weeks.map((_, wi) => {
              const lbl = monthLabels.find((m) => m.weekIndex === wi);
              return (
                <div key={wi} className="w-[9px] shrink-0">
                  {lbl && (
                    <span className="text-[8px] text-muted-foreground">
                      {lbl.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Grid */}
          <div className="flex gap-[2px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[2px]">
                {week.map((day, di) => (
                  <div
                    key={di}
                    className="w-[9px] h-[9px] rounded-[1px] shrink-0"
                    style={{ backgroundColor: palette[day.level] }}
                    title={`${day.count} contribution${day.count !== 1 ? "s" : ""} on ${day.date.toLocaleDateString()}`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-[3px] mt-1.5 justify-end">
            <span className="text-[8px] text-muted-foreground">Less</span>
            {[0, 1, 2, 3, 4].map((l) => (
              <span
                key={l}
                className="w-[9px] h-[9px] rounded-[1px]"
                style={{ backgroundColor: palette[l] }}
              />
            ))}
            <span className="text-[8px] text-muted-foreground">More</span>
          </div>
        </div>
      </div>
    </section>
  );
}
