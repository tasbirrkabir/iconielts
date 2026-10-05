"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { BRAND, NAV_ITEMS, SOCIALS, type PageId } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/* ================================================================== */
/*  Masthead — utility strip + numbered index navigation               */
/* ================================================================== */

export function Navbar({
  page,
  onNavigate,
}: {
  page: PageId;
  onNavigate: (p: PageId) => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (p: PageId) => {
    setOpen(false);
    onNavigate(p);
  };

  return (
    <>
      <header className="sticky top-0 z-50">
        {/* utility strip */}
        <div className="border-b border-ink/25 bg-ink text-paper">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-1.5 sm:px-6">
            <a
              href={BRAND.phoneHref}
              className="flex items-center gap-2 text-[11px] font-semibold tracking-wide text-paper/80 transition-colors hover:text-paper"
            >
              <Phone className="h-3 w-3 text-brand" />
              <span className="hidden sm:inline">{BRAND.hours}</span>
              <span className="sm:hidden">Call us</span>
              <span className="mx-1 text-paper/30">·</span>
              {BRAND.phone}
            </a>
            <div className="hidden items-center gap-4 text-[10px] font-bold uppercase tracking-[0.16em] text-paper/50 md:flex">
              {SOCIALS.slice(0, 5).map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brand"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* masthead */}
        <div
          className={cn(
            "border-b-2 bg-paper transition-shadow duration-300",
            scrolled ? "border-ink shadow-[0_1px_0_0_#1a1512]" : "border-ink"
          )}
        >
          <div className="mx-auto flex max-w-[1200px] items-stretch justify-between px-4 sm:px-6">
            {/* wordmark */}
            <button
              type="button"
              onClick={() => go("home")}
              className="group flex cursor-pointer items-center gap-3 py-3 text-left"
              aria-label="ICON English Center — home"
            >
              <span className="flex h-11 w-11 items-center justify-center border-2 border-ink bg-brand font-display text-lg font-black tracking-tight text-paper transition-colors group-hover:bg-ink">
                IC
              </span>
              <span className="leading-none">
                <span className="font-display block text-xl font-black uppercase tracking-tight text-ink sm:text-2xl">
                  ICON
                </span>
                <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.32em] text-ink-soft">
                  English Center
                </span>
              </span>
            </button>

            {/* index nav */}
            <nav className="hidden items-stretch lg:flex" aria-label="Primary">
              {NAV_ITEMS.map((item, i) => {
                const active = page === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => go(item.id)}
                    className={cn(
                      "group relative flex cursor-pointer flex-col items-start justify-center border-l border-ink/15 px-5 text-left transition-colors",
                      active ? "bg-ink text-paper" : "hover:bg-paper-deep"
                    )}
                  >
                    <span
                      className={cn(
                        "font-display text-[10px] font-bold tracking-[0.2em]",
                        active ? "text-brand" : "text-ink-faint group-hover:text-brand"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 text-[12px] font-bold uppercase tracking-[0.12em]",
                        active ? "text-paper" : "text-ink"
                      )}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => go("admission")}
                className="ml-4 flex cursor-pointer items-center border-2 border-ink bg-brand px-6 text-[12px] font-bold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-ink"
              >
                Apply Now
              </button>
            </nav>

            {/* mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex cursor-pointer items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-ink lg:hidden"
              aria-label="Open menu"
            >
              Menu
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* mobile drawer */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink text-paper lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-paper/20 px-4 py-4 sm:px-6">
              <span className="font-display text-lg font-black uppercase tracking-tight">
                ICON <span className="text-brand">English Center</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 cursor-pointer items-center justify-center border border-paper/30 text-paper"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-4 py-6 sm:px-6" aria-label="Mobile">
              {NAV_ITEMS.map((item, i) => {
                const active = page === item.id;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
                    onClick={() => go(item.id)}
                    className={cn(
                      "flex w-full cursor-pointer items-baseline gap-5 border-b border-paper/15 py-5 text-left",
                      active ? "text-brand" : "text-paper"
                    )}
                  >
                    <span className="font-display text-xs font-bold tracking-[0.2em] text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-3xl font-semibold tracking-tight">
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </nav>
            <div className="border-t border-paper/20 px-4 py-5 text-xs text-paper/60 sm:px-6">
              <a href={BRAND.phoneHref} className="font-bold text-paper">
                {BRAND.phone}
              </a>
              <span className="mx-2 text-paper/30">·</span>
              {BRAND.hours}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
