# Input

Single-line text input; label sits above, hint or error below. Focus shows a plum border and a soft plum halo.

```tsx
<Input label="Email" placeholder="you@company.com" hint="We'll only use this for receipts." />
<Input label="Email" error="Enter a valid email address" errorAnnounced={submitted} />
<Input icon="search" placeholder="Search clients" size="sm" />
```

- Accepts every native `<input>` prop; the label, hint and error are wired with `aria-describedby` and `aria-invalid` automatically.
- Set `errorAnnounced` once the form has been submitted, so screen readers announce the error.
- Errors say what happened and how to fix it, with no blame.
- Use Textarea for anything that won't fit on one line.
