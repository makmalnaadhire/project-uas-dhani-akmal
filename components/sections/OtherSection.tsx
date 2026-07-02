"use client";

import { useState } from "react";
import type { Tab } from "../DharianApp";
import {
  Users,
  Mail,
  MapPin,
  Phone,
  Send,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

interface Props {
  switchTab: (tab: Tab) => void;
  [key: string]: unknown;
}

const teamMembers = [
  { name: "Dhani", role: "Frontend Developer", desc: "Mengembangkan antarmuka pengguna yang modern dan responsif." },
  { name: "Akmal", role: "Backend Developer", desc: "Mengelola data dan logika aplikasi di balik layar." },
];

export default function OtherSection({ switchTab }: Props) {
  const [activeSubTab, setActiveSubTab] = useState<"about" | "contact">("about");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-2">
          <span className="text-gradient-cyan">Tentang</span> & Hubungi Kami
        </h1>
        <p className="text-slate-400 text-sm">Kenali tim kami dan jangan ragu untuk menghubungi.</p>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-2 mb-8 justify-center">
        {[
          { id: "about" as const, label: "Tentang Kami", icon: <Users size={16} /> },
          { id: "contact" as const, label: "Hubungi Kami", icon: <MessageSquare size={16} /> },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveSubTab(t.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeSubTab === t.id
                ? "bg-[#06b6d4]/15 text-[#06b6d4] border border-[#06b6d4]/30"
                : "bg-white/5 text-slate-400 border border-transparent hover:text-white"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* About */}
      {activeSubTab === "about" && (
        <div className="space-y-8 slide-up">
          {/* Project description */}
          <div className="glass rounded-xl p-8">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-4">
              <span className="text-gradient-cyan">Dharian</span>
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Dharian adalah platform pencarian, perbandingan, dan rekomendasi laptop
              yang dikembangkan sebagai proyek akhir kuliah. Platform ini menyediakan
              katalog lengkap dengan 30 laptop dari berbagai brand, fitur perbandingan
              side-by-side, wizard rekomendasi cerdas, serta edukasi seputar hardware
              laptop.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Dibangun dengan teknologi modern termasuk Next.js, React, dan Tailwind CSS,
              Dharian menghadirkan pengalaman visual yang premium dengan tema &quot;Dark Luxe&quot;
              yang unik dan berbeda dari platform sejenis.
            </p>
          </div>

          {/* Team */}
          <div>
            <h3 className="text-lg font-semibold font-[family-name:var(--font-display)] mb-4">Tim Pengembang</h3>
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

          {/* Tech stack */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-semibold font-[family-name:var(--font-display)] mb-4">Tech Stack</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Prisma", "PostgreSQL", "Lucide Icons", "Framer Motion"].map((t, i) => (
                <div key={i} className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-center text-slate-300">
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contact */}
      {activeSubTab === "contact" && (
        <div className="max-w-lg mx-auto slide-up">
          <div className="glass rounded-xl p-8">
            <h2 className="text-xl font-semibold font-[family-name:var(--font-display)] mb-6">
              Kirim Pesan
            </h2>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-[#06b6d4]/10 flex items-center justify-center mx-auto mb-3">
                  <Send size={24} className="text-[#06b6d4]" />
                </div>
                <p className="text-white font-medium mb-1">Pesan Terkirim!</p>
                <p className="text-sm text-slate-400">Terima kasih telah menghubungi kami.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Nama</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg bg-[#0f172a] border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#06b6d4]/50 input-glow transition-all"
                      placeholder="Nama Anda"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg bg-[#0f172a] border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#06b6d4]/50 input-glow transition-all"
                      placeholder="email@contoh.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Subjek</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#0f172a] border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#06b6d4]/50 input-glow transition-all"
                    placeholder="Perihal pesan"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Pesan</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#0f172a] border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#06b6d4]/50 input-glow transition-all resize-none"
                    placeholder="Tulis pesan Anda di sini..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all"
                >
                  <Send size={14} />
                  Kirim Pesan
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            {[
              { icon: <MapPin size={18} />, label: "Lokasi", value: "Indonesia" },
              { icon: <Mail size={18} />, label: "Email", value: "hello@dharian.id" },
              { icon: <Phone size={18} />, label: "Telepon", value: "+62 812-3456-7890" },
            ].map((c, i) => (
              <div key={i} className="glass rounded-xl p-4 text-center hover:border-[#06b6d4]/20 transition-all">
                <div className="w-9 h-9 rounded-lg bg-[#06b6d4]/10 text-[#06b6d4] flex items-center justify-center mx-auto mb-2">
                  {c.icon}
                </div>
                <p className="text-[10px] text-slate-500 mb-0.5">{c.label}</p>
                <p className="text-xs text-white font-medium">{c.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
