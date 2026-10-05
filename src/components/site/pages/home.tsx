"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ArrowLink,
  Btn,
  Container,
  CtaPanel,
  Eyebrow,
  Figure,
  Reveal,
  SectionHead,
  Stat,
} from "../kit";
import {
  BAND_JOURNEY,
  BRAND,
  COURSES,
  FAQS,
  LESSONS,
  MODULES,
  TESTIMONIALS,
  getYtLink,
  getYtThumb,
  type PageId,
} from "@/lib/site-data";

/* ================================================================== */
/*  HOME — one calm page, top to bottom                                */
/* ================================================================== */

const HERO_STATS = [
  { value: 8500, suffix: "+", label: "Community learners" },
  { value: 59, suffix: "", label: "Free video lessons" },
  { value: 34000, suffix: "+", label: "YouTube views" },
  { value: 24, suffix: "h", label: "Admission callback" },
];

const FEATURED_LESSONS = [
  LESSONS[4], // Master IELTS Writing Task 2 in Just 7 Minutes
  LESSONS[12], // Matching Headings Under 3 Minutes
  LESSONS[9], // Section 1 of IELTS Listening
];

export function HomePage({
  onNavigate,
}: {
  onNavigate: (p: PageId) => void;
}) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <StatsBand />
      <Philosophy onNavigate={onNavigate} />
      <CoursesIndex onNavigate={onNavigate} />
      <BandRoadmap />
      <Modules />
      <LessonsTeaser onNavigate={onNavigate} />
      <Voices onNavigate={onNavigate} />
      <Faq />
      <CtaPanel
        eyebrow="Still reading? Good sign."
        title={
          <>
            Book your free demo class — the diagnostic decides the rest,{" "}
            <em className="italic text-paper/90">not a sales pitch.</em>
          </>
        }
        bn="আসো, আগে তোমার লেভেলটা মেপে দেখি।"
        primary={{ label: "Book the free diagnostic", onClick: () => onNavigate("admission") }}
        secondary={{ label: `Call ${BRAND.phone}`, href: BRAND.phoneHref }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section>
      <Container className="grid items-center gap-12 pb-16 pt-12 sm:pt-16 md:pb-24 md:pt-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
        <div>
          <Reveal>
            <Eyebrow>IELTS institute · Dhaka, Bangladesh</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display mt-6 text-balance text-[2.55rem] font-medium leading-[1.04] tracking-[-0.015em] text-ink sm:text-6xl lg:text-[4.3rem]">
              Band 7+ isn&apos;t a dream. It&apos;s a{" "}
              <em className="italic text-brand">plan</em> — taught in Bangla.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
              We help Bangladeshi students go from stuck-at-5 to 7.5 and
              beyond — with Bengali-first teaching, feedback on every script,
              and mock tests under real pressure.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Btn size="lg" onClick={() => onNavigate("courses")}>
                Explore courses
              </Btn>
              <ArrowLink
                label="Book a free demo class"
                onClick={() => onNavigate("admission")}
              />
            </div>
          </Reveal>
          <Reveal delay={0.28}>
            <p className="mt-11 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-faint">
              8,500+ learners · 59 free lessons · Sat–Thu 10:00–8:00
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative">
          <div
            aria-hidden
            className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] bg-sand sm:translate-x-6 sm:translate-y-6"
          />
          <Figure
            src="/images/hero-main.png"
            alt="Students preparing for IELTS together at ICON English Center"
            ratio="aspect-[4/3]"
            className="relative"
          />
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats band                                                         */
/* ------------------------------------------------------------------ */

function StatsBand() {
  return (
    <section className="border-y border-hairline">
      <Container className="grid grid-cols-2 gap-y-10 py-12 md:grid-cols-4 md:gap-4">
        {HERO_STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <div
              className={cn(
                "md:px-8",
                i === 0 ? "md:pl-0" : "md:border-l md:border-hairline"
              )}
            >
              <Stat value={s.value} suffix={s.suffix} label={s.label} />
            </div>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Philosophy                                                         */
/* ------------------------------------------------------------------ */

function Philosophy({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section className="py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>Why ICON exists</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display mt-5 text-balance text-3xl font-medium leading-[1.12] tracking-[-0.01em] text-ink sm:text-4xl">
              We explain in Bangla — the language you{" "}
              <em className="italic">think</em> in. Then we test in English,
              exactly like the exam.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <ArrowLink
              label="Read our story"
              onClick={() => onNavigate("about")}
              className="mt-9"
            />
          </Reveal>
        </div>
        <div className="space-y-5 text-[15px] leading-relaxed text-ink-soft">
          <Reveal>
            <p>
              Ask any IELTS candidate in Bangladesh what scares them most, and
              few will say the exam itself. They will describe the loneliness
              of preparing for it — studying alone at midnight with a PDF and
              no one to ask. Our teachers knew that fear by name:{" "}
              <span className="font-bengali font-medium text-ink">
                Self Preparation নিয়ে ভীতি.
              </span>
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <p>
              So ICON was built as the opposite of studying alone. Every
              strategy is explained in Bangla first, so nothing stays fuzzy.
              Then you practice exactly like the real exam — in English, under
              real timing, with a teacher who reads your writing and tells you
              the truth about it.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p>
              The free part came naturally: a daily grammar fix on Facebook
              became a YouTube channel of full-length classes, and the channel
              became a community of{" "}
              <strong className="font-semibold text-ink">8,500+ learners</strong>{" "}
              who help each other at 1 a.m. What we charge for is the part
              YouTube can&apos;t give — a roadmap with your name on it,
              feedback on every script, and mocks with a stopwatch&apos;s
              mercy.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Courses index                                                      */
/* ------------------------------------------------------------------ */

function CoursesIndex({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section className="border-y border-hairline bg-sand/60">
      <Container className="py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="Programs"
            title={
              <>
                Six ways in. One goal:{" "}
                <em className="italic text-brand">your</em> band score.
              </>
            }
            className="max-w-xl"
          />
          <ArrowLink
            label="All course details"
            onClick={() => onNavigate("courses")}
            className="shrink-0 pb-1"
          />
        </div>

        <div className="mt-12">
          {COURSES.map((c, i) => (
            <Reveal key={c.slug} delay={Math.min(i * 0.04, 0.2)}>
              <button
                type="button"
                onClick={() => onNavigate("courses")}
                className="group flex w-full cursor-pointer items-center gap-5 border-t border-hairline py-6 text-left last:border-b sm:gap-8"
              >
                <span className="font-mono text-xs tracking-[0.1em] text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="font-display block text-xl font-medium leading-snug tracking-[-0.01em] text-ink transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
                    {c.title}
                  </span>
                  <span className="mt-1 block text-sm text-ink-soft">
                    {c.subtitle}
                    <span className="sm:hidden"> · {c.duration} · {c.price}</span>
                  </span>
                </span>
                <span className="hidden text-[11px] font-medium uppercase tracking-[0.16em] text-ink-faint sm:block">
                  {c.duration} · {c.price}
                </span>
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline text-ink transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Band roadmap                                                       */
/* ------------------------------------------------------------------ */

function BandRoadmap() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHead
          align="center"
          eyebrow="The roadmap"
          title="From stuck at 5 to celebrating 8."
          lede="Our signature progression — the same four stages every batch walks through, at their own pace."
        />
        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {BAND_JOURNEY.map((b, i) => (
            <Reveal
              key={b.band}
              delay={i * 0.07}
              className="relative border-t border-hairline pt-6"
            >
              <span
                aria-hidden
                className={cn(
                  "absolute -top-[3px] left-0 h-1.5 w-1.5 rounded-full",
                  i === BAND_JOURNEY.length - 1
                    ? "h-2 w-2 bg-brand"
                    : "bg-ink-faint"
                )}
              />
              <div
                className={cn(
                  "font-display text-5xl font-medium leading-none tracking-[-0.01em]",
                  i === BAND_JOURNEY.length - 1 ? "text-brand" : "text-ink"
                )}
              >
                {b.band}
              </div>
              <h3 className="mt-4 text-sm font-semibold text-ink">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {b.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Modules                                                            */
/* ------------------------------------------------------------------ */

function Modules() {
  return (
    <section className="border-t border-hairline py-20 md:py-28">
      <Container>
        <SectionHead
          eyebrow="What we teach"
          title="Four modules. Zero confusion."
          lede="Every module has its own strategy classes, drills and feedback loops — all explained in Bangla first."
        />
        <div className="mt-12 grid gap-x-16 gap-y-12 sm:grid-cols-2">
          {MODULES.map((m, i) => (
            <Reveal
              key={m.name}
              delay={i * 0.05}
              className="border-t border-hairline pt-7"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-hairline text-ink">
                  <m.icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-display text-xl font-medium tracking-[-0.01em] text-ink">
                    {m.name}
                  </h3>
                  <p className="font-bengali text-xs text-ink-faint">
                    {m.bnName}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-ink-soft">
                {m.description}
              </p>
              <ul className="mt-4 space-y-2">
                {m.points.map((p) => (
                  <li
                    key={p}
                    className="flex gap-3 text-sm leading-relaxed text-ink-soft"
                  >
                    <span
                      aria-hidden
                      className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-brand/70"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Free lessons teaser                                                */
/* ------------------------------------------------------------------ */

function LessonsTeaser({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const featured = LESSONS[0];
  return (
    <section className="border-y border-hairline bg-sand/60 py-20 md:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="Free lessons, daily"
            title={
              <>
                A full IELTS education,{" "}
                <em className="italic text-brand">free</em> on YouTube.
              </>
            }
            lede="Strategy classes, grammar fixes and module deep-dives — the same teaching we charge for, published for everyone."
            className="max-w-xl"
          />
          <ArrowLink
            label="Browse all 59 lessons"
            onClick={() => onNavigate("lessons")}
            className="shrink-0 pb-1"
          />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.45fr_1fr] lg:gap-10">
          <Reveal>
            <a
              href={getYtLink(featured.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-2xl bg-ink"
            >
              <div className="aspect-video">
                { }
                <img
                  src={getYtThumb(featured.id)}
                  alt={featured.title}
                  loading="lazy"
                  className="img-soft h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <span
                aria-hidden
                className="absolute inset-0 bg-ink/15 transition-colors duration-300 group-hover:bg-ink/5"
              />
              <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper/95 shadow-sm transition-transform duration-300 group-hover:scale-105">
                <Play className="ml-0.5 h-5 w-5 fill-ink text-ink" />
              </span>
              <span className="absolute bottom-4 right-4 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-medium tracking-[0.06em] text-paper backdrop-blur-sm">
                {featured.duration}
              </span>
            </a>
            <p className="mt-4 text-sm font-medium leading-snug text-ink">
              {featured.title}
            </p>
          </Reveal>

          <div className="flex flex-col justify-between gap-4">
            {FEATURED_LESSONS.map((l, i) => (
              <Reveal key={l.id} delay={0.06 * (i + 1)}>
                <a
                  href={getYtLink(l.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4"
                >
                  <span className="relative block w-36 shrink-0 overflow-hidden rounded-xl sm:w-44">
                    <span className="block aspect-video bg-sand-deep">
                      { }
                      <img
                        src={getYtThumb(l.id)}
                        alt={l.title}
                        loading="lazy"
                        className="img-soft h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </span>
                  </span>
                  <span className="min-w-0">
                    <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink-faint">
                      {l.category} · {l.duration}
                    </span>
                    <span className="mt-1.5 block text-sm font-medium leading-snug text-ink transition-colors group-hover:text-brand-deep">
                      {l.title}
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Voices — one quiet rotating quote                                  */
/* ------------------------------------------------------------------ */

function Voices({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % TESTIMONIALS.length),
      7000
    );
    return () => clearInterval(t);
  }, []);

  const t = TESTIMONIALS[idx];

  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-[780px]">
        <Reveal className="text-center">
          <Eyebrow className="justify-center">From the community</Eyebrow>
        </Reveal>

        <div className="mt-10 min-h-[220px] sm:min-h-[190px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center"
            >
              <p className="font-display text-balance text-2xl font-medium italic leading-[1.3] tracking-[-0.005em] text-ink sm:text-[1.75rem]">
                “{t.quote}”
              </p>
              <footer className="mt-8 flex items-center justify-center gap-4">
                { }
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="img-soft h-11 w-11 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-ink-faint">{t.role}</p>
                </div>
                <span className="ml-2 hidden rounded-full border border-brand/20 bg-brand-tint px-3 py-1 text-[11px] font-semibold tracking-[0.04em] text-brand-deep sm:inline-flex">
                  {t.from} → {t.to}
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((x, i) => (
              <button
                key={x.name}
                type="button"
                aria-label={`Show quote from ${x.name}`}
                onClick={() => setIdx(i)}
                className={cn(
                  "h-1.5 cursor-pointer rounded-full transition-all duration-300",
                  i === idx ? "w-6 bg-ink" : "w-1.5 bg-ink-faint/50 hover:bg-ink-faint"
                )}
              />
            ))}
          </div>
          <span className="hidden h-4 w-px bg-hairline sm:block" />
          <ArrowLink
            label="More success stories"
            onClick={() => onNavigate("success")}
            className="text-[13px]"
          />
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-hairline py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHead
            eyebrow="Questions"
            title="Asked before every admission."
            lede="Everything students want to know before their first free class."
          />
        </div>
        <div>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className="border-t border-hairline last:border-b"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left"
                >
                  <span
                    className={cn(
                      "text-[15px] font-medium leading-snug transition-colors",
                      isOpen ? "text-ink" : "text-ink-soft"
                    )}
                  >
                    {f.q}
                  </span>
                  <Plus
                    aria-hidden
                    className={cn(
                      "h-4 w-4 shrink-0 transition-transform duration-300",
                      isOpen ? "rotate-45 text-ink" : "text-ink-faint"
                    )}
                    strokeWidth={1.5}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-6 pr-8 text-sm leading-relaxed text-ink-soft">
                        {f.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
