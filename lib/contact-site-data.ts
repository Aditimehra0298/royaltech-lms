/** Legal / public brand name — Royal Tech Innovation LMS. */
export const COMPANY_LEGAL_NAME = "Royal Tech Innovation";
export const COMPANY_DISPLAY_NAME = "Royal Tech Innovation";

export const SFT_ABOUT_BLURB =
  "Royal Tech Innovation LMS is a Coursera-style learning marketplace where learners discover, enroll in, and complete career-ready courses in AI, cloud, data, software, and digital innovation — with certificates that help you grow.";

export const SFT_EMAILS = {
  info: "info@royaltechinnovation.com",
  bdm: "bdm@royaltechinnovation.com",
} as const;

export const SFT_PHONE = {
  display: "+91 86790 16505",
  href: "tel:+918679016505",
  whatsappHref: "https://wa.me/918679016505",
} as const;

export const SFT_SOCIAL = {
  instagram: "https://www.instagram.com/royaltechinnovation",
  whatsapp: SFT_PHONE.whatsappHref,
  linkedin: "https://www.linkedin.com/company/royaltechinnovation",
} as const;

export const SFT_QUICK_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Courses", href: "/courses" },
  { label: "Verify Certificate", href: "/certificates/verify" },
  { label: "Candidate Register", href: "/account?mode=signup" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Blogs", href: "/blogs" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Podcasts", href: "/podcasts" },
  { label: "Book a Call", href: "/book-a-call" },
] as const;

/** Service links shown in the site footer. */
export const SFT_SERVICES = [
  { label: "Website Development", href: "/courses?domain=web-development" },
  { label: "Software Development", href: "/courses?domain=software-development" },
  { label: "Mobile Apps", href: "/courses?domain=mobile-development" },
  { label: "Digital Marketing & SEO", href: "/courses?domain=digital-marketing" },
  { label: "UI/UX & Design", href: "/courses?domain=ui-ux-design" },
  { label: "IT Consulting", href: "/contact" },
] as const;

export const SFT_HEAD_OFFICE_ADDRESS =
  "Gate No. 5, Imperial Tower, CP 67, Punjab 160062";

/** CP67 / Imperial Tower, Airport Road, Mohali */
export const SFT_HEAD_OFFICE_COORDS = { lat: 30.677001, lng: 76.724088 } as const;

export const SFT_HEAD_OFFICE_MAP_QUERY =
  "Imperial Tower CP 67 Gate 5 Chandigarh International Airport Road Mohali Punjab 160062";

export const SFT_HEAD_OFFICE_MAP_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${SFT_HEAD_OFFICE_COORDS.lat},${SFT_HEAD_OFFICE_COORDS.lng}`
)}`;

/** OpenStreetMap embed — Google Maps iframes often show “This content is blocked”. */
export const SFT_HEAD_OFFICE_MAP_EMBED = (() => {
  const { lat, lng } = SFT_HEAD_OFFICE_COORDS;
  const d = 0.012;
  const bbox = `${lng - d},${lat - d},${lng + d},${lat + d}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${encodeURIComponent(`${lat},${lng}`)}`;
})();

export type SftOffice = {
  title: string;
  country: string;
  /** ISO 3166-1 alpha-2 for real flag image (e.g. IN, CA, AE). */
  countryCode: string;
  address: string;
  phone: string;
  phoneHref: string;
  image: string;
  mapHref: string;
};

export const SFT_OFFICES: SftOffice[] = [
  {
    title: "Head Office — India",
    country: "India",
    countryCode: "IN",
    address: SFT_HEAD_OFFICE_ADDRESS,
    phone: SFT_PHONE.display,
    phoneHref: SFT_PHONE.href,
    image: "/o1.png",
    mapHref: SFT_HEAD_OFFICE_MAP_HREF,
  },
];
