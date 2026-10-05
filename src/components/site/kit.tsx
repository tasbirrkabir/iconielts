"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

/* ================================================================== */
/*  Editorial kit — shared design primitives for the whole site.      */
/*  Language: paper #F3EFE4 · ink #1A1512 · structural red #E31E24    */
/*  Sharp corners · 1px rules · numbered sections · index rows        */
/* ================================================================== */

/* ---- Page shell: centered column with visible side rules ---------- */
export function Shell({
  children,
  className,
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full border-x border-ink/15",
        wide ? "max-w-[1400px]" : "max-w-[1200px]",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ---- Kicker: small-caps mono-feel label with square bullet -------- */
export function Kicker({
  children,
  className,
  tone = "ink",
}: {
  children: ReactNode;
  className?: string;
  tone?: "ink" | "paper" | "brand";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.22em]",
        tone === "ink" && "text-ink-soft",
        tone === "paper" && "text-paper/70",
        tone === "brand" && "text-brand",
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "inline-block h-[7px] w-[7px]",
          tone === "brand" ? "bg-brand" : "bg-current"
        )}
      />
      {children}
    </span>
  );
}

/* ---- SectionHead: numbered prospectus section header -------------- */
export function SectionHead({
  no,
  bn,
  en,
  title,
  lede,
  className,
  tone = "ink",
}: {
  no: string; // e.g. "01"
  bn?: string; // Bengali eyebrow
  en?: string; // English eyebrow (fallback)
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
  tone?: "ink" | "paper";
}) {
  const paper = tone === "paper";
  return (
    <div className={cn("border-t-2 pt-5", paper ? "border-paper/80" : "border-ink", className)}>
      <Reveal>
        <div
          className={cn(
            "flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1",
            paper ? "text-paper/70" : "text-ink-soft"
          )}
        >
          <span className="font-display text-sm font-semibold tracking-[0.18em]">
            {bn ? (
              <span className="font-bn-serif text-[13px] font-medium">{bn}</span>
            ) : null}
            {bn && en ? <span className="mx-2 text-ink-faint">/</span> : null}
            {en}
          </span>
          <span
            className={cn(
              "font-display text-xs font-bold tracking-[0.3em]",
              paper ? "text-paper" : "text-ink"
            )}
          >
            § {no}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <h2
          className={cn(
            "font-display mt-4 text-balance text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl lg:text-[2.9rem]",
            paper ? "text-paper" : "text-ink"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {lede ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "mt-4 max-w-2xl text-[15px] leading-relaxed",
              paper ? "text-paper/70" : "text-ink-soft"
            )}
          >
            {lede}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/* ---- Btn: sharp editorial button ---------------------------------- */
export function Btn({
  children,
  onClick,
  href,
  variant = "solid",
  size = "md",
  className,
  arrow = true,
  external,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "solid" | "outline" | "paper" | "ghost-paper";
  size?: "sm" | "md" | "lg";
  className?: string;
  arrow?: boolean;
  external?: boolean;
}) {
  const styles = cn(
    "group/btn inline-flex cursor-pointer items-center justify-center gap-3 font-sans font-bold uppercase tracking-[0.14em] transition-colors duration-200 select-none",
    size === "sm" && "px-4 py-2.5 text-[11px]",
    size === "md" && "px-6 py-3.5 text-xs",
    size === "lg" && "px-8 py-4 text-[13px]",
    variant === "solid" &&
      "bg-brand text-paper shadow-[4px_4px_0_0_#1a1512] hover:bg-ink hover:shadow-[4px_4px_0_0_#e31e24]",
    variant === "outline" &&
      "border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
    variant === "paper" &&
      "border-2 border-paper bg-paper text-ink hover:bg-brand hover:border-brand hover:text-paper",
    variant === "ghost-paper" &&
      "border-2 border-paper/40 bg-transparent text-paper hover:border-paper hover:bg-paper hover:text-ink",
    className
  );
  const inner = (
    <>
      {children}
      {arrow ? (
        variant === "solid" ? (
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
        ) : (
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        )
      ) : null}
    </>
  );
  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles}>
        {inner}
      </a>
    ) : (
      <a href={href} className={styles}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={styles}>
      {inner}
    </button>
  );
}

/* ---- IndexRow: full-width hover-invert list row -------------------- */
export function IndexRow({
  no,
  title,
  meta,
  right,
  onClick,
  className,
}: {
  no: string;
  title: ReactNode;
  meta?: ReactNode;
  right?: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group/row grid w-full cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-x-4 border-t border-ink/15 py-5 text-left transition-colors duration-200 hover:bg-ink sm:gap-x-6 sm:py-6",
        className
      )}
    >
      <span className="font-display w-8 text-sm font-bold tracking-wider text-brand sm:w-12 sm:text-base">
        {no}
      </span>
      <span className="min-w-0">
        <span className="font-display block truncate text-lg font-semibold leading-tight text-ink transition-colors group-hover/row:text-paper sm:text-2xl">
          {title}
        </span>
        {meta ? (
          <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint transition-colors group-hover/row:text-paper/60">
            {meta}
          </span>
        ) : null}
      </span>
      <span className="flex items-center gap-3 text-ink-faint transition-colors group-hover/row:text-paper">
        {right}
        <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover/row:translate-x-1 group-hover/row:-translate-y-1 sm:h-6 sm:w-6" />
      </span>
    </button>
  );
}

/* ---- Frame: printed photo frame with caption bar ------------------- */
export function Frame({
  src,
  alt,
  caption,
  ratio = "4/3",
  className,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  caption?: string;
  ratio?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure className={cn("bg-card border border-ink/20", className)}>
      <div className="relative overflow-hidden" style={{ aspectRatio: ratio }}>
        { }
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className="img-print h-full w-full object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="flex items-center justify-between gap-3 border-t border-ink/20 bg-paper-deep/60 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft">
          <span className="truncate">{caption}</span>
          <span aria-hidden className="text-brand">
            ■
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}

/* ---- Stamp: rotated rubber stamp ----------------------------------- */
export function Stamp({
  children,
  className,
  tone = "brand",
}: {
  children: ReactNode;
  className?: string;
  tone?: "brand" | "paper" | "ink";
}) {
  return (
    <span
      className={cn(
        "stamp text-xs",
        tone === "brand" && "text-brand",
        tone === "paper" && "text-paper",
        tone === "ink" && "text-ink",
        className
      )}
    >
      {children}
    </span>
  );
}

/* ---- Marquee: red ticker strip ------------------------------------- */
export function Ticker({
  items,
  slow = false,
  className,
}: {
  items: ReactNode[];
  slow?: boolean;
  className?: string;
}) {
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {items.map((it, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span className="px-6 text-[13px] font-bold uppercase tracking-[0.2em]">{it}</span>
          <span aria-hidden className="text-[10px] opacity-70">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
  return (
    <div
      className={cn(
        "relative flex overflow-hidden border-y-2 border-ink bg-brand py-3 text-paper select-none",
        className
      )}
    >
      <div className={cn("flex", slow ? "animate-marquee-slow" : "animate-marquee")}>
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}

/* ---- StatBlock: oversized ledger figure ----------------------------- */
export function StatBlock({
  value,
  label,
  sub,
  className,
}: {
  value: ReactNode;
  label: string;
  sub?: string;
  className?: string;
}) {
  return (
    <div className={cn("px-5 py-8 sm:px-8 sm:py-10", className)}>
      <div className="font-display text-4xl font-semibold leading-none tracking-tight text-brand sm:text-5xl lg:text-6xl">
        {value}
      </div>
      <div className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
        {label}
      </div>
      {sub ? <div className="mt-1 text-xs text-ink-faint">{sub}</div> : null}
    </div>
  );
}

/* ---- RuleRow: label/value ledger line ------------------------------- */
export function RuleRow({
  label,
  value,
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-dashed border-ink/25 py-3",
        className
      )}
    >
      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-faint">
        {label}
      </span>
      <span className="text-right text-sm font-semibold text-ink">{value}</span>
    </div>
  );
}

/* ---- PageHead: big editorial page title block ------------------------ */
export function PageHead({
  no,
  bn,
  title,
  lede,
  meta,
}: {
  no: string;
  bn: string;
  title: ReactNode;
  lede?: ReactNode;
  meta?: { label: string; value: string }[];
}) {
  return (
    <header className="relative border-b-2 border-ink bg-paper">
      <div className="bg-ledger pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1200px] border-x border-ink/15 px-4 py-14 sm:px-6 sm:py-20">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <Kicker>
              <span className="font-bn-serif text-[13px] font-medium normal-case tracking-[0.08em]">
                {bn}
              </span>
            </Kicker>
            <span className="font-display text-xs font-bold tracking-[0.3em] text-ink-soft">
              § {no}
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.07}>
          <h1 className="font-display mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-5xl lg:text-7xl">
            {title}
          </h1>
        </Reveal>
        {lede ? (
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-soft sm:text-base">
              {lede}
            </p>
          </Reveal>
        ) : null}
        {meta && meta.length > 0 ? (
          <Reveal delay={0.2}>
            <dl className="mt-10 grid grid-cols-2 border-t border-ink/20 sm:grid-cols-4">
              {meta.map((m, i) => (
                <div
                  key={m.label}
                  className={cn(
                    "border-ink/20 py-4 pr-4",
                    i !== 0 && "sm:border-l sm:pl-5",
                    i === 2 && "border-t sm:border-t-0",
                    i === 3 && "border-t sm:border-t-0 sm:border-l sm:pl-5"
                  )}
                >
                  <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-faint">
                    {m.label}
                  </dt>
                  <dd className="font-display mt-1.5 text-base font-semibold text-ink">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}

/* re-export for convenience */
export { Reveal };
