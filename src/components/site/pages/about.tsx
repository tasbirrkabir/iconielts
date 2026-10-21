"use client";

import { ArrowUpRight } from "lucide-react";
import {
  ArrowLink,
  Container,
  CtaPanel,
  Eyebrow,
  Figure,
  PageHead,
  Reveal,
  SectionHead,
} from "../kit";
import { BRAND, SOCIALS, type PageId } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/* ================================================================== */
/*  ABOUT — the story, the principles, the people                      */
/* ================================================================== */

const PRINCIPLES = [
  {
    en: "Explain in Bangla, test in English",
    bn: "বাংলায় ব্যাখ্যা, ইংরেজিতে পরীক্ষা",
    body: "Concepts land fastest in the language you dream in. Every strategy class runs in Bangla — every practice sheet, mock and feedback loop runs in English, exactly like test day.",
  },
  {
    en: "No blind practice",
    bn: "অন্ধ অনুশীলন নয়",
    body: "Writing ten essays nobody reads is rehearsal for failure. Every script submitted at Demo Academy is checked against the real band descriptors and returned with notes you can act on.",
  },
  {
    en: "Mock pressure before real pressure",
    bn: "আসল চাপে অভ্যাস",
    body: "The exam hall should feel like your eleventh mock, not your first. Strict timing, real answer sheets, a face-to-face speaking interview.",
  },
  {
    en: "Free first, always",
    bn: "আগে ফ্রি, সবসময় ফ্রি",
    body: "Daily grammar fixes, full strategy classes, vocabulary drills — free on YouTube forever. Pay only when you want the roadmap, the feedback and the stopwatch.",
  },
];

const FACULTY = [
  {
    image: "/images/teacher-1.png",
    name: "Demo Instructor One",
    role: "Senior IELTS Instructor — Writing & Reading",
    bio: "Experienced lead faculty member for test strategy and analysis. Runs the weekend grammar clinic and writing feedback desk; believes every Task 2 essay has a formula you can learn in a week.",
    details: [
      { label: "Teaches", value: "Writing Task 1 & 2 · Reading" },
      { label: "Known for", value: "The 7-minute Task 2 formula" },
      { label: "Feedback style", value: "Honest, line by line" },
    ],
  },
  {
    image: "/images/teacher-2.png",
    name: "Demo Instructor Two",
    role: "Speaking & Listening Lead",
    bio: "Heads the speaking sessions and fluency workshops. Trains candidates on Part 1–3 frameworks, Band 5 vs Band 9 answer modelling, and accent-decoding drills for Listening.",
    details: [
      { label: "Teaches", value: "Speaking · Listening" },
      { label: "Known for", value: "Mock interviews under real timing" },
      { label: "Feedback style", value: "Recorded, replayed, rebuilt" },
    ],
  },
];

const WEEK = [
  { day: "Saturday", slots: "Grammar clinic · Writing desk open", tag: "Open day" },
  { day: "Sunday", slots: "Listening lab · Reading drills", tag: "Core" },
  { day: "Monday", slots: "Writing Task 1 & 2 classes", tag: "Core" },
  { day: "Tuesday", slots: "Speaking club (evening) · Feedback returns", tag: "Club" },
  { day: "Wednesday", slots: "Listening lab · Vocabulary review", tag: "Core" },
  { day: "Thursday", slots: "Strategy class · Doubt hour on WhatsApp", tag: "Core" },
  { day: "Friday", slots: "Full mock test — strict timing, all 4 modules", tag: "Mock day" },
];

export function AboutPage({
  onNavigate,
}: {
  onNavigate: (p: PageId) => void;
}) {
  return (
    <>
      <PageHead
        eyebrow="About Demo Academy"
        title={
          <>
            A classroom built for the way Bangladesh{" "}
            <em className="italic text-brand">actually</em> learns.
          </>
        }
        lede="Demo IELTS Academy began with a simple refusal: we stopped pretending that a Dhaka student and a London student need the same explanation."
        meta={[
          { label: "Base", value: "Dhaka, Bangladesh" },
          { label: "Focus", value: "IELTS in Bangla" },
          { label: "Community", value: "10,000+ learners" },
          { label: "Open lessons", value: "50+ videos" },
        ]}
      />

      <Story />
      <Principles />
      <Faculty />
      <WeeklyRhythm />
      <Community />
      <CtaPanel
        eyebrow="Visit a class"
        title={
          <>
            Sit in a live batch before you decide{" "}
            <em className="italic text-paper/90">anything.</em>
          </>
        }
        lede="The demo class is free, the diagnostic mock is free, and the roadmap is yours to keep either way."
        bn="আসো, আগে একটা ক্লাস দেখে যাও।"
        primary={{ label: "Book a free visit", onClick: () => onNavigate("admission") }}
        secondary={{ label: `Call ${BRAND.phone}`, href: BRAND.phoneHref }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Story                                                              */
/* ------------------------------------------------------------------ */

function Story() {
  return (
    <section className="py-20 md:py-28">
      <Container className="grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>The story</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="font-display mt-6 text-2xl font-medium leading-[1.35] tracking-[-0.005em] text-ink sm:text-[1.7rem]">
              It started with the fear of{" "}
              <em className="italic text-brand">self-preparation</em> — and a
              refusal to let good students face it alone.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-ink-soft">
              <p>
                Our teachers had watched brilliant students lose a full band to
                that fear: grammar half-repaired, vocabulary memorised but
                never used, time management collapsing in the reading hour. It
                was never a knowledge problem — it was a system problem.
              </p>
              <p>
                So Demo Academy was built as the opposite of studying alone. A daily
                grammar fix on Facebook became a YouTube channel of
                full-length classes, and the channel became a community of{" "}
                <strong className="font-semibold text-ink">
                  10,000+ demo learners
                </strong>{" "}
                who tag each other in vocabulary posts at 1 a.m. We kept it
                free because education that actually reaches people
                shouldn&apos;t start with a paywall.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <blockquote className="mt-10 border-l-2 border-brand/60 pl-6">
              <p className="font-display text-xl font-medium italic leading-snug text-ink">
                “Chains of grammar, fear, vocabulary and time — every one of
                them breaks. Just not all at once, and not alone.”
              </p>
              <cite className="mt-3 block text-[11px] font-semibold uppercase not-italic tracking-[0.18em] text-ink-faint">
                — The Demo Academy teaching note, batch one
              </cite>
            </blockquote>
          </Reveal>
        </div>

        <div className="space-y-6">
          <Reveal delay={0.1}>
            <Figure
              src="/images/about-story.png"
              alt="A Demo IELTS Academy instructor explaining grammar at the whiteboard"
              ratio="aspect-[4/3]"
              caption="Grammar clinic — Saturday batch, Dhaka"
            />
          </Reveal>
          <Reveal delay={0.16}>
            <div className="rounded-2xl border border-hairline bg-card p-6 sm:p-7">
              <Eyebrow>The numbers we watch</Eyebrow>
              <dl className="mt-5 space-y-3.5">
                {[
                  ["Facebook family", "8,500+ followers"],
                  ["Open classes", "59+ on YouTube"],
                  ["Views across lessons", "34,000+"],
                  ["Daily fix", "Free Grammar Fix — every day"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between gap-4 text-sm"
                  >
                    <dt className="text-ink-soft">{label}</dt>
                    <dd className="text-right font-medium text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Principles                                                         */
/* ------------------------------------------------------------------ */

function Principles() {
  return (
    <section className="border-y border-hairline bg-sand/60 py-20 md:py-28">
      <Container>
        <SectionHead
          eyebrow="The teaching manifesto"
          title={
            <>
              Four principles,{" "}
              <em className="italic text-brand">zero</em> exceptions.
            </>
          }
          lede="Every batch, every teacher, every lesson at Demo Academy answers to these four lines. If a class ever breaks one, students are asked to call it out."
        />
        <div className="mt-14 grid gap-x-16 gap-y-12 sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <Reveal
              key={p.en}
              delay={i * 0.06}
              className="border-t border-hairline pt-7"
            >
              <span className="font-mono text-xs tracking-[0.12em] text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-4 text-2xl font-medium leading-snug tracking-[-0.01em] text-ink">
                {p.en}
              </h3>
              <p className="font-bengali mt-1.5 text-sm text-ink-faint">
                {p.bn}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                {p.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Faculty                                                            */
/* ------------------------------------------------------------------ */

function Faculty() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHead
          eyebrow="The faculty"
          title={
            <>
              Two desks. Every script read by a{" "}
              <em className="italic text-brand">human</em> with a pen.
            </>
          }
          lede="No rotating tutor carousel. The teachers who plan your roadmap are the ones who mark your mocks and sit across the table in your speaking interview."
        />
        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-10">
          {FACULTY.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <article className="flex flex-col gap-7 sm:flex-row">
                <Figure
                  src={t.image}
                  alt={`Portrait of ${t.name}`}
                  ratio="aspect-[4/5]"
                  className="w-full shrink-0 sm:w-44"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-2xl font-medium tracking-[-0.01em] text-ink">
                    {t.name}
                  </h3>
                  <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-deep">
                    {t.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                    {t.bio}
                  </p>
                  <dl className="mt-5 space-y-2.5">
                    {t.details.map((d) => (
                      <div
                        key={d.label}
                        className="flex items-baseline justify-between gap-4 border-t border-hairline pt-2.5 text-[13px]"
                      >
                        <dt className="text-ink-faint">{d.label}</dt>
                        <dd className="text-right font-medium text-ink">
                          {d.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.12}>
          <p className="font-display mt-12 text-center text-sm italic text-ink-soft">
            Plus guest examiners for mock seasons — and 8,500 community members
            who answer questions at 1 a.m.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Weekly rhythm                                                      */
/* ------------------------------------------------------------------ */

function WeeklyRhythm() {
  return (
    <section className="border-t border-hairline bg-sand/60 py-20 md:py-28">
      <Container>
        <SectionHead
          eyebrow="How a batch runs"
          title={
            <>
              One week at Demo Academy, on <em className="italic">repeat.</em>
            </>
          }
          lede="The rhythm barely changes — that's the point. IELTS rewards the students whose preparation looks boring from the outside."
        />
        <div className="mt-12 overflow-x-auto nice-scroll">
          <table className="w-full min-w-[560px] text-left">
            <thead>
              <tr className="border-b border-hairline">
                <th className="pb-4 pr-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
                  Day
                </th>
                <th className="hidden pb-4 pr-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint sm:table-cell">
                  #
                </th>
                <th className="pb-4 pr-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
                  What runs
                </th>
                <th className="pb-4 text-right text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
                  Type
                </th>
              </tr>
            </thead>
            <tbody>
              {WEEK.map((d, i) => (
                <tr
                  key={d.day}
                  className="border-b border-hairline last:border-b-0"
                >
                  <td className="py-4 pr-6">
                    <span className="font-display text-base font-medium text-ink">
                      {d.day}
                    </span>
                  </td>
                  <td className="hidden py-4 pr-6 font-mono text-xs text-ink-faint sm:table-cell">
                    {String(i + 1).padStart(2, "0")}
                  </td>
                  <td className="py-4 pr-6 text-sm text-ink-soft">{d.slots}</td>
                  <td className="py-4 text-right">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-3 py-1 text-[11px] font-medium tracking-[0.06em]",
                        d.tag === "Mock day"
                          ? "bg-brand-tint text-brand-deep"
                          : "bg-sand-deep text-ink-soft"
                      )}
                    >
                      {d.tag}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Reveal delay={0.1}>
          <p className="mt-8 text-[13px] leading-relaxed text-ink-faint">
            Offline batches at the Dhaka center · Online batches live &amp;
            recorded · Hours {BRAND.hours}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Community                                                          */
/* ------------------------------------------------------------------ */

function Community() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="The community"
            title={
              <>
                Wherever you scroll,{" "}
                <em className="italic text-brand">we&apos;re</em> there.
              </>
            }
            lede="Free lessons and daily grammar fixes, on every platform our students already use."
            className="max-w-xl"
          />
          <ArrowLink
            label="Watch on YouTube"
            href="https://youtube.com/@DemoIELTSAcademy"
            className="shrink-0 pb-1"
          />
        </div>
        <div className="mt-12 border-b border-hairline sm:grid sm:grid-cols-2 sm:gap-x-16">
          {SOCIALS.map((s, i) => (
            <Reveal key={s.label} delay={Math.min(i * 0.03, 0.15)}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 border-t border-hairline py-4"
              >
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-ink">
                    {s.label}
                  </span>
                  <span className="mt-0.5 block truncate text-[13px] text-ink-faint">
                    {s.handle}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 shrink-0 text-ink-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                  strokeWidth={1.5}
                />
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
