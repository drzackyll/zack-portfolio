"use client";

import * as React from "react";
import { Badge, Button, Checkbox, Input, Switch, Tabs, TabsPanel, Tag } from "@zyne/ui";
import type { RampStep } from "@/lib/tokens";
import { ColorRamp } from "./ColorRamp";

const MAIN_TABS = [
  { id: "tokens", label: "Tokens" },
  { id: "actions", label: "Actions" },
  { id: "forms", label: "Forms" },
  { id: "display", label: "Display" },
];

const UNITS = [
  { id: "AMB-114", status: "En route" as const },
  { id: "AMB-087", status: "Available" as const },
  { id: "AIR-02", status: "Critical" as const },
];

const STATUS_TONE = {
  "En route": "warning",
  Available: "success",
  Critical: "danger",
} as const;

export function ZyneShowcase({
  plum,
  pine,
  mist,
}: {
  plum: RampStep[];
  pine: RampStep[];
  mist: RampStep[];
}) {
  const [tab, setTab] = React.useState("tokens");
  const [clicks, setClicks] = React.useState(0);
  const [note, setNote] = React.useState("");
  const [switchOn, setSwitchOn] = React.useState(true);
  const [checkboxOn, setCheckboxOn] = React.useState(false);
  const [tagsOn, setTagsOn] = React.useState<string[]>(["Nairobi"]);
  const [unitFilter, setUnitFilter] = React.useState<"all" | "busy">("all");

  const toggleTag = (label: string) =>
    setTagsOn((current) => (current.includes(label) ? current.filter((t) => t !== label) : [...current, label]));

  const noteOverLimit = note.length > 60;
  const visibleUnits = unitFilter === "all" ? UNITS : UNITS.filter((u) => u.status !== "Available");

  return (
    <div>
      <Tabs items={MAIN_TABS} value={tab} onValueChange={setTab} variant="underline" />

      <div className="pt-8">
        <TabsPanel value="tokens" activeValue={tab} className="flex flex-col gap-10">
          <div className="grid gap-6 md:grid-cols-3">
            <ColorRamp name="Plum" note="Primary accent · plum-600 is 8.7:1 on white" steps={plum} />
            <ColorRamp name="Pine" note="Quiet secondary for data & avatars" steps={pine} />
            <ColorRamp name="Mist" note="Cool plum-tinted neutrals · canvas, text, borders" steps={mist} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border-subtle p-5">
              <p className="font-display text-2xl font-semibold text-strong">Display</p>
              <p className="mt-1 font-sans text-sm text-muted">Source Serif 4 — Calm, editorial</p>
            </div>
            <div className="rounded-lg border border-border-subtle p-5">
              <p className="font-sans text-xl font-semibold text-strong">UI</p>
              <p className="mt-1 font-sans text-sm text-muted">Hanken Grotesk — Clear before clever</p>
            </div>
            <div className="rounded-lg border border-border-subtle p-5">
              <p className="font-mono text-lg text-strong">Data</p>
              <p className="mt-1 font-sans text-sm text-muted">JetBrains Mono — INC-20481 · 04:12</p>
            </div>
          </div>
        </TabsPanel>

        <TabsPanel value="actions" activeValue={tab} className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setClicks((c) => c + 1)}>Try a button</Button>
            <span className="font-sans text-sm text-muted">Pressed {clicks}×</span>
          </div>
        </TabsPanel>

        <TabsPanel value="forms" activeValue={tab} className="flex max-w-sm flex-col gap-6">
          <Input
            label="Leave a note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            hint={noteOverLimit ? undefined : `${note.length}/60 characters`}
            error={noteOverLimit ? `Keep it under 60 characters — ${note.length}/60` : undefined}
            errorAnnounced={noteOverLimit}
          />
          <Switch label="Bookable" checked={switchOn} onCheckedChange={setSwitchOn} />
          <Checkbox label="Email me a reminder" checked={checkboxOn} onCheckedChange={setCheckboxOn} />
        </TabsPanel>

        <TabsPanel value="display" activeValue={tab} className="flex flex-col gap-8">
          <div className="flex flex-wrap gap-2">
            {["Ambulance", "Air rescue", "Roadside", "Nairobi"].map((label) => (
              <Tag key={label} selected={tagsOn.includes(label)} onClick={() => toggleTag(label)}>
                {label}
              </Tag>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge tone="success" dot>
              Available
            </Badge>
            <Badge tone="warning" dot>
              En route
            </Badge>
            <Badge tone="danger" dot>
              Critical
            </Badge>
            <Badge tone="info" dot>
              At hospital
            </Badge>
            <Badge tone="neutral" dot>
              Off duty
            </Badge>
          </div>

          <div className="rounded-lg border border-border-subtle p-5">
            <Tabs
              items={[
                { id: "all", label: "All" },
                { id: "busy", label: "Busy" },
              ]}
              value={unitFilter}
              onValueChange={(id) => setUnitFilter(id as "all" | "busy")}
              variant="pill"
            />
            <ul className="mt-4 flex flex-col gap-2">
              {visibleUnits.map((unit) => (
                <li key={unit.id} className="flex items-center justify-between font-sans text-sm text-body">
                  <span className="font-mono text-[13px] text-strong">{unit.id}</span>
                  <Badge tone={STATUS_TONE[unit.status]}>{unit.status}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </TabsPanel>
      </div>
    </div>
  );
}
