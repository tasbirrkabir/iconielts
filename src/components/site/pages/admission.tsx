"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  PartyPopper,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { PageHeader } from "../page-header";
import { Reveal } from "../reveal";
import { BRAND, COURSES, type PageId } from "@/lib/site-data";

/* ---------------------------------------------------------------- */

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Please tell us your name")
    .max(80, "That's a very long name — please shorten it"),
  phone: z
    .string()
    .min(6, "A valid phone number helps us reach you")
    .max(20, "Please check the phone number"),
  email: z.string().email("Please enter a valid email"),
  course: z.string().min(1, "Please choose a course of interest"),
  level: z.string().min(1, "Where are you starting from?"),
  mode: z.string().min(1, "Online or offline?"),
  message: z
    .string()
    .max(600, "Please keep it under 600 characters")
    .optional()
    .or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

const LEVELS = [
  "Complete beginner",
  "Can understand, struggle to speak",
  "Around Band 5",
  "Around Band 6",
  "Around Band 6.5+",
  "Not sure — need the diagnostic test",
];

const MODES = ["Online (live classes)", "Offline (at our center)", "Either is fine"];

export function AdmissionPage({
  preselectedCourse,
  onNavigate,
}: {
  preselectedCourse?: string;
  onNavigate: (p: PageId) => void;
}) {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

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

  // If user clicked "Enroll" on the courses page, pre-fill the course
  useEffect(() => {
    if (preselectedCourse) {
      form.setValue("course", preselectedCourse);
    }
  }, [preselectedCourse, form]);

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong");
      setSubmitted(true);
      toast({
        title: "Admission request received! 🎉",
        description:
          "We'll call you within 24 hours to schedule your free demo class.",
      });
    } catch (err) {
      toast({
        title: "Couldn't submit the form",
        description:
          err instanceof Error ? err.message : "Please try again or WhatsApp us.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <PageHeader
        page="admission"
        eyebrow="Admission"
        title={
          <>
            Book your <span className="text-gradient-gold">free demo class</span>{" "}
            &amp; diagnostic test.
          </>
        }
        lead="Fill the form and our team will call you within 24 hours — no fees, no commitment. Just come see how we teach."
        bn="ফ্রি ডেমো ক্লাস ও মক টেস্টের জন্য আজই রেগিস্ট্রেশন করুন"
      />

      <section className="bg-background py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.5fr_1fr]">
          {/* form card */}
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-xl shadow-ink/5 sm:p-9">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/5 blur-2xl" />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex min-h-[480px] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-brand text-white shadow-2xl shadow-brand/40"
                    >
                      <PartyPopper className="h-10 w-10" />
                    </motion.span>
                    <h2 className="font-display mt-7 text-3xl font-extrabold text-ink">
                      You&apos;re on the list!
                    </h2>
                    <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
                      Thank you, {form.getValues("name").split(" ")[0] || "friend"}.
                      Our team will call{" "}
                      <span className="font-semibold text-ink">
                        {form.getValues("phone")}
                      </span>{" "}
                      within 24 hours to confirm your free demo class and
                      diagnostic mock test.
                    </p>
                    <div className="mt-7 flex flex-wrap justify-center gap-3">
                      <Button
                        onClick={() => onNavigate("lessons")}
                        className="h-11 rounded-full bg-coal px-6 text-sm font-bold text-white hover:bg-coal-soft"
                      >
                        Watch free lessons meanwhile
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => onNavigate("home")}
                        className="h-11 rounded-full border-border px-6 text-sm font-bold text-ink hover:border-brand hover:text-brand"
                      >
                        Back to home
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -12 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white shadow-lg shadow-brand/30">
                        <CalendarCheck className="h-5.5 w-5.5" />
                      </span>
                      <div>
                        <h2 className="font-display text-2xl font-extrabold text-ink">
                          Admission &amp; demo booking
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Takes less than 60 seconds
                        </p>
                      </div>
                    </div>

                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mt-8 grid gap-5 sm:grid-cols-2"
                        noValidate
                      >
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[13px] font-bold text-ink">
                                Your name <span className="text-brand">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Nusrat Jahan"
                                  className="h-12 rounded-xl border-border bg-background text-[15px] focus-visible:ring-brand/30"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[13px] font-bold text-ink">
                                Phone / WhatsApp{" "}
                                <span className="text-brand">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="01XXX-XXXXXX"
                                  inputMode="tel"
                                  className="h-12 rounded-xl border-border bg-background text-[15px] focus-visible:ring-brand/30"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                              <FormLabel className="text-[13px] font-bold text-ink">
                                Email <span className="text-brand">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="you@example.com"
                                  className="h-12 rounded-xl border-border bg-background text-[15px] focus-visible:ring-brand/30"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="course"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[13px] font-bold text-ink">
                                Course of interest{" "}
                                <span className="text-brand">*</span>
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="h-12 w-full rounded-xl border-border bg-background text-[15px] focus:ring-brand/30">
                                    <SelectValue placeholder="Choose a course" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="rounded-xl">
                                  {COURSES.map((c) => (
                                    <SelectItem
                                      key={c.slug}
                                      value={c.slug}
                                      className="rounded-lg"
                                    >
                                      {c.title}
                                    </SelectItem>
                                  ))}
                                  <SelectItem value="not-sure" className="rounded-lg">
                                    Not sure — help me choose
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="level"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[13px] font-bold text-ink">
                                Current level{" "}
                                <span className="text-brand">*</span>
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="h-12 w-full rounded-xl border-border bg-background text-[15px] focus:ring-brand/30">
                                    <SelectValue placeholder="Be honest — it helps" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="rounded-xl">
                                  {LEVELS.map((l) => (
                                    <SelectItem
                                      key={l}
                                      value={l}
                                      className="rounded-lg"
                                    >
                                      {l}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="mode"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                              <FormLabel className="text-[13px] font-bold text-ink">
                                Class mode <span className="text-brand">*</span>
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="h-12 w-full rounded-xl border-border bg-background text-[15px] focus:ring-brand/30">
                                    <SelectValue placeholder="How would you like to attend?" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="rounded-xl">
                                  {MODES.map((m) => (
                                    <SelectItem
                                      key={m}
                                      value={m}
                                      className="rounded-lg"
                                    >
                                      {m}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                              <FormLabel className="text-[13px] font-bold text-ink">
                                Anything we should know?{" "}
                                <span className="font-medium text-muted-foreground">
                                  (optional)
                                </span>
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Your target band score, exam date, questions…"
                                  rows={4}
                                  className="resize-none rounded-xl border-border bg-background text-[15px] focus-visible:ring-brand/30"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="sm:col-span-2">
                          <Button
                            type="submit"
                            size="lg"
                            disabled={form.formState.isSubmitting}
                            className="h-13 w-full rounded-full bg-brand py-4 text-[15px] font-extrabold shadow-xl shadow-brand/30 transition-all hover:scale-[1.01] hover:bg-brand-deep disabled:opacity-70"
                          >
                            {form.formState.isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Sending your request…
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 h-4.5 w-4.5" />
                                Book my free demo class
                              </>
                            )}
                          </Button>
                          <p className="mt-3.5 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                            <ShieldCheck className="h-3.5 w-3.5 text-brand" />
                            Your information stays private. No spam, ever.
                          </p>
                        </div>
                      </form>
                    </Form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          {/* sidebar */}
          <div className="flex flex-col gap-5">
            <Reveal delay={0.08}>
              <div className="rounded-3xl border border-border bg-card p-6 sm:p-7">
                <h3 className="font-display text-lg font-extrabold text-ink">
                  Prefer talking first?
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Reach us directly — we actually pick up.
                </p>
                <ul className="mt-5 flex flex-col gap-4">
                  <li>
                    <a
                      href={BRAND.phoneHref}
                      className="group flex items-center gap-4 rounded-2xl border border-border bg-background p-4 transition-all hover:border-brand/40 hover:shadow-lg hover:shadow-brand/10"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                        <Phone className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Call us
                        </span>
                        <span className="font-display text-[15px] font-bold text-ink">
                          {BRAND.phone}
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={BRAND.whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-4 rounded-2xl border border-border bg-background p-4 transition-all hover:border-brand/40 hover:shadow-lg hover:shadow-brand/10"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-soft text-gold transition-colors group-hover:bg-gold group-hover:text-white">
                        <MessageCircle className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          WhatsApp
                        </span>
                        <span className="font-display text-[15px] font-bold text-ink">
                          {BRAND.whatsapp}
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={BRAND.emailHref}
                      className="group flex items-center gap-4 rounded-2xl border border-border bg-background p-4 transition-all hover:border-brand/40 hover:shadow-lg hover:shadow-brand/10"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                        <Mail className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Email
                        </span>
                        <span className="block truncate font-display text-[15px] font-bold text-ink">
                          {BRAND.email}
                        </span>
                      </span>
                    </a>
                  </li>
                </ul>
                <div className="mt-5 flex flex-col gap-2.5 border-t border-border pt-5 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2.5">
                    <MapPin className="h-4 w-4 shrink-0 text-brand" />
                    {BRAND.location}
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Clock className="h-4 w-4 shrink-0 text-brand" />
                    {BRAND.hours}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-deep p-6 text-white sm:p-7">
                <div className="bg-grain absolute inset-0" />
                <div className="relative">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                    <Sparkles className="h-5.5 w-5.5" />
                  </span>
                  <h3 className="font-display mt-4 text-xl font-extrabold leading-snug">
                    What happens after you submit?
                  </h3>
                  <ul className="mt-4 flex flex-col gap-3">
                    {[
                      "We call you within 24 hours",
                      "Free diagnostic mock test is scheduled",
                      "You get a personal roadmap — even if you don't join",
                    ].map((s, i) => (
                      <li key={s} className="flex items-start gap-3 text-sm text-white/90">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-[11px] font-extrabold">
                          {i + 1}
                        </span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="overflow-hidden rounded-3xl border border-border">
                <Image
                  src="/images/success-wall.png"
                  alt="Students celebrating results at ICON English Center"
                  width={672}
                  height={384}
                  className="aspect-[7/4] w-full object-cover"
                />
                <div className="flex items-center gap-2 bg-coal px-5 py-3.5 text-xs font-semibold text-white/70">
                  <CheckCircle2 className="h-4 w-4 text-brand" />
                  1,200+ students have taken this exact first step
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
