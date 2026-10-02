"use client";

import * as React from "react";
import { Badge, Button, Input, Tabs, Tag } from "@zyne/ui";
import { cn } from "@zyne/ui/src/lib/cn";
import {
  drivers,
  driverRows,
  laneFor,
  loadCandidates,
  loads,
  type Candidate,
  type DriverId,
} from "@/content/dispatch";

type Mode = "loads" | "drivers";
type Assignment = { d: string; override: boolean };
type AssignedState = Record<Mode, Record<string, Assignment>>;

const LOAD_REASONS = ["Driver preference", "Customer request", "Equipment", "Hours of service"];
const DRIVER_REASONS = ["Driver preference", "Home time", "Equipment", "Hours of service"];

const LOADS_GRID = "grid-cols-[96px_84px_120px_minmax(0,1fr)_120px_minmax(0,1fr)_44px_minmax(0,1.1fr)_52px]";
const DRIVERS_GRID = "grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)_90px_96px_minmax(0,1.5fr)_52px]";

interface CandidateRowView {
  key: string;
  name: string;
  meta: string;
  score: string;
  selected: boolean;
}

function CandidateListRow({ row, onPick }: { row: CandidateRowView; onPick: (key: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onPick(row.key)}
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors duration-150 hover:bg-surface-hover",
        row.selected ? "border-[var(--plum-200)] bg-[var(--plum-50)]" : "border-border-subtle bg-surface-card",
      )}
    >
      <span className="flex flex-col gap-0.5">
        <span className="font-sans text-sm font-semibold text-strong">{row.name}</span>
        <span className="font-sans text-xs text-muted">{row.meta}</span>
      </span>
      <span className="font-mono text-[13px] text-[var(--secondary)]">{row.score}</span>
    </button>
  );
}

export function DispatchDemo() {
  const [mode, setMode] = React.useState<Mode>("loads");
  const [openId, setOpenId] = React.useState<string | null>(null);
  const [pickKey, setPickKey] = React.useState<string | null>(null);
  const [reason, setReason] = React.useState<string | null>(null);
  const [explain, setExplain] = React.useState<"idle" | "loading" | "done">("idle");
  const [query, setQuery] = React.useState("");
  const [assigned, setAssigned] = React.useState<AssignedState>({ loads: {}, drivers: {} });

  const panelRef = React.useRef<HTMLDivElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const lastRowButtonRef = React.useRef<HTMLButtonElement | null>(null);

  const isLoads = mode === "loads";
  const assignedForMode = assigned[mode];

  const resetPanelState = () => {
    setPickKey(null);
    setReason(null);
    setExplain("idle");
    setQuery("");
  };

  const openRow = (id: string, triggerEl: HTMLButtonElement) => {
    lastRowButtonRef.current = triggerEl;
    setOpenId(id);
    resetPanelState();
  };

  const closePanel = React.useCallback(() => {
    setOpenId(null);
    lastRowButtonRef.current?.focus();
  }, []);

  const changeMode = (next: string) => {
    setMode(next as Mode);
    setOpenId(null);
    resetPanelState();
  };

  const pickCandidate = (key: string) => {
    setPickKey(key);
    setReason(null);
    setExplain("idle");
  };

  const runExplain = () => {
    setExplain("loading");
    window.setTimeout(() => setExplain("done"), 900);
  };

  // Focus moves into the panel on open, and Esc closes it.
  React.useEffect(() => {
    if (!openId) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openId, closePanel]);

  // --- Table rows (both computed every render; only one is displayed) ---
  const loadTableRows = loads.map((l) => {
    const assignment = isLoads ? assignedForMode[l.id] : undefined;
    const driverKey = (assignment?.d ?? l.rec) as DriverId;
    return {
      ...l,
      driverName: drivers[driverKey].name,
      score: drivers[driverKey].score,
      assignment,
    };
  });

  const driverTableRows = driverRows.map((d) => {
    const assignment = !isLoads ? assignedForMode[d.id] : undefined;
    const topLoadId = assignment?.d ?? d.rec;
    return {
      ...d,
      name: drivers[d.id].name,
      topLoad: topLoadId,
      lane: laneFor(topLoadId),
      score: loadCandidates[topLoadId]?.score ?? "",
      assignment,
    };
  });

  const openCount = isLoads
    ? `${loads.length - Object.keys(assignedForMode).length} unassigned`
    : `${driverRows.length - Object.keys(assignedForMode).length} available`;

  // --- Slide-out panel derivation ---
  const panel = React.useMemo(() => {
    if (!openId) return null;

    if (isLoads) {
      const sel = loads.find((l) => l.id === openId);
      if (!sel) return null;
      const [eqType, eqWeight] = sel.eq.split(" · ");
      const effectivePick = pickKey ?? sel.rec;
      const isRec = effectivePick === sel.rec;
      const pick: Candidate = drivers[effectivePick as DriverId];
      const alt0 = drivers[sel.alts[0]];
      const assignment = assignedForMode[sel.id];

      return {
        panelId: `${sel.id} · ${sel.shipper}`,
        panelLane: `${sel.from} → ${sel.to}`,
        facts: [
          { k: "Pick-up window", v: sel.puWin },
          { k: "Drop-off window", v: sel.doWin },
          { k: "Equipment", v: eqType },
          { k: "Weight", v: eqWeight },
        ],
        isRec,
        pick,
        pickLabel: isRec ? "Recommended driver" : "Your choice",
        explText: `${pick.name} is the strongest fit: ${pick.meta.split(" · ")[0]}, with enough drive time to deliver without a reset. The next-best option, ${alt0.name}, is rated ${alt0.score} but adds deadhead miles or risks a late pickup.`,
        whyText: "Why this driver instead?",
        reasons: LOAD_REASONS,
        alts: sel.alts.map<CandidateRowView>((key) => ({
          key,
          ...drivers[key],
          selected: effectivePick === key,
        })),
        searchPlaceholder: "Search all drivers",
        emptyText: "No drivers match that name.",
        excludeKeys: new Set<string>([sel.rec, ...sel.alts]),
        candidates: drivers as Record<string, Candidate>,
        assigned: assignment,
        assignLabel: assignment ? "Assigned" : `Assign ${pick.name}`,
        assignDisabled: !isRec && !reason,
        onAssign: () =>
          setAssigned((prev) => ({
            ...prev,
            loads: { ...prev.loads, [sel.id]: { d: effectivePick, override: !isRec } },
          })),
      };
    }

    const sel = driverRows.find((d) => d.id === openId);
    if (!sel) return null;
    const driver = drivers[sel.id];
    const [, notes] = driver.meta.split(" · ");
    const effectivePick = pickKey ?? sel.rec;
    const isRec = effectivePick === sel.rec;
    const pick: Candidate = loadCandidates[effectivePick];

    return {
      panelId: `Driver · rated ${driver.score}`,
      panelLane: driver.name,
      facts: [
        { k: "Home base", v: sel.home },
        { k: "Current location", v: sel.now },
        { k: "Drive time left", v: sel.hos },
        { k: "Notes", v: notes },
      ],
      isRec,
      pick,
      pickLabel: isRec ? "Recommended load" : "Your choice",
      explText: `${effectivePick} is the best next load for ${driver.name}: the pickup is close to ${sel.now}, it fits inside ${sel.hos} of drive time, and the drop-off leaves them well placed for tomorrow's freight. The next-best, ${sel.alts[0]}, adds deadhead miles.`,
      whyText: "Why this load instead?",
      reasons: DRIVER_REASONS,
      alts: sel.alts.map<CandidateRowView>((key) => ({
        key,
        ...loadCandidates[key],
        selected: effectivePick === key,
      })),
      searchPlaceholder: "Search loads by ID or city",
      emptyText: "No loads match that search.",
      excludeKeys: new Set<string>([sel.rec, ...sel.alts]),
      candidates: loadCandidates,
      assigned: assignedForMode[sel.id],
      assignLabel: assignedForMode[sel.id] ? "Assigned" : `Assign ${effectivePick}`,
      assignDisabled: !isRec && !reason,
      onAssign: () =>
        setAssigned((prev) => ({
          ...prev,
          drivers: { ...prev.drivers, [sel.id]: { d: effectivePick, override: !isRec } },
        })),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openId, isLoads, pickKey, assignedForMode, reason]);

  const searchResults: CandidateRowView[] = React.useMemo(() => {
    if (!panel) return [];
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return Object.entries(panel.candidates)
      .filter(([key, c]) => !panel.excludeKeys.has(key) && c.name.toLowerCase().includes(q))
      .map(([key, c]) => ({ key, ...c, selected: (pickKey ?? "") === key }));
  }, [panel, query, pickKey]);

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-canvas">
      <div className="flex items-center justify-between gap-4 border-b border-border-subtle bg-surface-card px-5 py-3">
        <div className="flex items-center gap-4">
          <span className="font-sans text-base font-semibold text-strong">Dispatching</span>
          <Tabs
            items={[
              { id: "loads", label: "Assign loads" },
              { id: "drivers", label: "Assign drivers" },
            ]}
            value={mode}
            onValueChange={changeMode}
            variant="pill"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" iconLeft="list-checks">
            Driver rules
          </Button>
          <Button variant="secondary" size="sm" iconLeft="history">
            Assignment history
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 px-5 py-3">
        <Button variant="secondary" size="sm" iconLeft="filter">
          Add filters
        </Button>
        <span className="flex items-center gap-2 font-sans text-[13px] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-success-solid" />
          Last synced Nov 1, 12:16 · recommendations refresh every few minutes
        </span>
        <Badge tone="neutral" className="ml-auto">
          {openCount}
        </Badge>
      </div>

      <div className="mx-5 flex-1 overflow-auto rounded-xl border border-border-subtle bg-surface-card">
        {isLoads ? (
          <>
            <div className={cn("grid gap-3 border-b border-border-subtle bg-surface-sunken px-4 py-2.5 font-sans text-xs font-semibold text-[var(--mist-700)]", LOADS_GRID)}>
              <span>Load</span>
              <span>Shipper</span>
              <span>Pick-up window</span>
              <span>Pick-up</span>
              <span>Drop-off window</span>
              <span>Drop-off</span>
              <span>Req.</span>
              <span>Top driver</span>
              <span className="text-right">Rating</span>
            </div>
            {loadTableRows.map((row) => (
              <button
                key={row.id}
                type="button"
                onClick={(event) => openRow(row.id, event.currentTarget)}
                className={cn(
                  "grid w-full gap-3 border-b border-border-subtle px-4 py-3 text-left font-sans text-[13px] transition-colors duration-150 hover:bg-surface-hover",
                  LOADS_GRID,
                  openId === row.id && "bg-surface-selected",
                )}
              >
                <span className="font-mono text-xs text-[var(--plum-700)] underline underline-offset-2">{row.id}</span>
                <span className="font-mono text-xs text-muted">{row.shipper}</span>
                <span className="font-mono text-xs">{row.puWin}</span>
                <span className="truncate">{row.from}</span>
                <span className="font-mono text-xs">{row.doWin}</span>
                <span className="truncate">{row.to}</span>
                <span className="font-mono text-xs">{row.req}</span>
                <span className="flex min-w-0 items-center gap-2">
                  <span className="truncate font-semibold">{row.driverName}</span>
                  {row.assignment && (
                    <Badge tone={row.assignment.override ? "warning" : "success"} dot>
                      {row.assignment.override ? "Overridden" : "Assigned"}
                    </Badge>
                  )}
                </span>
                <span className="text-right font-mono text-xs text-[var(--secondary)]">{row.score}</span>
              </button>
            ))}
          </>
        ) : (
          <>
            <div className={cn("grid gap-3 border-b border-border-subtle bg-surface-sunken px-4 py-2.5 font-sans text-xs font-semibold text-[var(--mist-700)]", DRIVERS_GRID)}>
              <span>Driver</span>
              <span>Home base</span>
              <span>Current location</span>
              <span>Drive time</span>
              <span>Top load</span>
              <span>Lane</span>
              <span className="text-right">Match</span>
            </div>
            {driverTableRows.map((row) => (
              <button
                key={row.id}
                type="button"
                onClick={(event) => openRow(row.id, event.currentTarget)}
                className={cn(
                  "grid w-full gap-3 border-b border-border-subtle px-4 py-3 text-left font-sans text-[13px] transition-colors duration-150 hover:bg-surface-hover",
                  DRIVERS_GRID,
                  openId === row.id && "bg-surface-selected",
                )}
              >
                <span className="font-semibold text-[var(--plum-700)] underline underline-offset-2">{row.name}</span>
                <span>{row.home}</span>
                <span>{row.now}</span>
                <span className="font-mono text-xs">{row.hos}</span>
                <span className="font-mono text-xs font-semibold">{row.topLoad}</span>
                <span className="flex min-w-0 items-center gap-2">
                  <span className="truncate">{row.lane}</span>
                  {row.assignment && (
                    <Badge tone={row.assignment.override ? "warning" : "success"} dot>
                      {row.assignment.override ? "Overridden" : "Assigned"}
                    </Badge>
                  )}
                </span>
                <span className="text-right font-mono text-xs text-[var(--secondary)]">{row.score}</span>
              </button>
            ))}
          </>
        )}
      </div>

      <div
        ref={panelRef}
        className="absolute inset-y-0 right-0 flex w-[min(440px,100%)] flex-col border-l border-border-subtle bg-surface-raised shadow-lg transition-transform duration-[260ms] ease-[cubic-bezier(.2,0,0,1)]"
        style={{ transform: openId ? "translateX(0)" : "translateX(105%)" }}
      >
        {panel && (
          <>
            <div className="flex items-center justify-between gap-3 border-b border-border-subtle px-5 py-3.5">
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[13px] text-strong">{panel.panelId}</span>
                <span className="font-sans text-[15px] font-semibold text-strong">{panel.panelLane}</span>
              </div>
              <Button ref={closeButtonRef} variant="ghost" size="sm" iconLeft="x" onClick={closePanel}>
                Close
              </Button>
            </div>

            <div className="flex flex-1 flex-col gap-5 overflow-auto p-5">
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {panel.facts.map((fact) => (
                  <div key={fact.k} className="flex flex-col gap-0.5">
                    <span className="font-mono text-[11px] uppercase tracking-[.06em] text-muted">{fact.k}</span>
                    <span className="font-sans text-sm text-strong">{fact.v}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 rounded-xl border border-accent-soft-border bg-accent-soft p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[.06em] text-accent-text">
                    {panel.pickLabel}
                  </span>
                  <span className="font-mono text-[13px] text-[var(--secondary)]">{panel.pick.score}</span>
                </div>
                <span className="font-sans text-lg font-semibold text-strong">{panel.pick.name}</span>
                <span className="font-sans text-[13px] text-[var(--mist-700)]">{panel.pick.meta}</span>

                {panel.isRec && explain === "idle" && (
                  <Button variant="secondary" size="sm" iconLeft="sparkles" onClick={runExplain}>
                    Explain this match
                  </Button>
                )}
                {panel.isRec && explain === "loading" && (
                  <span className="font-sans text-[13px] text-muted">Writing an explanation…</span>
                )}
                {panel.isRec && explain === "done" && (
                  <div className="rounded-lg border border-border-subtle bg-surface-card p-3.5 font-sans text-sm leading-[1.55] text-body">
                    {panel.explText}
                  </div>
                )}

                {!panel.isRec && (
                  <div className="flex flex-col gap-2">
                    <span className="font-sans text-[13px] font-semibold text-strong">{panel.whyText}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {panel.reasons.map((r) => (
                        <Tag key={r} selected={reason === r} onClick={() => setReason(r)}>
                          {r}
                        </Tag>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  iconLeft="send"
                  fullWidth
                  disabled={panel.assignDisabled}
                  onClick={panel.onAssign}
                >
                  {panel.assignLabel}
                </Button>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[.06em] text-muted">Alternatives</span>
                {panel.alts.map((alt) => (
                  <CandidateListRow key={alt.key} row={alt} onPick={pickCandidate} />
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <Input
                  icon="search"
                  placeholder={panel.searchPlaceholder}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
                {searchResults.map((result) => (
                  <CandidateListRow key={result.key} row={result} onPick={pickCandidate} />
                ))}
                {query.trim() && searchResults.length === 0 && (
                  <span className="font-sans text-[13px] text-muted">{panel.emptyText}</span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
