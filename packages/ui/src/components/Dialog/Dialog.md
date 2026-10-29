# Dialog

Modal for focused tasks and confirmations. The title states the action as a question or verb phrase; the primary button repeats the verb.

```tsx
<Dialog open={open} onClose={close} destructive title="Archive this project?"
  description="It will be hidden from the sidebar. You can restore it any time."
  footer={<><Button variant="secondary" onClick={close}>Cancel</Button><Button onClick={archive}>Archive project</Button></>} />
```

- Provide `open`, `onClose`, `title`, and actions in `footer` (primary last). `width` defaults to 480px.
- `destructive` turns off scrim-click dismissal so a stray click can't confirm or lose the choice; Esc still closes.
- Built on Radix Dialog: focus trap, initial focus, body-scroll lock, focus returns to the trigger. `DialogTrigger` and `DialogClose` are re-exported.
- Only for destructive or irreversible confirmations and short focused tasks; everything else edits inline.
