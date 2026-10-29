import { Button, Icon } from "@zyne/ui";
import { getColorRamp } from "@/lib/tokens";
import { ZyneShowcase } from "@/components/zyne-showcase/ZyneShowcase";

export default function ZynePage() {
  const plum = getColorRamp("plum");
  const pine = getColorRamp("pine");
  const mist = getColorRamp("mist");

  return (
    <div className="px-6 py-16 md:px-16 md:py-[88px]">
      <p className="font-mono text-[13px] uppercase tracking-[.08em] text-muted">
        Design system · React + CSS variables · 21 components
      </p>
      <h1 className="mt-3 font-display text-[56px] font-semibold leading-[60px] text-strong">Zyne</h1>
      <p className="mt-5 max-w-2xl font-sans text-lg leading-[28px] text-body">
        A quiet, accessibility-first design system. Every text pairing meets WCAG AA, status is
        never colour alone, and motion stays under 260ms.
      </p>
      <div className="mt-8">
        {/* index.html explicitly: Storybook's relative asset paths need the full path. */}
        <Button asChild variant="secondary">
          <a href="/zyne/storybook/index.html" className="no-underline">
            Browse the components in Storybook
            <Icon name="arrow-up-right" size={16} />
          </a>
        </Button>
      </div>

      <div className="mt-14">
        <ZyneShowcase plum={plum} pine={pine} mist={mist} />
      </div>
    </div>
  );
}
