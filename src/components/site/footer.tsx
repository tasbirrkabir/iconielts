"use client";

import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { BRAND, COURSES, SOCIALS, type PageId } from "@/lib/site-data";
import { Container } from "./kit";

/* ================================================================== */
/*  Footer — light, quiet, stuck to the bottom                         */
/* ================================================================== */

const EXPLORE: { id: PageId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "courses", label: "Courses" },
  { id: "lessons", label: "Free Lessons" },
  { id: "success", label: "Success Stories" },
  { id: "admission", label: "Admission" },
];

export function Footer({
  onNavigate,
}: {
  onNavigate: (p: PageId) => void;
}) {
  return (
    <footer className="mt-auto border-t border-hairline bg-paper">
      <Container className="py-14 md:py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1.3fr] md:gap-8">
          {/* brand */}
          <div className="max-w-xs">
            <div className="flex items-baseline gap-2.5">
              <span className="font-display text-xl font-semibold tracking-[-0.01em] text-ink">
                {BRAND.shortName}
                <span aria-hidden className="ml-0.5 text-brand">
                  .
                </span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ink-faint">
                IELTS Academy
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-ink-soft">
              IELTS, taught in Bangla — the trusted companion for the band
              score of your dreams.
            </p>
            <p className="font-bengali mt-3 text-sm text-ink-faint">
              {BRAND.taglineBn}
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              {SOCIALS.slice(0, 5).map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-[13px] text-ink-soft transition-colors hover:text-ink"
                  >
                    <span className="link-underline">{s.label}</span>
                    <ArrowUpRight
                      aria-hidden
                      className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* explore */}
          <nav aria-label="Footer">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {EXPLORE.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(l.id)}
                    className="cursor-pointer text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* programs */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
              Programs
            </h3>
            <ul className="mt-5 space-y-3">
              {COURSES.map((c) => (
                <li key={c.slug}>
                  <button
                    type="button"
                    onClick={() => onNavigate("courses")}
                    className="cursor-pointer text-left text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {c.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
              Contact
            </h3>
            <ul className="mt-5 space-y-3.5 text-sm">
              <li>
                <a
                  href={BRAND.phoneHref}
                  className="inline-flex items-center gap-2.5 text-ink-soft transition-colors hover:text-ink"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a
                  href={BRAND.emailHref}
                  className="inline-flex items-center gap-2.5 break-all text-ink-soft transition-colors hover:text-ink"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                  {BRAND.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-ink-soft">
                <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                {BRAND.location}
              </li>
              <li className="text-ink-faint">{BRAND.hours}</li>
            </ul>
          </div>
        </div>
      </Container>

      {/* quiet watermark */}
      <div aria-hidden className="select-none overflow-hidden">
        <div className="font-display -mb-[0.16em] text-center text-[clamp(5rem,17vw,13rem)] font-semibold leading-none tracking-[-0.02em] text-ink/[0.045]">
          {BRAND.shortName}
        </div>
      </div>

      <div className="border-t border-hairline">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-[13px] text-ink-faint sm:flex-row">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p className="font-bengali text-xs">ঢাকা, বাংলাদেশ — Dhaka, Bangladesh</p>
        </Container>
      </div>
    </footer>
  );
}
