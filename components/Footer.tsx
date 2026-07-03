"use client";

import Link from "next/link";
import { useTranslation } from "@/components/providers/LanguageProvider";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-white/5 bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2dd4bf] via-[#d946ef] to-[#f97316] flex items-center justify-center font-bold text-white text-xs font-[family-name:var(--font-display)]">
                LP
              </div>
              <span className="text-base font-bold font-[family-name:var(--font-display)] text-gradient-hero">
                LaptopPintar.id
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              {t.footerDesc}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">{t.footerMenu}</h4>
            <div className="space-y-2">
              {[
                { label: t.footerCatalog, href: "/catalog" },
                { label: t.footerRecommend, href: "/recommendations" },
                { label: t.footerEducation, href: "/education" },
                { label: t.footerAbout, href: "/about" },
                { label: t.footerContact, href: "/contact" },
              ].map((l, i) => (
                <Link
                  key={i}
                  href={l.href}
                  className="block text-xs text-slate-500 hover:text-[#2dd4bf] transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">{t.footerProject}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              UAS Pemrograman Web
              <br />
              Dhani &amp; Akmal &middot; 2026
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-slate-600">
            &copy; 2026 LaptopPintar. {t.footerCopyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
