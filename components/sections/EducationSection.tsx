"use client";

import { useState } from "react";
import Link from "next/link";
import type { Laptop } from "@/lib/types";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { articles } from "@/lib/articles";
import {
  ChevronDown,
  BookOpen,
  HelpCircle,
  BookMarked,
  Calculator,
  Clock,
  Cpu,
  HardDrive,
  MemoryStick,
  Monitor,
  Battery,
  Wifi,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Timer,
  Eye,
  Package,
  BatteryFull,
  Shield,
} from "lucide-react";

interface Props {
  laptops: Laptop[];
}

function Accordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="text-sm font-medium text-slate-900 dark:text-white pr-4">
          {q}
        </span>
        <ChevronDown
          size={16}
          className={`text-[#d946ef] shrink-0 chevron-rotate ${open ? "open" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-white/5 pt-4 slide-up">
          {a}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Estimasi Tab — 2-column dashboard layout
   ───────────────────────────────────────────────────────── */
function EstimasiTab({
  brands,
  estBrand,
  setEstBrand,
  estYear,
  setEstYear,
  estOrigPrice,
  setEstOrigPrice,
  estimateValue,
  t,
}: {
  brands: string[];
  estBrand: string;
  setEstBrand: (v: string) => void;
  estYear: number;
  setEstYear: (v: number) => void;
  estOrigPrice: number;
  setEstOrigPrice: (v: number) => void;
  estimateValue: () => number;
  t: Record<string, string>;
}) {
  const tips = [t.eduTip1, t.eduTip2, t.eduTip3, t.eduTip4, t.eduTip5, t.eduTip6];

  const yearThresholds = [
    { label: t.eduRet1Label, retention: 75, desc: t.eduRet1Desc },
    { label: t.eduRet2Label, retention: 60, desc: t.eduRet2Desc },
    { label: t.eduRet3Label, retention: 45, desc: t.eduRet3Desc },
    { label: t.eduRet4Label, retention: 30, desc: t.eduRet4Desc },
    { label: t.eduRet5Label, retention: 15, desc: t.eduRet5Desc },
  ];

  const statusLabel =
    estYear >= 2023
      ? t.eduEstNew
      : estYear >= 2021
        ? t.eduEstRecent
        : estYear >= 2019
          ? t.eduEstMid
          : t.eduEstOld;

  /* Dynamic market metrics based on year */
  const demandPct = estYear >= 2023 ? 85 : estYear >= 2021 ? 70 : estYear >= 2019 ? 45 : 20;
  const demandLabel = demandPct >= 70 ? "Tinggi" : demandPct >= 40 ? "Sedang" : "Rendah";
  const sellSpeed = estYear >= 2023 ? t.eduMarketSpeedVal : estYear >= 2021 ? "5-7 hari" : estYear >= 2019 ? "1-2 minggu" : "Bulan+";

  const factors = [
    { icon: <Eye size={18} />, title: t.eduFactor1Title, desc: t.eduFactor1Desc, color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { icon: <Package size={18} />, title: t.eduFactor2Title, desc: t.eduFactor2Desc, color: "text-amber-400", bg: "bg-amber-500/10" },
    { icon: <BatteryFull size={18} />, title: t.eduFactor3Title, desc: t.eduFactor3Desc, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { icon: <Shield size={18} />, title: t.eduFactor4Title, desc: t.eduFactor4Desc, color: "text-indigo-400", bg: "bg-indigo-500/10" },
  ];

  /* Dynamic depreciation simulation — retention % at Year 1 / 3 / 5 from purchase */
  const simData = [
    { label: t.eduSimYear1, pct: estYear >= 2023 ? 85 : estYear >= 2021 ? 75 : estYear >= 2019 ? 65 : 50 },
    { label: t.eduSimYear3, pct: estYear >= 2023 ? 60 : estYear >= 2021 ? 50 : estYear >= 2019 ? 35 : 25 },
    { label: t.eduSimYear5, pct: estYear >= 2023 ? 40 : estYear >= 2021 ? 30 : estYear >= 2019 ? 20 : 10 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto pt-6">
      {/* ── Left Column: Calculator Controls ── */}
      <div className="bg-zinc-900/40 backdrop-blur-md border border-slate-800/60 p-6 rounded-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#d946ef]/15 flex items-center justify-center">
            <Calculator size={20} className="text-[#d946ef]" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-[family-name:var(--font-display)] text-white">
              {t.eduEstTitle}
            </h3>
            <p className="text-[11px] text-slate-500">{t.eduTabEstimate}</p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Brand Selector */}
          <div>
            <label className="text-[11px] text-slate-400 mb-2 block font-medium uppercase tracking-wider">
              {t.eduEstBrand}
            </label>
            <div className="relative">
              <select
                value={estBrand}
                onChange={(e) => setEstBrand(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#0f172a]/80 border border-slate-700/60 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#d946ef]/50 transition-all appearance-none cursor-pointer"
              >
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
              />
            </div>
          </div>

          {/* Purchase Year Slider */}
          <div>
            <label className="text-[11px] text-slate-400 mb-2 block font-medium uppercase tracking-wider">
              {t.eduEstYear}
            </label>
            <input
              type="range"
              min={2017}
              max={2025}
              value={estYear}
              onChange={(e) => setEstYear(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{ accentColor: "#d946ef" }}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-[10px] text-slate-600 font-mono">2017</span>
              <span className="text-sm text-[#d946ef] font-bold font-[family-name:var(--font-display)] bg-[#d946ef]/10 px-3 py-0.5 rounded-full">
                {estYear}
              </span>
              <span className="text-[10px] text-slate-600 font-mono">2025</span>
            </div>
          </div>

          {/* Original Price Input */}
          <div>
            <label className="text-[11px] text-slate-400 mb-2 block font-medium uppercase tracking-wider">
              {t.eduEstPrice}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500 font-medium">
                Rp
              </span>
              <input
                type="number"
                value={estOrigPrice}
                onChange={(e) => setEstOrigPrice(Number(e.target.value))}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#0f172a]/80 border border-slate-700/60 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#d946ef]/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Depreciation Simulation */}
        <div className="border-t border-slate-800/80 pt-6 mt-6">
          <h4 className="text-sm font-bold text-white font-[family-name:var(--font-display)] mb-4 flex items-center gap-2">
            <BarChart3 size={16} className="text-[#d946ef]" />
            {t.eduSimTitle}
          </h4>
          <div className="space-y-4">
            {simData.map((s, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-slate-400 font-medium">{s.label}</span>
                  <span className="text-xs font-bold text-white">{s.pct}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${s.pct}%`,
                      background:
                        s.pct >= 60
                          ? "linear-gradient(to right, #10b981, #34d399)"
                          : s.pct >= 35
                            ? "linear-gradient(to right, #f59e0b, #fbbf24)"
                            : "linear-gradient(to right, #ef4444, #f87171)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Column: Result + Market + Factors ── */}
      <div className="flex flex-col gap-5">
        {/* Price Result */}
        <div className="bg-zinc-900/40 backdrop-blur-md border border-[#d946ef]/20 p-6 rounded-2xl text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#d946ef]/8 via-transparent to-[#ec4899]/5 pointer-events-none" />
          <div className="relative">
            <p className="text-[11px] text-slate-400 mb-3 uppercase tracking-widest font-medium">
              {t.eduEstResult}
            </p>
            <p className="text-4xl sm:text-5xl font-black font-[family-name:var(--font-display)] text-gradient-fuchsia leading-none mb-3">
              Rp {estimateValue().toLocaleString("id-ID")}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d946ef]/10 border border-[#d946ef]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d946ef] animate-pulse" />
              <span className="text-xs text-[#d946ef] font-medium">{statusLabel}</span>
            </div>
          </div>
        </div>

        {/* Market Condition & Trends */}
        <div className="bg-zinc-900/40 backdrop-blur-md border border-slate-800/80 p-5 rounded-2xl">
          <h4 className="text-sm font-bold text-white font-[family-name:var(--font-display)] mb-4 flex items-center gap-2">
            <BarChart3 size={16} className="text-[#d946ef]" />
            {t.eduMarketTitle}
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {/* Demand Bar */}
            <div>
              <p className="text-[11px] text-slate-500 mb-2">{t.eduMarketDemand}</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${demandPct}%`,
                      background: `linear-gradient(to right, #d946ef, #ec4899)`,
                    }}
                  />
                </div>
                <span className="text-sm font-bold text-white">{demandPct}%</span>
              </div>
              <span className="text-[11px] text-[#d946ef] font-medium mt-1 block">{demandLabel}</span>
            </div>
            {/* Sell Speed */}
            <div>
              <p className="text-[11px] text-slate-500 mb-2">{t.eduMarketSpeed}</p>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#d946ef]/10 border border-[#d946ef]/20">
                <Timer size={14} className="text-[#d946ef] shrink-0" />
                <span className="text-sm font-bold text-[#d946ef]">{sellSpeed}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Value Depreciation Factors — 2x2 Grid */}
        <div className="bg-zinc-900/40 backdrop-blur-md border border-slate-800/80 p-5 rounded-2xl">
          <h4 className="text-sm font-bold text-white font-[family-name:var(--font-display)] mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-[#d946ef]" />
            {t.eduFactorsTitle}
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {factors.map((f, i) => (
              <div key={i} className="bg-zinc-900/40 border border-slate-800/80 rounded-xl p-4 text-sm text-slate-300">
                <div className={`w-8 h-8 rounded-lg ${f.bg} ${f.color} flex items-center justify-center mb-2.5`}>
                  {f.icon}
                </div>
                <p className="text-xs font-bold text-white mb-0.5">{f.title}</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Main EducationSection Component
   ───────────────────────────────────────────────────────── */
export default function EducationSection({ laptops }: Props) {
  const { t, lang } = useTranslation();
  const [activeTab, setActiveTab] = useState<"blog" | "faq" | "glossary" | "estimasi">("blog");
  const [estBrand, setEstBrand] = useState("ASUS");
  const [estYear, setEstYear] = useState(2022);
  const [estOrigPrice, setEstOrigPrice] = useState(10000000);

  const categoryMap: Record<string, string> = {
    Panduan: t.eduCatGuide,
    Edukasi: t.eduCatEducation,
    Tips: t.eduCatTips,
    Guide: t.eduCatGuide,
    Education: t.eduCatEducation,
  };

  const subTabs = [
    { id: "blog" as const, label: t.eduTabArticle, icon: <BookOpen size={16} /> },
    { id: "faq" as const, label: t.eduTabFaq, icon: <HelpCircle size={16} /> },
    { id: "glossary" as const, label: t.eduTabGlossary, icon: <BookMarked size={16} /> },
    { id: "estimasi" as const, label: t.eduTabEstimate, icon: <Calculator size={16} /> },
  ];

  const faqData = [
    { q: t.eduFaq1Q, a: t.eduFaq1A },
    { q: t.eduFaq2Q, a: t.eduFaq2A },
    { q: t.eduFaq3Q, a: t.eduFaq3A },
    { q: t.eduFaq4Q, a: t.eduFaq4A },
    { q: t.eduFaq5Q, a: t.eduFaq5A },
    { q: t.eduFaq6Q, a: t.eduFaq6A },
  ];

  const glossary = [
    { term: "CPU (Processor)", icon: <Cpu size={18} />, def: t.eduGlossary1Def },
    { term: "RAM", icon: <MemoryStick size={18} />, def: t.eduGlossary2Def },
    { term: "SSD", icon: <HardDrive size={18} />, def: t.eduGlossary3Def },
    { term: "GPU (VGA)", icon: <Monitor size={18} />, def: t.eduGlossary4Def },
    { term: "Display", icon: <Monitor size={18} />, def: t.eduGlossary5Def },
    { term: "Battery", icon: <Battery size={18} />, def: t.eduGlossary6Def },
    { term: "WiFi 6/6E", icon: <Wifi size={18} />, def: t.eduGlossary7Def },
    { term: "Thunderbolt", icon: <Cpu size={18} />, def: t.eduGlossary8Def },
  ];

  const estimateValue = () => {
    const age = 2025 - estYear;
    let retention = 100;
    if (age <= 2) retention = 75;
    else if (age <= 4) retention = 55;
    else if (age <= 6) retention = 35;
    else retention = 15;
    return Math.round((estOrigPrice * retention) / 100);
  };

  const brands = [...new Set(laptops.map((l) => l.merek))].sort();

  return (
    <div className="pt-24 pb-20 max-w-6xl mx-auto px-4 sm:px-6 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-2">
          <span className="text-gradient-fuchsia">{t.eduTitle}</span> {t.eduSubtitle}
        </h1>
        <p className="text-slate-400 text-sm">{t.eduDesc}</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-[#d946ef]/15 text-[#d946ef] border border-[#d946ef]/30"
                : "bg-white/5 text-slate-400 border border-transparent hover:text-white"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Blog Tab ── */}
      {activeTab === "blog" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
          {articles.map((a) => (
            <Link
              key={a.id}
              href={`/education/${a.id}`}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700 rounded-xl p-5 group transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded-md border"
                  style={{
                    color: a.color,
                    borderColor: `${a.color}30`,
                    backgroundColor: `${a.color}10`,
                  }}
                >
                  {categoryMap[a.category] || a.category}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock size={10} />
                  {a.readTime}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#d946ef] transition-colors font-[family-name:var(--font-display)]">
                {a.title[lang]}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                {a.excerpt[lang]}
              </p>
              <span className="flex items-center gap-1 text-xs text-[#d946ef] group-hover:underline">
                {t.eduReadMore} <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* ── FAQ Tab ── */}
      {activeTab === "faq" && (
        <div className="space-y-3 stagger">
          {faqData.map((f, i) => (
            <Accordion key={i} q={f.q} a={f.a} />
          ))}
        </div>
      )}

      {/* ── Glossary Tab ── */}
      {activeTab === "glossary" && (
        <div className="grid sm:grid-cols-2 gap-4 stagger">
          {glossary.map((g, i) => (
            <div
              key={i}
              className="glass rounded-xl p-5 hover:border-[#d946ef]/20 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#d946ef]/10 text-[#d946ef] flex items-center justify-center group-hover:scale-110 transition-transform">
                  {g.icon}
                </div>
                <h3 className="text-sm font-semibold text-white font-[family-name:var(--font-display)]">
                  {g.term}
                </h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{g.def}</p>
            </div>
          ))}
        </div>
      )}

      {/* ── Estimasi Tab ── */}
      {activeTab === "estimasi" && (
        <EstimasiTab
          brands={brands}
          estBrand={estBrand}
          setEstBrand={setEstBrand}
          estYear={estYear}
          setEstYear={setEstYear}
          estOrigPrice={estOrigPrice}
          setEstOrigPrice={setEstOrigPrice}
          estimateValue={estimateValue}
          t={t}
        />
      )}
    </div>
  );
}
