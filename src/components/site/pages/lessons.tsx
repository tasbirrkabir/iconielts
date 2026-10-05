"use client";

import { useState } from "react";
import { Play, Youtube } from "lucide-react";
import {
  ArrowLink,
  Btn,
  Container,
  CtaPanel,
  Eyebrow,
  PageHead,
  Reveal,
  SectionHead,
} from "../kit";
import {
  LESSONS,
  LESSON_CATEGORIES,
  getYtLink,
  getYtThumb,
  type PageId,
} from "@/lib/site-data";
import { cn } from "@/lib/utils";

/* ================================================================== */
/*  FREE LESSONS — the open classroom                                  */
/* ================================================================== */

export function LessonsPage({
  onNavigate,
}: {
  onNavigate: (p: PageId) => void;
}) {
  const [category, setCategory] = useState<(typeof LESSON_CATEGORIES)[number]>(
    "All"
  );

  const featured = LESSONS[0];
  const filtered =
    category === "All"
      ? LESSONS.slice(1)
      : LESSONS.filter((l) => l.category === category);

  return (
    <>
      <PageHead
        eyebrow="Free lessons"
        title={
          <>
            A full IELTS education,{" "}
            <em className="italic text-brand">free</em> on YouTube.
          </>
        }
        lede="Strategy classes, grammar fixes and module deep-dives — the same teaching we charge for, published for everyone. Start with the most-watched lesson below."
        meta={[
          { label: "Channel", value: "@ICONEnglishCenterBD" },
          { label: "Videos", value: "59 and counting" },
          { label: "Views", value: "34,000+" },
          { label: "Price", value: "Free, forever" },
        ]}
      />

      {/* featured */}
      <section className="pb-4 pt-16 md:pt-20">
        <Container>
          <Reveal>
            <a
              href={getYtLink(featured.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mx-auto block max-w-3xl overflow-hidden rounded-2xl bg-ink"
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
              <span className="absolute left-1/2 top-1/2 flex h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper/95 transition-transform duration-300 group-hover:scale-105">
                <Play className="ml-1 h-6 w-6 fill-ink text-ink" />
              </span>
              <span className="absolute bottom-4 right-4 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-medium tracking-[0.06em] text-paper backdrop-blur-sm">
                {featured.duration}
              </span>
            </a>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mx-auto mt-6 max-w-3xl text-center">
              <Eyebrow className="justify-center">
                Most watched · {featured.category}
              </Eyebrow>
              <p className="font-display mt-3 text-xl font-medium leading-snug text-ink sm:text-2xl">
                {featured.title}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* the guide */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              eyebrow="The library"
              title="Pick a module, press play."
              className="max-w-md"
            />
            <ArrowLink
              label="Subscribe on YouTube"
              href="https://www.youtube.com/@ICONEnglishCenterBD"
              className="shrink-0 pb-1"
            />
          </div>

          {/* filter pills */}
          <Reveal className="mt-10">
            <div
              role="tablist"
              aria-label="Filter lessons by category"
              className="flex flex-wrap gap-2"
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
                      "cursor-pointer rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-200",
                      active
                        ? "border-ink bg-ink text-paper"
                        : "border-hairline bg-transparent text-ink-soft hover:border-ink-faint hover:text-ink"
                    )}
                  >
                    {cat}
                    {cat === "All" ? null : (
                      <span className="ml-1.5 opacity-50">
                        {LESSONS.filter((l) => l.category === cat).length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* grid */}
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((l, i) => (
              <Reveal key={l.id} delay={Math.min((i % 3) * 0.05, 0.15)}>
                <a
                  href={getYtLink(l.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-xl bg-sand">
                    <div className="aspect-video">
                      { }
                      <img
                        src={getYtThumb(l.id)}
                        alt={l.title}
                        loading="lazy"
                        className="img-soft h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <span className="absolute bottom-2.5 right-2.5 rounded-full bg-ink/70 px-2 py-0.5 text-[11px] font-medium text-paper backdrop-blur-sm">
                      {l.duration}
                    </span>
                    <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-paper/95 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                      <Play className="ml-0.5 h-4 w-4 fill-ink text-ink" />
                    </span>
                  </div>
                  <p className="mt-3.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-faint">
                    {l.category}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-sm font-medium leading-snug text-ink transition-colors group-hover:text-brand-deep">
                    {l.title}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* subscribe */}
      <section className="pb-20 sm:pb-24">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-8 rounded-[2rem] border border-hairline bg-sand/70 px-7 py-12 sm:px-12 md:flex-row md:items-center md:px-16">
              <div className="max-w-md">
                <h2 className="font-display text-2xl font-medium leading-snug tracking-[-0.01em] text-ink sm:text-3xl">
                  One lesson a day keeps the coaching fee away.
                </h2>
                <p className="font-bengali mt-3 text-sm text-ink-soft">
                  প্রতিদিন একটা নতুন লেসন — সাবস্ক্রাইব করে রাখো।
                </p>
              </div>
              <Btn
                href="https://www.youtube.com/@ICONEnglishCenterBD"
                external
                size="lg"
                className="shrink-0"
              >
                <Youtube className="h-4 w-4 text-brand" />
                Subscribe — it&apos;s free
              </Btn>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaPanel
        eyebrow="When free is not enough"
        title={
          <>
            The roadmap, the feedback, the stopwatch —{" "}
            <em className="italic text-paper/90">that part has your name on it.</em>
          </>
        }
        lede="YouTube gives you the teaching. Admission gives you the plan, the mock tests and a teacher who reads every line you write."
        primary={{ label: "Talk to the admission desk", onClick: () => onNavigate("admission") }}
        secondary={{ label: "See the courses", onClick: () => onNavigate("courses") }}
      />
    </>
  );
}
