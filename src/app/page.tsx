"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { HomePage } from "@/components/site/pages/home";
import { AboutPage } from "@/components/site/pages/about";
import { CoursesPage } from "@/components/site/pages/courses";
import { LessonsPage } from "@/components/site/pages/lessons";
import { SuccessPage } from "@/components/site/pages/success";
import { AdmissionPage } from "@/components/site/pages/admission";
import { COURSES, type PageId } from "@/lib/site-data";

const VALID_PAGES = new Set<string>([
  "home",
  "about",
  "courses",
  "lessons",
  "success",
  "admission",
]);

function pageFromHash(): PageId {
  if (typeof window === "undefined") return "home";
  const h = window.location.hash.replace("#", "");
  return VALID_PAGES.has(h) ? (h as PageId) : "home";
}

export default function Page() {
  const [page, setPage] = useState<PageId>("home");
  const [pendingCourse, setPendingCourse] = useState<string | undefined>();
  const [renderKey, setRenderKey] = useState(0);

  // keep state in sync with browser navigation (back/forward)
  useEffect(() => {
    const onHash = () => setPage(pageFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = useCallback((p: PageId, opts?: { course?: string }) => {
    if (opts?.course) setPendingCourse(opts.course);
    else setPendingCourse(undefined);

    if (window.location.hash.replace("#", "") === p) {
      // same page — just re-render to apply preselection
      setRenderKey((k) => k + 1);
    } else {
      window.location.hash = p === "home" ? "" : `#${p}`;
    }
    setPage(p);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const enroll = useCallback(
    (slug: string) => {
      navigate("admission", { course: slug });
    },
    [navigate]
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar page={page} onNavigate={(p) => navigate(p)} />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${page}-${renderKey}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {page === "home" && <HomePage onNavigate={navigate} />}
            {page === "about" && <AboutPage onNavigate={navigate} />}
            {page === "courses" && (
              <CoursesPage onNavigate={navigate} onEnroll={enroll} />
            )}
            {page === "lessons" && <LessonsPage onNavigate={navigate} />}
            {page === "success" && <SuccessPage onNavigate={navigate} />}
            {page === "admission" && (
              <AdmissionPage
                key={pendingCourse ?? "none"}
                preselectedCourse={
                  pendingCourse && COURSES.some((c) => c.slug === pendingCourse)
                    ? pendingCourse
                    : undefined
                }
                onNavigate={navigate}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onNavigate={(p) => navigate(p)} />
    </div>
  );
}
