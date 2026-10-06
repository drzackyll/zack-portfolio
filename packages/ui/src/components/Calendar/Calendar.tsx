import * as React from "react";
import { IconButton } from "../IconButton/IconButton";
import { cn } from "../../lib/cn";

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
const addDays = (date: Date, days: number) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
const sameDay = (a: Date | null | undefined, b: Date | null | undefined) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const dayKey = (date: Date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

const formatDay = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" });
const formatMonth = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });
const formatWeekdayShort = new Intl.DateTimeFormat("en-US", { weekday: "short" });
const formatWeekdayLong = new Intl.DateTimeFormat("en-US", { weekday: "long" });

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Selected date. */
  value?: Date | null;
  onChange?: (date: Date) => void;
  /** Month shown first when there's no value. */
  defaultMonth?: Date;
  /** Return true to make a day unselectable. */
  isDateDisabled?: (date: Date) => boolean;
  /** Extra screen-reader text for enabled days, e.g. "4 times available". */
  getDayDescription?: (date: Date) => string;
  /** Marks today with a dot and `aria-current="date"`. @default new Date() */
  today?: Date;
  /** Earliest selectable day; also limits month navigation. */
  min?: Date;
  /** Latest selectable day; also limits month navigation. */
  max?: Date;
  /** 0 = Sunday, 1 = Monday. @default 1 */
  weekStartsOn?: 0 | 1;
}

/**
 * Month grid date picker (WAI-ARIA grid) with a roving tabindex.
 * ←/→ move a day, ↑/↓ a week, Home/End to the week's edges, PageUp/PageDown
 * a month. Disabled days stay focusable (`aria-disabled`) so keyboard users
 * can move past them. Each day is labelled, e.g. "Thursday, October 8, 4 times available".
 */
export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      value = null,
      onChange,
      defaultMonth,
      isDateDisabled,
      getDayDescription,
      today: todayProp,
      min,
      max,
      weekStartsOn = 1,
      className,
      ...rest
    },
    ref,
  ) => {
    const today = React.useMemo(() => todayProp ?? new Date(), [todayProp]);
    const [view, setView] = React.useState(() => startOfMonth(value ?? defaultMonth ?? today));
    const [focusDate, setFocusDate] = React.useState(() => startOfDay(value ?? today));
    const dayRefs = React.useRef(new Map<string, HTMLButtonElement>());
    const pendingFocus = React.useRef(false);
    const headingId = React.useId();

    const lo = min && startOfDay(min);
    const hi = max && startOfDay(max);
    const clamp = (date: Date) => (lo && date < lo ? lo : hi && date > hi ? hi : date);
    const weekday = (date: Date) => (date.getDay() - weekStartsOn + 7) % 7;
    const inView = (date: Date | null | undefined) =>
      !!date && date.getMonth() === view.getMonth() && date.getFullYear() === view.getFullYear();

    const moveTo = (target: Date) => {
      const date = clamp(target);
      setFocusDate(date);
      if (!inView(date)) setView(startOfMonth(date));
      pendingFocus.current = true;
    };

    React.useEffect(() => {
      if (!pendingFocus.current) return;
      pendingFocus.current = false;
      dayRefs.current.get(dayKey(focusDate))?.focus();
    });

    const onKeyDown = (event: React.KeyboardEvent) => {
      const f = focusDate;
      const targets: Record<string, Date> = {
        ArrowLeft: addDays(f, -1),
        ArrowRight: addDays(f, 1),
        ArrowUp: addDays(f, -7),
        ArrowDown: addDays(f, 7),
        Home: addDays(f, -weekday(f)),
        End: addDays(f, 6 - weekday(f)),
        PageUp: new Date(f.getFullYear(), f.getMonth() - 1, Math.min(f.getDate(), 28)),
        PageDown: new Date(f.getFullYear(), f.getMonth() + 1, Math.min(f.getDate(), 28)),
      };
      const target = targets[event.key];
      if (target) {
        event.preventDefault();
        moveTo(target);
      }
    };

    const canPrev = !lo || view > startOfMonth(lo);
    const canNext = !hi || view < startOfMonth(hi);
    const shiftMonth = (months: number) => setView(new Date(view.getFullYear(), view.getMonth() + months, 1));

    const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const cells: Array<Date | null> = [
      ...Array<null>(weekday(view)).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1)),
    ];
    while (cells.length % 7) cells.push(null);
    const weeks: Array<Array<Date | null>> = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

    const tabDate = inView(focusDate) ? focusDate : inView(value) ? value! : view;
    // 7 Jan 2024 was a Sunday; offset from it to get the column headers.
    const columnDays = Array.from({ length: 7 }, (_, i) => addDays(new Date(2024, 0, 7), weekStartsOn + i));

    return (
      <div ref={ref} className={cn("min-w-0", className)} {...rest}>
        <div className="mb-3 flex items-center gap-0.5">
          <h3 id={headingId} aria-live="polite" className="m-0 flex-1 font-sans text-heading-sm font-semibold text-strong">
            {formatMonth.format(view)}
          </h3>
          <IconButton icon="chevron-left" label="Previous month" size="sm" disabled={!canPrev} onClick={() => shiftMonth(-1)} />
          <IconButton icon="chevron-right" label="Next month" size="sm" disabled={!canNext} onClick={() => shiftMonth(1)} />
        </div>
        <table
          role="grid"
          aria-labelledby={headingId}
          onKeyDown={onKeyDown}
          className="-m-1 w-[calc(100%+8px)] table-fixed border-separate border-spacing-1"
        >
          <thead>
            <tr>
              {columnDays.map((date) => (
                <th
                  key={date.getDay()}
                  scope="col"
                  abbr={formatWeekdayLong.format(date)}
                  className="pb-1.5 font-sans text-overline font-medium uppercase tracking-[.06em] text-muted"
                >
                  {formatWeekdayShort.format(date)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((date, dayIndex) => {
                  if (!date) return <td key={dayIndex} />;
                  const outOfRange = (lo && date < lo) || (hi && date > hi);
                  const disabled = Boolean(outOfRange || isDateDisabled?.(date));
                  const selected = sameDay(date, value);
                  const isToday = sameDay(date, today);
                  const description = !disabled && getDayDescription ? getDayDescription(date) : "";
                  const label =
                    formatDay.format(date) +
                    (isToday ? ", today" : "") +
                    (disabled ? ", unavailable" : description ? `, ${description}` : "");
                  return (
                    <td key={dayIndex} role="gridcell" aria-selected={selected}>
                      <button
                        ref={(element) => {
                          if (element) dayRefs.current.set(dayKey(date), element);
                          else dayRefs.current.delete(dayKey(date));
                        }}
                        type="button"
                        tabIndex={sameDay(date, tabDate) ? 0 : -1}
                        aria-disabled={disabled || undefined}
                        aria-current={isToday ? "date" : undefined}
                        aria-label={label}
                        onFocus={() => setFocusDate(date)}
                        onClick={() => {
                          if (disabled) return;
                          setFocusDate(date);
                          onChange?.(date);
                        }}
                        className={cn(
                          "focus-ring relative aspect-square max-h-11 w-full rounded-md border-0 p-0 font-sans text-ui leading-none",
                          selected
                            ? "bg-accent font-semibold text-on-accent"
                            : disabled
                              ? "cursor-default bg-transparent font-normal text-subtle"
                              : "cursor-pointer bg-accent-soft font-semibold text-accent-text",
                        )}
                      >
                        {date.getDate()}
                        {isToday && (
                          <span
                            aria-hidden="true"
                            className={cn(
                              "absolute bottom-[5px] left-1/2 -ml-0.5 h-1 w-1 rounded-full",
                              selected ? "bg-on-accent" : "bg-accent",
                            )}
                          />
                        )}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
);
Calendar.displayName = "Calendar";
