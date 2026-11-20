import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Sparkles } from "lucide-react";
import { readAdminContent } from "@/lib/server/content-store";
import { defaultAboutPageConfig } from "@/lib/content-schema";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const adminContent = await readAdminContent();
  const cfg = adminContent.aboutPage ?? defaultAboutPageConfig;

  const highlights = cfg.highlights;
  const pillars = cfg.pillars;
  const features = cfg.features;
  const trainingTechnologyPoints = cfg.techPoints;
  const teamHierarchy = cfg.teamHierarchy;
  const testimonials = cfg.testimonials;
  const heroData = cfg.hero;
  const whoData = cfg.whoWeAre;
  const missionData = cfg.mission;
  const ctaData = cfg.cta;
  const impactStats = cfg.impactStats;
  const memberPhoto = (m: { name: string; photo: string }) =>
    m.photo || `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(m.name)}&backgroundColor=0070f0,00b7fd,0f172a&textColor=ffffff`;

  return (
    <div className="about-page min-h-screen bg-[#06080f] text-white">
      <main className="mx-auto w-full max-w-[1760px] px-4 py-6 md:px-6 xl:px-8">
        <section className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.05fr_1fr] lg:p-8">
            <article className="order-2 space-y-4 lg:order-1">
              <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                {heroData.badge}
              </p>
              <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                {heroData.heading}
                <br />
                <span className="text-cyan-300">{heroData.headingHighlight}</span>
              </h1>
              <p className="max-w-xl text-sm leading-7 text-gray-300">
                {heroData.subtitle}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-bold text-black"
                >
                  {heroData.ctaPrimary} <ArrowRight size={14} />
                </Link>
                <button className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-5 py-2.5 text-sm font-semibold">
                  {heroData.ctaSecondary}
                </button>
              </div>
              <div className="grid gap-2 pt-3 sm:grid-cols-2 xl:grid-cols-4">
                {highlights.map((h) => (
                  <div key={h.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-lg font-bold text-cyan-300">{h.value}</p>
                    <p className="text-xs text-gray-400">{h.label}</p>
                  </div>
                ))}
              </div>
            </article>
            <article className="order-1 relative min-h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-black/40 lg:order-2">
              <Image
                src={heroData.heroImage}
                alt="Digital future visual"
                fill
                className="object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#06080f] via-transparent to-transparent" />
            </article>
          </div>
        </section>

        <section className="about-who-we-are relative mt-4 overflow-hidden rounded-2xl border border-white/10">
          <div className="relative min-h-[360px] md:min-h-[440px]">
            <Image
              src={whoData.backgroundImage}
              alt="Team collaborating on digital learning"
              fill
              className="object-cover"
            />
            <div className="about-who-overlay-x absolute inset-0 bg-linear-to-r from-[#050811]/95 via-[#050811]/72 to-[#050811]/35" />
            <div className="about-who-overlay-y absolute inset-0 bg-linear-to-t from-[#050811]/85 via-transparent to-transparent" />

            <div className="relative z-10 grid min-h-[360px] gap-6 p-6 md:min-h-[440px] md:p-8 lg:grid-cols-[1.05fr_1.2fr]">
              <article className="about-who-content self-center">
                <p className="about-who-badge inline-flex rounded-full border border-cyan-300/30 bg-cyan-500/15 px-3 py-1 text-[11px] font-semibold text-cyan-200">
                  {whoData.badge}
                </p>
                <h2 className="about-who-title mt-3 text-4xl font-bold leading-tight">
                  {whoData.heading}
                  <br />
                  <span className="text-cyan-300">{whoData.headingHighlight}</span>
                </h2>
                <p className="about-who-description mt-3 max-w-xl text-sm leading-7 text-gray-300">
                  {whoData.subtitle}
                </p>
                <ul className="about-who-list mt-4 space-y-2 text-sm text-gray-200">
                  {whoData.bulletPoints.map((item) => (
                    <li key={item} className="about-who-list-item inline-flex items-center gap-2">
                      <Sparkles size={14} className="text-cyan-300" /> {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="grid content-end gap-3 sm:grid-cols-2">
                {pillars.map((p, idx) => (
                  <div key={p.title} className="rounded-2xl border border-white/15 bg-[#0a1120]/80 p-5 shadow-[0_0_30px_rgba(0,0,0,0.35)] backdrop-blur-xs">
                    <p className="inline-flex items-center gap-2 text-lg font-semibold text-white">
                      {idx === 0 ? (
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-cyan-400" />
                      ) : (
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      )}
                      {p.title}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-gray-300">{p.desc}</p>
                  </div>
                ))}
              </article>
            </div>
          </div>
        </section>

        <section className="about-mission-section mt-4 overflow-hidden rounded-2xl border border-slate-500/30 bg-linear-to-br from-[#1c2230] via-[#141924] to-[#0a0d14] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            <article className="about-mission-card rounded-2xl border border-slate-500/35 bg-black/25 p-5 md:p-6">
              <p className="about-mission-badge about-mission-badge-cyan inline-flex rounded-full border border-cyan-400/35 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-200">
                Our Mission
              </p>
              <h3 className="about-mission-heading mt-3 text-2xl font-bold leading-tight md:text-3xl">
                {missionData.heading} <span className="text-cyan-300">{missionData.headingHighlight}</span>
              </h3>
              <p className="mt-3 text-sm leading-7 text-gray-300">
                {missionData.body}
              </p>
              <p className="mt-3 text-sm leading-7 text-gray-300">
                {missionData.body2}
              </p>
            </article>

            <article className="about-mission-card rounded-2xl border border-slate-500/35 bg-black/25 p-5 md:p-6">
              <p className="about-mission-badge about-mission-badge-cyan inline-flex rounded-full border border-sky-400/35 bg-sky-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-200">
                Our Learning Platform
              </p>
              <p className="mt-3 text-sm leading-7 text-gray-300">
                Our learning technology relies on a strong &ldquo;Learning by Doing&rdquo; approach.
                We combine marketplace course pages, skilled instructors, and hands-on projects to create
                immersive learning experiences with measurable outcomes.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-200">
                {trainingTechnologyPoints.map((point) => (
                  <li key={point} className="about-mission-list-item flex items-start gap-2">
                    <Sparkles size={14} className="about-mission-icon mt-0.5 shrink-0 text-cyan-300" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-slate-500/30 bg-linear-to-b from-[#1c2230] to-[#0a0d14] p-5 md:p-7">
          <div className="text-center">
            <p className="mx-auto inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1 text-[11px] font-semibold tracking-wide text-cyan-200">
              AT A GLANCE
            </p>
            <h3 className="mt-3 text-3xl font-bold md:text-4xl">
              Built for learners who want <span className="text-cyan-300">real career outcomes</span>
            </h3>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-gray-300">
              A Coursera-style marketplace experience — browse domains, enroll online, learn at your pace, and earn shareable certificates.
            </p>
          </div>

          <div className="mt-6 grid gap-2 rounded-2xl border border-slate-500/30 bg-white/5 p-3 sm:grid-cols-2 xl:grid-cols-4">
            {highlights.map((h) => (
              <div key={h.label} className="rounded-xl border border-slate-500/30 bg-black/20 p-3">
                <Award className="h-5 w-5 text-cyan-300" />
                <p className="mt-1 text-2xl font-bold">{h.value}</p>
                <p className="text-xs text-gray-400">{h.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-5">
          <h3 className="text-3xl font-bold">
            Why Thousands <span className="text-cyan-300">Choose Royal Tech Innovation?</span>
          </h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold">{f.title}</p>
                <p className="mt-1 text-xs text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-5">
          <div className="mb-4">
            <h3 className="text-3xl font-bold">
              Meet Our <span className="text-cyan-300">Royal Tech Innovation Team</span>
            </h3>
            <p className="mt-2 text-sm text-gray-300">
              Our leadership and expert team is structured to deliver high-quality learning outcomes
              through strong coordination and domain excellence.
            </p>
          </div>
          <div className="space-y-3">
            <div className="mx-auto max-w-md rounded-xl border border-cyan-400/35 bg-linear-to-b from-cyan-500/15 to-transparent p-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">
                {teamHierarchy[0]?.level}
              </p>
              {teamHierarchy[0]?.members.map((m) => (
                <div key={m.name} className="mt-3 flex flex-col items-center">
                  <Image
                    unoptimized
                    src={memberPhoto(m)}
                    alt={m.name}
                    width={68}
                    height={68}
                    className="h-17 w-17 rounded-full border border-cyan-300/60 object-cover"
                  />
                  <p className="mt-2 text-base font-bold text-white">{m.name}</p>
                  {m.role ? <p className="mt-0.5 text-xs text-gray-300">{m.role}</p> : null}
                </div>
              ))}
            </div>

            {teamHierarchy.slice(1).map((tier, tierIdx) => (
              <div key={tier.level}>
                <div className="mx-auto h-6 w-px bg-cyan-300/40" />
                {tierIdx < teamHierarchy.length - 2 ? (
                  <div className="grid gap-3 md:grid-cols-2">
                    {tier.members.map((m) => (
                      <div key={m.name} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                        <div className="mx-auto mb-2 h-14 w-14 overflow-hidden rounded-full border border-cyan-300/60">
                          <Image unoptimized src={memberPhoto(m)} alt={m.name} width={56} height={56} className="h-full w-full object-cover" />
                        </div>
                        <p className="text-sm font-semibold text-white">{m.name}</p>
                        {m.role ? <p className="mt-1 text-xs text-gray-300">{m.role}</p> : null}
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">{tier.level}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">{tier.level}</p>
                    <div className="mt-3 grid gap-2 md:grid-cols-2 xl:grid-cols-4">
                      {tier.members.map((m) => (
                        <div key={m.name} className="rounded-lg border border-white/10 bg-black/20 p-3 text-center">
                          <div className="mx-auto mb-2 h-12 w-12 overflow-hidden rounded-full border border-cyan-300/60">
                            <Image unoptimized src={memberPhoto(m)} alt={m.name} width={48} height={48} className="h-full w-full object-cover" />
                          </div>
                          <p className="text-sm font-semibold text-white">{m.name}</p>
                          {m.role ? <p className="mt-1 text-xs text-gray-300">{m.role}</p> : null}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-5">
          <h3 className="text-3xl font-bold">
            Our Impact <span className="text-cyan-300">in Numbers</span>
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {impactStats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <Award className="h-5 w-5 text-cyan-300" />
                <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-3xl font-bold">
              What Our <span className="text-cyan-300">Learners Say</span>
            </h3>
            <button className="text-xs font-semibold text-cyan-200">View all reviews</button>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {testimonials.map((quote) => (
              <blockquote key={quote} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
                “{quote}”
              </blockquote>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-2xl border border-slate-500/30 bg-linear-to-r from-cyan-500/10 to-sky-500/10 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-2xl font-bold">{ctaData.heading}</p>
              <p className="text-sm text-gray-300">
                {ctaData.subtitle}
              </p>
            </div>
            <Link href="/courses" className="rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-bold text-black">
              {ctaData.buttonText}
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
