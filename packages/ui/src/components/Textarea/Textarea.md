# Textarea

Multi-line input for notes and messages; use Input for anything that fits on one line.

```tsx
<Textarea label="Anything Lena should know?" placeholder="Optional" maxLength={500} showCount />
```

- Accepts every native `<textarea>` prop, plus `label`, `hint`, `error` and `errorAnnounced` like Input.
- `showCount` shows "n / max" under the field and needs `maxLength`.
