import Image from "next/image";
import type { ReactNode } from "react";
import { NextProjectBand } from "./NextProjectBand";

export interface Fact {
  label: string;
  value: string;
}

export interface WhatIDidItem {
  label: string;
  body: string;
}

export interface Chapter {
  number: string;
  title: string;
  body: string;
  image?: string;
  imageAspect?: string;
  caption?: string;
}

export interface CaseStudyProps {
  eyebrow: string;
  title: string;
  lede: string;
  demo?: ReactNode;
  demoCaption?: string;
  heroImage?: { src: string; aspect: string; caption: string };
  facts: Fact[];
  whatIDid: WhatIDidItem[];
  chapters: Chapter[];
  nextProject: { href: string; title: string };
}

export function CaseStudy({
  eyebrow,
  title,
  lede,
  demo,
  demoCaption,
  heroImage,
  facts,
  whatIDid,
  chapters,
  nextProject,
}: CaseStudyProps) {
  return (
    <div>
      <div className="max-w-[920px] px-6 py-16 md:px-16 md:py-[88px] md:pb-14">
        <p className="font-mono text-[13px] text-muted">{eyebrow}</p>
        <h1 className="mt-4 font-display text-[40px] font-semibold leading-tight tracking-[-.015em] text-strong md:text-[68px] md:leading-[71px]">
          {title}
        </h1>
        <p className="mt-6 font-sans text-xl leading-[33px] text-body md:text-[21px]">{lede}</p>
      </div>

      {demo && (
        <div className="mx-6 md:mx-16">
          <div className="relative h-[480px] overflow-hidden rounded-xl border border-border-subtle shadow-md md:h-[640px]">
            {demo}
          </div>
          {demoCaption && (
            <div className="mt-3 flex flex-wrap justify-between gap-2 font-sans text-sm text-muted">
              <span>{demoCaption}</span>
            </div>
          )}
        </div>
      )}

      {heroImage && (
        <div className="mx-6 md:mx-16">
          <div className="relative overflow-hidden rounded-xl border border-border-subtle shadow-md" style={{ aspectRatio: heroImage.aspect }}>
            <Image src={heroImage.src} alt="" fill className="object-cover object-top" />
          </div>
          <p className="mt-3 font-sans text-sm text-muted">{heroImage.caption}</p>
        </div>
      )}

      <div className="mx-6 mt-14 grid grid-cols-2 gap-6 border-t border-[var(--text-strong)] pt-5 md:mx-16 md:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label} className="flex flex-col gap-1.5 border-b border-border-subtle pb-6">
            <span className="font-mono text-xs uppercase tracking-[.08em] text-muted">{fact.label}</span>
            <span className="font-sans text-[17px] font-medium text-strong">{fact.value}</span>
          </div>
        ))}
      </div>

      <div className="grid gap-8 px-6 py-16 md:grid-cols-[1fr_2fr] md:gap-16 md:px-16 md:py-[88px]">
        <div className="border-t border-[var(--text-strong)] pt-4">
          <p className="font-mono text-xs text-muted">00</p>
          <p className="font-display text-[32px] font-semibold text-strong">What I did</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {whatIDid.map((item) => (
            <div key={item.label} className="flex flex-col gap-2.5 rounded-lg bg-surface-sunken p-5">
              <span className="font-mono text-xs uppercase tracking-[.08em] text-[var(--accent-text)]">
                {item.label}
              </span>
              <p className="font-sans text-[15px] leading-[23px] text-body">{item.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-14 px-6 pb-16 md:px-16 md:pb-[88px]">
        {chapters.map((chapter) => (
          <div key={chapter.number} className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-16">
            <div>
              <p className="font-mono text-xs text-muted">{chapter.number}</p>
              <p className="font-display text-2xl font-semibold text-strong">{chapter.title}</p>
            </div>
            <div className="flex flex-col gap-5">
              <p className="font-sans text-lg leading-[31px] text-body">{chapter.body}</p>
              {chapter.image && (
                <div>
                  <div
                    className="relative overflow-hidden rounded-xl shadow-md"
                    style={{ aspectRatio: chapter.imageAspect }}
                  >
                    <Image src={chapter.image} alt="" fill className="object-cover" />
                  </div>
                  {chapter.caption && <p className="mt-3 font-sans text-sm text-muted">{chapter.caption}</p>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <NextProjectBand href={nextProject.href} title={nextProject.title} />
    </div>
  );
}
