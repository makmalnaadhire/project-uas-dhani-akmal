"use client";

import Image from "next/image";
import { useTranslation } from "@/components/providers/LanguageProvider";

const teamMembers = [
  { name: "Dhani", role: "Anggota 1", desc: "Ramadhani Reyhan Dwi Syahputra 2413037..", image: "/PP-Dhani.png" },
  { name: "Akmal", role: "Anggota 2", desc: "Muhammad Akmal Naadhir Efriandi 2413045.", image: "/avatar1.jpg" },
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
          <p className="text-sm text-slate-400 leading-relaxed mb-4">{t.aboutBody1}</p>
          <p className="text-sm text-slate-400 leading-relaxed">{t.aboutBody2}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold font-[family-name:var(--font-display)] mb-4">{t.aboutTeam}</h3>
          <div className="grid sm:grid-cols-2 gap-4 stagger">
            {teamMembers.map((m, i) => (
              <div key={i} className="glass rounded-xl p-6 hover:border-[#06b6d4]/20 transition-all group text-center">
                <div className="relative mx-auto mb-4 w-24 h-24 md:w-28 md:h-28">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    className="rounded-full object-cover border-2 border-slate-700 shadow-lg group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 6rem, 7rem"
                  />
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
            <span className="text-gradient-cyan">{t.aboutRefTitle}</span>
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-6">{t.aboutRefDesc}</p>

          <div className="space-y-6">
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-[#2dd4bf]">&#x1F50D;</span> {t.aboutRef1Title}
              </h4>
              <ul className="space-y-2.5">
                {[
                  { name: "Notebookcheck", desc: t.aboutRef1Item1 },
                  { name: "AnandTech", desc: t.aboutRef1Item2 },
                  { name: "Tom's Hardware", desc: t.aboutRef1Item3 },
                  { name: "Laptop Mag", desc: t.aboutRef1Item4 },
                  { name: "The Verge", desc: t.aboutRef1Item5 },
                  { name: "Ars Technica", desc: t.aboutRef1Item6 },
                ].map((item, i) => (
                  <li key={i} className="text-xs text-slate-400 leading-relaxed">
                    <span className="font-bold text-slate-200">{item.name}</span> &mdash; {item.desc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-[#a855f7]">&#x1F3AE;</span> {t.aboutRef2Title}
              </h4>
              <ul className="space-y-2.5">
                {[
                  { name: "r/laptops dan r/SuggestALaptop (Reddit)", desc: t.aboutRef2Item1 },
                  { name: "Linus Tech Tips Forum", desc: t.aboutRef2Item2 },
                  { name: "NotebookReview Forum", desc: t.aboutRef2Item3 },
                ].map((item, i) => (
                  <li key={i} className="text-xs text-slate-400 leading-relaxed">
                    <span className="font-bold text-slate-200">{item.name}</span> &mdash; {item.desc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-[#f97316]">&#x1F6D2;</span> {t.aboutRef3Title}
              </h4>
              <ul className="space-y-2.5">
                {[
                  { name: "Pricebook Indonesia", desc: t.aboutRef3Item1 },
                  { name: "Tokopedia & Shopee", desc: t.aboutRef3Item2 },
                  { name: "iBox & Apple Authorized Reseller", desc: t.aboutRef3Item3 },
                ].map((item, i) => (
                  <li key={i} className="text-xs text-slate-400 leading-relaxed">
                    <span className="font-bold text-slate-200">{item.name}</span> &mdash; {item.desc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-[#3b82f6]">&#x1F4F1;</span> {t.aboutRef4Title}
              </h4>
              <ul className="space-y-2.5">
                <li className="text-xs text-slate-400 leading-relaxed">
                  <span className="font-bold text-slate-200">{t.aboutRef4Note}</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5">
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-[#ef4444]">&#x1F4FA;</span> {t.aboutRef5Title}
              </h4>
              <ul className="space-y-2.5">
                {[
                  { name: "Dave2D", desc: t.aboutRef5Item1 },
                  { name: "Jarrod's Tech", desc: t.aboutRef5Item2 },
                  { name: "Hardware Unboxed", desc: t.aboutRef5Item3 },
                  { name: "MKBHD (Marques Brownlee)", desc: t.aboutRef5Item4 },
                  { name: "Dave Lee (Dave2D) dan Max Tech", desc: t.aboutRef5Item5 },
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
