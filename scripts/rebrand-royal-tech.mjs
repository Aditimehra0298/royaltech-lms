/**
 * Rebrand live CMS JSON to Royal Tech Innovation LMS + Coursera-style tech catalog.
 * Run: node scripts/rebrand-royal-tech.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const file = join(root, "data", "admin-content.json");

const categories = [
  {
    slug: "artificial-intelligence",
    title: "Artificial Intelligence",
    subtitle: "AI & Generative AI",
    description: "Learn generative AI, machine learning, and practical AI tools for work.",
    isActive: true,
    isFeatured: true,
    isUppercase: false,
    isBold: true,
    tone: "violet",
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
];

const managedCourses = [
  {
    slug: "google-ai-essentials",
    title: "AI Essentials for Everyone",
    subtitle:
      "Learn how generative AI works and apply it to real work tasks — Coursera-style career starter.",
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
    learningFormat: "self-paced",
    pageBadge: "Bestseller",
    highlights: [
      "Understand generative AI concepts without coding experience",
      "Apply AI tools to writing, research, and productivity workflows",
      "Build a personal AI toolkit for your role",
      "Earn a shareable Royal Tech certificate",
    ],
    hero: {
      aboutText:
        "A Coursera-style starter course for professionals who want to use AI at work. Learn core concepts, prompt patterns, and practical use cases — then complete a short project to earn your certificate.",
      enrollButtonLabel: "Enroll now",
      courseIncludes: [
        "6 hours on-demand video",
        "Hands-on AI exercises",
        "Downloadable resources",
        "Certificate of completion",
        "Full lifetime access",
      ],
      studentsLabel: "42,180 students enrolled",
      ratingCount: "8,420",
      language: "English",
      certificate: "Yes",
      access: "Lifetime access",
      moneyBackGuarantee: "14-day money-back guarantee",
    },
    overview: {
      learnOutcomes: [
        "Explain what generative AI is and how it works at a high level",
        "Write effective prompts for common workplace tasks",
        "Choose the right AI tools for writing, analysis, and ideation",
        "Apply AI safely with awareness of privacy and bias",
      ],
      requirements: ["No coding required", "Computer with internet access"],
    },
    settings: { showInCatalog: true, enrollmentOpen: true, featured: true, allowQa: true },
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
    learningFormat: "self-paced",
    pageBadge: "Most popular",
    highlights: [
      "Python fundamentals for data work",
      "Pandas, charts, and exploratory analysis",
      "Portfolio-ready mini projects",
      "Shareable certificate on completion",
    ],
    hero: {
      aboutText:
        "Start a data career with Python. This marketplace course walks you from basics to analysis projects you can show employers — the same browse → enroll → learn → certify flow as leading platforms.",
      enrollButtonLabel: "Enroll now",
      courseIncludes: [
        "12.5 hours on-demand video",
        "Coding notebooks & projects",
        "Quizzes and practice labs",
        "Certificate of completion",
      ],
      studentsLabel: "38,920 students enrolled",
      ratingCount: "6,110",
      language: "English",
      access: "Lifetime access",
    },
    overview: {
      learnOutcomes: [
        "Write clean Python for data tasks",
        "Clean and explore datasets with pandas",
        "Visualize insights for stakeholders",
        "Ship a small portfolio project",
      ],
      requirements: ["Basic computer literacy", "Willingness to practice coding weekly"],
    },
    settings: { showInCatalog: true, enrollmentOpen: true, featured: true, allowQa: true },
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
    learningFormat: "self-paced",
    pageBadge: "Career path",
    highlights: [
      "Cloud models, regions, and shared responsibility",
      "Core AWS compute, storage, and networking",
      "Architecture patterns for scalable apps",
      "Exam-oriented practice quizzes",
    ],
    hero: {
      aboutText:
        "Build cloud literacy employers expect. Learn AWS foundations with labs and quizzes designed like a Professional Certificate starter path.",
      enrollButtonLabel: "Enroll now",
      courseIncludes: ["10 hours video", "Cloud labs", "Practice quizzes", "Certificate"],
      studentsLabel: "31,450 students enrolled",
      access: "Lifetime access",
    },
    settings: { showInCatalog: true, enrollmentOpen: true, featured: true, allowQa: true },
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
    learningFormat: "self-paced",
    pageBadge: "Specialization",
    highlights: [
      "Frontend + backend end-to-end",
      "REST APIs and databases",
      "Deploy a production-style app",
      "Portfolio projects included",
    ],
    hero: {
      aboutText:
        "A job-ready specialization to become a full-stack developer. Enroll once, follow the path, and graduate with projects you can demo in interviews.",
      enrollButtonLabel: "Enroll now",
      courseIncludes: ["28 hours video", "Capstone project", "Code repos", "Certificate"],
      studentsLabel: "27,640 students enrolled",
      access: "Lifetime access",
    },
    settings: { showInCatalog: true, enrollmentOpen: true, featured: true, allowQa: true },
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
    learningFormat: "self-paced",
    pageBadge: "Popular",
    highlights: [
      "Threat landscape and attack basics",
      "Identity, network, and endpoint defenses",
      "Cloud security fundamentals",
      "Hands-on scenario drills",
    ],
    hero: {
      aboutText:
        "Start a cybersecurity career path with practical controls — not just theory. Perfect for IT professionals moving into security roles.",
      enrollButtonLabel: "Enroll now",
      studentsLabel: "22,110 students enrolled",
      access: "Lifetime access",
    },
    settings: { showInCatalog: true, enrollmentOpen: true, featured: true, allowQa: true },
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
    learningFormat: "self-paced",
    pageBadge: "New",
    highlights: [
      "Product discovery and prioritization",
      "Roadmaps and stakeholder alignment",
      "Metrics and growth loops",
      "Case studies from digital products",
    ],
    hero: {
      aboutText:
        "Learn how modern product teams innovate and ship. Ideal for aspiring PMs, founders, and digital leaders.",
      enrollButtonLabel: "Enroll now",
      studentsLabel: "15,880 students enrolled",
      access: "Lifetime access",
    },
    settings: { showInCatalog: true, enrollmentOpen: true, featured: true, allowQa: true },
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
    learningFormat: "self-paced",
    pageBadge: "Specialization",
    highlights: [
      "Supervised & unsupervised learning",
      "Model evaluation and tuning",
      "Neural network foundations",
      "Capstone with real datasets",
    ],
    hero: {
      aboutText:
        "A deeper Specialization for learners ready to build ML models. Structured like top marketplace programs with projects and a final certificate.",
      enrollButtonLabel: "Enroll now",
      studentsLabel: "48,300 students enrolled",
      access: "Lifetime access",
    },
    settings: { showInCatalog: true, enrollmentOpen: true, featured: true, allowQa: true },
  },
  {
    slug: "devops-ci-cd-essentials",
    title: "DevOps & CI/CD Essentials",
    subtitle:
      "Automate builds, tests, and deployments with pipelines used by modern engineering teams.",
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
    learningFormat: "self-paced",
    pageBadge: "Skills path",
    highlights: [
      "CI/CD pipeline design",
      "Containers and deployment basics",
      "Monitoring and release hygiene",
      "Team workflow best practices",
    ],
    hero: {
      aboutText:
        "Level up from cloud foundations into DevOps. Learn pipelines and release practices that engineering teams use every day.",
      enrollButtonLabel: "Enroll now",
      studentsLabel: "18,760 students enrolled",
      access: "Lifetime access",
    },
    settings: { showInCatalog: true, enrollmentOpen: true, featured: false, allowQa: true },
  },
];

function replaceBrandStrings(value) {
  if (typeof value === "string") {
    return value
      .replaceAll("Sustainable Futuristic Training LLP", "Royal Tech Innovation")
      .replaceAll("Sustainable Futuristic Trainings", "Royal Tech Innovation")
      .replaceAll("Sustainable Futures Trainings", "Royal Tech Innovation")
      .replaceAll("Sustainable Futures Training", "Royal Tech Innovation")
      .replaceAll("Sustainable Futures Plus", "Royal Tech Plus")
      .replaceAll("Sustainable Futures for Teams", "Royal Tech for Teams")
      .replaceAll("SF Trainings", "Royal Tech Innovation LMS")
      .replaceAll("sftrainings.org", "royaltechinnovation.com")
      .replaceAll("@sftrainings", "@royaltechinnovation")
      .replaceAll("ABOUT SUSTAINABLE FUTURES TRAININGS", "ABOUT ROYAL TECH INNOVATION LMS")
      .replaceAll("ABOUT SUSTAINABLE FUTURISTIC TRAININGS", "ABOUT ROYAL TECH INNOVATION LMS");
  }
  if (Array.isArray(value)) return value.map(replaceBrandStrings);
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = replaceBrandStrings(v);
    return out;
  }
  return value;
}

const raw = JSON.parse(readFileSync(file, "utf8"));
let data = replaceBrandStrings(raw);

data.categories = categories;
data.managedCourses = managedCourses;
data.categoryPages = {};
data.tutorLedPrograms = Array.isArray(data.tutorLedPrograms) ? [] : [];

if (!data.homePage) data.homePage = {};
data.homePage.hero = {
  heading: "Learn without limits",
  headingHighlight: "Build skills that get you hired",
  subtitle:
    "Royal Tech Innovation LMS is a Coursera-style course marketplace. Browse in-demand programs in AI, cloud, data, software, and digital innovation — enroll online, learn at your pace, and earn shareable certificates.",
  ctaPrimary: "Explore courses",
  ctaSecondary: "Join for free",
  videoUrl: data.homePage.hero?.videoUrl || "",
};
data.homePage.stats = [
  { value: "4.8★", label: "Average course rating" },
  { value: "120+", label: "Career-ready courses" },
  { value: "80+", label: "Industry instructors" },
  { value: "25K+", label: "Learners enrolled" },
  { value: "24/7", label: "Flexible access" },
];
data.homePage.individualPlans = [
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
data.homePage.orgPlan = {
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
data.homePage.faqs = [
  {
    q: "What is Royal Tech Innovation LMS?",
    a: "Royal Tech Innovation LMS is a course-selling learning marketplace — browse categories, enroll online, learn at your pace, and earn certificates in AI, cloud, data, software, and digital innovation.",
  },
  {
    q: "What types of learning programs do you offer?",
    a: "Self-paced courses, Specializations, Professional Certificates, live workshops, and corporate team plans.",
  },
  {
    q: "Are the courses completely online?",
    a: "Yes. Courses, assessments, and certificates are available on the Royal Tech LMS anytime.",
  },
  {
    q: "Will I receive a certificate after course completion?",
    a: "Yes. Shareable certificates are issued when you complete required modules and assessments.",
  },
  {
    q: "Can organizations train employees on Royal Tech?",
    a: "Yes. Royal Tech for Teams includes seat management, progress analytics, and bulk upskilling programs.",
  },
];
data.homePage.newsletter = {
  heading: "Stay ahead of the skills curve",
  subtitle: "Get new course launches, Specializations, and career path updates in your inbox.",
  buttonText: "Subscribe",
};
data.homePage.unlock = {
  heading: "Start learning today",
  subtitle:
    "Join thousands of learners building AI, cloud, data, and software skills on Royal Tech Innovation LMS.",
  cta: "Explore courses",
  image: data.homePage.unlock?.image || "/q.png",
};

if (!data.aboutPage) data.aboutPage = {};
data.aboutPage.hero = {
  badge: "ABOUT ROYAL TECH INNOVATION LMS",
  heading: "Learn.",
  headingHighlight: "Build. Innovate.",
  subtitle:
    "Royal Tech Innovation LMS is a Coursera-style course marketplace helping individuals and teams master AI, cloud, data, software, and digital innovation — with enroll, learn, and certify in one place.",
  ctaPrimary: "Explore Courses",
  ctaSecondary: "Our Journey",
  heroImage: data.aboutPage.hero?.heroImage || "/Gemini_Generated_Image_mvf5i9mvf5i9mvf5.png",
};
data.aboutPage.mission = {
  heading: "To",
  headingHighlight: "Power Your Next Career Move",
  body: "At Royal Tech Innovation, we design courses like a marketplace — discover skills, compare programs, enroll securely, and learn online with progress tracking and certificates.",
  body2:
    "From AI and data science to cloud, cybersecurity, and product innovation, our catalog is built for learners who want outcomes — not just content libraries.",
};
data.aboutPage.whoWeAre = {
  ...(data.aboutPage.whoWeAre || {}),
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
};
data.aboutPage.cta = {
  heading: "Ready to start learning?",
  subtitle: "Browse the catalog and enroll in your next career skill today.",
  buttonText: "Explore Courses",
};

if (data.coursesPage?.hero) {
  data.coursesPage.hero = {
    ...data.coursesPage.hero,
    heading: data.coursesPage.hero.heading?.includes("Sustainable")
      ? "Explore career courses"
      : data.coursesPage.hero.heading || "Explore career courses",
    subtitle:
      "Browse Royal Tech Innovation’s Coursera-style catalog — AI, cloud, data, software, cybersecurity, and business innovation.",
  };
}

writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log(
  `Updated ${file}\nCategories: ${categories.length}\nCourses: ${managedCourses.length}`,
);
