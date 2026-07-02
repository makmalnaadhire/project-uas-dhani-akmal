"use client";

import type { Laptop, Tab } from "../DharianApp";
import {
  Monitor,
  TrendingUp,
  Zap,
  Users,
  ArrowRight,
  Laptop2,
  Cpu,
  Shield,
} from "lucide-react";

interface Props {
  laptops: Laptop[];
  switchTab: (tab: Tab) => void;
  [key: string]: unknown;
}

export default function HeroSection({ laptops, switchTab }: Props) {
  const totalLaptops = laptops.length;
  const brands = [...new Set(laptops.map((l) => l.brand))].length;
  const avgPrice =
    laptops.reduce((s, l) => s + l.price, 0) / laptops.length;

  const stats = [
    {
      icon: <Laptop2 size={22} />,
      value: totalLaptops,
      label: "Laptop Tersedia",
      color: "text-[#2dd4bf]",
      bg: "bg-[#2dd4bf]/10",
    },
    {
      icon: <Monitor size={22} />,
      value: brands,
      label: "Brand",
      color: "text-[#f97316]",
      bg: "bg-[#f97316]/10",
    },
    {
      icon: <TrendingUp size={22} />,
      value: `Rp ${(avgPrice / 1_000_000).toFixed(0)}jt`,
      label: "Harga Rata-rata",
      color: "text-[#d946ef]",
      bg: "bg-[#d946ef]/10",
    },
    {
      icon: <Zap size={22} />,
      value: "AI",
      label: "Rekomendasi Cerdas",
      color: "text-[#06b6d4]",
      bg: "bg-[#06b6d4]/10",
    },
  ];

  const features = [
    {
      icon: <Monitor size={28} />,
      title: "Katalog Lengkap",
      desc: "Jelajahi 30+ laptop dari berbagai brand dengan spesifikasi detail dan harga terkini.",
      color: "#2dd4bf",
      tab: "catalog" as Tab,
    },
    {
      icon: <Cpu size={28} />,
      title: "Rekomendasi Cerdas",
      desc: "Wizard interaktif yang membantu menemukan laptop sesuai kebutuhan dan budget Anda.",
      color: "#f97316",
      tab: "recommend" as Tab,
    },
    {
      icon: <Shield size={28} />,
      title: "Panduan Edukasi",
      desc: "Artikel, FAQ, glossary hardware, dan estimasi harga laptop bekas secara akurat.",
      color: "#d946ef",
      tab: "education" as Tab,
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center hero-grid overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#2dd4bf]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d946ef]/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f97316]/3 rounded-full blur-[150px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div className="slide-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-pulse" />
                Platform Pencarian Laptop Cerdas
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] leading-tight mb-6">
                Temukan Laptop{" "}
                <span className="text-gradient-hero">Impian Anda</span>{" "}
                dengan Cerdas
              </h1>
              <p className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed">
                Bandingkan, rekomendasikan, dan pelajari segala hal tentang laptop
                dalam satu platform modern yang dirancang untuk membantu pengambilan
                keputusan yang tepat.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => switchTab("catalog")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#2dd4bf] to-[#4ade80] text-[#0f172a] font-semibold text-sm hover:shadow-[0_0_25px_rgba(45,212,191,0.4)] transition-all duration-300"
                >
                  Jelajahi Katalog
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => switchTab("recommend")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-all duration-300"
                >
                  Mulai Rekomendasi
                </button>
              </div>
            </div>

            {/* Right - Stats grid */}
            <div className="grid grid-cols-2 gap-4 slide-up" style={{ animationDelay: "0.2s" }}>
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="glass rounded-xl p-5 hover:border-white/15 transition-all duration-300 group"
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${s.bg} ${s.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                  >
                    {s.icon}
                  </div>
                  <div className="text-2xl font-bold font-[family-name:var(--font-display)]">
                    {s.value}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-3">
            Kenapa <span className="text-gradient-hero">Dharian</span>?
          </h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Fitur lengkap untuk membantu Anda menemukan laptop yang sempurna.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 stagger">
          {features.map((f, i) => (
            <button
              key={i}
              onClick={() => switchTab(f.tab)}
              className="glass rounded-xl p-7 text-left hover:border-white/15 transition-all duration-300 group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${f.color}15`, color: f.color }}
              >
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 font-[family-name:var(--font-display)]">
                {f.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative glass rounded-2xl p-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2dd4bf]/10 via-[#d946ef]/10 to-[#f97316]/10" />
          <div className="relative z-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] mb-4">
              Siap Menemukan Laptop Ideal?
            </h2>
            <p className="text-slate-400 mb-6 max-w-lg mx-auto">
              Gunakan wizard rekomendasi cerdas kami atau jelajahi katalog lengkap
              untuk menemukan laptop yang tepat sesuai kebutuhan Anda.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => switchTab("recommend")}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#f97316] to-[#ef4444] text-white font-semibold text-sm hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] transition-all duration-300"
              >
                Mulai Sekarang
              </button>
              <button
                onClick={() => switchTab("education")}
                className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-all duration-300"
              >
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
