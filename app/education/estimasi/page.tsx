"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

type EstimateItem = {
  id: string;
  name: string;
  brand: string;
  releaseYear: number;
  originalPrice: number;
  condition: "bagus" | "sedang" | "kurang";
  currentEstimate: number;
};

const estimates: EstimateItem[] = [
  {
    id: "macbook-air-m1-2020",
    name: "MacBook Air M1 2020",
    brand: "Apple",
    releaseYear: 2020,
    originalPrice: 17,
    condition: "bagus",
    currentEstimate: 11,
  },
  {
    id: "asus-zenbook-14",
    name: "ASUS ZenBook 14 UX425",
    brand: "ASUS",
    releaseYear: 2021,
    originalPrice: 14,
    condition: "bagus",
    currentEstimate: 8,
  },
  {
    id: "lenovo-ideapad-slim-5",
    name: "Lenovo IdeaPad Slim 5",
    brand: "Lenovo",
    releaseYear: 2022,
    originalPrice: 10,
    condition: "sedang",
    currentEstimate: 5,
  },
  {
    id: "hp-pavilion-14",
    name: "HP Pavilion 14",
    brand: "HP",
    releaseYear: 2021,
    originalPrice: 11,
    condition: "sedang",
    currentEstimate: 5,
  },
  {
    id: "acer-swift-3",
    name: "Acer Swift 3 SF314",
    brand: "Acer",
    releaseYear: 2020,
    originalPrice: 9,
    condition: "kurang",
    currentEstimate: 3,
  },
  {
    id: "macbook-pro-m1-2021",
    name: "MacBook Pro 14\" M1 Pro",
    brand: "Apple",
    releaseYear: 2021,
    originalPrice: 28,
    condition: "bagus",
    currentEstimate: 19,
  },
  {
    id: "asus-vivobook-s14",
    name: "ASUS VivoBook S14",
    brand: "ASUS",
    releaseYear: 2022,
    originalPrice: 12,
    condition: "bagus",
    currentEstimate: 7,
  },
  {
    id: "dell-xps-13",
    name: "Dell XPS 13 9310",
    brand: "Dell",
    releaseYear: 2021,
    originalPrice: 18,
    condition: "sedang",
    currentEstimate: 10,
  },
];

function getConditionLabel(c: EstimateItem["condition"]) {
  return c === "bagus" ? "Bagus" : c === "sedang" ? "Sedang" : "Kurang";
}

function getConditionColor(c: EstimateItem["condition"]) {
  return c === "bagus"
    ? "bg-emerald-50 text-emerald-600"
    : c === "sedang"
    ? "bg-amber-50 text-amber-600"
    : "bg-red-50 text-red-600";
}

function getAge(year: number) {
  return new Date().getFullYear() - year;
}

function getDepreciation(original: number, current: number) {
  return Math.round(((original - current) / original) * 100);
}

export default function EstimasiPage() {
  const [search, setSearch] = useState("");
  const [conditionFilter, setConditionFilter] = useState<string>("semua");

  const filtered = useMemo(() => {
    return estimates.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.brand.toLowerCase().includes(search.toLowerCase());
      const matchCondition =
        conditionFilter === "semua" || item.condition === conditionFilter;
      return matchSearch && matchCondition;
    });
  }, [search, conditionFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-3xl">💰</span>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            Estimasi Harga Jual/Beli Second
          </h1>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            Perkiraan harga wajar laptop bekas berdasarkan spesifikasi, kondisi, dan usia.
          </p>

          <div className="mt-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari laptop, contoh: MacBook, ASUS..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Condition Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: "semua", label: "Semua Kondisi" },
            { id: "bagus", label: "Bagus" },
            { id: "sedang", label: "Sedang" },
            { id: "kurang", label: "Kurang" },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setConditionFilter(opt.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                conditionFilter === opt.id
                  ? "bg-emerald-500 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Result Count */}
        {search && (
          <p className="text-xs text-gray-400 mb-4">
            {filtered.length} hasil untuk &ldquo;{search}&rdquo;
          </p>
        )}

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-medium text-gray-500">Laptop tidak ditemukan</p>
            <p className="text-sm text-gray-400 mt-1">Coba kata kunci yang berbeda</p>
          </div>
        )}

        {/* Estimation Cards */}
        <div className="space-y-3">
          {filtered.map((item) => {
            const dep = getDepreciation(item.originalPrice, item.currentEstimate);
            const age = getAge(item.releaseYear);
            return (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-emerald-200 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-gray-900">{item.name}</h3>
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${getConditionColor(
                          item.condition
                        )}`}
                      >
                        {getConditionLabel(item.condition)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.brand} — Rilis {item.releaseYear} ({age} tahun lalu)
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-gray-900">
                      Rp {item.currentEstimate.toLocaleString("id-ID")} jt
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      dari Rp {item.originalPrice.toLocaleString("id-ID")} jt (-{dep}%)
                    </p>
                  </div>
                </div>

                {/* Depreciation Bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
                    <span>Harga Baru</span>
                    <span>Harga Second</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full"
                      style={{ width: `${100 - dep}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center">
          <p className="text-sm font-medium text-emerald-800">Ingin membandingkan harga?</p>
          <p className="text-sm text-emerald-600 mt-1">
            Gunakan fitur rekomendasi untuk menemukan laptop terbaik.
          </p>
          <Link
            href="/recommendations"
            className="mt-4 inline-block bg-emerald-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Mulai Rekomendasi →
          </Link>
        </div>
      </div>
    </div>
  );
}
