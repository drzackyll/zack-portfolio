import Image from "next/image";
import { Button } from "@zyne/ui";
import { experience, roles, toolkit } from "@/content/about";

export default function AboutPage() {
  return (
    <div className="px-6 py-14 md:px-16 md:py-[88px]">
      <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-[72px]">
        <Image
          src="/images/headshot.jpeg"
          alt="Zack Adams"
          width={480}
          height={600}
          className="aspect-[4/5] w-full rounded-xl object-cover shadow-md"
          style={{ objectPosition: "50% 20%" }}
        />

        <div className="flex flex-col gap-7">
          <h1 className="font-display text-[36px] font-semibold leading-tight text-strong md:text-[54px] md:leading-[58px]">
            I&rsquo;m happiest in the gap between what users need and what engineering can ship — and
            I&rsquo;ve worked on both sides of it.
          </h1>
          <p className="font-sans text-lg leading-[31px] text-body">
            Product lead and senior engineer with 9+ years building data and AI products for UN,
            humanitarian and private-sector teams. At UNICEF I led the frontend of Magasin, a
            Digital Public Good. At Optimal Dynamics I took an AI dispatching product from concept
            to v1 in four months and stewarded the company&rsquo;s component library. Most recently, at
            Rescue.co, I owned the product lifecycle for an emergency dispatch analytics platform
            in Kenya.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild>
              <a href="/resume.pdf">Download CV</a>
            </Button>
            <Button variant="secondary" asChild>
              <a href="https://github.com/drzackyll">GitHub</a>
            </Button>
            <Button variant="secondary" asChild>
              <a href="https://www.linkedin.com/in/zacharydadams/">LinkedIn</a>
            </Button>
            <a
              href="mailto:adams.z.d@gmail.com"
              className="font-sans text-[15px] font-medium text-[var(--accent-text)] underline underline-offset-[3px]"
            >
              adams.z.d@gmail.com
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs uppercase tracking-[.08em] text-muted">Roles I&rsquo;m a fit for</p>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <span
                  key={role}
                  className="rounded-[var(--radius-pill)] border border-border-default px-3 py-1.5 font-sans text-sm text-body"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-[1fr_1.6fr] md:gap-[72px]">
        <p className="font-mono text-xs uppercase tracking-[.08em] text-muted">Experience</p>
        <ul className="flex flex-col border-t border-[var(--text-strong)]">
          {experience.map((item) => (
            <li
              key={item.role}
              className="grid gap-2 border-b border-border-default py-6 md:grid-cols-[180px_1fr] md:gap-6"
            >
              <span className="font-mono text-[13px] text-muted">{item.date}</span>
              <div className="flex flex-col gap-1">
                <span className="font-display text-2xl font-semibold text-strong">{item.role}</span>
                <span className="font-sans text-[15px] text-muted">{item.org}</span>
                <p className="font-sans text-base leading-[26px] text-body">{item.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-[1fr_1.6fr] md:gap-[72px]">
        <p className="font-mono text-xs uppercase tracking-[.08em] text-muted">Toolkit</p>
        <div className="grid gap-7 border-t border-[var(--text-strong)] pt-6 sm:grid-cols-2">
          {toolkit.map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span className="font-sans text-[15px] font-semibold text-strong">{item.label}</span>
              <p className="font-sans text-[15px] leading-[25px] text-muted">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
