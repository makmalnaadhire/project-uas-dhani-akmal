"use client";

import { useState } from "react";
import type { Laptop } from "@/lib/types";
import {
  ChevronDown,
  BookOpen,
  HelpCircle,
  BookMarked,
  Calculator,
  Clock,
  Cpu,
  HardDrive,
  MemoryStick,
  Monitor,
  Battery,
  Wifi,
  ArrowRight,
} from "lucide-react";

interface Props {
  laptops: Laptop[];
}

const blogArticles = [
  { title: "Memilih Laptop untuk Mahasiswa Teknik Informatika", excerpt: "Panduan lengkap memilih laptop yang tepat untuk kebutuhan pemrograman, desain, dan tugas kuliah dengan budget terbatas.", category: "Panduan", readTime: "5 menit", color: "#d946ef" },
  { title: "Perbedaan SSD vs HDD: Mana yang Lebih Baik?", excerpt: "Analisis mendalam tentang kelebihan dan kekurangan SSD compared to HDD untuk berbagai kebutuhan penggunaan.", category: "Edukasi", readTime: "4 menit", color: "#a855f7" },
  { title: "RAM 8GB vs 16GB: Seberapa Penting?", excerpt: "Memahami kebutuhan RAM untuk aktivitas sehari-hari, gaming, dan editing video secara praktis.", category: "Tips", readTime: "3 menit", color: "#ec4899" },
  { title: "Cara Merawat Laptop Agar Tetap Awet", excerpt: "Tips maintenance laptop dari penggunaan sehari-hari hingga perawatan hardware jangka panjang.", category: "Tips", readTime: "6 menit", color: "#8b5cf6" },
];

const faqData = [
  { q: "Berapa RAM yang cukup untuk kuliah?", a: "Untuk kegiatan kuliah standar seperti Office, browsing, dan presentasi, RAM 8GB sudah cukup. Namun untuk programming atau desain grafis, disarankan minimal 16GB agar multitasking lebih lancar." },
  { q: "Apakah laptop bekas masih layak dibeli?", a: "Tentu saja. Laptop bekas bisa menjadi pilihan cerdas jika budget terbatas. Pastikan memeriksa kondisi baterai, performa hard drive/SSD, layar, dan keyboard." },
  { q: "SSD berapa kapasitas yang ideal?", a: "Minimal 256GB untuk penggunaan ringan. Untuk kebutuhan lebih serius seperti editing atau gaming, 512GB atau 1TB sangat disarankan." },
  { q: "Intel vs AMD: Mana yang lebih baik?", a: "Keduanya punya keunggulan masing-masing. Intel unggul di single-core performance, sementara AMD biasanya menawarkan lebih banyak core di harga yang sama." },
  { q: "Bagaimana cara cek kondisi laptop bekas?", a: "1) Cek fisik: layar (dead pixel), keyboard, port USB. 2) Cek baterai: kapasitas tersisa vs design capacity. 3) Cek storage: gunakan CrystalDiskInfo." },
  { q: "Apakah perlu beli laptop gaming untuk editing video?", a: "Tidak selalu. Untuk editing 1080p, laptop dengan GPU dedicated kelas menengah sudah cukup. Untuk editing 4K, GPU kelas gaming memang membantu." },
];

const glossary = [
  { term: "CPU (Processor)", icon: <Cpu size={18} />, def: "Unit Pemrosesan Pusat — otak laptop yang menjalankan semua instruksi dan komputasi." },
  { term: "RAM", icon: <MemoryStick size={18} />, def: "Random Access Memory — memori sementara untuk menyimpan data yang sedang diproses." },
  { term: "SSD", icon: <HardDrive size={18} />, def: "Solid State Drive — penyimpanan data berbasis flash yang jauh lebih cepat dari HDD." },
  { term: "GPU (VGA)", icon: <Monitor size={18} />, def: "Graphics Processing Unit — komponen untuk memproses grafis. Penting untuk gaming, desain, dan editing video." },
  { term: "Display", icon: <Monitor size={18} />, def: "Layar laptop. Perhatikan resolusi (FHD/QHD/4K), panel (IPS/OLED), refresh rate (60Hz/120Hz/144Hz)." },
  { term: "Battery", icon: <Battery size={18} />, def: "Kapasitas baterai diukur dalam Wh (Watt-hour). Semakin besar, semakin lama laptop bisa bertahan." },
  { term: "WiFi 6/6E", icon: <Wifi size={18} />, def: "Standar WiFi terbaru yang menawarkan kecepatan lebih tinggi, latency lebih rendah." },
  { term: "Thunderbolt", icon: <Cpu size={18} />, def: "Port koneksi berkecepatan tinggi dari Intel. Mendukung transfer data super cepat." },
];

const yearThresholds = [
  { label: "2023 - 2025 (Sangat Baru)", retention: 75, desc: "Generasi terbaru, masih dalam garansi atau garansi habis baru-baru ini." },
  { label: "2021 - 2022 (Baru)", retention: 60, desc: "Masih relevan untuk sebagian besar kebutuhan, banyak pilihan bagus." },
  { label: "2019 - 2020 (Cukup)", retention: 45, desc: "Layak untuk penggunaan ringan. Perhatikan kondisi baterai." },
  { label: "2017 - 2018 (Lama)", retention: 30, desc: "Hanya untuk kebutuhan sangat ringan. Harga jual menurun drastis." },
  { label: "Sebelum 2017", retention: 15, desc: "Sudah sangat tua. Harga jual sangat rendah." },
];

function Accordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left">
        <span className="text-sm font-medium text-white pr-4">{q}</span>
        <ChevronDown size={16} className={`text-[#d946ef] flex-shrink-0 chevron-rotate ${open ? "open" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4 slide-up">{a}</div>
      )}
    </div>
  );
}

export default function EducationSection({ laptops }: Props) {
  const [activeSubTab, setActiveSubTab] = useState<"blog" | "faq" | "glossary" | "estimasi">("blog");
  const [estBrand, setEstBrand] = useState("ASUS");
  const [estYear, setEstYear] = useState(2022);
  const [estOrigPrice, setEstOrigPrice] = useState(10000000);

  const subTabs = [
    { id: "blog" as const, label: "Artikel", icon: <BookOpen size={16} /> },
    { id: "faq" as const, label: "FAQ", icon: <HelpCircle size={16} /> },
    { id: "glossary" as const, label: "Glossary", icon: <BookMarked size={16} /> },
    { id: "estimasi" as const, label: "Estimasi Harga", icon: <Calculator size={16} /> },
  ];

  const estimateValue = () => {
    const age = 2025 - estYear;
    let retention = 100;
    if (age <= 2) retention = 75;
    else if (age <= 4) retention = 55;
    else if (age <= 6) retention = 35;
    else retention = 15;
    return Math.round(estOrigPrice * retention / 100);
  };

  const brands = [...new Set(laptops.map(l => l.merek))].sort();

  return (
    <div className="pt-24 pb-20 max-w-5xl mx-auto px-4 sm:px-6 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-2">
          <span className="text-gradient-fuchsia">Edukasi</span> & Panduan
        </h1>
        <p className="text-slate-400 text-sm">Belajar tentang hardware laptop, tips membeli, dan estimasi harga bekas.</p>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {subTabs.map(t => (
          <button key={t.id} onClick={() => setActiveSubTab(t.id)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
            activeSubTab === t.id ? "bg-[#d946ef]/15 text-[#d946ef] border border-[#d946ef]/30" : "bg-white/5 text-slate-400 border border-transparent hover:text-white"
          }`}>
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {activeSubTab === "blog" && (
        <div className="grid sm:grid-cols-2 gap-5 stagger">
          {blogArticles.map((a, i) => (
            <div key={i} className="glass rounded-xl p-5 group hover:border-white/15 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-md border" style={{ color: a.color, borderColor: `${a.color}30`, backgroundColor: `${a.color}10` }}>{a.category}</span>
                <span className="text-[10px] text-slate-600 flex items-center gap-1"><Clock size={10} />{a.readTime}</span>
              </div>
              <h3 className="text-base font-semibold text-white mb-2 group-hover:text-[#d946ef] transition-colors font-[family-name:var(--font-display)]">{a.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{a.excerpt}</p>
              <button className="flex items-center gap-1 text-xs text-[#d946ef] hover:underline">Baca selengkapnya <ArrowRight size={12} /></button>
            </div>
          ))}
        </div>
      )}

      {activeSubTab === "faq" && (
        <div className="space-y-3 stagger">
          {faqData.map((f, i) => <Accordion key={i} q={f.q} a={f.a} />)}
        </div>
      )}

      {activeSubTab === "glossary" && (
        <div className="grid sm:grid-cols-2 gap-4 stagger">
          {glossary.map((g, i) => (
            <div key={i} className="glass rounded-xl p-5 hover:border-[#d946ef]/20 transition-all group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#d946ef]/10 text-[#d946ef] flex items-center justify-center group-hover:scale-110 transition-transform">{g.icon}</div>
                <h3 className="text-sm font-semibold text-white font-[family-name:var(--font-display)]">{g.term}</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{g.def}</p>
            </div>
          ))}
        </div>
      )}

      {activeSubTab === "estimasi" && (
        <div className="max-w-lg mx-auto">
          <div className="glass rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold font-[family-name:var(--font-display)] mb-4 text-[#d946ef]">Estimasi Harga Jual Laptop Bekas</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Brand</label>
                <select value={estBrand} onChange={e => setEstBrand(e.target.value)} className="w-full px-3 py-2.5 rounded-lg bg-[#0f172a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#d946ef]/50">
                  {brands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Tahun Beli</label>
                <input type="range" min={2017} max={2025} value={estYear} onChange={e => setEstYear(Number(e.target.value))} className="w-full" style={{ accentColor: "#d946ef" }} />
                <div className="text-center text-sm text-[#d946ef] font-medium mt-1">{estYear}</div>
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Harga Beli Saat Baru (Rp)</label>
                <input type="number" value={estOrigPrice} onChange={e => setEstOrigPrice(Number(e.target.value))} className="w-full px-3 py-2.5 rounded-lg bg-[#0f172a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#d946ef]/50" />
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6 border-[#d946ef]/20 text-center">
            <p className="text-xs text-slate-500 mb-1">Estimasi Harga Jual</p>
            <p className="text-3xl font-bold font-[family-name:var(--font-display)] text-gradient-fuchsia">Rp {estimateValue().toLocaleString("id-ID")}</p>
            <p className="text-xs text-slate-500 mt-2">
              {estYear >= 2023 ? "Generasi terbaru, nilai jual tinggi" :
               estYear >= 2021 ? "Masih relevan, nilai jual cukup baik" :
               estYear >= 2019 ? "Lumayan, cocok untuk budget terbatas" :
               "Sudah cukup tua, nilai jual rendah"}
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <h4 className="text-sm font-semibold text-white font-[family-name:var(--font-display)]">Panduan Retensi Harga</h4>
            {yearThresholds.map((t, i) => (
              <div key={i} className="glass rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-white">{t.label}</span>
                  <span className="text-xs text-[#d946ef] font-medium">{t.retention}% retensi</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full mb-2">
                  <div className="h-full bg-gradient-to-r from-[#d946ef] to-[#ec4899] rounded-full" style={{ width: `${t.retention}%` }} />
                </div>
                <p className="text-[11px] text-slate-500">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
