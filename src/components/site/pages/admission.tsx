"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Btn,
  Kicker,
  PageHead,
  Reveal,
  RuleRow,
  SectionHead,
  Shell,
  Stamp,
} from "../kit";
import { BRAND, COURSES, type PageId } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/* ================================================================== */
/*  ADMISSION — the official application form                           */
/* ================================================================== */

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Two letters minimum — we need something to call you")
    .max(80, "That name is too long for the ledger"),
  phone: z
    .string()
    .min(6, "We call this number — please check it")
    .max(20, "Please check the phone number"),
  email: z.string().email("That email does not look right"),
  course: z.string().min(1, "Pick a course — or choose 'not sure'"),
  level: z.string().min(1, "Pick the closest — honesty helps"),
  mode: z.string().min(1, "Offline or online?"),
  message: z
    .string()
    .max(600, "Please keep it under 600 characters")
    .optional()
    .or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

const LEVELS = [
  "Complete beginner",
  "Band 4–5",
  "Band 5–6",
  "Band 6–7",
  "Not sure — assess me",
];

const MODES = [
  {
    value: "Offline — Dhaka center",
    title: "Offline",
    sub: "Classroom batches at our Dhaka center",
  },
  {
    value: "Live online",
    title: "Live online",
    sub: "Live batches — join from anywhere",
  },
];

const NEXT_STEPS = [
  {
    title: "The call — within 24 hours",
    copy: `Keep your phone on. The desk calls from ${BRAND.phone}.`,
  },
  {
    title: "Free demo class + diagnostic",
    copy: "We book you into a live batch and a full mock test — both free, both yours.",
  },
  {
    title: "Enroll only if it fits",
    copy: "If the plan makes sense, you join. If it doesn't, you keep the diagnosis and the roadmap.",
  },
];

const PROCESS_STEPS = [
  {
    no: "01",
    title: "The call",
    tag: "Within 24 hours",
    copy: "A person — not a recording — calls from the admission desk. Fifteen minutes on your goal, your deadline, and where your English honestly stands.",
  },
  {
    no: "02",
    title: "Free demo class",
    tag: "No fee, no deposit",
    copy: "You sit in a real batch and watch how we teach. Bring your doubts; leave them there. If the teaching doesn't land, nobody chases you.",
  },
  {
    no: "03",
    title: "Diagnostic mock",
    tag: "Yours to keep either way",
    copy: "A full-length diagnostic under exam conditions, checked against band descriptors. You leave with an estimated band and a written plan.",
  },
];

const inputCls =
  "h-[52px] w-full border-2 border-ink bg-paper px-4 text-[15px] font-medium text-ink transition-colors placeholder:font-normal placeholder:text-ink-faint/80 focus:border-brand focus:outline-none";

/* Ruled application-sheet paper — same ledger ruling as PageHead, a touch darker */
const ruledPaper: CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(to bottom, transparent 0, transparent 31px, rgba(26,21,18,0.075) 31px, rgba(26,21,18,0.075) 32px)",
};

const paperRuleCls =
  "border-paper/25 [&>span:first-child]:text-paper/50 [&>span:last-child]:text-paper";

export function AdmissionPage({
  preselectedCourse,
  onNavigate,
}: {
  preselectedCourse?: string;
  onNavigate: (p: PageId) => void;
}) {
  const { toast } = useToast();
  const [refNo, setRefNo] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      course: preselectedCourse ?? "",
      level: "",
      mode: "",
      message: "",
    },
  });

  // Arriving from a course page's "Enroll" button pre-fills the course
  useEffect(() => {
    if (preselectedCourse) {
      form.setValue("course", preselectedCourse);
    }
  }, [preselectedCourse, form]);

  // Bring the receipt into view once the application is logged
  useEffect(() => {
    if (refNo) {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [refNo]);

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        id?: string;
        error?: string;
      };
      if (!res.ok) throw new Error(data?.error || "Something went wrong");
      setRefNo(data?.id ? data.id.slice(-6).toUpperCase() : "logged");
      toast({
        title: "Application received",
        description:
          "The admission desk will call within 24 hours to book your free demo class.",
      });
    } catch (err) {
      toast({
        title: "Could not submit",
        description:
          err instanceof Error
            ? err.message
            : "Please try again, or reach us on WhatsApp.",
        variant: "destructive",
      });
    }
  };

  const courseValue = form.watch("course");
  const levelValue = form.watch("level");
  const modeValue = form.watch("mode");
  const errors = form.formState.errors;

  return (
    <>
      <PageHead
        no="06"
        bn="ভর্তি আবেদন"
        title={
          <>
            Three minutes now. A call
            <br />
            within <em className="italic text-brand">24 hours.</em>
          </>
        }
        lede="Fill the form and the admission desk calls you back — same day during office hours, 24 hours at worst. The call books your free demo class and a diagnostic mock test. No fees, no obligation, no expiring discounts."
        meta={[
          { label: "Response", value: "Within 24h" },
          { label: "Demo class", value: "Free" },
          { label: "Diagnostic", value: "Free" },
          { label: "Commitment", value: "None" },
        ]}
      />

      <section className="bg-paper">
        <Shell className="px-4 py-16 sm:px-8 sm:py-24">
          <SectionHead
            no="01"
            bn="আবেদন ফরম"
            en="The application"
            title={
              <>
                The easiest test you&apos;ll
                <br />
                take with <em className="italic text-brand">us.</em>
              </>
            }
            lede="Seven fields, one page, no account creation. The desk reads every application — usually within the hour during office time."
          />

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
            {/* the form / success panel */}
            <div ref={panelRef} className="scroll-mt-28">
              <Reveal>
              {refNo ? (
                <SuccessPanel
                  form={form}
                  refNo={refNo}
                  onNavigate={onNavigate}
                />
              ) : (
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  noValidate
                  className="border-2 border-ink bg-card shadow-[8px_8px_0_0_rgba(26,21,18,0.9)]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 bg-ink px-5 py-4 text-paper sm:px-7">
                    <span className="text-[11px] font-bold uppercase tracking-[0.22em]">
                      Application for admission
                    </span>
                    <span className="font-bn-serif text-[13px] font-medium text-paper/70">
                      ভর্তি আবেদন
                    </span>
                    <span className="font-display text-[10px] font-bold tracking-[0.24em] text-paper/50">
                      Form AD-01
                    </span>
                  </div>

                  <div
                    style={ruledPaper}
                    className="grid gap-5 px-5 py-7 sm:grid-cols-2 sm:gap-6 sm:px-7 sm:py-9"
                  >
                    <Field
                      label="Full name"
                      htmlFor="adm-name"
                      error={errors.name?.message}
                      required
                    >
                      <input
                        id="adm-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        className={inputCls}
                        {...form.register("name")}
                      />
                    </Field>

                    <Field
                      label="Phone / WhatsApp"
                      htmlFor="adm-phone"
                      error={errors.phone?.message}
                      required
                      hint="We call this number"
                    >
                      <input
                        id="adm-phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="01XXXXXXXXX"
                        className={inputCls}
                        {...form.register("phone")}
                      />
                    </Field>

                    <Field
                      label="Email"
                      htmlFor="adm-email"
                      error={errors.email?.message}
                      required
                      className="sm:col-span-2"
                    >
                      <input
                        id="adm-email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={inputCls}
                        {...form.register("email")}
                      />
                    </Field>

                    <Field
                      label="Course of interest"
                      htmlFor="adm-course"
                      error={errors.course?.message}
                      required
                    >
                      <div className="relative">
                        <select
                          id="adm-course"
                          className={cn(
                            inputCls,
                            "cursor-pointer appearance-none pr-10",
                            !courseValue && "text-ink-faint"
                          )}
                          {...form.register("course")}
                        >
                          <option value="" disabled>
                            Choose a course…
                          </option>
                          {COURSES.map((c) => (
                            <option key={c.slug} value={c.slug}>
                              {c.title} — {c.price}
                            </option>
                          ))}
                          <option value="not-sure">
                            Not sure — help me choose
                          </option>
                        </select>
                        <span
                          aria-hidden
                          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-ink-soft"
                        >
                          ▼
                        </span>
                      </div>
                    </Field>

                    <Field
                      label="Current level"
                      htmlFor="adm-level"
                      error={errors.level?.message}
                      required
                      hint="Be honest — it helps"
                    >
                      <div className="relative">
                        <select
                          id="adm-level"
                          className={cn(
                            inputCls,
                            "cursor-pointer appearance-none pr-10",
                            !levelValue && "text-ink-faint"
                          )}
                          {...form.register("level")}
                        >
                          <option value="" disabled>
                            Where are you now?…
                          </option>
                          {LEVELS.map((l) => (
                            <option key={l} value={l}>
                              {l}
                            </option>
                          ))}
                        </select>
                        <span
                          aria-hidden
                          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-ink-soft"
                        >
                          ▼
                        </span>
                      </div>
                    </Field>

                    {/* mode — radio-style toggle buttons */}
                    <div className="sm:col-span-2">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
                          Class mode<span className="ml-1 text-brand">*</span>
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
                          Both get the same teachers
                        </span>
                      </div>
                      <div className="mt-2 grid gap-3 sm:grid-cols-2">
                        {MODES.map((m) => {
                          const active = modeValue === m.value;
                          return (
                            <button
                              key={m.value}
                              type="button"
                              aria-pressed={active}
                              onClick={() =>
                                form.setValue("mode", m.value, {
                                  shouldValidate: true,
                                })
                              }
                              className={cn(
                                "flex cursor-pointer items-center gap-3.5 border-2 px-4 py-3.5 text-left transition-colors duration-150",
                                active
                                  ? "border-ink bg-ink text-paper"
                                  : "border-ink/30 bg-paper text-ink hover:border-ink"
                              )}
                            >
                              <span
                                aria-hidden
                                className={cn(
                                  "flex h-4 w-4 shrink-0 items-center justify-center border-2",
                                  active
                                    ? "border-paper bg-brand"
                                    : "border-ink/40"
                                )}
                              >
                                {active ? (
                                  <span className="h-1.5 w-1.5 bg-paper" />
                                ) : null}
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-bold uppercase tracking-[0.08em]">
                                  {m.title}
                                </span>
                                <span
                                  className={cn(
                                    "mt-0.5 block text-xs",
                                    active ? "text-paper/60" : "text-ink-soft"
                                  )}
                                >
                                  {m.sub}
                                </span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.mode?.message ? (
                        <p
                          role="alert"
                          className="mt-1.5 flex items-baseline gap-1.5 text-[11px] font-bold text-brand-deep"
                        >
                          <span
                            aria-hidden
                            className="text-[8px] leading-none"
                          >
                            ■
                          </span>
                          {errors.mode.message}
                        </p>
                      ) : null}
                    </div>

                    <Field
                      label="Anything we should know?"
                      htmlFor="adm-message"
                      error={errors.message?.message}
                      hint="Optional"
                      className="sm:col-span-2"
                    >
                      <textarea
                        id="adm-message"
                        rows={4}
                        placeholder="Target band, exam date, questions — anything."
                        className={cn(inputCls, "h-auto resize-none py-3.5 leading-relaxed")}
                        {...form.register("message")}
                      />
                    </Field>

                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="group/btn inline-flex w-full cursor-pointer select-none items-center justify-center gap-3 border-2 border-ink bg-brand px-8 py-4 font-sans text-[13px] font-bold uppercase tracking-[0.14em] text-paper shadow-[4px_4px_0_0_#1a1512] transition-colors duration-200 hover:bg-ink hover:shadow-[4px_4px_0_0_#e31e24] disabled:cursor-wait disabled:opacity-70 disabled:hover:bg-brand disabled:hover:shadow-[4px_4px_0_0_#1a1512]"
                      >
                        {form.formState.isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Submitting…
                          </>
                        ) : (
                          <>
                            Submit application
                            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                          </>
                        )}
                      </button>
                      <p className="mt-5 border-t border-dashed border-ink/25 pt-4 text-center text-[11px] font-semibold leading-relaxed text-ink-soft">
                        No payment is asked on this form — or anywhere else on
                        this site. Never pay anyone claiming to guarantee a
                        band score.
                      </p>
                    </div>
                  </div>
                </form>
              )}
              </Reveal>
            </div>

            {/* aside — the contact ledger */}
            <div className="flex flex-col gap-8">
              <Reveal delay={0.08}>
                <aside className="border-2 border-ink bg-ink text-paper">
                  <div className="bg-grain relative">
                    <div className="relative p-6 sm:p-7">
                      <Kicker tone="paper">The admission desk</Kicker>
                      <p className="font-bn-serif mt-4 text-lg font-medium leading-snug text-paper/90">
                        সরাসরি কথা বলতে চাও?
                      </p>
                      <h3 className="font-display mt-2 text-2xl font-semibold leading-tight text-paper">
                        We actually pick up the phone.
                      </h3>
                      <p className="mt-3 text-[13px] leading-relaxed text-paper/60">
                        Calling beats typing when you have ten questions. Ring
                        the desk, or message on WhatsApp — a human replies, not
                        a bot.
                      </p>
                      <div className="mt-5 border-t border-paper/20 pt-1">
                        <RuleRow
                          label="Phone"
                          value={
                            <a className="link-sweep" href={BRAND.phoneHref}>
                              {BRAND.phone}
                            </a>
                          }
                          className={paperRuleCls}
                        />
                        <RuleRow
                          label="WhatsApp"
                          value={
                            <a
                              className="link-sweep"
                              href={BRAND.whatsappHref}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {BRAND.whatsapp}
                            </a>
                          }
                          className={paperRuleCls}
                        />
                        <RuleRow
                          label="Email"
                          value={
                            <a
                              className="link-sweep break-all"
                              href={BRAND.emailHref}
                            >
                              {BRAND.email}
                            </a>
                          }
                          className={paperRuleCls}
                        />
                        <RuleRow
                          label="Hours"
                          value={BRAND.hours}
                          className={paperRuleCls}
                        />
                        <RuleRow
                          label="Desk"
                          value={BRAND.location}
                          className={paperRuleCls}
                        />
                      </div>
                      <div className="mt-6 grid gap-3">
                        <Btn
                          variant="ghost-paper"
                          href={BRAND.phoneHref}
                          className="w-full"
                        >
                          Call the desk
                        </Btn>
                        <Btn
                          variant="ghost-paper"
                          href={BRAND.whatsappHref}
                          external
                          className="w-full"
                        >
                          WhatsApp us
                        </Btn>
                      </div>
                    </div>
                  </div>
                </aside>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="border-2 border-ink bg-card p-6">
                  <Kicker>Not ready yet?</Kicker>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    Watch a full class free on YouTube first — same teachers,
                    same method. The form will still be here when the exam
                    date gets close.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Btn
                      variant="outline"
                      size="sm"
                      onClick={() => onNavigate("lessons")}
                    >
                      Free lessons
                    </Btn>
                    <Btn
                      variant="outline"
                      size="sm"
                      onClick={() => onNavigate("courses")}
                    >
                      View programs
                    </Btn>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Shell>
      </section>

      <WhatNext />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Field — official-form field wrapper                                */
/* ------------------------------------------------------------------ */

function Field({
  label,
  htmlFor,
  error,
  required,
  hint,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="flex items-baseline justify-between gap-3"
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink">
          {label}
          {required ? <span className="ml-1 text-brand">*</span> : null}
        </span>
        {hint ? (
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">
            {hint}
          </span>
        ) : null}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p
          role="alert"
          className="mt-1.5 flex items-baseline gap-1.5 text-[11px] font-bold text-brand-deep"
        >
          <span aria-hidden className="text-[8px] leading-none">
            ■
          </span>
          {error}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Success panel — replaces the form after a 201                      */
/* ------------------------------------------------------------------ */

function SuccessPanel({
  form,
  refNo,
  onNavigate,
}: {
  form: UseFormReturn<FormValues>;
  refNo: string;
  onNavigate: (p: PageId) => void;
}) {
  const courseSlug = form.getValues("course");
  const courseLabel =
    COURSES.find((c) => c.slug === courseSlug)?.title ??
    (courseSlug === "not-sure" ? "Not sure — needs guidance" : courseSlug);

  return (
    <div className="border-2 border-ink bg-card shadow-[8px_8px_0_0_rgba(26,21,18,0.9)]">
      <div className="flex items-center justify-between gap-x-6 bg-ink px-5 py-4 text-paper sm:px-7">
        <span className="text-[11px] font-bold uppercase tracking-[0.22em]">
          Application received
        </span>
        <span className="font-display text-[10px] font-bold tracking-[0.24em] text-paper/50">
          Form AD-01
        </span>
      </div>

      <div
        style={ruledPaper}
        className="relative px-5 py-8 sm:px-8 sm:py-10"
      >
        <Reveal>
          <Stamp>Received</Stamp>
          <h3 className="font-display mt-6 max-w-xl text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">
            <span className="font-bn-serif font-medium">আবেদন পৌঁছেছে</span> —
            Application № {refNo}.
          </h3>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">
            The desk has it. Keep your phone on — a call from{" "}
            <a
              href={BRAND.phoneHref}
              className="link-sweep font-semibold text-ink"
            >
              {BRAND.phone}
            </a>{" "}
            comes within 24 hours.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <ol className="mt-8 border-t-2 border-ink">
            {NEXT_STEPS.map((s, i) => (
              <li
                key={s.title}
                className="grid grid-cols-[2.6rem_1fr] gap-x-4 border-b border-dashed border-ink/25 py-4"
              >
                <span className="font-display pt-0.5 text-sm font-bold tracking-[0.16em] text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="font-display block text-base font-semibold text-ink">
                    {s.title}
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-ink-soft">
                    {s.copy}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-8 border-2 border-ink bg-paper">
            <div className="border-b border-ink/20 bg-paper-deep/60 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft">
              For your records
            </div>
            <div className="px-4 py-1">
              <RuleRow label="Name" value={form.getValues("name")} />
              <RuleRow label="Phone" value={form.getValues("phone")} />
              <RuleRow label="Course" value={courseLabel} />
              <RuleRow label="Mode" value={form.getValues("mode")} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap gap-4">
            <Btn onClick={() => onNavigate("lessons")}>
              Watch free lessons meanwhile
            </Btn>
            <Btn variant="outline" onClick={() => onNavigate("home")}>
              Back to home
            </Btn>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  §02 · What happens next — the three-step process                   */
/* ------------------------------------------------------------------ */

function WhatNext() {
  return (
    <section className="border-t-2 border-ink bg-paper-deep">
      <Shell className="px-4 py-16 sm:px-8 sm:py-24">
        <SectionHead
          no="02"
          bn="এরপর কী হবে"
          en="What happens next"
          title={
            <>
              From form to first class —
              <br />
              in <em className="italic text-brand">three</em> steps.
            </>
          }
          lede="No black box. This is exactly what happens after you press submit."
        />

        <div className="mt-12 grid border-2 border-ink bg-paper sm:grid-cols-3">
          {PROCESS_STEPS.map((s, i) => (
            <Reveal
              key={s.no}
              delay={i * 0.07}
              className={cn(
                "border-ink",
                i !== 0 && "border-t sm:border-t-0 sm:border-l"
              )}
            >
              <article className="flex h-full flex-col p-6 sm:p-8">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-4xl font-bold leading-none text-brand sm:text-5xl">
                    {s.no}
                  </span>
                  <span className="text-right text-[9px] font-bold uppercase tracking-[0.18em] text-ink-faint">
                    {s.tag}
                  </span>
                </div>
                <h3 className="font-display mt-5 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-ink-soft">
                  {s.copy}
                </p>
                <span
                  aria-hidden
                  className="mt-6 block h-[3px] w-10 bg-brand"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}
