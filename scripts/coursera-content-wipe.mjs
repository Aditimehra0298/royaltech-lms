/**
 * Force entire CMS to Coursera-style Royal Tech marketplace content.
 * Removes old SF / food-safety / ISO / ESG catalog surfaces.
 * Run: node scripts/coursera-content-wipe.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const file = join(root, "data", "admin-content.json");
const data = JSON.parse(readFileSync(file, "utf8"));

const OLD_COURSE_SLUGS = [
  "food-safety-masterclass",
  "cyber-security-essentials",
  "advanced-cyber-security-professional",
  "esg-reporting-fundamentals",
  "cousers-esg-esg-management-development-training-program",
  "information-security-governance",
  "medical-device-quality-regulatory",
  "workplace-compliance-practical",
  "skill-development-framework-implementation",
  "hvac-refrigeration-core-operations",
  "fssc-22000-v6-food-fraud-mitigation-auditing",
  "cyber-security-phishing-awareness-training",
  "cybersecurity",
  "courses-certfied-ethical-hacking-and-penitration-testing",
  "professional-plumbing-training-program",
  "iso-22000-basic",
  "iso-22000-implementation",
  "iso-22000-internal-auditor",
  "iso-22000-lead-auditor",
  "iso-22000",
];

data.deletedCourseSlugs = [
  ...new Set([...(data.deletedCourseSlugs || []), ...OLD_COURSE_SLUGS]),
];

data.tutorLedPrograms = [];
data.tutorLedCatalogPages = [
  {
    slug: "ai-professional-certificate",
    category: "artificial-intelligence",
    published: true,
    cardTitle: "AI Professional Certificate",
    page: {
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
      },
      programsSection: {
        title: "Choose Your AI Learning Path",
        subtitle: "Start with essentials or go deeper with machine learning.",
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
            "Certificate on completion",
          ],
          enrollSlug: "google-ai-essentials",
          price: "$49",
        },
        {
          id: "implementation",
          title: "Machine Learning Specialization",
          tagline: "Intermediate · Projects included",
          bullets: [
            "Supervised learning foundations",
            "Model evaluation",
            "Neural network basics",
            "Capstone project",
          ],
          enrollSlug: "machine-learning-specialization",
          price: "$89",
        },
      ],
      audience: {
        subtitle: "Ideal for:",
        items: [
          { icon: "Users", label: "Career switchers" },
          { icon: "GraduationCap", label: "Students" },
          { icon: "Briefcase", label: "Working professionals" },
          { icon: "Sparkles", label: "Product & business teams" },
        ],
      },
      instructor: {
        name: "Dr. Ananya Mehta",
        role: "AI & Learning Lead",
        bio: "Industry educator specializing in generative AI adoption and practical ML for professionals.",
      },
      faqs: [
        {
          q: "Is this like Coursera Professional Certificates?",
          a: "Yes — browse, enroll, learn at your pace, complete projects, and earn a shareable certificate on Royal Tech Innovation LMS.",
        },
        {
          q: "Do I need coding experience?",
          a: "AI Essentials needs none. The Machine Learning Specialization is best with basic Python comfort.",
        },
      ],
      cta: {
        heading: "Start your AI career path",
        subtitle: "Enroll in a course and learn online today.",
        buttonText: "Browse AI courses",
        buttonHref: "/courses/category/artificial-intelligence",
      },
    },
  },
];

data.tutorLedCatalogPage = data.tutorLedCatalogPages[0].page;

data.coursesPage = {
  hero: {
    badgeText: "MOST POPULAR",
    title: "Explore {highlight} courses",
    highlightWord: "career-ready",
    heading: "Explore career courses",
    subtitle:
      "Browse Royal Tech Innovation’s Coursera-style catalog — AI, cloud, data, software, cybersecurity, and business innovation. Enroll online and earn shareable certificates.",
    ctaPrimary: "Browse catalog",
    ctaSecondary: "Join for free",
    backgroundImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
  },
  tutorLed: [
    { date: "JUN 02", title: "Live: Generative AI for Work", time: "10:00 AM - 11:30 AM" },
    { date: "JUN 05", title: "Cloud Architecture Office Hours", time: "02:00 PM - 03:30 PM" },
    { date: "JUN 08", title: "Data Science Career Q&A", time: "11:00 AM - 12:30 PM" },
  ],
  liveSessions: [
    { date: "JUN 02", title: "Live: Generative AI for Work", time: "10:00 AM - 11:30 AM" },
    { date: "JUN 05", title: "Cloud Architecture Office Hours", time: "02:00 PM - 03:30 PM" },
    { date: "JUN 08", title: "Data Science Career Q&A", time: "11:00 AM - 12:30 PM" },
  ],
  recentUpdates: [
    {
      title: "New: AI Essentials for Everyone",
      subtitle: "Featured Course",
      href: "/courses/google-ai-essentials",
      image: "/p1.png",
    },
    {
      title: "Python for Data Science — open enrollment",
      subtitle: "Career Path",
      href: "/courses/python-for-data-science",
      image: "/p2.png",
    },
    {
      title: "AWS Cloud Foundations now live",
      subtitle: "Cloud Path",
      href: "/courses/aws-cloud-practitioner",
      image: "/p3.png",
    },
  ],
  upcomingItems: [
    { title: "Live Workshop: Prompt Engineering", time: "10:00 AM - 12:00 PM", iconColor: "rose" },
    { title: "New Course Launch: Full-Stack Web", time: "Open now", iconColor: "sky" },
    { title: "Webinar: Careers in AI & Cloud", time: "11:00 AM - 12:30 PM", iconColor: "violet" },
  ],
  featuredDescription:
    "Discover Specializations and Professional Certificate-style courses built like Coursera — clear syllabi, enroll buttons, hands-on projects, and certificates that help you get hired.",
  featuredExperts: [
    { name: "Dr. Ananya Mehta", photo: "https://randomuser.me/api/portraits/women/65.jpg" },
    { name: "Sneha Patel", photo: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Karan Malhotra", photo: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Mohit Arora", photo: "https://randomuser.me/api/portraits/men/52.jpg" },
  ],
  faqs: [
    {
      question: "Are these courses like Coursera?",
      answer:
        "Yes. Browse categories, open a course page, enroll or buy, learn at your pace, and earn a shareable certificate.",
    },
    {
      question: "Can I switch my learning plan anytime?",
      answer: "Yes. Upgrade to Royal Tech Plus monthly or annual, or enroll in individual courses anytime.",
    },
    {
      question: "Do I get certificates after course completion?",
      answer: "Yes. Complete required modules and assessments to unlock your certificate.",
    },
  ],
  cta: {
    heading: "Ready to start learning?",
    description: "Pick a skill path, enroll online, and earn credentials that matter.",
    buttonText: "Explore courses",
    image: data.coursesPage?.cta?.image || "/Untitled (Label).png",
  },
  coursesPerRow: 4,
  defaultVisibleCourses: 8,
};

if (!data.homePage) data.homePage = {};
data.homePage.testimonials = [
  {
    quote:
      "The course pages feel like Coursera — clear syllabus, price, and enroll. I finished my first AI certificate in two weeks.",
    name: "Rohan Verma",
    role: "Product Analyst",
    courseBadge: "AI Essentials for Everyone",
  },
  {
    quote:
      "Python for Data Science had projects I could put on my portfolio. I landed more interview calls within a month.",
    name: "Priya Rao",
    role: "Data Analyst",
    courseBadge: "Python for Data Science",
  },
  {
    quote:
      "Cloud foundations plus labs made AWS concepts click. The certificate helped my profile stand out.",
    name: "Aman Kumar",
    role: "Cloud Engineer",
    courseBadge: "Cloud Computing Foundations",
  },
  {
    quote:
      "Full-stack path was structured and practical. Best LMS marketplace experience I’ve used as a working professional.",
    name: "Neha Sharma",
    role: "Software Developer",
    courseBadge: "Full-Stack Web Development",
  },
  {
    quote:
      "Cybersecurity fundamentals was hands-on, not just theory. I applied the controls at work the same week.",
    name: "Vikram Singh",
    role: "IT Specialist",
    courseBadge: "Cybersecurity Fundamentals",
  },
  {
    quote:
      "Royal Tech for Teams let our company upskill on one catalog with clear progress tracking.",
    name: "Sneha Iyer",
    role: "L&D Manager",
    courseBadge: "Product Innovation & Digital Strategy",
  },
];

data.homePage.whyFeatures = [
  {
    title: "Job-ready skills",
    desc: "Courses mapped to roles employers hire for — AI, cloud, data, and software.",
    icon: "Users",
  },
  {
    title: "Marketplace course pages",
    desc: "Browse, compare syllabus and price, then enroll like on Coursera.",
    icon: "BookOpen",
  },
  {
    title: "Learn on your schedule",
    desc: "Self-paced video, quizzes, and projects with 24/7 access.",
    icon: "Clock",
  },
  {
    title: "Shareable certificates",
    desc: "Earn credentials you can add to LinkedIn and your resume.",
    icon: "Award",
  },
  {
    title: "Hands-on projects",
    desc: "Labs and portfolio work — not just slide decks.",
    icon: "MonitorPlay",
  },
  {
    title: "Progress that sticks",
    desc: "Track modules, assessments, and certificates in My Learning.",
    icon: "CheckCircle2",
  },
];

data.homePage.learningPaths = [
  {
    id: "self-paced",
    title: "Self-paced courses",
    desc: "Coursera-style online courses you can start anytime — videos, quizzes, projects, and certificates.",
    keyPoints: [
      "24/7 access to lessons and resources",
      "Resume from where you left off",
      "Module quizzes and final assessments",
      "Progress tracking in My Learning",
      "Downloadable resources",
      "Shareable certificate on completion",
    ],
    cta: "Browse self-paced catalog",
    imageSrc: "/c1.png",
  },
  {
    id: "interactive",
    title: "Professional Certificates",
    desc: "Structured multi-course paths designed for career outcomes — like Coursera Professional Certificates.",
    keyPoints: [
      "Guided skill paths by role",
      "Projects for your portfolio",
      "Industry-aligned curriculum",
      "Certificate when you finish",
      "Optional live office hours",
      "Career tips and interview prep",
    ],
    cta: "View certificate paths",
    imageSrc: "/c2.png",
  },
  {
    id: "onsite",
    title: "Teams & enterprise",
    desc: "Upskill your workforce with seat plans, analytics, and a shared course catalog.",
    keyPoints: [
      "Royal Tech for Teams plans",
      "Seat management",
      "Progress analytics",
      "Catalog access for employees",
      "Onboarding playbooks",
      "Dedicated support options",
    ],
    cta: "Explore team plans",
    imageSrc: "/c4.png",
  },
  {
    id: "live",
    title: "Live workshops",
    desc: "Join expert-led live sessions for deep dives, demos, and career Q&A.",
    keyPoints: [
      "Live instructor sessions",
      "Interactive Q&A",
      "Recordings for enrolled learners",
      "Hands-on exercises",
      "Downloadable resources",
      "Certificate-eligible tracks",
    ],
    cta: "See upcoming workshops",
    imageSrc: "/c3.png",
  },
];

data.aboutPage = {
  ...(data.aboutPage || {}),
  hero: {
    badge: "ABOUT ROYAL TECH INNOVATION LMS",
    heading: "Learn.",
    headingHighlight: "Build. Innovate.",
    subtitle:
      "Royal Tech Innovation LMS is a Coursera-style course marketplace helping individuals and teams master AI, cloud, data, software, and digital innovation — with enroll, learn, and certify in one place.",
    ctaPrimary: "Explore Courses",
    ctaSecondary: "Our Journey",
    heroImage:
      data.aboutPage?.hero?.heroImage ||
      "/Gemini_Generated_Image_mvf5i9mvf5i9mvf5.png",
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
    subtitle:
      "We connect learners to job-ready skills the way leading platforms do: clear categories, course pages you can buy, flexible self-paced learning, and certificates worth sharing.",
    bulletPoints: [
      "In-demand tech & innovation curriculum",
      "Hands-on projects and portfolio labs",
      "Self-paced + live instructor options",
      "Certificates and career support",
    ],
    backgroundImage: data.aboutPage?.whoWeAre?.backgroundImage || "/op.png",
  },
  pillars: [
    {
      title: "Our Mission",
      desc: "Make high-quality tech and innovation learning accessible, purchasable, and career-relevant for every learner.",
    },
    {
      title: "Our Vision",
      desc: "Become the go-to LMS marketplace for professionals and organizations building the future of work.",
    },
  ],
  mission: {
    heading: "To",
    headingHighlight: "Power Your Next Career Move",
    body: "At Royal Tech Innovation, we design courses like a marketplace — discover skills, compare programs, enroll securely, and learn online with progress tracking and certificates.",
    body2:
      "From AI and data science to cloud, cybersecurity, and product innovation, our catalog is built for learners who want outcomes — not just content libraries.",
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
    {
      level: "Leadership",
      members: [{ name: "Ritika Sharma", role: "Head of Learning", photo: "" }],
    },
    {
      level: "Team Leads",
      members: [
        { name: "Amit Verma", role: "Cybersecurity Lead", photo: "" },
        { name: "Sneha Patel", role: "Data & AI Lead", photo: "" },
      ],
    },
    {
      level: "Domain Experts",
      members: [
        { name: "Vikram Singh", role: "AI & ML", photo: "" },
        { name: "Karan Malhotra", role: "Cloud & DevOps", photo: "" },
        { name: "Neha Kapoor", role: "Product Innovation", photo: "" },
        { name: "Mohit Arora", role: "Software Engineering", photo: "" },
      ],
    },
  ],
  accreditations: [
    {
      title: "Industry Partners",
      subtitle: "Skill-aligned programs",
      desc: "Courses designed with hiring-manager feedback and modern tech stacks.",
      logo: "/e1.png",
    },
    {
      title: "Quality Learning",
      subtitle: "Curriculum standards",
      desc: "Structured modules, assessments, and certificate criteria on every path.",
      logo: "/e2.png",
    },
    {
      title: "Global Access",
      subtitle: "Learn from anywhere",
      desc: "Online enrollment and 24/7 access for learners worldwide.",
      logo: "/e3.png",
    },
    {
      title: "Teams & Enterprise",
      subtitle: "Workforce upskilling",
      desc: "Seat plans, analytics, and catalog access for organizations.",
      logo: "/e4.png",
    },
  ],
  impactStats: [
    { value: "25,000+", label: "Learners Empowered" },
    { value: "80+", label: "Expert Instructors" },
    { value: "120+", label: "Courses & Paths" },
    { value: "100+", label: "Corporate Clients" },
    { value: "30+", label: "Countries Reached" },
  ],
  testimonials: [
    "The course pages feel like Coursera — clear syllabus, price, and enroll.",
    "Projects and labs helped me get interviews for cloud roles faster.",
    "Best LMS marketplace for working professionals who need flexible tech upskilling.",
  ],
  cta: {
    heading: "Ready to start learning?",
    subtitle: "Browse the catalog and enroll in your next career skill today.",
    buttonText: "Explore Courses",
  },
};

data.categoryPages = {
  "artificial-intelligence": {
    heroTitle: "Artificial Intelligence",
    heroSubtitle:
      "Learn generative AI and machine learning the Coursera way — enroll, practice with projects, and earn a shareable certificate.",
  },
  "data-science": {
    heroTitle: "Data Science",
    heroSubtitle:
      "Python, analytics, and portfolio projects for data careers — browse courses and start learning today.",
  },
  "cloud-computing": {
    heroTitle: "Cloud Computing",
    heroSubtitle:
      "AWS foundations, architecture, and DevOps CI/CD skills for modern infrastructure roles.",
  },
  "software-development": {
    heroTitle: "Software Development",
    heroSubtitle:
      "Full-stack web, APIs, and engineering practices to build production software.",
  },
  cybersecurity: {
    heroTitle: "Cybersecurity",
    heroSubtitle:
      "Threat awareness, defensive controls, and cloud security fundamentals for IT professionals.",
  },
  "business-innovation": {
    heroTitle: "Business & Innovation",
    heroSubtitle:
      "Product strategy and digital innovation skills for PMs, founders, and business leaders.",
  },
};

writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log("Coursera content wipe complete.");
console.log("Courses kept:", (data.managedCourses || []).map((c) => c.slug).join(", "));
console.log("Deleted old slugs:", data.deletedCourseSlugs.length);
console.log("Categories:", (data.categories || []).map((c) => c.title).join(", "));
