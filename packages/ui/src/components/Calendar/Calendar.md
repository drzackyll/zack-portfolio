# Calendar

Inline month calendar for picking a single date — the core of booking flows. Available days are tinted; unavailable days are plain text.

```tsx
<Calendar value={day} onChange={setDay} today={today} min={today} max={inTwoMonths}
  isDateDisabled={(d) => !slotsFor(d).length}
  getDayDescription={(d) => `${slotsFor(d).length} times available`} />
```

- Always pass `getDayDescription` when availability varies — colour alone doesn't tell screen-reader users which days are open.
- `min` and `max` limit both selection and month navigation; `weekStartsOn` is Monday (1) by default.
- Keyboard: ←/→ ±1 day, ↑/↓ ±1 week, Home/End week edges, PageUp/PageDown month. Disabled days stay focusable so keyboard users can move past them.
