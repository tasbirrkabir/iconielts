"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Btn,
  Frame,
  IndexRow,
  Kicker,
  PageHead,
  Reveal,
  RuleRow,
  SectionHead,
  Shell,
  StatBlock,
  Stamp,
  Ticker,
} from "../kit";
import { Counter } from "../counter";
import {
  BAND_JOURNEY,
  BRAND,
  COURSES,
  FAQS,
  LESSONS,
  MODULES,
  STATS,
  TESTIMONIALS,
  WHY_ICON,
  getYtLink,
  getYtThumb,
  type PageId,
} from "@/lib/site-data";
import { cn } from "@/lib/utils";

/* ================================================================== */
/*  HOME — the front page of the prospectus                            */
/* ================================================================== */

export function HomePage({
  onNavigate,
}: {
  onNavigate: (p: PageId) => void;
}) {
  return (
    <>
      <FrontPage onNavigate={onNavigate} />
      <Ticker items={TICKER_ITEMS} />
      <WhyIcon onNavigate={onNavigate} />
      <ModulesSpread onNavigate={onNavigate} />
      <BandStaircase onNavigate={onNavigate} />
      <CoursesIndex onNavigate={onNavigate} />
      <BroadcastGuide onNavigate={onNavigate} />
      <LedgerOfProof />
      <FaqSection />
      <ClosingSlab onNavigate={onNavigate} />
    </>
  );
}

const TICKER_ITEMS = [
  "IELTS — taught in Bangla",
  "ব্যান্ড স্কোর ৭+ এখন স্বপ্ন নয়",
  "Free Grammar Fix — প্রতিদিন",
  "Mock tests under real pressure",
  "লেখার উপর প্রতিটি Feedback",
  "Band 5 → 8 roadmap",
  "Speaking club — ভয় ভাঙাও",
  "8,500+ learners",
];

/* ------------------------------------------------------------------ */
/*  1 · Front page                                                     */
/* ------------------------------------------------------------------ */

function FrontPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="bg-ledger pointer-events-none absolute inset-0" />
      <Shell className="relative border-x-0 px-0 sm:border-x">
        {/* dateline */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-ink/15 px-4 py-3 sm:px-8">
          <Kicker>Dhaka, Bangladesh</Kicker>
          <Kicker className="hidden sm:inline-flex">Bengali-first IELTS academy</Kicker>
          <span className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-brand">
            Admission open
          </span>
        </div>

        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1.25fr_1fr]">
          {/* headline column */}
          <div className="border-b border-ink/15 px-4 pb-10 pt-10 sm:px-8 lg:border-b-0 lg:border-r lg:pb-16 lg:pt-14">
            <Reveal>
              <h1 className="font-display text-balance text-[2.9rem] font-semibold leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-[4.6rem]">
                Band 7+ is not a dream.
                <span className="mt-1 block">
                  It&apos;s a <em className="font-medium italic text-brand">plan</em> —
                  taught in Bangla.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="font-bn-serif mt-7 text-xl font-medium leading-snug text-ink sm:text-2xl">
                বাংলায় সহজে স্বপ্নের IELTS Band Score অর্জনের নির্ভরযোগ্য সঙ্গী।
              </p>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-soft">
                ICON English Center turns stuck-at-Band-5 students into 7+ scorers
                with a structured roadmap, feedback on every script, and mock tests
                under real pressure — explained in the language you think in.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Btn onClick={() => onNavigate("courses")} size="lg">
                  View programs
                </Btn>
                <Btn onClick={() => onNavigate("lessons")} variant="outline" size="lg">
                  Free lessons
                </Btn>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-faint">
                Or call the admission desk —{" "}
                <a href={BRAND.phoneHref} className="link-sweep text-ink">
                  {BRAND.phone}
                </a>
              </p>
            </Reveal>
          </div>

          {/* photo column */}
          <div className="relative px-4 py-10 sm:px-8 lg:py-14">
            <Reveal delay={0.12}>
              <div className="relative">
                <Frame
                  src="/images/hero-main.png"
                  alt="Students of ICON English Center studying together in an evening batch"
                  caption="Evening batch — listening lab, Dhaka"
                  ratio="4/3"
                  priority
                  className="shadow-[10px_10px_0_0_rgba(26,21,18,0.9)]"
                />
                <Stamp className="absolute -right-4 -top-6 bg-paper px-3 py-2 sm:-right-6">
                  Batch filling fast
                </Stamp>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <blockquote className="mt-8 border-l-2 border-brand pl-5">
                <p className="font-display text-lg font-medium italic leading-snug text-ink">
                  “Self-preparation নিয়ে ভীতি থাকলে, প্রথমেই সেই ভয়টা ভাঙতে হবে।”
                </p>
                <cite className="mt-2 block text-[11px] font-bold uppercase not-italic tracking-[0.18em] text-ink-faint">
                  — ICON classroom rule № 1
                </cite>
              </blockquote>
            </Reveal>
          </div>
        </div>

        {/* stats ledger */}
        <div className="border-t-2 border-ink">
          <div className="grid grid-cols-2 divide-ink/15 sm:divide-x lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={cn(
                  "border-ink/15",
                  i >= 2 && "border-t lg:border-t-0",
                  i % 2 === 1 && "border-l sm:border-l"
                )}
              >
                <StatBlock
                  value={<Counter value={s.value} suffix={s.suffix} />}
                  label={s.label}
                />
              </div>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  2 · Why ICON — numbered reasons + framed photo                     */
/* ------------------------------------------------------------------ */

function WhyIcon({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section className="bg-paper">
      <Shell className="px-4 py-16 sm:px-8 sm:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead
              no="01"
              bn="কেন আইকন"
              en="Why ICON"
              title={
                <>
                  Six reasons students
                  <br />
                  stop <em className="italic text-brand">guessing</em> and
                  start scoring.
                </>
              }
              lede="We built ICON around one observation: most Bangladeshi candidates don't lack English — they lack a system in a language they understand."
            />
            <Reveal delay={0.15}>
              <div className="mt-8 hidden lg:block">
                <Frame
                  src="/images/about-story.png"
                  alt="An ICON instructor teaching grammar at the whiteboard"
                  caption="Grammar clinic — Saturday batch"
                  ratio="4/3"
                />
              </div>
            </Reveal>
          </div>

          <ol>
            {WHY_ICON.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.05}>
                <li className="group grid grid-cols-[auto_1fr] gap-x-5 border-t border-ink/20 py-6 transition-colors first:border-t-2 first:border-ink hover:bg-paper-deep/50 sm:gap-x-8 sm:py-7">
                  <span className="font-display pt-1 text-2xl font-bold text-brand sm:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold leading-tight text-ink sm:text-2xl">
                      {w.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-soft">
                      {w.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <li className="border-t-2 border-ink pt-8">
                <Btn onClick={() => onNavigate("about")} variant="outline" size="md">
                  Read our story
                </Btn>
              </li>
            </Reveal>
          </ol>
        </div>
      </Shell>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  3 · Four modules — prospectus spread                               */
/* ------------------------------------------------------------------ */

function ModulesSpread({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section className="border-y-2 border-ink bg-paper-deep">
      <Shell className="px-4 py-16 sm:px-8 sm:py-24">
        <SectionHead
          no="02"
          bn="চারটি মডিউল"
          en="The four modules"
          title={
            <>
              Every module, decoded
              <br />
              into a <em className="italic text-brand">repeatable</em> method.
            </>
          }
          lede="No vague advice. Each module gets its own strategy classes, drills and feedback loops — the same ones our Band 7+ students used."
        />

        <div className="mt-12 grid grid-cols-1 border-2 border-ink bg-paper sm:grid-cols-2 lg:grid-cols-4">
          {MODULES.map((m, i) => (
            <Reveal
              key={m.name}
              delay={i * 0.07}
              className={cn(
                "border-ink",
                i !== 0 && "border-t sm:border-t-0 sm:border-l",
                i >= 2 && "border-t lg:border-t-0",
                i === 2 && "sm:border-l lg:border-l"
              )}
            >
              <article className="flex h-full flex-col p-6 sm:p-7">
                <div className="flex items-baseline justify-between">
                  <m.icon className="h-7 w-7 text-brand" strokeWidth={1.6} />
                  <span className="font-display text-xs font-bold tracking-[0.24em] text-ink-faint">
                    M{i + 1}
                  </span>
                </div>
                <h3 className="font-display mt-5 text-2xl font-semibold tracking-tight text-ink">
                  {m.name}
                </h3>
                <p className="font-bn-serif mt-1 text-sm font-medium text-brand">
                  {m.bnName}
                </p>
                <p className="mt-4 flex-1 text-[13px] leading-relaxed text-ink-soft">
                  {m.description}
                </p>
                <ul className="mt-5 space-y-2 border-t border-dashed border-ink/25 pt-4">
                  {m.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2.5 text-xs font-medium leading-snug text-ink"
                    >
                      <span aria-hidden className="mt-1 inline-block h-1.5 w-1.5 shrink-0 bg-brand" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 text-center font-display text-sm italic text-ink-soft">
            All four modules are covered in the{" "}
            <button
              type="button"
              onClick={() => onNavigate("courses")}
              className="cursor-pointer font-semibold not-italic text-brand underline decoration-brand/40 underline-offset-4 hover:decoration-brand"
            >
              IELTS Full Course
            </button>{" "}
            — or one-by-one in targeted programs.
          </p>
        </Reveal>
      </Shell>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  4 · Band staircase — ink slab                                      */
/* ------------------------------------------------------------------ */

function BandStaircase({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section className="bg-ink text-paper">
      <div className="bg-grain relative">
        <div className="relative mx-auto max-w-[1200px] border-x border-paper/15 px-4 py-16 sm:px-8 sm:py-24">
          <SectionHead
            tone="paper"
            no="03"
            bn="ব্যান্ড জার্নি"
            en="The band journey"
            title={
              <>
                From stuck at 5.0
                <br />
                to <em className="italic text-brand">celebrating</em> 8.0.
              </>
            }
            lede="Our signature progression system. Each stage unlocks the next — with a mock test as the gate between them."
          />

          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {BAND_JOURNEY.map((step, i) => (
              <Reveal key={step.band} delay={i * 0.09} className="relative">
                <div
                  className={cn(
                    "lg:border-l lg:border-paper/20 lg:pl-7 lg:pr-7",
                    i === 0 && "lg:border-l-0 lg:pl-0",
                    "lg:pt-10"
                  )}
                >
                  {/* ascending baseline */}
                  <div
                    className="hidden lg:block"
                    style={{ height: `${i * 26}px` }}
                    aria-hidden
                  />
                  <div className="flex items-end gap-4">
                    <span className="font-display text-7xl font-black leading-none tracking-tight text-brand lg:text-8xl">
                      {step.band}
                    </span>
                    <span className="mb-2 font-display text-[10px] font-bold uppercase tracking-[0.24em] text-paper/50">
                      Stage {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display mt-5 text-xl font-semibold tracking-tight text-paper">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-paper/60">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-paper/20 pt-8">
              <p className="max-w-md font-bn-serif text-lg font-medium leading-snug text-paper/80">
                সিঁড়ি একেকটা ভাঙতে হয় না — একেকটা ওঠে।
              </p>
              <Btn variant="paper" onClick={() => onNavigate("success")}>
                See real results
              </Btn>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  5 · Courses index                                                  */
/* ------------------------------------------------------------------ */

function CoursesIndex({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section className="bg-paper">
      <Shell className="px-4 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            no="04"
            bn="প্রোগ্রামসমূহ"
            en="Programs"
            title={
              <>
                Six programs.
                <br />
                One <em className="italic text-brand">exact</em> fit for you.
              </>
            }
            className="max-w-2xl border-t-0 pt-0"
          />
          <Reveal delay={0.1}>
            <span className="font-display text-sm italic text-ink-soft">
              — not sure? Take the free diagnostic test first.
            </span>
          </Reveal>
        </div>

        <div className="mt-10 border-b-2 border-ink">
          {COURSES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.04}>
              <IndexRow
                no={String(i + 1).padStart(2, "0")}
                title={c.title}
                meta={`${c.duration} · ${c.classes} · ${c.price}${c.badge ? ` · ${c.badge}` : ""}`}
                onClick={() => onNavigate("courses")}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-faint">
              Instalments available · Offline & online batches
            </p>
            <Btn onClick={() => onNavigate("courses")}>Open full prospectus</Btn>
          </div>
        </Reveal>
      </Shell>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  6 · Free lessons — broadcast guide                                 */
/* ------------------------------------------------------------------ */

function BroadcastGuide({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const [featured, ...rest] = LESSONS;
  return (
    <section className="border-y-2 border-ink bg-brand-soft/40">
      <Shell className="px-4 py-16 sm:px-8 sm:py-24">
        <SectionHead
          no="05"
          bn="ফ্রি লেসন"
          en="Free lessons"
          title={
            <>
              The classroom is open —
              <br />
              <em className="italic text-brand">free</em>, every day, on YouTube.
            </>
          }
          lede="Full-length strategy classes, grammar fixes and module deep-dives from the ICON channel. Start today; enroll when you want the feedback."
        />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
          {/* featured */}
          <Reveal>
            <a
              href={getYtLink(featured.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-card border-2 border-ink"
            >
              <div className="relative overflow-hidden">
                { }
                <img
                  src={getYtThumb(featured.id)}
                  alt={featured.title}
                  loading="lazy"
                  className="img-print aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute left-4 top-4 bg-brand px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-paper">
                  Featured lesson
                </span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-20 w-20 items-center justify-center border-2 border-paper bg-ink/70 text-paper transition-colors duration-300 group-hover:bg-brand group-hover:border-ink">
                    ▶
                  </span>
                </span>
                <span className="absolute bottom-4 right-4 bg-ink px-2.5 py-1 text-[11px] font-bold tracking-widest text-paper">
                  {featured.duration}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4 p-5 sm:p-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">
                    {featured.category}
                  </p>
                  <h3 className="font-display mt-2 text-xl font-semibold leading-snug tracking-tight text-ink sm:text-2xl">
                    {featured.title}
                  </h3>
                </div>
              </div>
            </a>
          </Reveal>

          {/* list */}
          <div className="flex flex-col border-t-2 border-ink">
            {rest.slice(0, 4).map((l, i) => (
              <Reveal key={l.id} delay={i * 0.05}>
                <a
                  href={getYtLink(l.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 border-b border-ink/20 py-4 transition-colors hover:bg-paper-deep/60"
                >
                  <span className="relative hidden w-32 shrink-0 overflow-hidden border border-ink/25 sm:block">
                    { }
                    <img
                      src={getYtThumb(l.id)}
                      alt=""
                      loading="lazy"
                      className="img-print aspect-video w-full object-cover"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand">
                      {l.category} · {l.duration}
                    </span>
                    <span className="font-display mt-1 block truncate text-[15px] font-semibold text-ink">
                      {l.title}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="font-display text-lg font-bold text-ink-faint transition-colors group-hover:text-brand"
                  >
                    ↗
                  </span>
                </a>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <div className="flex flex-wrap items-center gap-4 pt-6">
                <Btn onClick={() => onNavigate("lessons")} variant="outline">
                  Browse all free lessons
                </Btn>
              </div>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  7 · Testimonials — ledger of proof                                 */
/* ------------------------------------------------------------------ */

function LedgerOfProof() {
  return (
    <section className="bg-paper">
      <Shell className="px-4 py-16 sm:px-8 sm:py-24">
        <SectionHead
          no="06"
          bn="সাফল্যের গল্প"
          en="Ledger of proof"
          title={
            <>
              Entries from our ledger —
              <br />
              real students, real bands.
            </>
          }
          lede="Every number below is a WhatsApp screenshot we received on results day. We keep them all."
        />

        <div className="mt-12 grid grid-cols-1 gap-0 border-2 border-ink bg-card lg:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 0.06}
              className={cn(
                "border-ink",
                i % 2 === 1 && "border-l",
                i >= 2 && "border-t",
                i === 1 && "lg:border-r-0",
                i === 2 && "lg:border-l-0"
              )}
            >
              <figure className="relative flex h-full flex-col p-6 sm:p-8">
                <span
                  aria-hidden
                  className="font-display pointer-events-none absolute right-5 top-3 select-none text-6xl font-black leading-none text-brand/20"
                >
                  &rdquo;
                </span>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    { }
                    <img
                      src={t.avatar}
                      alt={t.name}
                      loading="lazy"
                      className="img-print h-12 w-12 border border-ink/30 object-cover"
                    />
                    <div>
                      <figcaption className="font-display text-lg font-semibold leading-tight text-ink">
                        {t.name}
                      </figcaption>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                        {t.role}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg font-semibold leading-none text-ink-faint line-through decoration-brand decoration-2">
                      {t.from}
                    </p>
                    <p className="mt-1 font-display text-2xl font-black leading-none text-brand">
                      {t.to}
                    </p>
                  </div>
                </div>
                <blockquote className="font-display mt-5 flex-1 text-[15px] font-medium italic leading-relaxed text-ink">
                  “{t.quote}”
                </blockquote>
                <p className="mt-5 border-t border-dashed border-ink/25 pt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-faint">
                  Program — {t.course}
                </p>
              </figure>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  8 · FAQ                                                            */
/* ------------------------------------------------------------------ */

function FaqSection() {
  return (
    <section className="bg-paper">
      <Shell className="px-4 py-16 sm:px-8 sm:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead
              no="07"
              bn="জিজ্ঞাসা"
              en="Questions"
              title={
                <>
                  Asked before
                  <br />
                  every <em className="italic text-brand">enrollment.</em>
                </>
              }
              lede="Straight answers. If yours isn't here, the admission desk replies on WhatsApp within the day."
            />
          </div>
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="border-y-2 border-ink">
              {FAQS.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`faq-${i}`}
                  className="border-b border-ink/15 last:border-b-0"
                >
                  <AccordionTrigger className="group gap-4 px-1 py-5 text-left hover:no-underline">
                    <span className="flex items-baseline gap-4">
                      <span className="font-display text-xs font-bold tracking-[0.2em] text-brand">
                        Q{String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-base font-semibold text-ink sm:text-lg">
                        {f.q}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-1 pb-6 pl-10 sm:pl-12">
                    <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">
                      {f.a}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  9 · Closing slab                                                   */
/* ------------------------------------------------------------------ */

function ClosingSlab({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section className="relative overflow-hidden border-t-2 border-ink bg-brand text-paper">
      <div className="bg-grain relative">
        <div className="relative mx-auto max-w-[1200px] border-x border-ink/30 px-4 py-20 sm:px-8 sm:py-28">
          <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <Reveal>
                <Kicker tone="paper">Admission desk — open now</Kicker>
              </Reveal>
              <Reveal delay={0.07}>
                <h2 className="font-display mt-5 text-balance text-4xl font-semibold leading-[1.0] tracking-tight sm:text-6xl">
                  Your exam date is fixed.
                  <br />
                  Your plan should be <em className="italic">too.</em>
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="font-bn-serif mt-6 text-lg font-medium text-paper/85">
                  আজই শুরু করো — বাকিটা আমরা দেখব।
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.12}>
              <div className="space-y-4">
                <Btn variant="paper" size="lg" onClick={() => onNavigate("admission")} className="w-full">
                  Start your application
                </Btn>
                <Btn
                  variant="ghost-paper"
                  size="lg"
                  href={BRAND.whatsappHref}
                  external
                  className="w-full"
                >
                  WhatsApp the desk
                </Btn>
                <div className="border-t border-paper/25 pt-4">
                  <RuleRow label="Phone" value={<a className="link-sweep" href={BRAND.phoneHref}>{BRAND.phone}</a>} className="border-paper/25 [&>span:last-child]:text-paper" />
                  <RuleRow label="Hours" value={BRAND.hours} className="border-paper/25 [&>span:last-child]:text-paper" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
