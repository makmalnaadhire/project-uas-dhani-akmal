"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Cpu, MemoryStick, HardDrive, MonitorSmartphone, Star } from "lucide-react";
import laptopsData from "@/data/laptops.json";
import WishlistButton from "@/components/WishlistButton";

type Laptop = {
  id: string;
  name: string;
  brand: string;
  price: number;
  condition: "baru" | "second";
  needs: string[];
  specs: { processor: string; ram: string; storage: string; gpu: string };
  screen: string;
  rating: number;
  description: string;
};

const laptops = laptopsData as Laptop[];

const brands = [...new Set(laptops.map((l) => l.brand))].sort();
const priceRanges = [
  { label: "Semua", min: 0, max: 999 },
  { label: "< 8 jt", min: 0, max: 8 },
  { label: "8 - 15 jt", min: 8, max: 15 },
  { label: "> 15 jt", min: 15, max: 999 },
];

export default function CatalogPage() {
  const [brand, setBrand] = useState<string>("Semua");
  const [priceIdx, setPriceIdx] = useState(0);
  const [condition, setCondition] = useState<"semua" | "baru" | "second">("semua");
  const [sort, setSort] = useState<"popular" | "price-asc" | "price-desc">("popular");

  const filtered = useMemo(() => {
    let result = [...laptops];
    if (brand !== "Semua") result = result.filter((l) => l.brand === brand);
    if (condition !== "semua") result = result.filter((l) => l.condition === condition);

    const { min, max } = priceRanges[priceIdx];
    result = result.filter((l) => l.price >= min && l.price <= max);

    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    else result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [brand, priceIdx, condition, sort]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">
            Katalog
          </span>
          <h1 className="mt-1.5 text-3xl font-bold text-gray-900">Daftar Laptop</h1>
          <p className="mt-1.5 text-sm text-gray-500">
            {filtered.length} laptop tersedia — temukan yang paling cocok untukmu.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"
          >
            <option value="Semua">Semua Merek</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          <select
            value={priceIdx}
            onChange={(e) => setPriceIdx(Number(e.target.value))}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"
          >
            {priceRanges.map((r, i) => (
              <option key={r.label} value={i}>{r.label}</option>
            ))}
          </select>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value as typeof condition)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"
          >
            <option value="semua">Semua Kondisi</option>
            <option value="baru">Baru</option>
            <option value="second">Second</option>
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"
          >
            <option value="popular">Terpopuler</option>
            <option value="price-asc">Harga Terendah</option>
            <option value="price-desc">Harga Tertinggi</option>
          </select>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-medium text-gray-500">Tidak ada laptop yang cocok</p>
            <p className="text-sm mt-1">Coba ubah filter untuk melihat lebih banyak pilihan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((laptop) => (
              <div
                key={laptop.id}
                className="border border-gray-200 bg-white rounded-2xl p-5 hover:border-emerald-200 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-gray-900">{laptop.name}</h3>
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                          laptop.condition === "baru"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        {laptop.condition === "baru" ? "Baru" : "Second"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{laptop.brand} - {laptop.screen}</p>
                  </div>
                  <WishlistButton laptopId={laptop.id} />
                </div>

                <p className="text-xs text-gray-600 mt-3 leading-relaxed line-clamp-2">
                  {laptop.description}
                </p>

                <div className="mt-3 grid grid-cols-2 gap-1.5">
                  <MiniSpec icon={Cpu} label={laptop.specs.processor} />
                  <MiniSpec icon={MemoryStick} label={laptop.specs.ram} />
                  <MiniSpec icon={HardDrive} label={laptop.specs.storage} />
                  <MiniSpec icon={MonitorSmartphone} label={laptop.specs.gpu} />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-base font-bold text-gray-900">
                      Rp {laptop.price.toLocaleString("id-ID")} jt
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-[11px] text-gray-500">{laptop.rating}</span>
                    </div>
                  </div>
                  <Link
                    href={`/catalog/${laptop.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    Detail <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MiniSpec({ icon: Icon, label }: { icon: typeof Cpu; label: string }) {
  return (
    <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-lg px-2 py-1">
      <Icon className="w-3 h-3 text-gray-400 shrink-0" />
      <span className="text-[10px] text-gray-600 truncate">{label}</span>
    </div>
  );
}
