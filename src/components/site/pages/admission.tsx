"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Check,
  ChevronDown,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Btn,
  Container,
  Eyebrow,
  PageHead,
  Reveal,
  SectionHead,
} from "../kit";
import { BRAND, COURSES, type PageId } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/* ================================================================== */
/*  ADMISSION — the application form                                   */
/* ================================================================== */

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Two letters minimum — we need something to call you")
    .max(80, "That name is too long"),
  phone: z
    .string()
    .min(6, "We call this number — please check it")
    .max(20, "Please check the phone number"),
  email: z.string().email("That email does not look right"),
  course: z.string().min(1, "Pick a course — or choose 'not sure'"),
  level: z.string().min(1, "Pick the closest — honesty helps"),
  mode: z.string().min(1, "Offline or online?"),
  message: z.string().max(600, "Please keep it under 600 characters").optional().or(z.literal("")),
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
    no: "01",
    title: "The call — within 24 hours",
    copy: `Keep your phone on. The desk calls from ${BRAND.phone}.`,
  },
  {
    no: "02",
    title: "Free demo class + diagnostic",
    copy: "We book you into a live batch and a full mock test — both free, both yours.",
  },
  {
    no: "03",
    title: "Enroll only if it fits",
    copy: "If the plan makes sense, you join. If it doesn't, you keep the diagnosis and the roadmap.",
  },
];

const inputCls =
  "h-12 w-full rounded-xl border border-hairline bg-paper px-4 text-sm font-medium text-ink transition-colors placeholder:font-normal placeholder:text-ink-faint/70 focus:border-ink focus:outline-none";

/* ------------------------------------------------------------------ */

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

  // arriving from a course page's "Enroll" button pre-fills the course
  useEffect(() => {
    if (preselectedCourse) {
      form.setValue("course", preselectedCourse);
    }
  }, [preselectedCourse, form]);

  // bring the receipt into view once the application is logged
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
  const isSubmitting = form.formState.isSubmitting;

  return (
    <>
      <PageHead
        eyebrow="Admission"
        title={
          <>
            Three minutes now. A call within{" "}
            <em className="italic text-brand">24 hours.</em>
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

      <section className="py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-14">
          {/* the form / success panel */}
          <div ref={panelRef} className="scroll-mt-24">
            <Reveal>
              {refNo ? (
                <SuccessPanel
                  values={form.getValues()}
                  refNo={refNo}
                  onNavigate={onNavigate}
                />
              ) : (
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  noValidate
                  className="rounded-2xl border border-hairline bg-card p-6 sm:p-10"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <Eyebrow>The application</Eyebrow>
                    <span className="font-bengali text-[13px] text-ink-faint">
                      ভর্তি আবেদন
                    </span>
                  </div>

                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
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
                        <ChevronDown
                          aria-hidden
                          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
                        />
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
                        <ChevronDown
                          aria-hidden
                          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
                        />
                      </div>
                    </Field>

                    {/* mode */}
                    <div className="sm:col-span-2">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                        Class mode<span className="ml-1 text-brand">*</span>
                      </span>
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
                                "flex cursor-pointer items-center gap-3.5 rounded-xl border px-4 py-3.5 text-left transition-all duration-200",
                                active
                                  ? "border-ink bg-sand/70"
                                  : "border-hairline bg-paper hover:border-ink-faint"
                              )}
                            >
                              <span
                                aria-hidden
                                className={cn(
                                  "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                                  active ? "border-ink" : "border-ink-faint/60"
                                )}
                              >
                                {active ? (
                                  <span className="h-2 w-2 rounded-full bg-brand" />
                                ) : null}
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-semibold text-ink">
                                  {m.title}
                                </span>
                                <span className="mt-0.5 block text-xs text-ink-soft">
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
                          className="mt-1.5 text-xs text-brand-deep"
                        >
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
                        placeholder="Target score, exam date, past attempts, specific fears…"
                        className={cn(inputCls, "h-auto resize-none py-3.5")}
                        {...form.register("message")}
                      />
                    </Field>
                  </div>

                  <div className="mt-9 flex flex-col gap-4 border-t border-hairline pt-7 sm:flex-row sm:items-center sm:justify-between">
                    <p className="order-2 text-[13px] leading-relaxed text-ink-faint sm:order-1 sm:max-w-[240px]">
                      No fees are due at this step — the demo class and
                      diagnostic come first.
                    </p>
                    <Btn
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="order-1 w-full sm:order-2 sm:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        "Submit application"
                      )}
                    </Btn>
                  </div>
                </form>
              )}
            </Reveal>
          </div>

          {/* aside */}
          <aside className="space-y-8 lg:pt-2">
            <Reveal delay={0.08}>
              <SectionHead
                eyebrow="What happens next"
                title="Three steps, no pressure."
                className="max-w-none"
              />
              <ol className="mt-8 space-y-7">
                {NEXT_STEPS.map((s) => (
                  <li key={s.no} className="flex gap-5">
                    <span className="font-mono text-xs tracking-[0.12em] text-brand">
                      {s.no}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-ink">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
                        {s.copy}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="rounded-2xl bg-sand/70 p-6 sm:p-7">
                <Eyebrow>Reach us directly</Eyebrow>
                <ul className="mt-5 space-y-3.5 text-sm">
                  <li>
                    <a
                      href={BRAND.phoneHref}
                      className="inline-flex items-center gap-2.5 text-ink transition-colors hover:text-brand-deep"
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0 text-ink-faint" strokeWidth={1.5} />
                      {BRAND.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={BRAND.emailHref}
                      className="inline-flex items-center gap-2.5 break-all text-ink transition-colors hover:text-brand-deep"
                    >
                      <Mail className="h-3.5 w-3.5 shrink-0 text-ink-faint" strokeWidth={1.5} />
                      {BRAND.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-2.5 text-ink-soft">
                    <Clock className="h-3.5 w-3.5 shrink-0 text-ink-faint" strokeWidth={1.5} />
                    {BRAND.hours}
                  </li>
                  <li className="flex items-center gap-2.5 text-ink-soft">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-ink-faint" strokeWidth={1.5} />
                    {BRAND.location}
                  </li>
                </ul>
                <Btn
                  variant="outline"
                  href={BRAND.whatsappHref}
                  external
                  className="mt-6 w-full"
                >
                  Message us on WhatsApp
                </Btn>
              </div>
            </Reveal>
          </aside>
        </Container>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Field wrapper                                                      */
/* ------------------------------------------------------------------ */

function Field({
  label,
  htmlFor,
  error,
  required,
  hint,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <label
        htmlFor={htmlFor}
        className="flex items-baseline justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft"
      >
        <span>
          {label}
          {required ? <span className="ml-1 text-brand">*</span> : null}
        </span>
        {hint ? (
          <span className="text-[11px] font-normal normal-case tracking-normal text-ink-faint">
            {hint}
          </span>
        ) : null}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p role="alert" className="mt-1.5 text-xs text-brand-deep">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Success panel                                                      */
/* ------------------------------------------------------------------ */

function SuccessPanel({
  values,
  refNo,
  onNavigate,
}: {
  values: FormValues;
  refNo: string;
  onNavigate: (p: PageId) => void;
}) {
  const courseLabel =
    COURSES.find((c) => c.slug === values.course)?.title ??
    (values.course === "not-sure" ? "Not sure — needs guidance" : values.course);

  return (
    <div className="rounded-2xl border border-hairline bg-card p-8 text-center sm:p-12">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper">
        <Check className="h-6 w-6" strokeWidth={1.5} />
      </span>
      <h2 className="font-display mt-7 text-3xl font-medium tracking-[-0.01em] text-ink">
        Application received.
      </h2>
      <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
        The admission desk will call <strong className="text-ink">{values.phone}</strong>{" "}
        within 24 hours to book your free demo class and diagnostic mock.
      </p>

      <div className="mx-auto mt-8 max-w-sm rounded-2xl bg-sand/70 p-6 text-left">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
            Reference
          </span>
          <span className="font-mono text-sm font-semibold text-ink">
            № {refNo}
          </span>
        </div>
        <dl className="mt-4 space-y-2.5 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-ink-soft">Course</dt>
            <dd className="text-right font-medium text-ink">{courseLabel}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-soft">Level</dt>
            <dd className="text-right font-medium text-ink">{values.level}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-soft">Mode</dt>
            <dd className="text-right font-medium text-ink">{values.mode}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
        <Btn variant="outline" onClick={() => onNavigate("home")}>
          Back to home
        </Btn>
        <Btn href={BRAND.whatsappHref} external>
          Say hello on WhatsApp
        </Btn>
      </div>
    </div>
  );
}
