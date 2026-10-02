"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { cn } from "@zyne/ui/src/lib/cn";
import type { Project } from "@/content/projects";

export function ProjectRows({ projects }: { projects: Project[] }) {
  const [openIndex, setOpenIndex] = React.useState(0);

  return (
    <div>
      {projects.map((project, index) => {
        const open = index === openIndex;
        return (
          <Link
            key={project.name}
            href={project.href}
            onMouseEnter={() => setOpenIndex(index)}
            onFocus={() => setOpenIndex(index)}
            className={cn(
              "block border-t border-border-subtle px-6 py-6 no-underline md:px-12 md:py-[26px]",
              open && "bg-surface-card",
            )}
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-display text-[26px] font-semibold leading-tight text-strong md:text-[38px] md:leading-[42px]">
                {project.name}
              </span>
              <span className="whitespace-nowrap font-mono text-xs text-muted">
                {project.org} · {project.role}
              </span>
            </div>
            <div className="mt-1.5 flex items-baseline justify-between gap-4">
              <span className="font-sans text-base text-muted">{project.short}</span>
              <span className="whitespace-nowrap font-sans text-[13px] text-muted">{project.disciplines}</span>
            </div>
            {project.image && (
              <div
                className="grid overflow-hidden transition-[grid-template-rows] duration-[260ms] ease-[cubic-bezier(.2,0,0,1)]"
                style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
              >
                <div className="min-h-0">
                  <div className="relative mt-5 aspect-[21/9] overflow-hidden rounded-lg">
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      className="object-cover"
                      style={{ objectPosition: project.imagePosition }}
                    />
                  </div>
                </div>
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
