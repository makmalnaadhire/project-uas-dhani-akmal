"use client";

import { useState } from "react";
import {
  Mail,
  MapPin,
  Globe,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useTranslation } from "@/components/providers/LanguageProvider";

export default function ContactPage() {
  const { t } = useTranslation();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState<"success" | "error" | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const showToast = (type: "success" | "error", msg?: string) => {
    if (type === "error" && msg) setErrorMsg(msg);
    setToast(type);
    setTimeout(() => {
      setToast(null);
      setErrorMsg("");
    }, 4500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Gagal mengirim pesan");

      setForm({ name: "", email: "", message: "" });
      showToast("success");
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsSending(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-slate-700/50 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all";

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6">
      {/* Toast Notification */}
      {toast === "success" && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 backdrop-blur-xl shadow-2xl shadow-emerald-500/10 transition-all">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span className="text-sm text-emerald-300 font-medium">
            {t.contactSent}
          </span>
        </div>
      )}

      {toast === "error" && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl bg-red-500/15 border border-red-500/30 backdrop-blur-xl shadow-2xl shadow-red-500/10 transition-all">
          <AlertCircle size={18} className="text-red-400 shrink-0" />
          <span className="text-sm text-red-300 font-medium">{errorMsg}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto py-10">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] mb-3">
            <span className="text-gradient-cyan">{t.contactTitle}</span>{" "}
            {t.contactSubtitle}
          </h1>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            {t.contactDesc}
          </p>
        </div>

        {/* Two-Column Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ── Left Column: Contact Info ── */}
          <div className="space-y-6">
            <div className="bg-zinc-900/40 backdrop-blur-md border border-slate-800/60 p-6 rounded-2xl">
              <h2 className="text-lg font-bold font-[family-name:var(--font-display)] text-white mb-6">
                {t.contactInfo}
              </h2>

              <div className="space-y-5">
                {/* Email */}
                <a
                  href="mailto:laptoppintar.id@gmail.com"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-0.5">
                      {t.contactEmail}
                    </p>
                    <p className="text-sm text-white font-medium break-all group-hover:text-indigo-400 transition-colors">
                      laptoppintar.id@gmail.com
                    </p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-0.5">
                      {t.contactLocation}
                    </p>
                    <p className="text-sm text-white font-medium">
                      Balikpapan, Kalimantan Timur, Indonesia
                    </p>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <Globe size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-0.5">
                      {t.contactWebsite}
                    </p>
                    <p className="text-sm text-white font-medium">
                      laptoppintar.id
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-zinc-900/40 backdrop-blur-md border border-slate-800/60 p-6 rounded-2xl">
              <h3 className="text-sm font-bold text-white font-[family-name:var(--font-display)] mb-4">
                {t.contactSocial}
              </h3>
              <div className="flex flex-wrap gap-4 mt-4">
                <a
                  href="https://instagram.com/laptoppintar.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-pink-500/30 hover:from-purple-600 hover:to-pink-600 hover:border-pink-400 text-sm text-pink-300 hover:text-white transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                  Instagram
                </a>
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 px-5 py-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 hover:bg-emerald-600 hover:border-emerald-400 text-sm text-emerald-300 hover:text-white transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* ── Right Column: Message Form ── */}
          <div className="bg-zinc-900/40 backdrop-blur-md border border-slate-800/60 p-6 sm:p-8 rounded-2xl">
            <h2 className="text-lg font-bold font-[family-name:var(--font-display)] text-white mb-6">
              {t.contactForm}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-[11px] text-slate-500 uppercase tracking-wider mb-1.5 block font-medium">
                    {t.contactName}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    disabled={isSending}
                    placeholder={t.contactNamePlaceholder}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-500 uppercase tracking-wider mb-1.5 block font-medium">
                    {t.contactEmail}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    disabled={isSending}
                    placeholder={t.contactEmailPlaceholder}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-500 uppercase tracking-wider mb-1.5 block font-medium">
                  {t.contactMessage}
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  disabled={isSending}
                  placeholder={t.contactMessagePlaceholder}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-sm font-semibold hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
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
