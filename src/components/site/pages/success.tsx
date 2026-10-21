"use client";

import { MoveRight } from "lucide-react";
import {
  Container,
  CtaPanel,
  Figure,
  PageHead,
  Reveal,
  SectionHead,
  Stat,
} from "../kit";
import { BRAND, TESTIMONIALS, type PageId } from "@/lib/site-data";

/* ================================================================== */
/*  SUCCESS — the wall of results                                       */
/* ================================================================== */

const WALL_STATS = [
  { value: 8500, suffix: "+", label: "Learners in the community" },
  { value: "+1.5", suffix: "", label: "Typical band improvement" },
  { value: 59, suffix: "", label: "Free lessons behind them" },
  { value: 34000, suffix: "+", label: "Views across lessons" },
];

export function SuccessPage({
  onNavigate,
}: {
  onNavigate: (p: PageId) => void;
}) {
  return (
    <>
      <PageHead
        eyebrow="Success stories"
        title={
          <>
            From Band 5 to Band 8 —{" "}
            <em className="italic text-brand">real</em> students, real scores.
          </>
        }
        lede="No stock photos, no invented names. These are the students who did the boring weeks — and got the scores that opened doors."
        meta={[
          { label: "Typical gain", value: "+1.0 – 1.5 bands" },
          { label: "Time frame", value: "One course" },
          { label: "Method", value: "Mocks + feedback" },
          { label: "Secret", value: "Consistency" },
        ]}
      />

      {/* the wall */}
      <section className="py-16 md:py-20">
        <Container>
          <Reveal>
            <Figure
              src="/images/success-wall.png"
              alt="Demo IELTS Academy students celebrating their IELTS results with certificates"
              ratio="aspect-[16/8]"
              caption="Results day — demo certificates and student score celebrations."
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-4">
            {WALL_STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <div
                  className={
                    i === 0 ? "md:pl-0" : "md:border-l md:border-hairline md:pl-8"
                  }
                >
                  <Stat value={s.value} suffix={s.suffix} label={s.label} />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* entries */}
      <section className="border-t border-hairline bg-sand/60 py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="The ledger"
            title="Four entries from the wall."
            lede="Every student below started exactly where you might be right now."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={Math.min((i % 2) * 0.07, 0.14)}>
                <article className="flex h-full flex-col rounded-2xl border border-hairline bg-card p-7 sm:p-8">
                  <div className="flex items-center gap-4">
                    { }
                    <img
                      src={t.avatar}
                      alt={t.name}
                      loading="lazy"
                      className="img-soft h-12 w-12 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink">{t.name}</p>
                      <p className="text-xs text-ink-faint">{t.role}</p>
                    </div>
                    <div className="ml-auto flex shrink-0 items-center gap-2 font-display text-lg font-medium">
                      <s className="text-base font-normal text-ink-faint">
                        {t.from}
                      </s>
                      <MoveRight
                        aria-hidden
                        className="h-4 w-4 text-brand"
                        strokeWidth={1.5}
                      />
                      <span className="text-brand-deep">{t.to}</span>
                    </div>
                  </div>
                  <p className="mt-6 flex-1 text-[15px] leading-relaxed text-ink-soft">
                    “{t.quote}”
                  </p>
                  <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-faint">
                    {t.course}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* band 5 vs 9 */}
      <section className="py-20 md:py-28">
        <Container className="max-w-[760px]">
          <SectionHead
            align="center"
            eyebrow="The difference"
            title="What separates a Band 5 answer from a Band 8 one?"
            lede="It is rarely knowledge. It is almost always structure, precision and nerve — all three of which respond to training."
          />
          <div className="mt-12 space-y-4">
            {[
              ["A Band 5 answer", "Rambles, repeats, hopes for the best."],
              ["A Band 6.5 answer", "Structured, safe, a little memorised."],
              ["A Band 8 answer", "Structured, precise, sounds like you on a good day."],
            ].map(([label, text], i) => (
              <Reveal key={label} delay={i * 0.07}>
                <div className="flex flex-col gap-2 rounded-2xl border border-hairline px-6 py-5 sm:flex-row sm:items-baseline sm:gap-6">
                  <span
                    className={
                      i === 2
                        ? "font-display w-32 shrink-0 text-lg font-medium text-brand-deep"
                        : "font-display w-32 shrink-0 text-lg font-medium text-ink"
                    }
                  >
                    {label}
                  </span>
                  <span className="text-[15px] leading-relaxed text-ink-soft">
                    {text}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.24}>
            <p className="font-display mt-10 text-center text-lg italic leading-relaxed text-ink-soft">
              “The exam doesn&apos;t test how much English you know. It tests
              how well you use what you know —{" "}
              <span className="text-ink">on one morning, under pressure.</span>”
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaPanel
        eyebrow="Your entry next"
        title={
          <>
            The next name on this wall{" "}
            <em className="italic text-paper/90">hasn&apos;t enrolled yet.</em>
          </>
        }
        lede="Start with the free diagnostic. Six weeks of boring consistency later, someone is writing your quote."
        bn="পরের গল্পটা তোমার হতে পারে।"
        primary={{ label: "Start with the free diagnostic", onClick: () => onNavigate("admission") }}
        secondary={{ label: `Call ${BRAND.phone}`, href: BRAND.phoneHref }}
      />
    </>
  );
}
