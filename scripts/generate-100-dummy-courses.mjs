/**
 * Ensure catalog has at least 100 published dummy courses.
 * Keeps existing courses; fills the rest with generated marketplace courses.
 * Run: node scripts/generate-100-dummy-courses.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const TARGET = 100;
const file = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "admin-content.json");
const data = JSON.parse(readFileSync(file, "utf8"));

const covers = [
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1432888498266-38ffec3bdb41?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1626785774573-4b7993143468?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1544197150-b99a580b7e36?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
];

const instructors = [
  "Dr. Ananya Mehta",
  "Sneha Patel",
  "Karan Malhotra",
  "Mohit Arora",
  "Amit Verma",
  "Neha Kapoor",
  "Vikram Singh",
  "Priya Nair",
  "Meera Kapoor",
  "Arjun Mehta",
  "Rohit Das",
  "Nikhil Rao",
  "Sanjana Iyer",
  "Aisha Khan",
  "Ritika Sharma",
];

const levels = ["Beginner", "Intermediate", "Advanced"];
const badges = ["Popular", "New", "Bestseller", "Career path", "Skills path", "Hot", "Featured"];

/** Title templates per domain — enough unique combos to exceed 100 courses. */
const domainTemplates = {
  "artificial-intelligence": [
    "Generative AI for Business",
    "ChatGPT Productivity Masterclass",
    "AI for Product Managers",
    "Computer Vision Essentials",
    "NLP with Transformers",
    "AI Ethics & Responsible AI",
    "LangChain App Builder",
    "AI Agents & Automation",
    "Deep Learning Crash Course",
    "AI for Customer Support",
  ],
  "data-science": [
    "Statistics for Data Science",
    "Data Visualization Mastery",
    "Pandas Advanced Analytics",
    "A/B Testing for Analysts",
    "R Programming for Analytics",
    "Big Data with Spark Basics",
    "Time Series Forecasting",
    "Data Storytelling Workshop",
    "ETL Pipelines Essentials",
    "Business Intelligence Projects",
  ],
  "cloud-computing": [
    "Google Cloud Essentials",
    "Kubernetes for Beginners",
    "Terraform Infrastructure as Code",
    "Serverless on AWS",
    "Cloud Security Fundamentals",
    "Docker Containers Deep Dive",
    "Multi-Cloud Architecture",
    "Site Reliability Engineering Intro",
    "Cloud Cost Optimization",
    "Observability & Monitoring",
  ],
  "software-development": [
    "Node.js Backend Essentials",
    "TypeScript for Professionals",
    "Next.js Full-Stack Apps",
    "GraphQL API Design",
    "System Design Basics",
    "Clean Code Practices",
    "Git & GitHub Workflows",
    "Microservices Foundations",
    "Testing with Jest & Playwright",
    "Python Backend with FastAPI",
  ],
  cybersecurity: [
    "Network Security Basics",
    "Cloud Security Operations",
    "SOC Analyst Starter Path",
    "Application Security Essentials",
    "Identity & Access Management",
    "Incident Response Playbooks",
    "Penetration Testing Intro",
    "Secure Coding Practices",
    "Zero Trust Architecture",
    "Threat Intelligence Basics",
  ],
  "business-innovation": [
    "Startup Product Discovery",
    "Growth Product Management",
    "OKRs for Digital Teams",
    "Design Thinking Workshop",
    "Business Model Innovation",
    "Customer Interview Mastery",
    "Go-to-Market Strategy",
    "Innovation Leadership Lab",
    "Digital Transformation Basics",
    "Service Design Essentials",
  ],
  "digital-marketing": [
    "Google Ads Mastery",
    "Meta Ads Campaigns",
    "Email Marketing Automation",
    "Influencer Marketing Playbook",
    "Conversion Rate Optimization",
    "Marketing Analytics Dashboard",
    "Brand Content Systems",
    "YouTube Growth Strategy",
    "Affiliate Marketing Basics",
    "Landing Page Conversion Design",
  ],
  "finance-fintech": [
    "Personal Finance Mastery",
    "Investment Basics for Professionals",
    "Crypto Markets Literacy",
    "Risk Management Essentials",
    "Accounting for Non-Accountants",
    "Payment Systems Deep Dive",
    "Startup Fundraising Basics",
    "Credit Analysis Foundations",
    "Open Banking Products",
    "Financial Modeling Bootcamp",
  ],
  "mobile-development": [
    "iOS SwiftUI Essentials",
    "React Native Cross-Platform",
    "Mobile UI Patterns",
    "App Store Launch Playbook",
    "Mobile Performance Tuning",
    "Firebase for Mobile Apps",
    "Kotlin Multiplatform Intro",
    "Mobile Testing Strategies",
    "Push Notifications & Analytics",
    "Offline-first Mobile Apps",
  ],
  "blockchain-web3": [
    "NFTs & Digital Ownership",
    "DeFi Fundamentals",
    "Web3 Product Design",
    "Ethereum Developer Starter",
    "Crypto Wallet Security",
    "Tokenomics Essentials",
    "DAO Governance Basics",
    "Layer 2 Scaling Explained",
    "Smart Contract Security Intro",
    "Web3 Marketing Playbook",
  ],
  "project-management": [
    "Kanban for Delivery Teams",
    "Risk Management for PMs",
    "Stakeholder Communication",
    "Product Roadmapping for PMs",
    "Jira for Project Leaders",
    "Remote Team Delivery",
    "Waterfall to Agile Transition",
    "Program Management Basics",
    "Budgeting & Resource Planning",
    "Change Management Essentials",
  ],
  "graphic-design": [
    "Adobe Illustrator Essentials",
    "Photoshop for Digital Creators",
    "Motion Graphics Starter",
    "Social Media Design Systems",
    "Packaging Design Basics",
    "Typography Masterclass",
    "Color Theory for Designers",
    "Portfolio Design Workshop",
    "Presentation Design Pro",
    "Canva to Pro Design Path",
  ],
};

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function makeCourse(category, title, index) {
  const slugBase = slugify(title);
  const slug = `${slugBase}-${index}`;
  const image = covers[index % covers.length];
  const level = levels[index % levels.length];
  const hours = 5 + (index % 20);
  const mins = (index * 7) % 60;
  const duration = `${hours}h ${String(mins).padStart(2, "0")}m`;
  const rating = (4.5 + ((index % 5) * 0.1)).toFixed(1);
  const learners = (8000 + index * 317).toLocaleString("en-US");
  const priceNum = 39 + (index % 45);
  const oldPriceNum = priceNum + 30 + (index % 20);
  const instructor = instructors[index % instructors.length];
  const badge = badges[index % badges.length];

  return {
    slug,
    title,
    subtitle: `Practical ${title.toLowerCase()} course with projects, quizzes, and a shareable certificate.`,
    category,
    level,
    duration,
    rating,
    learners,
    price: `$${priceNum}.00`,
    oldPrice: `$${oldPriceNum}.00`,
    image,
    published: true,
    instructorName: instructor,
    learningFormat: "self-paced",
    pageBadge: badge,
    highlights: [
      "Job-ready curriculum",
      "Hands-on projects",
      "Quizzes & assessments",
      "Shareable certificate",
    ],
    hero: {
      aboutText: `A Coursera-style marketplace course on ${title}. Learn practical skills, complete projects, and earn a certificate on Royal Tech Innovation LMS.`,
      previewImage: image,
      backgroundImage: image,
      enrollButtonLabel: "Enroll now",
      studentsLabel: `${learners} students enrolled`,
      access: "Lifetime access",
      certificate: "Yes",
      courseIncludes: [
        `${duration} on-demand learning`,
        "Hands-on projects & quizzes",
        "Downloadable resources",
        "Shareable certificate",
      ],
    },
    overview: {
      learnOutcomes: [
        `Apply core concepts from ${title}`,
        "Complete practical assignments",
        "Build portfolio-ready work",
        "Earn a completion certificate",
      ],
      requirements: ["Computer with internet access", "Motivation to practice weekly"],
    },
    settings: { showInCatalog: true, enrollmentOpen: true, featured: index % 4 === 0, allowQa: true },
  };
}

const courses = Array.isArray(data.managedCourses) ? [...data.managedCourses] : [];
const have = new Set(courses.map((c) => c.slug));

let n = 0;
const categories = Object.keys(domainTemplates);
while (courses.length < TARGET) {
  for (const category of categories) {
    if (courses.length >= TARGET) break;
    const templates = domainTemplates[category];
    const title = templates[n % templates.length];
    // Make titles unique after first pass
    const uniqueTitle = n < templates.length ? title : `${title} — Part ${Math.floor(n / templates.length) + 1}`;
    const course = makeCourse(category, uniqueTitle, courses.length + 1);
    if (have.has(course.slug)) {
      course.slug = `${course.slug}-x${courses.length + 1}`;
    }
    have.add(course.slug);
    courses.push(course);
  }
  n += 1;
  if (n > 50) break; // safety
}

data.managedCourses = courses;

data.homePage = {
  ...data.homePage,
  hero: {
    ...data.homePage.hero,
    heading: data.homePage?.hero?.heading || "Learn without limits",
    headingHighlight: "100+ courses to explore",
    subtitle: `Browse ${courses.length}+ dummy marketplace courses across ${data.categories?.length || 12} domains — enroll, learn at your pace, and earn shareable certificates on Royal Tech Innovation LMS.`,
  },
  stats: [
    { value: "4.8★", label: "Avg. learner rating" },
    { value: `${courses.length}+`, label: "Courses in catalog" },
    { value: `${data.categories?.length || 12}`, label: "Skill domains" },
    { value: "25K+", label: "Learners building skills" },
    { value: "24/7", label: "Learn anywhere access" },
  ],
};

if (data.coursesPage?.hero) {
  data.coursesPage.hero = {
    ...data.coursesPage.hero,
    badgeText: `${courses.length}+ COURSES LIVE`,
    subtitle: `Explore ${courses.length}+ courses across AI, data, cloud, software, security, marketing, FinTech, mobile, Web3, project management, and design.`,
  };
}

writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log(`Total courses: ${data.managedCourses.length}`);
console.log(
  "By domain:",
  Object.fromEntries(
    [...new Set(data.managedCourses.map((c) => c.category))].map((cat) => [
      cat,
      data.managedCourses.filter((c) => c.category === cat).length,
    ]),
  ),
);
