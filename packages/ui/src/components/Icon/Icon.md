# Icon

Lucide icon by kebab-case name, rendered as inline SVG in `currentColor` — use for every glyph in Zyne UI.

```tsx
<Icon name="search" size={16} />
<Icon name="circle-alert" size={20} color="var(--danger-fg)" label="Error" />
```

- Decorative by default (`aria-hidden`); pass `label` when the icon carries meaning on its own.
- Sizes: 14 (small buttons, tags), 16 (inline, controls), 18–20 (navigation, empty states).
- An unknown name renders nothing and warns in development.
- No emoji or unicode glyphs as icons.
