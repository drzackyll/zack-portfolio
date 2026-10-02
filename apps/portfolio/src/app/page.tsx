import Image from "next/image";
import Link from "next/link";
import { Tag } from "@zyne/ui";
import { ProjectRows } from "@/components/ProjectRows";
import { jobs, projects } from "@/content/projects";

export default function HomePage() {
  return (
    <div className="md:grid md:grid-cols-[400px_1fr]">
      <div className="flex flex-col gap-10 border-b border-border-subtle bg-surface-sunken px-6 py-10 md:sticky md:top-0 md:h-screen md:justify-between md:border-b-0 md:border-r md:px-11 md:py-12">
        <div className="flex flex-col gap-6">
          <Image
            src="/images/headshot.jpeg"
            alt="Zack Adams"
            width={96}
            height={96}
            className="h-24 w-24 rounded-full object-cover shadow-md ring-4 ring-white"
            style={{ objectPosition: "50% 28%" }}
          />
          <h1 className="font-display text-[34px] font-semibold leading-[1.1] tracking-[-.015em] text-strong md:text-[46px] md:leading-[49px]">
            I work where product, design and code meet.
          </h1>
          <p className="font-sans text-[17px] leading-[27px] text-body">
            Product lead and senior engineer, 9+ years building data and AI tools for people
            making fast, high-stakes decisions — dispatchers, field offices, ops teams.
          </p>
          <div className="flex flex-wrap gap-2">
            <Tag>Frontend</Tag>
            <Tag>Design systems</Tag>
            <Tag>Product ownership</Tag>
          </div>
          <ul className="flex flex-col border-t border-border-default">
            {jobs.map((job) => (
              <li
                key={job.org}
                className="flex items-center justify-between border-b border-border-default py-3 font-sans text-sm text-body"
              >
                <span className="font-medium text-strong">{job.org}</span>
                <span className="text-muted">{job.role}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2.5 font-mono text-[13px]">
          <a href="mailto:adams.z.d@gmail.com" className="text-[var(--accent)]">
            adams.z.d@gmail.com
          </a>
          <div className="flex gap-[18px] text-muted">
            <a href="https://github.com/drzackyll" className="hover:text-strong">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/zacharydadams/" className="hover:text-strong">
              LinkedIn
            </a>
            <a href="/resume.pdf" className="hover:text-strong">
              Résumé
            </a>
          </div>
          <span className="text-muted">Nairobi · open to remote</span>
        </div>
      </div>

      <div className="py-6 md:py-10">
        <p className="px-6 pb-4 font-mono text-xs uppercase tracking-[.08em] text-muted md:px-12">
          Selected work
        </p>
        <ProjectRows projects={projects} />
      </div>
    </div>
  );
}
