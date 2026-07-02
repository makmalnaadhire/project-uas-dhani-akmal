"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";

type FilterState = {
  brand: string;
  minPrice: number;
  maxPrice: number;
  condition: "semua" | "baru" | "second";
  sort: "popular" | "price-asc" | "price-desc";
};

type FilterSidebarProps = {
  brands: string[];
  filters: FilterState;
  onChange: (filters: FilterState) => void;
};

export default function FilterSidebar({ brands, filters, onChange }: FilterSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const update = (patch: Partial<FilterState>) => {
    onChange({ ...filters, ...patch });
  };

  const content = (
    <div className="space-y-5">
      {/* Brand */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Merek
        </label>
        <select
          value={filters.brand}
          onChange={(e) => update({ brand: e.target.value })}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"
        >
          <option value="Semua">Semua Merek</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Harga (jt)
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            value={filters.minPrice}
            onChange={(e) => update({ minPrice: Number(e.target.value) })}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"
            placeholder="Min"
          />
          <span className="text-gray-400">–</span>
          <input
            type="number"
            min={0}
            value={filters.maxPrice}
            onChange={(e) => update({ maxPrice: Number(e.target.value) })}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"
            placeholder="Max"
          />
        </div>
      </div>

      {/* Condition */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Kondisi
        </label>
        <div className="flex gap-1.5">
          {(["semua", "baru", "second"] as const).map((c) => (
            <button
              key={c}
              onClick={() => update({ condition: c })}
              className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filters.condition === c
                  ? "bg-emerald-500 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {c === "semua" ? "Semua" : c === "baru" ? "Baru" : "Second"}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Urutkan
        </label>
        <select
          value={filters.sort}
          onChange={(e) => update({ sort: e.target.value as FilterState["sort"] })}
          className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"
        >
          <option value="popular">Terpopuler</option>
          <option value="price-asc">Harga Terendah</option>
          <option value="price-desc">Harga Tertinggi</option>
        </select>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block bg-white border border-gray-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-gray-400" />
          <h3 className="text-sm font-semibold text-gray-900">Filter</h3>
        </div>
        {content}
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-40 bg-emerald-500 text-white p-3 rounded-full shadow-lg"
      >
        <Filter className="w-5 h-5" />
      </button>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-semibold text-gray-900">Filter</h3>
              <button onClick={() => setMobileOpen(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
