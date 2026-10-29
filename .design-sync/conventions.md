# Zyne — how to build with it

Zyne is a calm, plum-accented product UI kit (React 18, Radix under the hood). Every component is on `window.Zyne` (`const { Button, Card, Field, Input } = window.Zyne;`). Use a Zyne component for every control; write your own markup only for page layout.

## Setup
- **No root provider is needed.** Tokens, the compiled component CSS and the fonts (Hanken Grotesk UI, Source Serif 4 display, JetBrains Mono, via Google Fonts) all arrive through `styles.css`. `body` already gets the canvas background, body text colour and `--font-sans`.
- **Toasts:** wrap the app once in `<ToastProvider>`, then call `const { toast } = Zyne.useToast()` inside it. `useToast` throws outside the provider.
- **Dark mode:** set `data-theme="dark"` on `<html>` or any container. Light is the default. Never hard-code hex colours; tokens flip with the theme.
- `Dialog` is controlled (`open` + `onClose`). `Tabs` panels use `TabsPanel`, and radios go in `RadioGroup`; both are exported alongside.

## Styling your own layout: CSS variables, not utility classes
The shipped CSS is a *compiled* Tailwind build. Only the classes Zyne itself uses exist, so an arbitrary utility like `grid-cols-7` or `bg-accent-soft` may silently do nothing. For layout glue, use inline `style` with the design tokens:

| Need | Tokens |
|---|---|
| Surfaces | `--bg-canvas`, `--surface-card`, `--surface-raised`, `--surface-sunken`, `--surface-hover`, `--surface-selected`, `--surface-inverse` |
| Text | `--text-strong` (headings), `--text-body`, `--text-muted`, `--text-subtle`, `--text-link`, `--text-on-accent`, `--text-inverse` |
| Borders | `--border-subtle` (dividers), `--border-default`, `--border-strong`, `--border-input`; width `--border-width` |
| Brand | `--accent`, `--accent-hover`, `--accent-soft`, `--accent-text`; `--secondary`, `--secondary-soft`, `--secondary-text` |
| Status | `--{success,warning,danger,info,neutral}-{fg,bg,border,solid}` |
| Spacing | `--space-0` … `--space-13` = 0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80px (gap between controls `--space-4`, between fields `--space-6`, between sections `--space-8`); `--layout-content-max`, `--layout-reading-max`, `--layout-sidebar` |
| Shape | `--radius-xs/sm/md/lg/xl/pill`; `--shadow-xs/sm/md/lg`, `--shadow-inset` |
| Type | families `--font-display` (serif headings), `--font-sans`, `--font-mono`; sizes `--text-{display-xl,display-lg,display-md,display-sm,heading-lg,heading-md,heading-sm,ui,body-lg,body-md,body-sm,caption,overline,mono}`, each with a matching `--lh-*` line height; weights `--weight-{regular,medium,semibold,bold}` |

Headings: `--font-display` at `--text-display-*` or `--text-heading-*`, `--text-strong`. Body copy: `--text-body-md`, `--text-body`. Card internals come from `Card`'s own slots, so don't restyle them.

## Where the truth lives
- `styles.css` → `_ds_bundle.css`: every token's value (`:root` and `[data-theme="dark"]`) and every class that actually exists.
- `components/<group>/<Name>/<Name>.prompt.md`: usage rules and examples for each component. `<Name>.d.ts` is the exact props contract.
- `guidelines/README.md`: the brand book (voice, decisions, choosing components, iconography).
- Icons: `<Icon name="kebab-case-lucide-name" size={16} />` (sizes 14/16/20) for every glyph, and `IconButton` (`icon` + required `label`) for icon-only actions. No emoji.

## Example
```jsx
const { Card, Field, Input, Button, Badge } = window.Zyne;

function Settings() {
  return (
    <main style={{ maxWidth: "var(--layout-content-max)", margin: "0 auto", padding: "var(--space-10) var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-display-sm)", lineHeight: "var(--lh-display-sm)", color: "var(--text-strong)", margin: 0 }}>Booking settings</h1>
      <Card title="Notifications" description="Where confirmations are sent" actions={<Badge tone="success">Active</Badge>}
        footer={<><Button variant="secondary">Cancel</Button><Button>Save changes</Button></>}>
        <Field label="Email" hint="We'll send booking confirmations here." htmlFor="email">
          <Input id="email" type="email" placeholder="you@clinic.com" />
        </Field>
      </Card>
    </main>
  );
}
```
