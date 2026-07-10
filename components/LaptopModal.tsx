"use client";

import { useEffect } from "react";
import type { Laptop } from "@/lib/types";
import {
  X,
  Cpu,
  MemoryStick,
  HardDrive,
  Monitor,
  Tag,
  Heart,
  GitCompareArrows,
  Laptop as LaptopIcon,
} from "lucide-react";

interface Props {
  laptop: Laptop | null;
  onClose: () => void;
  onCompare: (l: Laptop) => void;
  compareList: Laptop[];
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
}

const formatRupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

export default function LaptopModal({ laptop, onClose, onCompare, compareList, wishlist, onToggleWishlist }: Props) {
  useEffect(() => {
    if (laptop) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [laptop]);

  if (!laptop) return null;

  const isWished = wishlist.includes(laptop.id);
  const inCompare = compareList.some(c => c.id === laptop.id);

  const specs = [
    { icon: <Cpu size={16} />, label: "Processor", value: laptop.spesifikasi.processor, color: "text-[#2dd4bf]" },
    { icon: <MemoryStick size={16} />, label: "RAM", value: laptop.spesifikasi.ram, color: "text-[#d946ef]" },
    { icon: <HardDrive size={16} />, label: "Storage", value: laptop.spesifikasi.storage, color: "text-[#f97316]" },
    { icon: <Monitor size={16} />, label: "GPU", value: laptop.spesifikasi.gpu, color: "text-[#06b6d4]" },
    { icon: <Monitor size={16} />, label: "Display", value: laptop.spesifikasi.display, color: "text-[#eab308]" },
    { icon: <LaptopIcon size={16} />, label: "OS", value: laptop.spesifikasi.os, color: "text-[#a855f7]" },
  ];

  return (
    <div className={`modal-backdrop fixed inset-0 z-[60] flex items-center justify-center p-4 ${laptop ? "active" : ""}`} onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="modal-content relative w-full max-w-4xl max-h-[90vh] glass rounded-2xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Top gradient bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#2dd4bf] via-[#d946ef] to-[#f97316] shrink-0" />

        {/* Header: close button */}
        <div className="flex justify-end px-6 pt-4 pb-0 shrink-0">
          <button onClick={onClose} className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Scrollable body — single column */}
        <div className="overflow-y-auto flex-1 px-6 pb-6 flex flex-col gap-5">
          {/* ── 1. Badges ── */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${
              laptop.kondisi === "Baru"
                ? "text-[#2dd4bf] bg-[#2dd4bf]/10 border-[#2dd4bf]/20"
                : "text-[#f97316] bg-[#f97316]/10 border-[#f97316]/20"
            }`}>
              {laptop.kondisi}
            </span>
            <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full border ${
              laptop.status === "Active"
                ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                : "text-slate-400 bg-slate-500/10 border-slate-500/20"
            }`}>
              {laptop.status}
            </span>
          </div>

          {/* ── 2. Header: Name + Brand ── */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white font-[family-name:var(--font-display)] leading-snug">
              {laptop.nama}
            </h2>
            <p className="text-sm text-slate-400 mt-1">{laptop.merek} &middot; {laptop.seri} &middot; {laptop.tahun}</p>
          </div>

          {/* ── 3. Category tags ── */}
          <div className="flex flex-wrap gap-1.5">
            {laptop.kategori.map(kat => (
              <span key={kat} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-400">
                {kat}
              </span>
            ))}
          </div>

          {/* ── 4. Price card ── */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#2dd4bf]/5 to-[#d946ef]/5 border border-white/5">
            <div className="flex items-center gap-2 mb-1.5">
              <Tag size={14} className="text-[#2dd4bf]" />
              <span className="text-xs text-slate-500">Harga Estimasi</span>
            </div>
            <p className="text-xl md:text-2xl font-bold font-[family-name:var(--font-display)] text-white">
              {formatRupiah(laptop.harga_min)} - {formatRupiah(laptop.harga_max)}
            </p>
          </div>

          {/* ── 5. Specifications — full-width 2-col grid ── */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Spesifikasi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {specs.map((s, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className={`${s.color} mt-0.5 shrink-0`}>{s.icon}</span>
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-0.5">{s.label}</span>
                    <p className="text-sm font-medium text-white break-words">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── 6. Notes ── */}
          {laptop.catatan && (
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <p className="text-xs text-slate-400 leading-relaxed">{laptop.catatan}</p>
            </div>
          )}

          {/* ── 7. Known issues ── */}
          {laptop.isu_diketahui && (
            <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
              <p className="text-xs text-amber-400/80 leading-relaxed">&#x26A0; {laptop.isu_diketahui}</p>
            </div>
          )}

          {/* ── 8. Action buttons ── */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={() => onToggleWishlist(laptop.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isWished
                  ? "bg-[#ec4899]/15 text-[#ec4899] border border-[#ec4899]/30"
                  : "bg-white/5 text-slate-400 border border-white/10 hover:text-[#ec4899] hover:border-[#ec4899]/30"
              }`}
            >
              <Heart size={14} fill={isWished ? "currentColor" : "none"} />
              {isWished ? "Tersimpan" : "Wishlist"}
            </button>
            <button
              onClick={() => onCompare(laptop)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                inCompare
                  ? "bg-[#2dd4bf]/15 text-[#2dd4bf] border border-[#2dd4bf]/30"
                  : "bg-white/5 text-slate-400 border border-white/10 hover:text-[#2dd4bf] hover:border-[#2dd4bf]/30"
              }`}
            >
              <GitCompareArrows size={14} />
              {inCompare ? "Dipilih" : "Bandingkan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
