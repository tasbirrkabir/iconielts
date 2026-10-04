import { cn } from "@/lib/utils";

/**
 * ICON English Center wordmark — inspired by the academy's real branding:
 * a bold "ICON" logotype with a book/pages mark and the red label box.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center rounded-xl bg-brand text-white shadow-lg shadow-brand/30",
        className
      )}
      aria-hidden="true"
    >
      {/* open book / pages mark */}
      <svg viewBox="0 0 24 24" fill="none" className="h-[62%] w-[62%]">
        <path
          d="M12 6.5C10.4 5.2 8.3 4.6 5.5 4.6c-.8 0-1.5.6-1.5 1.4v9.6c0 .8.7 1.4 1.5 1.4 2.8 0 4.9.6 6.5 1.9 1.6-1.3 3.7-1.9 6.5-1.9.8 0 1.5-.6 1.5-1.4V6c0-.8-.7-1.4-1.5-1.4-2.8 0-4.9.6-6.5 1.9Z"
          fill="currentColor"
          opacity="0.92"
        />
        <path
          d="M12 6.5v12.4"
          stroke="currentColor"
          className="text-brand"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function Logo({
  className,
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-10 w-10" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.35rem] font-extrabold tracking-tight",
            dark ? "text-white" : "text-ink"
          )}
        >
          iCON
        </span>
        <span className="mt-1 w-max rounded-[4px] bg-brand px-1.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-white">
          English Center
        </span>
      </span>
    </span>
  );
}
