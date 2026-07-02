"use client";

import Link from "next/link";
import { Star, Cpu, MemoryStick, HardDrive, MonitorSmartphone, ArrowRight } from "lucide-react";
import WishlistButton from "./WishlistButton";

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

export default function LaptopCard({ laptop }: { laptop: Laptop }) {
  return (
    <div className="border border-gray-200 bg-white rounded-2xl p-5 hover:border-emerald-200 hover:shadow-sm transition-all">
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

      <p className="text-xs text-gray-600 mt-3 leading-relaxed line-clamp-2">{laptop.description}</p>

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
