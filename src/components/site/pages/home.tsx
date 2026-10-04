"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Play,
  Quote,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "../reveal";
import { Counter } from "../counter";
import { SectionHeading } from "../section-heading";
import {
  BAND_JOURNEY,
  BRAND,
  COURSES,
  FAQS,
  getYtThumb,
  LESSONS,
  MODULES,
  STATS,
  TESTIMONIALS,
  WHY_ICON,
  type PageId,
} from "@/lib/site-data";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------- */

export function HomePage({
  onNavigate,
}: {
  onNavigate: (p: PageId) => void;
}) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <Marquee />
      <WhyIcon />
      <Modules />
      <BandJourney onNavigate={onNavigate} />
      <CoursesPreview onNavigate={onNavigate} />
      <LessonsPreview onNavigate={onNavigate} />
      <Testimonials />
      <Faq />
      <CtaBanner onNavigate={onNavigate} />
    </>
  );
}

/* ---------------------------------------------------------------- */
/*  Hero                                                             */
/* ---------------------------------------------------------------- */

function Hero({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section className="bg-grain relative overflow-hidden bg-coal">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-brand/25 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-52 right-[-120px] h-[520px] w-[520px] rounded-full bg-gold/10 blur-[160px]" />
      <div className="bg-dots-light pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-2 lg:items-center lg:gap-10 lg:pb-24 lg:pt-24">
        {/* copy */}
        <div className="flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-white/80 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            Bangladesh&apos;s Bengali-first IELTS academy
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-6 text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]"
          >
            Break free.
            <br />
            Turn{" "}
            <span className="relative inline-block">
              <span className="text-gradient-gold">Band 5</span>
              <svg
                viewBox="0 0 120 12"
                className="absolute -bottom-1 left-0 w-full text-brand"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 9c25-6 65-8 114-4"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            into{" "}
            <span className="relative inline-block text-white">
              <span className="absolute inset-0 -z-10 translate-y-1 rounded-lg bg-brand px-2" />
              Band 8
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg"
          >
            Grammar, fear, vocabulary, time — we break the chains holding your
            English back. Expert-led IELTS preparation explained in{" "}
            <span className="font-semibold text-white">Bangla</span>, practiced
            in English, proven in results.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="font-bengali mt-3 text-sm text-gold-bright/90 sm:text-base"
          >
            {BRAND.taglineBn}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3.5"
          >
            <Button
              size="lg"
              onClick={() => onNavigate("courses")}
              className="h-12 rounded-full bg-brand px-7 text-[15px] font-bold shadow-xl shadow-brand/35 transition-all hover:scale-[1.03] hover:bg-brand-deep"
            >
              Explore Courses
              <ArrowRight className="ml-1 h-4.5 w-4.5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate("lessons")}
              className="group h-12 rounded-full border-white/20 bg-white/5 px-6 text-[15px] font-bold text-white backdrop-blur transition-all hover:border-white/40 hover:bg-white/10"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white transition-transform group-hover:scale-110">
                <Play className="ml-0.5 h-3 w-3 fill-current" />
              </span>
              Watch Free Lessons
            </Button>
          </motion.div>

          {/* trust row */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <div className="flex -space-x-3">
              {TESTIMONIALS.map((t) => (
                <Image
                  key={t.name}
                  src={t.avatar}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border-2 border-coal object-cover"
                />
              ))}
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-coal bg-brand text-[10px] font-extrabold text-white">
                8.5K+
              </span>
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-1 text-gold-bright">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-1 font-medium text-white/60">
                Joined by <span className="font-bold text-white">8,500+</span>{" "}
                learners &amp; their families
              </p>
            </div>
          </motion.div>
        </div>

        {/* visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[560px]"
        >
          {/* main image card */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50">
            <Image
              src="/images/hero-main.png"
              alt="Students of ICON English Center studying IELTS together"
              width={1344}
              height={768}
              priority
              className="aspect-[7/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-coal/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
              <div>
                <p className="font-display text-sm font-bold text-white">
                  IELTS Writing Marathon
                </p>
                <p className="text-xs text-white/70">
                  Live batch · Dhaka &amp; online
                </p>
              </div>
              <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
                Band 7+ target
              </span>
            </div>
          </div>

          {/* floating card — band score */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 top-8 rounded-2xl border border-white/40 bg-white/95 p-4 shadow-2xl backdrop-blur sm:-left-8"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-soft text-gold">
                <TrendingUp className="h-5.5 w-5.5" />
              </span>
              <div>
                <p className="font-display text-xl font-extrabold leading-none text-ink">
                  5.0 → 8.0
                </p>
                <p className="mt-1 text-[11px] font-medium text-muted-foreground">
                  Average student journey
                </p>
              </div>
            </div>
          </motion.div>

          {/* floating card — youtube */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
            className="absolute -bottom-6 -right-3 rounded-2xl border border-white/10 bg-coal-soft/95 p-4 shadow-2xl backdrop-blur sm:-right-7"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white">
                <Youtube className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-sm font-bold text-white">
                  Free lesson daily
                </p>
                <p className="text-[11px] text-white/55">
                  59+ videos · new uploads weekly
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* stats bar */}
      <div className="relative border-t border-white/10 bg-black/20 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-4 sm:px-6 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex flex-col items-center gap-1 px-3 py-6 text-center"
            >
              <Counter
                value={s.value}
                suffix={s.suffix}
                className="font-display text-2xl font-extrabold text-white sm:text-3xl"
              />
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/45 sm:text-xs">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Marquee                                                          */
/* ---------------------------------------------------------------- */

function Marquee() {
  const items = [
    "Listening",
    "Reading",
    "Writing",
    "Speaking",
    "Vocabulary",
    "Grammar",
    "Mock Tests",
    "Band 7+ Strategy",
  ];
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-brand-dark/40 bg-brand py-3.5">
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-display text-sm font-bold uppercase tracking-[0.2em] text-white/95"
          >
            {item}
            <Sparkles className="h-4 w-4 text-white/50" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Why ICON                                                         */
/* ---------------------------------------------------------------- */

function WhyIcon() {
  return (
    <section className="relative bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why ICON"
          title={
            <>
              More than a coaching center —{" "}
              <span className="text-gradient-brand">a movement</span>
            </>
          }
          lead="We started ICON to fix what frustrates Bangladeshi English learners the most: confusing lessons, no feedback, and fear. Every part of our system is built against those three enemies."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_ICON.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/10">
                <span className="font-display absolute -right-2 -top-4 text-[5.5rem] font-extrabold leading-none text-brand/5 transition-colors group-hover:text-brand/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <CheckCircle2 className="h-5.5 w-5.5" />
                </span>
                <h3 className="font-display relative mt-5 text-lg font-bold leading-snug text-ink">
                  {f.title}
                </h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Modules                                                          */
/* ---------------------------------------------------------------- */

function Modules() {
  return (
    <section className="bg-grain relative overflow-hidden bg-coal py-16 sm:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-brand/15 blur-[150px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          dark
          eyebrow="The four modules"
          title={
            <>
              Every module. Every question type.{" "}
              <span className="text-gradient-brand">Zero blind spots.</span>
            </>
          }
          lead="Listening, Reading, Writing and Speaking — each module gets dedicated strategy classes, drills, and feedback until the techniques become muscle memory."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MODULES.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/50 hover:bg-white/[0.07]">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white shadow-lg shadow-brand/30 transition-transform duration-300 group-hover:scale-110">
                    <m.icon className="h-6 w-6" />
                  </span>
                  <span className="font-bengali text-sm font-semibold text-gold-bright/80">
                    {m.bnName}
                  </span>
                </div>
                <h3 className="font-display mt-5 text-xl font-bold text-white">
                  {m.name}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-white/55">
                  {m.description}
                </p>
                <ul className="mt-5 flex flex-col gap-2 border-t border-white/10 pt-4">
                  {m.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2 text-[13px] text-white/70"
                    >
                      <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Band journey (stairs)                                            */
/* ---------------------------------------------------------------- */

function BandJourney({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section className="relative overflow-hidden bg-cream py-16 sm:py-24">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The climb"
          title={
            <>
              From <span className="text-brand">stuck at Band 5</span> to
              celebrating Band 8
            </>
          }
          lead="Self-preparation with random YouTube videos keeps you circling the same band. Our staircase takes you up one proven step at a time."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
          {BAND_JOURNEY.map((step, i) => (
            <Reveal key={step.band} delay={i * 0.1} className="h-full">
              <div
                className={cn(
                  "group relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-2",
                  i === BAND_JOURNEY.length - 1
                    ? "border-brand bg-brand text-white shadow-2xl shadow-brand/30"
                    : "border-border bg-card hover:border-brand/30 hover:shadow-xl hover:shadow-brand/10"
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "font-display text-4xl font-extrabold tracking-tight",
                      i === BAND_JOURNEY.length - 1
                        ? "text-white"
                        : "text-brand"
                    )}
                  >
                    {step.band}
                  </span>
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold",
                      i === BAND_JOURNEY.length - 1
                        ? "bg-white/20 text-white"
                        : "bg-brand-soft text-brand"
                    )}
                  >
                    {i + 1}
                  </span>
                </div>
                <h3
                  className={cn(
                    "font-display mt-4 text-lg font-bold",
                    i === BAND_JOURNEY.length - 1 ? "text-white" : "text-ink"
                  )}
                >
                  {step.title}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-sm leading-relaxed",
                    i === BAND_JOURNEY.length - 1
                      ? "text-white/80"
                      : "text-muted-foreground"
                  )}
                >
                  {step.description}
                </p>
                {i < BAND_JOURNEY.length - 1 && (
                  <ArrowUpRight
                    className={cn(
                      "absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-brand/40 lg:block"
                    )}
                  />
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10 flex justify-center">
          <Button
            onClick={() => onNavigate("admission")}
            size="lg"
            className="h-12 rounded-full bg-brand px-7 text-[15px] font-bold shadow-xl shadow-brand/25 transition-all hover:scale-[1.03] hover:bg-brand-deep"
          >
            Get my personal roadmap
            <ArrowRight className="ml-1 h-4.5 w-4.5" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Courses preview                                                  */
/* ---------------------------------------------------------------- */

function CoursesPreview({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const featured = COURSES.filter((c) =>
    ["ielts-full", "ielts-crash", "spoken-english"].includes(c.slug)
  );
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Courses"
          title={
            <>
              Pick your battlefield.{" "}
              <span className="text-gradient-brand">We&apos;ll bring the map.</span>
            </>
          }
          lead="Six focused programs — from zero-grammar foundation to last-month crash prep. Every course includes mocks, feedback and direct mentor access."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.08}>
              <button
                onClick={() => onNavigate("courses")}
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-2xl hover:shadow-brand/10"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.title}
                    width={640}
                    height={480}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {c.badge ? (
                    <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-lg">
                      {c.badge}
                    </span>
                  ) : null}
                  <span className="absolute bottom-4 right-4 rounded-full bg-coal/80 px-3 py-1 font-display text-sm font-extrabold text-gold-bright backdrop-blur">
                    {c.price}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
                    {c.subtitle}
                  </p>
                  <h3 className="font-display mt-1.5 text-xl font-bold text-ink">
                    {c.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {c.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-3.5 w-3.5" />
                        {c.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {c.classes}
                      </span>
                    </div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-brand transition-all group-hover:bg-brand group-hover:text-white">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-10 flex justify-center">
          <Button
            onClick={() => onNavigate("courses")}
            variant="outline"
            size="lg"
            className="h-12 rounded-full border-brand/30 px-7 text-[15px] font-bold text-brand transition-all hover:bg-brand hover:text-white"
          >
            View all 6 courses
            <ArrowRight className="ml-1 h-4.5 w-4.5" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Free lessons preview                                             */
/* ---------------------------------------------------------------- */

function LessonsPreview({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const picks = LESSONS.filter((l) =>
    ["NBAHzwuyxQ8", "nD2H-yuUh8A", "Y-Ofe59netE"].includes(l.id)
  );
  return (
    <section className="bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            className="mb-0"
            eyebrow="Free lessons"
            title={
              <>
                Can&apos;t afford a course?{" "}
                <span className="text-gradient-brand">Start free today.</span>
              </>
            }
            lead="Full-length classes, tips and grammar fixes on our YouTube channel — the same teaching quality, zero taka."
          />
          <Reveal className="shrink-0">
            <Button
              onClick={() => onNavigate("lessons")}
              className="h-12 rounded-full bg-coal px-6 text-sm font-bold text-white hover:bg-coal-soft"
            >
              <Youtube className="mr-2 h-5 w-5 text-brand" />
              Browse all free lessons
            </Button>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {picks.map((l, i) => (
            <Reveal key={l.id} delay={i * 0.08}>
              <a
                href={`https://www.youtube.com/watch?v=${l.id}`}
                target="_blank"
                rel="noreferrer"
                className="group block overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-2xl hover:shadow-brand/10"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={getYtThumb(l.id)}
                    alt={l.title}
                    loading="lazy"
                    className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coal/60 to-transparent" />
                  <span className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-2xl shadow-black/40 transition-all duration-300 group-hover:scale-110">
                    <Play className="ml-0.5 h-6 w-6 fill-current" />
                  </span>
                  <span className="absolute bottom-3 right-3 rounded-md bg-coal/85 px-2 py-0.5 text-[11px] font-bold text-white backdrop-blur">
                    {l.duration}
                  </span>
                </div>
                <div className="p-4">
                  <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-brand">
                    {l.category}
                  </span>
                  <h3 className="font-display mt-2.5 line-clamp-2 text-[15px] font-bold leading-snug text-ink transition-colors group-hover:text-brand">
                    {l.title}
                  </h3>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Testimonials                                                     */
/* ---------------------------------------------------------------- */

function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const t = TESTIMONIALS[index];

  const move = (d: number) => {
    setDir(d);
    setIndex((p) => (p + d + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="relative overflow-hidden bg-coal py-16 sm:py-24">
      <div className="bg-grain absolute inset-0" />
      <div className="pointer-events-none absolute -right-32 top-10 h-[380px] w-[380px] rounded-full bg-brand/20 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          dark
          eyebrow="Student results"
          title={
            <>
              Real students. Real bands.{" "}
              <span className="text-gradient-gold">Real stories.</span>
            </>
          }
        />

        <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-[1fr_1.4fr]">
          {/* score card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={t.name}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.4 }}
              className="mx-auto w-full max-w-sm"
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-7 backdrop-blur">
                <Quote className="h-8 w-8 text-brand" />
                <p className="font-display mt-5 text-2xl font-extrabold text-white">
                  {t.name}
                </p>
                <p className="mt-1 text-sm text-white/55">{t.role}</p>
                <div className="mt-6 flex items-center gap-4 rounded-2xl bg-black/30 p-4">
                  <div className="text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                      From
                    </p>
                    <p className="font-display text-2xl font-extrabold text-white/60 line-through decoration-white/30">
                      {t.from}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-brand" />
                  <div className="text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                      To
                    </p>
                    <p className="font-display text-3xl font-extrabold text-gradient-gold">
                      {t.to}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gold-bright/80">
                  {t.course}
                </p>
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={96}
                  height={96}
                  className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl border-4 border-coal object-cover opacity-90"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* quote */}
          <div>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.blockquote
                key={t.name}
                initial={{ opacity: 0, y: 24 * dir }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 * dir }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="min-h-[220px]"
              >
                <div className="flex gap-1 text-gold-bright">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="font-display mt-5 text-xl font-medium leading-relaxed text-white/90 sm:text-2xl">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </motion.blockquote>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDir(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    aria-label={`Show testimonial ${i + 1}`}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      i === index
                        ? "w-8 bg-brand"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    )}
                  />
                ))}
              </div>
              <div className="flex gap-2.5">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => move(-1)}
                  aria-label="Previous testimonial"
                  className="h-11 w-11 rounded-full border-white/15 bg-white/5 text-white hover:border-brand hover:bg-brand"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => move(1)}
                  aria-label="Next testimonial"
                  className="h-11 w-11 rounded-full border-white/15 bg-white/5 text-white hover:border-brand hover:bg-brand"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  FAQ                                                              */
/* ---------------------------------------------------------------- */

function Faq() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Questions"
          title={
            <>
              Everything students ask{" "}
              <span className="text-gradient-brand">before joining</span>
            </>
          }
        />
        <Reveal>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-border"
              >
                <AccordionTrigger className="group rounded-xl px-5 py-4 text-left font-display text-[15px] font-bold text-ink hover:bg-brand-soft/50 hover:no-underline sm:text-base [&[data-state=open]]:bg-brand-soft/60 [&[data-state=open]>svg]:text-brand">
                  <span className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-extrabold text-brand">
                      {i + 1}
                    </span>
                    {f.q}
                  </span>
                  <ChevronDown className="h-4.5 w-4.5 shrink-0 text-muted-foreground transition-transform duration-300" />
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5 pt-1 text-sm leading-relaxed text-muted-foreground sm:pl-[3.75rem] sm:text-[15px]">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  CTA banner                                                       */
/* ---------------------------------------------------------------- */

function CtaBanner({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand via-brand-deep to-brand-dark py-16 sm:py-20">
      <div className="bg-grain absolute inset-0" />
      <div className="bg-dots-light pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-[100px]" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 text-center sm:px-6">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            New batches every month
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display mt-6 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Your dream band score is
            <br className="hidden sm:block" /> one decision away.
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="font-bengali mt-4 text-base text-white/85 sm:text-lg">
            আজই শুরু করুন — বাকিটা আমরা একসাথে করব।
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-8 flex flex-wrap justify-center gap-3.5">
          <Button
            size="lg"
            onClick={() => onNavigate("admission")}
            className="h-12 rounded-full bg-white px-7 text-[15px] font-extrabold text-brand shadow-2xl shadow-black/25 transition-all hover:scale-[1.03] hover:bg-cream"
          >
            Book a Free Demo Class
            <ArrowRight className="ml-1 h-4.5 w-4.5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => onNavigate("lessons")}
            className="h-12 rounded-full border-white/40 bg-white/5 px-6 text-[15px] font-bold text-white backdrop-blur transition-all hover:border-white hover:bg-white/15"
          >
            <Youtube className="mr-2 h-5 w-5" />
            Try Free Lessons First
          </Button>
        </Reveal>
        <Reveal delay={0.26}>
          <p className="mt-6 text-xs font-medium text-white/60">
            Free diagnostic mock test included with every counseling session
          </p>
        </Reveal>
      </div>
    </section>
  );
}
