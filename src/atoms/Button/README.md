# Button

Existing theme, action, text, children, type and isDisabled props remain supported.

- rounded: boolean (default false), enables 6px radius via --button-radius.
- outline: boolean (default false), uses theme outline.
- icon: ReactNode, decorative icon.
- iconPosition: start (default) or end.
- ariaLabel: accessible name for icon-only controls (or supply title).

```tsx
<Button theme="cta" text="Salvar" rounded />
<Button theme="cta" text="Cancelar" outline rounded />
<Button theme="cta" text="Novo" outline rounded icon={<Plus />} />
<Button theme="cta" icon={<Plus />} ariaLabel="Adicionar" outline />
```

All eight combinations of rounded, outline and icon presence are supported.
Check each combination with neutral, cta and cancel, including hover, keyboard focus and disabled states.
