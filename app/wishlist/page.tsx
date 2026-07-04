"use client";

import Link from "next/link";
import { useApp } from "@/components/providers/AppProvider";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { Heart, ArrowRight, Trash2 } from "lucide-react";

const formatRupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

const kategoriColors: Record<string, string> = {
  pelajar: "text-[#2dd4bf] bg-[#2dd4bf]/10 border-[#2dd4bf]/20",
  pekerja: "text-[#3b82f6] bg-[#3b82f6]/10 border-[#3b82f6]/20",
  gaming: "text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/20",
  kreator: "text-[#d946ef] bg-[#d946ef]/10 border-[#d946ef]/20",
  desain: "text-[#a855f7] bg-[#a855f7]/10 border-[#a855f7]/20",
  editing: "text-[#f97316] bg-[#f97316]/10 border-[#f97316]/20",
  bisnis: "text-[#06b6d4] bg-[#06b6d4]/10 border-[#06b6d4]/20",
  premium: "text-[#ec4899] bg-[#ec4899]/10 border-[#ec4899]/20",
};

export default function WishlistPage() {
  const { laptops, wishlist, toggleWishlist, compareList, toggleCompare } = useApp();
  const { t } = useTranslation();

  const wishlistLaptops = laptops.filter(l => wishlist.includes(l.id));

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#ec4899]/10 flex items-center justify-center">
            <Heart size={20} className="text-[#ec4899]" fill="currentColor" />
          </div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] text-white">
            {t.navWishlist ?? "Wishlist"}
          </h1>
        </div>
        <p className="text-slate-400 text-sm ml-[52px]">
          {wishlistLaptops.length > 0
            ? `${wishlistLaptops.length} laptop tersimpan di daftar favorit Anda.`
            : "Belum ada laptop yang disimpan."}
        </p>
      </div>

      {/* Empty state */}
      {wishlistLaptops.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-20 h-20 rounded-2xl bg-[#ec4899]/10 flex items-center justify-center mb-6">
            <Heart size={36} className="text-[#ec4899]/40" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2 font-[family-name:var(--font-display)]">
            Belum ada laptop favorit
          </h2>
          <p className="text-slate-400 text-sm mb-6 text-center max-w-sm">
            Jelajahi katalog kami dan ketuk ikon hati pada laptop yang Anda sukai untuk menyimpannya di sini.
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#ec4899] to-[#d946ef] text-white text-sm font-semibold hover:shadow-[0_0_25px_rgba(236,72,153,0.3)] transition-all duration-300 active:scale-95"
          >
            Jelajahi Katalog
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <>
          {/* Clear all button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => wishlistLaptops.forEach(l => toggleWishlist(l.id))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <Trash2 size={12} />
              Hapus Semua
            </button>
          </div>

          {/* Laptop grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
            {wishlistLaptops.map(laptop => {
              const inCompare = compareList.some(c => c.id === laptop.id);
              return (
                <Link
                  key={laptop.id}
                  href={`/catalog/${laptop.id}`}
                  className="card-glow rounded-xl overflow-hidden group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                >
                  <div className="h-1 bg-gradient-to-r from-[#ec4899] via-[#d946ef] to-[#f97316] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-white truncate group-hover:text-[#ec4899] transition-colors">
                          {laptop.nama}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">{laptop.merek} &middot; {laptop.tahun}</p>
                      </div>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ml-2 whitespace-nowrap ${
                        laptop.kondisi === "Baru"
                          ? "text-[#2dd4bf] bg-[#2dd4bf]/10 border-[#2dd4bf]/20"
                          : "text-[#f97316] bg-[#f97316]/10 border-[#f97316]/20"
                      }`}>
                        {laptop.kondisi}
                      </span>
                    </div>

                    <div className="space-y-1.5 mb-4 p-3 rounded-lg bg-slate-900">
                      <div className="flex items-center gap-2 text-xs text-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf]" />
                        {laptop.spesifikasi.processor}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d946ef]" />
                        {laptop.spesifikasi.ram} &middot; {laptop.spesifikasi.storage}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
                        {laptop.spesifikasi.gpu}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {laptop.kategori.slice(0, 3).map(kat => (
                        <span key={kat} className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-md border ${
                          kategoriColors[kat] || "text-slate-400 bg-white/5 border-white/10"
                        }`}>
                          {kat}
                        </span>
                      ))}
                    </div>

                    {laptop.isu_diketahui && (
                      <p className="text-[10px] text-slate-400 mb-3 line-clamp-2 leading-relaxed">
                        &#x26A0; {laptop.isu_diketahui}
                      </p>
                    )}

                    <div className="flex justify-between items-start pt-3 border-t border-white/5 gap-3">
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-bold font-[family-name:var(--font-display)] text-white block leading-tight">
                          {formatRupiah(laptop.harga_min)} - {formatRupiah(laptop.harga_max)}
                        </span>
                        <span className="text-[10px] italic text-slate-400 mt-0.4 block leading-tight">
                          *Harga kisaran, dapat berubah
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          onClick={(e) => { e.stopPropagation(); e.preventDefault(); toggleWishlist(laptop.id); }}
                          className="p-2 rounded-lg bg-[#ec4899]/15 text-[#ec4899] transition-all hover:bg-[#ec4899]/25"
                        >
                          <Heart size={14} fill="currentColor" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); e.preventDefault(); toggleCompare(laptop); }}
                          className={`px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all ${
                            inCompare ? "bg-[#2dd4bf]/15 text-[#2dd4bf] border border-[#2dd4bf]/30" : "bg-white/5 text-slate-500 border border-white/10 hover:text-[#2dd4bf] hover:border-[#2dd4bf]/30"
                          }`}
                        >
                          {inCompare ? t.catalogCompareChosen : t.catalogCompareBtn}
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
