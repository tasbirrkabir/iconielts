"use client";

import {
  Btn,
  Frame,
  Kicker,
  PageHead,
  Reveal,
  SectionHead,
  Shell,
  Stamp,
} from "../kit";
import { Counter } from "../counter";
import {
  BAND_JOURNEY,
  BRAND,
  TESTIMONIALS,
  type PageId,
} from "@/lib/site-data";
import { cn } from "@/lib/utils";

/* ================================================================== */
/*  SUCCESS — the results ledger                                       */
/* ================================================================== */

export function SuccessPage({
  onNavigate,
}: {
  onNavigate: (p: PageId) => void;
}) {
  return (
    <>
      <PageHead
        no="05"
        bn="সাফল্যের গল্প"
        title={
          <>
            Every score below is a screenshot
            <br />
            we <em className="italic text-brand">actually received.</em>
          </>
        }
        lede="Results day at ICON means a phone that won't stop buzzing. We keep every message — here is the ledger they add up to."
        meta={[
          { label: "Best result", value: "Band 8.0" },
          { label: "Typical gain", value: "+1.5 bands" },
          { label: "Community", value: "8,500+ learners" },
          { label: "Proof", value: "WhatsApp screenshots" },
        ]}
      />
      <TheWall />
      <ProgressRuler />
      <LedgerEntries />
      <YourEntry onNavigate={onNavigate} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  §01 — The wall                                                     */
/* ------------------------------------------------------------------ */

function TheWall() {
  return (
    <section className="bg-paper">
      <Shell className="px-4 py-16 sm:px-8 sm:py-24">
        <SectionHead
          no="01"
          bn="সাফল্যের দেয়াল"
          en="The wall"
          title={
            <>
              Results day,
              <br />
              every <em className="italic text-brand">single</em> time.
            </>
          }
          lede="Certificates, confetti, and a group chat that will not quiet down. The photo is staged; the feelings are not."
        />

        <Reveal delay={0.08}>
          <div className="relative mt-12">
            <Frame
              src="/images/success-wall.png"
              alt="ICON English Center students celebrating their IELTS results with certificates"
              caption="The results wall — certificates from recent batches"
              ratio="16/8"
              className="shadow-[12px_12px_0_0_rgba(26,21,18,0.9)]"
              sizes="(max-width: 1200px) 100vw, 1160px"
            />
            <Stamp className="absolute -right-3 -top-5 bg-paper px-3 py-2 sm:-right-5">
              Verified results
            </Stamp>
          </div>
        </Reveal>

        {/* big figures */}
        <div className="mt-12 grid grid-cols-2 divide-ink/15 border-t-2 border-ink sm:divide-x lg:grid-cols-4">
          {[
            { display: "8.0", label: "Best band achieved" },
            { display: "+1.5", label: "Typical gain in bands" },
            { display: "4", label: "Modules improved per student", suffix: "" },
            { display: "100%", label: "Scripts read by a human" },
          ].map((st, i) => (
            <div
              key={st.label}
              className={cn(
                "border-ink/15",
                i >= 2 && "border-t lg:border-t-0",
                i % 2 === 1 && "border-l sm:border-l"
              )}
            >
              <div className="px-5 py-8 sm:px-8 sm:py-10">
                <div className="font-display text-4xl font-semibold leading-none tracking-tight text-brand sm:text-5xl">
                  {st.display}
                </div>
                <div className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
                  {st.label}
                </div>
              </div>
            </div>
          ))}
        </div>

      </Shell>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  §02 — Progress ruler                                               */
/* ------------------------------------------------------------------ */

function ProgressRuler() {
  return (
    <section className="border-y-2 border-ink bg-paper-deep">
      <Shell className="px-4 py-16 sm:px-8 sm:py-24">
        <SectionHead
          no="02"
          bn="ব্যান্ড স্কেল"
          en="The ruler"
          title={
            <>
              What the numbers mean
              <br />
              on the <em className="italic text-brand">band ruler.</em>
            </>
          }
          lede="A band is not a grade — it's a position on a ruler every examiner in the world reads the same way. Here's where our students start and land."
        />

        <Reveal delay={0.08}>
          <div className="mt-14">
            {/* the ruler — continuous top rule + anchored tick columns */}
            <div className="grid grid-cols-2 gap-x-6 sm:grid-cols-4 sm:gap-x-0">
              {BAND_JOURNEY.map((step, i) => {
                const reached = i >= 1;
                return (
                  <div key={step.band} className="relative sm:pr-8">
                    {/* tick */}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -top-[7px] left-0 h-3.5 w-3.5 border-2",
                        reached
                          ? "border-brand bg-brand"
                          : "border-ink bg-paper-deep"
                      )}
                    />
                    <div className={cn("border-t-2", reached ? "border-brand" : "border-ink")} />
                    <p
                      className={cn(
                        "font-display mt-6 text-4xl font-black leading-none tracking-tight sm:text-5xl",
                        reached ? "text-brand" : "text-ink/35"
                      )}
                    >
                      {step.band}
                    </p>
                    <h3
                      className={cn(
                        "font-display mt-4 text-base font-semibold leading-tight sm:text-lg",
                        reached ? "text-ink" : "text-ink/50"
                      )}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-2 min-h-[3.5rem] text-xs leading-relaxed text-ink-soft">
                      {step.description}
                    </p>
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-faint">
                      {i === 0 ? "Where most start" : `Stage ${String(i + 1).padStart(2, "0")}`}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink/20 pt-6">
              <p className="font-bn-serif text-lg font-medium text-ink">
                ৫.০ থেকে ৮.০ — প্রতিটা ঘরেই একটা গল্প আছে।
              </p>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-faint">
                Red = where ICON students land
              </p>
            </div>
          </div>
        </Reveal>
      </Shell>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  §03 — Ledger entries                                               */
/* ------------------------------------------------------------------ */

function LedgerEntries() {
  return (
    <section className="bg-paper">
      <Shell className="px-4 py-16 sm:px-8 sm:py-24">
        <SectionHead
          no="03"
          bn="লেজারের এন্ট্রি"
          en="The ledger"
          title={
            <>
              Entries № 001–004,
              <br />
              copied <em className="italic text-brand">verbatim.</em>
            </>
          }
          lede="Names shared with permission; typos and joy preserved exactly as received on results day."
        />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-0 lg:border-2 lg:border-ink">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 0.06}
              className={cn(
                i === 1 && "lg:border-l lg:border-ink",
                i >= 2 && "border-t lg:border-t-0",
                i === 2 && "lg:border-l lg:border-ink"
              )}
            >
              <article
                className={cn(
                  "relative flex h-full flex-col border-2 border-ink bg-card p-6 sm:p-8",
                  (i === 1 || i === 2) && "lg:border-l-0 lg:border-t-0",
                  i >= 2 && "lg:border-t"
                )}
              >
                {/* entry number */}
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs font-bold tracking-[0.28em] text-brand">
                    ENTRY № {String(i + 1).padStart(3, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="font-display select-none text-5xl font-black leading-none text-brand/15"
                  >
                    &rdquo;
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-4">
                  { }
                  <img
                    src={t.avatar}
                    alt={`Portrait of ${t.name}`}
                    loading="lazy"
                    className="img-print h-14 w-14 border-2 border-ink object-cover"
                  />
                  <div>
                    <h3 className="font-display text-xl font-semibold leading-tight text-ink">
                      {t.name}
                    </h3>
                    <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                      {t.role}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-end gap-5 border-y border-dashed border-ink/25 py-4">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink-faint">
                      Entered at
                    </p>
                    <p className="font-display mt-1 text-xl font-medium text-ink-faint line-through decoration-brand/70 decoration-2">
                      {t.from}
                    </p>
                  </div>
                  <span aria-hidden className="font-display pb-1 text-2xl text-brand">
                    →
                  </span>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink-faint">
                      Achieved
                    </p>
                    <p className="font-display mt-1 text-3xl font-black leading-none text-brand">
                      {t.to}
                    </p>
                  </div>
                  <span className="ml-auto text-right text-[10px] font-bold uppercase leading-relaxed tracking-[0.14em] text-ink-faint">
                    {t.course}
                  </span>
                </div>

                <blockquote className="font-display mt-5 flex-1 text-[15px] font-medium italic leading-relaxed text-ink">
                  “{t.quote}”
                </blockquote>
              </article>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  §04 — Your entry (ink slab)                                        */
/* ------------------------------------------------------------------ */

function YourEntry({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section className="bg-ink text-paper">
      <div className="bg-grain relative">
        <div className="relative mx-auto max-w-[1200px] border-x border-paper/15 px-4 py-16 sm:px-8 sm:py-24">
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <Reveal>
                <Kicker tone="paper">Entry № 005 — unwritten</Kicker>
              </Reveal>
              <Reveal delay={0.07}>
                <h2 className="font-display mt-5 text-balance text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">
                  The next entry in this ledger is{" "}
                  <em className="italic text-brand">yours</em> to write.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="font-bn-serif mt-6 text-lg font-medium text-paper/80">
                  পরের সাফল্যের গল্পটা তোমারই হোক।
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.12}>
              <div className="space-y-4">
                <Btn variant="paper" size="lg" onClick={() => onNavigate("admission")} className="w-full">
                  Start your entry
                </Btn>
                <Btn
                  variant="ghost-paper"
                  size="lg"
                  href={BRAND.whatsappHref}
                  external
                  className="w-full"
                >
                  Ask a question first
                </Btn>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
