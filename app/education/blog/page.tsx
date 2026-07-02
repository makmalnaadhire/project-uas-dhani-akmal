"use client";

import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

type Article = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
};

const articles: Article[] = [
  {
    id: "tips-memilih-laptop-kuliah",
    title: "Tips Memilih Laptop untuk Kuliah",
    excerpt: "Panduan lengkap memilih laptop yang tepat untuk kebutuhan kuliah, mulai dari spesifikasi minimum hingga budget yang realistis.",
    date: "2025-06-15",
    readTime: "5 min",
    tag: "Tips",
  },
  {
    id: "cara-merawat-baterai-laptop",
    title: "Cara Merawat Baterai Laptop Agar Tahan Lama",
    excerpt: "Kebiasaan sehari-hari yang bisa memperpanjang umur baterai laptop kamu, dari cara charging hingga setting Windows.",
    date: "2025-06-10",
    readTime: "4 min",
    tag: "Perawatan",
  },
  {
    id: "laptop-second-worth-it",
    title: "Membeli Laptop Second: Worth It atau Tidak?",
    excerpt: "Analisis jujur tentang membeli laptop bekas, termasuk risiko, keuntungan, dan tips jitu memilih unit yang masih layak pakai.",
    date: "2025-06-05",
    readTime: "6 min",
    tag: "Panduan",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-3xl">📝</span>
          <h1 className="mt-3 text-3xl font-bold text-gray-900">Blog Tips Laptop</h1>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">
            Artikel praktis seputar memilih, merawat, dan memaksimalkan laptop kamu.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="space-y-4">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-emerald-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                  {article.tag}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(article.date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="text-xs text-gray-400">{article.readTime}</span>
              </div>
              <h2 className="text-base font-semibold text-gray-900">{article.title}</h2>
              <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{article.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 mt-3 cursor-pointer">
                Baca Selengkapnya <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          ))}
        </div>

        <div className="mt-14 bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center">
          <p className="text-sm font-medium text-emerald-800">Butuh rekomendasi personal?</p>
          <p className="text-sm text-emerald-600 mt-1">Gunakan fitur rekomendasi cerdas kami.</p>
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
