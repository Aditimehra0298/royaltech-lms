"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { defaultHomePageConfig, type HomePageConfig, type ManagedCategory, type ManagedCourse } from "@/lib/content-schema";
import { canonicalCategorySlug } from "@/lib/category-page-resolve";
import type { TutorLedProgramStored } from "@/lib/default-tutor-led-programs";
import { catalogCourseLandingHref } from "@/lib/course-landing";
import { isIso22000TutorLedSlug, liveTutorCourseHref, TUTOR_LED_ISO_22000_CATALOG_HREF } from "@/lib/tutor-led-routes";
import { CoursePrice } from "@/components/CoursePrice";
import CourseCardActions from "@/components/CourseCardActions";
import CourseResolvedCardActions from "@/components/CourseResolvedCardActions";
import { CatalogMediaImage } from "@/components/CatalogMediaImage";
import { NewsletterSubscribeForm } from "@/components/NewsletterSubscribeForm";
import { categoryCatalogFallbackImage, resolveCourseImageSrc, resolveCourseListThumbnail } from "@/lib/course-thumbnail";
import TestimonialAvatar from "@/components/TestimonialAvatar";
import TestimonialCourseBadge from "@/components/TestimonialCourseBadge";
import {
  Play,
  Star,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Users,
  GraduationCap,
  ShieldCheck,
  Clock,
  Award,
  CheckCircle2,
  Sparkles,
  MonitorPlay,
  CircleHelp,
  Mail,
  MapPin,
} from "lucide-react";

const fallbackCategoryLabels = [
  "Artificial Intelligence",
  "Data Science",
  "Cloud Computing",
  "Software Development",
  "Cybersecurity",
  "Business & Innovation",
  "Digital Marketing",
  "Finance & FinTech",
  "Mobile Development",
  "Blockchain & Web3",
  "Project Management",
  "Graphic Design",
];

const fallbackCategoryCards = [
  {
    title: "Artificial Intelligence",
    desc: "Generative AI, machine learning, and practical AI tools for modern work.",
    icon: Award,
  },
  {
    title: "Data Science",
    desc: "Python, analytics, and portfolio projects for data careers.",
    icon: BookOpen,
  },
  {
    title: "Cloud Computing",
    desc: "AWS foundations, architecture patterns, and DevOps CI/CD skills.",
    icon: MonitorPlay,
  },
  {
    title: "Software Development",
    desc: "Full-stack web development, APIs, and engineering best practices.",
    icon: GraduationCap,
  },
  {
    title: "Cybersecurity",
    desc: "Threat awareness, defensive controls, and cloud security fundamentals.",
    icon: ShieldCheck,
  },
  {
    title: "Business & Innovation",
    desc: "Product strategy, digital innovation, and leadership for shipping ideas.",
    icon: Users,
  },
  {
    title: "Digital Marketing",
    desc: "SEO, ads, content funnels, and growth analytics for modern brands.",
    icon: Sparkles,
  },
  {
    title: "Finance & FinTech",
    desc: "Financial analysis and FinTech product skills for digital finance careers.",
    icon: Clock,
  },
  {
    title: "Mobile Development",
    desc: "Build iOS and Android apps with Flutter and Kotlin career paths.",
    icon: MonitorPlay,
  },
  {
    title: "Blockchain & Web3",
    desc: "Blockchain literacy and Solidity smart-contract skills for builders.",
    icon: Award,
  },
  {
    title: "Project Management",
    desc: "Agile, Scrum, and PMP-oriented essentials for delivery leaders.",
    icon: CheckCircle2,
  },
  {
    title: "Graphic Design",
    desc: "Brand identity and Figma skills for digital creatives.",
    icon: BookOpen,
  },
];

type LearningPathId = "self-paced" | "interactive" | "onsite" | "live";

const learningFormats: {
  id: LearningPathId;
  title: string;
  icon: typeof BookOpen;
  desc: string;
  keyPoints: string[];
  cta: string;
  imageSrc: string;
}[] = [
  {
    id: "self-paced",
    title: "Self-paced courses",
    icon: BookOpen,
    desc: "Start anytime. Finish on your schedule. Video lessons, quizzes, projects, and certificates — built like top learning marketplaces.",
    keyPoints: [
      "16+ career courses ready to enroll",
      "Progress tracking in My Learning",
      "Module quizzes + final assessments",
      "Hands-on projects for your portfolio",
      "Lifetime access after purchase",
      "Shareable completion certificates",
    ],
    cta: "Browse self-paced catalog",
    imageSrc:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "interactive",
    title: "Professional Certificates",
    icon: MonitorPlay,
    desc: "Structured multi-course paths for AI, cloud, data, and software — designed for measurable career outcomes.",
    keyPoints: [
      "Role-based skill paths",
      "Portfolio projects included",
      "Industry-aligned curriculum",
      "Certificate when you finish",
      "Optional live office hours",
      "Interview & career tips",
    ],
    cta: "View certificate paths",
    imageSrc:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "onsite",
    title: "Teams & enterprise",
    icon: MapPin,
    desc: "Upskill your workforce with seat plans, progress analytics, and one shared catalog for every team.",
    keyPoints: [
      "Royal Tech for Teams plans",
      "Seat management & invites",
      "Manager progress analytics",
      "Catalog access for employees",
      "Onboarding playbooks",
      "Dedicated support options",
    ],
    cta: "Explore team plans",
    imageSrc:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "live",
    title: "Live workshops",
    icon: Users,
    desc: "Join expert-led sessions for deep dives, demos, and career Q&A that keep your learning momentum high.",
    keyPoints: [
      "Live instructor sessions",
      "Interactive Q&A",
      "Recordings for enrolled learners",
      "Hands-on exercises",
      "Downloadable toolkits",
      "Certificate-eligible tracks",
    ],
    cta: "See upcoming workshops",
    imageSrc:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
  },
];

const careerHighlights = [
  {
    title: "16+ courses built for hiring outcomes",
    desc: "AI, prompt engineering, Python, SQL, AWS, Azure, React, cybersecurity, UX, and leadership — skills mapped to roles employers hire for.",
  },
  {
    title: "Coursera-style browse → enroll → certify",
    desc: "Compare course pages, see ratings and syllabus, enroll online, and track progress in My Learning.",
  },
  {
    title: "Certificates worth sharing",
    desc: "Finish projects and assessments to unlock credentials you can add to LinkedIn and resumes.",
  },
  {
    title: "Fresh visuals. Stronger content.",
    desc: "Every path and course card uses modern cover images and highlight-ready copy designed for a premium LMS marketplace.",
  },
];

const individualPlans = [
  {
    badge: "Most Popular · Royal Tech Plus Monthly",
    tagline: "Complete multiple courses and earn credentials fast",
    desc: "Unlimited access to our career catalog — AI, cloud, data, software, and innovation programs with shareable certificates.",
    price: "₹2,099 / month",
    note: "Cancel anytime",
    features: [
      "Browse and enroll in 100+ courses and Specializations",
      "Earn unlimited certificates after your trial ends",
      "Hands-on projects, labs, and job-ready skill paths",
      "Professional Certificate tracks from industry instructors",
    ],
    cta: "Start free trial",
  },
  {
    badge: "Royal Tech Plus Annual",
    tagline: "Save more with year-round learning access",
    desc: "Everything in monthly Plus, with annual savings for learners committed to long-term upskilling.",
    price: "₹13,999 / year",
    note: "14-day money-back guarantee",
    features: [
      "Everything included in the monthly plan",
      "Save when you pay upfront for the year",
      "Flexible pacing for work–life balance",
      "Continuous catalog access as new courses launch",
    ],
    cta: "Get Started",
  },
];

const organisationPlan = {
  title: "Royal Tech for Teams",
  tagline: "Upskill your workforce at scale",
  desc: "Give employees a Coursera-style learning hub with analytics, seat management, and courses built for modern digital teams.",
  price: "₹24,019.74 / year",
  note: "Per user for 12 months · 14-day money-back guarantee",
  features: [
    "Upskill up to 125 employees",
    "Unlimited access to the Royal Tech catalog",
    "Program setup and launch tools",
    "Analytics and benchmarking dashboard",
  ],
  cta: "Get Started for Teams",
};

const whyFeatures = [
  {
    title: "Expert Trainers",
    desc: "Learn from industry leaders with real-world experience across sectors.",
    icon: Users,
  },
  {
    title: "Quality Training Material",
    desc: "High-quality, up-to-date content designed for measurable outcomes.",
    icon: BookOpen,
  },
  {
    title: "Flexible Learning",
    desc: "Study at your own pace with schedules that fit working professionals.",
    icon: Clock,
  },
  {
    title: "Certification Upon Completion",
    desc: "Earn recognized certificates that support your career progression.",
    icon: Award,
  },
  {
    title: "Tutor-Led Sessions",
    desc: "Engage in tutor-led workshops, expert-led discussions, and real-time doubt-solving sessions.",
    icon: MonitorPlay,
  },
  {
    title: "Progress Tracking & Assessments",
    desc: "Monitor your learning journey with module-wise assessments, exams, and performance insights.",
    icon: CheckCircle2,
  },
];

const testimonials = [
  {
    quote:
      "The course pages feel like Coursera — clear syllabus, price, and enroll. I finished my first AI certificate in two weeks.",
    name: "Rohan Verma",
    role: "Product Analyst",
    courseBadge: "AI Essentials for Everyone",
    seed: "rohan-verma",
  },
  {
    quote:
      "Python for Data Science had projects I could put on my portfolio. I landed more interview calls within a month.",
    name: "Priya Rao",
    role: "Data Analyst",
    courseBadge: "Python for Data Science",
    seed: "priya-rao",
  },
  {
    quote:
      "Cloud foundations plus labs made AWS concepts click. The certificate helped my profile stand out.",
    name: "Aman Kumar",
    role: "Cloud Engineer",
    courseBadge: "Cloud Computing Foundations",
    seed: "aman-kumar",
  },
  {
    quote:
      "Full-stack path was structured and practical. Best LMS marketplace experience I’ve used as a working professional.",
    name: "Neha Sharma",
    role: "Software Developer",
    courseBadge: "Full-Stack Web Development",
    seed: "neha-sharma",
  },
  {
    quote:
      "Cybersecurity fundamentals was hands-on, not just theory. I applied the controls at work the same week.",
    name: "Vikram Singh",
    role: "IT Specialist",
    courseBadge: "Cybersecurity Fundamentals",
    seed: "vikram-singh",
  },
  {
    quote:
      "Royal Tech for Teams let our company upskill on one catalog with clear progress tracking.",
    name: "Sneha Iyer",
    role: "L&D Manager",
    courseBadge: "Product Innovation & Digital Strategy",
    seed: "sneha-iyer",
  },
];

const faqs = [
  {
    q: "What is Royal Tech Innovation LMS?",
    a: "Royal Tech Innovation LMS is a Coursera-style course marketplace. Browse 100+ career courses across 12 domains, enroll online, learn at your pace, complete projects, and earn shareable certificates — all in one platform.",
  },
  {
    q: "How do I enroll in a course?",
    a: "Open any course page, review the syllabus and price, then click Enroll or Add to cart. After checkout, the course unlocks instantly in My Learning so you can start watching lessons right away.",
  },
  {
    q: "Are courses self-paced or live?",
    a: "Most courses are fully self-paced with 24/7 access. Selected paths also include live workshops and office hours so you can ask instructors questions in real time.",
  },
  {
    q: "Will I get a certificate?",
    a: "Yes. When you complete required modules, quizzes, and assessments, you receive a shareable Royal Tech certificate you can add to LinkedIn, your resume, or your portfolio.",
  },
  {
    q: "What skills and domains can I learn?",
    a: "AI, Data Science, Cloud, Software Development, Cybersecurity, Business & Innovation, Digital Marketing, Finance & FinTech, Mobile Development, Blockchain & Web3, Project Management, and Graphic Design.",
  },
  {
    q: "What is Royal Tech Plus?",
    a: "Royal Tech Plus is our unlimited learning plan — monthly or annual. Get catalog-wide access, certificates after your trial, and new course drops as they launch. Cancel monthly anytime.",
  },
  {
    q: "Can my company train employees here?",
    a: "Yes. Royal Tech for Teams includes seat management, progress analytics, and shared catalog access so L&D leaders can upskill 10–125 employees on one platform.",
  },
  {
    q: "Do I need coding experience?",
    a: "Not for every course. AI Essentials, Digital Marketing, UI/UX, and many beginner paths need no coding. Data, ML, Full-Stack, and DevOps paths recommend basic programming comfort.",
  },
  {
    q: "How long do I keep access after purchase?",
    a: "Individual course purchases include lifetime access to the enrolled course content. Plus subscriptions stay active while your plan is billed.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We support secure online checkout for individual courses and subscription plans. Corporate invoices and team billing are available for Royal Tech for Teams.",
  },
  {
    q: "Is there a refund policy?",
    a: "Yes. Eligible plans include a money-back window (for example, 14 days on annual Plus). Refund terms depend on the product you purchased — see Refund Policy for full details.",
  },
  {
    q: "Can I learn from outside India?",
    a: "Absolutely. Royal Tech Innovation LMS is built for global learners — enroll online, learn from any device, and earn certificates from anywhere with internet access.",
  },
  {
    q: "Where do I track progress and certificates?",
    a: "Everything lives in My Learning — enrolled courses, module progress, assessments, live sessions, and certificates you can download or share.",
  },
  {
    q: "How do I get help if I’m stuck?",
    a: "Use Contact Us, email, or WhatsApp for support. Selected courses also include Q&A and live office hours. Visit /faq for the full help center.",
  },
  {
    q: "How many courses are available right now?",
    a: "Royal Tech Innovation LMS currently lists 100+ marketplace courses across 12 domains — AI, data, cloud, software, cybersecurity, marketing, FinTech, mobile, Web3, project management, design, and business innovation.",
  },
  {
    q: "Can I preview a course before buying?",
    a: "Yes. Each course page shows the syllabus overview, learning outcomes, duration, level, instructor, ratings, and pricing so you can decide before you enroll.",
  },
  {
    q: "What happens after I complete a course?",
    a: "Your progress is marked complete in My Learning, and when assessments are passed you can unlock your certificate to download or share.",
  },
  {
    q: "Can I switch from a single course to Royal Tech Plus later?",
    a: "Yes. Start with one course anytime, then upgrade to Royal Tech Plus monthly or annual whenever you want unlimited catalog access.",
  },
  {
    q: "Are live workshops recorded?",
    a: "Yes. For enrolled learners, recordings of eligible live sessions are typically available after the workshop so you can revise later.",
  },
  {
    q: "Do beginner courses include projects?",
    a: "Most beginner paths include guided exercises or mini projects. Intermediate and advanced courses usually include portfolio-ready projects.",
  },
  {
    q: "How do team seats work for companies?",
    a: "With Royal Tech for Teams, admins invite employees by seat, assign learning paths, and track completion analytics from one dashboard.",
  },
  {
    q: "Can I use Royal Tech on mobile?",
    a: "Yes. The LMS works on desktops, tablets, and mobile browsers so you can learn on the go.",
  },
  {
    q: "Do certificates expire?",
    a: "Completion certificates remain available in your account after you earn them. Keep a downloaded copy for your records and LinkedIn profile.",
  },
  {
    q: "What if a course is too advanced for me?",
    a: "Use the level filter (Beginner / Intermediate / Advanced) on course pages and domain catalogs. Many domains include an essentials course designed as a safe starting point.",
  },
  {
    q: "Is there student or career support?",
    a: "Yes. Contact support for enrollment help, and use My Learning resources, course Q&A, and selected live office hours for learning guidance.",
  },
  {
    q: "Can I gift a course to someone?",
    a: "Individual course purchases are tied to the enrolled learner account. For gifting or team access, contact support or use Royal Tech for Teams seat invites.",
  },
  {
    q: "How often are new courses added?",
    a: "New courses and Specializations are added regularly. Subscribe to the newsletter to get launch updates first.",
  },
  {
    q: "Do you offer assessments and quizzes?",
    a: "Yes. Most courses include module quizzes and end-of-course assessments to verify learning before certificate unlock.",
  },
  {
    q: "What languages are courses taught in?",
    a: "Primary course language is English. Captions or localized materials may be added on selected courses over time.",
  },
  {
    q: "How do I reset my password or recover my account?",
    a: "Use the account login recovery / reset password flow. If you still need help, contact support with your registered email.",
  },
];

const faqTopicPills = [
  "Enrollment",
  "Certificates",
  "Royal Tech Plus",
  "Teams",
  "Payments",
  "Learning access",
  "Mobile",
  "Assessments",
];

const exploreProgramImages = [
  "/p1.png",
  "/p2.png",
  "/p3.png",
  "/p4.jpg",
  "/p5.png",
  "/p6.png",
  "/p7.png",
  "/p8.png",
];

/** Real platform logos — “inspired by” marquee (right → left). */
const inspiredByPlatforms = [
  { name: "Coursera", logo: "/inspired/coursera.svg" },
  { name: "Udemy", logo: "/inspired/udemy.svg" },
  { name: "edX", logo: "/inspired/edx.svg" },
  { name: "LinkedIn Learning", logo: "/inspired/linkedin.svg" },
  { name: "Google Career Certificates", logo: "/inspired/google.svg" },
  { name: "Microsoft Learn", logo: "/inspired/microsoft.svg" },
  { name: "AWS Skill Builder", logo: "/inspired/amazonwebservices.svg" },
  { name: "IBM SkillsBuild", logo: "/inspired/ibm.svg" },
  { name: "Skillshare", logo: "/inspired/skillshare.svg" },
  { name: "Khan Academy", logo: "/inspired/khanacademy.svg" },
];
const HERO_VIDEO =
  "https://res.cloudinary.com/dwnnakrrh/video/upload/v1795178142/gemini_generated_video_59f7660c_mqchce.mp4";

const heroHighlights = [
  "16+ career courses live now",
  "AI · Data · Cloud · Software · Security",
  "Shareable certificates on completion",
  "Hands-on projects for your portfolio",
  "Learn anytime · Enroll in minutes",
];

const CATEGORY_ICON_FALLBACK = [
  ShieldCheck,
  MonitorPlay,
  Award,
  BookOpen,
  CheckCircle2,
  Users,
  GraduationCap,
  Clock,
] as const;

function iconForCategoryTitle(title: string) {
  const hit = fallbackCategoryCards.find((c) => c.title === title);
  if (hit) return hit.icon;
  let h = 0;
  for (let i = 0; i < title.length; i++) h = (h + title.charCodeAt(i)) % CATEGORY_ICON_FALLBACK.length;
  return CATEGORY_ICON_FALLBACK[h];
}

/** Empty until `/api/courses` or server initialData arrives — never seed demo catalog. */
function fallbackPublishedCatalog(): ManagedCourse[] {
  return [];
}

export type LearnlyLandingInitialData = {
  homeConfig?: HomePageConfig;
  categories?: ManagedCategory[];
  courses?: ManagedCourse[];
  tutorLedPrograms?: TutorLedProgramStored[];
};

export default function LearnlyLanding({ initialData }: { initialData?: LearnlyLandingInitialData }) {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  /** Default to self-paced so the course grid loads without an extra click (still switchable). */
  const [learningPath, setLearningPath] = useState<LearningPathId | null>("self-paced");
  const [catalogCourses, setCatalogCourses] = useState<ManagedCourse[]>(
    () => initialData?.courses ?? fallbackPublishedCatalog(),
  );
  const [tutorLedPrograms, setTutorLedPrograms] = useState<TutorLedProgramStored[]>(
    () => initialData?.tutorLedPrograms ?? [],
  );
  const [planAudience, setPlanAudience] = useState<"individual" | "organisation">("individual");
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [liveCategories, setLiveCategories] = useState<ManagedCategory[] | null>(
    initialData?.categories !== undefined ? initialData.categories : null,
  );
  const [homeConfig, setHomeConfig] = useState<HomePageConfig>(
    initialData?.homeConfig ?? defaultHomePageConfig,
  );
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const browseAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncTheme = () => {
      setIsLightTheme(document.documentElement.dataset.theme === "light");
    };
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (initialData?.homeConfig) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/site/home-page", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as {
          faqPage?: HomePageConfig["faqPage"];
          testimonialsPage?: HomePageConfig["testimonialsPage"];
          faqImage?: string;
          homeFaqs?: HomePageConfig["faqs"];
          testimonials?: HomePageConfig["testimonials"];
        };
        if (!cancelled) {
          setHomeConfig({
            ...defaultHomePageConfig,
            faqs: data.homeFaqs ?? [],
            faqImage: data.faqImage ?? defaultHomePageConfig.faqImage,
            faqPage: { ...defaultHomePageConfig.faqPage, ...data.faqPage },
            testimonials: data.testimonials ?? [],
            testimonialsPage: { ...defaultHomePageConfig.testimonialsPage, ...data.testimonialsPage },
          });
        }
      } catch { /* use defaults */ }
    })();
    return () => { cancelled = true; };
  }, [initialData?.homeConfig]);

  useEffect(() => {
    if (initialData?.categories !== undefined) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/categories", { cache: "no-store" });
        if (!res.ok) throw new Error("categories");
        const data = (await res.json()) as { categories?: ManagedCategory[] };
        if (!cancelled) setLiveCategories(data.categories ?? []);
      } catch {
        if (!cancelled) setLiveCategories([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [initialData?.categories]);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 20_000);
    (async () => {
      try {
        const res = await fetch("/api/courses", { cache: "no-store", signal: controller.signal });
        if (!res.ok) throw new Error("courses");
        const data = (await res.json()) as { courses?: ManagedCourse[] };
        if (!cancelled && Array.isArray(data.courses) && data.courses.length > 0) {
          setCatalogCourses(data.courses);
        }
      } catch {
        if (!cancelled && !initialData?.courses?.length) {
          setCatalogCourses(fallbackPublishedCatalog());
        }
      } finally {
        window.clearTimeout(timeoutId);
      }
    })();
    return () => {
      cancelled = true;
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [initialData?.courses]);

  useEffect(() => {
    if (initialData?.tutorLedPrograms) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/tutor-led/programs", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { programs?: TutorLedProgramStored[] };
        if (!cancelled && Array.isArray(data.programs) && data.programs.length > 0) {
          setTutorLedPrograms(data.programs);
        }
      } catch {
        /* keep defaults */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [initialData?.tutorLedPrograms]);

  useEffect(() => {
    if (liveCategories === null || activeCategory === "All") return;
    const titles = liveCategories.map((c) => c.title);
    if (!titles.includes(activeCategory)) setActiveCategory("All");
  }, [liveCategories, activeCategory]);

  useEffect(() => {
    const el = heroVideoRef.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    const play = () => {
      void el.play().catch(() => {});
    };
    play();
    el.addEventListener("loadeddata", play);
    return () => el.removeEventListener("loadeddata", play);
  }, [isLightTheme]);

  const goldGradient = "bg-gradient-to-b from-[#00b7fd] to-[#0070f0]";
  const goldText = isLightTheme ? "lh-gold-text text-[#3b82c4]" : "text-[#00b7fd]";
  const brandDark = "bg-[#0a0b0f]";
  const heroVideoSrc = homeConfig.hero.videoUrl?.trim() || HERO_VIDEO;

  const liveTestimonials = homeConfig.testimonials.map((t) => ({
    quote: t.quote,
    name: t.name,
    role: t.role,
    courseBadge: t.courseBadge,
    photo: t.photo,
    seed: t.name.toLowerCase().replace(/\s+/g, "-"),
  }));
  const liveFaqs = homeConfig.faqs;
  const liveIndividualPlans = homeConfig.individualPlans;
  const liveOrgPlan = homeConfig.orgPlan;
  const liveExploreProgramImages = homeConfig.exploreProgramImages.length > 0 ? homeConfig.exploreProgramImages : exploreProgramImages;
  const liveLearningFormats = learningFormats.map((item) => {
    const fromCms = (homeConfig.learningPaths ?? []).find((p) => p.id === item.id);
    const imageSrc = fromCms?.imageSrc?.trim();
    if (!imageSrc) return item;
    return {
      ...item,
      imageSrc,
      title: fromCms?.title?.trim() || item.title,
      desc: fromCms?.desc?.trim() || item.desc,
    };
  });
  const unlockImage = homeConfig.unlock?.image?.trim() || "/q.png";
  const unlockHeading = homeConfig.unlock?.heading?.trim();
  const unlockSubtitle = homeConfig.unlock?.subtitle?.trim();
  const unlockCta = homeConfig.unlock?.cta?.trim();

  const catalogForPills = (liveCategories ?? []).filter((c) => c.isActive);

  const filteredCatalog =
    activeCategory === "All"
      ? catalogForPills
      : catalogForPills.filter((c) => c.title === activeCategory);

  const activeCategorySlug = useMemo(() => {
    if (activeCategory === "All") return null;
    const hit = catalogForPills.find((c) => c.title === activeCategory);
    return hit?.slug ?? null;
  }, [activeCategory, catalogForPills]);

  const publishedTutorLedPrograms = useMemo(
    () => tutorLedPrograms.filter((p) => p.published),
    [tutorLedPrograms],
  );

  const tutorLedBrowseCards = useMemo(() => {
    return publishedTutorLedPrograms;
  }, [publishedTutorLedPrograms]);

  const tutorLedSlugSet = useMemo(
    () => new Set(publishedTutorLedPrograms.map((p) => p.slug)),
    [publishedTutorLedPrograms],
  );

  const isTutorLedBrowsePath =
    learningPath === "interactive" || learningPath === "live" || learningPath === "onsite";

  const filteredCoursesForPath = useMemo(() => {
    if (catalogCourses.length === 0) return [];
    if (!learningPath) return [];
    if (isTutorLedBrowsePath) return [];
    let list = catalogCourses.filter((c) => !c.learningFormat || c.learningFormat === "self-paced");
    if (!activeCategorySlug) return list;
    return list.filter(
      (c) => canonicalCategorySlug(c.category) === canonicalCategorySlug(activeCategorySlug),
    );
  }, [catalogCourses, activeCategorySlug, learningPath, isTutorLedBrowsePath]);

  const displayedCourses = useMemo(
    () => (showAllCourses ? filteredCoursesForPath : filteredCoursesForPath.slice(0, 24)),
    [filteredCoursesForPath, showAllCourses],
  );

  const sectionShell = "mx-auto max-w-[1760px] px-4 md:px-6 xl:px-8";
  const sectionTitle = "lh-section-title";
  const cardTitle = "lh-card-title";
  const mutedP = isLightTheme
    ? "text-base leading-relaxed text-slate-600 md:text-lg"
    : "text-base leading-relaxed text-slate-400 md:text-lg";

  return (
    <div
      className={`learnly-home min-h-screen ${
        isLightTheme
          ? "bg-[radial-gradient(circle_at_12%_8%,rgba(10,131,231,.22),transparent_34%),radial-gradient(circle_at_92%_10%,rgba(0,183,253,.14),transparent_34%),linear-gradient(180deg,#f3f4f7_0%,#e9ebf0_100%)] text-slate-800"
          : `${brandDark} bg-[radial-gradient(circle_at_20%_10%,rgba(10,131,231,.28),transparent_30%),radial-gradient(circle_at_90%_0%,rgba(0,180,240,.18),transparent_32%),#05070f] text-white`
      } font-sans selection:bg-amber-500 selection:text-black`}
    >
      <div className="pointer-events-none fixed top-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-amber-600/5 blur-[100px]" />
      {isLightTheme ? (
        <>
          <div className="pointer-events-none fixed left-[10%] top-[18%] h-48 w-48 rounded-full bg-amber-300/25 blur-3xl" />
          <div className="pointer-events-none fixed right-[8%] top-[30%] h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />
        </>
      ) : null}

      <main className="relative z-0">
        <div className="mx-auto flex max-w-[1760px] flex-col items-center gap-12 px-4 pb-20 pt-6 md:px-6 md:pt-8 lg:flex-row lg:items-start lg:gap-6 lg:pt-10 xl:gap-8 xl:px-8">
          <div className="w-full space-y-8 pt-2 text-center lg:max-w-none lg:shrink-0 lg:basis-[48%] lg:text-left xl:basis-[47%]">
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl">
              {homeConfig.hero.heading}
              <br />
              <span className={goldText}>{homeConfig.hero.headingHighlight}</span>
            </h1>

            <p className={`mx-auto max-w-lg ${mutedP} lg:mx-0`}>
              {homeConfig.hero.subtitle}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Link
                href="/courses"
                className={`flex items-center gap-2 rounded-xl px-6 py-3.5 font-bold text-white shadow-[0_8px_24px_rgba(0,183,253,.35)] transition-all hover:-translate-y-0.5 hover:brightness-110 ${goldGradient}`}
              >
                <GraduationCap size={18} />
                {homeConfig.hero.ctaPrimary}
              </Link>
              <button
                type="button"
                className={`lh-hero-secondary-btn flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 font-bold text-slate-200 transition-all hover:border-amber-500/40 hover:bg-amber-500/10`}
              >
                <Play size={18} fill="currentColor" className={isLightTheme ? "text-[#0070f0]" : undefined} />
                {homeConfig.hero.ctaSecondary}
              </button>
            </div>
          </div>

          <div className="group relative w-full min-h-0 min-w-0 lg:basis-[52%] xl:basis-[53%]">
            <div
              className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-amber-500/6 opacity-60 blur-[90px] transition-opacity duration-700 group-hover:opacity-90 md:-inset-10"
              aria-hidden
            />
            <div className="relative z-20 w-full">
              <div className="lh-hero-video-shell relative aspect-video w-full overflow-hidden rounded-2xl bg-black md:rounded-3xl">
                <video
                  key={heroVideoSrc}
                  ref={heroVideoRef}
                  className="lh-hero-video absolute inset-0 z-0 h-full w-full object-cover object-center"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  aria-label="Collaborative learning preview"
                >
                  <source src={heroVideoSrc} type="video/mp4" />
                </video>

                {/* Grid overlay — keeps full video visible, covers Veo corner */}
                <div
                  className="lh-hero-grid pointer-events-none absolute inset-0 z-[6]"
                  aria-hidden
                />

                <div className="pointer-events-none absolute left-3 top-3 z-20 flex flex-wrap gap-2 md:left-4 md:top-4">
                  <span className="lh-hero-tag inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-black/55 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-200 backdrop-blur-md">
                    <Sparkles size={11} className="text-amber-300" />
                    Live preview
                  </span>
                  <span className="lh-hero-tag inline-flex items-center rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/90 backdrop-blur-md">
                    Royal Tech LMS
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap items-end justify-between gap-2 md:bottom-4 md:left-4 md:right-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="lh-hero-tag inline-flex items-center gap-1.5 rounded-lg border border-amber-400/35 bg-black/60 px-2.5 py-1.5 text-[10px] font-semibold text-amber-100 backdrop-blur-md">
                      <GraduationCap size={12} className="text-amber-300" />
                      Expert-led
                    </span>
                    <span className="lh-hero-tag inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-black/60 px-2.5 py-1.5 text-[10px] font-semibold text-white/90 backdrop-blur-md">
                      <MonitorPlay size={12} className="text-amber-300" />
                      Practical learning
                    </span>
                  </div>

                  <div className="lh-hero-badge flex max-w-[min(100%,240px)] items-center gap-3 rounded-xl border border-amber-400/30 bg-black/70 px-3.5 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-xl md:max-w-[280px] md:gap-4 md:px-4 md:py-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0070f0] shadow-[0_0_24px_rgba(10,131,231,0.35)] md:h-11 md:w-11">
                      <Star fill={isLightTheme ? "#7c2d12" : "black"} size={20} className="md:h-[22px] md:w-[22px]" />
                    </div>
                    <div className="min-w-0">
                      <div className="lh-badge-label text-[9px] font-black uppercase tracking-[0.2em] text-amber-400/95 md:text-[10px]">
                        Trusted
                      </div>
                      <div className="lh-badge-title text-sm font-semibold leading-tight text-white md:text-base">
                        Accredited pathways
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1760px] px-4 pb-6 md:px-6 xl:px-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {(homeConfig.stats.length > 0 ? homeConfig.stats.map(s => `${s.value} ${s.label}`) : []).map((item) => (
              <div
                key={item}
                className="lh-stat-pill rounded-xl border border-amber-400/60 bg-amber-500/15 px-4 py-3 text-center text-sm font-semibold text-amber-100 shadow-[0_0_30px_rgba(10,131,231,0.25)]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Inspired by platforms — scrolling logos right → left */}
        <section className={`${sectionShell} border-t border-white/5 py-10 md:py-14`}>
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
            Inspired by these platforms
          </p>
          <h2 className={`${sectionTitle} mt-2 text-center`}>
            Built like the world&apos;s <span className={goldText}>top learning marketplaces</span>
          </h2>
          <div className="lh-inspired-marquee relative mt-10 overflow-hidden py-2">
            <div className="lh-inspired-track flex w-max flex-nowrap items-center gap-12 md:gap-16">
              {[...inspiredByPlatforms, ...inspiredByPlatforms].map((platform, index) => (
                <div
                  key={`${platform.name}-${index}`}
                  className="lh-inspired-logo flex shrink-0 items-center gap-3"
                >
                  <Image
                    unoptimized
                    src={platform.logo}
                    alt={`${platform.name} logo`}
                    width={40}
                    height={40}
                    className="h-9 w-9 object-contain opacity-90 md:h-11 md:w-11"
                  />
                  <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-slate-200/90 md:text-base">
                    {platform.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Courses */}
        <section className={`${sectionShell} border-t border-white/5 py-16 md:py-20`}>
          <h2 className={`${sectionTitle} text-center`}>
            Choose your path to{" "}
            <span className={goldText}>career-ready skills</span>
          </h2>
          <p className={`mx-auto mt-4 max-w-3xl text-center ${mutedP}`}>
            Pick <strong className="text-gray-200">Self-paced courses</strong>,{" "}
            <strong className="text-gray-200">Professional Certificates</strong>,{" "}
            <strong className="text-gray-200">Teams & enterprise</strong>, or{" "}
            <strong className="text-gray-200">Live workshops</strong> — then enroll in AI, data, cloud,
            software, cybersecurity, or innovation programs with new cover visuals and highlight-ready content.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {liveLearningFormats.map((item) => {
              const Icon = item.icon;
              const selected = learningPath === item.id;
              return (
                <div
                  key={item.id}
                  className={`lh-path-card group relative overflow-hidden rounded-2xl border bg-linear-to-b from-[#1c2230] via-[#141924] to-[#0a0d14] p-6 transition-all duration-300 hover:shadow-[0_0_55px_rgba(10,131,231,0.55)] ${
                    selected
                      ? "border-cyan-300/90 ring-2 ring-cyan-400/50"
                      : "border-slate-500/45 hover:border-cyan-300/70"
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100">
                    <div className="absolute -inset-x-8 -top-10 h-24 rotate-6 bg-linear-to-r from-transparent via-amber-300/40 to-transparent blur-xl" />
                    <div className="absolute inset-0 bg-radial-[circle_at_20%_15%] from-amber-400/25 via-transparent to-transparent" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="lh-icon-chip inline-flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/15 text-amber-300">
                      <Icon size={18} />
                    </span>
                    <h3 className={cardTitle}>{item.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400">{item.desc}</p>
                  <ul className="mt-4 space-y-2 text-sm text-gray-300">
                    {item.keyPoints.map((point) => (
                      <li key={point} className="flex items-center gap-2">
                        <span className="lh-bullet h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 overflow-hidden rounded-xl border border-amber-400/70 bg-amber-950/40 shadow-[0_0_30px_rgba(10,131,231,0.35)]">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      width={800}
                      height={450}
                      className="h-auto w-full object-cover"
                      unoptimized
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setLearningPath(item.id);
                      setTimeout(() => {
                        browseAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 80);
                    }}
                    className={`lh-gold-btn mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all hover:brightness-110 ${
                      selected ? `${goldGradient} text-white` : `border border-amber-500/40 text-amber-100 hover:bg-amber-500/10`
                    }`}
                  >
                    {item.cta} <ChevronRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-sm text-gray-200">
            <h2 className={`${sectionTitle} mb-4 text-center`}>
              How It <span className={goldText}>Works</span>
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  num: "01",
                  title: "Choose Your Learning Path",
                  text: "Pick Self-Paced / E-Learning, Tutor Led Trainings, Tutor Led Onsite Trainings Courses, or LIVE Workshops based on how you prefer to learn.",
                },
                {
                  num: "02",
                  title: "Complete Enrollment",
                  text: "Select your course, sign in, and complete checkout so your seat is confirmed and learning access is unlocked.",
                },
                {
                  num: "03",
                  title: "Learn Through Guided Activities and Exercises",
                  text: "Follow guided modules, tutor-led sessions, and activities—watch, read, participate, and apply concepts through exercises.",
                },
                {
                  num: "04",
                  title: "Get Certified & Move Ahead",
                  text: "Complete assessments, earn recognised certifications, and use your new skills in real projects and roles.",
                },
              ].map((step) => (
                <div key={step.num} className="space-y-2">
                  <div className="inline-flex items-baseline gap-2">
                    <span className="lh-step-num text-5xl font-black leading-none text-amber-300 drop-shadow-[0_0_20px_rgba(10,131,231,0.8)]">
                      {step.num}
                    </span>
                    <span className="lh-step-label text-xs font-semibold uppercase tracking-[0.22em] text-amber-200/85">
                      Step
                    </span>
                  </div>
                  <h4 className="text-base font-semibold text-white">{step.title}</h4>
                  <p className="text-[13px] leading-relaxed text-slate-200/90">{step.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div ref={browseAnchorRef} id="browse-programs" className="scroll-mt-24 pt-4">
            {learningPath === "interactive" ? (
              <p className="mx-auto mt-8 max-w-3xl rounded-xl border border-cyan-500/25 bg-cyan-500/10 px-4 py-3 text-center text-sm text-cyan-100/95">
                <strong>Interactive E-Learning:</strong> choose a course to follow the structured path—video lessons,
                uploaded resources, and question-based assessments unlock as you progress.
              </p>
            ) : null}
            {learningPath === "onsite" ? (
              <p className="mx-auto mt-8 max-w-3xl rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-center text-sm text-amber-100/95">
                <strong>Tutor Led Onsite Trainings:</strong> classroom programs delivered at your workplace or a
                scheduled venue. Browse categories below or open the{" "}
                <Link href="/courses" className="font-semibold underline underline-offset-2 hover:text-white">
                  Courses
                </Link>{" "}
                page to request an onsite batch.
              </p>
            ) : null}
            {learningPath === "live" ? (
              <p className="mx-auto mt-8 max-w-3xl rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-center text-sm text-amber-100/95">
                <strong>Live workshops</strong> run on a schedule. Browse categories below or open the{" "}
                <Link href="/courses" className="font-semibold underline underline-offset-2 hover:text-white">
                  Courses
                </Link>{" "}
                page for upcoming tutor-led sessions.
              </p>
            ) : null}
            {!learningPath ? (
              <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-gray-500">
                Select a learning path above to show the matching course catalog, or browse categories first.
              </p>
            ) : null}
          </div>

          <h2 className={`${sectionTitle} mt-12 text-center`}>
            Explore <span className={goldText}>Our Popular Courses</span>
          </h2>

          <div className="mt-8 flex flex-wrap justify-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className={`lh-filter-pill rounded-full px-4 py-2 text-sm font-bold transition-all md:px-5 ${
                activeCategory === "All"
                  ? `${goldGradient} text-white`
                  : "border border-white/10 bg-white/[0.04] text-gray-300 hover:border-amber-500/30 hover:text-amber-400"
              }`}
            >
              All
            </button>
            {catalogForPills.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setActiveCategory(cat.title)}
                className={`lh-filter-pill rounded-full px-4 py-2 text-sm font-bold transition-all md:px-5 ${
                  activeCategory === cat.title
                    ? `${goldGradient} text-white`
                    : "border border-white/10 bg-white/[0.04] text-gray-300 hover:border-amber-500/30 hover:text-amber-400"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredCatalog.length === 0 ? (
              <p className="col-span-full text-center text-sm text-gray-400">
                No categories match this filter. Choose &quot;All&quot; to see every category.
              </p>
            ) : (
              filteredCatalog.map((cat, index) => {
                const Icon = iconForCategoryTitle(cat.title);
                const desc = cat.description?.trim() || cat.subtitle?.trim() || "";
                const cardImage =
                  cat.image?.trim() ||
                  liveExploreProgramImages[index % liveExploreProgramImages.length];
                return (
                  <div
                    key={cat.slug}
                    className="lh-category-card flex flex-col rounded-2xl border border-amber-500/35 bg-linear-to-b from-[#1a1d24] via-[#12151c] to-[#0a0b0f] p-5 transition-all hover:border-amber-300/80 hover:shadow-[0_0_32px_rgba(10,131,231,0.3)]"
                  >
                    <div className="lh-icon-chip mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
                      <Icon size={24} />
                    </div>
                    <h3 className={cardTitle}>{cat.title}</h3>
                    {cat.subtitle ? (
                      <p className="mt-1 text-xs font-medium text-amber-200/80">{cat.subtitle}</p>
                    ) : null}
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-400">{desc}</p>
                    <div className="mt-4 overflow-hidden rounded-xl border border-amber-500/35 bg-black/30 p-1">
                      <Image
                        src={cardImage}
                        alt={`${cat.title} program`}
                        width={1200}
                        height={800}
                        unoptimized={cardImage.startsWith("http") || cardImage.startsWith("/uploads/")}
                        className="h-auto w-full object-contain"
                      />
                    </div>
                    <Link
                      href={`/courses/category/${cat.slug}`}
                      className={`mt-6 inline-flex items-center gap-1 text-sm font-bold ${goldText} hover:underline`}
                    >
                      View courses <ChevronRight size={16} />
                    </Link>
                  </div>
                );
              })
            )}
          </div>

          {(learningPath === "self-paced" ||
            learningPath === "interactive" ||
            learningPath === "onsite" ||
            learningPath === "live") && (
            <div className="mt-16 border-t border-white/10 pt-12">
              <h2 className={`${sectionTitle} flex items-center justify-center gap-2 text-center`}>
                <BookOpen className="lh-section-emoji shrink-0 text-amber-400" size={28} aria-hidden />
                Explore <span className={goldText}>Professional Learning Programs</span>
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-gray-500">
                Discover industry-focused courses designed to help you build practical skills
                through videos, study materials, assessments, and certification-based learning.
                Filter courses by category and access structured modules, tutor-led sessions, and
                examinations — all in one modern learning platform.
              </p>
              {isTutorLedBrowsePath && tutorLedBrowseCards.length > 0 ? (
                <div className="mt-8 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {tutorLedBrowseCards.map((program) => (
                    <article
                      key={program.slug}
                      className="lh-course-card flex h-full flex-col overflow-hidden rounded-2xl border border-cyan-500/35 bg-linear-to-b from-[#1c2230] via-[#12151c] to-[#0a0b0f]"
                    >
                      <Link
                        href={
                          isIso22000TutorLedSlug(program.slug)
                            ? TUTOR_LED_ISO_22000_CATALOG_HREF
                            : liveTutorCourseHref(program.slug)
                        }
                        className="block"
                      >
                        <div className="relative aspect-[16/10] bg-black/40">
                          <Image
                            src={program.heroSrc || "/h1.png"}
                            alt={program.title}
                            width={1200}
                            height={750}
                            unoptimized
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </Link>
                      <div className="flex flex-1 flex-col p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-cyan-200/90">
                          {learningPath === "onsite"
                            ? "Tutor-led · Onsite"
                            : learningPath === "live"
                              ? "Live workshop"
                              : "Tutor-led · Live on Zoom"}
                        </p>
                        <h5 className="mt-1 line-clamp-2 text-base font-bold leading-snug text-white">
                          {program.title}
                        </h5>
                        <CourseCardActions
                          descriptionHref={
                            isIso22000TutorLedSlug(program.slug)
                              ? TUTOR_LED_ISO_22000_CATALOG_HREF
                              : liveTutorCourseHref(program.slug)
                          }
                          priceInr={program.price}
                          className="px-0"
                        />
                      </div>
                    </article>
                  ))}
                </div>
              ) : filteredCoursesForPath.length === 0 ? (
                <p className="mt-8 text-center text-sm text-gray-500">
                  No published courses match this category yet. Try &quot;All&quot; or another category.
                </p>
              ) : (
                <>
                  <div className="mt-8 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {displayedCourses.map((course) => (
                      <article
                        key={course.slug}
                        className="lh-course-card flex h-full flex-col overflow-hidden rounded-2xl border border-amber-500/35 bg-linear-to-b from-[#1a1d24] via-[#12151c] to-[#0a0b0f] transition-all hover:border-amber-300/80 hover:shadow-[0_0_28px_rgba(10,131,231,0.24)]"
                      >
                        <Link
                          href={catalogCourseLandingHref(course.slug, tutorLedSlugSet, course.learningFormat)}
                          className="block"
                        >
                          <div className="relative aspect-[16/10] bg-black/40">
                            {(() => {
                              const categoryFallback = categoryCatalogFallbackImage(
                                course.category || "",
                              );
                              // Unique admin covers first; otherwise show the course's stored
                              // image (incl. stock) or a category photo — never a blank card.
                              const thumb =
                                resolveCourseListThumbnail(course) ||
                                resolveCourseImageSrc(course.image) ||
                                categoryFallback;
                              return (
                                <CatalogMediaImage
                                  storedSrc={thumb}
                                  extraFallback={categoryFallback}
                                  courseSlug={course.slug}
                                  alt={course.title}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, 25vw"
                                />
                              );
                            })()}
                          </div>
                        </Link>
                        <div className="flex flex-1 flex-col p-4">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-200/80">
                            Self-paced · {course.level} · {course.duration}
                          </p>
                          <h5 className="mt-1 line-clamp-2 text-base font-bold leading-snug text-white">
                            {course.title}
                          </h5>
                          <div className="mt-2 flex items-center gap-1 text-xs text-amber-200/90">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 lh-section-emoji" size={14} />
                            {course.rating}
                          </div>
                          <CourseResolvedCardActions
                            course={course}
                            descriptionHref={catalogCourseLandingHref(course.slug, tutorLedSlugSet, course.learningFormat)}
                            className="px-0"
                          />
                        </div>
                      </article>
                    ))}
                  </div>
                  {filteredCoursesForPath.length > 8 ? (
                    <div className="mt-6 flex justify-center">
                      <button
                        type="button"
                        onClick={() => setShowAllCourses((prev) => !prev)}
                        className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all hover:brightness-110 ${
                          showAllCourses
                            ? "border border-amber-500/50 text-amber-100 hover:bg-amber-500/10"
                            : `${goldGradient} text-white`
                        }`}
                      >
                        {showAllCourses ? "Show Less" : "View All"}
                      </button>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          )}
        </section>

        <section className={`${sectionShell} py-12 md:py-16`}>
          <div className="lh-invest-shell rounded-3xl border border-amber-400/60 bg-linear-to-br from-[#1c2028] via-[#141820] to-[#0a0b0f] p-6 shadow-[0_0_58px_rgba(10,131,231,.3)] md:p-8">
            <h2 className={`${sectionTitle} text-center`}>
              Invest in your <span className={goldText}>career</span>
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {careerHighlights.map((item) => (
                <article
                  key={item.title}
                  className="lh-invest-card rounded-2xl border border-amber-400/55 bg-linear-to-b from-[#1e232c] via-[#161a22] to-[#10131a] p-5 shadow-[0_0_34px_rgba(10,131,231,0.2)] transition-all hover:-translate-y-0.5 hover:border-amber-300/90 hover:shadow-[0_0_44px_rgba(10,131,231,0.35)]"
                >
                  <h3 className={`${cardTitle} text-amber-100`}>{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${sectionShell} border-t border-white/5 py-16 md:py-20`}>
          <h2 className={`${sectionTitle} text-center`}>
            Choose the Right <span className={goldText}>Plan</span> for You
          </h2>

          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-xl border border-white/10 bg-[#11172c] p-1">
              <button
                type="button"
                onClick={() => setPlanAudience("individual")}
                className={`rounded-lg px-5 py-2 text-sm font-bold transition-colors ${
                  planAudience === "individual" ? `${goldGradient} text-white` : "text-gray-300"
                }`}
              >
                Individual
              </button>
              <button
                type="button"
                onClick={() => setPlanAudience("organisation")}
                className={`rounded-lg px-5 py-2 text-sm font-bold transition-colors ${
                  planAudience === "organisation" ? `${goldGradient} text-white` : "text-gray-300"
                }`}
              >
                Organisation
              </button>
            </div>
          </div>

          {planAudience === "individual" ? (
            <>
              <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-2">
                {liveIndividualPlans.map((plan) => (
                  <article
                    key={plan.badge}
                    className="lh-plan-card flex h-full flex-col rounded-2xl border border-amber-500/40 bg-linear-to-b from-[#1a1d24] via-[#12151c] to-[#0a0b0f] p-6 shadow-[0_0_30px_rgba(10,131,231,0.2)] transition-all hover:-translate-y-0.5 hover:border-amber-300/75 hover:shadow-[0_0_42px_rgba(10,131,231,0.3)]"
                  >
                    <p className="text-sm font-semibold text-amber-300">{plan.badge}</p>
                    <p className="mt-1 text-sm text-gray-300">{plan.tagline}</p>
                    <p className="mt-4 text-sm leading-relaxed text-gray-400">{plan.desc}</p>
                    <CoursePrice label={plan.price} className="mt-5 block text-2xl font-bold text-white" />
                    {plan.note ? <p className="mt-1 text-xs text-amber-100/90">{plan.note}</p> : null}
                    <ul className="mt-5 space-y-2 text-sm text-gray-200">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className={`mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all hover:brightness-110 ${goldGradient}`}
                    >
                      {plan.cta} <ChevronRight size={16} />
                    </button>
                  </article>
                ))}
              </div>
              <div className="lh-help-card mx-auto mt-6 max-w-6xl rounded-2xl border border-amber-500/45 bg-linear-to-r from-amber-500/16 via-amber-400/10 to-amber-500/16 p-5">
                <div className="flex flex-col items-center gap-3 text-center">
                  <span className="lh-symbol-chip inline-flex h-10 w-10 items-center justify-center rounded-full border border-amber-300/70 bg-amber-400/20 text-amber-100 shadow-[0_0_20px_rgba(10,131,231,0.35)]">
                    <CircleHelp size={20} />
                  </span>
                  <p className="text-sm font-semibold text-amber-100 md:text-base">
                    Need help selecting the right Individual plan? Tell us your role, budget, and
                    learning goals — we will recommend the best fit for you.
                  </p>
                  <Link
                    href="#"
                    className={`mt-1 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all hover:brightness-110 ${goldGradient}`}
                  >
                    Contact Us <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="mx-auto mt-10 max-w-4xl">
              <article className="lh-plan-card flex h-full flex-col rounded-2xl border border-amber-500/40 bg-linear-to-b from-[#1a1d24] via-[#12151c] to-[#0a0b0f] p-6 shadow-[0_0_30px_rgba(10,131,231,0.2)] transition-all hover:-translate-y-0.5 hover:border-amber-300/75 hover:shadow-[0_0_42px_rgba(10,131,231,0.3)]">
                <p className="text-sm font-semibold text-amber-300">{liveOrgPlan?.title}</p>
                <p className="mt-1 text-sm text-gray-300">{liveOrgPlan?.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-gray-400">{liveOrgPlan?.desc}</p>
                <CoursePrice label={liveOrgPlan?.price ?? ""} className="mt-5 block text-2xl font-bold text-white" />
                <p className="mt-1 text-xs text-amber-100/90">{liveOrgPlan?.note}</p>
                <ul className="mt-5 space-y-2 text-sm text-gray-200">
                  {(liveOrgPlan?.features ?? []).map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all hover:brightness-110 ${goldGradient}`}
                >
                  {liveOrgPlan?.cta} <ChevronRight size={16} />
                </button>
              </article>
              <div className="lh-help-card mt-6 rounded-2xl border border-amber-500/45 bg-linear-to-r from-amber-500/16 via-amber-400/10 to-amber-500/16 p-5">
                <div className="flex flex-col items-center gap-3 text-center">
                  <span className="lh-symbol-chip inline-flex h-10 w-10 items-center justify-center rounded-full border border-amber-300/70 bg-amber-400/20 text-amber-100 shadow-[0_0_20px_rgba(10,131,231,0.35)]">
                    <CircleHelp size={20} />
                  </span>
                  <p className="text-sm font-semibold text-amber-100 md:text-base">
                    Need support choosing an Organisation plan? Share your team size, goals, and
                    required outcomes — we will help you set up the right enterprise learning path.
                  </p>
                  <Link
                    href="#"
                    className={`mt-1 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all hover:brightness-110 ${goldGradient}`}
                  >
                    Contact Sales <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Why Choose Us */}
        <section className={`${sectionShell} border-t border-white/5 py-16 md:py-20`}>
          <div className="mb-4 flex justify-center lg:justify-start">
            <span className="lh-premium-badge inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Sparkles size={14} />
              Why choose us?
            </span>
          </div>
          <h2 className={`${sectionTitle} text-center lg:text-left`}>
            Why Choose <span className={goldText}>Royal Tech Innovation LMS</span>?
          </h2>
          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <p className={mutedP}>
                We combine rigorous instructional design with flexible delivery—so teams and
                individuals gain skills that transfer directly to the workplace.
              </p>
              <div className="w-full overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
                  alt="Team collaborating in a professional workshop"
                  width={900}
                  height={675}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {whyFeatures.map(({ title, desc, icon: Icon }) => (
                <div
                  key={title}
                  className="lh-why-card rounded-2xl border border-amber-500/35 bg-linear-to-b from-[#1a1d24] via-[#12151c] to-[#0a0b0f] p-5 md:p-6 shadow-[0_0_24px_rgba(10,131,231,0.16)] transition-all hover:border-amber-300/70 hover:shadow-[0_0_32px_rgba(10,131,231,0.24)]"
                >
                  <div className="lh-icon-chip mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400">
                    <Icon size={20} />
                  </div>
                  <h3 className={cardTitle}>{title}</h3>
                  <p className="mt-2 text-sm text-gray-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {liveTestimonials.length > 0 ? (
        <section className={`${sectionShell} border-t border-white/5 py-16 md:py-20`}>
          <div className="mb-4 flex justify-center">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
              {homeConfig.testimonialsPage?.badge ?? "What Our Learners Say"}
            </span>
          </div>
          <h2 className={`${sectionTitle} text-center`}>
            {homeConfig.testimonialsPage?.title ?? "What Our Learners Say"}
          </h2>
          <p className={`mx-auto mt-4 max-w-3xl text-center ${mutedP}`}>
            {homeConfig.testimonialsPage?.subtitle ??
              "Real experiences from professionals who have advanced their skills with our training programs."}
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {liveTestimonials.map((t) => (
              <blockquote
                key={t.seed}
                className="lh-testimonial-card flex flex-col rounded-2xl border border-amber-500/35 bg-linear-to-b from-[#1a1d24] via-[#12151c] to-[#0a0b0f] p-6 shadow-[0_0_24px_rgba(10,131,231,0.16)] transition-all hover:border-amber-300/70 hover:shadow-[0_0_32px_rgba(10,131,231,0.24)]"
              >
                {t.courseBadge ? (
                  <TestimonialCourseBadge label={t.courseBadge} className="mb-4 self-start" />
                ) : null}
                <p className="flex-1 text-sm leading-relaxed text-gray-300">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                  <TestimonialAvatar testimonial={{ name: t.name, photo: "photo" in t ? t.photo : undefined }} size={44} />
                  <div>
                    <div className="font-bold text-white">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
        ) : null}

        {/* Mid CTA */}
        <section className={`${sectionShell} py-16 md:py-20`}>
          <div className="lh-unlock-shell rounded-3xl border border-slate-400/40 bg-linear-to-br from-cyan-500/20 via-[#1a2230] to-[#0a0d14] px-6 py-12 text-center shadow-[0_0_46px_rgba(10,131,231,.35)] md:px-12 md:py-16">
            <h2 className={`${sectionTitle} mx-auto max-w-3xl text-center`}>
              Start Your Learning Journey Today!
            </h2>
            <p className={`mx-auto mt-4 max-w-2xl ${mutedP}`}>
              Join thousands of learners building career-ready skills with Royal Tech Innovation
              Training—starting is simple.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                className={`rounded-full px-8 py-4 font-bold text-white shadow-lg transition-all hover:brightness-110 ${goldGradient}`}
              >
                Start Learning
              </button>
              <button
                type="button"
                className="rounded-full border border-amber-500/40 px-8 py-4 font-bold text-[#7ccfff] transition-all hover:bg-amber-500/5"
              >
                Explore Courses
              </button>
            </div>
          </div>
        </section>

        {liveFaqs.length > 0 ? (
        <section className={`${sectionShell} border-t border-white/5 py-16 md:py-20`}>
          <div className="text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/35 bg-cyan-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200">
              <CircleHelp size={13} />
              {homeConfig.faqPage?.badge ?? "HELP CENTER"}
            </p>
            <h2 className={`${sectionTitle} mt-4`}>
              {homeConfig.faqPage?.title ?? (
                <>
                  Answers that help you <span className={goldText}>enroll with confidence</span>
                </>
              )}
            </h2>
            <p className={`mx-auto mt-4 max-w-2xl ${mutedP}`}>
              {homeConfig.faqPage?.subtitle ??
                "Everything about browsing, buying, learning, certificates, Plus plans, and teams — clear answers before you start."}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {faqTopicPills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-slate-500/40 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div className="space-y-3">
              {(showAllFaqs ? liveFaqs : liveFaqs.slice(0, 10)).map((item, index) => {
                const open = openFaq === item.q;
                return (
                  <div
                    key={item.q}
                    className={`lh-faq-card overflow-hidden rounded-2xl border transition-all ${
                      open
                        ? "border-cyan-400/50 bg-linear-to-b from-[#1c2738] via-[#151c28] to-[#0a0d14] shadow-[0_0_28px_rgba(0,183,253,0.18)]"
                        : "border-slate-500/35 bg-linear-to-b from-[#1c2230] via-[#141924] to-[#0a0d14] hover:border-cyan-400/40"
                    }`}
                  >
                    <button
                      type="button"
                      className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
                      onClick={() => setOpenFaq(open ? null : item.q)}
                      aria-expanded={open}
                    >
                      <span className="flex min-w-0 items-start gap-3">
                        <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-500/15 text-xs font-bold text-cyan-300">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[15px] font-bold leading-snug text-white md:text-base">
                          {item.q}
                        </span>
                      </span>
                      <ChevronDown
                        size={18}
                        className={`mt-1 shrink-0 text-cyan-400 transition-transform ${open ? "rotate-180" : ""}`}
                      />
                    </button>
                    {open ? (
                      <div className="border-t border-cyan-400/15 px-5 pb-5 pl-[3.75rem] text-sm leading-relaxed text-slate-300">
                        {item.a}
                      </div>
                    ) : null}
                  </div>
                );
              })}

              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                {liveFaqs.length > 10 ? (
                  <button
                    type="button"
                    onClick={() => setShowAllFaqs((prev) => !prev)}
                    className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all hover:brightness-110 ${
                      showAllFaqs
                        ? "border border-cyan-400/45 text-cyan-100 hover:bg-cyan-500/10"
                        : `${goldGradient} text-white`
                    }`}
                  >
                    {showAllFaqs ? "Show less" : `View all ${liveFaqs.length} FAQs`}
                  </button>
                ) : null}
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-1 rounded-full border border-slate-500/45 px-5 py-2.5 text-sm font-bold text-slate-200 transition hover:border-cyan-400/50 hover:text-cyan-200"
                >
                  Open help center
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            <aside className="lh-faq-aside space-y-4">
              <div className="overflow-hidden rounded-2xl border border-slate-500/35 bg-linear-to-b from-[#1c2230] to-[#0a0d14]">
                <Image
                  src={
                    homeConfig.faqImage?.trim() ||
                    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                  }
                  alt="Learners getting support on Royal Tech Innovation LMS"
                  width={640}
                  height={480}
                  className="h-48 w-full object-cover md:h-56"
                  unoptimized
                />
                <div className="space-y-3 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">Still need help?</p>
                  <h3 className="text-lg font-bold text-white">Talk to learner support</h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    Questions about enrollment, certificates, Plus, or Teams? We&apos;re here to help you choose the right path.
                  </p>
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/contact"
                      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white ${goldGradient}`}
                    >
                      Contact support
                    </Link>
                    <Link
                      href="/courses"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-500/45 px-4 py-2.5 text-sm font-bold text-slate-200 hover:border-cyan-400/50"
                    >
                      Browse courses
                    </Link>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 p-4">
                <p className="text-sm font-semibold text-cyan-100">Pro tip</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">
                  New to the platform? Start with a beginner course, finish one certificate, then unlock more with Royal Tech Plus.
                </p>
              </div>
            </aside>
          </div>
        </section>
        ) : null}

        {/* Newsletter */}
        <section className={`${sectionShell} py-10 md:py-12`}>
          <div className="lh-newsletter-shell rounded-2xl border border-amber-500/35 bg-linear-to-r from-[#1a1d24] via-[#12151c] to-[#0a0b0f] p-5 shadow-[0_0_32px_rgba(10,131,231,0.18)] md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <span className="lh-symbol-chip mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-amber-400/60 bg-amber-500/15 text-amber-200">
                  <Mail size={18} />
                </span>
                <div>
                  <h3 className={cardTitle}>
                    {homeConfig.newsletter?.heading ?? "Subscribe to Our Newsletter"}
                  </h3>
                  <p className="mt-1 text-sm text-gray-300">
                    {homeConfig.newsletter?.subtitle ??
                      "Enter your email to receive course launches, workshop dates, and training updates."}
                  </p>
                </div>
              </div>
              <NewsletterSubscribeForm
                pagePath="/"
                emailLabel="Your email"
                emailPlaceholder="Enter your email address"
                buttonText={homeConfig.newsletter?.buttonText ?? "Subscribe"}
                className="flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:items-end"
                inputClassName="lh-newsletter-input w-full rounded-full border border-amber-500/40 bg-black/35 px-4 py-2.5 text-sm text-white outline-none placeholder:text-gray-500 focus:border-amber-300/80"
                buttonClassName={`rounded-full px-6 py-2.5 text-sm font-bold text-white transition-all hover:brightness-110 ${goldGradient}`}
              />
            </div>
          </div>
        </section>

        {/* Footer CTA strip */}
        <section className="lh-unlock-strip border-t border-slate-500/25 bg-linear-to-r from-[#12161e] via-[#0a0d14] to-[#12161e] py-16 md:py-20">
          <div className={sectionShell}>
            <div className="lh-unlock-grid overflow-hidden rounded-3xl border border-slate-500/35 bg-linear-to-br from-[#1c2230] via-[#141924] to-[#0a0d14] p-6 shadow-[0_0_44px_rgba(10,131,231,0.2)] md:p-8">
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div className="lh-unlock-image-shell relative overflow-hidden rounded-2xl border border-slate-400/40 bg-black/35">
                  <Image
                    src={unlockImage}
                    alt="Unlock potential visual"
                    width={1024}
                    height={576}
                    className="h-auto w-full object-cover"
                    unoptimized
                  />
                </div>
                <div className="text-center lg:text-left">
                  <h2 className={`${sectionTitle} text-center lg:text-left`}>
                    {unlockHeading ? (
                      <>{unlockHeading}</>
                    ) : (
                      <>
                        Unlock Potential, <span className={goldText}>Achieve Success</span>
                      </>
                    )}
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-300 md:text-base">
                    {unlockSubtitle ||
                      "Build future-ready capabilities through industry-aligned learning, expert-led training, and practical pathways designed for real career outcomes."}
                  </p>
                  <button
                    type="button"
                    className={`mt-8 rounded-full px-10 py-4 font-bold text-white shadow-lg transition-all hover:brightness-110 ${goldGradient}`}
                  >
                    {unlockCta || "Get Started"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
