import Link from "next/link";

export function NextProjectBand({ href, title }: { href: string; title: string }) {
  return (
    <Link
      href={href}
      className="group mt-24 flex flex-wrap items-center justify-between gap-4 bg-surface-inverse px-6 py-10 transition-[padding] duration-[350ms] md:px-16 md:py-14 md:hover:pl-[84px]"
    >
      <span className="font-mono text-xs uppercase tracking-[.08em] text-[var(--mist-400)]">Next project</span>
      <span className="font-display text-2xl font-semibold text-inverse md:text-[44px]">{title} →</span>
    </Link>
  );
}
