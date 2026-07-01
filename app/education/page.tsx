"use client";

import Link from "next/link";
import { BookOpen, HelpCircle, Hash, Tag, ShieldCheck, Clock } from "lucide-react";

const eduCategories = [
  {
    href: "/education/blog",
    icon: BookOpen,
    color: "bg-blue-50 text-blue-600",
    border: "border-blue-100",
    label: "Blog Tips Laptop",
    desc: "Artikel praktis seputar memilih, merawat, dan memaksimalkan laptop kamu.",
    tag: "Artikel",
  },
  {
    href: "/education/faq",
    icon: HelpCircle,
    color: "bg-emerald-50 text-emerald-600",
    border: "border-emerald-100",
    label: "FAQ",
    desc: "Jawaban lengkap atas pertanyaan yang paling sering muncul saat beli laptop.",
    tag: "Q&A",
  },
  {
    href: "/education/dictionary",
    icon: Hash,
    color: "bg-violet-50 text-violet-600",
    border: "border-violet-100",
    label: "Kamus Teknologi",
    desc: "Penjelasan istilah teknis laptop dalam bahasa yang mudah dipahami.",
    tag: "Referensi",
  },
  {
    href: "/education/estimasi",
    icon: Tag,
    color: "bg-orange-50 text-orange-600",
    border: "border-orange-100",
    label: "Estimasi Jual/Beli Second",
    desc: "Perkiraan harga wajar laptop bekas berdasarkan spesifikasi dan kondisi.",
    tag: "Kalkulator",
  },
  {
    href: "/education/panduan-second",
    icon: ShieldCheck,
    color: "bg-rose-50 text-rose-600",
    border: "border-rose-100",
    label: "Panduan Laptop Second",
    desc: "Checklist lengkap apa saja yang harus dicek sebelum membeli laptop bekas.",
    tag: "Panduan",
  },
  {
    href: "/education/umur-laptop",
    icon: Clock,
    color: "bg-amber-50 text-amber-600",
    border: "border-amber-100",
    label: "Cek Umur Laptop",
    desc: "Ketahui seberapa tua laptop yang ingin kamu beli dan sisa masa pakainya.",
    tag: "Tools",
  },
];

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-200 py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-3xl">📚</span>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            Pusat Edukasi Laptop
          </h1>
          <p className="mt-2 text-gray-500 text-sm leading-relaxed">
            Semua yang perlu kamu tahu sebelum membeli laptop — dari istilah teknis
            sampai panduan laptop bekas.
          </p>
        </div>
      </div>

      {/* Grid Kategori */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {eduCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.href}
                href={cat.href}
                className={`group bg-white border ${cat.border} rounded-2xl p-5 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5`}
              >
                <div className="flex items-start gap-4">
                  <div className={`${cat.color} p-2.5 rounded-xl`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="text-sm font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                        {cat.label}
                      </h2>
                      <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full flex-shrink-0">
                        {cat.tag}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA bawah */}
        <div className="mt-12 bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center">
          <p className="text-sm font-medium text-emerald-800">
            Sudah siap memilih laptop?
          </p>
          <p className="text-sm text-emerald-600 mt-1">
            Gunakan fitur rekomendasi cerdas kami untuk hasil yang sesuai kebutuhan.
          </p>
          <Link
            href="/recommendations"
            className="mt-4 inline-block bg-emerald-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Mulai Rekomendasi →
          </Link>
        </div>
      </div>
    </div>
  );
}