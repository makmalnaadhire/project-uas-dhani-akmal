"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useTranslation } from "@/components/providers/LanguageProvider";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal mengirim pesan");
      }

      setFormData({ name: "", email: "", message: "" });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="pt-24 pb-20 max-w-6xl mx-auto px-4 sm:px-6 min-h-screen">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 backdrop-blur-md shadow-2xl shadow-emerald-500/10 animate-in slide-in-from-right-5 fade-in duration-300">
          <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
          <p className="text-sm text-emerald-300 font-medium">{t.contactSent}</p>
        </div>
      )}

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] mb-2">
          <span className="text-gradient-cyan">{t.contactTitle}</span> {t.contactSubtitle}
        </h1>
        <p className="text-slate-400 text-sm">{t.contactDesc}</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Column — Contact Info */}
        <div className="lg:col-span-2">
          <div className="glass rounded-2xl p-6 sm:p-8 border border-white/5 h-full">
            <h2 className="text-lg font-bold font-[family-name:var(--font-display)] text-white mb-6">
              {t.contactInfo}
            </h2>

            <div className="space-y-5">
              <a href="mailto:laptoppintar.id@gmail.com" className="flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-[#06b6d4]/10 text-[#06b6d4] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
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
                <div className="w-11 h-11 rounded-xl bg-[#2dd4bf]/10 text-[#2dd4bf] flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">{t.contactLocation}</p>
                  <p className="text-sm text-white font-medium">Balikpapan, Kalimantan Timur, Indonesia</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#d946ef]/10 text-[#d946ef] flex items-center justify-center flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">{t.contactPhone}</p>
                  <p className="text-sm text-white font-medium">+62 812-3456-7890</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column — Contact Form */}
        <div className="lg:col-span-3">
          <div className="glass rounded-2xl p-6 sm:p-8 border border-white/5">
            <h2 className="text-lg font-bold font-[family-name:var(--font-display)] text-white mb-6">
              {t.contactForm}
            </h2>

            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400">
                {error}
              </div>
            )}

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
                    disabled={isSending}
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
                    disabled={isSending}
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
                  disabled={isSending}
                />
              </div>
              <button
                type="submit"
                disabled={isSending}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] text-white text-sm font-semibold hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {t.contactForm}...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    {t.contactForm}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
