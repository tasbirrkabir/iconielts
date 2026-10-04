"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { PageId } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/** Compact hero band used at the top of every inner page. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  bn,
  page,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  bn?: string;
  page: PageId;
  image?: string;
  imageAlt?: string;
}) {
  const crumb =
    page === "home" ? "Home" : page.charAt(0).toUpperCase() + page.slice(1);

  return (
    <section className="bg-grain relative overflow-hidden border-b border-white/5 bg-coal">
      <div className="bg-dots-light pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -left-32 -top-40 h-[420px] w-[420px] rounded-full bg-brand/25 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-48 right-0 h-[380px] w-[380px] rounded-full bg-gold/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        {/* breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/40"
        >
          <span>Home</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-brand">{crumb}</span>
        </motion.nav>

        <div
          className={cn(
            "mt-6 grid items-center gap-10",
            image ? "lg:grid-cols-[1.2fr_1fr]" : ""
          )}
        >
          <div>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-bright"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {eyebrow}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="font-display mt-5 max-w-3xl text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              {title}
            </motion.h1>
            {lead ? (
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
              >
                {lead}
              </motion.p>
            ) : null}
            {bn ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.28 }}
                className="font-bengali mt-4 text-sm text-gold-bright/90 sm:text-base"
              >
                {bn}
              </motion.p>
            ) : null}
          </div>

          {image ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/50 lg:block"
            >
              <Image
                src={image}
                alt={imageAlt ?? ""}
                width={672}
                height={384}
                priority
                className="aspect-[7/4] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coal/50 to-transparent" />
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
