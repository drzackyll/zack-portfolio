# Switch

On/off switch for settings that apply immediately; use Checkbox inside forms that have a Save step.

```tsx
<Switch checked={notify} onCheckedChange={setNotify} label="Desktop notifications" />
```

- Controlled with `checked` + `onCheckedChange`, or uncontrolled with `defaultChecked`.
- Renders `role="switch"` with `aria-checked`; the label names it.
