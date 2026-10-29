# Select

Native dropdown for choosing one of six or more options, or when space is tight; use RadioGroup for 2–5 options that benefit from being visible.

```tsx
<Select label="Role" options={["Owner", "Editor", "Viewer"]} defaultValue="Editor" />
<Select label="Session length" placeholder="Choose a length"
  options={[{ value: "30", label: "30 minutes" }, { value: "60", label: "60 minutes" }]} />
```

- `options` takes strings or `{ value, label }` objects. `placeholder` adds a disabled empty first option.
- It is a real `<select>`, so keyboard and mobile pickers come from the platform.
