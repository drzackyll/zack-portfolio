import * as React from "react";
import { createPortal } from "react-dom";
import { Icon } from "../Icon/Icon";
import { cn } from "../../lib/cn";

export interface ToastActionConfig {
  label: string;
  onClick: () => void;
}

export interface ToastProps {
  /** Sets the icon only — the surface always stays inverse. @default "neutral" */
  tone?: "neutral" | "success" | "warning" | "danger";
  title: string;
  description?: string;
  action?: ToastActionConfig;
  onClose?: () => void;
  /** Auto-dismiss delay in ms, paused while hovered/focused. @default 5000 */
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

const TONE_ICON: Record<NonNullable<ToastProps["tone"]>, string> = {
  neutral: "info",
  success: "circle-check",
  warning: "triangle-alert",
  danger: "circle-alert",
};

const TONE_ICON_CLASS: Record<NonNullable<ToastProps["tone"]>, string> = {
  neutral: "text-[var(--mist-300)]",
  success: "text-[var(--green-200)]",
  warning: "text-[var(--amber-200)]",
  danger: "text-[var(--red-200)]",
};

/**
 * Transient confirmation on the inverse surface. Auto-dismisses after
 * `duration`, pausing while hovered or focused (so an Undo action stays
 * reachable). Danger toasts are `role="alert"`; everything else is
 * `role="status"`.
 */
export function Toast({
  tone = "neutral",
  title,
  description,
  action,
  onClose,
  duration = 5000,
  className,
  style,
}: ToastProps) {
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>();

  const clearTimer = React.useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const startTimer = React.useCallback(() => {
    clearTimer();
    if (onClose) timerRef.current = setTimeout(onClose, duration);
  }, [clearTimer, duration, onClose]);

  React.useEffect(() => {
    startTimer();
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      onMouseEnter={clearTimer}
      onMouseLeave={startTimer}
      onFocus={clearTimer}
      onBlur={startTimer}
      style={style}
      className={cn(
        "flex w-[360px] max-w-full items-start gap-3 rounded-lg bg-surface-inverse py-3 pl-3.5 pr-3 text-inverse shadow-lg",
        className,
      )}
    >
      <Icon name={TONE_ICON[tone]} size={18} className={cn("mt-px flex-none", TONE_ICON_CLASS[tone])} />
      <div className="min-w-0 flex-1">
        <div className="font-sans text-sm font-semibold leading-5">{title}</div>
        {description && (
          <div className="mt-0.5 font-sans text-[13px] leading-[18px] text-[var(--mist-300)]">{description}</div>
        )}
      </div>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="flex-none px-1 font-sans text-[13px] font-semibold leading-5 text-[var(--plum-200)]"
        >
          {action.label}
        </button>
      )}
      {onClose && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onClose}
          className="inline-flex flex-none p-0.5 text-[var(--mist-400)]"
        >
          <Icon name="x" size={16} />
        </button>
      )}
    </div>
  );
}

export interface ToastOptions extends Omit<ToastProps, "onClose"> {}

interface ToastRecord extends ToastOptions {
  id: string;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a <ToastProvider>");
  return context;
}

export function ToastProvider({ children }: { children?: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastRecord[]>([]);
  const nextId = React.useRef(0);

  const dismiss = React.useCallback((id: string) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = React.useCallback((options: ToastOptions) => {
    const id = String(nextId.current++);
    setToasts((current) => [...current, { id, ...options }]);
    return id;
  }, []);

  const value = React.useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <div role="region" aria-label="Notifications" className="fixed bottom-6 left-6 z-[var(--z-toast)] flex flex-col gap-2">
            {toasts.map(({ id, ...rest }) => (
              <Toast key={id} {...rest} onClose={() => dismiss(id)} />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}
