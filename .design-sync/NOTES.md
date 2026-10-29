# design-sync notes — Zyne (@zyne/ui)

## Environment
- [GENERAL] pnpm is only installed under nvm Node 20 (`~/.nvm/versions/node/v20.16.0/bin`); the nvm default may be v24 without pnpm. Prefix PATH before running `buildCmd` or storybook builds.
- [GENERAL] `@zyne/ui` has no JS build: `main` points at `src/index.ts`. The converter bundles the TS source directly (`cfg.entry`), so `[DTS] parsed 0 .d.ts files` is expected; props come from the `.tsx` source.

## Fixes
- [GENERAL] No CSS in the bundle: `src/styles.css` is Tailwind v4 *source*, and Storybook (vite) loads its compiled CSS from JS, so `[CSS_FROM_STORYBOOK]` finds no `<link>` to scrape → `[CSS_PLACEHOLDER]`. Fix: `build:css` script in packages/ui (`@tailwindcss/cli` → `dist/zyne.css`, gitignored), `cfg.cssEntry: "dist/zyne.css"`, `cfg.buildCmd`.
- [GENERAL] **Run `buildCmd` after any story/component edit, before the converter.** Tailwind only emits classes it finds in source; a stale `dist/zyne.css` silently drops new classes (Icon `Common` story rendered one-per-row until `grid-cols-6` was compiled).
- [GENERAL] `! preview decorator bundle failed: Could not resolve "tailwindcss"` is expected and harmless: `.storybook/preview.tsx` imports `../src/styles.css`. Its decorators only set `data-theme="light"` (the `:root` default anyway) and add a padded `bg-canvas` frame; `base.css` already styles `body` with canvas/text/font, so no `cfg.provider` is needed.
- [GENERAL] Framing difference to ignore when grading: storybook uses `layout: "centered"` (shrink-wraps + tinted padded canvas); preview cells are full-width white. Stretchy children (Field's bare input, Icon grid) render wider in previews.
- Dialog: every story was a closed "Open dialog" trigger (`[RENDER_THIN]`). Added an `Open` story (`Demo defaultOpen`) to `Dialog.stories.tsx`; `cardMode: "single"`, `primaryStory: "Open"`. Storybook's capture crops the portalled dialog — grade the preview side on its own.
- Menu: portalled (`[GRID_OVERFLOW] escape`) → `cardMode: "single"`, `primaryStory: "Open"`.
- Button/Badge/Tabs: `[GRID_OVERFLOW] wide` → `cardMode: "column"`.
- Icon: had no stories, so it wasn't synced. Added `Icon.stories.tsx` (Display/Icon). `[DTS_STYLE_SYSTEM]` filtered `color`/`strokeWidth` from LucideProps → hand-written `cfg.dtsPropsFor.Icon`.
- Tooltip: no open-state API (Radix Root is internal, no `open`/`defaultOpen` prop), so its card shows only triggers. Exposing `defaultOpen` would be a component API change — not done.
- [GENERAL] Run `compare.mjs` / `resync.mjs` **outside the shell sandbox**. Sandboxed, chromium couldn't reach fonts.googleapis.com (`[ASSETS_BLOCKED]`), and storybook's own CSS preload flaked (`sb-error: Unable to preload CSS`). Both panels then fall back to the same wrong font, and grades falsely pass.
- Toast: `cardMode: "single"`, `primaryStory: "Static"`. The other stories are "Show toast" trigger buttons.
- `guidelinesGlob: ["README.md"]` ships the package README (the Zyne brand book) as `guidelines/README.md`. `readmeHeader` points at `.design-sync/conventions.md`.

## Known validate/compare output (triaged — not new)
- `! preview decorator bundle failed: Could not resolve "tailwindcss"`: expected (see above).
- `[FONT_REMOTE]`: fonts come from the Google Fonts `@import` at the top of `dist/zyne.css`; intended.
- `[REFERENCE_STALE?]` after a CSS-only rebuild: harmless when only `dist/zyne.css` changed. Rebuild sb-reference whenever stories or components change.

## Re-sync risks
- `dist/zyne.css` and `.design-sync/sb-reference` must be rebuilt together with any story or component change. A stale CSS drops new Tailwind classes silently; a stale reference grades against the old design.
- The design agent only gets the Tailwind classes compiled from Zyne's own source. `conventions.md` tells it to style its own layout with `var(--token)` inline styles. If token names change in `src/tokens/*.css`, re-validate the token table in `conventions.md`.
- `cfg.dtsPropsFor.Icon` is hand-written. Update it if `IconProps` changes.
- Stories added for the sync (`Icon.stories.tsx`, `Dialog` `Open`) live in the repo. If they're renamed, update `overrides.Dialog.primaryStory`.
- `Tooltip` previews show only triggers: there's no open-state API. Verified closed-state only.
- Grading used the default 6-story cap except in the 15-component batch (`--max-stories 10`). Button's 7th and 8th stories were never individually graded.
- Toolchain at first sync: Node 20.16, pnpm 9.15.9, Tailwind 4.3.3, Storybook 8.6, React 18.3.
