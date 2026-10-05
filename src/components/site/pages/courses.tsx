"use client";

import {
  Btn,
  Frame,
  Kicker,
  PageHead,
  Reveal,
  RuleRow,
  SectionHead,
  Shell,
  Stamp,
} from "../kit";
import { BRAND, COURSES, type Course, type PageId } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/* ================================================================== */
/*  COURSES — the full prospectus catalog                              */
/* ================================================================== */

export function CoursesPage({
  onNavigate,
  onEnroll,
}: {
  onNavigate: (p: PageId) => void;
  onEnroll: (slug: string) => void;
}) {
  return (
    <>
      <PageHead
        no="03"
        bn="কোর্স ক্যাটালগ"
        title={
          <>
            Every program, every fee, every detail —{" "}
            <em className="italic text-brand">honestly.</em>
          </>
        }
        lede="No hidden charges, no fake countdowns, no 'contact us for pricing'. Here is the entire catalog with the numbers that matter."
        meta={[
          { label: "Programs", value: "6" },
          { label: "Batches", value: "Offline & online" },
          { label: "Instalments", value: "Available" },
          { label: "Diagnostic test", value: "Free" },
        ]}
      />
      <Catalog onEnroll={onEnroll} />
      <CompareTable onEnroll={onEnroll} />
      <DecisionGuide onNavigate={onNavigate} />
      <ClosingSlab onNavigate={onNavigate} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  §01 — Catalog: alternating editorial rows                          */
/* ------------------------------------------------------------------ */

function Catalog({ onEnroll }: { onEnroll: (slug: string) => void }) {
  return (
    <section className="bg-paper">
      <Shell className="px-4 py-16 sm:px-8 sm:py-24">
        <SectionHead
          no="01"
          bn="ক্যাটালগ"
          en="The catalog"
          title={
            <>
              Six programs.
              <br />
              Read them like a <em className="italic text-brand">menu.</em>
            </>
          }
          lede="Each row is a complete program description — duration, workload, fee and what you walk out with."
        />

        <div className="mt-14 space-y-16 sm:space-y-20">
          {COURSES.map((c, i) => (
            <CatalogRow
              key={c.slug}
              c={c}
              index={i}
              onEnroll={onEnroll}
            />
          ))}
        </div>
      </Shell>
    </section>
  );
}

function CatalogRow({
  c,
  index,
  onEnroll,
}: {
  c: Course;
  index: number;
  onEnroll: (slug: string) => void;
}) {
  const flipped = index % 2 === 1;
  return (
    <Reveal>
      <article className="relative border-t-2 border-ink pt-8">
        {/* index number + badge row */}
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <span className="font-display text-5xl font-black leading-none tracking-tight text-brand sm:text-6xl">
            {String(index + 1).padStart(2, "0")}
          </span>
          {c.badge ? (
            <Stamp tone={c.popular ? "brand" : "ink"}>{c.badge}</Stamp>
          ) : null}
        </div>

        <div
          className={cn(
            "mt-6 grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12",
            flipped && "lg:[&>*:first-child]:order-2"
          )}
        >
          {/* text */}
          <div>
            <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
              {c.title}
            </h3>
            <p className="font-display mt-1.5 text-lg italic text-ink-soft">
              {c.subtitle}
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">
              {c.description}
            </p>

            {/* fee + facts */}
            <div className="mt-6 max-w-md border-2 border-ink bg-card">
              <div className="flex items-end justify-between gap-4 border-b border-ink/20 px-5 py-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-faint">
                    Course fee
                  </p>
                  <p className="font-display mt-1 text-3xl font-semibold leading-none text-ink">
                    {c.price}
                  </p>
                </div>
                {c.oldPrice ? (
                  <p className="font-display text-lg font-medium leading-none text-ink-faint line-through decoration-brand decoration-2">
                    {c.oldPrice}
                  </p>
                ) : null}
              </div>
              <div className="px-5 py-2">
                <RuleRow label="Duration" value={c.duration} />
                <RuleRow label="Workload" value={c.classes} />
                <RuleRow label="Format" value="Offline · Live online" className="border-b-0" />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Btn onClick={() => onEnroll(c.slug)}>Enroll in this program</Btn>
              <Btn variant="outline" href={BRAND.whatsappHref} external>
                Ask on WhatsApp
              </Btn>
            </div>
          </div>

          {/* image + checklists */}
          <div className="space-y-6">
            <Frame
              src={c.image}
              alt={`${c.title} — course at ICON English Center`}
              ratio="16/10"
              caption={`Program ${String(index + 1).padStart(2, "0")} — ${c.title}`}
            />
            <div className="grid gap-6 border-2 border-ink bg-card p-5 sm:grid-cols-2 sm:p-6">
              <div>
                <Kicker>What&apos;s inside</Kicker>
                <ul className="mt-3 space-y-2">
                  {c.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-[13px] font-medium leading-snug text-ink"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 bg-brand"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Kicker>You walk out with</Kicker>
                <ul className="mt-3 space-y-2">
                  {c.outcomes.map((o) => (
                    <li
                      key={o}
                      className="flex items-start gap-2.5 text-[13px] font-medium leading-snug text-ink"
                    >
                      <span
                        aria-hidden
                        className="mt-1 font-display inline-block h-1.5 w-1.5 shrink-0 bg-ink"
                      >
                        ✓
                      </span>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  §02 — Comparison table                                             */
/* ------------------------------------------------------------------ */

const BEST_FOR: Record<string, string> = {
  "ielts-full": "Band 5–6 starters with 3 months",
  "ielts-crash": "Test booked within ~30 days",
  "spoken-english": "Freezes when speaking English",
  foundation: "Grammar shaky since school",
  "mock-test": "Know your real level, fast",
  "one-to-one": "Wants a personal plan & mentor",
};

function CompareTable({ onEnroll }: { onEnroll: (slug: string) => void }) {
  return (
    <section className="border-y-2 border-ink bg-paper-deep">
      <Shell className="px-4 py-16 sm:px-8 sm:py-24">
        <SectionHead
          no="02"
          bn="তুলনামূলক ছক"
          en="Side by side"
          title={
            <>
              The whole catalog,
              <br />
              in one <em className="italic text-brand">table.</em>
            </>
          }
          lede="Print it, screenshot it, argue about it — then take the diagnostic test and let the score decide."
        />

        <Reveal delay={0.08}>
          <div className="mt-12 overflow-x-auto nice-scroll">
            <table className="w-full min-w-[820px] border-2 border-ink bg-card text-left">
              <thead>
                <tr className="border-b-2 border-ink bg-ink text-paper">
                  <th className="px-4 py-4 text-[11px] font-bold uppercase tracking-[0.18em] sm:px-6">
                    Program
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold uppercase tracking-[0.18em] sm:px-6">
                    Duration
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold uppercase tracking-[0.18em] sm:px-6">
                    Workload
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold uppercase tracking-[0.18em] sm:px-6">
                    Fee
                  </th>
                  <th className="px-4 py-4 text-[11px] font-bold uppercase tracking-[0.18em] sm:px-6">
                    Best for
                  </th>
                  <th className="px-4 py-4 text-right text-[11px] font-bold uppercase tracking-[0.18em] sm:px-6">
                    Act
                  </th>
                </tr>
              </thead>
              <tbody>
                {COURSES.map((c, i) => (
                  <tr
                    key={c.slug}
                    className={cn(
                      "border-b border-ink/15 transition-colors last:border-b-0 hover:bg-brand-soft/30",
                      c.popular && "bg-brand-soft/25"
                    )}
                  >
                    <td className="px-4 py-4 sm:px-6">
                      <span className="font-display text-[10px] font-bold tracking-[0.2em] text-brand">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display mt-0.5 block text-[15px] font-semibold text-ink">
                        {c.title}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-ink-soft sm:px-6">
                      {c.duration}
                    </td>
                    <td className="px-4 py-4 text-sm text-ink-soft sm:px-6">
                      {c.classes}
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <span className="font-display text-base font-semibold text-ink">
                        {c.price}
                      </span>
                      {c.oldPrice ? (
                        <span className="ml-2 text-xs text-ink-faint line-through decoration-brand">
                          {c.oldPrice}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-4 text-sm text-ink-soft sm:px-6">
                      {BEST_FOR[c.slug]}
                    </td>
                    <td className="px-4 py-4 text-right sm:px-6">
                      <button
                        type="button"
                        onClick={() => onEnroll(c.slug)}
                        className="cursor-pointer border-b-2 border-brand pb-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:text-brand"
                      >
                        Enroll
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Shell>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  §03 — Decision guide                                               */
/* ------------------------------------------------------------------ */

const GUIDE = [
  {
    if: "Stuck at Band 5.0–5.5 with 2–3 months in hand",
    then: "IELTS Full Course",
    slug: "ielts-full",
    note: "The complete roadmap — all four modules, feedback at every step.",
  },
  {
    if: "Your exam is booked for next month",
    then: "IELTS Crash Course",
    slug: "ielts-crash",
    note: "30 days of focused damage control — strategy over theory.",
  },
  {
    if: "You write well but freeze when speaking",
    then: "Spoken English Mastery",
    slug: "spoken-english",
    note: "A speaking club built specifically to kill the fear.",
  },
  {
    if: "Grammar has been shaky since school",
    then: "English Foundation",
    slug: "foundation",
    note: "Rebuild the base layer everything else stands on.",
  },
];

function DecisionGuide({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section className="bg-paper">
      <Shell className="px-4 py-16 sm:px-8 sm:py-24">
        <SectionHead
          no="03"
          bn="কোনটা তোমার জন্য"
          en="Decision guide"
          title={
            <>
              If you are this,
              <br />
              take <em className="italic text-brand">that.</em>
            </>
          }
          lede="The honest shortcut. Still unsure after this? The free diagnostic mock settles it in one sitting."
        />

        <div className="mt-12 border-b-2 border-ink">
          {GUIDE.map((g, i) => (
            <Reveal key={g.slug} delay={i * 0.05}>
              <div className="grid gap-3 border-t border-ink/20 py-6 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-faint">
                    If you are
                  </p>
                  <p className="font-display mt-1.5 text-lg font-semibold leading-snug text-ink sm:text-xl">
                    {g.if}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="font-display hidden text-3xl font-black text-brand sm:block"
                >
                  →
                </span>
                <div className="flex flex-wrap items-center justify-between gap-4 sm:justify-end sm:text-right">
                  <div>
                    <p className="font-display text-lg font-semibold leading-snug text-brand sm:text-xl">
                      {g.then}
                    </p>
                    <p className="mt-1 text-xs leading-snug text-ink-faint">
                      {g.note}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate("admission")}
                    className="cursor-pointer border-2 border-ink px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-paper"
                  >
                    Enroll
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-8 text-center font-display text-sm italic text-ink-soft">
            Between two programs? Take both roads to the diagnostic test and let
            the band estimate pick.
          </p>
        </Reveal>
      </Shell>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Closing slab                                                       */
/* ------------------------------------------------------------------ */

function ClosingSlab({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section className="bg-ink text-paper">
      <div className="bg-grain relative">
        <div className="relative mx-auto max-w-[1200px] border-x border-paper/15 px-4 py-16 sm:px-8 sm:py-20">
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <Reveal>
                <Kicker tone="paper">Before you pay anything</Kicker>
              </Reveal>
              <Reveal delay={0.07}>
                <h2 className="font-display mt-5 text-balance text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl">
                  Sit one free mock first.
                  <br />
                  Decide with a <em className="italic text-brand">score,</em> not
                  a brochure.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-paper/60">
                  Full 4-module simulation, checked against band descriptors, and
                  a ten-minute sit-down about what the numbers mean. Free, and
                  free of obligation.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.12}>
              <div className="space-y-4">
                <Btn variant="paper" size="lg" onClick={() => onNavigate("admission")} className="w-full">
                  Book the free mock
                </Btn>
                <Btn
                  variant="ghost-paper"
                  size="lg"
                  href={BRAND.phoneHref}
                  className="w-full"
                >
                  Or call {BRAND.phone}
                </Btn>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
