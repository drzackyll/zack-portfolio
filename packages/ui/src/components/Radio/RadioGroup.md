# RadioGroup

Fieldset that groups Radio options for picking exactly one of 2–5 visible choices; prefer it over hand-placed Radios so the legend and name are always wired.

```tsx
<RadioGroup name="buffer" legend="Buffer between sessions" value={buffer} onValueChange={setBuffer}>
  <Radio value="0" label="None" />
  <Radio value="15" label="15 minutes" />
</RadioGroup>
```

- Provide `name`, `legend`, the selected `value` and `onValueChange`; the children are Radios.
- 6+ options, or tight space → Select.
