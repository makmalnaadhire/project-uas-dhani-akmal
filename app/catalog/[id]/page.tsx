"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/components/providers/AppProvider";
import laptopsData from "@/data/laptops.json";
import type { Laptop } from "@/lib/types";
import {
  ArrowLeft,
  Cpu,
  MemoryStick,
  HardDrive,
  Monitor,
  Tag,
  Heart,
  GitCompareArrows,
} from "lucide-react";

const formatRupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

export default function LaptopDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const laptops: Laptop[] = (laptopsData as any[]).map((l) => ({
    ...l,
    spesifikasi: {
      processor: l.varian?.[0]?.processor ?? "-",
      ram: l.varian?.[0]?.ram ?? "-",
      storage: l.varian?.[0]?.storage ?? "-",
      gpu: l.varian?.[0]?.gpu ?? "-",
      display: l.varian?.[0]?.display ?? "-",
      os: l.varian?.[0]?.os ?? "-",
      resolusi: l.varian?.[0]?.resolusi ?? "-",
    },
  }));
  const laptop = laptops.find((l) => l.id === id);

  if (!laptop) notFound();

  const { wishlist, toggleWishlist, compareList, toggleCompare } = useApp();
  const isWished = wishlist.includes(laptop.id);
  const inCompare = compareList.some((c) => c.id === laptop.id);

  const specs = [
    { icon: <Cpu size={18} />, label: "Processor", value: laptop.spesifikasi.processor, color: "text-[#2dd4bf]" },
    { icon: <MemoryStick size={18} />, label: "RAM", value: laptop.spesifikasi.ram, color: "text-[#d946ef]" },
    { icon: <HardDrive size={18} />, label: "Storage", value: laptop.spesifikasi.storage, color: "text-[#f97316]" },
    { icon: <Monitor size={18} />, label: "GPU", value: laptop.spesifikasi.gpu, color: "text-[#06b6d4]" },
  ];

  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 min-h-screen">
      <Link
        href="/catalog"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        Kembali ke Katalog
      </Link>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-[#2dd4bf] via-[#d946ef] to-[#f97316]" />

        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className={`text-xs font-medium px-3 py-1 rounded-full border ${
                laptop.kondisi === "Baru"
                  ? "text-[#2dd4bf] bg-[#2dd4bf]/10 border-[#2dd4bf]/20"
                  : "text-[#f97316] bg-[#f97316]/10 border-[#f97316]/20"
              }`}>
                {laptop.kondisi}
              </span>
              <h1 className="text-3xl font-bold text-white mt-3 font-[family-name:var(--font-display)]">
                {laptop.nama}
              </h1>
              <p className="text-slate-400 mt-1">{laptop.merek} &middot; {laptop.seri} &middot; {laptop.tahun}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {specs.map((s, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <span className={s.color}>{s.icon}</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">{s.label}</span>
                </div>
                <p className="text-sm font-medium text-white">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1 mb-5">
            {laptop.kategori.map(kat => (
              <span key={kat} className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-400">
                {kat}
              </span>
            ))}
            <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-500">
              {laptop.status}
            </span>
          </div>

          {laptop.catatan && (
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 mb-4">
              <p className="text-sm text-slate-400 leading-relaxed">{laptop.catatan}</p>
            </div>
          )}

          {laptop.isu_diketahui && (
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 mb-6">
              <p className="text-sm text-amber-400/80 leading-relaxed">&#x26A0; {laptop.isu_diketahui}</p>
            </div>
          )}

          <div className="p-5 rounded-xl bg-gradient-to-r from-[#2dd4bf]/5 to-[#d946ef]/5 border border-white/5 mb-8">
            <div className="flex items-center gap-2 mb-1">
              <Tag size={16} className="text-[#2dd4bf]" />
              <span className="text-xs text-slate-500">Harga</span>
            </div>
            <p className="text-3xl font-bold font-[family-name:var(--font-display)] text-white">
              {formatRupiah(laptop.harga_min)} - {formatRupiah(laptop.harga_max)}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => toggleWishlist(laptop.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-medium transition-all ${
                isWished
                  ? "bg-[#ec4899]/15 text-[#ec4899] border border-[#ec4899]/30"
                  : "bg-white/5 text-slate-400 border border-white/10 hover:text-[#ec4899] hover:border-[#ec4899]/30"
              }`}
            >
              <Heart size={16} fill={isWished ? "currentColor" : "none"} />
              {isWished ? "Tersimpan" : "Wishlist"}
            </button>
            <button
              onClick={() => toggleCompare(laptop)}
              className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-medium transition-all ${
                inCompare
                  ? "bg-[#2dd4bf]/15 text-[#2dd4bf] border border-[#2dd4bf]/30"
                  : "bg-white/5 text-slate-400 border border-white/10 hover:text-[#2dd4bf] hover:border-[#2dd4bf]/30"
              }`}
            >
              <GitCompareArrows size={16} />
              {inCompare ? "Dipilih" : "Bandingkan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
