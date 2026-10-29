# Avatar

Person marker for lists, headers and account menus. Mark it `decorative` whenever the name is printed beside it.

```tsx
<Avatar name="Dr. Lena Park" />                 {/* LP, labelled */}
<Avatar name="Marcus Webb" size={28} decorative />
<Avatar name="Priya Raman" src={url} tone="accent" />
```

- Initials come from `name` (titles like "Dr." are skipped); `initials` overrides them. A photo in `src` falls back to initials if it fails to load.
- Tone: `secondary` (pine) by default; `accent` to flag "needs attention" (e.g. pending requests); `neutral` for system or unknown.
- Common sizes: 24, 28, 32 (default), 44, 48.
