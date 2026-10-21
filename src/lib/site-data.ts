import {
  Ear,
  BookOpen,
  PenLine,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type PageId =
  | "home"
  | "about"
  | "courses"
  | "lessons"
  | "success"
  | "admission";

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
}

export interface Course {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  duration: string;
  classes: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  popular?: boolean;
  features: string[];
  outcomes: string[];
}

export interface Lesson {
  id: string;
  title: string;
  category: "Listening" | "Reading" | "Writing" | "Speaking" | "Strategy";
  duration: string;
}

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  from: string;
  to: string;
  quote: string;
  course: string;
}

/* ------------------------------------------------------------------ */
/*  Brand                                                              */
/* ------------------------------------------------------------------ */

export const BRAND = {
  name: "Demo IELTS Academy",
  shortName: "DEMO",
  taglineEn:
    "Your trusted companion for the IELTS band score of your dreams — demo learning platform.",
  taglineBn: "বাংলায় সহজে স্বপ্নের IELTS Band Score অর্জনের ডেমো প্ল্যাটফর্ম",
  phone: "+880 1700-000000",
  phoneHref: "tel:+880170000000",
  whatsapp: "+880 1700-000001",
  whatsappHref: "https://wa.me/880170000001",
  email: "demo@example.com",
  emailHref: "mailto:demo@example.com",
  location: "Demo Campus, Dhaka, Bangladesh",
  hours: "Sat – Thu · 10:00 AM – 8:00 PM",
} as const;

export const SOCIALS: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://facebook.com/demo.ielts.academy",
    handle: "demo.ielts.academy",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@DemoIELTSAcademy",
    handle: "@DemoIELTSAcademy",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/demo.ielts.academy",
    handle: "demo.ielts.academy",
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@demo.ielts.academy",
    handle: "demo.ielts.academy",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/demo-ielts-academy",
    handle: "demo-ielts-academy",
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com/DemoIELTSAcademy",
    handle: "DemoIELTSAcademy",
  },
  {
    label: "Threads",
    href: "https://threads.net/@demo.ielts.academy",
    handle: "@demo.ielts.academy",
  },
  {
    label: "Quora",
    href: "https://quora.com/topic/Demo-IELTS-Academy",
    handle: "Demo-IELTS-Academy",
  },
];

export const STATS = [
  { value: 10000, suffix: "+", label: "Demo community members" },
  { value: 50, suffix: "+", label: "Demo video lessons" },
  { value: 8, suffix: "", label: "Target band score" },
  { value: 25000, suffix: "+", label: "Demo lesson views" },
] as const;

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */

export const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "courses", label: "Courses" },
  { id: "lessons", label: "Free Lessons" },
  { id: "success", label: "Success Stories" },
  { id: "admission", label: "Admission" },
];

/* ------------------------------------------------------------------ */
/*  IELTS modules                                                      */
/* ------------------------------------------------------------------ */

export interface Module {
  icon: LucideIcon;
  name: string;
  bnName: string;
  description: string;
  points: string[];
}

export const MODULES: Module[] = [
  {
    icon: Ear,
    name: "Listening",
    bnName: "লিসেনিং",
    description:
      "Master every section — from form-filling in Section 1 to academic monologues in Section 4 — with proven prediction and keyword techniques.",
    points: [
      "Section-wise strategy classes",
      "Map, form, table & MCQ drills",
      "Accent training & prediction skills",
    ],
  },
  {
    icon: BookOpen,
    name: "Reading",
    bnName: "রিডিং",
    description:
      "Finish all 3 passages on time. Learn skimming, scanning and matching techniques that turn 60 minutes into enough.",
    points: [
      "All question types A–Z",
      "Matching Headings in 3 minutes",
      "Time-management frameworks",
    ],
  },
  {
    icon: PenLine,
    name: "Writing",
    bnName: "রাইটিং",
    description:
      "From structure to sentence variety — Task 1 reports and Task 2 essays broken down into formulas you can actually reproduce.",
    points: [
      "Task 1 & Task 2 formulas",
      "Band 7+ vocabulary banks",
      "Personal feedback on every script",
    ],
  },
  {
    icon: MessagesSquare,
    name: "Speaking",
    bnName: "স্পিকিং",
    description:
      "Speak with confidence, not fear. Daily practice routines, cue-card frameworks and Band 9 answer modelling.",
    points: [
      "Part 1, 2 & 3 frameworks",
      "Band 5 vs Band 9 answer demos",
      "Fluency & pronunciation clinics",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Courses                                                            */
/* ------------------------------------------------------------------ */

export const COURSES: Course[] = [
  {
    slug: "ielts-full",
    title: "IELTS Full Course",
    subtitle: "The complete Band 7+ journey",
    description:
      "Our flagship program covering all four modules from foundation to test-day strategy — with personal feedback at every step.",
    image: "/images/course-ielts.png",
    duration: "3 months",
    classes: "36 classes + 6 mocks",
    price: "৳12,000",
    oldPrice: "৳15,000",
    badge: "Most Enrolled",
    popular: true,
    features: [
      "All 4 modules: Listening, Reading, Writing, Speaking",
      "Band 5 → 7+ structured roadmap",
      "6 full mock tests with answer sheets",
      "Writing & Speaking feedback on every attempt",
      "Vocabulary & grammar clinics every week",
      "Lifetime access to class recordings",
    ],
    outcomes: [
      "Complete test-format mastery",
      "Personal band-score improvement plan",
      "Test-day time management system",
    ],
  },
  {
    slug: "ielts-crash",
    title: "IELTS Crash Course",
    subtitle: "One month. Serious momentum.",
    description:
      "An intensive 30-day booster for test-takers with a deadline. Focused practice, strategy classes and rapid feedback loops.",
    image: "/images/course-crash.png",
    duration: "1 month",
    classes: "20 classes + 3 mocks",
    price: "৳6,500",
    oldPrice: "৳8,000",
    badge: "Fast Track",
    features: [
      "30-day module-by-module plan",
      "Daily practice targets & check-ins",
      "3 full mock tests with review",
      "Task 1 & Task 2 writing formulas",
      "Speaking cue-card sprint sessions",
      "Direct WhatsApp support",
    ],
    outcomes: [
      "Test-ready in 30 days",
      "Exam-strategy confidence",
      "Prioritised weak-area repair",
    ],
  },
  {
    slug: "spoken-english",
    title: "Spoken English Mastery",
    subtitle: "Speak without fear",
    description:
      "A practical speaking program built around real conversations — presentations, interviews, and everyday fluency.",
    image: "/images/course-spoken.png",
    duration: "2 months",
    classes: "24 classes + club",
    price: "৳5,500",
    features: [
      "Small-group speaking club twice a week",
      "Pronunciation & fluency labs",
      "Real-life conversation simulations",
      "Interview & presentation practice",
      "Fear-of-speaking breakthrough sessions",
      "Certificate on completion",
    ],
    outcomes: [
      "Confident daily conversation",
      "Neutral, clear pronunciation",
      "Interview-ready communication",
    ],
  },
  {
    slug: "foundation",
    title: "English Foundation",
    subtitle: "Grammar & vocabulary, fixed",
    description:
      "The base layer everything else stands on. Our famous Free Grammar Fix series, expanded into a complete foundation course.",
    image: "/images/course-foundation.png",
    duration: "2 months",
    classes: "22 classes + drills",
    price: "৳4,500",
    features: [
      "Grammar from zero to IELTS level",
      "500+ core vocabulary with spaced review",
      "Sentence-building daily drills",
      "Common Bangla-learner mistakes fixed",
      "Reading & listening practice packs",
      "Weekly progress tests",
    ],
    outcomes: [
      "Error-free core grammar",
      "A working 2,000-word vocabulary",
      "Ready for full IELTS preparation",
    ],
  },
  {
    slug: "mock-test",
    title: "Mock Test Package",
    subtitle: "Real exam. Real pressure.",
    description:
      "Full-length IELTS simulations under strict exam conditions, with detailed band-estimate feedback after every sitting.",
    image: "/images/course-mock.png",
    duration: "Flexible",
    classes: "10 mocks + reviews",
    price: "৳3,000",
    features: [
      "Full 4-module exam simulations",
      "Strict timing & exam-hall conditions",
      "Estimated band score after every mock",
      "Writing checked against band descriptors",
      "Face-to-face speaking mock interviews",
      "Improvement report card",
    ],
    outcomes: [
      "Know your real band level",
      "Exam-day anxiety eliminated",
      "Clear final-stretch focus areas",
    ],
  },
  {
    slug: "one-to-one",
    title: "1:1 Mentoring",
    subtitle: "A plan built only for you",
    description:
      "Private sessions with a senior instructor — a personal roadmap, unlimited doubt-solving and accountability check-ins.",
    image: "/images/teacher-1.png",
    duration: "Flexible",
    classes: "Custom schedule",
    price: "৳2,000/mo",
    badge: "Limited Seats",
    features: [
      "Personal band-score roadmap",
      "Weekly 1:1 strategy sessions",
      "Unlimited doubt clearing on WhatsApp",
      "Custom practice materials",
      "Accountability & progress tracking",
      "Study-plan adjustments anytime",
    ],
    outcomes: [
      "Zero confusion about what to study",
      "Faster weak-area improvement",
      "A mentor who knows your name",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Free lessons (real videos from the ICON English Center channel)    */
/* ------------------------------------------------------------------ */

export const LESSONS: Lesson[] = [
  {
    id: "NBAHzwuyxQ8",
    title: "IELTS 30 Days Booster Plan | Listening, Reading, Writing & Speaking",
    category: "Strategy",
    duration: "22:17",
  },
  {
    id: "jexQxGooH0I",
    title: "৩০ দিনের IELTS Band ৭+ Plan | পার্ট ১: বাস্তবতা ও মাইন্ডসেট",
    category: "Strategy",
    duration: "5:45",
  },
  {
    id: "eTwSgGuL9oQ",
    title: "IELTS Band 7+ in 30 Days | Module by Module Plan – Part 2 | Writing",
    category: "Writing",
    duration: "20:57",
  },
  {
    id: "8Q8lMlFqIXg",
    title: "30-Day IELTS Band 7+ Plan | Module by Module – Speaking | Part 3",
    category: "Speaking",
    duration: "13:47",
  },
  {
    id: "nD2H-yuUh8A",
    title: "Master IELTS Writing Task 2 in Just 7 Minutes",
    category: "Writing",
    duration: "8:32",
  },
  {
    id: "7cczgpzuFD4",
    title: "Master IELTS Writing Task 1 in just 7 minutes",
    category: "Writing",
    duration: "7:22",
  },
  {
    id: "t3vceePeru4",
    title: "IELTS Writing Task 1 লিখতে গিয়ে কোথা থেকে শুরু করবেন বুঝতে পারছেন না?",
    category: "Writing",
    duration: "17:09",
  },
  {
    id: "G7gmAWOVMpQ",
    title: "Worried about IELTS Writing Task 2?",
    category: "Writing",
    duration: "18:00",
  },
  {
    id: "Tz6eiK5xJls",
    title: "Practicing how to solve Section 2 of the IELTS Listening test?",
    category: "Listening",
    duration: "23:09",
  },
  {
    id: "oWmuzkz1HFE",
    title: "Struggling to solve Section 1 of IELTS Listening?",
    category: "Listening",
    duration: "19:51",
  },
  {
    id: "gnhR0Id5dz8",
    title: "IELTS Map Completion সহজে Solve করার Master Skills | Listening Tips",
    category: "Listening",
    duration: "21:43",
  },
  {
    id: "Y-Ofe59netE",
    title: "IELTS Reading A–Z: সব Question Type এক ক্লাসেই শিখুন!",
    category: "Reading",
    duration: "10:44",
  },
  {
    id: "bf4uvrYE3pk",
    title: "IELTS Matching Headings Under 3 Minutes!",
    category: "Reading",
    duration: "1:52",
  },
  {
    id: "gjILsvmFmSM",
    title: "Is it possible to get a Band 7+ in IELTS just by practicing?",
    category: "Strategy",
    duration: "4:08",
  },
  {
    id: "gDxgckVuuz0",
    title: "Struggling to know where to start with IELTS Writing Task 2?",
    category: "Writing",
    duration: "15:22",
  },
  {
    id: "TSnfzUvgpfw",
    title: "Band 5-এ আটকে আছো? এবার Target করো Band 8! | IELTS Crash Course",
    category: "Strategy",
    duration: "0:43",
  },
];

export const LESSON_CATEGORIES = [
  "All",
  "Strategy",
  "Listening",
  "Reading",
  "Writing",
  "Speaking",
] as const;

/* ------------------------------------------------------------------ */
/*  Testimonials & success                                             */
/* ------------------------------------------------------------------ */

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Demo Candidate A",
    role: "Demo Student · University Dept",
    avatar: "/images/avatar-1.png",
    from: "Band 5.5",
    to: "Band 7.5",
    quote:
      "I was stuck at Band 5.5 in Writing for two attempts. The Task 2 formula and personal feedback on every essay changed everything — I finally understood what the examiner wants.",
    course: "IELTS Full Course",
  },
  {
    name: "Demo Candidate B",
    role: "Demo Candidate · Chattogram Campus",
    avatar: "/images/avatar-2.png",
    from: "Band 6.0",
    to: "Band 8.0",
    quote:
      "The crash course is focused practice. 30 days of daily targets and mock tests under real pressure. My Reading went from 6 to 8.5 just from the time-management techniques.",
    course: "IELTS Crash Course",
  },
  {
    name: "Demo Candidate C",
    role: "Demo Applicant · Graduate Track",
    avatar: "/images/avatar-3.png",
    from: "Band 6.5",
    to: "Band 8.0",
    quote:
      "Speaking was my biggest hurdle. The speaking club and answer demos rewired how I respond. I scored 8.0 in Speaking in my first attempt.",
    course: "Spoken English Mastery",
  },
  {
    name: "Demo Candidate D",
    role: "Demo Engineer · Professional Track",
    avatar: "/images/avatar-4.png",
    from: "Band 5.0",
    to: "Band 7.0",
    quote:
      "Grammar was my weakest point. The demo grammar series pulled me in, and the foundation course rebuilt my basics. Everything clicked after that.",
    course: "English Foundation",
  },
];

export const FAQS = [
  {
    q: "Do you teach in Bangla or English?",
    a: "Classes are taught Bengali-first so every concept is crystal clear, while all practice materials, mock tests and feedback are in English — exactly like the real exam. This mix is why our students understand faster and score higher.",
  },
  {
    q: "I am stuck at Band 5–5.5. Can I really reach Band 7+?",
    a: "Yes — that is literally our specialty. Most of our students start between Band 5 and 6. We diagnose your exact weak points, give you a module-by-module roadmap, and track your progress with regular mocks. Consistent students typically gain 1.0–1.5 bands within a course.",
  },
  {
    q: "How do I know which course fits me?",
    a: "Take a free diagnostic mock test with us (online or at our center). Based on your estimated band and target date, our instructors will recommend the exact course and study plan — no guesswork, no overselling.",
  },
  {
    q: "Are the classes online or offline?",
    a: "Both. We run offline batches at our center and live online batches for students outside the city. Every offline class is also recorded, so you never miss anything even if you skip a day.",
  },
  {
    q: "What is included in the mock tests?",
    a: "Full 4-module simulations under strict exam timing, checked answer sheets, writing evaluated against the official band descriptors, a face-to-face speaking interview, and an estimated band score with an improvement report.",
  },
  {
    q: "Can I try a class before enrolling?",
    a: "Absolutely. Join a free demo class — either a live batch session or one of our free YouTube lessons. You can also message us on WhatsApp to book a free counseling call before deciding.",
  },
];

/* ------------------------------------------------------------------ */
/*  Why Demo Academy                                                   */
/* ------------------------------------------------------------------ */

export const WHY_ICON = [
  {
    title: "Taught in Bangla, tested in English",
    description:
      "Every strategy is explained in Bangla first, so nothing stays confusing. Then you practice exactly like the real exam — in English.",
  },
  {
    title: "Band 5 → 8 roadmap",
    description:
      "Our signature progression system has carried hundreds of students from stuck-at-5 to celebrating 7.5 and 8.0 results.",
  },
  {
    title: "Free lessons, every single day",
    description:
      "Daily tips, grammar fixes and full classes on YouTube & Facebook — quality education that costs nothing until you want more.",
  },
  {
    title: "Feedback on your work",
    description:
      "Essays checked against real band descriptors. Speaking recorded and reviewed. No blind practice, ever.",
  },
  {
    title: "Mocks under real pressure",
    description:
      "Strict timing, real answer sheets, exam-hall conditions — so the actual test day feels like just another Saturday.",
  },
  {
    title: "A community of 10,000+ demo learners",
    description:
      "Daily motivation, answer-sharing and doubt-solving in our dedicated IELTS preparation community.",
  },
] as const;

export const BAND_JOURNEY = [
  {
    band: "5.0",
    title: "Stuck & Confused",
    description: "Grammar gaps, fear of speaking, random practice with no plan.",
  },
  {
    band: "6.0",
    title: "Foundation Fixed",
    description: "Core grammar repaired, vocabulary growing, question types familiar.",
  },
  {
    band: "7.0",
    title: "Strategy Locked",
    description: "Time management mastered, answer accuracy consistent across modules.",
  },
  {
    band: "8.0",
    title: "Dream Achieved",
    description: "Confident, fluent, exam-ready — the score that opens doors abroad.",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

export function getYtThumb(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function getYtLink(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}
