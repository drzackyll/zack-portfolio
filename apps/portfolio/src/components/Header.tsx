"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { cn } from "@zyne/ui/src/lib/cn";

const NAV_ITEMS = [
  { href: "/work", label: "Work" },
  { href: "/zyne", label: "Zyne" },
  { href: "/about", label: "About" },
  { href: "mailto:adams.z.d@gmail.com", label: "Contact" },
];

function NavLink({ href, label, active, onClick }: { href: string; label: string; active: boolean; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "focus-ring inline-flex items-center rounded-[var(--radius-pill)] px-4 py-2.5 font-sans text-sm font-medium text-body transition-colors duration-150 hover:bg-surface-hover",
        active && "border border-border-subtle bg-surface-card text-strong shadow-xs hover:bg-surface-card",
      )}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="border-b border-border-subtle bg-canvas">
      <div className="flex items-center justify-between px-6 py-4 md:px-14 md:py-5">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/headshot.jpeg"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover"
            style={{ objectPosition: "50% 30%" }}
          />
          <span className="font-sans text-base font-semibold text-strong md:inline hidden">Zack Adams</span>
          <span className="font-display text-xl font-semibold text-strong md:hidden">Zack Adams</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} {...item} active={pathname === item.href} />
          ))}
        </nav>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="focus-ring inline-flex h-11 items-center rounded-[var(--radius-pill)] border border-[var(--text-strong)] px-4 font-mono text-[13px] text-strong md:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      <div
        id="mobile-menu"
        className="overflow-hidden bg-surface-inverse transition-[grid-template-rows] duration-[400ms] ease-[cubic-bezier(.2,.8,.2,1)] md:hidden"
        style={{ display: "grid", gridTemplateRows: menuOpen ? "1fr" : "0fr" }}
      >
        <nav aria-label="Primary" className="min-h-0 px-6 py-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "block py-2.5 font-display text-[32px] font-semibold text-inverse",
                item.label === "Contact" && "text-[var(--plum-300)]",
              )}
            >
              {item.label === "Contact" ? "Get in touch" : item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
