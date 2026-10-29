# Radio

Single radio option — normally rendered inside RadioGroup; use it on its own only for custom layouts.

```tsx
<RadioGroup name="billing" legend="Billing" value={plan} onValueChange={setPlan}>
  <Radio value="monthly" label="Monthly" />
  <Radio value="yearly" label="Yearly" description="Two months free" />
</RadioGroup>
```

- Inside a RadioGroup, a Radio takes its `name` and checked state from the group; pass only `value`, `label` and an optional `description`.
- On its own, give every Radio in the set the same `name`, manage `checked` yourself, and wrap the set in a `<fieldset>` with a `<legend>`.
