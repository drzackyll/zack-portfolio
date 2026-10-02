import type { RampStep } from "@/lib/tokens";

function textColorFor(step: string) {
  return Number(step) >= 400 ? "#fff" : "var(--text-strong)";
}

export function ColorRamp({ name, note, steps }: { name: string; note: string; steps: RampStep[] }) {
  return (
    <div>
      <p className="font-sans text-sm font-semibold text-strong">{name}</p>
      <p className="mt-0.5 font-sans text-[13px] text-muted">{note}</p>
      <div className="mt-3 flex flex-col overflow-hidden rounded-lg border border-border-subtle">
        {steps.map((s) => (
          <div
            key={s.step}
            className="flex items-center justify-between px-3 py-2 font-mono text-xs"
            style={{ background: s.hex, color: textColorFor(s.step) }}
          >
            <span>{s.step}</span>
            <span>{s.hex}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
