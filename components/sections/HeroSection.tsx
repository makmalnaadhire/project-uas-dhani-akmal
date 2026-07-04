"use client";

import Link from "next/link";
import { useApp } from "@/components/providers/AppProvider";
import { useTranslation } from "@/components/providers/LanguageProvider";
import {
  Monitor,
  TrendingUp,
  Zap,
  ArrowRight,
  Laptop2,
  Cpu,
  Shield,
} from "lucide-react";

export default function HeroSection() {
  const { laptops } = useApp();
  const { t } = useTranslation();
  const totalLaptops = laptops.length;
  const brands = [...new Set(laptops.map((l) => l.merek))].length;
  const avgPrice = laptops.reduce((s, l) => s + l.harga_min, 0) / laptops.length;

  const stats = [
    { icon: <Laptop2 size={22} />, value: totalLaptops, label: t.statLaptops, color: "text-[#2dd4bf]", bg: "bg-[#2dd4bf]/10" },
    { icon: <Monitor size={22} />, value: brands, label: t.statBrands, color: "text-[#f97316]", bg: "bg-[#f97316]/10" },
    { icon: <TrendingUp size={22} />, value: `Rp ${(avgPrice / 1_000_000).toFixed(0)}jt`, label: t.statAvgPrice, color: "text-[#d946ef]", bg: "bg-[#d946ef]/10" },
    { icon: <Zap size={22} />, value: "AI", label: t.statAI, color: "text-[#06b6d4]", bg: "bg-[#06b6d4]/10" },
  ];

  const features = [
    { icon: <Monitor size={28} />, title: t.featureCatalog, desc: t.featureCatalogDesc, color: "#2dd4bf", href: "/catalog" },
    { icon: <Cpu size={28} />, title: t.featureRecommend, desc: t.featureRecommendDesc, color: "#f97316", href: "/recommendations" },
    { icon: <Shield size={28} />, title: t.featureEducation, desc: t.featureEducationDesc, color: "#d946ef", href: "/education" },
  ];

  return (
    <div className="pt-20">
      <section className="relative min-h-[85vh] flex items-center hero-grid overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#2dd4bf]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d946ef]/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f97316]/3 rounded-full blur-[150px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="slide-up">
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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#2dd4bf] to-[#4ade80] text-[#0f172a] font-semibold text-sm hover:shadow-[0_0_25px_rgba(45,212,191,0.4)] transition-all duration-300"
                >
                  {t.heroCta1}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/recommendations"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-all duration-300"
                >
                  {t.heroCta2}
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 slide-up" style={{ animationDelay: "0.2s" }}>
              {stats.map((s, i) => (
                <div key={i} className="glass rounded-xl p-5 border border-white/5 hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300 group">
                  <div className={`w-10 h-10 rounded-lg ${s.bg} ${s.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    {s.icon}
                  </div>
                  <div className="text-2xl font-bold font-[family-name:var(--font-display)]">{s.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-3">
            {t.featureTitle} <span className="text-gradient-hero">LaptopPintar</span>?
          </h2>
          <p className="text-slate-400 max-w-md mx-auto">
            {t.featureDesc}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 stagger">
          {features.map((f, i) => (
            <Link
              key={i}
              href={f.href}
              className="glass rounded-xl p-7 text-left border border-white/5 hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ backgroundColor: `${f.color}15`, color: f.color }}>
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 font-[family-name:var(--font-display)]">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative glass rounded-2xl p-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2dd4bf]/10 via-[#d946ef]/10 to-[#f97316]/10" />
          <div className="relative z-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] mb-4">
              {t.ctaTitle}
            </h2>
            <p className="text-slate-400 mb-6 max-w-lg mx-auto">
              {t.ctaDesc}
            </p>
            <div className="flex justify-center gap-3">
              <Link href="/recommendations" className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#2dd4bf] to-[#4ade80] text-[#0f172a] font-semibold text-sm hover:shadow-[0_0_25px_rgba(45,212,191,0.4)] transition-all duration-300">
                {t.ctaStart}
              </Link>
              <Link href="/education" className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-all duration-300">
                {t.ctaLearn}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
