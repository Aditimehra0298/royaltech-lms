"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  BookOpen,
  CircleCheck,
  Globe,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import brandLogo from "@/logo-mark.png";
import {
  COMPANY_DISPLAY_NAME,
  COMPANY_LEGAL_NAME,
  SFT_ABOUT_BLURB,
  SFT_EMAILS,
  SFT_HEAD_OFFICE_ADDRESS,
  SFT_OFFICES,
  SFT_PHONE,
  SFT_SERVICES,
  SFT_SOCIAL,
} from "@/lib/contact-site-data";
import {
  SocialBrandIcon,
  SOCIAL_BRAND_BUTTON_CLASS,
  SOCIAL_BRAND_LABEL,
} from "@/components/SocialBrandIcon";
import { CountryFlagImg } from "@/components/CountryFlagImg";

export default function SiteFooter({ forceDarkChrome = false }: { forceDarkChrome?: boolean }) {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const useLightTheme = isLightTheme && !forceDarkChrome;
  const sectionShell = "mx-auto max-w-[1760px] px-4 md:px-6 xl:px-8";
  const footerShell = useLightTheme
    ? "site-footer relative z-20 border-t border-slate-300/60 bg-[#eef1f6]"
    : "site-footer relative z-20 border-t border-slate-500/30 bg-[#0a0d14]";
  const cardShell = useLightTheme
    ? "bg-linear-to-b from-[#f7f8fb] via-[#eef1f6] to-[#e4e8f0]"
    : "bg-linear-to-b from-[#1c2230] via-[#141924] to-[#0a0d14]";
  const headingTone = useLightTheme ? "text-[#0070f0]" : "text-[#7ccfff]";
  const textTone = useLightTheme ? "text-slate-600" : "text-slate-300";
  const statTone = useLightTheme ? "text-slate-700" : "text-slate-200";
  const dividerTone = useLightTheme ? "border-slate-300/70" : "border-slate-500/30";
  const copyrightTone = useLightTheme ? "text-slate-500" : "text-slate-400";
  const hoverTone = useLightTheme ? "hover:text-[#3b82c4]" : "hover:text-cyan-300";

  useEffect(() => {
    const syncTheme = () => {
      setIsLightTheme(document.documentElement.dataset.theme === "light");
    };
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const office = SFT_OFFICES[0];

  return (
    <footer className={footerShell}>
      <div className={`${sectionShell} ${useLightTheme ? "py-6" : "py-14"}`}>
        <div className={`${cardShell} p-1 md:p-2`}>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="lg:w-[28%]">
              <div className={`flex items-center gap-3 text-lg font-bold ${useLightTheme ? "text-slate-800" : "text-white"}`}>
                <Image
                  src={brandLogo}
                  alt={COMPANY_DISPLAY_NAME}
                  className="h-11 w-auto object-contain"
                  priority
                />
                <span className={useLightTheme ? "text-slate-800" : "text-white"}>
                  {COMPANY_DISPLAY_NAME}
                </span>
              </div>
              <p className={`mt-4 text-sm leading-relaxed ${textTone}`}>{SFT_ABOUT_BLURB}</p>
              <div className="mt-5">
                <p className={`text-xs font-bold uppercase tracking-[0.16em] ${headingTone}`}>Stay Connected</p>
                <div className="mt-3 flex gap-3">
                  <a
                    href={SFT_SOCIAL.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={SOCIAL_BRAND_LABEL.instagram}
                    title={SOCIAL_BRAND_LABEL.instagram}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-white shadow-[0_0_14px_rgba(238,42,123,0.45)] ${SOCIAL_BRAND_BUTTON_CLASS.instagram}`}
                  >
                    <SocialBrandIcon brand="instagram" size={18} />
                  </a>
                  <a
                    href={SFT_SOCIAL.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={SOCIAL_BRAND_LABEL.whatsapp}
                    title={SOCIAL_BRAND_LABEL.whatsapp}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-white shadow-[0_0_14px_rgba(37,211,102,0.45)] ${SOCIAL_BRAND_BUTTON_CLASS.whatsapp}`}
                  >
                    <SocialBrandIcon brand="whatsapp" size={18} />
                  </a>
                  <a
                    href={SFT_SOCIAL.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={SOCIAL_BRAND_LABEL.linkedin}
                    title={SOCIAL_BRAND_LABEL.linkedin}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-white shadow-[0_0_14px_rgba(10,102,194,0.45)] ${SOCIAL_BRAND_BUTTON_CLASS.linkedin}`}
                  >
                    <SocialBrandIcon brand="linkedin" size={18} />
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:w-[24%]">
              <h4 className={`text-sm font-bold uppercase tracking-[0.2em] ${headingTone}`}>Services</h4>
              <ul className={`mt-4 space-y-2 text-sm ${textTone}`}>
                {SFT_SERVICES.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={`transition-colors ${hoverTone}`}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:w-[28%]">
              <h4 className={`text-sm font-bold uppercase tracking-[0.2em] ${headingTone}`}>Get in Touch</h4>
              <div className={`mt-4 space-y-3 text-sm ${textTone}`}>
                {office ? (
                  <p className={`flex items-center gap-2.5 font-semibold ${useLightTheme ? "text-slate-800" : "text-white"}`}>
                    <CountryFlagImg
                      code={office.countryCode}
                      width={48}
                      className="h-5 w-7 rounded-sm border border-black/10 object-cover shadow-sm"
                    />
                    {office.country}
                  </p>
                ) : null}
                <p className="flex items-start gap-2 text-xs leading-relaxed">
                  <MapPin size={14} className={`mt-0.5 shrink-0 ${headingTone}`} />
                  <span>{SFT_HEAD_OFFICE_ADDRESS}</span>
                </p>
                <a href={`mailto:${SFT_EMAILS.info}`} className={`flex items-center gap-2 transition-colors ${hoverTone}`}>
                  <Mail size={14} className={headingTone} />
                  {SFT_EMAILS.info}
                </a>
                <a href={SFT_PHONE.href} className={`inline-flex items-center gap-2 transition-colors ${hoverTone}`}>
                  <Phone size={14} className={headingTone} />
                  {SFT_PHONE.display}
                </a>
              </div>
            </div>
          </div>

          <div className={`mt-8 flex flex-col gap-3 border-t ${dividerTone} pt-4 text-sm ${statTone} md:flex-row md:flex-wrap md:items-center md:justify-between`}>
            <div className="flex items-center gap-2"><Users size={16} className={headingTone} /> 50K+ Happy Learners</div>
            <div className="flex items-center gap-2"><BookOpen size={16} className={headingTone} /> 500+ Courses</div>
            <div className="flex items-center gap-2"><Globe size={16} className={headingTone} /> 30+ Countries</div>
            <div className="flex items-center gap-2"><CircleCheck size={16} className={headingTone} /> 100K+ Certificates</div>
            <div className="flex items-center gap-2"><ShieldCheck size={16} className={headingTone} /> 24/7 Learning Support</div>
          </div>
        </div>
      </div>
      <div className={`border-t ${dividerTone} py-5 text-center text-sm ${copyrightTone}`}>
        © {new Date().getFullYear()} {COMPANY_LEGAL_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
