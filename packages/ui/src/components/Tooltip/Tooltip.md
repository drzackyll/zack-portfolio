# Tooltip

Hover/focus hint for icon buttons and truncated text; keep it under ~6 words.

```tsx
<Tooltip content="Copy link"><IconButton icon="link" label="Copy link" /></Tooltip>
```

- The child must be a single element that forwards props (Button, IconButton, native elements).
- Opens after 300ms on hover, immediately on focus; Esc dismisses. Plain text only — never put essential information only in a tooltip.
