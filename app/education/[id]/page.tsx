"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { articles } from "@/lib/articles";
import { ArrowLeft, Clock } from "lucide-react";

export default function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { t, lang } = useTranslation();

  const article = articles.find(a => a.id === id);

  if (!article) notFound();

  const categoryMap: Record<string, string> = {
    "Panduan": t.eduCatGuide,
    "Edukasi": t.eduCatEducation,
    "Tips": t.eduCatTips,
    "Guide": t.eduCatGuide,
    "Education": t.eduCatEducation,
  };

  return (
    <div className="pt-24 pb-20 max-w-3xl mx-auto px-4 sm:px-6 min-h-screen">
      {/* Back button */}
      <Link
        href="/education"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[#d946ef] transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        {t.eduBackToEdu}
      </Link>

      {/* Article header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-[11px] font-medium px-3 py-1 rounded-full border"
            style={{ color: article.color, borderColor: `${article.color}30`, backgroundColor: `${article.color}10` }}
          >
            {categoryMap[article.category] || article.category}
          </span>
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <Clock size={11} />
            {article.readTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] text-white leading-tight mb-4">
          {article.title[lang]}
        </h1>

        <p className="text-slate-400 text-base leading-relaxed">
          {article.excerpt[lang]}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#d946ef]/30 to-transparent mb-8" />

      {/* Article content */}
      <div className="prose prose-invert prose-lg max-w-none
        prose-headings:text-white prose-headings:font-[family-name:var(--font-display)]
        prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-[#d946ef]
        prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-slate-200
        prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-4
        prose-strong:text-white prose-strong:font-bold
        prose-a:text-[#d946ef] prose-a:no-underline hover:prose-a:underline
        prose-li:text-slate-300 prose-li:mb-1
        prose-ul:my-4 prose-ol:my-4
        prose-code:text-[#d946ef] prose-code:bg-[#d946ef]/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal
        prose-pre:bg-slate-900 prose-pre:border prose-pre:border-white/10
        prose-table:border-collapse
        prose-th:text-left prose-th:text-sm prose-th:font-semibold prose-th:text-slate-400 prose-th:pb-2 prose-th:border-b prose-th:border-white/10
        prose-td:text-sm prose-td:text-slate-300 prose-td:py-2 prose-td:border-b prose-td:border-white/5
      ">
        <Markdown>{article.content[lang]}</Markdown>
      </div>

      {/* Bottom nav */}
      <div className="mt-12 pt-8 border-t border-white/10">
        <Link
          href="/education"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#d946ef]/10 border border-[#d946ef]/20 text-[#d946ef] text-sm font-medium hover:bg-[#d946ef]/20 transition-all"
        >
          <ArrowLeft size={14} />
          {t.eduBackToEdu}
        </Link>
      </div>
    </div>
  );
}
