/**
 * Add more skill domains + starter courses.
 * Run: node scripts/add-more-domains.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const file = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "admin-content.json");
const data = JSON.parse(readFileSync(file, "utf8"));

const newCategories = [
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    subtitle: "SEO · Ads · Growth",
    description: "SEO, social ads, analytics, and growth marketing for modern brands.",
    isActive: true,
    isFeatured: true,
    isUppercase: false,
    isBold: true,
    tone: "emerald",
    image:
      "https://images.unsplash.com/photo-1432888498266-38ffec3bdb41?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "finance-fintech",
    title: "Finance & FinTech",
    subtitle: "Markets · Payments · Analysis",
    description: "Financial analysis, FinTech products, and digital payments skills.",
    isActive: true,
    isFeatured: false,
    isUppercase: false,
    isBold: true,
    tone: "blue",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "mobile-development",
    title: "Mobile Development",
    subtitle: "iOS · Android · Flutter",
    description: "Build mobile apps for iOS and Android with modern frameworks.",
    isActive: true,
    isFeatured: true,
    isUppercase: false,
    isBold: true,
    tone: "violet",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "blockchain-web3",
    title: "Blockchain & Web3",
    subtitle: "Crypto · Smart Contracts",
    description: "Blockchain fundamentals, smart contracts, and Web3 product skills.",
    isActive: true,
    isFeatured: false,
    isUppercase: false,
    isBold: true,
    tone: "amber",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "project-management",
    title: "Project Management",
    subtitle: "Agile · Scrum · Delivery",
    description: "Agile, Scrum, and delivery frameworks for modern project leaders.",
    isActive: true,
    isFeatured: false,
    isUppercase: false,
    isBold: false,
    tone: "blue",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    subtitle: "Brand · Visual · Creative",
    description: "Brand systems, visual design, and creative tools for digital products.",
    isActive: true,
    isFeatured: false,
    isUppercase: false,
    isBold: true,
    tone: "violet",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b7993143468?auto=format&fit=crop&w=1200&q=80",
  },
];

function course(row) {
  return {
    ...row,
    published: true,
    learningFormat: "self-paced",
    hero: {
      aboutText: row.about,
      previewImage: row.image,
      backgroundImage: row.image,
      enrollButtonLabel: "Enroll now",
      studentsLabel: `${row.learners} students enrolled`,
      access: "Lifetime access",
      certificate: "Yes",
      courseIncludes: [
        `${row.duration} on-demand learning`,
        "Hands-on projects & quizzes",
        "Downloadable resources",
        "Shareable certificate",
      ],
    },
    overview: {
      learnOutcomes: row.outcomes,
      requirements: row.requirements || ["Computer with internet access", "Motivation to practice weekly"],
    },
    highlights: row.highlights,
    settings: { showInCatalog: true, enrollmentOpen: true, featured: true, allowQa: true },
  };
}

const newCourses = [
  course({
    slug: "digital-marketing-essentials",
    title: "Digital Marketing Essentials",
    subtitle: "Master SEO, social ads, content funnels, and growth analytics.",
    category: "digital-marketing",
    level: "Beginner",
    duration: "9h 20m",
    rating: "4.7",
    learners: "28,450",
    price: "$49.00",
    oldPrice: "$84.00",
    image:
      "https://images.unsplash.com/photo-1432888498266-38ffec3bdb41?auto=format&fit=crop&w=1200&q=80",
    instructorName: "Meera Kapoor",
    pageBadge: "Growth",
    about: "A Coursera-style marketing starter covering channels, funnels, and measurement for modern brands.",
    highlights: ["SEO basics", "Paid social ads", "Content funnels", "Campaign analytics"],
    outcomes: ["Plan a channel mix", "Run basic campaigns", "Track ROI", "Optimize creatives"],
  }),
  course({
    slug: "seo-content-strategy",
    title: "SEO & Content Strategy",
    subtitle: "Rank higher with keyword research, on-page SEO, and content systems.",
    category: "digital-marketing",
    level: "Intermediate",
    duration: "8h 10m",
    rating: "4.8",
    learners: "17,220",
    price: "$54.00",
    oldPrice: "$89.00",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    instructorName: "Meera Kapoor",
    pageBadge: "Popular",
    about: "Build an SEO content engine — research, briefs, on-page optimization, and performance reporting.",
    highlights: ["Keyword research", "On-page SEO", "Content briefs", "Search analytics"],
    outcomes: ["Find high-intent keywords", "Write SEO briefs", "Optimize pages", "Report growth"],
  }),
  course({
    slug: "fintech-fundamentals",
    title: "FinTech Fundamentals",
    subtitle: "Understand digital payments, banking tech, and FinTech product models.",
    category: "finance-fintech",
    level: "Beginner",
    duration: "7h 45m",
    rating: "4.6",
    learners: "14,880",
    price: "$52.00",
    oldPrice: "$86.00",
    image:
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff36?auto=format&fit=crop&w=1200&q=80",
    instructorName: "Arjun Mehta",
    pageBadge: "New",
    about: "Learn how FinTech products work — payments rails, risk, compliance basics, and product strategy.",
    highlights: ["Payments ecosystem", "Digital banking", "Risk & compliance intro", "Product case studies"],
    outcomes: ["Map FinTech value chains", "Explain payment flows", "Spot product opportunities", "Discuss risk basics"],
  }),
  course({
    slug: "financial-analysis-excel",
    title: "Financial Analysis with Excel",
    subtitle: "Build models, ratios, and forecasts used by analysts every day.",
    category: "finance-fintech",
    level: "Intermediate",
    duration: "10h 00m",
    rating: "4.7",
    learners: "20,110",
    price: "$59.00",
    oldPrice: "$99.00",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    instructorName: "Arjun Mehta",
    pageBadge: "Career path",
    about: "Practical Excel financial analysis for aspiring analysts — statements, ratios, and forecasting.",
    highlights: ["Financial statements", "Ratio analysis", "Forecast models", "Dashboard summaries"],
    outcomes: ["Analyze statements", "Build ratio packs", "Create forecasts", "Present insights"],
  }),
  course({
    slug: "flutter-mobile-apps",
    title: "Flutter Mobile App Development",
    subtitle: "Build cross-platform iOS and Android apps with Flutter and Dart.",
    category: "mobile-development",
    level: "Beginner",
    duration: "16h 30m",
    rating: "4.8",
    learners: "22,640",
    price: "$69.00",
    oldPrice: "$119.00",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    instructorName: "Rohit Das",
    pageBadge: "Bestseller",
    about: "Ship your first cross-platform mobile apps with Flutter UI, state, and API integration.",
    highlights: ["Dart & Flutter UI", "Navigation", "API integration", "Publish-ready project"],
    outcomes: ["Build Flutter UIs", "Manage app state", "Call REST APIs", "Ship a demo app"],
  }),
  course({
    slug: "android-kotlin-essentials",
    title: "Android Development with Kotlin",
    subtitle: "Create native Android apps with Kotlin, Jetpack, and modern architecture.",
    category: "mobile-development",
    level: "Intermediate",
    duration: "14h 00m",
    rating: "4.7",
    learners: "15,930",
    price: "$72.00",
    oldPrice: "$124.00",
    image:
      "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=1200&q=80",
    instructorName: "Rohit Das",
    pageBadge: "New",
    about: "A practical Android path covering Kotlin, screens, architecture basics, and a portfolio app.",
    highlights: ["Kotlin essentials", "Jetpack components", "App architecture", "Portfolio project"],
    outcomes: ["Write Kotlin apps", "Build multi-screen flows", "Use Jetpack tools", "Ship an Android demo"],
  }),
  course({
    slug: "blockchain-fundamentals",
    title: "Blockchain Fundamentals",
    subtitle: "Learn how blockchains, wallets, and decentralized apps actually work.",
    category: "blockchain-web3",
    level: "Beginner",
    duration: "8h 00m",
    rating: "4.6",
    learners: "13,470",
    price: "$55.00",
    oldPrice: "$92.00",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
    instructorName: "Nikhil Rao",
    pageBadge: "Web3",
    about: "Clear, practical blockchain literacy for builders and business learners entering Web3.",
    highlights: ["How blockchains work", "Wallets & keys", "Consensus basics", "DApp overview"],
    outcomes: ["Explain blockchain clearly", "Use a wallet safely", "Map Web3 components", "Evaluate use cases"],
  }),
  course({
    slug: "smart-contracts-solidity",
    title: "Smart Contracts with Solidity",
    subtitle: "Write, test, and deploy basic smart contracts for Web3 products.",
    category: "blockchain-web3",
    level: "Intermediate",
    duration: "12h 15m",
    rating: "4.7",
    learners: "9,860",
    price: "$79.00",
    oldPrice: "$129.00",
    image:
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=1200&q=80",
    instructorName: "Nikhil Rao",
    pageBadge: "Builder",
    about: "Hands-on Solidity for learners ready to build and deploy simple smart contracts.",
    highlights: ["Solidity basics", "Contract testing", "Deploy workflows", "Security checklist"],
    outcomes: ["Write Solidity contracts", "Test core logic", "Deploy to a testnet", "Spot common risks"],
    requirements: ["Basic programming comfort", "Blockchain Fundamentals recommended"],
  }),
  course({
    slug: "agile-scrum-mastery",
    title: "Agile & Scrum Mastery",
    subtitle: "Run sprints, ceremonies, and delivery systems that actually ship value.",
    category: "project-management",
    level: "Beginner",
    duration: "7h 30m",
    rating: "4.8",
    learners: "24,510",
    price: "$47.00",
    oldPrice: "$79.00",
    image:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
    instructorName: "Sanjana Iyer",
    pageBadge: "Popular",
    about: "Become confident with Agile and Scrum — ceremonies, backlog quality, and team delivery cadence.",
    highlights: ["Scrum ceremonies", "Backlog refinement", "Sprint planning", "Delivery metrics"],
    outcomes: ["Facilitate ceremonies", "Write better backlog items", "Plan sprints", "Improve team flow"],
  }),
  course({
    slug: "pmp-exam-prep-essentials",
    title: "PMP Exam Prep Essentials",
    subtitle: "Core project management concepts and exam-style practice for aspiring PMPs.",
    category: "project-management",
    level: "Intermediate",
    duration: "11h 00m",
    rating: "4.7",
    learners: "18,340",
    price: "$69.00",
    oldPrice: "$115.00",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    instructorName: "Sanjana Iyer",
    pageBadge: "Career path",
    about: "A focused PMP-oriented essentials course covering process groups, domains, and practice questions.",
    highlights: ["PM domains", "Process groups", "Practice questions", "Study plan"],
    outcomes: ["Recall PM frameworks", "Apply process thinking", "Practice exam style", "Build a study plan"],
  }),
  course({
    slug: "brand-identity-design",
    title: "Brand Identity Design",
    subtitle: "Create logos, color systems, and brand kits for digital products.",
    category: "graphic-design",
    level: "Beginner",
    duration: "9h 00m",
    rating: "4.8",
    learners: "16,780",
    price: "$52.00",
    oldPrice: "$88.00",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b7993143468?auto=format&fit=crop&w=1200&q=80",
    instructorName: "Aisha Khan",
    pageBadge: "Creative",
    about: "Design brand identities with process, visual systems, and a portfolio-ready brand kit.",
    highlights: ["Logo exploration", "Color & type systems", "Brand guidelines", "Portfolio kit"],
    outcomes: ["Define brand direction", "Design logo marks", "Build a visual system", "Present a brand kit"],
  }),
  course({
    slug: "figma-for-designers",
    title: "Figma for Digital Designers",
    subtitle: "Design screens, components, and prototypes in Figma like a pro.",
    category: "graphic-design",
    level: "Beginner",
    duration: "8h 40m",
    rating: "4.9",
    learners: "27,960",
    price: "$49.00",
    oldPrice: "$82.00",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1200&q=80",
    instructorName: "Aisha Khan",
    pageBadge: "Bestseller",
    about: "Learn Figma workflows used by product and marketing design teams — components, auto-layout, and prototypes.",
    highlights: ["Components & variants", "Auto Layout", "Prototyping", "Handoff basics"],
    outcomes: ["Design in Figma", "Build component libraries", "Prototype flows", "Prepare developer handoff"],
  }),
];

const existingSlugs = new Set((data.categories || []).map((c) => c.slug));
for (const cat of newCategories) {
  if (!existingSlugs.has(cat.slug)) data.categories.push(cat);
}

const existingCourseSlugs = new Set((data.managedCourses || []).map((c) => c.slug));
for (const c of newCourses) {
  if (!existingCourseSlugs.has(c.slug)) data.managedCourses.push(c);
}

data.homePage = {
  ...data.homePage,
  hero: {
    ...data.homePage.hero,
    heading: "Learn without limits",
    headingHighlight: "Master more career domains",
    subtitle: `Royal Tech Innovation LMS now spans ${data.categories.length} domains and ${data.managedCourses.length}+ courses — AI, data, cloud, software, security, marketing, FinTech, mobile, Web3, project management, and design.`,
  },
  stats: [
    { value: "4.8★", label: "Avg. learner rating" },
    { value: `${data.managedCourses.length}+`, label: "Career courses live" },
    { value: `${data.categories.length}`, label: "Skill domains" },
    { value: "25K+", label: "Learners building skills" },
    { value: "24/7", label: "Learn anywhere access" },
  ],
};

data.categoryPages = {
  ...(data.categoryPages || {}),
  "digital-marketing": {
    heroTitle: "Digital Marketing",
    heroSubtitle: "SEO, ads, content, and growth analytics — enroll and build campaign-ready skills.",
  },
  "finance-fintech": {
    heroTitle: "Finance & FinTech",
    heroSubtitle: "Financial analysis and FinTech product skills for modern finance careers.",
  },
  "mobile-development": {
    heroTitle: "Mobile Development",
    heroSubtitle: "Build iOS and Android apps with Flutter and Kotlin career paths.",
  },
  "blockchain-web3": {
    heroTitle: "Blockchain & Web3",
    heroSubtitle: "Blockchain literacy and Solidity smart-contract skills for builders.",
  },
  "project-management": {
    heroTitle: "Project Management",
    heroSubtitle: "Agile, Scrum, and PMP-oriented essentials for delivery leaders.",
  },
  "graphic-design": {
    heroTitle: "Graphic Design",
    heroSubtitle: "Brand identity and Figma skills for digital creatives.",
  },
};

if (data.coursesPage?.hero) {
  data.coursesPage.hero = {
    ...data.coursesPage.hero,
    badgeText: `${data.managedCourses.length}+ COURSES LIVE`,
    subtitle: `Browse ${data.categories.length} domains — AI, data, cloud, software, security, marketing, FinTech, mobile, Web3, project management, and design.`,
  };
}

writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log("Domains:", data.categories.map((c) => c.title).join(" | "));
console.log("Courses:", data.managedCourses.length);
