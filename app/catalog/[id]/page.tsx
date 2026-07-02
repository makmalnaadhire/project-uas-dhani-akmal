"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Cpu,
  MemoryStick,
  HardDrive,
  MonitorSmartphone,
  Star,
} from "lucide-react";
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

export default function LaptopDetailPage() {
  const { id } = useParams<{ id: string }>();
  const laptop = laptops.find((l) => l.id === id);

  if (!laptop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-medium text-gray-700">Laptop tidak ditemukan</p>
          <Link
            href="/catalog"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-gray-900">
                  {laptop.name}
                </h1>
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
              <p className="text-sm text-gray-500 mt-1">
                {laptop.brand} - {laptop.screen}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <WishlistButton laptopId={laptop.id} />
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  Rp {laptop.price.toLocaleString("id-ID")} jt
                </p>
                <div className="flex items-center justify-end gap-1 mt-0.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm text-gray-500">
                    {laptop.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-4 leading-relaxed">
            {laptop.description}
          </p>

          <div className="mt-6">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Spesifikasi
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <SpecItem icon={Cpu} label="Processor" value={laptop.specs.processor} />
              <SpecItem icon={MemoryStick} label="RAM" value={laptop.specs.ram} />
              <SpecItem icon={HardDrive} label="Storage" value={laptop.specs.storage} />
              <SpecItem icon={MonitorSmartphone} label="GPU" value={laptop.specs.gpu} />
            </div>
          </div>

          {laptop.needs.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Cocok untuk
              </h2>
              <div className="flex flex-wrap gap-2">
                {laptop.needs.map((need) => (
                  <span
                    key={need}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 capitalize"
                  >
                    {need}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SpecItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Cpu;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-gray-50 border border-gray-100 rounded-xl p-3">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-[10px] text-gray-400 uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p className="text-xs font-medium text-gray-700">{value}</p>
    </div>
  );
}
