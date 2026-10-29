# Button

Text button for actions — primary for the single main action, secondary for alternatives, ghost for low-emphasis/toolbar, danger for destructive confirmation.

```tsx
<Button variant="primary" iconLeft="plus">New project</Button>
<Button variant="secondary">Cancel</Button>
<Button loading>Save changes</Button>
<Button asChild variant="secondary"><a href="/zyne">View the system</a></Button>
```

- Provide the label as children; `iconLeft` / `iconRight` take Lucide names. Sizes: `sm` 30px, `md` 36px (default), `lg` 44px for touch.
- One primary button per view region.
- Sentence-case verb labels ("Save changes", not "SAVE" or "Submit").
- If the button started the work, use `loading` (keeps its width, sets `aria-busy`, blocks clicks) rather than a separate Spinner.
- Use `asChild` to render a link with button styling; never put a `<button>` inside an `<a>`.
- Hover darkens one step; press darkens two. No scale/shrink.
