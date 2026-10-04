"use client";

import {
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Music2,
  Phone,
  Pin,
  AtSign,
  BookOpenText,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "./logo";
import {
  BRAND,
  COURSES,
  NAV_ITEMS,
  SOCIALS,
  type PageId,
} from "@/lib/site-data";

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  Facebook,
  YouTube: Youtube,
  Instagram,
  TikTok: Music2,
  LinkedIn: Linkedin,
  Pinterest: Pin,
  Threads: AtSign,
  Quora: BookOpenText,
};

export function Footer({
  onNavigate,
}: {
  onNavigate: (p: PageId) => void;
}) {
  return (
    <footer className="bg-grain relative mt-auto bg-coal text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent opacity-80" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-12 lg:gap-8">
        {/* Brand */}
        <div className="lg:col-span-4">
          <Logo dark />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
            {BRAND.taglineEn} Join 8,500+ learners across Bangladesh chasing
            their dream band score with us.
          </p>
          <p className="mt-3 font-bengali text-sm text-gold-bright/90">
            {BRAND.taglineBn}
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {SOCIALS.map((s) => {
              const Icon = SOCIAL_ICONS[s.label] ?? Facebook;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  title={`${s.label} — ${s.handle}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Explore */}
        <div className="lg:col-span-2">
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white/40">
            Explore
          </h3>
          <ul className="mt-5 flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className="text-sm font-medium text-white/65 transition-colors hover:text-white"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Courses */}
        <div className="lg:col-span-3">
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white/40">
            Courses
          </h3>
          <ul className="mt-5 flex flex-col gap-3">
            {COURSES.map((c) => (
              <li key={c.slug}>
                <button
                  onClick={() => onNavigate("courses")}
                  className="text-left text-sm font-medium text-white/65 transition-colors hover:text-white"
                >
                  {c.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="lg:col-span-3">
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.16em] text-white/40">
            Get in touch
          </h3>
          <ul className="mt-5 flex flex-col gap-4 text-sm">
            <li>
              <a
                href={BRAND.phoneHref}
                className="group flex items-start gap-3 text-white/65 transition-colors hover:text-white"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>
                  {BRAND.phone}
                  <span className="block text-xs text-white/40">
                    Call or WhatsApp
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={BRAND.emailHref}
                className="group flex items-start gap-3 text-white/65 transition-colors hover:text-white"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span className="break-all">{BRAND.email}</span>
              </a>
            </li>
            <li className="flex items-start gap-3 text-white/65">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              {BRAND.location}
            </li>
            <li className="flex items-start gap-3 text-white/65">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              {BRAND.hours}
            </li>
          </ul>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-center text-xs text-white/45 sm:flex-row sm:px-6 sm:text-left">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Listening · Reading · Writing · Speaking
          </p>
        </div>
      </div>
    </footer>
  );
}
