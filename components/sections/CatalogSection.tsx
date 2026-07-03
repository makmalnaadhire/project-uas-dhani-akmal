"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Laptop } from "@/lib/types";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { Search, SlidersHorizontal, X, Heart } from "lucide-react";

interface Props {
  laptops: Laptop[];
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  compareList: Laptop[];
  toggleCompare: (laptop: Laptop) => void;
  setSelectedLaptop: (l: Laptop | null) => void;
}

const formatRupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

const categoryColors: Record<string, string> = {
  "College/Work": "text-[#2dd4bf] bg-[#2dd4bf]/10 border-[#2dd4bf]/20",
  "Gaming": "text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/20",
  "Gaming/Editing": "text-[#f97316] bg-[#f97316]/10 border-[#f97316]/20",
  "Editing/College": "text-[#d946ef] bg-[#d946ef]/10 border-[#d946ef]/20",
  "Editing": "text-[#a855f7] bg-[#a855f7]/10 border-[#a855f7]/20",
  "Editing/Gaming": "text-[#ec4899] bg-[#ec4899]/10 border-[#ec4899]/20",
};

export default function CatalogSection({
  laptops, wishlist, toggleWishlist, compareList, toggleCompare, setSelectedLaptop,
}: Props) {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("All");
  const [conditionFilter, setConditionFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);

  const brands = useMemo(() => ["All", ...Array.from(new Set(laptops.map(l => l.brand)))].sort(), [laptops]);
  const categories = useMemo(() => ["All", ...Array.from(new Set(laptops.map(l => l.category)))].sort(), [laptops]);

  const filtered = useMemo(() => {
    let list = [...laptops];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(l =>
        l.name.toLowerCase().includes(q) ||
        l.brand.toLowerCase().includes(q) ||
        l.cpu.toLowerCase().includes(q) ||
        l.gpu.toLowerCase().includes(q)
      );
    }
    if (brandFilter !== "All") list = list.filter(l => l.brand === brandFilter);
    if (conditionFilter !== "All") list = list.filter(l => l.condition === conditionFilter);
    if (categoryFilter !== "All") list = list.filter(l => l.category === categoryFilter);

    switch (sortBy) {
      case "price-low": list.sort((a, b) => a.price - b.price); break;
      case "price-high": list.sort((a, b) => b.price - a.price); break;
      case "name": list.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return list;
  }, [laptops, search, brandFilter, conditionFilter, categoryFilter, sortBy]);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-2">
          <span className="text-gradient-mint">{t.catalogTitle}</span> {t.catalogSubtitle}
        </h1>
        <p className="text-slate-400 text-sm">
          {t.catalogDesc.replace("{count}", String(laptops.length))}
        </p>
      </div>

      <div className="glass rounded-xl p-4 mb-6">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder={t.catalogSearch}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#0f172a] border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#2dd4bf]/50 focus:shadow-[0_0_15px_rgba(45,212,191,0.15)] transition-all"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
              showFilters ? "bg-[#2dd4bf]/10 border-[#2dd4bf]/30 text-[#2dd4bf]" : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            <SlidersHorizontal size={14} />
            {t.catalogFilter}
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/5">
            <div>
              <label className="text-xs text-slate-500 mb-1 block">{t.catalogBrand}</label>
              <select value={brandFilter} onChange={e => setBrandFilter(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[#0f172a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#2dd4bf]/50">
                {brands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">{t.catalogCondition}</label>
              <select value={conditionFilter} onChange={e => setConditionFilter(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[#0f172a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#2dd4bf]/50">
                <option value="All">{t.catalogAll}</option>
                <option value="New">{t.catalogNew}</option>
                <option value="Used">{t.catalogUsed}</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">{t.catalogCategory}</label>
              <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[#0f172a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#2dd4bf]/50">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">{t.catalogSort}</label>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[#0f172a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#2dd4bf]/50">
                <option value="name">{t.catalogSortName}</option>
                <option value="price-low">{t.catalogSortLow}</option>
                <option value="price-high">{t.catalogSortHigh}</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {compareList.length > 0 && (
        <div className="glass rounded-xl p-4 mb-6 flex items-center justify-between border-[#2dd4bf]/20">
          <span className="text-sm text-[#2dd4bf] font-medium">
            {compareList.length}/3 {t.catalogCompare}
          </span>
          <div className="flex gap-2">
            {compareList.map(l => (
              <span key={l.id} className="px-2 py-1 rounded bg-[#2dd4bf]/10 text-[#2dd4bf] text-xs">
                {l.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">&#x1F50D;</div>
          <p className="text-slate-400 text-lg mb-2">{t.catalogEmpty}</p>
          <p className="text-slate-500 text-sm">{t.catalogEmptyHint}</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
          {filtered.map(laptop => {
            const isWished = wishlist.includes(laptop.id);
            const inCompare = compareList.some(c => c.id === laptop.id);
            return (
              <Link
                key={laptop.id}
                href={`/catalog/${laptop.id}`}
                className="card-glow glass rounded-xl overflow-hidden group"
              >
                <div className="h-1 bg-gradient-to-r from-[#2dd4bf] via-[#d946ef] to-[#f97316] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white truncate group-hover:text-[#2dd4bf] transition-colors">
                        {laptop.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">{laptop.brand}</p>
                    </div>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ml-2 whitespace-nowrap ${
                      laptop.condition === "New"
                        ? "text-[#2dd4bf] bg-[#2dd4bf]/10 border-[#2dd4bf]/20"
                        : "text-[#f97316] bg-[#f97316]/10 border-[#f97316]/20"
                    }`}>
                      {laptop.condition === "New" ? t.catalogNew : t.catalogUsed}
                    </span>
                  </div>

                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf]/60" />
                      {laptop.cpu}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d946ef]/60" />
                      {laptop.ram} RAM · {laptop.storage}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]/60" />
                      {laptop.gpu}
                    </div>
                  </div>

                  <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-md border mb-4 ${
                    categoryColors[laptop.category] || "text-slate-400 bg-white/5 border-white/10"
                  }`}>
                    {laptop.category}
                  </span>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="text-lg font-bold font-[family-name:var(--font-display)] text-white">
                      {formatRupiah(laptop.price)}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); toggleWishlist(laptop.id); }}
                        className={`p-2 rounded-lg transition-all ${
                          isWished ? "bg-[#ec4899]/15 text-[#ec4899]" : "bg-white/5 text-slate-500 hover:text-[#ec4899] hover:bg-[#ec4899]/10"
                        }`}
                      >
                        <Heart size={14} fill={isWished ? "currentColor" : "none"} />
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
      )}
    </div>
  );
}
