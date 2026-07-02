"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, MemoryStick, HardDrive, MonitorSmartphone, Star } from "lucide-react";
import { hoverZoomWiggle } from "@/lib/motion";
import { useLanguage } from "@/lib/LanguageContext";

type Laptop = {
  id: number;
  name: string;
  rating: number;
  specs: string;
  price: string;
  image: string;
};

type ParsedSpecs = {
  processor: string;
  ram: string;
  storage: string;
  gpu: string;
};

const priceRanges = [
  { label: "all", min: 0, max: 999 },
  { label: "<8", min: 0, max: 8 },
  { label: "8-15", min: 8, max: 15 },
  { label: ">15", min: 15, max: 999 },
];

export default function CatalogPage() {
  const { t } = useLanguage();
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceIdx, setPriceIdx] = useState(0);
  const [sort, setSort] = useState<"popular" | "price-asc" | "price-desc">("popular");

  useEffect(() => {
    fetch("/api/laptops")
      .then((res) => res.json())
      .then((data) => {
        setLaptops(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const parseSpecs = (specsStr: string): ParsedSpecs => {
    try {
      return JSON.parse(specsStr);
    } catch {
      return { processor: "", ram: "", storage: "", gpu: "" };
    }
  };

  const extractPrice = (priceStr: string): number => {
    const match = priceStr.replace(/\./g, "").match(/\d+/);
    return match ? parseInt(match[0]) / 1_000_000 : 0;
  };

  const filtered = useMemo(() => {
    let result = [...laptops];

    const { min, max } = priceRanges[priceIdx];
    result = result.filter((l) => {
      const price = extractPrice(l.price);
      return price >= min && price <= max;
    });

    if (sort === "price-asc") result.sort((a, b) => extractPrice(a.price) - extractPrice(b.price));
    else if (sort === "price-desc") result.sort((a, b) => extractPrice(b.price) - extractPrice(a.price));
    else result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [laptops, priceIdx, sort]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-10 px-4 transition-colors">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">
            {t("navCatalog")}
          </span>
          <h1 className="mt-1.5 text-3xl font-bold text-gray-900 dark:text-white">
            {t("catalogTitle")}
          </h1>
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
            {t("catalogSubtitle", { count: filtered.length })}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={priceIdx}
            onChange={(e) => setPriceIdx(Number(e.target.value))}
            className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value={0}>{t("filterBrand")}</option>
            <option value={1}>&lt; 8 jt</option>
            <option value={2}>8 - 15 jt</option>
            <option value={3}>&gt; 15 jt</option>
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="popular">{t("filterPopular")}</option>
            <option value="price-asc">{t("filterPriceLow")}</option>
            <option value="price-desc">{t("filterPriceHigh")}</option>
          </select>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="font-medium text-gray-500 dark:text-gray-400">{t("catalogEmpty")}</p>
            <p className="text-sm mt-1 dark:text-gray-500">{t("catalogEmptyHint")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((laptop) => {
              const specs = parseSpecs(laptop.specs);
              return (
                <motion.div
                  key={laptop.id}
                  {...hoverZoomWiggle}
                  className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-2xl p-5 cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                        {laptop.name}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-1.5">
                    <MiniSpec icon={Cpu} label={specs.processor} />
                    <MiniSpec icon={MemoryStick} label={specs.ram} />
                    <MiniSpec icon={HardDrive} label={specs.storage} />
                    <MiniSpec icon={MonitorSmartphone} label={specs.gpu} />
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-base font-bold text-gray-900 dark:text-white">
                        {laptop.price}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-[11px] text-gray-500 dark:text-gray-400">
                          {laptop.rating}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/catalog/${laptop.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                    >
                      {t("detail")} <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function MiniSpec({ icon: Icon, label }: { icon: typeof Cpu; label: string }) {
  return (
    <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-lg px-2 py-1">
      <Icon className="w-3 h-3 text-gray-400 dark:text-gray-500 shrink-0" />
      <span className="text-[10px] text-gray-600 dark:text-gray-300 truncate">{label}</span>
    </div>
  );
}
