# Spinner

Small loading indicator for inline or in-button waits under ~3s; use skeleton layouts for page loads.

```tsx
<Spinner label="Loading bookings" />
<Button loading>Save changes</Button>
```

- Inherits text colour. Announces `label` (default "Loading") via `role="status"`; set `decorative` when something else already announces the wait.
- If a button started the work, use `Button loading` instead.
