"use client";

import Image from "next/image";
import {
  ArrowRight,
  BookHeart,
  Compass,
  Facebook,
  HeartHandshake,
  Instagram,
  Music2,
  Target,
  Users,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "../page-header";
import { Reveal } from "../reveal";
import { Counter } from "../counter";
import { SectionHeading } from "../section-heading";
import { BRAND, type PageId } from "@/lib/site-data";

/* ---------------------------------------------------------------- */

export function AboutPage({
  onNavigate,
}: {
  onNavigate: (p: PageId) => void;
}) {
  return (
    <>
      <PageHeader
        page="about"
        eyebrow="About ICON"
        title={
          <>
            Built by teachers who were once{" "}
            <span className="text-gradient-gold">stuck at Band 5</span> too.
          </>
        }
        lead="ICON English Center began with a simple frustration: brilliant Bangladeshi students losing opportunities because English was taught in a way that confused them. We rebuilt the process from zero."
        bn={BRAND.taglineBn}
        image="/images/about-story.png"
        imageAlt="An ICON English Center instructor teaching English in a classroom"
      />

      {/* Story */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-border shadow-2xl shadow-ink/10">
                <Image
                  src="/images/about-story.png"
                  alt="English class in session at ICON English Center"
                  width={1344}
                  height={768}
                  className="aspect-[7/5] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 rounded-2xl bg-brand p-5 text-white shadow-2xl shadow-brand/40 sm:-right-6">
                <p className="font-display text-3xl font-extrabold leading-none">
                  8,500+
                </p>
                <p className="mt-1.5 text-xs font-medium text-white/80">
                  learners in our community
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              className="mb-6"
              eyebrow="Our story"
              title={
                <>
                  We teach the class{" "}
                  <span className="text-gradient-brand">we needed</span> as
                  students.
                </>
              }
            />
            <Reveal delay={0.08}>
              <div className="flex flex-col gap-4 text-[15px] leading-relaxed text-muted-foreground">
                <p>
                  Most of our team grew up memorizing grammar rules without ever
                  holding a conversation. When we finally prepared for IELTS
                  ourselves, we discovered that the exam rewards{" "}
                  <span className="font-semibold text-ink">strategy</span> and{" "}
                  <span className="font-semibold text-ink">feedback</span> — not
                  memorization.
                </p>
                <p>
                  So ICON English Center was built around three promises:
                  explain everything in Bangla so nothing stays confusing, give
                  feedback on every piece of work, and publish as much
                  high-quality teaching as we can{" "}
                  <span className="font-semibold text-brand">completely free</span>.
                </p>
                <p>
                  Today our free lessons reach students across Bangladesh every
                  day, and our courses carry them from Band 5 to the scores that
                  unlock scholarships, visas and careers abroad.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.16} className="mt-8">
              <Button
                onClick={() => onNavigate("success")}
                size="lg"
                className="h-12 rounded-full bg-brand px-6 text-[15px] font-bold shadow-xl shadow-brand/25 transition-all hover:scale-[1.03] hover:bg-brand-deep"
              >
                See student results
                <ArrowRight className="ml-1 h-4.5 w-4.5" />
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="What drives us"
            title={
              <>
                Mission, vision &amp;{" "}
                <span className="text-gradient-brand">non-negotiables</span>
              </>
            }
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Our Mission",
                body: "Make band-score-breaking IELTS preparation accessible to every Bangladeshi student — in their own language, at a fair price, with feedback that actually moves the needle.",
                accent: "bg-brand-soft text-brand",
              },
              {
                icon: Compass,
                title: "Our Vision",
                body: "An Bangladesh where no dream — scholarship, migration, career — dies because of an English test score. We measure ourselves by the doors our students walk through.",
                accent: "bg-gold-soft text-gold",
              },
              {
                icon: HeartHandshake,
                title: "Our Values",
                body: "Clarity over jargon. Feedback over lectures. Free education wherever possible. Students' trust over quick profits — always.",
                accent: "bg-brand-soft text-brand",
              },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="group h-full rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/10">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${v.accent}`}
                  >
                    <v.icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-display mt-5 text-xl font-bold text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="The faculty"
            title={
              <>
                Learn from instructors who{" "}
                <span className="text-gradient-brand">scored it first</span>
              </>
            }
            lead="Every ICON instructor has personally achieved Band 8+ and trained under our teaching system before facing a single student."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 lg:max-w-4xl lg:mx-auto">
            {[
              {
                image: "/images/teacher-1.png",
                name: "Our Lead IELTS Instructor",
                role: "Writing & Reading Specialist",
                bio: "Has evaluated thousands of Task 1 & Task 2 scripts against official band descriptors. Known for turning 'I have no idea what to write' into a repeatable essay formula.",
                tags: ["Band 8.5 Overall", "10+ years teaching"],
              },
              {
                image: "/images/teacher-2.png",
                name: "Our Speaking & Listening Coach",
                role: "Fluency & Pronunciation Specialist",
                bio: "Runs our speaking clubs and mock interviews. Specializes in breaking speaking fear with Band 5 vs Band 9 answer modelling and daily fluency drills.",
                tags: ["Band 8.0 Speaking", "Certified trainer"],
              },
            ].map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <div className="group h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-2xl hover:shadow-brand/10">
                  <div className="relative">
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={512}
                      height={512}
                      className="aspect-[5/3] w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-coal/80 via-coal/10 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <p className="font-display text-lg font-bold text-white">
                        {t.name}
                      </p>
                      <p className="text-xs font-semibold text-gold-bright">
                        {t.role}
                      </p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t.bio}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {t.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-brand-soft px-3 py-1 text-[11px] font-bold text-brand"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="bg-grain relative overflow-hidden bg-coal py-16 sm:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-brand/15 blur-[130px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            dark
            eyebrow="The community"
            title={
              <>
                One classroom.{" "}
                <span className="text-gradient-gold">Eight platforms.</span>
              </>
            }
            lead="Wherever you scroll, there's a free ICON lesson waiting. Follow your favorites and learn daily."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Facebook, name: "Facebook", stat: "8.5K followers", note: "Daily posts & live classes", href: "https://www.facebook.com/iconenglishcenter" },
              { icon: Youtube, name: "YouTube", stat: "59+ videos", note: "Full free lessons", href: "https://www.youtube.com/@ICONEnglishCenterBD" },
              { icon: Instagram, name: "Instagram", stat: "Daily tips", note: "Carousels & reels", href: "https://www.instagram.com/iconenglishcenterbd" },
              { icon: Music2, name: "TikTok", stat: "Quick wins", note: "60-second strategies", href: "https://www.tiktok.com/@iconenglishcenterbd" },
            ].map((p, i) => (
              <Reveal key={p.name} delay={i * 0.07}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/50 hover:bg-white/[0.07]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white shadow-lg shadow-brand/30 transition-transform group-hover:scale-110">
                    <p.icon className="h-6 w-6" />
                  </span>
                  <p className="font-display mt-4 text-lg font-bold text-white">
                    {p.name}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gold-bright">
                    {p.stat}
                  </p>
                  <p className="mt-2 text-sm text-white/50">{p.note}</p>
                  <span className="mt-auto pt-4 text-xs font-bold uppercase tracking-wider text-white/40 transition-colors group-hover:text-brand">
                    Follow us →
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          {/* numbers */}
          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
            {[
              { value: 8500, suffix: "+", label: "Community followers" },
              { value: 59, suffix: "+", label: "Free video lessons" },
              { value: 34000, suffix: "+", label: "YouTube views" },
              { value: 8, suffix: "", label: "Platforms we teach on" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1.5 bg-coal px-4 py-8 text-center"
              >
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                  className="font-display text-3xl font-extrabold text-white"
                />
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-white/45">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <Reveal delay={0.15} className="mt-12 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-white/50">
              <BookHeart className="h-4 w-4 text-brand" />
              Also on LinkedIn, Pinterest, Threads &amp; Quora
            </div>
            <Button
              onClick={() => onNavigate("admission")}
              size="lg"
              className="mt-2 h-12 rounded-full bg-brand px-7 text-[15px] font-bold shadow-xl shadow-brand/30 transition-all hover:scale-[1.03] hover:bg-brand-deep"
            >
              Join the community — Book a demo
              <Users className="ml-1.5 h-4.5 w-4.5" />
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
