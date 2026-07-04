"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
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
  ChevronRight,
} from "lucide-react";

const formatRupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

const kategoriColors: Record<string, string> = {
  pelajar: "text-[#2dd4bf] bg-[#2dd4bf]/10 border-[#2dd4bf]/20",
  pekerja: "text-[#3b82f6] bg-[#3b82f6]/10 border-[#3b82f6]/20",
  gaming: "text-[#ef4444] bg-[#ef4444]/10 border-[#ef4444]/20",
  konten_kreator: "text-[#d946ef] bg-[#d946ef]/10 border-[#d946ef]/20",
  programmer: "text-[#a855f7] bg-[#a855f7]/10 border-[#a855f7]/20",
};

const ITEMS_PER_PAGE = 15;

const quickFilterBadges = [
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
        <div className="w-6 h-6 rounded-full bg-[#2dd4bf]/15 flex items-center justify-center flex-shrink-0">
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

function LaptopModal({
  laptop,
  onClose,
  onToggleWishlist,
  onToggleCompare,
  isWished,
  inCompare,
}: {
  laptop: Laptop;
  onClose: () => void;
  onToggleWishlist: (id: string) => void;
  onToggleCompare: (l: Laptop) => void;
  isWished: boolean;
  inCompare: boolean;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const specs = [
    { icon: <Cpu size={16} />, label: "Processor", value: laptop.spesifikasi.processor, color: "text-[#2dd4bf]" },
    { icon: <MemoryStick size={16} />, label: "RAM", value: laptop.spesifikasi.ram, color: "text-[#d946ef]" },
    { icon: <HardDrive size={16} />, label: "Storage", value: laptop.spesifikasi.storage, color: "text-[#f97316]" },
    { icon: <Monitor size={16} />, label: "GPU", value: laptop.spesifikasi.gpu, color: "text-[#06b6d4]" },
    { icon: <Monitor size={16} />, label: "Display", value: laptop.spesifikasi.display, color: "text-[#eab308]" },
    { icon: null, label: "OS", value: laptop.spesifikasi.os, color: "text-slate-400" },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal content */}
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.5)]"
        style={{ background: "linear-gradient(180deg, #111827 0%, #0b1120 100%)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top gradient bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#2dd4bf] via-[#d946ef] to-[#f97316] rounded-t-2xl" />

        {/* Header */}
        <div className="px-6 pt-5 pb-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0 pr-4">
              <span className={`inline-block text-[10px] font-medium px-2.5 py-0.5 rounded-full border mb-2 ${
                laptop.kondisi === "Baru"
                  ? "text-[#2dd4bf] bg-[#2dd4bf]/10 border-[#2dd4bf]/20"
                  : "text-[#f97316] bg-[#f97316]/10 border-[#f97316]/20"
              }`}>
                {laptop.kondisi}
              </span>
              <h2 className="text-xl font-bold text-white font-[family-name:var(--font-display)] leading-tight">
                {laptop.nama}
              </h2>
              <p className="text-sm text-slate-400 mt-1">{laptop.merek} &middot; {laptop.seri} &middot; {laptop.tahun}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all flex-shrink-0"
            >
              <X size={18} />
            </button>
          </div>

          {/* Category badges */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {laptop.kategori.map(kat => (
              <span key={kat} className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${
                kategoriColors[kat] || "text-slate-400 bg-white/5 border-white/10"
              }`}>
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
              {formatRupiah(laptop.harga_min)} <span className="text-slate-500 text-base font-normal mx-1">-</span> {formatRupiah(laptop.harga_max)}
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

          {/* Action buttons */}
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
              onClick={() => onToggleCompare(laptop)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                inCompare
                  ? "bg-[#2dd4bf]/15 text-[#2dd4bf] border border-[#2dd4bf]/30"
                  : "bg-white/5 text-slate-400 border border-white/10 hover:text-[#2dd4bf] hover:border-[#2dd4bf]/30"
              }`}
            >
              <ChevronRight size={15} />
              {inCompare ? "Dipilih" : "Bandingkan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Catalog Page ───────────────────────────────────────── */

export default function CatalogPage() {
  const { laptops, wishlist, toggleWishlist, compareList, toggleCompare } = useApp();
  const { t } = useTranslation();
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

  useEffect(() => {
    setCurrentPage(1);
  }, [search, brandFilter, conditionFilter, categoryFilter, sortBy, activeBadge]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const brands = useMemo(() => ["All", ...Array.from(new Set(laptops.map(l => l.merek)))].sort(), [laptops]);
  const allKategori = useMemo(() => ["All", ...Array.from(new Set(laptops.flatMap(l => l.kategori)))].sort(), [laptops]);

  const filtered = useMemo(() => {
    let list = [...laptops];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(l =>
        l.nama.toLowerCase().includes(q) ||
        l.merek.toLowerCase().includes(q) ||
        l.seri.toLowerCase().includes(q) ||
        l.spesifikasi.processor.toLowerCase().includes(q) ||
        l.spesifikasi.gpu.toLowerCase().includes(q)
      );
    }
    if (brandFilter !== "All") list = list.filter(l => l.merek === brandFilter);
    if (conditionFilter !== "All") list = list.filter(l => l.kondisi === conditionFilter);
    if (categoryFilter !== "All") list = list.filter(l => l.kategori.includes(categoryFilter.toLowerCase()));
    if (activeBadge !== "semua") list = list.filter(l => l.kategori.includes(activeBadge));

    switch (sortBy) {
      case "harga-low": list.sort((a, b) => a.harga_min - b.harga_min); break;
      case "harga-high": list.sort((a, b) => b.harga_max - a.harga_max); break;
      case "nama": list.sort((a, b) => a.nama.localeCompare(b.nama)); break;
      case "tahun": list.sort((a, b) => b.tahun - a.tahun); break;
    }
    return list;
  }, [laptops, search, brandFilter, conditionFilter, categoryFilter, sortBy, activeBadge]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedItems = useMemo(
    () => filtered.slice((safeCurrentPage - 1) * ITEMS_PER_PAGE, safeCurrentPage * ITEMS_PER_PAGE),
    [filtered, safeCurrentPage]
  );

  const pageNumbers = useMemo(() => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (safeCurrentPage > 3) pages.push("...");
      const start = Math.max(2, safeCurrentPage - 1);
      const end = Math.min(totalPages - 1, safeCurrentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (safeCurrentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }, [totalPages, safeCurrentPage]);

  const handleShare = useCallback((e: React.MouseEvent, laptop: Laptop) => {
    e.stopPropagation();
    e.preventDefault();
    const url = window.location.origin + "/catalog?id=" + laptop.id;
    navigator.clipboard.writeText(url).then(() => {
      showToast("Link rekomendasi berhasil disalin!");
    }).catch(() => {
      showToast("Gagal menyalin link.");
    });
  }, [showToast]);

  const handleBadgeClick = useCallback((value: string) => {
    setActiveBadge(value);
    if (value !== "semua") {
      setCategoryFilter("All");
    }
  }, []);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Detail Modal */}
      {selectedLaptop && (
        <LaptopModal
          laptop={selectedLaptop}
          onClose={() => setSelectedLaptop(null)}
          onToggleWishlist={toggleWishlist}
          onToggleCompare={toggleCompare}
          isWished={wishlist.includes(selectedLaptop.id)}
          inCompare={compareList.some(c => c.id === selectedLaptop.id)}
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

      {/* Quick Filter Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        {quickFilterBadges.map(badge => {
          const isActive = activeBadge === badge.value;
          return (
            <button
              key={badge.value}
              onClick={() => handleBadgeClick(badge.value)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                isActive
                  ? "bg-[#6366f1] text-white border-[#6366f1] shadow-[0_0_20px_rgba(99,102,241,0.35)]"
                  : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              {badge.label}
            </button>
          );
        })}
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
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#0f172a] border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#2dd4bf]/50 focus:shadow-[0_0_15px_rgba(45,212,191,0.15)] transition-all"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${
              showFilters ? "bg-[#2dd4bf]/10 border-[#2dd4bf]/30 text-[#2dd4bf]" : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
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
              <select value={brandFilter} onChange={e => setBrandFilter(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[#0f172a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#2dd4bf]/50">
                {brands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">{t.catalogCondition}</label>
              <select value={conditionFilter} onChange={e => setConditionFilter(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[#0f172a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#2dd4bf]/50">
                <option value="All">{t.catalogAll}</option>
                <option value="Baru">{t.catalogNew}</option>
                <option value="Bekas">{t.catalogUsed}</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">{t.catalogCategory}</label>
              <select value={categoryFilter} onChange={e => { setCategoryFilter(e.target.value); setActiveBadge("semua"); }} className="w-full px-3 py-2 rounded-lg bg-[#0f172a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#2dd4bf]/50">
                {allKategori.map(c => <option key={c} value={c}>{c === "All" ? t.catalogAll : c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">{t.catalogSort}</label>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[#0f172a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#2dd4bf]/50">
                <option value="nama">{t.catalogSortName}</option>
                <option value="harga-low">{t.catalogSortLow}</option>
                <option value="harga-high">{t.catalogSortHigh}</option>
                <option value="tahun">Terbaru</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Compare drawer */}
      {compareList.length > 0 && (
        <div className="glass rounded-xl p-4 mb-6 flex items-center justify-between border-[#2dd4bf]/20">
          <span className="text-sm text-[#2dd4bf] font-medium">
            {compareList.length}/3 {t.catalogCompare}
          </span>
          <div className="flex gap-2">
            {compareList.map(l => (
              <span key={l.id} className="px-2 py-1 rounded bg-[#2dd4bf]/10 text-[#2dd4bf] text-xs">
                {l.nama}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">&#x1F50D;</div>
          <p className="text-slate-400 text-lg mb-2">{t.catalogEmpty}</p>
          <p className="text-slate-500 text-sm">{t.catalogEmptyHint}</p>
        </div>
      ) : (
        <>
          {/* Card grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
            {paginatedItems.map(laptop => {
              const isWished = wishlist.includes(laptop.id);
              const inCompare = compareList.some(c => c.id === laptop.id);
              return (
                <div
                  key={laptop.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedLaptop(laptop)}
                  onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedLaptop(laptop); } }}
                  className="card-glow rounded-xl overflow-hidden group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer transition-transform duration-200 hover:scale-[1.01] flex flex-col justify-between"
                >
                  {/* Top accent bar */}
                  <div className="h-1 bg-gradient-to-r from-[#2dd4bf] via-[#d946ef] to-[#f97316] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Card body – vertical stack */}
                  <div className="p-5 flex flex-col items-start space-y-2">
                    {/* Name + kondisi badge */}
                    <div className="flex items-start justify-between gap-3 w-full">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate group-hover:text-[#2dd4bf] transition-colors">
                          {laptop.nama}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {laptop.merek} &middot; {laptop.tahun}
                        </p>
                      </div>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border flex-shrink-0 ${
                        laptop.kondisi === "Baru"
                          ? "text-[#2dd4bf] bg-[#2dd4bf]/10 border-[#2dd4bf]/20"
                          : "text-[#f97316] bg-[#f97316]/10 border-[#f97316]/20"
                      }`}>
                        {laptop.kondisi}
                      </span>
                    </div>

                    {/* Core specs – two stacked rows */}
                    <div className="w-full space-y-1">
                      <p className="text-sm text-slate-400 truncate">{laptop.spesifikasi.processor}</p>
                      <p className="text-sm text-slate-400 truncate">{laptop.spesifikasi.ram}</p>
                    </div>

                    {/* Category badges */}
                    <div className="flex flex-wrap gap-1">
                      {laptop.kategori.slice(0, 3).map(kat => (
                        <span key={kat} className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-md border ${
                          kategoriColors[kat] || "text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10"
                        }`}>
                          {kat.replace("_", " ")}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card footer – horizontal split */}
                  <div className="flex flex-row justify-between items-center w-full px-5 py-3 border-t border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                    <p className="text-[13px] font-bold font-[family-name:var(--font-display)] text-slate-900 dark:text-white whitespace-nowrap">
                      {formatRupiah(laptop.harga_min)} - {formatRupiah(laptop.harga_max)}
                    </p>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={(e) => handleShare(e, laptop)}
                        title="Salin link"
                        className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-[#6366f1] hover:bg-[#6366f1]/10 transition-all"
                      >
                        <Share2 size={14} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); exportLaptopPDF(laptop); }}
                        title="Cetak PDF"
                        className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-[#6366f1] hover:bg-[#6366f1]/10 transition-all"
                      >
                        <FileDown size={14} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); toggleWishlist(laptop.id); }}
                        className={`p-2 rounded-lg transition-all ${
                          isWished ? "bg-[#ec4899]/15 text-[#ec4899]" : "bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-[#ec4899] hover:bg-[#ec4899]/10"
                        }`}
                      >
                        <Heart size={14} fill={isWished ? "currentColor" : "none"} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); toggleCompare(laptop); }}
                        className={`px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all ${
                          inCompare ? "bg-[#2dd4bf]/15 text-[#2dd4bf] border border-[#2dd4bf]/30" : "bg-slate-100 dark:bg-white/5 text-slate-500 border border-slate-200 dark:border-white/10 hover:text-[#2dd4bf] hover:border-[#2dd4bf]/30"
                        }`}
                      >
                        {inCompare ? t.catalogCompareChosen : t.catalogCompareBtn}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-10">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={safeCurrentPage === 1}
                className="px-3 py-2 rounded-lg border border-slate-800 bg-slate-900 text-xs font-medium text-slate-400 hover:text-white hover:border-slate-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-slate-400 disabled:hover:border-slate-800"
              >
                Prev
              </button>

              {pageNumbers.map((page, i) =>
                page === "..." ? (
                  <span key={`dots-${i}`} className="px-2 py-2 text-xs text-slate-600 select-none">...</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-lg text-xs font-medium transition-all border ${
                      safeCurrentPage === page
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                        : "border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={safeCurrentPage === totalPages}
                className="px-3 py-2 rounded-lg border border-slate-800 bg-slate-900 text-xs font-medium text-slate-400 hover:text-white hover:border-slate-700 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-slate-400 disabled:hover:border-slate-800"
              >
                Next
              </button>
            </div>
          )}

          <p className="text-center text-[11px] text-slate-600 mt-4">
            Menampilkan {(safeCurrentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(safeCurrentPage * ITEMS_PER_PAGE, filtered.length)} dari {filtered.length} laptop
          </p>
        </>
      )}
    </div>
  );
}
