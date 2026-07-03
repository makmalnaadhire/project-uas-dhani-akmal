"use client";

import { useTranslation } from "@/components/providers/LanguageProvider";

const teamMembers = [
  { name: "Dhani", role: "Anggota 1", desc: "Muhammad Akmal Naadhir Efriandi 2413045." },
  { name: "Akmal", role: "Anggota 2", desc: "Ramadhani Reyhan Dwi Syahputra 2413037." },
];

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-2">
          <span className="text-gradient-cyan">{t.aboutTitle}</span> {t.aboutSubtitle}
        </h1>
        <p className="text-slate-400 text-sm">{t.aboutDesc}</p>
      </div>

      <div className="space-y-8 slide-up">
        <div className="glass rounded-xl p-8">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-4">
            <span className="text-gradient-cyan">LaptopPintar</span>
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-4">
            LaptopPintar adalah platform pencarian, perbandingan, dan rekomendasi laptop
            yang dikembangkan sebagai proyek akhir kuliah. Platform ini menyediakan
            katalog lengkap dengan 30 laptop dari berbagai brand, fitur perbandingan
            side-by-side, wizard rekomendasi cerdas, serta edukasi seputar hardware
            laptop.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            Dibangun dengan teknologi modern termasuk Next.js, React, dan Tailwind CSS,
            LaptopPintar menghadirkan pengalaman visual yang premium dengan tema &quot;Dark Luxe&quot;
            yang unik dan berbeda dari platform sejenis.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold font-[family-name:var(--font-display)] mb-4">{t.aboutTeam}</h3>
          <div className="grid sm:grid-cols-2 gap-4 stagger">
            {teamMembers.map((m, i) => (
              <div key={i} className="glass rounded-xl p-6 hover:border-[#06b6d4]/20 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#06b6d4] to-[#3b82f6] flex items-center justify-center text-white font-bold text-lg mb-3 group-hover:scale-110 transition-transform">
                  {m.name[0]}
                </div>
                <h4 className="text-base font-semibold text-white font-[family-name:var(--font-display)]">{m.name}</h4>
                <p className="text-xs text-[#06b6d4] font-medium mb-2">{m.role}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl p-8">
          <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mb-2">
            <span className="text-gradient-cyan">Data Sources</span> & Referensi
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            Berikut sumber-sumber yang relevan sebagai referensi data laptop di database ini:
          </p>

          <div className="space-y-6">
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-[#2dd4bf]">&#x1F50D;</span> Review &amp; Benchmark Teknis
              </h4>
              <ul className="space-y-2.5">
                {[
                  { name: "Notebookcheck", desc: "sumber paling komprehensif untuk benchmark laptop, review mendalam per model per tahun, dan database spesifikasi." },
                  { name: "AnandTech", desc: "analisis teknis mendalam, terutama untuk review chip Apple Silicon (M1, M2, M3) dan benchmark CPU/GPU." },
                  { name: "Tom's Hardware", desc: "benchmark GPU dan CPU laptop sangat detail. Bagus untuk verifikasi data performa gaming dan rendering." },
                  { name: "Laptop Mag", desc: "review praktis dan rating baterai yang konsisten dan bisa diandalkan." },
                  { name: "The Verge", desc: "review consumer-focused, bagus untuk verifikasi isu nyata yang dirasakan pengguna umum." },
                  { name: "Ars Technica", desc: "review mendalam terutama untuk Apple MacBook dan laptop premium." },
                ].map((item, i) => (
                  <li key={i} className="text-xs text-slate-400 leading-relaxed">
                    <span className="font-bold text-slate-200">{item.name}</span> &mdash; {item.desc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-[#a855f7]">&#x1F3AE;</span> Gaming &amp; Komunitas
              </h4>
              <ul className="space-y-2.5">
                {[
                  { name: "r/laptops dan r/SuggestALaptop (Reddit)", desc: "sumber terbaik untuk isu-isu yang dilaporkan komunitas pengguna nyata." },
                  { name: "Linus Tech Tips Forum", desc: "diskusi teknis mendalam dari komunitas enthusiast." },
                  { name: "NotebookReview Forum", desc: "forum lama tapi arsipnya kaya akan laporan isu per model." },
                ].map((item, i) => (
                  <li key={i} className="text-xs text-slate-400 leading-relaxed">
                    <span className="font-bold text-slate-200">{item.name}</span> &mdash; {item.desc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-[#f97316]">&#x1F6D2;</span> Harga &amp; Pasar Indonesia
              </h4>
              <ul className="space-y-2.5">
                {[
                  { name: "Pricebook Indonesia", desc: "agregator harga laptop di pasar Indonesia dari berbagai toko." },
                  { name: "Tokopedia & Shopee", desc: "harga pasar second dan baru yang paling mencerminkan kondisi real Indonesia." },
                  { name: "iBox & Apple Authorized Reseller", desc: "referensi harga resmi Apple Indonesia." },
                ].map((item, i) => (
                  <li key={i} className="text-xs text-slate-400 leading-relaxed">
                    <span className="font-bold text-slate-200">{item.name}</span> &mdash; {item.desc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-[#3b82f6]">&#x1F4F1;</span> Spesifikasi Resmi
              </h4>
              <ul className="space-y-2.5">
                <li className="text-xs text-slate-400 leading-relaxed">
                  <span className="font-bold text-slate-200">Situs resmi masing-masing brand</span> (Lenovo.com, ASUS.com, HP.com, Dell.com, Acer.com, MSI.com, Apple.com) &mdash; sumber utama untuk spesifikasi resmi.
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-[#ef4444]">&#x1F4FA;</span> Video Review
              </h4>
              <ul className="space-y-2.5">
                {[
                  { name: "Dave2D", desc: "review visual laptop yang sangat populer, bagus untuk konfirmasi build quality." },
                  { name: "Jarrod's Tech", desc: "spesialis laptop, sangat detail untuk gaming laptop dan benchmark thermal." },
                  { name: "Hardware Unboxed", desc: "benchmark GPU laptop paling metodis dan konsisten." },
                  { name: "MKBHD (Marques Brownlee)", desc: "review MacBook dan laptop premium consumer." },
                  { name: "Dave Lee (Dave2D) dan Max Tech", desc: "khusus untuk Apple Silicon review dan perbandingan antar generasi." },
                ].map((item, i) => (
                  <li key={i} className="text-xs text-slate-400 leading-relaxed">
                    <span className="font-bold text-slate-200">{item.name}</span> &mdash; {item.desc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
