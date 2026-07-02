"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, Circle } from "lucide-react";

type ChecklistCategory = {
  id: string;
  label: string;
  emoji: string;
  items: ChecklistItem[];
};

type ChecklistItem = {
  title: string;
  detail: string;
  importance: "wajib" | "disarankan" | "opsional";
};

const categories: ChecklistCategory[] = [
  {
    id: "fisik",
    label: "Kondisi Fisik",
    emoji: "🔧",
    items: [
      {
        title: "Cek layar dari dead pixel",
        detail:
          "Buka browser fullscreen dengan latar putih, hitam, merah, hijau, biru. Perhatikan ada titik yang warnanya tidak berubah — itu dead pixel. Stuck pixel (satu warna tetap) masih bisa diperbaiki software.",
        importance: "wajib",
      },
      {
        title: "Cek engsel dan casing",
        detail:
          "Buka-tutup layar beberapa kali. Engsel harus terasa kokoh, tidak kendor, tidak ada bunyi klik aneh. Cek casing dari retakan, goresan dalam, atau bagian yang terangkat (tanda baterai kembung).",
        importance: "wajib",
      },
      {
        title: "Cek keyboard",
        detail:
          "Tekan semua tombol satu per satu, termasuk F1–F12 dan spasi. Pastikan semua responsif dan tidak ada yang double-press atau tidak berfungsi. Gunakan online keyboard tester.",
        importance: "wajib",
      },
      {
        title: "Cek port USB, HDMI, audio",
        detail:
          "Colok USB flashdisk, mouse, headset, dan kabel HDMI jika tersedia. Pastikan semua port terdeteksi. Port yang longgar atau tidak berfungsi bisa mahal untuk diperbaiki.",
        importance: "wajib",
      },
      {
        title: "Cek touchpad",
        detail:
          "Geser jari di seluruh permukaan touchpad. Pastikan responnya smooth tanpa dead zone. Klik kiri dan kanan harus berfungsi. Multitouch gesture (pinch zoom, scroll) harus jalan.",
        importance: "disarankan",
      },
      {
        title: "Cek speaker",
        detail:
          "Putar musik atau video. Pastikan speaker mengeluarkan suara dari kedua sisi tanpa distorsi atau bunyi kresek. Cek juga volume maksimal tidak pecah.",
        importance: "disarankan",
      },
    ],
  },
  {
    id: "baterai",
    label: "Baterai & Daya",
    emoji: "🔋",
    items: [
      {
        title: "Cek kesehatan baterai",
        detail:
          "Gunakan software seperti BatteryInfoView atau HWMonitor. Cek 'Wear Level' — angka di bawah 30% masih bagus, 30–50% masih bisa ditoleransi, di atas 50% pertimbangkan ganti baterai.",
        importance: "wajib",
      },
      {
        title: "Cek siklus charge",
        detail:
          "Siklus charge menunjukkan berapa kali baterai sudah diisi penuh. MacBook bisa dicek via System Information. Idealnya di bawah 300 siklus untuk laptop 2–3 tahun. Di atas 500 siklus, baterai sudah lemah.",
        importance: "wajib",
      },
      {
        title: "Tes charging normal",
        detail:
          "Colok charger, pastikan indicator充電 menyala. Biarkan sampai 100% — waktu charging tidak boleh terlalu lama (normal: 1.5–2.5 jam). Periksa apakah充電 berhenti di 100% tanpa overcharge.",
        importance: "disarankan",
      },
      {
        title: "Tes baterai tanpa charger",
        detail:
          "Isi penuh, lalu lepas charger. Gunakan normal (browsing, Office) selama 1–2 jam. Pantau drain rate — jika baterai habis terlalu cepat (di bawah 3 jam untuk penggunaan ringan), baterai sudah lemah.",
        importance: "disarankan",
      },
    ],
  },
  {
    id: "performa",
    label: "Performa & Software",
    emoji: "⚡",
    items: [
      {
        title: "Cek spesifikasi vs klaim penjual",
        detail:
          "Buka Settings > System > About (Windows) atau About This Mac. Cocokkan processor, RAM, dan storage dengan yang diiklankan. Ada penjual nakal yang mengganti stiker RAM.",
        importance: "wajib",
      },
      {
        title: "Cek storage — apakah SSD atau HDD",
        detail:
          "Laptop dengan HDD akan terasa jauh lebih lambat dari SSD. Cek via Task Manager > Performance > Disk. Jika masih HDD, harga harus lebih murah atau pertimbangkan upgrade SSD.",
        importance: "wajib",
      },
      {
        title: "Cek suhu CPU saat idle dan load",
        detail:
          "Download HWMonitor atau Core Temp. Suhu idle ideal: 35–50°C. Load (buka banyak tab): di bawah 85°C masih aman. Di atas 90°C saat load ringan = masalah termal (perlu thermal paste baru).",
        importance: "disarankan",
      },
      {
        title: "Cek RAM yang terinstall",
        detail:
          "Pastikan jumlah RAM sesuai klaim. Jika 8GB tapi kamu butuh 16GB, tanyakan apakah bisa upgrade. Cek juga apakah RAM single channel atau dual channel — dual channel lebih cepat.",
        importance: "disarankan",
      },
      {
        title: "Cek Windows Activation",
        detail:
          "Settings > System > About > Product Key and Activation. Pastikan Windows sudah activated. Laptop bekas kadang masih pakai Windows tidak resmi — bisa bermasalah di update mendatang.",
        importance: "disarankan",
      },
      {
        title: "Cek history boot via Event Viewer",
        detail:
          "Tekan Win+R, ketik eventvwr. Buka Windows Logs > System. Cari error/warning yang sering muncul — bisa menandakan masalah hardware seperti RAM bermasalah atau storage error.",
        importance: "opsional",
      },
    ],
  },
  {
    id: "dokumen",
    label: "Dokumen & Kelengkapan",
    emoji: "📋",
    items: [
      {
        title: "Minta bukti pembelian / nota",
        detail:
          "Nota asli membuktikan laptop bukan barang curian dan memudahkan klaim garansi. Jika penjual tidak bisa menunjukkan nota, tanyakan alasan jelasnya.",
        importance: "wajib",
      },
      {
        title: "Cek garansi masih berlaku",
        detail:
          "Hubungi service center resmi merek laptop dengan nomor serial (biasanya di bawah laptop). Pastikan garansi masih aktif — ini jaminan jika ada masalah mendadak.",
        importance: "wajib",
      },
      {
        title: "Minta charger original",
        detail:
          "Charger original dirancang khusus untuk laptop. Charger aftermarket bisa mengisi lebih lambat atau bahkan merusak baterai jangka panjang. Pastikan watt-nya sesuai.",
        importance: "disarankan",
      },
      {
        title: "Tanyakan riwayat perbaikan",
        detail:
          "Apakah pernah servis? Ganti komponen apa? Laptop yang pernah reparasi tidak selalu buruk, tapi penting untuk tahu apakah perbaikan dilakukan di tempat resmi.",
        importance: "opsional",
      },
    ],
  },
  {
    id: "tips",
    label: "Tips Negosiasi",
    emoji: "🤝",
    items: [
      {
        title: "Bandingkan harga di marketplace",
        detail:
          "Cek harga laptop bekas serupa di Tokopedia, Shopee, atau Facebook Marketplace. Ini jadi acuan harga wajar dan bisa jadi alasan nego yang valid.",
        importance: "disarankan",
      },
      {
        title: "Gunakan temuan sebagai alasan nego",
        detail:
          "Jika menemukan dead pixel, baterai lemah, atau port rusak — gunakan itu untuk nego harga. Setiap masalah = potongan harga yang wajar.",
        importance: "disarankan",
      },
      {
        title: "Jangan langsung beli — minta waktu uji",
        detail:
          "Minta waktu 30 menit untuk tes laptop di tempat. Penjual yang jujur tidak akan menolak. Jika menolak, itu red flag.",
        importance: "disarankan",
      },
    ],
  },
];

const importanceConfig = {
  wajib: { label: "Wajib", color: "bg-red-50 text-red-600", icon: AlertTriangle },
  disarankan: { label: "Disarankan", color: "bg-amber-50 text-amber-600", icon: Circle },
  opsional: { label: "Opsional", color: "bg-gray-50 text-gray-500", icon: Circle },
};

export default function PanduanSecondPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<string>("semua");

  const toggleCheck = (key: string) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalItems = categories.reduce((acc, cat) => acc + cat.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;

  const filteredCategories =
    activeCategory === "semua"
      ? categories
      : categories.filter((cat) => cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-3xl">🛡️</span>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            Panduan Beli Laptop Second
          </h1>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed max-w-xl mx-auto">
            Checklist lengkap sebelum membeli laptop bekas. Centang setiap item
            yang sudah kamu cek.
          </p>

          {/* Progress */}
          <div className="mt-6 max-w-xs mx-auto">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
              <span>Progress</span>
              <span className="font-semibold text-gray-900">
                {checkedCount}/{totalItems}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                style={{
                  width: `${totalItems > 0 ? (checkedCount / totalItems) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory("semua")}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "semua"
                ? "bg-emerald-500 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            Semua
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-emerald-500 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* Checklist */}
        <div className="space-y-8">
          {filteredCategories.map((cat) => (
            <section key={cat.id}>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                {cat.emoji} {cat.label}
              </h2>
              <div className="space-y-2">
                {cat.items.map((item, i) => {
                  const key = `${cat.id}-${i}`;
                  const isChecked = !!checked[key];
                  const imp = importanceConfig[item.importance];
                  const ImpIcon = imp.icon;
                  return (
                    <div
                      key={key}
                      className={`bg-white border rounded-xl overflow-hidden transition-all cursor-pointer ${
                        isChecked
                          ? "border-emerald-200 bg-emerald-50/30"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => toggleCheck(key)}
                    >
                      <div className="flex items-start gap-3 px-5 py-4">
                        <div className="mt-0.5 shrink-0">
                          <div
                            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                              isChecked
                                ? "bg-emerald-500 border-emerald-500"
                                : "border-gray-300"
                            }`}
                          >
                            {isChecked && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p
                              className={`text-sm font-medium ${
                                isChecked ? "text-gray-400 line-through" : "text-gray-900"
                              }`}
                            >
                              {item.title}
                            </p>
                            <span
                              className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${imp.color}`}
                            >
                              <ImpIcon className="w-3 h-3" />
                              {imp.label}
                            </span>
                          </div>
                          {item.detail && (
                            <p
                              className={`text-xs mt-1.5 leading-relaxed ${
                                isChecked ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              {item.detail}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center">
          <p className="text-sm font-medium text-emerald-800">
            Sudah siap membeli laptop?
          </p>
          <p className="text-sm text-emerald-600 mt-1">
            Bandingkan harga laptop di katalog kami.
          </p>
          <Link
            href="/catalog"
            className="mt-4 inline-block bg-emerald-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Lihat Katalog →
          </Link>
        </div>
      </div>
    </div>
  );
}
