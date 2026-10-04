"use client";

import Image from "next/image";
import {
  ArrowRight,
  Award,
  Quote,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../page-header";
import { Reveal } from "../reveal";
import { Counter } from "../counter";
import { SectionHeading } from "../section-heading";
import { TESTIMONIALS, type PageId } from "@/lib/site-data";

/* ---------------------------------------------------------------- */

export function SuccessPage({
  onNavigate,
}: {
  onNavigate: (p: PageId) => void;
}) {
  return (
    <>
      <PageHeader
        page="success"
        eyebrow="Success stories"
        title={
          <>
            They were stuck too.{" "}
            <span className="text-gradient-gold">Then they weren&apos;t.</span>
          </>
        }
        lead="Every score below started with the same message we hear every day: 'Sir, I don't think I can go beyond Band 5.5.' Here's what happened next."
      />

      {/* Stats band */}
      <section className="border-b border-border bg-background py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4">
          {[
            { value: 1200, suffix: "+", label: "Students taught" },
            { value: 87, suffix: "%", label: "Improve by 1+ band" },
            { value: 62, suffix: "%", label: "Reach Band 7 or higher" },
            { value: 500, suffix: "+", label: "Mocks evaluated yearly" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07} className="text-center">
              <Counter
                value={s.value}
                suffix={s.suffix}
                className="font-display text-4xl font-extrabold text-ink sm:text-5xl"
              />
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground sm:text-sm">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials grid */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="In their words"
            title={
              <>
                The messages that make{" "}
                <span className="text-gradient-brand">our day</span>
              </>
            }
            lead="Real journeys from real students — every band improvement below was verified with official TRFs."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={(i % 2) * 0.08}>
                <figure className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-2xl hover:shadow-brand/10 sm:p-8">
                  <Quote className="absolute -right-3 -top-3 h-20 w-20 text-brand/5 transition-colors group-hover:text-brand/10" />
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        width={56}
                        height={56}
                        className="h-14 w-14 rounded-full border-2 border-brand/20 object-cover"
                      />
                      <div>
                        <figcaption className="font-display text-lg font-bold text-ink">
                          {t.name}
                        </figcaption>
                        <p className="text-xs font-medium text-muted-foreground">
                          {t.role}
                        </p>
                        <div className="mt-1 flex gap-0.5 text-gold">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} className="h-3 w-3 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-col items-center rounded-2xl bg-cream px-3.5 py-2.5">
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        <TrendingUp className="h-3 w-3 text-brand" />
                        Score
                      </span>
                      <span className="mt-0.5 flex items-baseline gap-1.5">
                        <span className="text-sm font-bold text-muted-foreground line-through">
                          {t.from}
                        </span>
                        <ArrowRight className="h-3 w-3 text-brand" />
                        <span className="font-display text-xl font-extrabold text-gradient-brand">
                          {t.to}
                        </span>
                      </span>
                    </div>
                  </div>
                  <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-ink/75">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <p className="mt-5 border-t border-border pt-4 text-xs font-bold uppercase tracking-[0.14em] text-brand">
                    {t.course}
                  </p>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Band 5 vs Band 9 */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="The ICON difference"
            title={
              <>
                Same question.{" "}
                <span className="text-gradient-brand">Different bands.</span>
              </>
            }
            lead="From our viral Facebook series — a Band 5 answer and a Band 9 answer to the same speaking question. The gap is smaller than you think."
          />

          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-ink/5">
              <div className="flex items-center justify-between gap-3 border-b border-border bg-coal px-5 py-4 sm:px-7">
                <p className="font-display text-sm font-bold text-white sm:text-base">
                  Examiner asks:{" "}
                  <span className="text-gold-bright">
                    &ldquo;What is your favorite drink?&rdquo;
                  </span>
                </p>
                <span className="hidden rounded-full bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white sm:block">
                  Speaking Part 1
                </span>
              </div>
              <div className="grid md:grid-cols-2 md:divide-x md:divide-border">
                <div className="p-6 sm:p-8">
                  <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                    Band 5 answer
                  </span>
                  <p className="mt-4 font-medium leading-relaxed text-muted-foreground">
                    &ldquo;My favorite drink is tea. I drink tea every day. In
                    Bangladesh everyone likes tea. My mother makes tea in the
                    morning. It is good for health maybe. I like it very
                    much.&rdquo;
                  </p>
                  <ul className="mt-5 flex flex-col gap-2 border-t border-border pt-4 text-[13px] text-muted-foreground">
                    <li className="line-through decoration-brand/60">
                      No reason or example given
                    </li>
                    <li className="line-through decoration-brand/60">
                      Repetitive, basic vocabulary
                    </li>
                    <li className="line-through decoration-brand/60">
                      No opinion nuance or extension
                    </li>
                  </ul>
                </div>
                <div className="relative bg-brand-soft/40 p-6 sm:p-8">
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-white">
                    Band 9 answer
                  </span>
                  <p className="mt-4 font-medium leading-relaxed text-ink">
                    &ldquo;I&apos;d definitely say tea — but not just any tea.
                    There&apos;s something almost ceremonial about milky cha back
                    home; the moment the kettle goes on, the whole house slows
                    down. Rainy afternoons with a cup in hand and deep-fried
                    snacks? That&apos;s my idea of perfection.&rdquo;
                  </p>
                  <ul className="mt-5 flex flex-col gap-2 border-t border-brand/20 pt-4 text-[13px] text-ink/75">
                    <li className="flex items-start gap-2">
                      <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                      Opinion + reason + vivid example
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                      Idiomatic, topic-specific vocabulary
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                      Natural fluency &amp; personal voice
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              We break down one answer like this every day on our{" "}
              <a
                href="https://www.facebook.com/iconenglishcenter"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand"
              >
                Facebook page
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* Success wall + CTA */}
      <section className="bg-grain relative overflow-hidden bg-coal py-16 sm:py-24">
        <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-brand/20 blur-[130px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/50">
                <Image
                  src="/images/success-wall.png"
                  alt="ICON English Center students celebrating their IELTS results"
                  width={1344}
                  height={768}
                  className="aspect-[7/5] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coal/70 to-transparent" />
              </div>
              <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl border border-white/15 bg-coal-soft/95 p-4 shadow-2xl backdrop-blur">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-soft text-gold">
                  <Award className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-display text-lg font-extrabold leading-tight text-white">
                    Results day at ICON
                  </p>
                  <p className="text-xs text-white/55">
                    TRFs opened together, every month
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              dark
              align="left"
              className="mb-6"
              eyebrow="Your turn"
              title={
                <>
                  The next success story{" "}
                  <span className="text-gradient-gold">has your name on it.</span>
                </>
              }
              lead="Take the free diagnostic mock, get your roadmap, and give us one course of honest effort. The rest is methodology — and that's our job."
            />
            <Reveal delay={0.12} className="flex flex-wrap gap-3.5">
              <Button
                size="lg"
                onClick={() => onNavigate("admission")}
                className="h-12 rounded-full bg-brand px-7 text-[15px] font-bold shadow-xl shadow-brand/30 transition-all hover:scale-[1.03] hover:bg-brand-deep"
              >
                Start my journey
                <ArrowRight className="ml-1 h-4.5 w-4.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate("courses")}
                className="h-12 rounded-full border-white/20 bg-white/5 px-6 text-[15px] font-bold text-white backdrop-blur hover:border-white/40 hover:bg-white/10"
              >
                Compare courses
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
