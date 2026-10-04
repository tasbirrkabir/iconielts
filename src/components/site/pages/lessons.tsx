"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Clock,
  Filter,
  Play,
  Sparkles,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../page-header";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import {
  LESSONS,
  LESSON_CATEGORIES,
  getYtLink,
  getYtThumb,
  type PageId,
} from "@/lib/site-data";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------- */

export function LessonsPage({
  onNavigate,
}: {
  onNavigate: (p: PageId) => void;
}) {
  const [category, setCategory] = useState<(typeof LESSON_CATEGORIES)[number]>("All");

  const featured = LESSONS[0];
  const filtered = useMemo(
    () =>
      category === "All"
        ? LESSONS.slice(1)
        : LESSONS.filter((l) => l.category === category),
    [category]
  );

  return (
    <>
      <PageHeader
        page="lessons"
        eyebrow="Free lessons"
        title={
          <>
            A full IELTS education,{" "}
            <span className="text-gradient-gold">free on YouTube.</span>
          </>
        }
        lead="Full-length strategy classes, quick wins and grammar fixes — recorded by the same instructors who teach our paid batches. Start with any lesson below."
        bn="প্রতিদিন নতুন ফ্রি লেসন — সাবস্ক্রাইব করে পাশে থাকুন"
      />

      {/* Featured lesson */}
      <section className="bg-background py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="grid gap-8 rounded-3xl border border-border bg-card p-5 sm:p-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
              <a
                href={getYtLink(featured.id)}
                target="_blank"
                rel="noreferrer"
                className="group relative block overflow-hidden rounded-2xl"
                aria-label={`Watch: ${featured.title}`}
              >
                <img
                  src={getYtThumb(featured.id)}
                  alt={featured.title}
                  className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coal/70 via-transparent to-transparent" />
                <span className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white shadow-2xl shadow-black/50 transition-all duration-300 group-hover:scale-110">
                  <Play className="ml-1 h-7 w-7 fill-current" />
                </span>
                <span className="absolute bottom-4 left-4 rounded-md bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  Featured lesson
                </span>
                <span className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-md bg-coal/85 px-2.5 py-1 text-xs font-bold text-white backdrop-blur">
                  <Clock className="h-3.5 w-3.5" />
                  {featured.duration}
                </span>
              </a>

              <div className="flex flex-col items-start gap-5">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                  <Sparkles className="h-3.5 w-3.5" />
                  {featured.category}
                </span>
                <h2 className="font-display text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  Our most complete free class — a full 30-day, module-by-module
                  booster plan covering Listening, Reading, Writing and
                  Speaking. If you follow only one free lesson, make it this
                  one.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    className="h-11 rounded-full bg-brand px-6 text-sm font-bold shadow-lg shadow-brand/25 hover:bg-brand-deep"
                    onClick={() =>
                      window.open(getYtLink(featured.id), "_blank")
                    }
                  >
                    <Play className="mr-1.5 h-4 w-4 fill-current" />
                    Watch the full class
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 rounded-full border-coal/20 px-5 text-sm font-bold text-ink hover:border-coal hover:bg-coal hover:text-white"
                    onClick={() =>
                      window.open(
                        "https://www.youtube.com/@ICONEnglishCenterBD?sub_confirmation=1",
                        "_blank"
                      )
                    }
                  >
                    <Bell className="mr-1.5 h-4 w-4" />
                    Subscribe for daily lessons
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* All lessons */}
      <section className="bg-cream py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Lesson library"
            title={
              <>
                Browse <span className="text-gradient-brand">every free lesson</span>{" "}
                we&apos;ve published
              </>
            }
            lead="New lessons every week. Filter by the module you're fighting with today."
          />

          {/* filters */}
          <Reveal className="mb-8 flex flex-wrap items-center gap-2.5">
            <span className="mr-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <Filter className="h-3.5 w-3.5" />
              Filter
            </span>
            {LESSON_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "rounded-full border px-4 py-2 text-[13px] font-bold transition-all duration-200",
                  category === cat
                    ? "border-brand bg-brand text-white shadow-lg shadow-brand/25"
                    : "border-border bg-card text-ink/70 hover:border-brand/40 hover:text-brand"
                )}
              >
                {cat}
                <span
                  className={cn(
                    "ml-2 rounded-full px-1.5 py-0.5 text-[10px]",
                    category === cat
                      ? "bg-white/20 text-white"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {cat === "All"
                    ? LESSONS.length
                    : LESSONS.filter((l) => l.category === cat).length}
                </span>
              </button>
            ))}
          </Reveal>

          {/* grid */}
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((l) => (
                <motion.a
                  layout
                  key={l.id}
                  href={getYtLink(l.id)}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3 }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-2xl hover:shadow-brand/10"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={getYtThumb(l.id)}
                      alt={l.title}
                      loading="lazy"
                      className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-coal/60 to-transparent" />
                    <span className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/95 text-white opacity-90 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
                      <Play className="ml-0.5 h-5 w-5 fill-current" />
                    </span>
                    <span className="absolute bottom-2.5 right-2.5 rounded-md bg-coal/85 px-2 py-0.5 text-[11px] font-bold text-white backdrop-blur">
                      {l.duration}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <span className="w-max rounded-full bg-brand-soft px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-brand">
                      {l.category}
                    </span>
                    <h3 className="font-display mt-2.5 line-clamp-2 text-[15px] font-bold leading-snug text-ink transition-colors group-hover:text-brand">
                      {l.title}
                    </h3>
                    <span className="mt-auto pt-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 transition-colors group-hover:text-brand">
                      Watch on YouTube →
                    </span>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* subscribe banner */}
          <Reveal delay={0.1} className="mt-14">
            <div className="bg-grain relative overflow-hidden rounded-3xl bg-coal px-6 py-10 text-center sm:px-10">
              <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand/25 blur-[100px]" />
              <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-gold/15 blur-[100px]" />
              <div className="relative">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white shadow-xl shadow-brand/40">
                  <Youtube className="h-7 w-7" />
                </span>
                <h3 className="font-display mt-5 text-2xl font-extrabold text-white sm:text-3xl">
                  One new free lesson. Every single day.
                </h3>
                <p className="font-bengali mt-2 text-sm text-gold-bright/90 sm:text-base">
                  সাবস্ক্রাইব করুন এবং প্রতিদিন নতুন IELTS টিপস ও ফ্রি লেসন পেতে
                  আমাদের সাথে থাকুন
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <Button
                    size="lg"
                    className="h-12 rounded-full bg-brand px-7 text-[15px] font-bold shadow-xl shadow-brand/35 transition-all hover:scale-[1.03] hover:bg-brand-deep"
                    onClick={() =>
                      window.open(
                        "https://www.youtube.com/@ICONEnglishCenterBD?sub_confirmation=1",
                        "_blank"
                      )
                    }
                  >
                    <Youtube className="mr-2 h-5 w-5" />
                    Subscribe on YouTube
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-full border-white/20 bg-white/5 px-6 text-[15px] font-bold text-white backdrop-blur hover:border-white/40 hover:bg-white/10"
                    onClick={() => onNavigate("admission")}
                  >
                    Ready for the full course?
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
