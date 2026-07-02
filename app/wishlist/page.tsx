"use client";

import Link from "next/link";
import {
  Heart,
  Trash2,
  ArrowRight,
  Cpu,
  MemoryStick,
  HardDrive,
  MonitorSmartphone,
  Star,
  ArrowLeft,
} from "lucide-react";
import laptopsData from "@/data/laptops.json";
import { useWishlist } from "@/hooks/useWishlist";

/* ---------------------------------- Types ---------------------------------- */

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

/* ---------------------------------- Page ------------------------------------ */

export default function WishlistPage() {
  const { items: wishlist, remove, hydrated } = useWishlist();

  const wishlistedLaptops = wishlist
    .map((item) => ({
      laptop: laptops.find((l) => l.id === item.id),
      addedAt: item.addedAt,
    }))
    .filter((item) => item.laptop)
    .sort((a, b) => b.addedAt - a.addedAt);

  const totalEstimate = wishlistedLaptops.reduce(
    (sum, item) => sum + (item.laptop?.price ?? 0),
    0
  );

  const clearAll = () => {
    for (const item of wishlist) remove(item.id);
  };

  if (!hydrated) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-200 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-emerald-500 mb-3">
            <Heart className="w-6 h-6 fill-emerald-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
              Wishlist
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Laptop Favoritmu
          </h1>
          <p className="mt-2 text-gray-500 text-sm">
            Simpan laptop yang kamu suka untuk dibandingkan nanti.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Empty State */}
        {wishlistedLaptops.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-gray-300 mx-auto" />
            <h2 className="mt-4 text-lg font-semibold text-gray-700">
              Wishlist masih kosong
            </h2>
            <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">
              Mulai jelajahi katalog dan klik hati untuk menambahkan laptop ke
              wishlist.
            </p>
            <Link
              href="/catalog"
              className="mt-6 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              Jelajahi Katalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* Stats Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">
                  {wishlistedLaptops.length}
                </span>{" "}
                laptop tersimpan
              </p>
              <div className="flex items-center gap-4">
                <p className="text-sm text-gray-500">
                  Estimasi total:{" "}
                  <span className="font-bold text-gray-900">
                    Rp {totalEstimate.toLocaleString("id-ID")} jt
                  </span>
                </p>
                <button
                  onClick={clearAll}
                  className="text-xs font-medium text-red-500 hover:text-red-600 transition-colors"
                >
                  Hapus Semua
                </button>
              </div>
            </div>

            {/* Laptop Cards */}
            <div className="space-y-4">
              {wishlistedLaptops.map(({ laptop }) => (
                <WishlistCard
                  key={laptop!.id}
                  laptop={laptop!}
                  onRemove={remove}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold px-5 py-3 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Lanjut Belanja
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------- Wishlist Card ------------------------------- */

function WishlistCard({
  laptop,
  onRemove,
}: {
  laptop: Laptop;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="border border-gray-200 bg-white rounded-2xl p-5 hover:border-emerald-200 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-gray-900">
              {laptop.name}
            </h3>
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
          <p className="text-xs text-gray-500 mt-1">
            {laptop.brand} - {laptop.screen}
          </p>
        </div>

        <div className="text-right shrink-0">
          <p className="text-base font-bold text-gray-900">
            Rp {laptop.price.toLocaleString("id-ID")} jt
          </p>
          <div className="flex items-center justify-end gap-1 mt-0.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs text-gray-500">{laptop.rating}</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-600 mt-3 leading-relaxed">
        {laptop.description}
      </p>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
        <SpecBadge icon={Cpu} label={laptop.specs.processor} />
        <SpecBadge icon={MemoryStick} label={laptop.specs.ram} />
        <SpecBadge icon={HardDrive} label={laptop.specs.storage} />
        <SpecBadge icon={MonitorSmartphone} label={laptop.specs.gpu} />
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center gap-3">
        <Link
          href={`/catalog/${laptop.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
        >
          Lihat Detail <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <button
          onClick={() => onRemove(laptop.id)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-600 ml-auto"
        >
          <Trash2 className="w-3.5 h-3.5" /> Hapus
        </button>
      </div>
    </div>
  );
}

/* ----------------------------------- Badge ---------------------------------- */

function SpecBadge({
  icon: Icon,
  label,
}: {
  icon: typeof Cpu;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1.5">
      <Icon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
      <span className="text-[11px] text-gray-600 truncate">{label}</span>
    </div>
  );
}
