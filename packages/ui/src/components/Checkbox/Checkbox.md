# Checkbox

Checkbox for independent on/off options and multi-select lists inside forms that have a Save step.

```tsx
<Checkbox checked={on} onCheckedChange={setOn} label="Email me weekly summaries" description="Sent Monday mornings" />
<Checkbox indeterminate label="Select all" />
```

- Controlled with `checked` + `onCheckedChange`, or uncontrolled with `defaultChecked`.
- `indeterminate` shows a dash for a partly selected group.
- For a setting that applies immediately, use Switch.
