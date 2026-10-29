# Toast

Brief feedback after an action ("Project archived"). Past tense, no exclamation marks; offer Undo when reversible.

```tsx
// once, at the app root
<ToastProvider>{app}</ToastProvider>

// anywhere inside it
const { toast } = useToast();
toast({ tone: "success", title: "Changes saved" });
toast({ title: "Project archived", description: "Brand refresh moved to Archive.", action: { label: "Undo", onClick: undo } });
```

- Shows bottom-left, 24px from the edges, on the dark inverse surface; `tone` changes only the icon.
- Auto-dismisses after `duration` (5s), paused while hovered or focused so Undo stays reachable.
- Danger toasts are `role="alert"`; the rest are `role="status"`.
- Errors the user must fix stay inline next to the field, not in a toast.
