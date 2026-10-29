# IconButton

Icon-only button for toolbars, row actions and dismiss controls; always pass `label`.

```tsx
<IconButton icon="ellipsis" label="More actions" />
<IconButton icon="x" label="Close" size="sm" />
<Tooltip content="Copy link"><IconButton icon="link" label="Copy link" variant="secondary" /></Tooltip>
```

- `label` is required: it is the button's only accessible name, and is also set as `title`.
- Variants: `ghost` (default), `secondary`, `primary`. Sizes match Button: 30 / 36 / 44px.
- For a visible hint on hover and focus, wrap it in `Tooltip`.
