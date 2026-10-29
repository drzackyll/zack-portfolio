# Tabs

Tabs for switching between sibling views of the same object; pair each panel with a `TabsPanel`.

```tsx
<Tabs items={[{ id: "all", label: "All", count: 12 }, { id: "mine", label: "Assigned to me", count: 4 }]}
  value={tab} onValueChange={setTab} />
<TabsPanel value="all" activeValue={tab}>…</TabsPanel>
<TabsPanel value="mine" activeValue={tab}>…</TabsPanel>
```

- Provide `items`, the selected `value` and `onValueChange`. `TabsPanel` takes its own tab id as `value` and the selected id as `activeValue`.
- `underline` (default) for page-level sections; `pill` for compact segmented views (Week / Month / Quarter).
- Keyboard: roving tabindex, ←/→ and Home/End move and activate.
