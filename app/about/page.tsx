import { Target, Users, Laptop, TrendingUp, ShieldCheck, Heart } from "lucide-react";

const team = [
  {
    name: "Nama Anggota 1",
    role: "Project Lead / Fullstack",
    image: "/images/team/member1.jpg",
  },
  {
    name: "Nama Anggota 2",
    role: "Frontend Developer",
    image: "/images/team/member2.jpg",
  },
];

const stats = [
  { label: "Laptop Terdaftar", value: "50+", icon: Laptop },
  { label: "Sumber Data Terpercaya", value: "6", icon: ShieldCheck },
  { label: "Kategori Kebutuhan", value: "10+", icon: TrendingUp },
  { label: "Anggota Tim", value: "4", icon: Users },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-block bg-emerald-50 text-emerald-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Tentang Kami
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Bantu Kamu Pilih Laptop Tanpa Bingung
          </h1>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto leading-relaxed">
            LaptopPintar lahir dari masalah yang sering kami alami sendiri:
            terlalu banyak pilihan laptop, terlalu sedikit waktu untuk
            membandingkan. Kami merangkum data dari sumber-sumber terpercaya
            agar kamu bisa memilih laptop yang sesuai kebutuhan dan budget,
            tanpa harus buka puluhan tab.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm"
              >
                <Icon className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Misi & Visi */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-5 h-5 text-emerald-500" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Misi Kami</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Menyediakan informasi laptop yang akurat, mudah dibandingkan,
              dan relevan dengan kebutuhan nyata penggunanya — mulai dari
              pelajar, mahasiswa, hingga profesional kreatif.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-5 h-5 text-orange-500" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Nilai Kami</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Transparan soal sumber data, netral dalam rekomendasi (tidak
              berpihak ke merek tertentu), dan selalu memprioritaskan
              kebutuhan pengguna di atas segalanya.
            </p>
          </div>
        </div>
      </section>

      {/* Tim */}
      <section className="bg-white border-y border-gray-200 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">Tim di Balik Layar</h2>
            <p className="text-gray-500 text-sm mt-2">
              Proyek UAS yang dikerjakan dengan niat baik dan banyak kopi.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-3 overflow-hidden">
                  {/* Ganti src di bawah dengan foto asli anggota tim */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-semibold text-gray-900">{member.name}</p>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Ada Pertanyaan atau Masukan?</h2>
        <p className="text-gray-500 mt-2 mb-6">
          Kami senang mendengar dari kamu. Hubungi tim kami kapan saja.
        </p>
        <a
          href="/contact"
          className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Hubungi Kami →
        </a>
      </section>
    </main>
  );
}
