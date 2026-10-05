"use client";

import { useState } from "react";
import {
  Btn,
  Frame,
  Kicker,
  PageHead,
  Reveal,
  SectionHead,
  Shell,
  Stamp,
  Ticker,
} from "../kit";
import {
  BRAND,
  LESSONS,
  LESSON_CATEGORIES,
  getYtLink,
  getYtThumb,
  type PageId,
} from "@/lib/site-data";
import { cn } from "@/lib/utils";

/* ================================================================== */
/*  LESSONS — the broadcast guide                                      */
/* ================================================================== */

export function LessonsPage({
  onNavigate,
}: {
  onNavigate: (p: PageId) => void;
}) {
  return (
    <>
      <PageHead
        no="04"
        bn="ফ্রি লেসন"
        title={
          <>
            Free, daily, and actually useful —{" "}
            <em className="italic text-brand">the open classroom.</em>
          </>
        }
        lede="Every full-length strategy class, grammar fix and module deep-dive from the ICON channel — watchable tonight, payable never."
        meta={[
          { label: "Open classes", value: "59+ videos" },
          { label: "Categories", value: "5 modules" },
          { label: "Cost", value: "৳0 — forever" },
          { label: "New lessons", value: "Near-daily" },
        ]}
      />
      <FeaturedBroadcast />
      <TheGuide />
      <SubscribeSlab />
      <Ticker
        slow
        items={[
          "Grammar fix — প্রতিদিন",
          "Band 7+ strategies",
          "Listening drills",
          "Writing formulas",
          "Speaking frameworks",
          "Reading in 3 minutes",
        ]}
      />
      <ClosingStrip onNavigate={onNavigate} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  §01 — Featured broadcast                                           */
/* ------------------------------------------------------------------ */

function FeaturedBroadcast() {
  const featured = LESSONS[0];
  return (
    <section className="bg-paper">
      <Shell className="px-4 py-16 sm:px-8 sm:py-24">
        <SectionHead
          no="01"
          bn="আজকের সম্প্রচার"
          en="Tonight's broadcast"
          title={
            <>
              Start here — the plan
              <br />
              that fits <em className="italic text-brand">every</em> module.
            </>
          }
          lede="The 30-day booster plan is our most-watched class for a reason: it turns 'IELTS preparation' from a mood into a schedule."
        />

        <Reveal delay={0.08}>
          <a
            href={getYtLink(featured.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-12 block border-2 border-ink bg-card shadow-[12px_12px_0_0_rgba(26,21,18,0.9)]"
          >
            <div className="relative overflow-hidden">
              { }
              <img
                src={getYtThumb(featured.id)}
                alt={featured.title}
                loading="lazy"
                className="img-print aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-ink/10 transition-colors duration-300 group-hover:bg-ink/0" />
              <span className="absolute left-0 top-0 bg-brand px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-paper">
                Most watched
              </span>
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-24 w-24 items-center justify-center border-2 border-paper bg-ink/75 text-2xl text-paper transition-all duration-300 group-hover:scale-105 group-hover:border-ink group-hover:bg-brand">
                  ▶
                </span>
              </span>
              <span className="absolute bottom-0 right-0 bg-ink px-3 py-1.5 text-xs font-bold tracking-widest text-paper">
                {featured.duration}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-7">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand">
                  {featured.category} · Free full class
                </p>
                <h3 className="font-display mt-2 max-w-3xl text-xl font-semibold leading-snug tracking-tight text-ink sm:text-2xl lg:text-3xl">
                  {featured.title}
                </h3>
              </div>
              <span className="font-display hidden text-lg font-bold text-ink-faint transition-colors group-hover:text-brand sm:block">
                Watch on YouTube ↗
              </span>
            </div>
          </a>
        </Reveal>
      </Shell>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  §02 — The guide (filterable listing)                               */
/* ------------------------------------------------------------------ */

function TheGuide() {
  const [category, setCategory] =
    useState<(typeof LESSON_CATEGORIES)[number]>("All");

  const filtered =
    category === "All"
      ? LESSONS
      : LESSONS.filter((l) => l.category === category);

  return (
    <section className="border-y-2 border-ink bg-paper-deep">
      <Shell className="px-4 py-16 sm:px-8 sm:py-24">
        <SectionHead
          no="02"
          bn="সম্প্রচার তালিকা"
          en="The guide"
          title={
            <>
              The listing — pick a module,
              <br />
              press <em className="italic text-brand">play.</em>
            </>
          }
          lede="Every entry below is a complete, free class from the channel. No teasers, no paywalled second halves."
        />

        {/* filter tabs */}
        <Reveal delay={0.06}>
          <div
            className="mt-10 flex flex-wrap gap-0 border-2 border-ink bg-card"
            role="tablist"
            aria-label="Lesson categories"
          >
            {LESSON_CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "cursor-pointer border-ink px-4 py-3 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors sm:px-6",
                    "-ml-[2px] first:ml-0",
                    active
                      ? "z-10 bg-ink text-paper"
                      : "bg-card text-ink-soft hover:bg-brand-soft/40 hover:text-ink"
                  )}
                >
                  {cat}
                </button>
              );
            })}
            <span className="ml-auto hidden items-center px-5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-faint sm:flex">
              {filtered.length}{" "}
              {filtered.length === 1 ? "entry" : "entries"}
            </span>
          </div>
        </Reveal>

        {/* listing */}
        <div className="mt-0 border-x-2 border-b-2 border-ink bg-card">
          {filtered.length === 0 ? (
            <p className="px-6 py-12 text-center font-display text-lg italic text-ink-faint">
              Nothing scheduled in this slot yet — check another module.
            </p>
          ) : (
            filtered.map((l, i) => (
              <Reveal key={l.id} delay={Math.min(i * 0.03, 0.3)}>
                <a
                  href={getYtLink(l.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 border-t border-ink/15 px-4 py-4 transition-colors first:border-t-0 hover:bg-ink sm:gap-x-6 sm:px-6",
                    i % 2 === 1 && "bg-paper/50"
                  )}
                >
                  <span className="font-display w-8 text-sm font-bold tracking-wider text-brand sm:w-10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="border border-ink/30 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-ink-soft transition-colors group-hover:border-paper/30 group-hover:text-paper/60">
                        {l.category}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink-faint transition-colors group-hover:text-paper/50">
                        {l.duration}
                      </span>
                    </span>
                    <span className="font-display mt-1.5 block text-[14px] font-semibold leading-snug text-ink transition-colors group-hover:text-paper sm:text-[15px]">
                      <span className="line-clamp-2">{l.title}</span>
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="font-display text-lg font-bold text-ink-faint transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand"
                  >
                    ↗
                  </span>
                </a>
              </Reveal>
            ))
          )}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
            More classes upload near-daily — the full archive lives on the
            channel.
          </p>
        </Reveal>
      </Shell>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  §03 — Subscribe slab (ink)                                         */
/* ------------------------------------------------------------------ */

function SubscribeSlab() {
  return (
    <section className="bg-ink text-paper">
      <div className="bg-grain relative">
        <div className="relative mx-auto max-w-[1200px] border-x border-paper/15 px-4 py-16 sm:px-8 sm:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div>
              <SectionHead
                tone="paper"
                no="03"
                bn="সাবস্ক্রাইব করো"
                en="The channel"
                title={
                  <>
                    One subscription,
                    <br />
                    a class a <em className="italic text-brand">day.</em>
                  </>
                }
                lede="We post the Free Grammar Fix and full strategy classes on the ICON English Center channel — the same lessons our paying batches revise from."
                className="border-paper/80"
              />
              <Reveal delay={0.14}>
                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <Btn
                    variant="paper"
                    size="lg"
                    href="https://www.youtube.com/@ICONEnglishCenterBD?sub_confirmation=1"
                    external
                  >
                    Subscribe on YouTube
                  </Btn>
                  <div className="border-l-2 border-brand pl-5">
                    <p className="font-display text-3xl font-semibold leading-none text-paper">
                      34,000+
                    </p>
                    <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-paper/50">
                      Views across the archive
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="relative">
                <Frame
                  src="/images/course-ielts.png"
                  alt="ICON English Center study materials — IELTS books, notes and headphones"
                  caption="The study desk — what every lesson assumes you have"
                  ratio="4/3"
                  className="shadow-[10px_10px_0_0_rgba(227,30,36,0.85)]"
                />
                <Stamp tone="paper" className="absolute -left-3 -top-5 bg-ink px-3 py-2">
                  59+ free classes
                </Stamp>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Closing strip                                                      */
/* ------------------------------------------------------------------ */

function ClosingStrip({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section className="bg-brand-soft/50">
      <Shell className="px-4 py-14 sm:px-8 sm:py-16">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.5fr_auto]">
          <div>
            <Reveal>
              <Kicker>The catch, honestly told</Kicker>
            </Reveal>
            <Reveal delay={0.07}>
              <h2 className="font-display mt-4 text-balance text-3xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-4xl">
                The lessons are free forever. The{" "}
                <em className="italic text-brand">feedback</em> is what we charge
                for.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="font-bn-serif mt-4 text-lg font-medium text-ink">
                শেখা ফ্রি — মার্কিং চাইলে এসো।
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <div className="flex flex-wrap gap-4">
              <Btn onClick={() => onNavigate("admission")}>Get the feedback too</Btn>
              <Btn variant="outline" href={BRAND.whatsappHref} external>
                WhatsApp the desk
              </Btn>
            </div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}
