"use client";

import { useEffect } from "react";
import type { Laptop } from "./DharianApp";
import {
  X,
  Cpu,
  MemoryStick,
  HardDrive,
  Monitor,
  Tag,
  Heart,
  GitCompareArrows,
  ShoppingBag,
} from "lucide-react";

interface Props {
  laptop: Laptop | null;
  onClose: () => void;
  onCompare: (l: Laptop) => void;
  compareList: Laptop[];
  wishlist: number[];
  onToggleWishlist: (id: number) => void;
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
    { icon: <Cpu size={16} />, label: "Processor", value: laptop.cpu, color: "text-[#2dd4bf]" },
    { icon: <MemoryStick size={16} />, label: "RAM", value: laptop.ram, color: "text-[#d946ef]" },
    { icon: <HardDrive size={16} />, label: "Storage", value: laptop.storage, color: "text-[#f97316]" },
    { icon: <Monitor size={16} />, label: "GPU", value: laptop.gpu, color: "text-[#06b6d4]" },
  ];

  return (
    <div className={`modal-backdrop fixed inset-0 z-[60] flex items-center justify-center p-4 ${laptop ? "active" : ""}`} onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="modal-content relative w-full max-w-lg glass rounded-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Top gradient accent */}
        <div className="h-1.5 bg-gradient-to-r from-[#2dd4bf] via-[#d946ef] to-[#f97316]" />

        {/* Header */}
        <div className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                laptop.condition === "New"
                  ? "text-[#2dd4bf] bg-[#2dd4bf]/10 border-[#2dd4bf]/20"
                  : "text-[#f97316] bg-[#f97316]/10 border-[#f97316]/20"
              }`}>
                {laptop.condition === "New" ? "Baru" : "Bekas"}
              </span>
              <h2 className="text-xl font-bold text-white mt-2 font-[family-name:var(--font-display)]">
                {laptop.name}
              </h2>
              <p className="text-sm text-slate-400 mt-0.5">{laptop.brand} · {laptop.category}</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Specs */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-3 mb-6">
            {specs.map((s, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/3 border border-white/5">
                <div className="flex items-center gap-2 mb-1">
                  <span className={s.color}>{s.icon}</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">{s.label}</span>
                </div>
                <p className="text-sm font-medium text-white">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#2dd4bf]/5 to-[#d946ef]/5 border border-white/5 mb-6">
            <div className="flex items-center gap-2 mb-1">
              <Tag size={14} className="text-[#2dd4bf]" />
              <span className="text-xs text-slate-500">Harga</span>
            </div>
            <p className="text-2xl font-bold font-[family-name:var(--font-display)] text-white">
              {formatRupiah(laptop.price)}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
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
