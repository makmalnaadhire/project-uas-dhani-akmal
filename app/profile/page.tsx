"use client";

import { useState, useCallback, useEffect } from "react";
import { useUser } from "@/components/providers/UserProvider";
import { useApp } from "@/components/providers/AppProvider";
import {
  User,
  Mail,
  AtSign,
  BookOpen,
  Save,
  X,
  Clock,
  GitCompareArrows,
  Shield,
  Camera,
  CheckCircle,
} from "lucide-react";

/* ── Toast ──────────────────────────────────────────────── */

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 z-[100] toast-anim">
      <div className="glass rounded-xl px-4 py-3 flex items-center gap-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-[#2dd4bf]/20">
        <div className="w-6 h-6 rounded-full bg-[#2dd4bf]/15 flex items-center justify-center flex-shrink-0">
          <CheckCircle size={12} className="text-[#2dd4bf]" />
        </div>
        <span className="text-xs font-medium text-white">{message}</span>
        <button onClick={onClose} className="ml-2 text-slate-500 hover:text-white transition-colors">
          <X size={12} />
        </button>
      </div>
    </div>
  );
}

/* ── Profile Page ───────────────────────────────────────── */

export default function ProfilePage() {
  const { user, isLoggedIn, updateUser } = useUser();
  const { compareList, wishlist } = useApp();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [major, setMajor] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (user && hydrated) {
      setName(user.name);
      setEmail(user.email);
      setUsername(user.username);
      setMajor(user.major);
    }
  }, [user, hydrated]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleSave = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const initials = name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
    updateUser({ name, email, username, major, avatarInitials: initials });
    showToast("Profil berhasil disimpan!");
  }, [name, email, username, major, updateUser, showToast]);

  const handleCancel = useCallback(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setUsername(user.username);
      setMajor(user.major);
    }
  }, [user]);

  if (!isLoggedIn || !user) {
    return (
      <div className="pt-24 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
            <User size={36} className="text-slate-600" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2 font-[family-name:var(--font-display)]">Belum Masuk</h2>
          <p className="text-slate-400 text-sm">Silakan login terlebih dahulu untuk mengakses profil Anda.</p>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#0f172a] border border-slate-800/60 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#2dd4bf]/50 focus:shadow-[0_0_15px_rgba(45,212,191,0.1)] transition-all duration-200";

  return (
    <div className="pt-24 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Header Section */}
      <div className="glass rounded-2xl p-8 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2dd4bf]/5 via-transparent to-[#d946ef]/5" />
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#2dd4bf] to-[#3b82f6] flex items-center justify-center text-white text-3xl font-bold font-[family-name:var(--font-display)] shadow-[0_0_30px_rgba(45,212,191,0.2)]">
              {user.avatarInitials}
            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-[#2dd4bf] hover:border-[#2dd4bf]/30 transition-all opacity-0 group-hover:opacity-100">
              <Camera size={14} />
            </button>
          </div>

          {/* Name + Status */}
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-display)] mb-1">
              {user.name}
            </h1>
            <p className="text-sm text-slate-400 mb-3">@{username}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1 rounded-full bg-[#2dd4bf]/10 border border-[#2dd4bf]/20 text-[#2dd4bf]">
                <Shield size={12} />
                Active User
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1 rounded-full bg-[#d946ef]/10 border border-[#d946ef]/20 text-[#d946ef]">
                <BookOpen size={12} />
                {major}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form Section – 2 cols */}
        <form onSubmit={handleSave} className="lg:col-span-2 space-y-6">
          <div className="glass rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-display)] mb-5">
              Pengaturan Profil
            </h2>

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block font-medium">Nama Lengkap</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Username */}
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block font-medium">Username</label>
                <div className="relative">
                  <AtSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block font-medium">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Major */}
              <div>
                <label className="text-xs text-slate-500 mb-1.5 block font-medium">Jurusan / Pekerjaan</label>
                <div className="relative">
                  <BookOpen size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
                  <input
                    type="text"
                    value={major}
                    onChange={e => setMajor(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#2dd4bf] to-[#4ade80] text-[#0f172a] font-semibold text-sm hover:shadow-[0_0_25px_rgba(45,212,191,0.4)] transition-all duration-300 active:scale-95"
            >
              <Save size={16} />
              Simpan Perubahan
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 font-medium text-sm hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              <X size={16} />
              Batal
            </button>
          </div>
        </form>

        {/* Side Cards */}
        <div className="space-y-6">
          {/* Last Activity */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-[#f97316]" />
              <h3 className="text-sm font-semibold text-white font-[family-name:var(--font-display)]">Aktivitas Terakhir</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#2dd4bf] mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-300">Melihat katalog laptop gaming</p>
                  <p className="text-[10px] text-slate-600 mt-0.5">2 jam yang lalu</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#d946ef] mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-300">Menambahkan 2 laptop ke wishlist</p>
                  <p className="text-[10px] text-slate-600 mt-0.5">Kemarin</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#f97316] mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-300">Membandingkan Lenovo vs ASUS</p>
                  <p className="text-[10px] text-slate-600 mt-0.5">3 hari yang lalu</p>
                </div>
              </div>
            </div>
          </div>

          {/* Compare List Summary */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <GitCompareArrows size={16} className="text-[#2dd4bf]" />
              <h3 className="text-sm font-semibold text-white font-[family-name:var(--font-display)]">Daftar Perbandingan</h3>
            </div>
            {compareList.length > 0 ? (
              <div className="space-y-2">
                {compareList.map(l => (
                  <div key={l.id} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf] flex-shrink-0" />
                    <span className="text-xs text-slate-300 truncate">{l.nama}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-600">Belum ada laptop yang dibandingkan.</p>
            )}
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] text-slate-500">Wishlist tersimpan</span>
              <span className="text-xs font-semibold text-[#ec4899]">{wishlist.length} laptop</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
