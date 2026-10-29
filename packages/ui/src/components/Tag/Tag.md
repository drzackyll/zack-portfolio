# Tag

Square-ish chip (5px radius) for filters and removable labels — distinct from the pill-shaped Badge, which is read-only status.

```tsx
<Tag selected={on} onClick={toggle}>Design</Tag>
<Tag icon="user" onRemove={remove}>Amara Okafor</Tag>
<Tag>Static label</Tag>
```

- With `onClick` it is a toggle button (`aria-pressed` from `selected`); without it, a static label.
- `onRemove` adds a trailing remove button named "Remove {children}"; pass `label` when the children aren't plain text.
