"use client";

import {
  Btn,
  Frame,
  Kicker,
  PageHead,
  Reveal,
  RuleRow,
  SectionHead,
  Shell,
  Stamp,
  Ticker,
} from "../kit";
import { BRAND, SOCIALS, type PageId } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/* ================================================================== */
/*  ABOUT — the institute's story, told like a magazine feature        */
/* ================================================================== */

export function AboutPage({
  onNavigate,
}: {
  onNavigate: (p: PageId) => void;
}) {
  return (
    <>
      <PageHead
        no="02"
        bn="আমাদের কথা"
        title={
          <>
            A classroom built for the way Bangladesh{" "}
            <em className="italic text-brand">actually</em> learns.
          </>
        }
        lede="ICON English Center began with a simple refusal: we stopped pretending that a Dhaka student and a London student need the same explanation."
        meta={[
          { label: "Base", value: "Dhaka, Bangladesh" },
          { label: "Focus", value: "IELTS in Bangla" },
          { label: "Community", value: "8,500+ learners" },
          { label: "Open lessons", value: "59+ videos" },
        ]}
      />
      <OriginStory />
      <Ticker
        slow
        items={[
          "Explain in Bangla",
          "Test in English",
          "No blind practice",
          "Free first, always",
          "Feedback on everything",
        ]}
      />
      <Manifesto />
      <Faculty />
      <WeeklyRhythm />
      <ClosingSlab onNavigate={onNavigate} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  §01 — Origin story                                                 */
/* ------------------------------------------------------------------ */

function OriginStory() {
  return (
    <section className="bg-paper">
      <Shell className="px-4 py-16 sm:px-8 sm:py-24">
        <SectionHead
          no="01"
          bn="শুরুর গল্প"
          en="Origin"
          title={
            <>
              It started with the fear
              <br />
              of <em className="italic text-brand">self-preparation.</em>
            </>
          }
        />

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          {/* feature text */}
          <div className="max-w-2xl">
            <Reveal>
              <p className="font-display text-xl font-medium leading-relaxed text-ink sm:text-2xl">
                Ask any IELTS candidate in Bangladesh what scares them most, and
                few will say the exam itself. They will say the loneliness of
                preparing for it — the creeping doubt of studying alone at
                midnight with a PDF and no one to ask.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink-soft">
                <p>
                  Our teachers knew that fear by name —{" "}
                  <span className="font-bn-serif font-semibold text-ink">
                    Self Preparation নিয়ে ভীতি
                  </span>
                  . They had watched brilliant students lose a full band to it:
                  grammar half-repaired, vocabulary memorised but never used,
                  time management collapsing in the reading hour. Not a
                  knowledge problem. A system problem.
                </p>
                <p>
                  So ICON was built as the opposite of studying alone. Every
                  strategy is explained in Bangla first — the language you think
                  in — so nothing stays fuzzy. Then you practice exactly like
                  the real exam, in English, under real timing, with a teacher
                  who reads your writing and tells you the truth about it.
                </p>
                <p>
                  The free part came naturally. A daily grammar fix on Facebook
                  became a YouTube channel of full-length classes, and the
                  channel became a community of{" "}
                  <strong className="font-semibold text-ink">
                    8,500+ learners
                  </strong>{" "}
                  who tag each other in vocabulary posts at 1 a.m. We kept it
                  free because education that actually reaches people shouldn&apos;t
                  start with a paywall.
                </p>
                <p>
                  What we charge for is the part YouTube can&apos;t give: a
                  roadmap with your name on it, feedback on every script, and
                  mock tests with an examiner&apos;s patience and a
                  stopwatch&apos;s mercy.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <blockquote className="mt-10 border-l-2 border-brand pl-6">
                <p className="font-display text-2xl font-medium italic leading-snug text-ink">
                  “Chains of grammar, fear, vocabulary and time — every one of
                  them breaks. Just not all at once, and not alone.”
                </p>
                <cite className="mt-3 block text-[11px] font-bold uppercase not-italic tracking-[0.18em] text-ink-faint">
                  — The ICON teaching note, batch one
                </cite>
              </blockquote>
            </Reveal>
          </div>

          {/* side column */}
          <div className="space-y-8">
            <Reveal delay={0.1}>
              <div className="relative">
                <Frame
                  src="/images/about-story.png"
                  alt="An ICON English Center instructor explaining grammar at the whiteboard"
                  caption="Grammar clinic — Saturday batch, Dhaka"
                  ratio="4/3"
                  className="shadow-[10px_10px_0_0_rgba(26,21,18,0.9)]"
                />
                <Stamp className="absolute -right-4 -top-6 bg-paper px-3 py-2 sm:-right-6">
                  Since batch one
                </Stamp>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="border-2 border-ink bg-card p-6 sm:p-7">
                <Kicker>The numbers we watch</Kicker>
                <div className="mt-4">
                  <RuleRow label="Facebook family" value="8,500+ followers" />
                  <RuleRow label="Open classes" value="59+ on YouTube" />
                  <RuleRow label="Views across lessons" value="34,000+" />
                  <RuleRow label="Daily fix" value="Free Grammar Fix — every day" />
                  <RuleRow label="Charge for" value="Feedback, roadmap, mocks" className="border-b-0" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  §02 — Teaching manifesto (ink slab)                                */
/* ------------------------------------------------------------------ */

const PRINCIPLES = [
  {
    bn: "বাংলায় ব্যাখ্যা, ইংরেজিতে পরীক্ষা",
    en: "Explain in Bangla, test in English",
    body: "Concepts land fastest in the language you dream in. So every strategy class runs in Bangla — and every practice sheet, mock and feedback loop runs in English, exactly like test day.",
  },
  {
    bn: "অন্ধ অনুশীলন নয়",
    en: "No blind practice",
    body: "Writing ten essays nobody reads is rehearsal for failure. Every script submitted at ICON is checked against the real band descriptors and returned with notes you can act on.",
  },
  {
    bn: "আসল চাপে অভ্যাস",
    en: "Mock pressure before real pressure",
    body: "The exam hall should feel like your eleventh mock, not your first. Strict timing, real answer sheets, a face-to-face speaking interview — mercy comes after the stopwatch.",
  },
  {
    bn: "আগে ফ্রি, সবসময় ফ্রি",
    en: "Free first, always",
    body: "Daily grammar fixes, full strategy classes, vocabulary drills — free on YouTube forever. Pay only when you want the roadmap, the feedback and the stopwatch.",
  },
] as const;

function Manifesto() {
  return (
    <section className="bg-ink text-paper">
      <div className="bg-grain relative">
        <div className="relative mx-auto max-w-[1200px] border-x border-paper/15 px-4 py-16 sm:px-8 sm:py-24">
          <SectionHead
            tone="paper"
            no="02"
            bn="শিক্ষার ঘোষণাপত্র"
            en="The teaching manifesto"
            title={
              <>
                Four principles,
                <br />
                zero <em className="italic text-brand">exceptions.</em>
              </>
            }
            lede="Every batch, every teacher, every lesson at ICON answers to these four lines. If a class ever breaks one, students are asked to call it out."
          />

          <div className="mt-14 grid grid-cols-1 border-2 border-paper/40 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal
                key={p.en}
                delay={i * 0.07}
                className={cn(
                  "border-paper/40",
                  i % 2 === 1 && "border-l",
                  i >= 2 && "border-t"
                )}
              >
                <article className="flex h-full flex-col p-6 sm:p-9">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-xs font-bold tracking-[0.28em] text-brand">
                      P{i + 1}
                    </span>
                    <span className="font-display text-xs font-bold tracking-[0.28em] text-paper/40">
                      § 02 · {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display mt-6 text-2xl font-semibold leading-tight tracking-tight text-paper">
                    {p.en}
                  </h3>
                  <p className="font-bn-serif mt-2 text-sm font-medium text-brand">
                    {p.bn}
                  </p>
                  <p className="mt-5 flex-1 text-[13px] leading-relaxed text-paper/60">
                    {p.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  §03 — Faculty                                                      */
/* ------------------------------------------------------------------ */

const FACULTY = [
  {
    image: "/images/teacher-1.png",
    name: "Md. Rafiqul Islam",
    role: "Senior IELTS Instructor — Writing & Reading",
    bio: "The teacher students quote back to each other. Runs the Saturday grammar clinic and the writing feedback desk; believes every Task 2 essay has a skeleton you can learn in a week.",
    details: [
      { label: "Teaches", value: "Writing Task 1 & 2 · Reading" },
      { label: "Known for", value: "The 7-minute Task 2 formula" },
      { label: "Feedback style", value: "Honest, line by line" },
    ],
  },
  {
    image: "/images/teacher-2.png",
    name: "Farhana Rahman",
    role: "Speaking & Listening Lead",
    bio: "Runs the speaking club where the fear dies. Trains candidates on Part 1–3 frameworks, Band 5 vs Band 9 answer modelling, and the accent-decoding drills for Listening.",
    details: [
      { label: "Teaches", value: "Speaking · Listening" },
      { label: "Known for", value: "Mock interviews under real timing" },
      { label: "Feedback style", value: "Recorded, replayed, rebuilt" },
    ],
  },
] as const;

function Faculty() {
  return (
    <section className="bg-paper">
      <Shell className="px-4 py-16 sm:px-8 sm:py-24">
        <SectionHead
          no="03"
          bn="শিক্ষকমণ্ডলী"
          en="The faculty"
          title={
            <>
              Two desks. Every script
              <br />
              read by a <em className="italic text-brand">human</em> with a pen.
            </>
          }
          lede="No rotating tutor carousel. The teachers who plan your roadmap are the ones who mark your mocks and sit across the table in your speaking interview."
        />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-0 lg:border-2 lg:border-ink">
          {FACULTY.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 0.08}
              className={cn(i === 1 && "lg:border-l lg:border-ink")}
            >
              <article className="flex h-full flex-col border-2 border-ink bg-card p-6 sm:p-8 lg:border-0">
                <div className="flex flex-col gap-6 sm:flex-row">
                  <div className="w-full shrink-0 sm:w-44">
                    <Frame
                      src={t.image}
                      alt={`Portrait of ${t.name}`}
                      ratio="4/5"
                      caption={t.name.split(" ").slice(-1)[0]}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-ink">
                      {t.name}
                    </h3>
                    <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
                      {t.role}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                      {t.bio}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex-1">
                  {t.details.map((d) => (
                    <RuleRow key={d.label} label={d.label} value={d.value} />
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 text-center font-display text-sm italic text-ink-soft">
            Plus guest examiners for mock seasons — and 8,500 community members
            who answer questions at 1 a.m.
          </p>
        </Reveal>
      </Shell>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  §04 — Weekly rhythm                                                */
/* ------------------------------------------------------------------ */

const WEEK = [
  { day: "Saturday", slots: "Grammar clinic · Writing desk open", tag: "Open day" },
  { day: "Sunday", slots: "Listening lab · Reading drills", tag: "Core" },
  { day: "Monday", slots: "Writing Task 1 & 2 classes", tag: "Core" },
  { day: "Tuesday", slots: "Speaking club (evening) · Feedback returns", tag: "Club" },
  { day: "Wednesday", slots: "Listening lab · Vocabulary review", tag: "Core" },
  { day: "Thursday", slots: "Strategy class · Doubt hour on WhatsApp", tag: "Core" },
  { day: "Friday", slots: "Full mock test — strict timing, all 4 modules", tag: "Mock day" },
] as const;

function WeeklyRhythm() {
  return (
    <section className="border-y-2 border-ink bg-paper-deep">
      <Shell className="px-4 py-16 sm:px-8 sm:py-24">
        <SectionHead
          no="04"
          bn="সাপ্তাহিক ছন্দ"
          en="How a batch runs"
          title={
            <>
              One week at ICON,
              <br />
              on <em className="italic text-brand">repeat.</em>
            </>
          }
          lede="The rhythm barely changes — that's the point. IELTS rewards the students whose preparation looks boring from the outside."
        />

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[640px] border-2 border-ink bg-card text-left">
            <thead>
              <tr className="border-b-2 border-ink bg-ink text-paper">
                <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] sm:px-6">
                  Day
                </th>
                <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] sm:px-6">
                  What runs
                </th>
                <th className="px-4 py-3.5 text-right text-[11px] font-bold uppercase tracking-[0.2em] sm:px-6">
                  Type
                </th>
              </tr>
            </thead>
            <tbody>
              {WEEK.map((d, i) => (
                <tr
                  key={d.day}
                  className={cn(
                    "border-b border-ink/15 transition-colors last:border-b-0 hover:bg-brand-soft/30",
                    d.tag === "Mock day" && "bg-brand-soft/40"
                  )}
                >
                  <td className="px-4 py-4 sm:px-6">
                    <span className="font-display text-base font-semibold text-ink">
                      {d.day}
                    </span>
                    <span className="ml-3 font-display text-[10px] font-bold tracking-[0.2em] text-ink-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-ink-soft sm:px-6">
                    {d.slots}
                  </td>
                  <td className="px-4 py-4 text-right sm:px-6">
                    <span
                      className={cn(
                        "inline-block border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em]",
                        d.tag === "Mock day"
                          ? "border-brand bg-brand text-paper"
                          : d.tag === "Open day" || d.tag === "Club"
                            ? "border-ink text-ink"
                            : "border-ink/40 text-ink-soft"
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
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">
            Offline batches at the Dhaka center · Online batches live & recorded ·
            Hours {BRAND.hours}
          </p>
        </Reveal>
      </Shell>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Closing slab                                                       */
/* ------------------------------------------------------------------ */

function ClosingSlab({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section className="relative overflow-hidden bg-brand text-paper">
      <div className="bg-grain relative">
        <div className="relative mx-auto max-w-[1200px] border-x border-ink/30 px-4 py-16 sm:px-8 sm:py-20">
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <Reveal>
                <Kicker tone="paper">Still reading? Good sign.</Kicker>
              </Reveal>
              <Reveal delay={0.07}>
                <h2 className="font-display mt-5 text-balance text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl">
                  The free diagnostic test decides the rest —{" "}
                  <em className="italic">not a sales pitch.</em>
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="font-bn-serif mt-5 text-lg font-medium text-paper/85">
                  আসো, আগে তোমার লেভেলটা মেপে দেখি।
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.12}>
              <div className="space-y-4">
                <Btn variant="paper" size="lg" onClick={() => onNavigate("admission")} className="w-full">
                  Book the free diagnostic
                </Btn>
                <div className="border-t border-paper/25 pt-4">
                  <RuleRow
                    label="Everywhere else"
                    value={SOCIALS.slice(0, 4).map((s) => s.label).join(" · ")}
                    className="border-paper/25 [&>span:last-child]:text-paper"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
