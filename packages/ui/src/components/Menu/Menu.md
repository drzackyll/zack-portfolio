# Menu

Overflow/action menu behind a "More" button — for secondary actions that don't deserve a visible button. Put destructive items last, after a separator.

```tsx
<Menu label="Booking actions" align="end"
  trigger={<IconButton icon="ellipsis" label="More actions" />}
  items={[
    { label: "Reschedule", icon: "refresh-cw", onSelect: reschedule },
    { label: "Copy email", icon: "copy", shortcut: "⌘C", onSelect: copy },
    { type: "separator" },
    { label: "Cancel booking", icon: "calendar-x", danger: true, onSelect: cancel },
  ]} />
```

- `trigger` must be a single element that forwards its ref and props (Button, IconButton).
- Up to two actions → visible Buttons instead.
- Built on Radix DropdownMenu: ↑/↓/Home/End move, Enter selects, Esc closes and returns focus.
