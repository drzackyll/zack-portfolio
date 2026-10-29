# Field

Wraps a control with a label above and hint or error text below; Input, Select and Textarea already use it.

```tsx
<Field label="Team name" hint="Visible to everyone in the workspace" htmlFor="team" descriptionId="team-hint">
  <input id="team" aria-describedby="team-hint" />
</Field>
```

- Use it directly only for a custom control. Pass `htmlFor` (the control's id) and `descriptionId`, and point the control's `aria-describedby` at that id.
- `error` replaces `hint` and turns danger-coloured.
- `required` adds a visual asterisk only — set `required` on the control too.
