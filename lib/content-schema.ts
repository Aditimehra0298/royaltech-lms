import { type TutorLedProgramStored } from "./default-tutor-led-programs";
import {
  defaultOrganizationTeamAdminConfig,
  type OrganizationTeamAdminConfig,
} from "./organization-team-config";
import type { ManagedCourseCertificateConfig } from "@/lib/certificate-program-config";
import type { CommunityConnectCard } from "./my-learning-community-defaults";

export type { TutorLedProgramStored };
export type { ManagedCourseCertificateConfig };

export type LearningCourseStatus = "In Progress" | "Completed" | "Not Started";

export type LearningCourseItem = {
  title: string;
  modules: number;
  duration: string;
  completed: number;
  status: LearningCourseStatus;
  action: string;
};

/** Admin-managed reminders on the learner dashboard / calendar. */
export type DashboardCalendarReminder = {
  id: string;
  /** YYYY-MM-DD */
  date: string;
  title: string;
  body?: string;
  href?: string;
  published?: boolean;
};

export type DashboardContent = {
  nextClassTitle: string;
  nextClassTime: string;
  streakDays: number;
  /** Shown on all learners' My Learning calendar (notifications + day labels). */
  calendarReminders?: DashboardCalendarReminder[];
  /** Connect With Us cards on My Learning → Community tab. */
  communityConnect?: CommunityConnectCard[];
};

/** Self-paced catalog vs other delivery modes (admin Courses tab manages self-paced only). */
export type CourseLearningFormat = "self-paced" | "interactive" | "live";

/** Rows inside each module — matches the Food Safety diploma course-content UI (video / reading / exam). */
export type CourseCurriculumKind = "video" | "reading" | "exam";
export type CourseCurriculumItem = {
  label: string;
  kind: CourseCurriculumKind;
  /** Optional lesson notes shown in admin lesson editor; omitted in legacy rows. */
  description?: string;
  /** Optional runtime in minutes (helps module duration and exam unlock gating). */
  lessonDurationMinutes?: number;
  /** Auto-detected uploaded video size in MB (rounded to 1 decimal). */
  lessonVideoSizeMb?: number;
  /** Admin-defined preview watch limit for learners in minutes. */
  previewLimitMinutes?: number;
  /** Lesson-specific "About this lesson/module" text shown under video in learner UI. */
  about?: string;
  /** Per-lesson outcomes (shown as bullets/chips in learner UI). */
  learningOutcomes?: string[];
  /** Per-lesson helper links/content buckets for learner tools panel. */
  notes?: string;
  captions?: string;
  pdfUrl?: string;
  /** Lesson PPT/slide deck URL (ppt/pptx) for the learner tools panel. */
  pptUrl?: string;
  podcastUrl?: string;
  /** Optional additional resource URL or uploaded file for learners. */
  webhookUrl?: string;
  resourceUrl?: string;
  downloadUrl?: string;
  /** Uploaded lesson video file or direct video URL for video rows. */
  videoUrl?: string;
  /** When kind is `exam`: optional timed attempt with duration in minutes. */
  timedExam?: boolean;
  examDurationMinutes?: number;
  /** Optional learner-facing exam paper / instructions (PDF etc.), uploaded in admin. */
  examUploadUrl?: string;
  /** Minimum percentage of correct answers required to pass this exam (e.g. 70). */
  examPassingScorePercent?: number;
};

/** Optional grouping under a module; module-level `items` still supported for backward compatibility. */
export type CourseCurriculumSubModule = {
  title: string;
  items: CourseCurriculumItem[];
};

export type CourseCurriculumModule = {
  title: string;
  /** One-line “about this module” shown on the course landing curriculum. */
  description?: string;
  items: CourseCurriculumItem[];
  subModules?: CourseCurriculumSubModule[];
};

/** Course-wide final examination (separate from per-module quiz rows in `curriculum`). */
export type CourseFinalExam = {
  title?: string;
  timedExam?: boolean;
  examDurationMinutes?: number;
  examUploadUrl?: string;
  /** Minimum percentage correct to pass (e.g. 70). */
  passingScorePercent?: number;
};

/** Editable hero + enroll card on `/courses/[slug]` (self-paced landing). */
export type ManagedCourseHeroSection = {
  /** Full-bleed hero background (falls back to course image). */
  backgroundImage?: string;
  /** Enroll card video thumbnail (falls back to course image). */
  previewImage?: string;
  previewLabel?: string;
  /** Shown as “(1,245 ratings)” — numbers only or full phrase. */
  ratingCount?: string;
  /** e.g. “23,455 students enrolled” (falls back to learners field). */
  studentsLabel?: string;
  lastUpdated?: string;
  language?: string;
  captions?: string;
  lectureCount?: string;
  projects?: string;
  certificate?: string;
  access?: string;
  shareable?: string;
  moneyBackGuarantee?: string;
  enrollButtonLabel?: string;
  wishlistButtonLabel?: string;
  /** Sidebar certificate thumbnail (e.g. /certificates/haccp-certificate-preview.jpg). */
  certificatePreviewImage?: string;
  certificatePreviewLabel?: string;
  /** Long “About this course” paragraph (hero / overview). */
  aboutText?: string;
  /** Sidebar “This course includes” — one line per item. */
  courseIncludes?: string[];
};

/** Instructor tab on self-paced landing (`/courses/[slug]` → Instructor). */
export type ManagedCourseInstructorSection = {
  headline?: string;
  introParagraphs?: string[];
  teamImage?: string;
  teamLabel?: string;
  pillars?: { title: string; description: string }[];
  expertise?: { title: string; subtitle?: string; tone?: string }[];
  trustQuote?: string;
  trustBadge?: string;
  sidebarInstructors?: { name: string; role: string; accent?: string }[];
};

/** Overview tab — before payment (`/courses/[slug]`). */
export type ManagedCourseOverviewSection = {
  aboutTitle?: string;
  youWillLearnTitle?: string;
  learnOutcomes?: string[];
  whatYouLearnTitle?: string;
  whatYouLearn?: { title: string; description: string }[];
  requirementsTitle?: string;
  requirements?: string[];
  faqSectionTitle?: string;
};

/** Course-wide materials shown in My Learning → Learning Tools (all modules). */
export type ManagedCourseLearningTools = {
  eWorkbookUrl?: string;
  transcriptUrl?: string;
  pptUrl?: string;
  podcastUrl?: string;
  webhookUrl?: string;
};

/** My Learning course player — after payment (`/my-learning/course/[slug]`). */
export type ManagedCourseLearningSection = {
  brandLogoUrl?: string;
  certifiedBadgeLabel?: string;
  accreditedBadgeLabel?: string;
  accreditedDescription?: string;
  certificationRuleText?: string;
  noVideoMessage?: string;
  learningToolsTitle?: string;
  learningToolsHint?: string;
  /** Shared tools for the whole course (not per lesson). */
  courseTools?: ManagedCourseLearningTools;
  bookmarkLabel?: string;
  markCompleteLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
  notesTabLabel?: string;
  resourcesTabLabel?: string;
  saveNoteLabel?: string;
  resourcesEmptyMessage?: string;
  defaultLessonAbout?: string;
  defaultLessonDescription?: string;
  defaultLearningOutcomes?: string[];
  progressLabel?: string;
  quickToolsTitle?: string;
};

/** Reviews tab copy — before payment. */
export type ManagedCourseReviewsSectionConfig = {
  sectionTitle?: string;
  learnersLoveTitle?: string;
  highlyRatedItems?: string[];
  writeReviewTitle?: string;
  writeReviewSubtitle?: string;
  needHelpTitle?: string;
  needHelpText?: string;
  contactSupportLabel?: string;
};

/** Q&A tab copy — before payment. */
export type ManagedCourseQASectionConfig = {
  title?: string;
  subtitle?: string;
  askButtonLabel?: string;
  searchPlaceholder?: string;
  guidelinesTitle?: string;
  guidelines?: string[];
  needHelpTitle?: string;
  needHelpText?: string;
  contactSupportLabel?: string;
};

/** Landing page tab labels — before payment. */
export type ManagedCourseTabLabels = {
  overview?: string;
  curriculum?: string;
  instructor?: string;
  reviews?: string;
  qa?: string;
};

/** Per-country sale + list price — overrides global `price` / `oldPrice` for that region. */
export type CourseRegionalPriceRow = {
  countryCode: string;
  /** Standard / sale price. */
  price: string;
  /** Rack / list price (strikethrough). */
  oldPrice?: string;
  /** Internal floor for coupons / discounts. */
  basePrice?: string;
};

/** Organisation team purchase — price per country + employee seat band (admin Pricing tab). */
export type OrganizationSeatBandId = "1-10" | "11-20" | "21-30" | "31-40" | "41-50" | "51+";

export type OrganizationSeatBandPriceRow = {
  countryCode: string;
  bandId: OrganizationSeatBandId;
  price: string;
  oldPrice?: string;
};

export type ManagedCourse = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  level: string;
  duration: string;
  rating: string;
  learners: string;
  price: string;
  oldPrice: string;
  /** Internal floor (Admin → Pricing “Base Price”). Coupons should not go below this. */
  basePrice?: string;
  /** Country-specific sale + list prices (ISO 3166-1 alpha-2). Falls back to global prices. */
  regionalPrices?: CourseRegionalPriceRow[];
  /** Organisation team pricing by region + seat band (individual `regionalPrices` unchanged). */
  organizationSeatPricing?: OrganizationSeatBandPriceRow[];
  image: string;
  published: boolean;
  /** Defaults to self-paced when omitted (legacy rows). */
  learningFormat?: CourseLearningFormat;
  /** Primary instructor — filter curriculum editor & optional marketing copy. */
  instructorName?: string;
  /** When present, public `/courses/[slug]` Course content tab uses this instead of templates. */
  curriculum?: CourseCurriculumModule[];
  /** Final certification exam metadata for learners (upload, timer, passing score). */
  finalExam?: CourseFinalExam;
  /** Hero + right-side enroll card — edit in Admin → Self-paced courses → Course Info. */
  hero?: ManagedCourseHeroSection;
  /** Public `/courses/[slug]` marketing — optional; sensible defaults are generated when omitted. */
  pageBadge?: string;
  /** Bullet list on the course detail page (self-paced layout). */
  highlights?: string[];
  /** FAQ entries for the course detail page. */
  faqs?: { q: string; a: string }[];
  trainerRole?: string;
  trainerExperience?: string;
  trainerBio?: string;
  trainerCertifications?: string[];
  trainerWorkedWith?: string[];
  /** Instructor tab layout — experts, pillars, sidebar grid (Admin → Self-paced courses). */
  instructorSection?: ManagedCourseInstructorSection;
  /** Overview tab — headings, outcomes, requirements (before payment). */
  overviewSection?: ManagedCourseOverviewSection;
  /** Reviews tab — titles and sidebar copy (before payment). */
  reviewsSection?: ManagedCourseReviewsSectionConfig;
  /** Q&A tab — titles, guidelines, support copy (before payment). */
  qaSection?: ManagedCourseQASectionConfig;
  /** Tab navigation labels on public landing (before payment). */
  tabLabels?: ManagedCourseTabLabels;
  /** My Learning player — logos, labels, defaults (after payment). */
  learningSection?: ManagedCourseLearningSection;
  /** Per-course certificate, badge, transcript samples + workflow flags. */
  certificateConfig?: ManagedCourseCertificateConfig;
  /** Catalog visibility, enrollment, learner features (Admin → Settings). */
  settings?: ManagedCourseSettings;
  /** Search & social sharing (Admin → SEO). */
  seo?: ManagedCourseSeo;
};

/** Learner-facing course options — edited under Admin → Settings. */
export type ManagedCourseSettings = {
  /** Show on /courses and home grids (still requires Published). Default true. */
  showInCatalog?: boolean;
  /** Allow new enrollments / add to cart. Default true. */
  enrollmentOpen?: boolean;
  /** Show Q&A tab on course landing. Default true. */
  allowQa?: boolean;
  /** Highlight on marketing sections. */
  featured?: boolean;
  /** e.g. Lifetime, 12 months — shown in hero if hero.access empty. */
  accessLabel?: string;
};

/** Google / social metadata — edited under Admin → SEO. */
export type ManagedCourseSeo = {
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  ogImage?: string;
  /** Hide from search engines when true. */
  noIndex?: boolean;
};

export type CategoryTone = "violet" | "blue" | "emerald" | "amber";

export type ManagedCategory = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  isActive: boolean;
  isFeatured: boolean;
  isUppercase: boolean;
  isBold: boolean;
  tone: CategoryTone;
  /** Card / listing image on home & explore (URL or /uploads/...). */
  image?: string;
};

export type CategoryWhyTone = "amber" | "emerald" | "blue" | "violet";

export type CategoryPageInstructor = {
  name: string;
  role: string;
  years: string;
  photo: string;
};

export type CategoryPageWhyItem = {
  label: string;
  desc: string;
  tone: CategoryWhyTone;
  /** Lucide icon export name, e.g. `ShieldCheck`, `GraduationCap`, or legacy `award` / `scroll-text`. */
  icon: string;
  /** Short quote or tagline shown under the description on the category page */
  quote?: string;
};

export type CategoryPageLevelFilter = {
  value: string;
  label: string;
};

/** Admin overrides for `/courses/category/[slug]` (courses visibility, copy, filters, instructors). */
export type CategoryPageEditorConfig = {
  /** Hero background image URL or site path (e.g. /uploads/admin/...). Empty in saved JSON means “use built‑in default for slug”. */
  heroImage: string;
  /** When non-empty, replaces hero paragraph under the title */
  heroSubtitle: string;
  hiddenCourseSlugs: string[];
  instructors: CategoryPageInstructor[];
  levelFilters: CategoryPageLevelFilter[];
  whyLearn: CategoryPageWhyItem[];
};

export type CoursesPageHero = {
  badgeText: string;
  title: string;
  highlightWord: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  backgroundImage: string;
};

export type CoursesPageTutorLed = {
  date: string;
  title: string;
  time: string;
};

export type CoursesPageRecentUpdate = {
  title: string;
  subtitle: string;
  href: string;
  image: string;
};

export type CoursesPageUpcoming = {
  title: string;
  time: string;
  iconColor: "rose" | "sky" | "violet" | "emerald" | "amber" | "blue";
};

export type CoursesPageExpert = {
  name: string;
  photo: string;
};

export type CoursesPageFaq = {
  question: string;
  /** Shown on /faq and courses page when set. */
  answer?: string;
};

export type CoursesPageCta = {
  heading: string;
  description: string;
  buttonText: string;
  image: string;
};

export type CoursesPageConfig = {
  hero: CoursesPageHero;
  tutorLed: CoursesPageTutorLed[];
  recentUpdates: CoursesPageRecentUpdate[];
  upcomingItems: CoursesPageUpcoming[];
  featuredDescription: string;
  featuredExperts: CoursesPageExpert[];
  faqs: CoursesPageFaq[];
  cta: CoursesPageCta;
  coursesPerRow: number;
  defaultVisibleCourses: number;
};

export const defaultCoursesPageConfig: CoursesPageConfig = {
  hero: {
    badgeText: "MOST POPULAR",
    title: "Explore {highlight} courses",
    highlightWord: "career-ready",
    subtitle: "Browse Royal Tech Innovation’s Coursera-style catalog — AI, cloud, data, software, cybersecurity, and business innovation.",
    ctaPrimary: "Browse catalog",
    ctaSecondary: "Join for free",
    backgroundImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
  },
  tutorLed: [
    { date: "JUN 02", title: "Live: Generative AI for Work", time: "10:00 AM - 11:30 AM" },
    { date: "JUN 05", title: "Cloud Architecture Office Hours", time: "02:00 PM - 03:30 PM" },
    { date: "JUN 08", title: "Data Science Career Q&A", time: "11:00 AM - 12:30 PM" },
  ],
  recentUpdates: [
    { title: "New: AI Essentials for Everyone", subtitle: "Featured Course", href: "/courses/google-ai-essentials", image: "/p1.png" },
    { title: "Python for Data Science — open enrollment", subtitle: "Career Path", href: "/courses/python-for-data-science", image: "/p2.png" },
    { title: "AWS Cloud Foundations now live", subtitle: "Cloud Path", href: "/courses/aws-cloud-practitioner", image: "/p3.png" },
  ],
  upcomingItems: [
    { title: "Live Workshop: Prompt Engineering", time: "10:00 AM - 12:00 PM", iconColor: "rose" },
    { title: "New Course Launch: Full-Stack Web", time: "Open now", iconColor: "sky" },
    { title: "Webinar: Careers in AI & Cloud", time: "11:00 AM - 12:30 PM", iconColor: "violet" },
  ],
  featuredDescription: "Discover Specializations and Professional Certificate-style courses built like Coursera — clear syllabi, enroll buttons, hands-on projects, and certificates that help you get hired.",
  featuredExperts: [
    { name: "Amit Verma", photo: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Sneha Patel", photo: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Rahul Sharma", photo: "https://randomuser.me/api/portraits/men/52.jpg" },
    { name: "Priya Nair", photo: "https://randomuser.me/api/portraits/women/68.jpg" },
  ],
  faqs: [
    {
      question: "Are these courses industry-recognized?",
      answer:
        "Yes. Our programs align with industry standards and many include accreditation or certification from recognized bodies.",
    },
    {
      question: "Can I switch my learning plan anytime?",
      answer:
        "Individual plans can be changed or cancelled according to your subscription terms. Contact support for team plans.",
    },
    {
      question: "Do I get certificates after course completion?",
      answer:
        "Eligible courses issue digital certificates after you complete required modules and assessments.",
    },
  ],
  cta: {
    heading: "Ready to Start Your Learning Journey?",
    description: "Choose a path, build practical capabilities, and earn credentials that matter.",
    buttonText: "Get Started Now",
    image: "/Untitled (Label).png",
  },
  coursesPerRow: 5,
  defaultVisibleCourses: 5,
};

/* ─── Tutor-led catalog landing (`/tutor-led`) ─── */

export type TutorLedCatalogTheme = "emerald" | "sky" | "violet" | "gold";

export type TutorLedCatalogHeroChip = {
  icon: string;
  label: string;
};

export type TutorLedCatalogHero = {
  eyebrow: string;
  heading: string;
  headingHighlight: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  chips: TutorLedCatalogHeroChip[];
  asideQuote: string;
  certCardTitle: string;
  certCardSubtitle: string;
  certCardQuote: string;
  certCardAttribution: string;
  backgroundImage: string;
  backgroundAlt: string;
};

export type TutorLedCatalogProgramCard = {
  id: string;
  title: string;
  tagline: string;
  bullets: string[];
  price: number;
  popular?: boolean;
  theme: TutorLedCatalogTheme;
  /** Lucide export name, e. g. ShieldCheck */
  icon: string;
  /** Optional card thumbnail (shown above title when set). */
  thumbnail: string;
  /** Prefer linking enroll to this published tutor-led slug when set. */
  enrollSlug: string;
  /** Fallback title/slug match when enrollSlug is empty (e.g. basic|foundation). */
  matchPattern: string;
  durationLabel: string;
  modeLabel: string;
  certificateLabel: string;
};

export type TutorLedCatalogWhyItem = {
  icon: string;
  title: string;
  desc: string;
};

export type TutorLedCatalogAudienceItem = {
  icon: string;
  label: string;
};

export type TutorLedCatalogBatchRow = {
  date: string;
  time: string;
  programId: string;
  programLabel: string;
  seats: number;
};

export type TutorLedCatalogPageConfig = {
  /** Optional OG / share thumbnail for the catalog page. */
  pageThumbnail: string;
  hero: TutorLedCatalogHero;
  programsSection: {
    title: string;
    subtitle: string;
  };
  programs: TutorLedCatalogProgramCard[];
  why: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    items: TutorLedCatalogWhyItem[];
  };
  audience: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: TutorLedCatalogAudienceItem[];
    investTitle: string;
    investBody: string;
    investImage: string;
    investImageAlt: string;
  };
  batches: {
    eyebrow: string;
    viewAllLabel: string;
    viewAllHref: string;
    rows: TutorLedCatalogBatchRow[];
  };
  trainer: {
    eyebrow: string;
    viewAllLabel: string;
    viewAllHref: string;
    name: string;
    role: string;
    experience: string;
    bio: string;
    photo: string;
    photoAlt: string;
  };
  faqsSection: {
    eyebrow: string;
    viewAllLabel: string;
    viewAllHref: string;
  };
  faqs: { q: string; a: string }[];
  cta: {
    heading: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
};

export const defaultTutorLedCatalogPageConfig: TutorLedCatalogPageConfig = {
  pageThumbnail: "/p1.png",
  hero: {
    eyebrow: "Career Certificates · AI · Job-Ready Skills",
    heading: "AI Professional",
    headingHighlight: "Certificate",
    subtitle:
      "A Coursera-style Professional Certificate path — learn generative AI, build portfolio projects, and earn a shareable credential for career growth.",
    ctaText: "Explore AI courses",
    ctaHref: "/courses/category/artificial-intelligence",
    chips: [
      { icon: "Video", label: "Self-paced + live options" },
      { icon: "Mic2", label: "Industry instructors" },
      { icon: "ClipboardCheck", label: "Hands-on projects" },
      { icon: "Award", label: "Shareable certificate" },
    ],
    asideQuote: "Learn without limits. Build skills that get you hired.",
    certCardTitle: "Get Certified",
    certCardSubtitle: "Build Your Career. Make an Impact.",
    certCardQuote: "“AI literacy is the new professional advantage.”",
    certCardAttribution: "— Royal Tech Innovation LMS",
    backgroundImage: "/p1.png",
    backgroundAlt: "Learner studying AI and technology online",
  },
  programsSection: {
    title: "Choose Your AI Learning Path",
    subtitle:
      "Coursera-style Professional Certificate tracks — from AI essentials to machine learning projects that build your portfolio.",
  },
  programs: [
    {
      id: "basic",
      title: "AI Essentials",
      tagline: "Beginner · No coding required",
      bullets: [
        "Generative AI concepts",
        "Prompting for workplace tasks",
        "Safe and responsible AI use",
        "Certificate of completion included",
      ],
      price: 4999,
      theme: "emerald",
      icon: "Sparkles",
      thumbnail: "/p1.png",
      enrollSlug: "google-ai-essentials",
      matchPattern: "ai\\s*essentials|basic|foundation",
      durationLabel: "Duration: Self-paced",
      modeLabel: "Mode: Online",
      certificateLabel: "Certificate Included",
    },
    {
      id: "implementation",
      title: "Machine Learning Specialization",
      tagline: "Intermediate · Projects included",
      bullets: [
        "Supervised learning foundations",
        "Model evaluation and tuning",
        "Neural network basics",
        "Capstone project for your portfolio",
      ],
      price: 8999,
      theme: "sky",
      icon: "Cpu",
      thumbnail: "/p8.png",
      enrollSlug: "machine-learning-specialization",
      matchPattern: "machine\\s*learning|ml",
      durationLabel: "Duration: Self-paced",
      modeLabel: "Mode: Online",
      certificateLabel: "Certificate Included",
    },
    {
      id: "internal-auditor",
      title: "Python for Data Science",
      tagline: "Data career starter",
      bullets: [
        "Python fundamentals for data work",
        "Pandas and visualization",
        "Portfolio mini projects",
        "Shareable certificate",
      ],
      price: 5999,
      theme: "violet",
      icon: "BarChart3",
      thumbnail: "/p2.png",
      enrollSlug: "python-for-data-science",
      matchPattern: "python|data\\s*science",
      durationLabel: "Duration: Self-paced",
      modeLabel: "Mode: Online",
      certificateLabel: "Certificate Included",
    },
    {
      id: "lead-auditor",
      title: "Cloud + AI Path",
      tagline: "Most popular combo",
      bullets: [
        "Cloud Computing Foundations (AWS)",
        "AI Essentials for Everyone",
        "Hands-on labs and quizzes",
        "Dual skill certificate pathway",
      ],
      price: 11999,
      popular: true,
      theme: "gold",
      icon: "Trophy",
      thumbnail: "/p3.png",
      enrollSlug: "aws-cloud-practitioner",
      matchPattern: "cloud|aws",
      durationLabel: "Duration: Self-paced",
      modeLabel: "Mode: Online",
      certificateLabel: "Certificate Included",
    },
  ],
  why: {
    eyebrow: "Why Learn With Us",
    titleLine1: "More Than Just Videos",
    titleLine2: "A Career-Ready Path",
    items: [
      {
        icon: "Video",
        title: "Marketplace course pages",
        desc: "Browse, compare, and enroll like on Coursera.",
      },
      {
        icon: "Mic2",
        title: "Expert instructors",
        desc: "Learn from industry practitioners.",
      },
      {
        icon: "ClipboardCheck",
        title: "Hands-on projects",
        desc: "Build portfolio work employers notice.",
      },
      {
        icon: "Award",
        title: "Shareable certificates",
        desc: "Add credentials to LinkedIn and resumes.",
      },
      {
        icon: "Headphones",
        title: "Learner support",
        desc: "Help when you need it during your path.",
      },
    ],
  },
  audience: {
    eyebrow: "Who Should Enroll",
    title: "Built for modern learners",
    subtitle: "Our Coursera-style programs are ideal for:",
    items: [
      { icon: "Briefcase", label: "Working professionals" },
      { icon: "GraduationCap", label: "Students & graduates" },
      { icon: "Users", label: "Career switchers" },
      { icon: "Building2", label: "Teams & businesses" },
      { icon: "Sparkles", label: "Product & AI enthusiasts" },
      { icon: "BookOpen", label: "Anyone upskilling in tech" },
    ],
    investTitle: "Invest in Skills.\nInvest in Your Next Role.",
    investBody:
      "Join thousands of learners building AI, cloud, data, and software skills on Royal Tech Innovation LMS.",
    investImage: "/q.png",
    investImageAlt: "Learner advancing a tech career online",
  },
  batches: {
    eyebrow: "Upcoming Live Sessions",
    viewAllLabel: "View All Courses →",
    viewAllHref: "/courses",
    rows: [
      {
        date: "02 Jun 2026",
        time: "10:00 AM – 11:30 AM",
        programId: "basic",
        programLabel: "AI Essentials Live",
        seats: 40,
      },
      {
        date: "05 Jun 2026",
        time: "02:00 PM – 03:30 PM",
        programId: "lead-auditor",
        programLabel: "Cloud Office Hours",
        seats: 35,
      },
      {
        date: "08 Jun 2026",
        time: "11:00 AM – 12:30 PM",
        programId: "internal-auditor",
        programLabel: "Data Career Q&A",
        seats: 45,
      },
      {
        date: "12 Jun 2026",
        time: "10:00 AM – 12:00 PM",
        programId: "implementation",
        programLabel: "ML Project Clinic",
        seats: 30,
      },
    ],
  },
  trainer: {
    eyebrow: "Meet Our Expert Instructor",
    viewAllLabel: "View All Instructors →",
    viewAllHref: "/about",
    name: "Dr. Ananya Mehta",
    role: "AI & Learning Lead",
    experience: "12+ Years Experience",
    bio: "Industry educator specializing in generative AI adoption and practical machine learning for professionals. Ananya designs Coursera-style career paths that combine theory, labs, and shareable certificates.",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    photoAlt: "Dr. Ananya Mehta",
  },
  faqsSection: {
    eyebrow: "Frequently Asked Questions",
    viewAllLabel: "View All FAQs →",
    viewAllHref: "/faq",
  },
  faqs: [
    {
      q: "Is this like Coursera Professional Certificates?",
      a: "Yes — browse categories, enroll online, learn at your pace, complete projects, and earn a shareable certificate on Royal Tech Innovation LMS.",
    },
    {
      q: "Are the courses self-paced or live?",
      a: "Most courses are self-paced with optional live workshops and office hours for enrolled learners.",
    },
    {
      q: "Will I get a certificate?",
      a: "Yes. On successful completion you receive a verifiable certificate from Royal Tech Innovation.",
    },
    {
      q: "Who should join these programs?",
      a: "Working professionals, students, career switchers, and teams upskilling in AI, cloud, data, and software.",
    },
    {
      q: "Do I need coding experience?",
      a: "AI Essentials needs none. Data and ML paths work best with basic Python comfort.",
    },
    {
      q: "Can my company enroll a team?",
      a: "Yes. Royal Tech for Teams includes seat plans, analytics, and catalog access for organizations.",
    },
  ],
  cta: {
    heading: "Take the Next Step in Your Tech Career",
    description:
      "Choose a course today and start building job-ready AI, cloud, and data skills.",
    buttonText: "Browse All Courses",
    buttonHref: "/courses",
  },
};

export function mergeTutorLedCatalogPageConfig(
  raw?: Partial<TutorLedCatalogPageConfig> | null,
): TutorLedCatalogPageConfig {
  const d = defaultTutorLedCatalogPageConfig;
  if (!raw || typeof raw !== "object") return structuredClone(d);
  const programs = Array.isArray(raw.programs) ? raw.programs : d.programs;
  const enrollById: Record<string, string> = {
    basic: "google-ai-essentials",
    implementation: "machine-learning-specialization",
    "internal-auditor": "python-for-data-science",
    "lead-auditor": "aws-cloud-practitioner",
  };
  return {
    ...d,
    ...raw,
    pageThumbnail: typeof raw.pageThumbnail === "string" ? raw.pageThumbnail : d.pageThumbnail,
    hero: { ...d.hero, ...(raw.hero ?? {}), chips: Array.isArray(raw.hero?.chips) ? raw.hero!.chips : d.hero.chips },
    programsSection: { ...d.programsSection, ...(raw.programsSection ?? {}) },
    programs: programs.map((p, i) => {
      const def = d.programs.find((row) => row.id === p.id) ?? d.programs[i];
      return {
        ...def,
        ...p,
        enrollSlug: p.enrollSlug?.trim() || enrollById[p.id] || def?.enrollSlug || "",
        thumbnail:
          (typeof p.thumbnail === "string" && p.thumbnail.trim()) ||
          def?.thumbnail ||
          d.pageThumbnail,
      };
    }),
    why: {
      ...d.why,
      ...(raw.why ?? {}),
      items: Array.isArray(raw.why?.items) ? raw.why!.items : d.why.items,
    },
    audience: {
      ...d.audience,
      ...(raw.audience ?? {}),
      items: Array.isArray(raw.audience?.items) ? raw.audience!.items : d.audience.items,
    },
    batches: {
      ...d.batches,
      ...(raw.batches ?? {}),
      rows: Array.isArray(raw.batches?.rows) ? raw.batches!.rows : d.batches.rows,
    },
    trainer: { ...d.trainer, ...(raw.trainer ?? {}) },
    faqsSection: { ...d.faqsSection, ...(raw.faqsSection ?? {}) },
    faqs: Array.isArray(raw.faqs) ? raw.faqs : d.faqs,
    cta: { ...d.cta, ...(raw.cta ?? {}) },
  };
}

/** One designed public catalog landing (ISO 22000-style) — many of these can exist. */
export type TutorLedCatalogLandingStored = {
  slug: string;
  /** Explore category this thumbnail appears under (e.g. food-safety). */
  category: string;
  published: boolean;
  /** Title on the category thumbnail card. */
  cardTitle: string;
  page: TutorLedCatalogPageConfig;
};

export function defaultIso22000CatalogLanding(): TutorLedCatalogLandingStored {
  return {
    slug: "ai-professional-certificate",
    category: "artificial-intelligence",
    published: true,
    cardTitle: "AI Professional Certificate",
    page: structuredClone(defaultTutorLedCatalogPageConfig),
  };
}

/* ─── Home Page Config Types ─── */

export type HomePageHero = {
  heading: string;
  headingHighlight: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  videoUrl: string;
};

export type HomePageStat = {
  value: string;
  label: string;
};

export type HomePageLearningPath = {
  id: string;
  title: string;
  desc: string;
  keyPoints: string[];
  cta: string;
  imageSrc: string;
};

export type HomePageWhyFeature = {
  title: string;
  desc: string;
  icon: string;
};

export type HomePageTestimonial = {
  quote: string;
  name: string;
  role: string;
  /** Short course/program name shown as a credibility badge on the card. */
  courseBadge?: string;
  /** Client / learner photo URL (shown on home, /testimonials). */
  photo?: string;
};

export type HomePagePlan = {
  badge: string;
  tagline: string;
  desc: string;
  price: string;
  note: string;
  features: string[];
  cta: string;
};

export type HomePageOrgPlan = {
  title: string;
  tagline: string;
  desc: string;
  price: string;
  note: string;
  features: string[];
  cta: string;
};

export type HomePageFaq = {
  q: string;
  a: string;
};

export type HomePageSectionMeta = {
  badge: string;
  title: string;
  subtitle: string;
};

export type HomePageNewsletter = {
  heading: string;
  subtitle: string;
  buttonText: string;
};

export type HomePageUnlock = {
  heading: string;
  subtitle: string;
  cta: string;
  image: string;
};

export type HomePageConfig = {
  hero: HomePageHero;
  stats: HomePageStat[];
  learningPaths: HomePageLearningPath[];
  whyFeatures: HomePageWhyFeature[];
  testimonials: HomePageTestimonial[];
  individualPlans: HomePagePlan[];
  orgPlan: HomePageOrgPlan;
  faqs: HomePageFaq[];
  newsletter: HomePageNewsletter;
  unlock: HomePageUnlock;
  accreditationLogos: string[];
  exploreProgramImages: string[];
  /** Avatar shown beside the home page FAQ accordion. */
  faqImage: string;
  /** Dedicated /faq page copy (also used on contact page FAQ block). */
  faqPage: HomePageSectionMeta;
  /** Dedicated /testimonials page copy (home page section uses same testimonial list). */
  testimonialsPage: HomePageSectionMeta;
};

export const defaultHomePageConfig: HomePageConfig = {
  hero: {
    heading: "Learn without limits",
    headingHighlight: "Build skills that get you hired",
    subtitle: "Royal Tech Innovation LMS is a Coursera-style course marketplace. Browse in-demand programs in AI, cloud, data, software, and digital innovation — enroll online, learn at your pace, and earn shareable certificates.",
    ctaPrimary: "Explore courses",
    ctaSecondary: "Join for free",
    videoUrl: "https://res.cloudinary.com/dwnnakrrh/video/upload/v1795178142/gemini_generated_video_59f7660c_mqchce.mp4",
  },
  stats: [
    { value: "4.8★", label: "Average course rating" },
    { value: "120+", label: "Career-ready courses" },
    { value: "80+", label: "Industry instructors" },
    { value: "25K+", label: "Learners enrolled" },
    { value: "24/7", label: "Flexible access" },
  ],
  learningPaths: [
    {
      id: "self-paced",
      title: "Self-Paced / E-Learning",
      desc: "Learn anytime, anywhere with flexible online courses designed for independent learning and skill development at your own pace.",
      keyPoints: [
        "24/7 access to videos, modules & learning resources",
        "Open courses anytime and continue from where you left off",
        "Watch lessons, read study materials & complete activities",
        "Module-wise quizzes and final assessments",
        "Progress tracking across all learning modules",
        "Downloadable resources and completion certificates",
      ],
      cta: "Browse self-paced catalog",
      imageSrc: "/c1.png",
    },
    {
      id: "interactive",
      title: "Tutor Led Trainings",
      desc: "Interactive expert-led sessions designed to deliver real-world learning through live classes, guided instruction, and practical discussions.",
      keyPoints: [
        "Live Zoom training sessions with industry experts",
        "Real-time doubt solving & interactive Q&A",
        "Structured learning pathway with guided modules",
        "Session recordings, study materials & assignments",
        "Practical workshops, case studies & assessments",
        "Certification upon successful completion",
      ],
      cta: "Choose interactive track",
      imageSrc: "/c2.png",
    },
    {
      id: "onsite",
      title: "Tutor Led Onsite Trainings Courses",
      desc: "Classroom and onsite instructor-led programs delivered at your workplace or a training venue, with hands-on practice and guided group learning.",
      keyPoints: [
        "Face-to-face training with certified industry trainers",
        "Onsite delivery at your organization or a scheduled venue",
        "Hands-on exercises, group discussions & case studies",
        "Printed and digital study materials for each session",
        "In-class assessments and practical evaluations",
        "Certification upon successful completion",
      ],
      cta: "View onsite trainings",
      imageSrc: "/c4.png",
    },
    {
      id: "live",
      title: "LIVE Workshops",
      desc: "Participate in immersive expert-led workshops designed to provide practical industry experience through live Zoom sessions, interactive discussions, and hands-on learning.",
      keyPoints: [
        "Live instructor-led Zoom workshops",
        "Real-world case studies & practical demonstrations",
        "Interactive Q&A and doubt-solving sessions",
        "Hands-on activities and guided exercises",
        "Workshop recordings & downloadable resources",
        "Industry-focused learning with expert mentorship",
      ],
      cta: "View tutor-led sessions",
      imageSrc: "/c3.png",
    },
  ],
  whyFeatures: [
    { title: "Expert Trainers", desc: "Learn from industry leaders with real-world experience across sectors.", icon: "Users" },
    { title: "Quality Training Material", desc: "High-quality, up-to-date content designed for measurable outcomes.", icon: "BookOpen" },
    { title: "Flexible Learning", desc: "Study at your own pace with schedules that fit working professionals.", icon: "Clock" },
    { title: "Certification Upon Completion", desc: "Earn recognized certificates that support your career progression.", icon: "Award" },
    { title: "Tutor-Led Sessions", desc: "Engage in tutor-led workshops, expert-led discussions, and real-time doubt-solving sessions.", icon: "MonitorPlay" },
    { title: "Progress Tracking & Assessments", desc: "Monitor your learning journey with module-wise assessments, exams, and performance insights.", icon: "CheckCircle2" },
  ],
  testimonials: [],
  individualPlans: [
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
  ],
  orgPlan: {
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
  },
  faqs: [
    { q: "What is Royal Tech Innovation LMS?", a: "Royal Tech Innovation LMS is a Coursera-style course marketplace. Browse 100+ career courses across 12 domains, enroll online, learn at your pace, complete projects, and earn shareable certificates — all in one platform." },
    { q: "How do I enroll in a course?", a: "Open any course page, review the syllabus and price, then click Enroll or Add to cart. After checkout, the course unlocks instantly in My Learning." },
    { q: "Are courses self-paced or live?", a: "Most courses are fully self-paced with 24/7 access. Selected paths also include live workshops and office hours." },
    { q: "Will I get a certificate?", a: "Yes. Complete required modules and assessments to unlock a shareable Royal Tech certificate for LinkedIn and your resume." },
    { q: "What is Royal Tech Plus?", a: "Unlimited catalog access with monthly or annual plans, certificates after your trial, and new course drops as they launch." },
    { q: "Can my company train employees here?", a: "Yes. Royal Tech for Teams includes seat management, progress analytics, and shared catalog access." },
    { q: "Do I need coding experience?", a: "Not for every course. Many beginner paths need none; data, ML, and full-stack paths recommend basic programming comfort." },
    { q: "How do I get help if I’m stuck?", a: "Use Contact Us, email, or WhatsApp. Selected courses also include Q&A and live office hours." },
  ],
  newsletter: {
    heading: "Stay ahead of the skills curve",
    subtitle: "Get new course launches, Specializations, and career path updates in your inbox.",
    buttonText: "Subscribe",
  },
  unlock: {
    heading: "Start learning today",
    subtitle: "Join thousands of learners building AI, cloud, data, and software skills on Royal Tech Innovation LMS.",
    cta: "Explore courses",
    image: "/q.png",
  },
  accreditationLogos: ["/e1.png", "/e2.png", "/e3.png", "/e4.png"],
  exploreProgramImages: ["/p1.png", "/p2.png", "/p3.png", "/p4.jpg", "/p5.png", "/p6.png", "/p7.png", "/p8.png"],
  faqImage:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  faqPage: {
    badge: "HELP CENTER",
    title: "Answers that help you enroll with confidence",
    subtitle: "Everything about browsing, buying, learning, certificates, Plus plans, and teams — clear answers before you start.",
  },
  testimonialsPage: {
    badge: "What Our Learners Say",
    title: "What Our Learners Say",
    subtitle: "Real experiences from professionals who have advanced their skills with our training programs.",
  },
};

/* ─── About Page Config Types ─── */

export type AboutPageHero = {
  badge: string;
  heading: string;
  headingHighlight: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  heroImage: string;
};

export type AboutPageHighlight = {
  label: string;
  value: string;
};

export type AboutPagePillar = {
  title: string;
  desc: string;
};

export type AboutPageMission = {
  heading: string;
  headingHighlight: string;
  body: string;
  body2: string;
};

export type AboutPageTechPoint = string;

export type AboutPageFeature = {
  title: string;
  desc: string;
};

export type AboutPageTeamMember = {
  name: string;
  role: string;
  photo: string;
};

export type AboutPageTeamLevel = {
  level: string;
  members: AboutPageTeamMember[];
};

export type AboutPageAccreditation = {
  title: string;
  subtitle: string;
  desc: string;
  logo: string;
};

export type AboutPageImpactStat = {
  value: string;
  label: string;
};

export type AboutPageTestimonial = string;

export type AboutPageCta = {
  heading: string;
  subtitle: string;
  buttonText: string;
};

export type AboutPageWhoWeAre = {
  badge: string;
  heading: string;
  headingHighlight: string;
  subtitle: string;
  bulletPoints: string[];
  backgroundImage: string;
};

export type AboutPageConfig = {
  hero: AboutPageHero;
  highlights: AboutPageHighlight[];
  whoWeAre: AboutPageWhoWeAre;
  pillars: AboutPagePillar[];
  mission: AboutPageMission;
  techPoints: AboutPageTechPoint[];
  features: AboutPageFeature[];
  teamHierarchy: AboutPageTeamLevel[];
  accreditations: AboutPageAccreditation[];
  impactStats: AboutPageImpactStat[];
  testimonials: AboutPageTestimonial[];
  cta: AboutPageCta;
};

export const defaultAboutPageConfig: AboutPageConfig = {
  hero: {
    badge: "ABOUT ROYAL TECH INNOVATION LMS",
    heading: "Learn.",
    headingHighlight: "Build. Innovate.",
    subtitle: "Royal Tech Innovation LMS is a Coursera-style course marketplace helping individuals and teams master AI, cloud, data, software, and digital innovation — with enroll, learn, and certify in one place.",
    ctaPrimary: "Explore Courses",
    ctaSecondary: "Our Journey",
    heroImage: "/Gemini_Generated_Image_mvf5i9mvf5i9mvf5.png",
  },
  highlights: [
    { label: "Active Learners", value: "25,000+" },
    { label: "Expert Instructors", value: "80+" },
    { label: "Courses & Paths", value: "120+" },
    { label: "Companies Upskilled", value: "100+" },
  ],
  whoWeAre: {
    badge: "WHO WE ARE",
    heading: "A modern course marketplace.",
    headingHighlight: "Built for careers.",
    subtitle: "We connect learners to job-ready skills the way leading platforms do: clear categories, course pages you can buy, flexible self-paced learning, and certificates worth sharing.",
    bulletPoints: [
      "In-demand tech & innovation curriculum",
      "Hands-on projects and portfolio labs",
      "Self-paced + live instructor options",
      "Certificates and career support",
    ],
    backgroundImage: "/op.png",
  },
  pillars: [
    { title: "Our Mission", desc: "Make high-quality tech and innovation learning accessible, purchasable, and career-relevant for every learner." },
    { title: "Our Vision", desc: "Become the go-to LMS marketplace for professionals and organizations building the future of work." },
  ],
  mission: {
    heading: "To",
    headingHighlight: "Power Your Next Career Move",
    body: "At Royal Tech Innovation, we design courses like a marketplace — discover skills, compare programs, enroll securely, and learn online with progress tracking and certificates.",
    body2: "From AI and data science to cloud, cybersecurity, and product innovation, our catalog is built for learners who want outcomes — not just content libraries.",
  },
  techPoints: [
    "Coursera-style browse → course page → enroll → learn → certify flow.",
    "Career paths and Specializations mapped to real job roles.",
    "Hands-on labs, quizzes, and project-based assessments.",
    "Team plans with analytics for workforce upskilling.",
    "Global online access with certificates learners can share.",
  ],
  features: [
    { title: "Career Focused", desc: "Courses aligned to roles employers hire for today." },
    { title: "Marketplace UX", desc: "Browse categories, compare courses, and buy with confidence." },
    { title: "Hands-on Practice", desc: "Projects and labs that build a portfolio, not just notes." },
    { title: "Career Support", desc: "Guidance on job readiness, portfolios, and interviews." },
    { title: "Flexible Format", desc: "Self-paced learning with optional live sessions." },
  ],
  teamHierarchy: [
    { level: "Leadership", members: [{ name: "Ritika Sharma", role: "Head of Learning", photo: "" }] },
    { level: "Team Leads", members: [{ name: "Amit Verma", role: "Cybersecurity Lead", photo: "" }, { name: "Sneha Patel", role: "Data & AI Lead", photo: "" }] },
    { level: "Team Coordinators", members: [{ name: "Rahul Sharma", role: "Program Coordination", photo: "" }, { name: "Priya Nair", role: "Learner Success", photo: "" }] },
    { level: "Domain Experts", members: [{ name: "Vikram Singh", role: "AI & ML", photo: "" }, { name: "Karan Malhotra", role: "Cloud & DevOps", photo: "" }, { name: "Neha Kapoor", role: "Product Innovation", photo: "" }, { name: "Mohit Arora", role: "Software Engineering", photo: "" }] },
  ],
  accreditations: [],
  impactStats: [
    { value: "25,000+", label: "Learners Empowered" },
    { value: "80+", label: "Expert Instructors" },
    { value: "120+", label: "Courses & Paths" },
    { value: "100+", label: "Corporate Clients" },
    { value: "30+", label: "Countries Reached" },
  ],
  testimonials: [
    "The course pages feel like Coursera — clear syllabus, price, and enroll. I finished my first certificate in two weeks.",
    "Projects and labs helped me get interviews for cloud roles faster.",
    "Best LMS marketplace for working professionals who need flexible tech upskilling.",
  ],
  cta: {
    heading: "Ready to start learning?",
    subtitle: "Browse the catalog and enroll in your next career skill today.",
    buttonText: "Explore Courses",
  },
};

/** Shared certificate / badge / transcript templates — Admin → Users & Access → Certificates only. */
export type GlobalCertificateAssets = {
  templateImage?: string;
  badgeImage?: string;
  transcriptFile?: string;
};

export type { OrganizationTeamAdminConfig };

export type PromotionStatus = "active" | "disabled";
export type PromotionDiscountKind = "percent" | "fixed";
export type CouponCourseScope = "all" | "course";
export type ReferralRewardKind = "percent" | "fixed";

export type AdminCoupon = {
  id: string;
  code: string;
  discountKind: PromotionDiscountKind;
  amount: number;
  /** ISO currency for fixed discounts (e.g. INR for ₹50 OFF). */
  currency?: string;
  courseScope: CouponCourseScope;
  courseSlug?: string;
  uses: number;
  maxUses: number;
  validFrom: string;
  validTo: string;
  status: PromotionStatus;
  allowBelowBase?: boolean;
};

export type AdminReferralCode = {
  id: string;
  code: string;
  customerDiscountKind: PromotionDiscountKind;
  customerDiscountAmount: number;
  customerDiscountCurrency?: string;
  rewardKind: ReferralRewardKind;
  rewardAmount: number;
  rewardCurrency?: string;
  uses: number;
  status: PromotionStatus;
};

export type PromotionsConfig = {
  coupons: AdminCoupon[];
  referrals: AdminReferralCode[];
};

export type AdminContent = {
  dashboard: DashboardContent;
  /** Organisation premium tiers, seat limits, invite/assign rules — Admin → Organization Team */
  organizationTeam?: OrganizationTeamAdminConfig;
  learningCourses: LearningCourseItem[];
  managedCourses: ManagedCourse[];
  /** Slugs removed from admin — GET must not hydrate these back from MySQL. */
  deletedCourseSlugs?: string[];
  /** Coupons + referral codes (Admin → Self-paced → Pricing). */
  promotions?: PromotionsConfig;
  /** Default certificate assets when a course/program has no per-item upload. */
  globalCertificateAssets?: GlobalCertificateAssets;
  /** Live Zoom-style programs for `/tutor-led/[slug]` — edited under Admin → Tutor Led. */
  tutorLedPrograms: TutorLedProgramStored[];
  categories: ManagedCategory[];
  categoryPages: Partial<Record<string, Partial<CategoryPageEditorConfig>>>;
  coursesPage?: CoursesPageConfig;
  homePage?: HomePageConfig;
  aboutPage?: AboutPageConfig;
  /** Public `/tutor-led` ISO catalog landing — Admin → Tutor-Led Landing. */
  tutorLedCatalogPage?: TutorLedCatalogPageConfig;
  /** Designed tutor-led catalog landings (one thumbnail each on the category page). */
  tutorLedCatalogPages?: TutorLedCatalogLandingStored[];
};

export const defaultAdminContent: AdminContent = {
  dashboard: {
    nextClassTitle: "",
    nextClassTime: "",
    streakDays: 0,
    calendarReminders: [],
  },
  organizationTeam: defaultOrganizationTeamAdminConfig,
  learningCourses: [],
  managedCourses: [
    {
      slug: "google-ai-essentials",
      title: "AI Essentials for Everyone",
      subtitle: "Learn how generative AI works and apply it to real work tasks — Coursera-style career starter.",
      category: "artificial-intelligence",
      level: "Beginner",
      duration: "6h 00m",
      rating: "4.8",
      learners: "42,180",
      price: "$49.00",
      oldPrice: "$89.00",
      image: "/p1.png",
      published: true,
      instructorName: "Dr. Ananya Mehta",
      settings: { showInCatalog: true, enrollmentOpen: true, featured: true },
    },
    {
      slug: "python-for-data-science",
      title: "Python for Data Science",
      subtitle: "Write Python, analyze data, and build your first data projects for a portfolio.",
      category: "data-science",
      level: "Beginner",
      duration: "12h 30m",
      rating: "4.7",
      learners: "38,920",
      price: "$59.00",
      oldPrice: "$99.00",
      image: "/p2.png",
      published: true,
      instructorName: "Sneha Patel",
      settings: { showInCatalog: true, enrollmentOpen: true, featured: true },
    },
    {
      slug: "aws-cloud-practitioner",
      title: "Cloud Computing Foundations (AWS)",
      subtitle: "Master cloud concepts, core AWS services, and architecture patterns for modern apps.",
      category: "cloud-computing",
      level: "Beginner",
      duration: "10h 00m",
      rating: "4.8",
      learners: "31,450",
      price: "$69.00",
      oldPrice: "$119.00",
      image: "/p3.png",
      published: true,
      instructorName: "Karan Malhotra",
      settings: { showInCatalog: true, enrollmentOpen: true, featured: true },
    },
    {
      slug: "full-stack-web-development",
      title: "Full-Stack Web Development",
      subtitle: "Build responsive web apps with modern frontend, APIs, and databases.",
      category: "software-development",
      level: "Intermediate",
      duration: "28h 00m",
      rating: "4.6",
      learners: "27,640",
      price: "$79.00",
      oldPrice: "$129.00",
      image: "/p5.png",
      published: true,
      instructorName: "Mohit Arora",
      settings: { showInCatalog: true, enrollmentOpen: true, featured: true },
    },
    {
      slug: "cybersecurity-fundamentals",
      title: "Cybersecurity Fundamentals",
      subtitle: "Protect networks, identities, and cloud workloads with practical security controls.",
      category: "cybersecurity",
      level: "Beginner",
      duration: "8h 20m",
      rating: "4.7",
      learners: "22,110",
      price: "$55.00",
      oldPrice: "$95.00",
      image: "/p6.png",
      published: true,
      instructorName: "Amit Verma",
      settings: { showInCatalog: true, enrollmentOpen: true, featured: true },
    },
    {
      slug: "product-innovation-strategy",
      title: "Product Innovation & Digital Strategy",
      subtitle: "Turn ideas into shipped products with discovery, roadmaps, and growth loops.",
      category: "business-innovation",
      level: "Intermediate",
      duration: "7h 45m",
      rating: "4.6",
      learners: "15,880",
      price: "$52.00",
      oldPrice: "$84.00",
      image: "/p7.png",
      published: true,
      instructorName: "Neha Kapoor",
      settings: { showInCatalog: true, enrollmentOpen: true, featured: true },
    },
    {
      slug: "machine-learning-specialization",
      title: "Machine Learning Specialization",
      subtitle: "From supervised learning to neural nets — build ML models with real datasets.",
      category: "artificial-intelligence",
      level: "Intermediate",
      duration: "22h 00m",
      rating: "4.9",
      learners: "48,300",
      price: "$89.00",
      oldPrice: "$149.00",
      image: "/p8.png",
      published: true,
      instructorName: "Vikram Singh",
      settings: { showInCatalog: true, enrollmentOpen: true, featured: true },
    },
    {
      slug: "devops-ci-cd-essentials",
      title: "DevOps & CI/CD Essentials",
      subtitle: "Automate builds, tests, and deployments with pipelines used by modern engineering teams.",
      category: "cloud-computing",
      level: "Intermediate",
      duration: "9h 15m",
      rating: "4.7",
      learners: "18,760",
      price: "$64.00",
      oldPrice: "$109.00",
      image: "/p4.jpg",
      published: true,
      instructorName: "Karan Malhotra",
      settings: { showInCatalog: true, enrollmentOpen: true, featured: false },
    },
  ],
  categories: [
    {
      slug: "artificial-intelligence",
      title: "Artificial Intelligence",
      subtitle: "AI & Generative AI",
      description: "Learn generative AI, machine learning, and practical AI tools for work.",
      isActive: true,
      isFeatured: true,
      isUppercase: false,
      isBold: true,
      tone: "blue",
      image: "/p1.png",
    },
    {
      slug: "data-science",
      title: "Data Science",
      subtitle: "Analytics & Python",
      description: "Data analysis, visualization, and Python skills for data careers.",
      isActive: true,
      isFeatured: true,
      isUppercase: false,
      isBold: true,
      tone: "blue",
      image: "/p2.png",
    },
    {
      slug: "cloud-computing",
      title: "Cloud Computing",
      subtitle: "AWS · Azure · DevOps",
      description: "Cloud foundations, architecture, and CI/CD for modern infrastructure.",
      isActive: true,
      isFeatured: true,
      isUppercase: false,
      isBold: true,
      tone: "emerald",
      image: "/p3.png",
    },
    {
      slug: "software-development",
      title: "Software Development",
      subtitle: "Full-Stack & Engineering",
      description: "Web, APIs, and engineering practices to build production software.",
      isActive: true,
      isFeatured: false,
      isUppercase: false,
      isBold: true,
      tone: "amber",
      image: "/p5.png",
    },
    {
      slug: "cybersecurity",
      title: "Cybersecurity",
      subtitle: "Security & Defense",
      description: "Network security, threat awareness, and defensive controls.",
      isActive: true,
      isFeatured: false,
      isUppercase: false,
      isBold: true,
      tone: "blue",
      image: "/p6.png",
    },
    {
      slug: "business-innovation",
      title: "Business & Innovation",
      subtitle: "Product & Strategy",
      description: "Product management, digital strategy, and innovation leadership.",
      isActive: true,
      isFeatured: false,
      isUppercase: false,
      isBold: false,
      tone: "amber",
      image: "/p7.png",
    },
  ],
  tutorLedPrograms: [],
  categoryPages: {},
  tutorLedCatalogPage: defaultTutorLedCatalogPageConfig,
  tutorLedCatalogPages: [defaultIso22000CatalogLanding()],
};
