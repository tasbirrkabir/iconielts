"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/** Consistent eyebrow + title + lead used at the top of every section. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  dark = false,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  align?: "center" | "left";
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-10 flex flex-col gap-4 sm:mb-14",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <span
        className={cn(
          "inline-flex w-max items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em]",
          dark
            ? "border-white/15 bg-white/5 text-gold-bright"
            : "border-brand/20 bg-brand-soft text-brand"
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {eyebrow}
      </span>
      <h2
        className={cn(
          "font-display text-3xl font-extrabold leading-[1.12] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
            dark ? "text-white/65" : "text-muted-foreground"
          )}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
