# Zyne Design System

Zyne is a warm, professional, accessibility-first design system: a plum accent, cool plum-tinted neutrals, a serif display face over a sans UI, and full light and dark themes. It was created from scratch from one brief — *"the palette should be accessible; warm and professional; not distracting."* — and its demo product is a scheduling/booking app.

`@zyne/ui` is the production library: React 18 + TypeScript, styled with Tailwind v4 on top of the Zyne CSS variables, Radix primitives for Dialog, Menu and Tooltip, Lucide icons, and Storybook with the a11y addon. This README is the brand book; component usage lives beside each component as `<Name>.md`, and the visual foundations are also in Storybook under **Foundations**.

## Using the library

- Import `@zyne/ui/src/styles.css` once at the app root. It loads the fonts, Tailwind, the tokens (`src/tokens/*.css`), the Tailwind theme mapping (`src/theme.css`) and the base rules, in that order. An app with its own Tailwind entry can import the token files and `theme.css` there instead, as `apps/portfolio` does (it self-hosts the fonts with `next/font`).
- Import components from `@zyne/ui`: `import { Button, Card } from "@zyne/ui"`.
- Wrap the app in `<ToastProvider>` if anything calls `useToast()`.
- Set `data-theme="dark"` on `<html>` (or any container) for the dark theme.
- Tailwind utilities resolve to the CSS variables (`bg-surface-card`, `text-muted`, `border-border-input`, `rounded-md`, `shadow-md`), so theming keeps working at runtime.

## Components

Button, IconButton, Icon, Field, Input, Textarea, Select, Checkbox, Radio, RadioGroup, Switch, Calendar, Card, Badge, Tag, Tabs, TabsPanel, Avatar, Menu, Spinner, Dialog, Toast, Tooltip.

### Intentional additions
No source inventory existed, so the set was sized to the booking product's needs.
- **Icon** — one wrapper for Lucide glyphs so every component shares one icon path.
- **Field** — shared label/hint/error wrapper; owns the `aria-describedby` id.
- **Calendar, Menu, Avatar, Textarea, Spinner** — added because the booking app needed them; anything the demo needs should live in the library, not the app.

## Decisions
Short rationale for the calls that shape everything else.
- **Two token tiers, and components may only use the semantic one.** Primitives (`--plum-600`) describe colour; semantic aliases (`--accent`, `--danger-fg`, `--toast-bg`) describe purpose. Dark mode is then just a re-mapping of semantics in one `[data-theme="dark"]` block, and a grep for `var(--plum-` inside `src/components/` returning nothing is the test.
- **Plum, not blue.** Most SaaS accents are blue; plum reads warm and considered without the "alert" energy of red/orange. At plum-600 it clears 8.6:1 with white, so the accent can carry text, not just fills.
- **Cool, plum-tinted neutrals.** Warm sand fought the plum; neutral greys with a faint plum cast keep the palette coherent and calm.
- **Serif display, sans UI.** Source Serif 4 for titles gives a human, editorial voice to a tool about people's time; Hanken Grotesk keeps the dense UI legible. Display type is only used at ≥22px.
- **Accessibility is in the components, not in a checklist.** Focus traps, roving tabindex, aria wiring and contrast are built into the primitives so product code gets them for free. Each component documents its keyboard contract in its prop types.
- **Status = colour + text.** Every Badge has a label; dots are decorative. Solid status fills use `--{tone}-emphasis` so they flip correctly in dark mode.
- **Native where native is good enough.** Select is a real `<select>`; Radio/Checkbox are real inputs. Custom widgets (Menu, Calendar, Tabs) exist only where native controls can't express the design.

## Choosing components
- **Badge vs Tag** — Badge is read-only status (pill). Tag is interactive: a filter toggle or a removable label (5px radius).
- **Switch vs Checkbox** — Switch applies immediately. Checkbox is part of a form that has a Save/Submit step.
- **RadioGroup vs Select** — 2–5 options that benefit from being visible → RadioGroup. 6+ or space-constrained → Select.
- **Menu vs buttons** — up to two actions → visible Buttons. More, or rarely used → Menu behind an ellipsis IconButton. Destructive items go last, after a separator.
- **Dialog vs inline** — Dialog only for confirmation of destructive/irreversible actions or short focused tasks. Everything else edits inline.
- **Toast vs inline message** — Toast confirms something that already happened (with Undo if reversible). Errors the user must fix stay inline next to the field.
- **Spinner vs Button loading** — if a button started the work, use `Button loading`. Standalone Spinner only for inline regions that are fetching.
- **Card variants** — outlined by default; elevated for a single featured/floating item; sunken for nested or empty panels.

## Responsive
- Breakpoint at **860px**: the sidebar becomes a top bar (56px) + slide-in drawer (min(85vw, 280px)) with scrim; Esc closes, focus returns to the menu button.
- Grids use `repeat(auto-fit, minmax(min(100%, Npx), 1fr))` so they collapse without media queries.
- Public booking page stacks to one column under 760px; time slots become a wrapping grid of 44px targets; the submit button goes full-width.
- Minimum touch target 44px on mobile surfaces, 24px everywhere else.

## Content fundamentals
Voice: a calm, competent colleague. Clear before clever; warm without being chummy.

- **Person:** address the user as *you*; the product speaks as *we* sparingly ("We'll email you when it's ready"). Never "I".
- **Casing:** Sentence case everywhere — buttons, titles, menu items, tabs. ("New project", not "New Project".) Overlines are the only uppercase text, and only via CSS.
- **Buttons:** verb-first, specific. "Save changes", "Archive project", "Send invites". Avoid "OK", "Submit", "Yes".
- **Confirmations:** the dialog title asks the question; the primary button repeats the verb. *"Archive this project?" → [Cancel] [Archive project]*.
- **Feedback:** past tense, no exclamation marks. "Changes saved", "Project archived" + Undo.
- **Errors:** say what happened and how to fix it, no blame. "Enter a valid email address" — not "Invalid input!".
- **Empty states:** one plain sentence, optionally one action. "No projects match these filters."
- **Numbers & dates:** short month names ("Oct 14"), relative where useful ("Today", "Tomorrow"). Mono font for IDs and codes.
- **Emoji:** not used in UI. **Punctuation:** em dashes ok; avoid ALL CAPS and stacked punctuation.
- Greeting tone example: *"Good morning, Amara"* / *"Three items need your review this week. Everything else is on track."*

## Visual foundations
- **Color vibe:** quiet and considered. Canvas is mist-50 `#F8F6F8` (cool, faintly plum-tinted grey), cards pure white, sidebar mist-100. One accent — **Plum** (`--accent` = plum-600 `#6E3A5E`, 8.6:1 with white) — for primary actions, selection, focus and key highlights only. **Pine** (muted green-teal) is a quiet secondary for data/avatars. Semantics are desaturated to sit beside plum.
- **Accessibility:** all body text pairings ≥ 4.5:1 (`--text-muted` 5.8:1 on canvas). `--text-subtle` (3.8:1) is for disabled/decorative text only. Form-control borders use `--border-input` (mist-500) for ≥3:1 non-text contrast. Status is always color + text/dot, never color alone.
- **Type scale in code:** components use the tokens (`--text-ui` 14/20 for controls and list rows, `--text-body-sm` 13/18 for secondary text, `--text-caption` 12/16, `--text-overline` 11/14). Raw px font sizes only appear for the wordmark and Avatar initials (proportional to size).
- **Type:** Source Serif 4 (semibold 600, −1.5% tracking) for page titles, names and display moments — crisp, sturdy serif that adds warmth without fuss. Hanken Grotesk for all UI, headings (600) and body (400). JetBrains Mono for times, IDs and codes. `--weight-display` = 600.
- **Spacing:** 2/4/6/8/12/16/20/24/32/40/48/64/80. Cards pad 20px; page gutters 40–48px; content max 1120px, reading width 680px. Controls 30/36/44px.
- **Backgrounds:** flat colour only. No gradients, patterns, textures, or full-bleed imagery in product UI. Imagery (if added later) should be warm, natural-light, slightly desaturated.
- **Corner radii:** small and consistent — 3 (checkbox), 5 (tags, tooltips), 8 (buttons, inputs), 12 (cards), 16 (dialogs), pill (badges, switches).
- **Cards:** white, 1px `--border-subtle` hairline, `--shadow-xs`, 12px radius. Elevated variant swaps the border for `--shadow-md`. No coloured left-border accents.
- **Borders:** 1px hairlines carry most of the structure; shadows are secondary. Dividers inside cards use `--border-subtle`.
- **Shadows:** plum-grey tinted (`rgba(55,47,55,…)`), low-spread, layered. xs for resting cards, md for hover/elevated, lg for dialogs and toasts. Inputs get a faint inset.
- **Hover:** surfaces shift to mist-100; solid buttons darken one step; interactive cards gain shadow-md. No opacity fades on hover.
- **Press:** darken a second step. No scale/shrink.
- **Focus:** 2px canvas-coloured gap + 2px plum ring (`--focus-ring`, the `focus-ring` utility); inputs use plum border + soft plum-100 halo.
- **Motion:** minimal. 120–260ms (`--duration-fast|base|slow`), `--ease-standard` `cubic-bezier(.2,0,0,1)`; fades and ≤4px rises. No bounce, no parallax. Respects `prefers-reduced-motion`.
- **Transparency & blur:** only the dialog scrim (mist-900 at 44%). No glassmorphism.
- **Layout:** fixed left sidebar (248px, sunken surface), scrolling content. Selected list rows get `--surface-selected` plus a 2px inset accent bar. Toasts bottom-left of content, 24px inset. Dark inverse surface for toasts/tooltips only.

## Token rule
Components reference **semantic aliases only** (`--surface-*`, `--text-*`, `--accent*`, `--{tone}-fg|bg|border|solid|emphasis`, `--toast-*`) — never primitives like `--plum-600`. That's what lets one `[data-theme="dark"]` block re-theme everything. Solid status fills use `--{tone}-emphasis` with `--text-on-emphasis` (white in light, ink in dark).

## Dark mode
Set `data-theme="dark"` on `<html>` (or any container). Only semantic aliases change; components never reference primitives for themed colours. Dark canvas `#171317`, cards `#201B20`, accent flips to plum-300 `#C493B3` with dark text on it (6.6:1). Shadows deepen and gain a faint light hairline so elevation stays legible. All text pairings stay ≥4.5:1; `--border-input` stays ≥3:1 against cards.

## Iconography
- **Set:** [Lucide](https://lucide.dev) (ISC) via `lucide-react`, used through the `Icon` component by kebab-case name. No brand icons were supplied, so **this is a substitution** — swap in the brand's own set if one exists.
- **Rendering:** inline SVG in `currentColor`. Outline style, default 2px stroke, rounded caps.
- **Sizes:** 16px in controls and inline; 18–20px in navigation; 14px in small buttons/tags.
- **Colour:** `--text-muted` at rest, `--text-strong` on hover, `--accent` for the active nav item. Never multi-colour.
- **No emoji, no unicode glyphs as icons**, no icon fonts. Icon-only buttons always carry an accessible label.

## Brand mark
**No logo was provided.** Wherever a mark is needed, "Zyne" is set in Source Serif 4 600, −2% tracking. Do not invent a logo.

## Fonts
All three families are loaded from Google Fonts (`src/tokens/fonts.css`, no local binaries). They're proposals, not supplied brand fonts — replace if Zyne has licensed typefaces.
