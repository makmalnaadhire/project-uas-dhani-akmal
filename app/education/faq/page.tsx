"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

type FAQ = {
  question: string;
  answer: string;
};

type Category = {
  id: string;
  label: string;
  emoji: string;
  faqs: FAQ[];
};

const categories: Category[] = [
  {
    id: "spesifikasi",
    label: "Spesifikasi",
    emoji: "🔧",
    faqs: [
      {
        question: "Berapa RAM yang cukup untuk penggunaan sehari-hari?",
        answer:
          "Untuk penggunaan sehari-hari seperti browsing, streaming, dan Office, 8GB RAM sudah cukup. Jika kamu sering multitasking berat, edit foto/video ringan, atau menjalankan banyak tab browser sekaligus, 16GB lebih nyaman. RAM 32GB ke atas biasanya untuk kebutuhan profesional seperti editing video 4K, 3D rendering, atau pengembangan software besar.",
      },
      {
        question: "Apa perbedaan SSD dan HDD? Mana yang lebih baik?",
        answer:
          "SSD (Solid State Drive) jauh lebih cepat dari HDD (Hard Disk Drive) — booting sistem bisa 5–10x lebih cepat. SSD tidak punya komponen bergerak sehingga lebih tahan banting dan senyap. HDD lebih murah per gigabyte, cocok untuk penyimpanan data besar. Untuk laptop modern, SSD adalah pilihan utama; jika butuh kapasitas besar dengan budget terbatas, bisa kombinasikan SSD kecil (boot) + HDD eksternal.",
      },
      {
        question: "Processor Intel vs AMD, mana yang lebih bagus?",
        answer:
          "Keduanya sangat kompetitif di 2024–2025. Intel (seri Core Ultra) unggul dalam single-core performance dan kompatibilitas software tertentu. AMD Ryzen unggul dalam multi-core performance dan efisiensi daya, cocok untuk produktivitas berat. Untuk gaming, keduanya setara. Pilih berdasarkan harga, ketersediaan, dan ekosistem laptop yang kamu inginkan — bukan semata merek.",
      },
      {
        question: "Apakah GPU dedicated wajib dimiliki?",
        answer:
          "Tidak wajib, tergantung kebutuhan. GPU integrated (bawaan processor) sudah cukup untuk Office, browsing, streaming, bahkan video call 4K. GPU dedicated (NVIDIA/AMD terpisah) diperlukan jika kamu gaming, editing video resolusi tinggi, desain 3D, atau machine learning. GPU dedicated juga membuat laptop lebih boros baterai dan lebih mahal.",
      },
      {
        question: "Berapa kapasitas baterai yang ideal untuk laptop?",
        answer:
          "Kapasitas baterai diukur dalam Wh (Watt-hour). Angka 50–60Wh biasanya cukup untuk 6–8 jam pemakaian normal. 70Wh ke atas bisa mencapai 10–12 jam. Perlu diingat, ketahanan baterai sangat dipengaruhi oleh kecerahan layar, beban kerja, dan efisiensi processor — jadi selalu cek review nyata, bukan klaim pabrik.",
      },
    ],
  },
  {
    id: "layar",
    label: "Layar",
    emoji: "🖥️",
    faqs: [
      {
        question: "Resolusi layar apa yang direkomendasikan?",
        answer:
          "Full HD (1920×1080) adalah standar minimum yang nyaman untuk layar 15 inci. Untuk laptop 14 inci ke bawah, 2K (2560×1600) lebih tajam karena pixel density lebih tinggi. Resolusi 4K pada laptop jarang dibutuhkan karena layarnya kecil dan boros daya. Untuk pekerjaan desain atau foto, 2K dengan warna akurat lebih penting daripada resolusi semata.",
      },
      {
        question: "Apa itu refresh rate dan apakah penting?",
        answer:
          "Refresh rate (Hz) adalah berapa kali layar memperbarui gambar per detik. 60Hz cukup untuk pekerjaan dan menonton video. 120Hz atau 144Hz membuat animasi dan scrolling terasa lebih mulus — sangat terasa saat gaming atau scrolling media sosial. Jika kamu bukan gamer, 60Hz sudah lebih dari cukup dan menghemat baterai.",
      },
      {
        question: "IPS, OLED, atau TN — mana yang terbaik?",
        answer:
          "IPS: warna akurat, sudut pandang lebar, harga terjangkau — pilihan terbaik untuk kebanyakan orang. OLED: warna paling vibrant, hitam pekat, kontras tak tertandingi — ideal untuk konten kreator dan penonton film, tapi lebih mahal dan risiko burn-in jangka panjang. TN: respons paling cepat, tapi warna dan sudut pandang buruk — hampir tidak direkomendasikan kecuali untuk gaming kompetitif budget.",
      },
    ],
  },
  {
    id: "pembelian",
    label: "Tips Beli",
    emoji: "🛒",
    faqs: [
      {
        question: "Kapan waktu terbaik membeli laptop?",
        answer:
          "Beberapa momen terbaik: (1) Harbolnas (11.11, 12.12) di Tokopedia/Shopee — diskon bisa 10–20%. (2) Ganti generasi processor — harga model lama turun signifikan. (3) Awal tahun ajaran baru (Juni–Agustus) — banyak promo pelajar. (4) Brand day di e-commerce. Hindari beli saat baru rilis jika tidak mendesak, karena harga masih premium.",
      },
      {
        question: "Garansi resmi vs garansi toko, apa bedanya?",
        answer:
          "Garansi resmi (distributor/brand) berlaku di semua service center resmi seluruh Indonesia, biasanya 1–2 tahun. Lebih aman dan terpercaya. Garansi toko hanya berlaku di toko tersebut — jika toko tutup atau bermasalah, garansimu hangus. Selalu prioritaskan garansi resmi meski harga sedikit lebih mahal.",
      },
      {
        question: "Apakah aman membeli laptop second hand?",
        answer:
          "Aman jika kamu tahu cara memeriksanya. Cek kondisi fisik (layar, keyboard, engsel, port). Tes baterai dengan software seperti BatteryInfoView — kesehatan di atas 70% masih layak. Cek siklus baterai, suhu CPU saat idle dan load. Beli dari penjual terpercaya dengan rekam jejak jelas. Hindari harga terlalu murah tanpa alasan jelas.",
      },
      {
        question: "Berapa budget minimal untuk laptop yang layak?",
        answer:
          "Untuk penggunaan Office dan browsing: Rp 4–6 juta sudah bisa dapat laptop baru yang layak (ASUS VivoBook, Lenovo IdeaPad entry). Untuk pelajar/mahasiswa produktif: Rp 6–9 juta memberikan kenyamanan lebih. Untuk kreator konten atau programming: Rp 10–15 juta. Gaming serius: mulai Rp 12 juta ke atas. Hindari laptop baru di bawah Rp 3,5 juta karena biasanya komprominya terlalu besar.",
      },
      {
        question: "Merek laptop apa yang paling direkomendasikan?",
        answer:
          "Tidak ada satu jawaban — tiap merek punya keunggulan berbeda. ASUS: value for money terbaik di Indonesia, after-sales luas. Lenovo: build quality kokoh, keyboard terbaik di kelasnya. HP: desain rapi, pilihan banyak. Acer: harga kompetitif untuk gaming dan pelajar. Dell/Apple: premium build dan layar, harga lebih tinggi. Pilih merek dengan service center terdekat dari domisilimu.",
      },
    ],
  },
  {
    id: "performa",
    label: "Performa",
    emoji: "⚡",
    faqs: [
      {
        question: "Kenapa laptop baru saya terasa lambat?",
        answer:
          "Beberapa penyebab umum: (1) Bloatware bawaan pabrik — hapus aplikasi yang tidak diperlukan. (2) Windows Update berjalan di background saat pertama kali dinyalakan. (3) Storage hampir penuh — sisakan minimal 15% kapasitas SSD. (4) Terlalu banyak aplikasi startup — matikan via Task Manager > Startup. (5) Driver belum terupdate. Jika setelah itu masih lambat, mungkin spesifikasi memang tidak sesuai kebutuhan.",
      },
      {
        question: "Apakah perlu thermal paste baru untuk laptop lama?",
        answer:
          "Jika laptop berumur 3–5 tahun dan mulai panas berlebihan (throttling), mengganti thermal paste bisa menurunkan suhu 10–20°C dan mengembalikan performa. Tanda-tandanya: kipas selalu kencang, performa drop saat baterai penuh, suhu CPU di atas 90°C saat load ringan. Sebaiknya dikerjakan oleh teknisi berpengalaman jika kamu tidak familiar membuka laptop.",
      },
      {
        question: "Mode gaming/performa vs mode hemat daya — kapan pakai yang mana?",
        answer:
          "Mode performa/gaming: aktifkan saat butuh kecepatan maksimal — rendering, gaming, kompilasi kode. Siap-siap baterai lebih boros dan laptop lebih panas. Mode hemat daya: ideal saat bekerja dari baterai untuk tugas ringan seperti menulis atau browsing. Mode balanced (default) sudah cocok untuk 80% penggunaan harian — biarkan sistem yang mengatur secara otomatis.",
      },
    ],
  },
];

function FAQItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-gray-800 leading-snug">
          {faq.question}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 bg-white border-t border-gray-100">
          <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("semua");

  const filtered = categories
    .filter((cat) =>
      activeCategory === "semua" ? true : cat.id === activeCategory
    )
    .map((cat) => ({
      ...cat,
      faqs: cat.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(search.toLowerCase()) ||
          faq.answer.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.faqs.length > 0);

  const totalResults = filtered.reduce((acc, cat) => acc + cat.faqs.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-200 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-3xl">❓</span>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            Pertanyaan yang sering ditanyakan
          </h1>
          <p className="mt-2 text-gray-500 text-sm">
            Jawaban lengkap seputar membeli dan memilih laptop yang tepat.
          </p>

          {/* Search */}
          <div className="mt-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari pertanyaan..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
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

        {/* Results count saat search aktif */}
        {search && (
          <p className="text-xs text-gray-400 mb-4">
            {totalResults} hasil untuk &ldquo;{search}&rdquo;
          </p>
        )}

        {/* FAQ List */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-medium text-gray-500">Pertanyaan tidak ditemukan</p>
            <p className="text-sm mt-1">Coba kata kunci yang berbeda</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filtered.map((cat) => (
              <section key={cat.id}>
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span>{cat.emoji}</span> {cat.label}
                </h2>
                <div className="space-y-2">
                  {cat.faqs.map((faq, i) => (
                    <FAQItem key={i} faq={faq} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* CTA bawah */}
        <div className="mt-14 bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center">
          <p className="text-sm font-medium text-emerald-800">
            Tidak menemukan jawaban yang kamu cari?
          </p>
          <p className="text-sm text-emerald-600 mt-1">
            Coba gunakan fitur rekomendasi cerdas kami.
          </p>
          
            href="/recommendations"
            className="mt-4 inline-block bg-emerald-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-emerald-600 transition-colors"
          
            Mulai Rekomendasi →
          </div>
        </div>
      </div>
   
  );
}