"use client";

import Link from "next/link";
import * as React from "react";
import { Tag } from "@zyne/ui";
import { disciplines, workItems, type Discipline } from "@/content/work-index";

export function WorkIndex() {
  const [filter, setFilter] = React.useState<Discipline | "All">("All");
  const filtered = filter === "All" ? workItems : workItems.filter((item) => item.disciplines.includes(filter));

  return (
    <div className="px-6 py-14 md:px-16">
      <h1 className="font-display text-[34px] font-semibold text-strong">Work</h1>
      <div className="mt-6 flex flex-wrap gap-2">
        <Tag selected={filter === "All"} onClick={() => setFilter("All")}>
          All
        </Tag>
        {disciplines.map((discipline) => (
          <Tag key={discipline} selected={filter === discipline} onClick={() => setFilter(discipline)}>
            {discipline}
          </Tag>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 font-sans text-body text-muted">No projects match these filters.</p>
      ) : (
        <ul className="mt-8 flex flex-col border-t border-border-subtle">
          {filtered.map((item) => (
            <li
              key={item.name}
              className="-mx-6 border-b border-border-subtle px-6 py-6 transition-colors duration-150 hover:bg-surface-hover md:-mx-16 md:px-16"
            >
              <Link href={item.href} className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-display text-2xl font-semibold text-strong">{item.name}</span>
                <span className="font-mono text-xs text-muted">
                  {item.org} · {item.role}
                </span>
              </Link>
              <p className="mt-1 font-sans text-base text-muted">{item.short}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
