"use client";

import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  MessageCircle,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "../page-header";
import { Reveal } from "../reveal";
import { SectionHeading } from "../section-heading";
import { COURSES, type PageId } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------- */

export function CoursesPage({
  onNavigate,
  onEnroll,
}: {
  onNavigate: (p: PageId) => void;
  onEnroll: (slug: string) => void;
}) {
  return (
    <>
      <PageHeader
        page="courses"
        eyebrow="Courses &amp; fees"
        title={
          <>
            Six programs. One goal:{" "}
            <span className="text-gradient-gold">your highest band.</span>
          </>
        }
        lead="Whether you have three months or thirty days, a shaky grammar base or a stubborn Band 6.5 — there's a course built for exactly where you stand."
      />

      {/* Course grid */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:gap-12">
          {COURSES.map((c, i) => (
            <Reveal key={c.slug}>
              <article
                className={cn(
                  "group grid overflow-hidden rounded-3xl border bg-card transition-all duration-300 hover:shadow-2xl hover:shadow-brand/10 lg:grid-cols-[1fr_1.25fr]",
                  c.popular
                    ? "border-brand/35 shadow-xl shadow-brand/10"
                    : "border-border hover:border-brand/25"
                )}
              >
                {/* image side */}
                <div className="relative min-h-[240px] overflow-hidden lg:min-h-full">
                  <Image
                    src={c.image}
                    alt={c.title}
                    width={640}
                    height={480}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coal/80 via-coal/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-bright">
                        {c.subtitle}
                      </p>
                      <h2 className="font-display mt-1 text-2xl font-extrabold text-white sm:text-[1.7rem]">
                        {c.title}
                      </h2>
                    </div>
                  </div>
                  {c.badge ? (
                    <span className="absolute left-5 top-5 rounded-full bg-brand px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-lg">
                      {c.badge}
                    </span>
                  ) : null}
                </div>

                {/* content side */}
                <div className="flex flex-col p-6 sm:p-8">
                  <p className="text-[15px] leading-relaxed text-muted-foreground">
                    {c.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-ink/80">
                    <span className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-brand" />
                      {c.duration}
                    </span>
                    <span className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-brand" />
                      {c.classes}
                    </span>
                  </div>

                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {c.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-[13.5px] leading-snug text-ink/75"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-2xl bg-cream p-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                      Outcomes
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {c.outcomes.map((o) => (
                        <Badge
                          key={o}
                          variant="outline"
                          className="rounded-full border-brand/25 bg-white px-3 py-1 text-[11.5px] font-semibold text-ink/80"
                        >
                          <BadgeCheck className="mr-1 h-3.5 w-3.5 text-brand" />
                          {o}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6"
                  style={{ marginTop: "1.75rem" }}>
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-display text-3xl font-extrabold text-ink">
                        {c.price}
                      </span>
                      {c.oldPrice ? (
                        <span className="text-sm font-semibold text-muted-foreground line-through">
                          {c.oldPrice}
                        </span>
                      ) : null}
                      <span className="text-xs text-muted-foreground">
                        {c.slug === "one-to-one" ? "per month" : "full course"}
                      </span>
                    </div>
                    <div className="flex gap-2.5">
                      <Button
                        variant="outline"
                        onClick={() => onNavigate("lessons")}
                        className="h-11 rounded-full border-border px-5 text-sm font-bold text-ink hover:border-brand hover:text-brand"
                      >
                        Free preview
                      </Button>
                      <Button
                        onClick={() => onEnroll(c.slug)}
                        className={cn(
                          "h-11 rounded-full px-6 text-sm font-bold shadow-lg transition-all hover:scale-[1.03]",
                          c.popular
                            ? "bg-brand shadow-brand/30 hover:bg-brand-deep"
                            : "bg-coal shadow-coal/25 hover:bg-coal-soft"
                        )}
                      >
                        Enroll now
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How admission works */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Getting started"
            title={
              <>
                From first message to first class —{" "}
                <span className="text-gradient-brand">in three steps</span>
              </>
            }
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: MessageCircle,
                step: "Step 1",
                title: "Book a free counseling",
                body: "Message us on WhatsApp or fill the admission form. We'll schedule a free call or center visit at your convenience.",
              },
              {
                icon: ClipboardCheck,
                step: "Step 2",
                title: "Take the diagnostic mock",
                body: "A free full-length mock test reveals your current estimated band and exactly which modules are holding you back.",
              },
              {
                icon: Trophy,
                step: "Step 3",
                title: "Start with your roadmap",
                body: "Get a personal course recommendation and study plan, join the batch (online or offline) and start climbing.",
              },
            ].map((s, i) => (
              <Reveal key={s.title} delay={i * 0.09}>
                <div className="relative h-full rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/10">
                  <span className="font-display absolute right-6 top-6 text-5xl font-extrabold leading-none text-brand/10">
                    {i + 1}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white shadow-lg shadow-brand/30">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-brand">
                    {s.step}
                  </p>
                  <h3 className="font-display mt-2 text-xl font-bold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-12 flex flex-col items-center gap-4">
            <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="h-4 w-4 text-gold" />
              Early-bird discount available for upcoming batches
            </p>
            <Button
              onClick={() => onEnroll("ielts-full")}
              size="lg"
              className="h-12 rounded-full bg-brand px-8 text-[15px] font-bold shadow-xl shadow-brand/25 transition-all hover:scale-[1.03] hover:bg-brand-deep"
            >
              Start with Step 1 — it&apos;s free
              <Users className="ml-1.5 h-4.5 w-4.5" />
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
