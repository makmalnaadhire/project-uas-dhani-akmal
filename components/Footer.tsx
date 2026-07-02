"use client";

import type { Tab } from "./DharianApp";
import { Heart } from "lucide-react";

interface Props {
  switchTab: (tab: Tab) => void;
}

export default function Footer({ switchTab }: Props) {
  return (
    <footer className="border-t border-white/5 bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2dd4bf] via-[#d946ef] to-[#f97316] flex items-center justify-center font-bold text-white text-xs font-[family-name:var(--font-display)]">
                D
              </div>
              <span className="text-base font-bold font-[family-name:var(--font-display)] text-gradient-hero">
                Dharian
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Platform cerdas untuk pencarian, perbandingan, dan rekomendasi laptop
              yang membantu Anda membuat keputusan tepat.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Menu</h4>
            <div className="space-y-2">
              {[
                { label: "Katalog", tab: "catalog" as Tab },
                { label: "Rekomendasi", tab: "recommend" as Tab },
                { label: "Edukasi", tab: "education" as Tab },
                { label: "Tentang Kami", tab: "other" as Tab },
              ].map((l, i) => (
                <button
                  key={i}
                  onClick={() => switchTab(l.tab)}
                  className="block text-xs text-slate-500 hover:text-[#2dd4bf] transition-colors"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Proyek Akhir</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              UAS Pemrograman Web Lanjut.
              <br />
              Dhani &amp; Akmal · 2025
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-slate-600">
            &copy; 2025 Dharian. Hak cipta dilindungi.
          </p>
          <p className="text-[10px] text-slate-600 flex items-center gap-1">
            Dibuat dengan <Heart size={10} className="text-[#ec4899]" fill="currentColor" /> oleh Dhani &amp; Akmal
          </p>
        </div>
      </div>
    </footer>
  );
}
