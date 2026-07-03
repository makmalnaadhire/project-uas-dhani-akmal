"use client";

import { useState, useMemo } from "react";
import type { Laptop } from "@/lib/types";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
  Package,
  Monitor,
  ArrowRight,
} from "lucide-react";

interface Props {
  laptops: Laptop[];
  setSelectedLaptop: (l: Laptop | null) => void;
}

const needs = [
  { id: "kuliah", label: "Kuliah / Kerja", icon: <Monitor size={18} />, desc: "Office, browsing, presentasi" },
  { id: "gaming", label: "Gaming", icon: <Package size={18} />, desc: "Game AAA dan kompetitif" },
  { id: "editing", label: "Editing / Desain", icon: <Sparkles size={18} />, desc: "Video editing, grafis, 3D" },
];

const budgetRanges = [
  { label: "Di bawah 5jt", min: 0, max: 5000000 },
  { label: "5jt - 10jt", min: 5000000, max: 10000000 },
  { label: "10jt - 15jt", min: 10000000, max: 15000000 },
  { label: "15jt - 25jt", min: 15000000, max: 25000000 },
  { label: "Di atas 25jt", min: 25000000, max: Infinity },
];

const conditions = [
  { id: "New", label: "Baru Saja", desc: "Laptop baru bergaransi resmi" },
  { id: "Used", label: "Bekas / Second", desc: "Laptop bekas dengan harga lebih terjangkau" },
  { id: "All", label: "Semua Kondisi", desc: "Termasuk baru dan bekas" },
];

function matchCategory(need: string, laptop: Laptop): boolean {
  const cat = laptop.category.toLowerCase();
  switch (need) {
    case "kuliah": return cat.includes("college") || cat.includes("work");
    case "gaming": return cat.includes("gaming");
    case "editing": return cat.includes("editing");
    default: return true;
  }
}

const formatRupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

export default function RecommendSection({ laptops, setSelectedLaptop }: Props) {
  const [step, setStep] = useState(1);
  const [selectedNeed, setSelectedNeed] = useState("");
  const [budgetRange, setBudgetRange] = useState(1);
  const [selectedCondition, setSelectedCondition] = useState("All");

  const results = useMemo(() => {
    if (!selectedNeed) return [];
    const budget = budgetRanges[budgetRange];
    return laptops.filter(l => {
      const matchN = matchCategory(selectedNeed, l);
      const matchB = l.price >= budget.min && l.price <= budget.max;
      const matchC = selectedCondition === "All" || l.condition === selectedCondition;
      return matchN && matchB && matchC;
    }).sort((a, b) => {
      let sa = 0, sb = 0;
      if (a.condition === "New") sa += 10;
      if (b.condition === "New") sb += 10;
      sa += parseInt(a.ram);
      sb += parseInt(b.ram);
      return sb - sa || a.price - b.price;
    });
  }, [laptops, selectedNeed, budgetRange, selectedCondition]);

  const progress = (step / 3) * 100;

  return (
    <div className="pt-24 pb-20 max-w-3xl mx-auto px-4 sm:px-6 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-2">
          <span className="text-gradient-orange">Rekomendasi</span> Cerdas
        </h1>
        <p className="text-slate-400 text-sm">Jawab 3 pertanyaan singkat untuk mendapatkan rekomendasi laptop terbaik.</p>
      </div>

      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-500">Langkah {step}/3</span>
          <span className="text-xs text-[#f97316] font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#f97316] to-[#ef4444] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex justify-between mt-3">
          {["Kebutuhan", "Budget", "Kondisi"].map((label, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                step > i + 1 ? "bg-[#f97316] text-white" : step === i + 1 ? "bg-[#f97316]/20 text-[#f97316] border border-[#f97316]/40" : "bg-white/5 text-slate-600"
              }`}>
                {step > i + 1 ? <Check size={12} /> : i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${step >= i + 1 ? "text-slate-300" : "text-slate-600"}`}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-xl p-6 sm:p-8 min-h-[320px]">
        {step === 1 && (
          <div className="slide-up">
            <h2 className="text-xl font-semibold font-[family-name:var(--font-display)] mb-2">Untuk apa laptop ini?</h2>
            <p className="text-sm text-slate-400 mb-6">Pilih aktivitas utama yang akan Anda lakukan.</p>
            <div className="grid gap-3">
              {needs.map(n => (
                <button key={n.id} onClick={() => setSelectedNeed(n.id)} className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                  selectedNeed === n.id ? "bg-[#f97316]/10 border-[#f97316]/40 shadow-[0_0_15px_rgba(249,115,22,0.1)]" : "bg-white/3 border-white/10 hover:border-white/20"
                }`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedNeed === n.id ? "bg-[#f97316]/20 text-[#f97316]" : "bg-white/5 text-slate-500"}`}>
                    {n.icon}
                  </div>
                  <div>
                    <div className={`text-sm font-medium ${selectedNeed === n.id ? "text-[#f97316]" : "text-white"}`}>{n.label}</div>
                    <div className="text-xs text-slate-500">{n.desc}</div>
                  </div>
                  {selectedNeed === n.id && <Check size={16} className="ml-auto text-[#f97316]" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="slide-up">
            <h2 className="text-xl font-semibold font-[family-name:var(--font-display)] mb-2">Berapa budget Anda?</h2>
            <p className="text-sm text-slate-400 mb-6">Geser slider untuk menentukan rentang harga.</p>
            <div className="mb-6">
              <input type="range" min={0} max={budgetRanges.length - 1} value={budgetRange} onChange={e => setBudgetRange(Number(e.target.value))} className="w-full" />
              <div className="flex justify-between mt-2">
                {budgetRanges.map((b, i) => (
                  <span key={i} className={`text-[10px] ${i === budgetRange ? "text-[#f97316] font-medium" : "text-slate-600"}`}>{b.label}</span>
                ))}
              </div>
            </div>
            <div className="text-center p-4 rounded-lg bg-[#f97316]/10 border border-[#f97316]/20">
              <p className="text-sm text-slate-400">Budget terpilih</p>
              <p className="text-xl font-bold text-[#f97316] font-[family-name:var(--font-display)]">{budgetRanges[budgetRange].label}</p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="slide-up">
            <h2 className="text-xl font-semibold font-[family-name:var(--font-display)] mb-2">Kondisi laptop?</h2>
            <p className="text-sm text-slate-400 mb-6">Apakah Anda mencari laptop baru atau bekas?</p>
            <div className="grid gap-3">
              {conditions.map(c => (
                <button key={c.id} onClick={() => setSelectedCondition(c.id)} className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                  selectedCondition === c.id ? "bg-[#f97316]/10 border-[#f97316]/40 shadow-[0_0_15px_rgba(249,115,22,0.1)]" : "bg-white/3 border-white/10 hover:border-white/20"
                }`}>
                  <div className={`text-sm font-medium ${selectedCondition === c.id ? "text-[#f97316]" : "text-white"}`}>{c.label}</div>
                  <div className="text-xs text-slate-500">{c.desc}</div>
                  {selectedCondition === c.id && <Check size={16} className="ml-auto text-[#f97316]" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="slide-up">
            <h2 className="text-xl font-semibold font-[family-name:var(--font-display)] mb-4">Hasil Rekomendasi</h2>
            {results.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-400 mb-4">Tidak ada laptop yang cocok dengan kriteria Anda.</p>
                <button onClick={() => { setStep(1); setSelectedNeed(""); }} className="text-sm text-[#f97316] hover:underline">Coba lagi dengan kriteria lain</button>
              </div>
            ) : (
              <div className="space-y-3">
                {results.slice(0, 6).map((l, i) => (
                  <button key={l.id} onClick={() => setSelectedLaptop(l)} className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/3 border border-white/10 hover:border-[#f97316]/30 text-left transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-[#f97316]/10 text-[#f97316] flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white group-hover:text-[#f97316] transition-colors truncate">{l.name}</div>
                      <div className="text-xs text-slate-500">{l.cpu} · {l.ram} · {l.gpu}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold font-[family-name:var(--font-display)]">{formatRupiah(l.price)}</div>
                      <div className={`text-[10px] ${l.condition === "New" ? "text-[#2dd4bf]" : "text-[#f97316]"}`}>{l.condition === "New" ? "Baru" : "Bekas"}</div>
                    </div>
                    <ArrowRight size={14} className="text-slate-600 group-hover:text-[#f97316] transition-colors flex-shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1} className="flex items-center gap-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all">
          <ChevronLeft size={16} />
          Kembali
        </button>
        {step < 4 ? (
          <button onClick={() => setStep(s => s + 1)} disabled={step === 1 && !selectedNeed} className="flex items-center gap-1 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#f97316] to-[#ef4444] text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] disabled:opacity-30 disabled:cursor-not-allowed transition-all">
            {step === 3 ? "Lihat Hasil" : "Selanjutnya"}
            <ChevronRight size={16} />
          </button>
        ) : (
          <button onClick={() => { setStep(1); setSelectedNeed(""); setBudgetRange(1); setSelectedCondition("All"); }} className="flex items-center gap-1 px-5 py-2.5 rounded-lg bg-[#f97316]/10 border border-[#f97316]/30 text-[#f97316] text-sm font-medium hover:bg-[#f97316]/20 transition-all">
            Mulai Ulang
          </button>
        )}
      </div>
    </div>
  );
}
