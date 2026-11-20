import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const file = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "admin-content.json");
const data = JSON.parse(readFileSync(file, "utf8"));

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
];

data.homePage = {
  ...data.homePage,
  faqs,
  faqPage: {
    badge: "HELP CENTER",
    title: "Answers that help you enroll with confidence",
    subtitle:
      "Everything about browsing, buying, learning, certificates, Plus plans, and teams — clear answers before you start.",
  },
  faqImage:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
};

if (data.coursesPage) {
  data.coursesPage.faqs = [
    {
      question: "How does the course catalog work?",
      answer:
        "Browse by domain, open a course page, compare syllabus and price, then enroll. Your course appears in My Learning immediately after checkout.",
    },
    {
      question: "Can I take multiple courses at once?",
      answer:
        "Yes. Enroll in as many individual courses as you like, or unlock the full catalog with Royal Tech Plus.",
    },
    {
      question: "Are certificates recognized?",
      answer:
        "Certificates verify completion of Royal Tech programs and are designed to be shared on LinkedIn and resumes. Employer recognition varies by role and industry.",
    },
  ];
}

writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log(`Homepage FAQs: ${faqs.length}`);
