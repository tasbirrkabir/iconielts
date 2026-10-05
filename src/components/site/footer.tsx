"use client";

import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { BRAND, COURSES, NAV_ITEMS, SOCIALS, type PageId } from "@/lib/site-data";

/* ================================================================== */
/*  Colophon footer — ink slab, huge masthead wordmark                 */
/* ================================================================== */

export function Footer({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t-2 border-ink bg-ink text-paper">
      {/* top grid */}
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-0 border-x border-paper/10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        {/* mission */}
        <div className="border-b border-paper/15 px-6 py-10 sm:border-r lg:border-b-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-brand">
            Our promise
          </p>
          <p className="font-bn-serif mt-5 text-lg font-medium leading-relaxed text-paper">
            বাংলায় সহজে স্বপ্নের IELTS Band Score অর্জনের নির্ভরযোগ্য সঙ্গী।
          </p>
          <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-paper/60">
            Your trusted companion for the IELTS band score of your dreams —
            taught in Bangla, from Bangladesh.
          </p>
        </div>

        {/* navigate */}
        <nav className="border-b border-paper/15 px-6 py-10 lg:border-r lg:border-b-0" aria-label="Footer">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-paper/50">
            Index
          </p>
          <ul className="mt-5 space-y-1">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className="group flex cursor-pointer items-baseline gap-3 py-1.5 text-sm font-semibold text-paper/80 transition-colors hover:text-brand"
                >
                  <span className="font-display text-[10px] font-bold tracking-[0.2em] text-paper/30 group-hover:text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* courses */}
        <div className="border-b border-paper/15 px-6 py-10 lg:border-r lg:border-b-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-paper/50">
            Programs
          </p>
          <ul className="mt-5 space-y-1">
            {COURSES.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <button
                  type="button"
                  onClick={() => onNavigate("courses")}
                  className="cursor-pointer py-1.5 text-left text-sm font-semibold text-paper/80 transition-colors hover:text-brand"
                >
                  {c.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* contact */}
        <div className="px-6 py-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-paper/50">
            Admission desk
          </p>
          <ul className="mt-5 space-y-3.5 text-sm">
            <li>
              <a
                href={BRAND.phoneHref}
                className="flex items-center gap-3 font-semibold text-paper transition-colors hover:text-brand"
              >
                <Phone className="h-4 w-4 shrink-0 text-brand" />
                {BRAND.phone}
              </a>
            </li>
            <li>
              <a
                href={BRAND.emailHref}
                className="flex items-center gap-3 font-semibold text-paper transition-colors hover:text-brand"
              >
                <Mail className="h-4 w-4 shrink-0 text-brand" />
                <span className="break-all">{BRAND.email}</span>
              </a>
            </li>
            <li className="flex items-center gap-3 font-semibold text-paper">
              <MapPin className="h-4 w-4 shrink-0 text-brand" />
              {BRAND.location}
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.14em] text-paper/50 transition-colors hover:text-brand"
              >
                {s.label}
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* masthead wordmark */}
      <div className="border-t border-paper/15">
        <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
          <p
            aria-hidden
            className="font-display select-none text-center text-[13.5vw] font-black uppercase leading-[0.85] tracking-tight text-transparent sm:text-[11vw] lg:text-[9.5rem]"
            style={{ WebkitTextStroke: "1.5px rgba(243, 239, 228, 0.35)" }}
          >
            ICON
          </p>
        </div>
      </div>

      {/* colophon */}
      <div className="border-t border-paper/15">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 border-x border-paper/10 px-4 py-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-paper/40 sm:flex-row sm:px-6">
          <span>
            © {year} {BRAND.name} · Dhaka, Bangladesh
          </span>
          <span className="font-bn-serif normal-case tracking-[0.08em] text-paper/50">
            শেখা যাক, বাংলায় — স্বপ্ন পূরণ হোক, বিশ্বে।
          </span>
        </div>
      </div>
    </footer>
  );
}
