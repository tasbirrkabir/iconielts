"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND, type PageId } from "@/lib/site-data";
import { Btn } from "./kit";

/* ================================================================== */
/*  Navbar — a quiet sticky bar on warm paper                          */
/* ================================================================== */

const LINKS: { id: PageId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "courses", label: "Courses" },
  { id: "lessons", label: "Free Lessons" },
  { id: "success", label: "Success Stories" },
];

function Wordmark({ onHome }: { onHome: () => void }) {
  return (
    <button
      type="button"
      onClick={onHome}
      className="group flex cursor-pointer items-baseline gap-2.5 text-left"
      aria-label={`${BRAND.name} — home`}
    >
      <span className="font-display text-[1.4rem] font-semibold leading-none tracking-[-0.01em] text-ink">
        {BRAND.shortName}
        <span aria-hidden className="ml-0.5 text-brand">
          .
        </span>
      </span>
      <span className="hidden text-[10px] font-semibold uppercase tracking-[0.24em] text-ink-faint transition-colors group-hover:text-ink-soft sm:inline">
        IELTS Academy
      </span>
    </button>
  );
}

export function Navbar({
  page,
  onNavigate,
}: {
  page: PageId;
  onNavigate: (p: PageId) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while the mobile menu is open
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
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-hairline bg-paper/85 backdrop-blur-xl"
            : "border-b border-transparent bg-paper"
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1080px] items-center justify-between px-5 sm:px-8 md:h-[4.5rem]">
          <Wordmark onHome={() => go("home")} />

          {/* desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => {
              const active = page === l.id;
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => go(l.id)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative cursor-pointer py-1 text-sm transition-colors duration-200",
                    active
                      ? "font-medium text-ink"
                      : "text-ink-soft hover:text-ink"
                  )}
                >
                  {l.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand transition-opacity duration-200",
                      active ? "opacity-100" : "opacity-0"
                    )}
                  />
                </button>
              );
            })}
            <Btn size="sm" onClick={() => go("admission")}>
              Enroll
            </Btn>
          </nav>

          {/* mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-ink transition-colors hover:bg-sand md:hidden"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* mobile overlay */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-paper md:hidden"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <Wordmark onHome={() => go("home")} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-ink transition-colors hover:bg-sand"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="flex flex-1 flex-col justify-center gap-1 px-6"
            >
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  type="button"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.08, duration: 0.4 }}
                  onClick={() => go(l.id)}
                  className="group flex cursor-pointer items-baseline gap-4 border-b border-hairline py-5 text-left"
                >
                  <span className="font-mono text-[11px] tracking-[0.14em] text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "font-display text-3xl font-medium tracking-[-0.01em] transition-colors",
                      page === l.id ? "text-ink" : "text-ink group-hover:text-ink"
                    )}
                  >
                    {l.label}
                  </span>
                </motion.button>
              ))}
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * LINKS.length + 0.08, duration: 0.4 }}
                onClick={() => go("admission")}
                className="group flex cursor-pointer items-baseline gap-4 py-5 text-left"
              >
                <span className="font-mono text-[11px] tracking-[0.14em] text-brand">
                  {String(LINKS.length + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-3xl font-medium tracking-[-0.01em] text-brand">
                  Admission
                </span>
              </motion.button>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.36, duration: 0.4 }}
              className="space-y-4 px-6 pb-10"
            >
              <Btn
                size="lg"
                full
                onClick={() => go("admission")}
                className="w-full"
              >
                Book a free demo class
              </Btn>
              <a
                href={BRAND.phoneHref}
                className="flex items-center justify-center gap-2 text-sm text-ink-soft"
              >
                <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
                {BRAND.phone}
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
