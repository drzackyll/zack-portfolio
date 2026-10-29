# Card

Bordered white panel (12px radius) for grouping related content; the main layout unit on dashboards and settings.

```tsx
<Card title="Usage" description="Last 30 days" actions={<IconButton icon="ellipsis" label="More" size="sm" />}>…</Card>
<Card variant="elevated" title="Invite your team" footer={<Button size="sm">Send invites</Button>}>…</Card>
<Card interactive href="/projects/brand" title="Brand refresh" description="Due Oct 14 · 6 tasks" />
```

- Slots: `title`, `description`, `actions` (header right, usually IconButtons), `footer` (right-aligned, above a hairline), `padding` (default 20).
- Variants: `outlined` by default; `elevated` for a single featured or floating item; `sunken` for nested or empty panels.
- `interactive` with `href` renders a link, with `onClick` a button — never a clickable div.
- No coloured left-border accents.
