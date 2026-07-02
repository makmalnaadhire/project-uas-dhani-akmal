"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Clock, ArrowRight, Info } from "lucide-react";

type LaptopAge = {
  id: string;
  name: string;
  brand: string;
  releaseYear: number;
  condition: "baru" | "second";
  notes: string[];
};

const laptops: LaptopAge[] = [
  {
    id: "macbook-air-m1",
    name: "MacBook Air M1",
    brand: "Apple",
    releaseYear: 2020,
    condition: "second",
    notes: ["M1 masih sangat relevan", "Baterai tahan lama", "Tidak ada fan = tidak ada debu"],
  },
  {
    id: "asus-zenbook-14",
    name: "ASUS ZenBook 14",
    brand: "ASUS",
    releaseYear: 2021,
    condition: "second",
    notes: ["Build quality premium", "Layar OLED opsional", "Port selection terbatas"],
  },
  {
    id: "lenovo-ideapad-slim-3",
    name: "Lenovo IdeaPad Slim 3",
    brand: "Lenovo",
    releaseYear: 2023,
    condition: "second",
    notes: ["Masih dalam garansi", "AMD Ryzen 7000 series", "Harga jatuh cukup cepat"],
  },
  {
    id: "hp-pavilion-14",
    name: "HP Pavilion 14",
    brand: "HP",
    releaseYear: 2022,
    condition: "second",
    notes: ["Desain elegan", "Keyboard nyaman", "Speaker Bang & Olufsen"],
  },
  {
    id: "acer-aspire-5",
    name: "Acer Aspire 5",
    brand: "Acer",
    releaseYear: 2021,
    condition: "second",
    notes: ["Budget friendly", "Mudah di-upgrade RAM", "Layar IPS standar"],
  },
  {
    id: "dell-inspiron-14",
    name: "Dell Inspiron 14",
    brand: "Dell",
    releaseYear: 2022,
    condition: "second",
    notes: ["Build solid", "Layar bagus untuk harga", "Service center luas"],
  },
];

function getLifespan(year: number): { status: string; color: string; desc: string } {
  const age = new Date().getFullYear() - year;
  if (age <= 1) return { status: "Sangat Baru", color: "bg-emerald-50 text-emerald-600", desc: "Masih dalam garansi, performa optimal." };
  if (age <= 2) return { status: "Masih Muda", color: "bg-emerald-50 text-emerald-600", desc: "Performa masih sangat baik, garansi mungkin masih aktif." };
  if (age <= 3) return { status: "Cukup Tua", color: "bg-amber-50 text-amber-600", desc: "Mulai pertimbangkan thermal paste, baterai masih oke." };
  if (age <= 4) return { status: "Tua", color: "bg-orange-50 text-orange-600", desc: "Baterai mulai lemah, mungkin perlu upgrade SSD/RAM." };
  return { status: "Sangat Tua", color: "bg-red-50 text-red-600", desc: "Pertimbangkan masa pakai tersisa, mungkin waktunya upgrade." };
}

function getSisaPakai(year: number, condition: string): string {
  const age = new Date().getFullYear() - year;
  if (condition === "baru") {
    if (age <= 1) return "4-6 tahun lagi";
    if (age <= 2) return "3-5 tahun lagi";
    if (age <= 3) return "2-4 tahun lagi";
    return "1-3 tahun lagi";
  }
  if (age <= 1) return "3-5 tahun lagi";
  if (age <= 2) return "2-4 tahun lagi";
  if (age <= 3) return "1-3 tahun lagi";
  if (age <= 4) return "1-2 tahun lagi";
  return "6 bulan - 1 tahun";
}

export default function UmurLaptopPage() {
  const [yearFilter, setYearFilter] = useState<string>("semua");

  const filtered = useMemo(() => {
    if (yearFilter === "semua") return laptops;
    return laptops.filter((l) => {
      const age = new Date().getFullYear() - l.releaseYear;
      if (yearFilter === "baru") return age <= 1;
      if (yearFilter === "muda") return age >= 2 && age <= 3;
      return age >= 4;
    });
  }, [yearFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-3xl">⏰</span>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">Cek Umur Laptop</h1>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            Ketahui seberapa tua laptop yang ingin kamu beli dan sisa masa pakainya.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
            <Info className="w-3.5 h-3.5" />
            <span>Estimasi berdasarkan usia rata-rata pemakaian normal</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: "semua", label: "Semua Usia" },
            { id: "baru", label: "≤ 1 Tahun" },
            { id: "muda", label: "2–3 Tahun" },
            { id: "tua", label: "≥ 4 Tahun" },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setYearFilter(opt.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                yearFilter === opt.id
                  ? "bg-emerald-500 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {filtered.map((laptop) => {
            const age = new Date().getFullYear() - laptop.releaseYear;
            const lifespan = getLifespan(laptop.releaseYear);
            const sisa = getSisaPakai(laptop.releaseYear, laptop.condition);
            return (
              <div
                key={laptop.id}
                className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-emerald-200 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-semibold text-gray-900">{laptop.name}</h3>
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${lifespan.color}`}
                      >
                        {lifespan.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {laptop.brand} — Rilis {laptop.releaseYear} ({age} tahun lalu)
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1 text-emerald-600">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-xs font-semibold">{sisa}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-0.5">sisa pakai</p>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-2">{lifespan.desc}</p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {laptop.notes.map((note, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-gray-50 border border-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tips */}
        <div className="mt-10 bg-amber-50 border border-amber-100 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-amber-800 mb-2">
            Tips Memperpanjang Umur Laptop
          </h2>
          <ul className="space-y-1.5 text-xs text-amber-700">
            <li>• Bersihkan ventilasi dari debu secara berkala (3–6 bulan sekali)</li>
            <li>• Ganti thermal paste setiap 3–4 tahun untuk menjaga suhu optimal</li>
            <li>• Jangan charge baterai terus-menerus saat sudah 100%</li>
            <li>• Gunakan laptop di permukaan keras (meja) untuk sirkulasi udara</li>
            <li>• Update driver dan OS secara berkala untuk performa optimal</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-10 bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center">
          <p className="text-sm font-medium text-emerald-800">Siap memilih laptop?</p>
          <p className="text-sm text-emerald-600 mt-1">
            Bandingkan harga dan spesifikasi di katalog kami.
          </p>
          <Link
            href="/catalog"
            className="mt-4 inline-flex items-center gap-2 bg-emerald-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Lihat Katalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
