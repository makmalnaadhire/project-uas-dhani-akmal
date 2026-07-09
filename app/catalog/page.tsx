"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Laptop } from "@/lib/types";
import { useApp } from "@/components/providers/AppProvider";
import { useTranslation } from "@/components/providers/LanguageProvider";
import {
  Search,
  SlidersHorizontal,
  X,
  Heart,
  Share2,
  FileDown,
  Cpu,
  MemoryStick,
  HardDrive,
  Monitor,
  Tag,
  AlertTriangle,
  StickyNote,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Laptop as LaptopIcon,
  GitCompareArrows,
  Check,
} from "lucide-react";

/* ── Helpers ────────────────────────────────────────────── */

const formatRupiah = (n: number) =>
  "Rp " + n.toLocaleString("id-ID");

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

const ITEMS_PER_PAGE = 15;

const quickFilters = [
  { label: "Semua", value: "semua" },
  { label: "Pelajar", value: "pelajar" },
  { label: "Pekerja", value: "pekerja" },
  { label: "Gamer", value: "gaming" },
  { label: "Kreator", value: "konten_kreator" },
  { label: "Programmer", value: "programmer" },
];

/* ── Toast ──────────────────────────────────────────────── */

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed top-6 right-6 z-[100] toast-anim">
      <div className="glass rounded-xl px-4 py-3 flex items-center gap-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-[#2dd4bf]/20">
        <div className="w-6 h-6 rounded-full bg-[#2dd4bf]/15 flex items-center justify-center shrink-0">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <span className="text-xs font-medium text-white">{message}</span>
        <button onClick={onClose} className="ml-2 text-slate-500 hover:text-white transition-colors">
          <X size={12} />
        </button>
      </div>
    </div>
  );
}

/* ── PDF Export ─────────────────────────────────────────── */

function exportLaptopPDF(laptop: Laptop) {
  const printWindow = window.open("", "_blank", "width=700,height=600");
  if (!printWindow) return;
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head><title>${laptop.nama} - LaptopPintar</title></head>
    <body style="font-family:'Segoe UI',system-ui,sans-serif;padding:40px;max-width:600px;margin:0 auto;">
      <div style="border-bottom:3px solid #2dd4bf;padding-bottom:16px;margin-bottom:24px;">
        <h1 style="font-size:18px;color:#0f172a;margin:0 0 4px;">${laptop.nama}</h1>
        <p style="font-size:13px;color:#64748b;margin:0;">${laptop.merek} &middot; ${laptop.seri} &middot; ${laptop.tahun}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr><td style="padding:8px 0;font-size:13px;color:#475569;font-weight:600;width:130px;">Kondisi</td><td style="padding:8px 0;font-size:13px;color:#1e293b;">${laptop.kondisi}</td></tr>
        <tr><td style="padding:8px 0;font-size:13px;color:#475569;font-weight:600;">Processor</td><td style="padding:8px 0;font-size:13px;color:#1e293b;">${laptop.spesifikasi.processor}</td></tr>
        <tr><td style="padding:8px 0;font-size:13px;color:#475569;font-weight:600;">RAM</td><td style="padding:8px 0;font-size:13px;color:#1e293b;">${laptop.spesifikasi.ram}</td></tr>
        <tr><td style="padding:8px 0;font-size:13px;color:#475569;font-weight:600;">Storage</td><td style="padding:8px 0;font-size:13px;color:#1e293b;">${laptop.spesifikasi.storage}</td></tr>
        <tr><td style="padding:8px 0;font-size:13px;color:#475569;font-weight:600;">GPU</td><td style="padding:8px 0;font-size:13px;color:#1e293b;">${laptop.spesifikasi.gpu}</td></tr>
        <tr><td style="padding:8px 0;font-size:13px;color:#475569;font-weight:600;">Display</td><td style="padding:8px 0;font-size:13px;color:#1e293b;">${laptop.spesifikasi.display}</td></tr>
        <tr><td style="padding:8px 0;font-size:13px;color:#475569;font-weight:600;">OS</td><td style="padding:8px 0;font-size:13px;color:#1e293b;">${laptop.spesifikasi.os}</td></tr>
        <tr><td style="padding:8px 0;font-size:13px;color:#475569;font-weight:600;">Kategori</td><td style="padding:8px 0;font-size:13px;color:#1e293b;">${laptop.kategori.join(", ")}</td></tr>
        ${laptop.catatan ? `<tr><td style="padding:8px 0;font-size:13px;color:#475569;font-weight:600;">Catatan</td><td style="padding:8px 0;font-size:13px;color:#1e293b;">${laptop.catatan}</td></tr>` : ""}
        ${laptop.isu_diketahui ? `<tr><td style="padding:8px 0;font-size:13px;color:#475569;font-weight:600;">Isu Diketahui</td><td style="padding:8px 0;font-size:13px;color:#b45309;">${laptop.isu_diketahui}</td></tr>` : ""}
      </table>
      <div style="background:#f0fdfa;border:1px solid #2dd4bf40;border-radius:8px;padding:16px;text-align:center;">
        <p style="font-size:11px;color:#64748b;margin:0 0 4px;">Harga Estimasi</p>
        <p style="font-size:24px;font-weight:800;color:#0f172a;margin:0;">${formatRupiah(laptop.harga_min)} - ${formatRupiah(laptop.harga_max)}</p>
      </div>
      <p style="font-size:11px;color:#94a3b8;margin-top:24px;text-align:center;">LaptopPintar &mdash; Temukan Laptop yang Tepat untuk Kamu</p>
      <script>window.onload=function(){window.print();}<\/script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

/* ── Detail Modal ───────────────────────────────────────── */

function LaptopDetailModal({
  laptop,
  onClose,
  onToggleWishlist,
  isWished,
}: {
  laptop: Laptop;
  onClose: () => void;
  onToggleWishlist: (id: string) => void;
  isWished: boolean;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const specs = [
    { icon: <Cpu size={16} />, label: "Processor", value: laptop.spesifikasi.processor, color: "text-[#2dd4bf]" },
    { icon: <MemoryStick size={16} />, label: "RAM", value: laptop.spesifikasi.ram, color: "text-[#d946ef]" },
    { icon: <HardDrive size={16} />, label: "Storage", value: laptop.spesifikasi.storage, color: "text-[#f97316]" },
    { icon: <Monitor size={16} />, label: "GPU", value: laptop.spesifikasi.gpu, color: "text-[#06b6d4]" },
    { icon: <Monitor size={16} />, label: "Display", value: laptop.spesifikasi.display, color: "text-[#eab308]" },
    { icon: <LaptopIcon size={16} />, label: "OS", value: laptop.spesifikasi.os, color: "text-[#a855f7]" },
  ];

  const st = statusBadge[laptop.status] || statusBadge.Active;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.5)]"
        style={{ background: "linear-gradient(180deg, #111827 0%, #0b1120 100%)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top gradient bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#2dd4bf] via-[#d946ef] to-[#f97316] rounded-t-2xl" />

        {/* Header */}
        <div className="px-6 pt-5 pb-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className={`inline-block text-[10px] font-medium px-2.5 py-0.5 rounded-full border ${st.className}`}>
                  {st.label}
                </span>
                <span className={`inline-block text-[10px] font-medium px-2.5 py-0.5 rounded-full border ${
                  laptop.kondisi === "Baru"
                    ? "text-[#2dd4bf] bg-[#2dd4bf]/10 border-[#2dd4bf]/20"
                    : "text-[#f97316] bg-[#f97316]/10 border-[#f97316]/20"
                }`}>
                  {laptop.kondisi}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white font-[family-name:var(--font-display)] leading-tight">
                {laptop.nama}
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                {laptop.merek} &middot; {laptop.seri} &middot; {laptop.tahun}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all shrink-0"
            >
              <X size={18} />
            </button>
          </div>

          {/* Category badges */}
          <div className="flex flex-wrap gap-1.5 mt-3">
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
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Price */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#2dd4bf]/5 to-[#d946ef]/5 border border-white/5">
            <div className="flex items-center gap-2 mb-1">
              <Tag size={14} className="text-[#2dd4bf]" />
              <span className="text-[11px] text-slate-500 uppercase tracking-wider font-medium">Harga Estimasi</span>
            </div>
            <p className="text-2xl font-bold font-[family-name:var(--font-display)] text-white">
              {formatRupiah(laptop.harga_min)}{" "}
              <span className="text-slate-500 text-base font-normal mx-1">-</span>{" "}
              {formatRupiah(laptop.harga_max)}
            </p>
          </div>

          {/* Specs grid */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Spesifikasi</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {specs.map((s, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={s.color}>{s.icon}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">{s.label}</span>
                  </div>
                  <p className="text-[13px] font-medium text-white leading-snug">{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Catatan */}
          {laptop.catatan && (
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <StickyNote size={14} className="text-[#eab308]" />
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Catatan</span>
              </div>
              <p className="text-[13px] text-slate-300 leading-relaxed">{laptop.catatan}</p>
            </div>
          )}

          {/* Isu Diketahui */}
          {laptop.isu_diketahui && (
            <div className="p-4 rounded-xl bg-amber-500/[0.06] border border-amber-500/15">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={14} className="text-amber-400" />
                <span className="text-xs font-semibold text-amber-400/80 uppercase tracking-wider">Isu Diketahui</span>
              </div>
              <p className="text-[13px] text-amber-200/70 leading-relaxed">{laptop.isu_diketahui}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={() => onToggleWishlist(laptop.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isWished
                  ? "bg-[#ec4899]/15 text-[#ec4899] border border-[#ec4899]/30"
                  : "bg-white/5 text-slate-400 border border-white/10 hover:text-[#ec4899] hover:border-[#ec4899]/30"
              }`}
            >
              <Heart size={15} fill={isWished ? "currentColor" : "none"} />
              {isWished ? "Tersimpan" : "Wishlist"}
            </button>
            <button
              onClick={() => exportLaptopPDF(laptop)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-white/5 text-slate-400 border border-white/10 hover:text-[#2dd4bf] hover:border-[#2dd4bf]/30 transition-all"
            >
              <FileDown size={15} />
              PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Catalog Page ───────────────────────────────────────── */

export default function CatalogPage() {
  const { laptops, wishlist, toggleWishlist, compareList, toggleCompare, clearCompare } = useApp();
  const { t } = useTranslation();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("All");
  const [conditionFilter, setConditionFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("nama");
  const [showFilters, setShowFilters] = useState(false);
  const [activeBadge, setActiveBadge] = useState("semua");
  const [toast, setToast] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLaptop, setSelectedLaptop] = useState<Laptop | null>(null);

  const compareCount = compareList.length;
  const isCompareActive = compareCount >= 2;

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const brands = useMemo(
    () => ["All", ...Array.from(new Set(laptops.map((l) => l.merek)))].sort(),
    [laptops]
  );
  const allKategori = useMemo(
    () => ["All", ...Array.from(new Set(laptops.flatMap((l) => l.kategori)))].sort(),
    [laptops]
  );

  const filtered = useMemo(() => {
    let list = [...laptops];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (l) =>
          l.nama.toLowerCase().includes(q) ||
          l.merek.toLowerCase().includes(q) ||
          l.seri.toLowerCase().includes(q) ||
          l.spesifikasi.processor.toLowerCase().includes(q) ||
          l.spesifikasi.gpu.toLowerCase().includes(q)
      );
    }
    if (brandFilter !== "All") list = list.filter((l) => l.merek === brandFilter);
    if (conditionFilter !== "All") list = list.filter((l) => l.kondisi === conditionFilter);
    if (categoryFilter !== "All") list = list.filter((l) => l.kategori.includes(categoryFilter.toLowerCase()));
    if (activeBadge !== "semua") list = list.filter((l) => l.kategori.includes(activeBadge));

    switch (sortBy) {
      case "harga-low":
        list.sort((a, b) => a.harga_min - b.harga_min);
        break;
      case "harga-high":
        list.sort((a, b) => b.harga_max - a.harga_max);
        break;
      case "nama":
        list.sort((a, b) => a.nama.localeCompare(b.nama));
        break;
      case "tahun":
        list.sort((a, b) => b.tahun - a.tahun);
        break;
    }
    return list;
  }, [laptops, search, brandFilter, conditionFilter, categoryFilter, sortBy, activeBadge]);

  /* Reset page when filters change */
  useEffect(() => {
    setCurrentPage(1);
  }, [search, brandFilter, conditionFilter, categoryFilter, sortBy, activeBadge]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const displayedLaptops = useMemo(
    () => filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE),
    [filtered, currentPage]
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBadgeClick = useCallback((value: string) => {
    setActiveBadge(value);
    if (value !== "semua") setCategoryFilter("All");
  }, []);

  const handleShare = useCallback(
    (e: React.MouseEvent, laptop: Laptop) => {
      e.stopPropagation();
      e.preventDefault();
      const url = window.location.origin + "/catalog?id=" + laptop.id;
      navigator.clipboard
        .writeText(url)
        .then(() => showToast("Link berhasil disalin!"))
        .catch(() => showToast("Gagal menyalin link."));
    },
    [showToast]
  );

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Detail Modal */}
      {selectedLaptop && (
        <LaptopDetailModal
          laptop={selectedLaptop}
          onClose={() => setSelectedLaptop(null)}
          onToggleWishlist={toggleWishlist}
          isWished={wishlist.includes(selectedLaptop.id)}
        />
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-2">
          <span className="text-gradient-mint">{t.catalogTitle}</span> {t.catalogSubtitle}
        </h1>
        <p className="text-slate-400 text-sm">
          {t.catalogDesc.replace("{count}", String(laptops.length))}
        </p>
      </div>

      {/* Quick Filter Badges + Compare Trigger */}
      <div className="flex flex-wrap gap-2 mb-6 items-center">
        <div className="flex flex-wrap gap-2 flex-1">
          {quickFilters.map((badge) => (
            <button
              key={badge.value}
              onClick={() => handleBadgeClick(badge.value)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                activeBadge === badge.value
                  ? "bg-[#6366f1] text-white border-[#6366f1] shadow-[0_0_20px_rgba(99,102,241,0.35)]"
                  : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              {badge.label}
            </button>
          ))}
        </div>

        {/* Compare Trigger Button */}
        {compareCount > 0 && (
          <button
            onClick={() => {
              if (isCompareActive) {
                const ids = compareList.map((l) => l.id).join(",");
                router.push(`/compare?ids=${ids}`);
              } else {
                showToast(t.catalogCompareSelect);
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 border shrink-0 ${
              isCompareActive
                ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-transparent shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:from-indigo-500 hover:to-violet-500 hover:shadow-[0_0_35px_rgba(139,92,246,0.5)]"
                : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white"
            }`}
          >
            <GitCompareArrows size={14} />
            {t.catalogCompareBtn.replace("{count}", String(compareCount))}
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearCompare();
              }}
              className="ml-1 p-0.5 rounded-full hover:bg-white/20 transition-colors"
            >
              <X size={10} />
            </button>
          </button>
        )}
      </div>

      {/* Search + Advanced Filters */}
      <div className="glass rounded-xl p-4 mb-6">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder={t.catalogSearch}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#0f172a] border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#2dd4bf]/50 focus:shadow-[0_0_15px_rgba(45,212,191,0.15)] transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
              showFilters
                ? "bg-[#2dd4bf]/10 border-[#2dd4bf]/30 text-[#2dd4bf]"
                : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            <SlidersHorizontal size={14} />
            {t.catalogFilter}
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/5">
            <div>
              <label className="text-xs text-slate-500 mb-1 block">{t.catalogBrand}</label>
              <select
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0f172a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#2dd4bf]/50"
              >
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">{t.catalogCondition}</label>
              <select
                value={conditionFilter}
                onChange={(e) => setConditionFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0f172a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#2dd4bf]/50"
              >
                <option value="All">{t.catalogAll}</option>
                <option value="Baru">{t.catalogNew}</option>
                <option value="Bekas">{t.catalogUsed}</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">{t.catalogCategory}</label>
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setActiveBadge("semua");
                }}
                className="w-full px-3 py-2 rounded-lg bg-[#0f172a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#2dd4bf]/50"
              >
                {allKategori.map((c) => (
                  <option key={c} value={c}>
                    {c === "All" ? t.catalogAll : c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">{t.catalogSort}</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0f172a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#2dd4bf]/50"
              >
                <option value="nama">{t.catalogSortName}</option>
                <option value="harga-low">{t.catalogSortLow}</option>
                <option value="harga-high">{t.catalogSortHigh}</option>
                <option value="tahun">Terbaru</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">&#x1F50D;</div>
          <p className="text-slate-400 text-lg mb-2">{t.catalogEmpty}</p>
          <p className="text-slate-500 text-sm">{t.catalogEmptyHint}</p>
        </div>
      ) : (
        <>
          {/* Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedLaptops.map((laptop) => {
              const isWished = wishlist.includes(laptop.id);
              const isCompared = compareList.some((c) => c.id === laptop.id);
              const st = statusBadge[laptop.status] || statusBadge.Active;

              return (
                <div
                  key={laptop.id}
                  className={`rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group ${
                    isCompared
                      ? "border-indigo-500/50 ring-2 ring-indigo-500/20"
                      : "border-slate-200 dark:border-slate-800"
                  }`}
                >
                  {/* Top accent bar */}
                  <div className={`h-1 transition-all duration-300 ${
                    isCompared
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 opacity-100"
                      : "bg-gradient-to-r from-[#2dd4bf] via-[#d946ef] to-[#f97316] opacity-0 group-hover:opacity-100"
                  }`} />

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col">
                    {/* Brand & Series Header + Compare Toggle */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">
                          {laptop.merek} &middot; {laptop.seri}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${st.className}`}>
                          {st.label}
                        </span>
                        {/* Compare Toggle Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isCompared && compareCount >= 3) {
                              showToast(t.catalogCompareMax);
                              return;
                            }
                            toggleCompare(laptop);
                          }}
                          title={isCompared ? "Hapus dari perbandingan" : "Tambah ke perbandingan"}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
                            isCompared
                              ? "bg-indigo-600 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                              : "bg-white/5 dark:bg-white/5 text-slate-400 hover:bg-indigo-500/10 hover:text-indigo-400 border border-white/10"
                          }`}
                        >
                          {isCompared ? <Check size={12} /> : <GitCompareArrows size={12} />}
                        </button>
                      </div>
                    </div>

                    {/* Laptop Name */}
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 leading-snug group-hover:text-[#2dd4bf] transition-colors line-clamp-2">
                      {laptop.nama}
                    </h3>

                    {/* Spec Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {[
                        { label: "Processor", value: laptop.spesifikasi.processor, color: "text-[#2dd4bf]" },
                        { label: "RAM", value: laptop.spesifikasi.ram, color: "text-[#d946ef]" },
                        { label: "Storage", value: laptop.spesifikasi.storage, color: "text-[#f97316]" },
                        { label: "GPU", value: laptop.spesifikasi.gpu, color: "text-[#06b6d4]" },
                      ].map((spec, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/5">
                          <p className={`text-[10px] font-medium ${spec.color} uppercase tracking-wider mb-0.5`}>{spec.label}</p>
                          <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug line-clamp-2">{spec.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Category Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {laptop.kategori.slice(0, 3).map((kat) => (
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

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Price Range */}
                    <div className="p-3 rounded-xl bg-gradient-to-r from-[#2dd4bf]/5 to-[#d946ef]/5 border border-white/5 mb-4">
                      <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-0.5">Harga Estimasi</p>
                      <p className="text-sm font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white">
                        {formatRupiah(laptop.harga_min)} - {formatRupiah(laptop.harga_max)}
                      </p>
                      <span className="text-[10px] text-slate-400 font-medium italic mt-2 block border-t border-slate-800/60 pt-2 leading-relaxed tracking-wide">
                        {t.catalogDisclaimer}
                      </span>
                    </div>

                    {/* Action Row */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedLaptop(laptop)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#2dd4bf] to-[#06b6d4] text-white text-xs font-semibold hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all active:scale-[0.98]"
                      >
                        Lihat Detail
                        <ChevronRight size={14} />
                      </button>
                      <button
                        onClick={(e) => handleShare(e, laptop)}
                        title="Salin link"
                        className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-[#6366f1] hover:bg-[#6366f1]/10 transition-all"
                      >
                        <Share2 size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(laptop.id);
                        }}
                        className={`p-2.5 rounded-xl transition-all ${
                          isWished
                            ? "bg-[#ec4899]/15 text-[#ec4899]"
                            : "bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-[#ec4899] hover:bg-[#ec4899]/10"
                        }`}
                      >
                        <Heart size={14} fill={isWished ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-4 mt-10">
              <nav className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 border border-slate-800 text-sm font-medium text-slate-400 hover:text-white hover:border-slate-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-slate-400 disabled:hover:border-slate-800"
                >
                  <ChevronLeft size={16} />
                  {t.catalogPrev}
                </button>

                {/* Page Number Buttons */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    if (totalPages <= 7) return true;
                    if (page === 1 || page === totalPages) return true;
                    if (Math.abs(page - currentPage) <= 1) return true;
                    return false;
                  })
                  .reduce<(number | "...")[]>((acc, page, idx, arr) => {
                    if (idx > 0 && page - (arr[idx - 1] as number) > 1) {
                      acc.push("...");
                    }
                    acc.push(page);
                    return acc;
                  }, [])
                  .map((page, idx) =>
                    page === "..." ? (
                      <span key={`ellipsis-${idx}`} className="px-2 text-slate-600 select-none">
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page as number)}
                        className={`min-w-[40px] h-10 rounded-xl text-sm font-semibold transition-all duration-200 ${
                          currentPage === page
                            ? "bg-indigo-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.35)]"
                            : "bg-zinc-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 border border-slate-800 text-sm font-medium text-slate-400 hover:text-white hover:border-slate-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-slate-400 disabled:hover:border-slate-800"
                >
                  {t.catalogNext}
                  <ChevronRight size={16} />
                </button>
              </nav>
            </div>
          )}

          {/* Showing X of Y laptops */}
          <p className="text-center text-[11px] text-slate-600 mt-4">
            {t.catalogShowing} {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} {t.catalogOf} {filtered.length} laptop
          </p>
        </>
      )}

      {/* Floating Compare Action Button */}
      {compareCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 slide-up">
          <button
            onClick={() => {
              if (isCompareActive) {
                const ids = compareList.map((l) => l.id).join(",");
                router.push(`/compare?ids=${ids}`);
              } else {
                showToast(t.catalogCompareSelect);
              }
            }}
            className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 shadow-2xl ${
              isCompareActive
                ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-[0_0_40px_rgba(99,102,241,0.4)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] hover:from-indigo-500 hover:to-violet-500"
                : "bg-zinc-900/90 backdrop-blur-xl border border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            <GitCompareArrows size={18} className={isCompareActive ? "animate-bounce" : ""} />
            {t.catalogCompareBtn.replace("{count}", String(compareCount))}
            {isCompareActive && (
              <span className="flex items-center gap-1 text-[10px] font-medium bg-white/20 px-2 py-0.5 rounded-full">
                <ChevronRight size={10} />
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
