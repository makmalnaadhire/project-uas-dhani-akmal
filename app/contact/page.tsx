"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useTranslation } from "@/components/providers/LanguageProvider";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="pt-24 pb-20 max-w-6xl mx-auto px-4 sm:px-6 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-2">
          <span className="text-gradient-cyan">{t.contactTitle}</span> {t.contactSubtitle}
        </h1>
        <p className="text-slate-400 text-sm">{t.contactDesc}</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-xl p-6">
            <h2 className="text-lg font-bold font-[family-name:var(--font-display)] text-white mb-6">
              {t.contactInfo}
            </h2>

            <div className="space-y-5">
              <a href="mailto:laptoppintar.id@gmail.com" className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#06b6d4]/10 text-[#06b6d4] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">{t.contactEmail}</p>
                  <p className="text-sm text-white font-medium break-all hover:text-[#06b6d4] transition-colors">
                    laptoppintar.id@gmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2dd4bf]/10 text-[#2dd4bf] flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">{t.contactLocation}</p>
                  <p className="text-sm text-white font-medium">Balikpapan, Kalimantan Timur, Indonesia</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#d946ef]/10 text-[#d946ef] flex items-center justify-center flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">{t.contactPhone}</p>
                  <p className="text-sm text-white font-medium">+62 812-3456-7890</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white mb-3">{t.contactHours}</h3>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>{t.contactMonFri}</span>
                <span className="text-white">09:00 — 17:00</span>
              </div>
              <div className="flex justify-between">
                <span>{t.contactSat}</span>
                <span className="text-white">09:00 — 14:00</span>
              </div>
              <div className="flex justify-between">
                <span>{t.contactSun}</span>
                <span className="text-slate-500">{t.contactClosed}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="glass rounded-xl p-8">
            <h2 className="text-lg font-bold font-[family-name:var(--font-display)] text-white mb-6">
              {t.contactForm}
            </h2>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#06b6d4]/10 flex items-center justify-center mx-auto mb-4">
                  <Send size={28} className="text-[#06b6d4]" />
                </div>
                <p className="text-white font-semibold text-lg mb-1">{t.contactSent}</p>
                <p className="text-sm text-slate-400">{t.contactSentDesc}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-slate-500 mb-1.5 block font-medium">{t.contactName}</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#06b6d4]/50 input-glow transition-all"
                      placeholder={t.contactNamePlaceholder}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1.5 block font-medium">{t.contactEmail}</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#06b6d4]/50 input-glow transition-all"
                      placeholder={t.contactEmailPlaceholder}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1.5 block font-medium">{t.contactMessage}</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#06b6d4]/50 input-glow transition-all resize-none"
                    placeholder={t.contactMessagePlaceholder}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] text-white text-sm font-semibold hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all active:scale-[0.98]"
                >
                  <Send size={16} />
                  {t.contactForm}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
