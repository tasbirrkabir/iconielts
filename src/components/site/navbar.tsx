"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "./logo";
import { NAV_ITEMS, type PageId } from "@/lib/site-data";
import { cn } from "@/lib/utils";

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

  const go = (p: PageId) => {
    onNavigate(p);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* announcement strip */}
      <div className="bg-coal text-white">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <p className="flex items-center gap-2 truncate text-[11.5px] font-medium tracking-wide text-white/75 sm:text-xs">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-gold-bright" />
            <span className="truncate">
              Free Grammar Fix every day — new IELTS lessons on YouTube
            </span>
          </p>
          <a
            href="https://www.youtube.com/@ICONEnglishCenterBD"
            target="_blank"
            rel="noreferrer"
            className="hidden shrink-0 items-center gap-1 text-[11.5px] font-bold text-gold-bright transition-colors hover:text-white sm:inline-flex sm:text-xs"
          >
            Subscribe <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* main bar */}
      <div
        className={cn(
          "w-full border-b transition-all duration-300",
          scrolled
            ? "border-border/80 bg-background/85 shadow-[0_8px_30px_-12px_rgba(29,21,18,0.12)] backdrop-blur-xl"
            : "border-transparent bg-background/60 backdrop-blur-md"
        )}
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-[4.5rem] sm:px-6"
          aria-label="Main navigation"
        >
          <button
            onClick={() => go("home")}
            className="rounded-lg focus-visible:outline-2 focus-visible:outline-brand"
            aria-label="ICON English Center — go to home"
          >
            <Logo />
          </button>

          {/* desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  data-active={page === item.id}
                  className={cn(
                    "link-sweep rounded-md px-3.5 py-2 text-sm font-semibold transition-colors",
                    page === item.id
                      ? "text-brand"
                      : "text-ink/70 hover:text-ink"
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5">
            <Button
              onClick={() => go("admission")}
              className="hidden h-10 rounded-full bg-brand px-5 text-sm font-bold shadow-lg shadow-brand/25 transition-all hover:bg-brand-deep hover:shadow-brand/40 sm:inline-flex"
            >
              Book Free Demo
            </Button>

            {/* mobile menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full border-border lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="flex w-[300px] flex-col gap-0 border-border bg-background p-0"
              >
                <SheetHeader className="border-b border-border p-5">
                  <SheetTitle className="text-left">
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto p-3">
                  <AnimatePresence initial={false}>
                    <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-1">
                      {NAV_ITEMS.map((item, i) => (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, x: 18 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * i }}
                        >
                          <button
                            onClick={() => go(item.id)}
                            className={cn(
                              "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[15px] font-semibold transition-colors",
                              page === item.id
                                ? "bg-brand-soft text-brand"
                                : "text-ink/75 hover:bg-muted"
                            )}
                          >
                            {item.label}
                            {page === item.id ? (
                              <span className="h-2 w-2 rounded-full bg-brand" />
                            ) : (
                              <ArrowRight className="h-4 w-4 opacity-30" />
                            )}
                          </button>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </AnimatePresence>
                </nav>
                <div className="border-t border-border p-5">
                  <Button
                    onClick={() => go("admission")}
                    className="h-11 w-full rounded-full bg-brand text-sm font-bold shadow-lg shadow-brand/25 hover:bg-brand-deep"
                  >
                    Book Free Demo Class
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
