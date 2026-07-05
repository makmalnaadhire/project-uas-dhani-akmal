"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { useTranslation } from "@/components/providers/LanguageProvider";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Monitor,
  TrendingUp,
  Zap,
  ArrowRight,
  Laptop2,
  Cpu,
  Shield,
  Sparkles,
  ChevronRight,
} from "lucide-react";

/* ── Animated Counter Hook ─────────────────────────────── */

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

/* ── Stat Card with Animated Counter ───────────────────── */

function StatCounter({
  icon,
  value,
  prefix,
  suffix,
  label,
  color,
  bg,
  delay,
}: {
  icon: React.ReactNode;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  color: string;
  bg: string;
  delay: number;
}) {
  const { count, ref } = useCountUp(value, 1500);

  return (
    <ScrollReveal direction="right" delay={delay}>
      <div
        ref={ref}
        className="glass rounded-xl p-5 border border-white/5 hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300 group"
      >
        <div
          className={`w-10 h-10 rounded-lg ${bg} ${color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
        >
          {icon}
        </div>
        <div className="text-2xl font-bold font-[family-name:var(--font-display)]">
          {prefix ?? ""}{count}{suffix ?? ""}
        </div>
        <div className="text-xs text-slate-500 mt-1">{label}</div>
      </div>
    </ScrollReveal>
  );
}

/* ── Feature Card with 3D Tilt + Neon Glow ─────────────── */

function FeatureCard({
  icon,
  title,
  desc,
  color,
  href,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
  href: string;
  delay: number;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      setTilt({
        x: ((y - centerY) / centerY) * -6,
        y: ((x - centerX) / centerX) * 6,
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <ScrollReveal direction="up" delay={delay}>
      <Link
        ref={cardRef}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="glass rounded-xl p-7 text-left border border-white/5 block group relative overflow-hidden transition-all duration-300"
        style={{
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)"}`,
          boxShadow: isHovered
            ? `0 0 25px ${color}25, 0 20px 40px rgba(0,0,0,0.4)`
            : "0 4px 12px rgba(0,0,0,0.2)",
          borderColor: isHovered ? `${color}40` : undefined,
        }}
      >
        {/* Neon glow overlay */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${color}12 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
            style={{ backgroundColor: `${color}15`, color }}
          >
            {icon}
          </div>
          <h3 className="text-lg font-semibold mb-2 font-[family-name:var(--font-display)]">
            {title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-4">{desc}</p>
          <div
            className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-300 group-hover:gap-2.5"
            style={{ color }}
          >
            Explore
            <ChevronRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

/* ── Floating Particle (decorative) ────────────────────── */

function Particle({
  className,
  delay,
}: {
  className: string;
  delay: number;
}) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}

/* ── Main Homepage ─────────────────────────────────────── */

export default function HomePage() {
  const { t } = useTranslation();

  const stats = useMemo(
    () => [
      {
        icon: <Laptop2 size={22} />,
        value: 180,
        prefix: "",
        suffix: "+",
        label: t.statLaptops,
        color: "text-[#2dd4bf]",
        bg: "bg-[#2dd4bf]/10",
      },
      {
        icon: <Monitor size={22} />,
        value: 5,
        prefix: "",
        suffix: "+",
        label: t.statBrands,
        color: "text-[#f97316]",
        bg: "bg-[#f97316]/10",
      },
      {
        icon: <TrendingUp size={22} />,
        value: 15,
        prefix: "Rp ",
        suffix: "jt",
        label: t.statAvgPrice,
        color: "text-[#d946ef]",
        bg: "bg-[#d946ef]/10",
      },
      {
        icon: <Zap size={22} />,
        value: 99,
        prefix: "",
        suffix: "%",
        label: t.statAI,
        color: "text-[#06b6d4]",
        bg: "bg-[#06b6d4]/10",
      },
    ],
    [t]
  );

  const features = useMemo(
    () => [
      {
        icon: <Monitor size={28} />,
        title: t.featureCatalog,
        desc: t.featureCatalogDesc,
        color: "#2dd4bf",
        href: "/catalog",
      },
      {
        icon: <Cpu size={28} />,
        title: t.featureRecommend,
        desc: t.featureRecommendDesc,
        color: "#f97316",
        href: "/recommendations",
      },
      {
        icon: <Shield size={28} />,
        title: t.featureEducation,
        desc: t.featureEducationDesc,
        color: "#d946ef",
        href: "/education",
      },
    ],
    [t]
  );

  return (
    <div className="pt-20">
      {/* ════════════════════════════════════════════════════
          HERO SECTION — Tech Grid + Ambient Glow + Particles
         ════════════════════════════════════════════════════ */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        {/* Digital mesh grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Ambient pulsing glow orbs */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-[#2dd4bf]/6 rounded-full blur-[130px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d946ef]/5 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f97316]/3 rounded-full blur-[160px] animate-pulse" style={{ animationDelay: "2s" }} />

        {/* Soft pulsing aura behind heading */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[200px] bg-[#2dd4bf]/4 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "0.5s" }} />

        {/* Floating particles */}
        <Particle
          className="w-1.5 h-1.5 bg-[#2dd4bf]/40 top-[15%] left-[20%] animate-bounce"
          delay={0}
        />
        <Particle
          className="w-1 h-1 bg-[#d946ef]/30 top-[25%] right-[15%] animate-bounce"
          delay={300}
        />
        <Particle
          className="w-2 h-2 bg-[#f97316]/20 bottom-[30%] left-[30%] animate-bounce"
          delay={600}
        />
        <Particle
          className="w-1 h-1 bg-[#06b6d4]/30 top-[60%] right-[25%] animate-bounce"
          delay={900}
        />
        <Particle
          className="w-1.5 h-1.5 bg-[#2dd4bf]/25 bottom-[20%] right-[40%] animate-bounce"
          delay={1200}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Text */}
            <ScrollReveal direction="left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-pulse" />
                {t.heroBadge}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] leading-tight mb-6">
                {t.heroTitle1}{" "}
                <span className="text-gradient-hero">{t.heroTitle2}</span>{" "}
                {t.heroTitle3}
              </h1>
              <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
                {t.heroDesc}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/catalog"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#2dd4bf] to-[#4ade80] text-[#0f172a] font-semibold text-sm hover:shadow-[0_0_25px_rgba(45,212,191,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {t.heroCta1}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/recommendations"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {t.heroCta2}
                </Link>
              </div>
            </ScrollReveal>

            {/* Right: Animated Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <StatCounter
                  key={i}
                  icon={s.icon}
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                  color={s.color}
                  bg={s.bg}
                  delay={i * 100}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FEATURES SECTION — 3D Tilt + Neon Glow Cards
         ════════════════════════════════════════════════════ */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-3">
              {t.featureTitle}{" "}
              <span className="text-gradient-hero">LaptopPintar</span>?
            </h2>
            <p className="text-slate-400 max-w-md mx-auto">{t.featureDesc}</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard
              key={i}
              icon={f.icon}
              title={f.title}
              desc={f.desc}
              color={f.color}
              href={f.href}
              delay={i * 150}
            />
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          HOW IT WORKS — Staggered Scroll Reveal
         ════════════════════════════════════════════════════ */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-3">
              <span className="text-gradient-mint">{t.recTitle}</span>{" "}
              {t.recSubtitle}?
            </h2>
            <p className="text-slate-400 max-w-md mx-auto">{t.recDesc}</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: t.recStepNeeds,
              desc: t.recNeedDesc,
              color: "#2dd4bf",
              icon: <Sparkles size={22} />,
            },
            {
              step: "02",
              title: t.recStepBudget,
              desc: t.recBudgetDesc,
              color: "#f97316",
              icon: <TrendingUp size={22} />,
            },
            {
              step: "03",
              title: t.recStepCondition,
              desc: t.recCondDesc,
              color: "#d946ef",
              icon: <Shield size={22} />,
            },
          ].map((s, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 150}>
              <div className="glass rounded-xl p-7 border border-white/5 hover:border-white/15 transition-all duration-300 group relative overflow-hidden">
                {/* Step number watermark */}
                <div
                  className="absolute top-3 right-5 text-6xl font-black font-[family-name:var(--font-display)] opacity-[0.04] select-none transition-opacity group-hover:opacity-[0.08]"
                  style={{ color: s.color }}
                >
                  {s.step}
                </div>

                <div className="relative z-10">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${s.color}15`, color: s.color }}
                  >
                    {s.icon}
                  </div>
                  <div
                    className="text-[10px] font-bold uppercase tracking-widest mb-2"
                    style={{ color: s.color }}
                  >
                    {t.recStep} {s.step}
                  </div>
                  <h3 className="text-base font-semibold mb-2 font-[family-name:var(--font-display)]">
                    {s.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          CTA SECTION — Gradient Glow
         ════════════════════════════════════════════════════ */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="relative glass rounded-2xl p-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2dd4bf]/10 via-[#d946ef]/10 to-[#f97316]/10" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px)] bg-[size:20px_20px]" />
            <div className="relative z-10 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] mb-4">
                {t.ctaTitle}
              </h2>
              <p className="text-slate-400 mb-6 max-w-lg mx-auto">
                {t.ctaDesc}
              </p>
              <div className="flex justify-center gap-3">
                <Link
                  href="/recommendations"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#2dd4bf] to-[#4ade80] text-[#0f172a] font-semibold text-sm hover:shadow-[0_0_25px_rgba(45,212,191,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {t.ctaStart}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/education"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {t.ctaLearn}
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
