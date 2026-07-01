"use client";

import { useState } from "react";
import { Search } from "lucide-react";

type Term = {
  term: string;
  category: string;
  short: string;
  detail: string;
};

const terms: Term[] = [
  // Hardware
  {
    term: "CPU",
    category: "hardware",
    short: "Central Processing Unit — otak utama laptop.",
    detail:
      "CPU memproses semua instruksi dari software yang kamu jalankan. Semakin banyak core dan semakin tinggi clock speed-nya (GHz), semakin cepat laptop menyelesaikan tugas. Contoh: Intel Core i5, AMD Ryzen 5.",
  },
  {
    term: "GPU",
    category: "hardware",
    short: "Graphics Processing Unit — prosesor khusus grafis.",
    detail:
      "GPU menangani rendering gambar, video, dan animasi. Ada dua jenis: integrated (menyatu dengan CPU, hemat daya) dan dedicated (terpisah, lebih bertenaga untuk gaming dan editing). Contoh: NVIDIA RTX 4060, AMD Radeon RX 7600M.",
  },
  {
    term: "RAM",
    category: "hardware",
    short: "Random Access Memory — memori kerja sementara.",
    detail:
      "RAM menyimpan data yang sedang aktif digunakan agar CPU bisa mengaksesnya dengan cepat. Semakin besar RAM, semakin banyak aplikasi yang bisa berjalan bersamaan tanpa lag. RAM tidak menyimpan data permanen — akan terhapus saat laptop dimatikan.",
  },
  {
    term: "SSD",
    category: "hardware",
    short: "Solid State Drive — penyimpanan cepat tanpa komponen bergerak.",
    detail:
      "SSD menyimpan data secara permanen menggunakan chip flash. Jauh lebih cepat dari HDD untuk booting dan membuka file. Jenisnya: SATA SSD (umum, lebih lambat) dan NVMe SSD (via slot M.2, sangat cepat). Tidak ada suara karena tidak ada piringan berputar.",
  },
  {
    term: "HDD",
    category: "hardware",
    short: "Hard Disk Drive — penyimpanan murah berkapasitas besar.",
    detail:
      "HDD menyimpan data di piringan magnetik yang berputar. Lebih lambat dari SSD tapi harga per gigabyte jauh lebih murah. Cocok untuk penyimpanan file besar (foto, video arsip). Rentan rusak jika terjatuh karena ada komponen mekanis bergerak.",
  },
  {
    term: "Thermal Paste",
    category: "hardware",
    short: "Pasta konduktor panas antara CPU/GPU dan heatsink.",
    detail:
      "Thermal paste mengisi celah mikroskopis antara chip dan heatsink agar panas tersalurkan lebih efisien. Seiring waktu (3–5 tahun) pasta ini mengering dan mengurangi kemampuan pendinginan, menyebabkan laptop makin panas. Mengganti thermal paste adalah solusi umum untuk laptop lama yang kepanasan.",
  },
  {
    term: "Heatsink",
    category: "hardware",
    short: "Komponen logam penyerap dan penyalur panas dari CPU/GPU.",
    detail:
      "Heatsink biasanya terbuat dari tembaga atau aluminium, terhubung ke kipas pendingin (fan). Sistem ini menarik panas dari chip dan membuangnya keluar laptop melalui ventilasi. Laptop dengan heatsink besar umumnya punya manajemen termal lebih baik.",
  },
  {
    term: "Baterai (mAh / Wh)",
    category: "hardware",
    short: "Kapasitas penyimpanan daya baterai laptop.",
    detail:
      "Wh (Watt-hour) adalah satuan yang lebih akurat untuk laptop dibanding mAh. Semakin besar angka Wh, semakin lama baterai bertahan. 50Wh ≈ 6–8 jam pemakaian normal. Kesehatan baterai menurun seiring siklus pengisian — di bawah 70% kapasitas asli, pertimbangkan ganti baterai.",
  },
  {
    term: "Port USB-C / Thunderbolt",
    category: "hardware",
    short: "Konektor serbaguna untuk data, video, dan pengisian daya.",
    detail:
      "USB-C adalah bentuk konektor, sedangkan Thunderbolt (3 dan 4) adalah protokol kecepatan tinggi yang menggunakan port USB-C. Thunderbolt 4 mendukung transfer data hingga 40Gbps, output ke dua monitor 4K, dan pengisian daya. Tidak semua port USB-C adalah Thunderbolt — cek spesifikasi.",
  },

  // Layar
  {
    term: "Refresh Rate (Hz)",
    category: "layar",
    short: "Seberapa sering layar memperbarui gambar per detik.",
    detail:
      "60Hz = 60 frame per detik, standar untuk kerja dan menonton. 120Hz atau 144Hz membuat gerakan lebih mulus, terasa nyata saat gaming atau scrolling cepat. 240Hz untuk gaming kompetitif. Refresh rate tinggi lebih boros baterai.",
  },
  {
    term: "Color Gamut (sRGB / DCI-P3)",
    category: "layar",
    short: "Cakupan warna yang bisa ditampilkan layar.",
    detail:
      "sRGB adalah standar untuk web dan Office — 100% sRGB sudah sangat baik untuk kebanyakan pengguna. DCI-P3 adalah standar sinema digital yang lebih luas — penting untuk editor foto/video profesional. Layar dengan 100% DCI-P3 menampilkan warna lebih vibrant dan akurat.",
  },
  {
    term: "Nits (kecerahan)",
    category: "layar",
    short: "Satuan kecerahan maksimal layar.",
    detail:
      "Semakin tinggi nits, semakin terang layar dan semakin nyaman digunakan di luar ruangan. 250–300 nits: cukup untuk dalam ruangan. 400+ nits: nyaman di kondisi terang. 600+ nits (HDR): sangat terang, ideal untuk outdoor atau HDR content.",
  },
  {
    term: "IPS / OLED / TN",
    category: "layar",
    short: "Jenis panel layar dengan karakteristik berbeda.",
    detail:
      "IPS: akurasi warna baik, sudut pandang lebar, harga terjangkau — pilihan mayoritas laptop. OLED: warna paling akurat, kontras tak terbatas (hitam benar-benar gelap), tipis — tapi mahal dan risiko burn-in. TN: respons tercepat tapi warna dan sudut pandang buruk — hampir usang.",
  },

  // Software & OS
  {
    term: "BIOS / UEFI",
    category: "software",
    short: "Firmware yang mengatur hardware sebelum OS berjalan.",
    detail:
      "BIOS (Basic Input/Output System) adalah program pertama yang berjalan saat laptop dinyalakan. UEFI adalah versi modern BIOS dengan tampilan grafis dan fitur lebih lengkap. Di sini kamu bisa mengatur urutan boot, mengaktifkan virtualisasi, atau mengecek informasi hardware dasar.",
  },
  {
    term: "Driver",
    category: "software",
    short: "Software penghubung antara OS dan hardware.",
    detail:
      "Driver memungkinkan Windows atau Linux mengenali dan berkomunikasi dengan hardware seperti GPU, WiFi, audio, dan touchpad. Driver yang usang atau rusak bisa menyebabkan hardware tidak berfungsi, crash, atau performa menurun. Selalu update driver GPU untuk performa gaming optimal.",
  },
  {
    term: "Bloatware",
    category: "software",
    short: "Aplikasi bawaan pabrik yang tidak diperlukan.",
    detail:
      "Bloatware adalah software yang diprainstal produsen atau operator, sering berjalan di background dan memakan RAM serta storage. Contoh: trial antivirus, aplikasi promosi brand. Menghapus bloatware bisa mempercepat laptop baru secara signifikan.",
  },
  {
    term: "Virtualisasi (VT-x / AMD-V)",
    category: "software",
    short: "Fitur CPU untuk menjalankan sistem operasi di dalam OS.",
    detail:
      "Virtualisasi memungkinkan kamu menjalankan virtual machine (VM) — misalnya Linux di dalam Windows. Perlu diaktifkan di BIOS/UEFI. Penting untuk developer yang butuh environment Linux, atau pengguna yang ingin mencoba OS lain tanpa dual boot.",
  },

  // Masalah Umum
  {
    term: "Thermal Throttling",
    category: "masalah",
    short: "CPU/GPU menurunkan performa sendiri karena terlalu panas.",
    detail:
      "Saat suhu CPU/GPU melampaui batas aman (biasanya 90–100°C), sistem otomatis mengurangi clock speed untuk mencegah kerusakan. Akibatnya performa drop drastis. Penyebab: thermal paste kering, ventilasi tersumbat debu, atau beban kerja terlalu berat untuk sistem pendingin yang ada.",
  },
  {
    term: "Blue Screen of Death (BSOD)",
    category: "masalah",
    short: "Layar biru error kritis yang memaksa Windows restart.",
    detail:
      "BSOD terjadi saat Windows menemukan error yang tidak bisa dipulihkan. Penyebab umum: driver rusak, RAM bermasalah, storage error, atau overheating. Kode error di layar biru (contoh: MEMORY_MANAGEMENT, IRQL_NOT_LESS_OR_EQUAL) membantu mengidentifikasi sumber masalah.",
  },
  {
    term: "Dead Pixel",
    category: "masalah",
    short: "Titik permanen di layar yang tidak menampilkan warna dengan benar.",
    detail:
      "Dead pixel adalah piksel yang tidak berfungsi — bisa tampil hitam (benar-benar mati), putih, atau satu warna tetap (stuck pixel). Stuck pixel kadang bisa diperbaiki dengan software. Dead pixel sejati tidak bisa diperbaiki. Selalu cek layar laptop baru dengan latar hitam, putih, merah, hijau, dan biru.",
  },
  {
    term: "Overheating",
    category: "masalah",
    short: "Suhu laptop melebihi batas aman secara berkelanjutan.",
    detail:
      "Overheating kronis merusak komponen jangka panjang. Tanda-tandanya: kipas selalu kencang, bodi panas menyengat, sering lag atau shutdown mendadak. Penyebab: debu menumpuk di ventilasi, thermal paste kering, penggunaan di permukaan yang menghalangi ventilasi (kasur, bantal), atau beban kerja ekstrem.",
  },
  {
    term: "Battery Drain Cepat",
    category: "masalah",
    short: "Baterai habis jauh lebih cepat dari seharusnya.",
    detail:
      "Penyebab: aplikasi background yang boros daya (cek Task Manager), kecerahan layar terlalu tinggi, baterai sudah tua (siklus charge tinggi), atau setting performa tidak sesuai. Gunakan BatteryInfoView untuk cek kesehatan baterai. Baterai dengan kapasitas di bawah 60% dari desain aslinya sebaiknya diganti.",
  },
  {
    term: "Lag / Stuttering",
    category: "masalah",
    short: "Pergerakan atau respons yang terputus-putus saat digunakan.",
    detail:
      "Lag bisa disebabkan RAM penuh (buka Task Manager, tab Performance), storage hampir penuh, thermal throttling, atau driver GPU bermasalah. Stuttering saat gaming khususnya sering karena VRAM GPU tidak cukup atau frame rate tidak stabil. Cek penggunaan resource dengan Task Manager sebelum menyimpulkan penyebabnya.",
  },
  {
    term: "Corrupt File / Bad Sector",
    category: "masalah",
    short: "Kerusakan data atau area fisik pada storage.",
    detail:
      "Bad sector adalah bagian storage yang tidak bisa dibaca/ditulis. Pada HDD bisa terjadi karena benturan fisik. Pada SSD bisa karena usia pemakaian. Tanda-tandanya: file tiba-tiba tidak bisa dibuka, Windows lambat booting, atau error saat copy file. Gunakan CHKDSK (Windows) untuk scan dan perbaiki.",
  },
  {
    term: "Kapasitor Kembung (Swollen Battery)",
    category: "masalah",
    short: "Baterai lithium yang menggembung karena gas internal.",
    detail:
      "Baterai kembung adalah kondisi berbahaya — baterai lithium menghasilkan gas dan mengembang. Tanda: trackpad atau casing laptop terangkat, baterai terlihat gembung. Jangan gunakan laptop dengan baterai kembung karena risiko kebakaran. Segera ke service center untuk penggantian baterai.",
  },

  // Jaringan
  {
    term: "WiFi 6 / WiFi 6E",
    category: "jaringan",
    short: "Standar WiFi generasi terbaru dengan kecepatan lebih tinggi.",
    detail:
      "WiFi 6 (802.11ax) menawarkan kecepatan hingga 9.6 Gbps dan lebih efisien di lingkungan padat perangkat. WiFi 6E menambahkan pita frekuensi 6GHz yang lebih lega dan minim interferensi. Untuk merasakan manfaatnya, router kamu juga harus mendukung WiFi 6/6E.",
  },
  {
    term: "Bluetooth versi",
    category: "jaringan",
    short: "Protokol nirkabel jarak dekat untuk aksesoris.",
    detail:
      "Bluetooth 5.0 ke atas menawarkan jangkauan lebih jauh dan koneksi lebih stabil dibanding versi lama. Bluetooth 5.2 dan 5.3 mendukung audio LE (latensi rendah untuk earphone). Versi Bluetooth di laptop tidak bisa di-upgrade karena tertanam di chipset WiFi.",
  },
];

const categoryMeta: Record<string, { label: string; color: string; bg: string }> = {
  hardware: { label: "Hardware", color: "text-blue-700", bg: "bg-blue-50" },
  layar: { label: "Layar", color: "text-violet-700", bg: "bg-violet-50" },
  software: { label: "Software & OS", color: "text-emerald-700", bg: "bg-emerald-50" },
  masalah: { label: "Masalah Umum", color: "text-rose-700", bg: "bg-rose-50" },
  jaringan: { label: "Jaringan", color: "text-amber-700", bg: "bg-amber-50" },
};

const filterTabs = [
  { id: "semua", label: "Semua" },
  { id: "hardware", label: "Hardware" },
  { id: "layar", label: "Layar" },
  { id: "software", label: "Software & OS" },
  { id: "masalah", label: "Masalah Umum" },
  { id: "jaringan", label: "Jaringan" },
];

function TermCard({ term }: { term: Term }) {
  const [open, setOpen] = useState(false);
  const meta = categoryMeta[term.category];

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-gray-300 transition-colors"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-start justify-between gap-3 px-5 py-4">
        <div className="flex items-start gap-3 min-w-0">
          <span
            className={`mt-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${meta.bg} ${meta.color}`}
          >
            {meta.label}
          </span>
          <div>
            <p className="text-sm font-semibold text-gray-900">{term.term}</p>
            <p className="text-xs text-gray-500 mt-0.5">{term.short}</p>
          </div>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 flex-shrink-0 mt-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
      {open && (
        <div className="px-5 pb-4 pt-0 border-t border-gray-100">
          <p className="text-sm text-gray-600 leading-relaxed">{term.detail}</p>
        </div>
      )}
    </div>
  );
}

export default function DictionaryPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("semua");

  const filtered = terms.filter((t) => {
    const matchCat = activeTab === "semua" || t.category === activeTab;
    const q = search.toLowerCase();
    const matchSearch =
      t.term.toLowerCase().includes(q) ||
      t.short.toLowerCase().includes(q) ||
      t.detail.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const grouped = filterTabs
    .filter((tab) => tab.id !== "semua")
    .map((tab) => ({
      ...tab,
      items: filtered.filter((t) => t.category === tab.id),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-200 py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-3xl">📖</span>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">Kamus Teknologi Laptop</h1>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            Istilah teknis, komponen penting, hingga masalah umum laptop — dijelaskan
            dengan bahasa yang mudah dipahami.
          </p>
          <div className="mt-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari istilah, contoh: SSD, BSOD, thermal..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-emerald-500 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Result count */}
        {search && (
          <p className="text-xs text-gray-400 mb-4">
            {filtered.length} istilah ditemukan untuk &ldquo;{search}&rdquo;
          </p>
        )}

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-medium text-gray-500">Istilah tidak ditemukan</p>
            <p className="text-sm text-gray-400 mt-1">Coba kata kunci yang berbeda</p>
          </div>
        )}

        {/* Grouped List */}
        {activeTab === "semua" ? (
          <div className="space-y-10">
            {grouped.map((group) => (
              <section key={group.id}>
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                  {group.label}
                </h2>
                <div className="space-y-2">
                  {group.items.map((t) => (
                    <TermCard key={t.term} term={t} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((t) => (
              <TermCard key={t.term} term={t} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-14 bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center">
          <p className="text-sm font-medium text-emerald-800">
            Masih bingung memilih laptop?
          </p>
          <p className="text-sm text-emerald-600 mt-1">
            Gunakan fitur rekomendasi cerdas kami — cukup jawab beberapa pertanyaan.
          </p>
          
            href="/recommendations"
            className="mt-4 inline-block bg-emerald-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-emerald-600 transition-colors"
          
            Mulai Rekomendasi →
          </div>
        </div>
      </div>
    
  );
}