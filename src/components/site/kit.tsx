"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { Counter } from "./counter";

export { Reveal };

/* ================================================================== */
/*  Quiet Studio — shared primitives for every page                    */
/*  One warm paper canvas, soft ink, a single red accent.             */
/* ================================================================== */

/* ------------------------------------------------------------------ */
/*  Layout                                                             */
/* ------------------------------------------------------------------ */

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1080px] px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Type pieces                                                        */
/* ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  tone = "ink",
  className,
}: {
  children: ReactNode;
  tone?: "ink" | "paper";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em]",
        tone === "ink" ? "text-ink-soft" : "text-paper/60",
        className
      )}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
      />
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "ink",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  align?: "left" | "center";
  tone?: "ink" | "paper";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "font-display mt-5 text-balance text-3xl font-medium leading-[1.08] tracking-[-0.01em] sm:text-4xl md:text-[2.75rem]",
          tone === "ink" ? "text-ink" : "text-paper"
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            tone === "ink" ? "text-ink-soft" : "text-paper/60"
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Buttons & links                                                    */
/* ------------------------------------------------------------------ */

type BtnVariant =
  | "solid"
  | "brand"
  | "outline"
  | "paper"
  | "outline-paper";

const btnVariants: Record<BtnVariant, string> = {
  solid:
    "bg-ink text-paper hover:bg-brand focus-visible:outline-brand",
  brand:
    "bg-brand text-paper hover:bg-brand-deep focus-visible:outline-brand",
  outline:
    "border border-hairline bg-transparent text-ink hover:border-ink hover:bg-sand/60",
  paper:
    "bg-paper text-ink hover:bg-sand focus-visible:outline-paper",
  "outline-paper":
    "border border-paper/30 bg-transparent text-paper hover:border-paper/80 hover:bg-paper/5",
};

const btnSizes = {
  sm: "px-5 py-2.5 text-[13px]",
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-[15px]",
};

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant;
  size?: keyof typeof btnSizes;
  href?: string;
  external?: boolean;
}

export function Btn({
  variant = "solid",
  size = "md",
  href,
  external = false,
  className,
  children,
  ...rest
}: BtnProps) {
  const cls = cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-medium tracking-[0.01em] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
    btnVariants[variant],
    btnSizes[size],
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

export function ArrowLink({
  label,
  href,
  onClick,
  tone = "ink",
  className,
}: {
  label: string;
  href?: string;
  onClick?: () => void;
  tone?: "ink" | "paper";
  className?: string;
}) {
  const inner = (
    <>
      <span className="link-underline">{label}</span>
      <ArrowRight
        aria-hidden
        className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
      />
    </>
  );
  const cls = cn(
    "group inline-flex cursor-pointer items-center gap-2 text-sm font-medium",
    tone === "ink" ? "text-ink" : "text-paper",
    className
  );
  if (href) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Media                                                              */
/* ------------------------------------------------------------------ */

export function Figure({
  src,
  alt,
  ratio = "aspect-[4/3]",
  caption,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  ratio?: string;
  caption?: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <figure className={cn("min-w-0", className)}>
      <div className={cn("overflow-hidden rounded-2xl bg-sand", ratio)}>
        { }
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={cn(
            "img-soft h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]",
            imgClassName
          )}
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-xs tracking-[0.04em] text-ink-faint">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/*  Numbers                                                            */
/* ------------------------------------------------------------------ */

export function Stat({
  value,
  suffix,
  label,
  tone = "ink",
  className,
}: {
  value: number | string;
  suffix?: string;
  label: string;
  tone?: "ink" | "paper";
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <div
        className={cn(
          "font-display text-4xl font-medium leading-none tracking-[-0.01em] sm:text-[2.75rem]",
          tone === "ink" ? "text-ink" : "text-paper"
        )}
      >
        {typeof value === "number" ? (
          <Counter value={value} suffix={suffix ?? ""} />
        ) : (
          <>
            {value}
            {suffix}
          </>
        )}
      </div>
      <div
        className={cn(
          "mt-3 text-[11px] font-medium uppercase tracking-[0.18em]",
          tone === "ink" ? "text-ink-faint" : "text-paper/50"
        )}
      >
        {label}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Chips                                                             */
/* ------------------------------------------------------------------ */

export function Chip({
  children,
  tone = "ink",
  className,
}: {
  children: ReactNode;
  tone?: "ink" | "paper" | "brand";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium tracking-[0.06em]",
        tone === "ink" && "border-hairline bg-card text-ink-soft",
        tone === "paper" && "border-paper/25 bg-transparent text-paper/70",
        tone === "brand" && "border-brand/20 bg-brand-tint text-brand-deep",
        className
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page header — quiet inner-page hero                                */
/* ------------------------------------------------------------------ */

export function PageHead({
  eyebrow,
  title,
  lede,
  meta,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  meta?: { label: string; value: string }[];
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-hairline">
      <Container className="pb-14 pt-16 sm:pb-16 sm:pt-20 md:pb-20 md:pt-28">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="font-display mt-6 max-w-3xl text-balance text-4xl font-medium leading-[1.04] tracking-[-0.015em] text-ink sm:text-5xl md:text-6xl">
            {title}
          </h1>
        </Reveal>
        {lede ? (
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {lede}
            </p>
          </Reveal>
        ) : null}
        {meta && meta.length > 0 ? (
          <Reveal delay={0.2}>
            <dl className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              {meta.map((m, i) => (
                <div
                  key={m.label}
                  className={cn(
                    "flex flex-col gap-1",
                    i > 0 && "border-l border-hairline pl-8"
                  )}
                >
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
                    {m.label}
                  </dt>
                  <dd className="text-sm font-medium text-ink">{m.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ) : null}
        {children}
      </Container>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Closing CTA panel — one calm ink moment per page                   */
/* ------------------------------------------------------------------ */

export function CtaPanel({
  eyebrow,
  title,
  lede,
  bn,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  bn?: string;
  primary: { label: string; onClick?: () => void; href?: string };
  secondary?: { label: string; onClick?: () => void; href?: string };
}) {
  return (
    <section className="pb-20 pt-4 sm:pb-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink px-7 py-14 text-paper sm:px-12 sm:py-16 md:px-16 md:py-20">
            {/* one quiet red dot, top right */}
            <span
              aria-hidden
              className="absolute right-10 top-10 hidden h-2 w-2 rounded-full bg-brand md:block"
            />
            <div className="max-w-xl">
              <Eyebrow tone="paper">{eyebrow}</Eyebrow>
              <h2 className="font-display mt-5 text-balance text-3xl font-medium leading-[1.08] tracking-[-0.01em] sm:text-4xl">
                {title}
              </h2>
              {lede ? (
                <p className="mt-5 text-base leading-relaxed text-paper/60">
                  {lede}
                </p>
              ) : null}
              {bn ? (
                <p className="font-bengali mt-4 text-sm text-paper/40">{bn}</p>
              ) : null}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Btn
                variant="paper"
                size="lg"
                href={primary.href}
                onClick={primary.onClick}
              >
                {primary.label}
                <ArrowRight className="h-4 w-4" />
              </Btn>
              {secondary ? (
                <ArrowLink
                  label={secondary.label}
                  href={secondary.href}
                  onClick={secondary.onClick}
                  tone="paper"
                />
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
