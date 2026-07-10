"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Markdown from "react-markdown";
import type { Laptop } from "@/lib/types";
import laptopsData from "@/data/laptops.json";
import { useTranslation } from "@/components/providers/LanguageProvider";
import {
  ArrowLeft,
  Cpu,
  MemoryStick,
  HardDrive,
  Monitor,
  Tag,
  AlertTriangle,
  StickyNote,
  Sparkles,
  Loader2,
  Laptop as LaptopIcon,
} from "lucide-react";

const formatRupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

const kategoriColors: Record<string, string> = {
  pelajar: "text-[#2dd4bf] bg-[#2dd4bf]/10 border-[#2dd4bf]/20",
  pekerja: "text-[#3b82f6] bg-[#3b82f6]/10 border-[#3b82f6]/20",
  gaming: "text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/20",
  konten_kreator: "text-[#d946ef] bg-[#d946ef]/10 border-[#d946ef]/20",
  programmer: "text-[#a855f7] bg-[#a855f7]/10 border-[#a855f7]/20",
};

const statusBadge: Record<string, { label: string; className: string }> = {
  Active: {
    label: "Active",
    className: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  Discontinued: {
    label: "Discontinued",
    className: "text-slate-400 bg-slate-500/10 border-slate-500/20",
  },
};

function CompareContent() {
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const allLaptops = useMemo(() => (laptopsData as any[]).map((l) => ({
    ...l,
    spesifikasi: {
      processor: l.varian?.[0]?.processor ?? "-",
      ram: l.varian?.[0]?.ram ?? "-",
      storage: l.varian?.[0]?.storage ?? "-",
      gpu: l.varian?.[0]?.gpu ?? "-",
      display: l.varian?.[0]?.display ?? "-",
      os: l.varian?.[0]?.os ?? "-",
      resolusi: l.varian?.[0]?.resolusi ?? "-",
    },
  } as Laptop)), []);

  const selectedIds = useMemo(() => {
    const raw = searchParams.get("ids");
    if (!raw) return [];
    return raw.split(",").filter(Boolean);
  }, [searchParams]);

  const comparedLaptops = useMemo(
    () => selectedIds.map((id) => allLaptops.find((l) => l.id === id)).filter(Boolean) as Laptop[],
    [selectedIds, allLaptops]
  );

  useEffect(() => {
    setAiAnalysis(null);
    setAiLoading(false);
  }, [searchParams.get("ids")]);

  const handleAiAnalysis = async () => {
    if (comparedLaptops.length < 2 || aiLoading) return;

    setAiLoading(true);
    setAiAnalysis(null);

    const laptopDetails = comparedLaptops.map((l) => {
      const v = l.varian?.[0];
      const processor = v?.processor ?? l.spesifikasi?.processor ?? "-";
      const ram = v?.ram ?? l.spesifikasi?.ram ?? "-";
      const storage = v?.storage ?? l.spesifikasi?.storage ?? "-";
      const gpu = v?.gpu ?? l.spesifikasi?.gpu ?? "-";
      const display = v?.display ?? l.spesifikasi?.display ?? "-";
      const harga = `${formatRupiah(l.harga_min)} - ${formatRupiah(l.harga_max)}`;
      return `${l.nama} (${l.merek}, ${l.tahun}, ${l.kondisi})\nHarga: ${harga}\nProcessor: ${processor}\nRAM: ${ram}\nStorage: ${storage}\nGPU: ${gpu}\nDisplay: ${display}`;
    }).join("\n\n");

    const prompt = `Lakukan analisis komparasi objektif mendalam antara laptop berikut:\n\n${laptopDetails}\n\nWajib pisahkan jawaban Anda ke dalam 3 bagian menggunakan heading markdown (###):
1. Ringkasan Performa Side-by-Side (Gunakan bullet points berjarak)
2. Kelebihan & Kekurangan Utama masing-masing opsi
3. Rekomendasi Final (Tipe pengguna mana yang paling cocok membeli masing-masing laptop).
Jangan menulis paragraf yang terlalu panjang atau rapat. Gunakan spasi baris baru antar poin.`;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
      });
      const data = await res.json();
      setAiAnalysis(data.content || "Analisis tidak tersedia saat ini.");
    } catch {
      setAiAnalysis("Gagal memuat analisis AI. Silakan coba lagi.");
    } finally {
      setAiLoading(false);
    }
  };

  if (comparedLaptops.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 text-slate-100 pt-28 pb-12 px-6">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">&#x1F50D;</div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-2">{t.compareEmpty}</h1>
          <p className="text-slate-400 text-sm mb-6">{t.compareEmptyHint}</p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2dd4bf] to-[#06b6d4] text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all"
          >
            <ArrowLeft size={16} />
            {t.compareBack}
          </Link>
        </div>
      </div>
    );
  }

  const specRows = [
    { label: t.compareBrand, icon: <Tag size={14} />, getValue: (l: Laptop) => l.merek },
    { label: t.compareYear, icon: null, getValue: (l: Laptop) => String(l.tahun) },
    { label: t.compareProcessor, icon: <Cpu size="{14}"/>, getValue: (l: Laptop) => l.varian?.[0]?.processor || "-" },
    { label: t.compareRAM, icon: <MemoryStick size="{16}"/>, getValue: (l: Laptop) => l.varian?.[0]?.ram || "-" },
    { label: t.compareStorage, icon: <HardDrive size="{14}"/>, getValue: (l: Laptop) => l.varian?.[0]?.storage || "-" },
    { label: t.compareGPU, icon: <Monitor size="{14}"/>, getValue: (l: Laptop) => l.varian?.[0]?.gpu || "-" },
    { label: t.compareDisplay, icon: <Monitor size={14} />, getValue: (l: Laptop) => l.varian?.[0]?.display || "-" },
    { label: t.compareOS, icon: <LaptopIcon size={14} />, getValue: (l: Laptop) => l.varian?.[0]?.os || "-" },
    { label: t.comparePrice, icon: <Tag size={14} />, getValue: (l: Laptop) => `${formatRupiah(l.harga_min)} - ${formatRupiah(l.harga_max)}`, highlight: true },
    { label: t.compareKondisi, icon: null, getValue: (l: Laptop) => l.kondisi },
    { label: t.compareStatus, icon: null, getValue: (l: Laptop) => l.status },
    { label: t.compareCategory, icon: null, getValue: (l: Laptop) => l.kategori.join(", ") },
    { label: t.compareNotes, icon: <StickyNote size={14} />, getValue: (l: Laptop) => l.catatan || "-" },
    { label: t.compareIssues, icon: <AlertTriangle size={14} />, getValue: (l: Laptop) => l.isu_diketahui || "-", warning: true },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 pt-28 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 px-3 py-1.5 rounded-lg transition-all mb-4"
          >
            <ArrowLeft size={14} />
            {t.compareBack}
          </Link>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-2">
            <span className="text-gradient-mint">{t.compareTitle}</span> {t.compareSubtitle}
          </h1>
          <p className="text-slate-400 text-sm">{t.compareDesc}</p>
        </div>

        {/* Laptop Name Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {comparedLaptops.map((laptop) => {
            const st = statusBadge[laptop.status] || statusBadge.Active;
            return (
              <div
                key={laptop.id}
                className="bg-zinc-900/80 border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2dd4bf] via-[#d946ef] to-[#f97316]" />
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full border ${st.className}`}>
                    {st.label}
                  </span>
                  <span className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full border ${
                    laptop.kondisi === "Baru"
                      ? "text-[#2dd4bf] bg-[#2dd4bf]/10 border-[#2dd4bf]/20"
                      : "text-[#f97316] bg-[#f97316]/10 border-[#f97316]/20"
                  }`}>
                    {laptop.kondisi}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white font-[family-name:var(--font-display)] leading-tight mb-1">
                  {laptop.nama}
                </h2>
                <p className="text-xs text-slate-400 mb-3">
                  {laptop.merek} &middot; {laptop.seri} &middot; {laptop.tahun}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {laptop.kategori.map((kat) => (
                    <span
                      key={kat}
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${
                        kategoriColors[kat] || "text-slate-400 bg-white/5 border-white/10"
                      }`}
                    >
                      {kat.replace("_", " ")}
                    </span>
                  ))}
                </div>

                {/* Price Box */}
                <div className="p-3 rounded-xl bg-gradient-to-r from-[#2dd4bf]/5 to-[#d946ef]/5 border border-white/5">
                  <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-0.5">{t.comparePrice}</p>
                  <p className="text-sm font-bold font-[family-name:var(--font-display)] text-white">
                    {formatRupiah(laptop.harga_min)} - {formatRupiah(laptop.harga_max)}
                  </p>
                  <p className="text-[10px] md:text-xs text-slate-400/80 italic mt-2 block border-t border-slate-800/40 pt-2 leading-relaxed">
                    {t.compareDisclaimer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Specification Matrix */}
        <div className="bg-zinc-900/80 border border-slate-800/80 rounded-2xl overflow-hidden mb-10">
          <div className="px-6 py-4 border-b border-slate-800/80">
            <h3 className="text-sm font-bold text-white font-[family-name:var(--font-display)]">
              {t.compareSpecs}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800/80">
                  <th className="text-left text-[11px] text-slate-500 font-semibold py-3 px-6 w-44 uppercase tracking-wider">
                    {t.compareSpecs}
                  </th>
                  {comparedLaptops.map((l) => (
                    <th
                      key={l.id}
                      className="text-left text-xs text-white font-semibold py-3 px-4 border-l border-slate-800/50"
                    >
                      <span className="block truncate max-w-[200px]">{l.nama}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specRows.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-slate-800/60 last:border-b-0 ${
                      row.highlight ? "bg-[#2dd4bf]/[0.03]" : ""
                    }`}
                  >
                    <td
                      className={`text-[11px] py-3.5 px-6 font-medium flex items-center gap-1.5 ${
                        row.highlight ? "text-[#2dd4bf]" : row.warning ? "text-amber-400/70" : "text-slate-500"
                      }`}
                    >
                      {row.icon}
                      {row.label}
                    </td>
                    {comparedLaptops.map((l) => (
                      <td
                        key={l.id}
                        className={`text-xs py-3.5 px-4 border-l border-slate-800/50 ${
                          row.highlight
                            ? "font-bold text-[#2dd4bf]"
                            : row.warning
                              ? "text-amber-400/80 text-[11px] max-w-[200px]"
                              : "text-slate-200"
                        }`}
                      >
                        {row.warning && row.getValue(l) !== "-"
                          ? <span className="line-clamp-2">{row.getValue(l)}</span>
                          : row.getValue(l)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Analysis Section */}
        <div className="bg-zinc-900/80 border border-slate-800/80 rounded-2xl p-6 mb-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-indigo-400" />
              <h3 className="text-sm font-bold text-white font-[family-name:var(--font-display)]">
                {t.compareAiTitle}
              </h3>
            </div>
            <button
              onClick={handleAiAnalysis}
              disabled={aiLoading || comparedLaptops.length < 2}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-semibold hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {aiLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  {t.compareAiLoading}
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  {t.compareAiBtn}
                </>
              )}
            </button>
          </div>

          <p className="text-[11px] text-slate-500 mb-4">{t.compareAiDesc}</p>

          {aiLoading && (
            <div className="space-y-3 p-5 rounded-xl bg-zinc-950/50 border border-slate-800/60">
              <div className="h-3 bg-indigo-500/10 rounded-full w-full animate-pulse" />
              <div className="h-3 bg-indigo-500/10 rounded-full w-4/5 animate-pulse" />
              <div className="h-3 bg-indigo-500/10 rounded-full w-3/5 animate-pulse" />
              <p className="text-[11px] text-indigo-400/60 mt-2 italic">{t.compareAiLoading}</p>
            </div>
          )}

          {aiAnalysis && !aiLoading && (
            <div className="p-5 rounded-xl bg-zinc-950/50 border border-slate-800/60">
              <div className="space-y-6 text-[13px] text-slate-300 leading-relaxed">
                <Markdown
                  components={{
                    h3: ({ children }) => (
                      <h3 className="font-bold text-indigo-400 mt-6 mb-3 tracking-wide text-lg">{children}</h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="font-bold text-indigo-400 mt-5 mb-2 tracking-wide text-base">{children}</h4>
                    ),
                    p: ({ children }) => (
                      <p className="text-slate-300 leading-relaxed mb-4 text-sm">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside space-y-2 pl-4 mb-4 text-slate-300">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside space-y-2 pl-4 mb-4 text-slate-300">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-sm leading-relaxed">{children}</li>
                    ),
                    strong: ({ children }) => (
                      <strong className="text-amber-400 font-semibold">{children}</strong>
                    ),
                    code: ({ children }) => (
                      <code className="text-indigo-300 bg-indigo-500/10 px-1.5 py-0.5 rounded text-xs">{children}</code>
                    ),
                  }}
                >
                  {aiAnalysis}
                </Markdown>
              </div>
            </div>
          )}

          {!aiAnalysis && !aiLoading && (
            <div className="p-5 rounded-xl bg-zinc-950/50 border border-slate-800/60 text-center">
              <p className="text-xs text-slate-500 italic">
                Klik tombol di atas untuk mendapatkan analisis perbandingan dari Ling AI.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 text-slate-100 flex items-center justify-center">
          <Loader2 size={24} className="animate-spin text-slate-500" />
        </div>
      }
    >
      <CompareContent />
    </Suspense>
  );
}
