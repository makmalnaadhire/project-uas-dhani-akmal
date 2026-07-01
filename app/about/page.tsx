import Link from "next/link";
import {
  Laptop,
  Target,
  BookOpenCheck,
  Heart,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const values = [
  {
    icon: Target,
    color: "emerald",
    title: "Rekomendasi Tepat Sasaran",
    description:
      "Kami mencocokkan laptop dengan kebutuhan, budget, dan kondisi (baru/second) yang kamu pilih sendiri — bukan sekadar daftar acak.",
  },
  {
    icon: ShieldCheck,
    color: "orange",
    title: "Data Jujur & Transparan",
    description:
      "Spesifikasi, harga, dan estimasi nilai jual-beli disusun apa adanya, supaya kamu bisa mengambil keputusan tanpa rasa was-was.",
  },
  {
    icon: BookOpenCheck,
    color: "red",
    title: "Edukasi, Bukan Cuma Jualan",
    description:
      "Blog, FAQ, kamus istilah teknologi, sampai panduan laptop second kami sediakan supaya kamu makin paham, bukan cuma disuruh beli.",
  },
];

const steps = [
  {
    number: "01",
    title: "Ceritakan Kebutuhanmu",
    description:
      "Jawab beberapa pertanyaan singkat soal kebutuhan, budget, dan preferensi kondisi laptop.",
  },
  {
    number: "02",
    title: "Lihat Rekomendasi",
    description:
      "Sistem kami menyaring katalog dan menampilkan pilihan laptop yang paling relevan buat kamu.",
  },
  {
    number: "03",
    title: "Bandingkan & Simpan",
    description:
      "Bandingkan beberapa laptop sekaligus, lalu simpan pilihan favoritmu ke Wishlist.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Tentang Kami
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Bantu Kamu Pilih Laptop Tanpa Bingung
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto leading-relaxed">
            LaptopPintar lahir dari satu masalah yang hampir semua orang
            pernah alami: bingung menentukan laptop mana yang benar-benar
            cocok, di antara ratusan pilihan, spesifikasi teknis yang
            membingungkan, dan budget yang terbatas. Kami hadir sebagai teman
            diskusi digital yang membantu kamu menemukan laptop yang pas —
            baik itu untuk kuliah, kerja, desain, ataupun gaming.
          </p>
        </div>
      </section>

      {/* Misi */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-2 flex justify-center md:justify-start">
            <div className="w-28 h-28 bg-emerald-50 rounded-3xl flex items-center justify-center">
              <Laptop className="w-12 h-12 text-emerald-500" />
            </div>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Misi Kami
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Menyederhanakan proses memilih laptop melalui katalog yang
              lengkap, sistem rekomendasi yang mengerti kebutuhanmu, serta
              konten edukasi yang mudah dipahami. Kami percaya setiap orang
              berhak mendapatkan laptop yang sesuai kebutuhan dan bujetnya
              tanpa harus jadi ahli teknologi terlebih dahulu.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">
              Kenapa LaptopPintar?
            </h2>
            <p className="mt-2 text-gray-500 max-w-xl mx-auto">
              Tiga hal yang jadi pegangan kami dalam membangun setiap fitur.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              const colorMap: Record<string, string> = {
                emerald: "bg-emerald-50 text-emerald-500",
                orange: "bg-orange-50 text-orange-500",
                red: "bg-red-50 text-red-500",
              };
              return (
                <div
                  key={value.title}
                  className="bg-gray-50 border border-gray-200 rounded-2xl p-6"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mb-4 ${colorMap[value.color]}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cara Kerja */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900">Cara Kerjanya</h2>
          <p className="mt-2 text-gray-500 max-w-xl mx-auto">
            Cuma tiga langkah untuk menemukan laptop yang cocok buat kamu.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white border border-gray-200 rounded-2xl p-6"
            >
              <span className="text-3xl font-bold text-emerald-500">
                {step.number}
              </span>
              <h3 className="font-semibold text-gray-900 mt-3 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-50 rounded-2xl mb-5">
            <Heart className="w-6 h-6 text-emerald-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Siap Menemukan Laptop yang Pas?
          </h2>
          <p className="mt-3 text-gray-500 max-w-lg mx-auto leading-relaxed">
            Mulai dari kebutuhanmu, biar kami yang bantu carikan pilihan
            terbaiknya.
          </p>
          <Link
            href="/recommendations"
            className="mt-6 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Mulai Cari Laptop
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
