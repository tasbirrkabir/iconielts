"use client";

import { Check, MoveRight } from "lucide-react";
import {
  Btn,
  Container,
  CtaPanel,
  Eyebrow,
  Figure,
  PageHead,
  Reveal,
  SectionHead,
} from "../kit";
import { BRAND, COURSES, type PageId } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/* ================================================================== */
/*  COURSES — six programs, presented calmly                           */
/* ================================================================== */

const BEST_FOR: Record<string, string> = {
  "ielts-full": "First-time serious preparation",
  "ielts-crash": "Test date within 2 months",
  "spoken-english": "Fluency & confidence",
  foundation: "Grammar needs rebuilding",
  "mock-test": "Know your real level",
  "one-to-one": "Personal attention",
};

const DECISIONS = [
  { situation: "Stuck at Band 5–5.5 for a while", course: "IELTS Full Course", slug: "ielts-full" },
  { situation: "Test date is in 30–45 days", course: "IELTS Crash Course", slug: "ielts-crash" },
  { situation: "Can write, but can't speak", course: "Spoken English Mastery", slug: "spoken-english" },
  { situation: "Grammar mistakes in every sentence", course: "English Foundation", slug: "foundation" },
  { situation: "Almost ready — need exam rehearsal", course: "Mock Test Package", slug: "mock-test" },
  { situation: "Want a plan built only for me", course: "1:1 Mentoring", slug: "one-to-one" },
];

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
        eyebrow="Programs"
        title={
          <>
            Six ways in. One goal:{" "}
            <em className="italic text-brand">your</em> band score.
          </>
        }
        lede="Every program is taught Bengali-first, tested in English, and measured with real band descriptors. Fees are one-time — no installments, no hidden charges."
        meta={[
          { label: "Formats", value: "Offline & live online" },
          { label: "Mock tests", value: "Every Friday" },
          { label: "New batches", value: "Every month" },
          { label: "Demo class", value: "Free" },
        ]}
      />

      {COURSES.map((c, i) => (
        <CourseSection key={c.slug} index={i} onEnroll={onEnroll} />
      ))}

      <CompareTable onEnroll={onEnroll} />

      <DecisionGuide onEnroll={onEnroll} />

      <CtaPanel
        eyebrow="Not sure which one?"
        title="The free diagnostic decides the rest — not a sales pitch."
        lede="Sit a full-length mock, get an honest band estimate and a written plan. Then choose — or don't. The diagnosis is yours to keep."
        bn="আগে লেভেল মাপা যাক, তারপর সিদ্ধান্ত।"
        primary={{ label: "Book the free diagnostic", onClick: () => onNavigate("admission") }}
        secondary={{ label: "Ask on WhatsApp", href: BRAND.whatsappHref }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  One course                                                         */
/* ------------------------------------------------------------------ */

function CourseSection({
  index,
  onEnroll,
}: {
  index: number;
  onEnroll: (slug: string) => void;
}) {
  const c = COURSES[index];
  const flip = index % 2 === 1;

  return (
    <section className={cn("py-16 md:py-20", index > 0 && "border-t border-hairline")}>
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className={cn(flip && "lg:order-2")}>
            <Figure
              src={c.image}
              alt={c.title}
              ratio="aspect-[4/3]"
            />
          </Reveal>

          <div className={cn(flip && "lg:order-1")}>
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <Eyebrow>{c.subtitle}</Eyebrow>
                {c.badge ? (
                  <span className="rounded-full bg-brand-tint px-3 py-1 text-[11px] font-semibold tracking-[0.04em] text-brand-deep">
                    {c.badge}
                  </span>
                ) : null}
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="font-display mt-5 text-3xl font-medium leading-[1.08] tracking-[-0.012em] text-ink sm:text-4xl">
                {c.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-soft">
                {c.description}
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-y border-hairline py-5">
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
                    Duration
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium text-ink">
                    {c.duration}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
                    Classes
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium text-ink">
                    {c.classes}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
                    Fee
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium text-ink">
                    {c.oldPrice ? (
                      <s className="mr-2 font-normal text-ink-faint">
                        {c.oldPrice}
                      </s>
                    ) : null}
                    {c.price}
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.18}>
              <ul className="mt-7 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {c.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft"
                  >
                    <Check
                      aria-hidden
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand"
                      strokeWidth={2}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-7 rounded-2xl bg-sand/70 px-5 py-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
                  You leave with
                </p>
                <ul className="mt-2.5 space-y-1.5">
                  {c.outcomes.map((o) => (
                    <li
                      key={o}
                      className="flex items-center gap-2 text-sm text-ink"
                    >
                      <MoveRight
                        aria-hidden
                        className="h-3.5 w-3.5 shrink-0 text-brand"
                        strokeWidth={1.5}
                      />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Btn size="lg" onClick={() => onEnroll(c.slug)}>
                  Enroll in this course
                </Btn>
                <Btn variant="outline" href={BRAND.whatsappHref} external>
                  Ask on WhatsApp
                </Btn>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Compare table                                                      */
/* ------------------------------------------------------------------ */

function CompareTable({ onEnroll }: { onEnroll: (slug: string) => void }) {
  return (
    <section className="border-t border-hairline bg-sand/60 py-20 md:py-28">
      <Container>
        <SectionHead
          eyebrow="At a glance"
          title="The whole catalog, one table."
        />
        <div className="mt-12 overflow-x-auto nice-scroll">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="border-b border-hairline">
                {["Course", "Duration", "Classes", "Fee", "Best for", ""].map(
                  (h) => (
                    <th
                      key={h}
                      className="whitespace-nowrap pb-4 pr-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint last:pr-0"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {COURSES.map((c) => (
                <tr
                  key={c.slug}
                  className="group border-b border-hairline last:border-b-0"
                >
                  <td className="py-4 pr-6">
                    <span className="font-display text-base font-medium text-ink">
                      {c.title}
                    </span>
                  </td>
                  <td className="whitespace-nowrap py-4 pr-6 text-sm text-ink-soft">
                    {c.duration}
                  </td>
                  <td className="whitespace-nowrap py-4 pr-6 text-sm text-ink-soft">
                    {c.classes}
                  </td>
                  <td className="whitespace-nowrap py-4 pr-6 text-sm font-medium text-ink">
                    {c.price}
                  </td>
                  <td className="py-4 pr-6 text-sm text-ink-soft">
                    {BEST_FOR[c.slug]}
                  </td>
                  <td className="py-4 text-right">
                    <button
                      type="button"
                      onClick={() => onEnroll(c.slug)}
                      className="cursor-pointer text-[13px] font-medium text-ink transition-colors hover:text-brand-deep"
                    >
                      Enroll →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Decision guide                                                     */
/* ------------------------------------------------------------------ */

function DecisionGuide({ onEnroll }: { onEnroll: (slug: string) => void }) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHead
          eyebrow="Still deciding?"
          title="Start from where you are."
          lede="One line each — the honest version of an admission counselor's pitch."
        />
        <div className="mt-12 border-b border-hairline">
          {DECISIONS.map((d, i) => (
            <Reveal key={d.slug} delay={Math.min(i * 0.04, 0.2)}>
              <button
                type="button"
                onClick={() => onEnroll(d.slug)}
                className="group flex w-full cursor-pointer flex-wrap items-center gap-x-4 gap-y-1 border-t border-hairline py-5 text-left"
              >
                <span className="font-mono text-xs text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1 text-[15px] text-ink-soft transition-colors group-hover:text-ink">
                  {d.situation}
                </span>
                <MoveRight
                  aria-hidden
                  className="h-4 w-4 text-ink-faint transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
                <span className="font-display text-lg font-medium text-ink transition-transform duration-300 group-hover:translate-x-1">
                  {d.course}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
