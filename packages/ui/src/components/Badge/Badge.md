# Badge

Pill status label for states like "Active", "Overdue", "Draft". Soft by default; solid only for counts or single high-priority flags.

```tsx
<Badge tone="success" dot>Active</Badge>
<Badge tone="accent" variant="solid">3</Badge>
```

- Tones: `neutral` (default), `accent`, `success`, `warning`, `danger`, `info`.
- Always give it a text label — colour and the dot are never the only signal.
- Read-only. For filters or removable labels, use Tag.
