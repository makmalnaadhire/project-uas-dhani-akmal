"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Tag, Filter } from "lucide-react";
import laptopsData from "@/data/laptops.json";

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

export default function HargaPage() {
  const [brand, setBrand] = useState<string>("Semua");
  const [sort, setSort] = useState<"low" | "high" | "rating">("low");

  const filtered = useMemo(() => {
    let result = [...laptops];
    if (brand !== "Semua") result = result.filter((l) => l.brand === brand);
    if (sort === "low") result.sort((a, b) => a.price - b.price);
    else if (sort === "high") result.sort((a, b) => b.price - a.price);
    else result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [brand, sort]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-emerald-500 mb-2">
            <Tag className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
              Harga
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Daftar Harga Laptop</h1>
          <p className="mt-1.5 text-sm text-gray-500">
            {filtered.length} laptop tersedia — urutkan berdasarkan harga atau rating.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
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
          </div>
          <div className="flex gap-1.5">
            {[
              { id: "low", label: "Terendah" },
              { id: "high", label: "Tertinggi" },
              { id: "rating", label: "Rating" },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSort(opt.id as typeof sort)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  sort === opt.id
                    ? "bg-emerald-500 text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Laptop
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">
                  Processor
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">
                  RAM
                </th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Harga
                </th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((laptop, i) => (
                <tr
                  key={laptop.id}
                  className={`border-b border-gray-100 last:border-0 hover:bg-emerald-50/30 transition-colors ${
                    i % 2 === 0 ? "" : "bg-gray-50/50"
                  }`}
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/catalog/${laptop.id}`}
                        className="text-sm font-semibold text-gray-900 hover:text-emerald-600"
                      >
                        {laptop.name}
                      </Link>
                      <span
                        className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                          laptop.condition === "baru"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        {laptop.condition === "baru" ? "Baru" : "Second"}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5">{laptop.brand}</p>
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-600 hidden sm:table-cell">
                    {laptop.specs.processor}
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-600 hidden md:table-cell">
                    {laptop.specs.ram}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span className="text-sm font-bold text-gray-900">
                      Rp {laptop.price.toLocaleString("id-ID")} jt
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span className="text-xs text-gray-500">⭐ {laptop.rating}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center">
          <p className="text-sm font-medium text-emerald-800">Ingin rekomendasi personal?</p>
          <p className="text-sm text-emerald-600 mt-1">
            Gunakan fitur rekomendasi cerdas kami.
          </p>
          <Link
            href="/recommendations"
            className="mt-4 inline-flex items-center gap-2 bg-emerald-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Mulai Rekomendasi <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
