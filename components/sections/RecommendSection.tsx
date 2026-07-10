"use client";

import { useState, useMemo } from "react";
import type { Laptop } from "@/lib/types";
import { useTranslation } from "@/components/providers/LanguageProvider";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
  Package,
  Monitor,
  ArrowRight,
  TrendingUp,
  Zap,
  BookOpen,
  Cpu,
  MemoryStick,
  HardDrive,
  Star,
} from "lucide-react";

interface Props {
  laptops: Laptop[];
  setSelectedLaptop: (l: Laptop | null) => void;
}

const formatRupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

const budgetRanges = [
  { min: 0, max: 5000000 },
  { min: 5000000, max: 10000000 },
  { min: 10000000, max: 15000000 },
  { min: 15000000, max: 25000000 },
  { min: 25000000, max: Infinity },
];

function matchCategory(need: string, laptop: Laptop): boolean {
  const cats = laptop.kategori.map(k => k.toLowerCase());
  switch (need) {
    case "kuliah": return cats.some(c => c.includes("pelajar") || c.includes("pekerja"));
    case "gaming": return cats.some(c => c.includes("gaming"));
    case "editing": return cats.some(c => c.includes("editing") || c.includes("kreator") || c.includes("desain"));
    default: return true;
  }
}

export default function RecommendSection({ laptops, setSelectedLaptop }: Props) {
  const { t, lang } = useTranslation();
  const [step, setStep] = useState(1);
  const [selectedNeed, setSelectedNeed] = useState("");
  const [budgetRange, setBudgetRange] = useState(1);
  const [selectedCondition, setSelectedCondition] = useState("All");

  const needs = [
    { id: "kuliah", label: t.recNeed1Label, icon: <Monitor size={18} />, desc: t.recNeed1Desc },
    { id: "gaming", label: t.recNeed2Label, icon: <Package size={18} />, desc: t.recNeed2Desc },
    { id: "editing", label: t.recNeed3Label, icon: <Sparkles size={18} />, desc: t.recNeed3Desc },
  ];

  const budgetLabels = [t.recBudget1, t.recBudget2, t.recBudget3, t.recBudget4, t.recBudget5];

  const conditions = [
    { id: "Baru", label: t.recCondNew, desc: t.recCondNewDesc },
    { id: "Bekas", label: t.recCondUsed, desc: t.recCondUsedDesc },
    { id: "All", label: t.recCondAll, desc: t.recCondAllDesc },
  ];

  const results = useMemo(() => {
    if (!selectedNeed) return [];
    const budget = budgetRanges[budgetRange];
    return laptops.filter(l => {
      const matchN = matchCategory(selectedNeed, l);
      const matchB = l.harga_max >= budget.min && l.harga_min <= budget.max;
      const kondisiTarget = selectedCondition === "Bekas" ? "Second" : selectedCondition;
      const matchC = selectedCondition === "All" || l.kondisi === kondisiTarget;
      return matchN && matchB && matchC;
    }).sort((a, b) => {
      let sa = 0, sb = 0;
      if (a.kondisi === "Baru") sa += 10;
      if (b.kondisi === "Baru") sb += 10;
      sa += parseInt(a.spesifikasi.ram);
      sb += parseInt(b.spesifikasi.ram);
      return sb - sa || a.harga_min - b.harga_min;
    });
  }, [laptops, selectedNeed, budgetRange, selectedCondition]);

  const progress = (step / 3) * 100;

  const quickTips = [
    {
      icon: <Zap size={18} className="text-[#2dd4bf]" />,
      title: lang === "id" ? "Panduan Cepat Memilih" : "Quick Selection Guide",
      desc: lang === "id" ? "Gunakan wizard ini untuk menemukan laptop ideal dalam 3 langkah mudah." : "Use this wizard to find your ideal laptop in 3 easy steps.",
      color: "#2dd4bf",
    },
    {
      icon: <TrendingUp size={18} className="text-[#d946ef]" />,
      title: lang === "id" ? "Tren Laptop Terpopuler" : "Most Popular Laptops",
      desc: lang === "id" ? "Laptop gaming dan produktivitas menjadi favorit tahun ini dengan harga terjangkau." : "Gaming and productivity laptops are this year's favorites at affordable prices.",
      color: "#d946ef",
    },
    {
      icon: <BookOpen size={18} className="text-[#f97316]" />,
      title: lang === "id" ? "Tips Hemat Budget" : "Budget Saving Tips" ,
      desc: lang === "id" ? "Pertimbangkan laptop bekas berkondisi baik untuk performa maksimal dengan harga minimal." : "Consider well-conditioned used laptops for maximum performance at minimum price.",
      color: "#f97316",
    },
  ];

  const popularLaptops = useMemo(() => {
    return [...laptops]
      .sort((a, b) => {
        let sa = 0, sb = 0;
        if (a.kondisi === "Baru") sa += 10;
        if (b.kondisi === "Baru") sb += 10;
        sa += parseInt(a.spesifikasi.ram);
        sb += parseInt(b.spesifikasi.ram);
        return sb - sa;
      })
      .slice(0, 4);
  }, [laptops]);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-2">
          <span className="text-gradient-orange">{t.recTitle}</span> {t.recSubtitle}
        </h1>
        <p className="text-slate-400 text-sm">{t.recDesc}</p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Form Sidebar */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 bg-zinc-900/50 backdrop-blur-md border border-slate-800/60 p-6 rounded-2xl">
            {/* Step Progress Indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500">{t.recStepLabel} {step}/3</span>
                <span className="text-xs text-[#f97316] font-medium">{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#f97316] to-[#ef4444] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <div className="flex justify-between mt-3">
                {[t.recStepNeeds, t.recStepBudget, t.recStepCondition].map((label, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                      step > i + 1 ? "bg-[#f97316] text-white" : step === i + 1 ? "bg-[#f97316]/20 text-[#f97316] border border-[#f97316]/40" : "bg-white/5 text-slate-600"
                    }`}>
                      {step > i + 1 ? <Check size={12} /> : i + 1}
                    </div>
                    <span className={`text-[10px] hidden sm:block ${step >= i + 1 ? "text-slate-300" : "text-slate-600"}`}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Steps */}
            {step === 1 && (
              <div className="slide-up">
                <h2 className="text-lg font-semibold font-[family-name:var(--font-display)] mb-2">{t.recNeedTitle}</h2>
                <p className="text-xs text-slate-400 mb-4">{t.recNeedDesc}</p>
                <div className="grid gap-2">
                  {needs.map(n => (
                    <button key={n.id} onClick={() => setSelectedNeed(n.id)} className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      selectedNeed === n.id ? "bg-[#f97316]/10 border-[#f97316]/40 shadow-[0_0_15px_rgba(249,115,22,0.1)]" : "bg-white/3 border-white/10 hover:border-white/20"
                    }`}>
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${selectedNeed === n.id ? "bg-[#f97316]/20 text-[#f97316]" : "bg-white/5 text-slate-500"}`}>
                        {n.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-medium ${selectedNeed === n.id ? "text-[#f97316]" : "text-white"}`}>{n.label}</div>
                        <div className="text-[10px] text-slate-500 truncate">{n.desc}</div>
                      </div>
                      {selectedNeed === n.id && <Check size={14} className="text-[#f97316] flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="slide-up">
                <h2 className="text-lg font-semibold font-[family-name:var(--font-display)] mb-2">{t.recBudgetTitle}</h2>
                <p className="text-xs text-slate-400 mb-4">{t.recBudgetDesc}</p>
                <div className="mb-4">
                  <input type="range" min={0} max={budgetRanges.length - 1} value={budgetRange} onChange={e => setBudgetRange(Number(e.target.value))} className="w-full" />
                  <div className="flex justify-between mt-2">
                    {budgetLabels.map((label, i) => (
                      <span key={i} className={`text-[9px] ${i === budgetRange ? "text-[#f97316] font-medium" : "text-slate-600"}`}>{label}</span>
                    ))}
                  </div>
                </div>
                <div className="text-center p-3 rounded-lg bg-[#f97316]/10 border border-[#f97316]/20">
                  <p className="text-[10px] text-slate-400">{t.recBudgetSelected}</p>
                  <p className="text-lg font-bold text-[#f97316] font-[family-name:var(--font-display)]">{budgetLabels[budgetRange]}</p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="slide-up">
                <h2 className="text-lg font-semibold font-[family-name:var(--font-display)] mb-2">{t.recCondTitle}</h2>
                <p className="text-xs text-slate-400 mb-4">{t.recCondDesc}</p>
                <div className="grid gap-2">
                  {conditions.map(c => (
                    <button key={c.id} onClick={() => setSelectedCondition(c.id)} className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      selectedCondition === c.id ? "bg-[#f97316]/10 border-[#f97316]/40 shadow-[0_0_15px_rgba(249,115,22,0.1)]" : "bg-white/3 border-white/10 hover:border-white/20"
                    }`}>
                      <div className={`text-sm font-medium ${selectedCondition === c.id ? "text-[#f97316]" : "text-white"}`}>{c.label}</div>
                      <div className="text-[10px] text-slate-500">{c.desc}</div>
                      {selectedCondition === c.id && <Check size={14} className="ml-auto text-[#f97316] flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="slide-up">
                <h2 className="text-lg font-semibold font-[family-name:var(--font-display)] mb-2">{t.recResultTitle}</h2>
                <p className="text-xs text-slate-400 mb-4">
                  {lang === "id"
                    ? `Ditemukan ${results.length} laptop yang cocok.`
                    : `Found ${results.length} matching laptops.`}
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6 pt-4 border-t border-white/5">
              <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1} className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                <ChevronLeft size={14} />
                {t.recBack}
              </button>
              {step < 4 ? (
                <button onClick={() => setStep(s => s + 1)} disabled={step === 1 && !selectedNeed} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gradient-to-r from-[#f97316] to-[#ef4444] text-white text-xs font-semibold hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                  {step === 3 ? t.recShowResults : t.recNext}
                  <ChevronRight size={14} />
                </button>
              ) : (
                <button onClick={() => { setStep(1); setSelectedNeed(""); setBudgetRange(1); setSelectedCondition("All"); }} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-[#f97316]/10 border border-[#f97316]/30 text-[#f97316] text-xs font-medium hover:bg-[#f97316]/20 transition-all">
                  {t.recRestart}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Results & Insights Panel */}
        <div className="lg:col-span-2">
          {step < 4 ? (
            <div className="space-y-6">
              {/* Quick Tips Cards */}
              <div className="grid sm:grid-cols-3 gap-4">
                {quickTips.map((tip, i) => (
                  <div key={i} className="bg-zinc-900/50 backdrop-blur-md border border-slate-800/60 rounded-xl p-5 hover:border-slate-700/80 transition-all group">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${tip.color}15` }}>
                      {tip.icon}
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1.5 font-[family-name:var(--font-display)]">{tip.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{tip.desc}</p>
                  </div>
                ))}
              </div>

              {/* Popular Laptops Preview */}
              <div className="bg-zinc-900/50 backdrop-blur-md border border-slate-800/60 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Star size={16} className="text-[#f97316]" />
                  <h3 className="text-sm font-semibold text-white font-[family-name:var(--font-display)]">
                    {lang === "id" ? "Laptop Populer" : "Popular Laptops"}
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {popularLaptops.map((l, i) => (
                    <button key={l.id} onClick={() => setSelectedLaptop(l)} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#f97316]/20 text-left transition-all group">
                      <div className="w-8 h-8 rounded-lg bg-[#f97316]/10 text-[#f97316] flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-white group-hover:text-[#f97316] transition-colors truncate">{l.nama}</div>
                        <div className="text-[10px] text-slate-500 truncate">{l.spesifikasi.processor}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-[10px] font-bold text-white font-[family-name:var(--font-display)]">{formatRupiah(l.harga_min)}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-zinc-900/50 backdrop-blur-md border border-slate-800/60 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-[#2dd4bf] font-[family-name:var(--font-display)]">{laptops.length}</div>
                  <div className="text-[10px] text-slate-500 mt-1">{lang === "id" ? "Total Laptop" : "Total Laptops"}</div>
                </div>
                <div className="bg-zinc-900/50 backdrop-blur-md border border-slate-800/60 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-[#d946ef] font-[family-name:var(--font-display)]">
                    {[...new Set(laptops.map(l => l.merek))].length}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">{lang === "id" ? "Brand" : "Brands"}</div>
                </div>
                <div className="bg-zinc-900/50 backdrop-blur-md border border-slate-800/60 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-[#f97316] font-[family-name:var(--font-display)]">3</div>
                  <div className="text-[10px] text-slate-500 mt-1">{lang === "id" ? "Kategori" : "Categories"}</div>
                </div>
              </div>
            </div>
          ) : (
            /* Results View */
            <div className="space-y-4">
              {results.length === 0 ? (
                <div className="bg-zinc-900/50 backdrop-blur-md border border-slate-800/60 rounded-xl p-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <Cpu size={28} className="text-slate-600" />
                  </div>
                  <p className="text-slate-400 mb-4">{t.recEmpty}</p>
                  <button onClick={() => { setStep(1); setSelectedNeed(""); }} className="text-sm text-[#f97316] hover:underline">{t.recTryAgain}</button>
                </div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {results.slice(0, 6).map((l, i) => (
                      <button key={l.id} onClick={() => setSelectedLaptop(l)} className="bg-zinc-900/50 backdrop-blur-md border border-slate-800/60 rounded-xl p-5 hover:border-[#f97316]/30 text-left transition-all group hover:shadow-[0_0_30px_rgba(249,115,22,0.08)]">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-[#f97316]/10 text-[#f97316] flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</div>
                            <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full border ${l.kondisi === "Baru" ? "text-[#2dd4bf] border-[#2dd4bf]/30 bg-[#2dd4bf]/10" : "text-[#f97316] border-[#f97316]/30 bg-[#f97316]/10"}`}>{l.kondisi}</span>
                          </div>
                          <ArrowRight size={14} className="text-slate-600 group-hover:text-[#f97316] transition-colors" />
                        </div>
                        <h3 className="text-sm font-semibold text-white group-hover:text-[#f97316] transition-colors mb-1 font-[family-name:var(--font-display)]">{l.nama}</h3>
                        <div className="space-y-1 mb-3">
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                            <Cpu size={10} className="text-[#2dd4bf] flex-shrink-0" />
                            <span className="truncate">{l.spesifikasi.processor}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                            <MemoryStick size={10} className="text-[#d946ef] flex-shrink-0" />
                            <span>{l.spesifikasi.ram}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                            <HardDrive size={10} className="text-[#f97316] flex-shrink-0" />
                            <span>{l.spesifikasi.storage}</span>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-white/5">
                          <div className="text-sm font-bold text-white font-[family-name:var(--font-display)]">{formatRupiah(l.harga_min)} - {formatRupiah(l.harga_max)}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
