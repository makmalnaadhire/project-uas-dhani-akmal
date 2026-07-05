"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/components/providers/UserProvider";
import { useTranslation } from "@/components/providers/LanguageProvider";
import {
  Eye,
  EyeOff,
  LogIn,
  ArrowLeft,
  Shield,
  Monitor,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useUser();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 800));

    if (!email || !password) {
      setError(t.loginError);
      setIsLoading(false);
      return;
    }

    login();
    router.push("/");
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    login();
    router.push("/");
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-[#0f172a] border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#2dd4bf]/50 focus:shadow-[0_0_0_3px_rgba(45,212,191,0.1)] transition-all";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-32 pb-16 relative overflow-hidden">
      {/* Background decorative orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#2dd4bf]/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#d946ef]/5 rounded-full blur-[150px] translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#f97316]/3 rounded-full blur-[120px]" />

      {/* Back to home link — clear of navbar */}
      <Link
        href="/"
        className="absolute top-24 left-6 flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors z-10"
      >
        <ArrowLeft size={16} />
        <span className="hidden sm:inline">{t.loginBack}</span>
      </Link>

      {/* ════════════════════════════════════════════════════
          Split-Screen Landscape Auth Container
         ════════════════════════════════════════════════════ */}
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-zinc-900/40 border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 backdrop-blur-md relative z-10">
        {/* ─── Left: Branding Showcase ──────────────────── */}
        <div className="relative hidden md:flex flex-col items-center justify-center p-10 overflow-hidden">
          {/* Background mesh grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]" />

          {/* Glow accents */}
          <div className="absolute top-10 left-10 w-40 h-40 bg-[#2dd4bf]/8 rounded-full blur-[80px] animate-pulse" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#d946ef]/6 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "1s" }} />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Logo */}
            <div className="mb-6">
              <Image
                src="/Logo.png"
                alt="LaptopPintar Logo"
                width={72}
                height={72}
                className="rounded-2xl object-cover shadow-[0_0_30px_rgba(45,212,191,0.15)]"
                priority
              />
            </div>

            {/* Brand name */}
            <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-white mb-2">
              Laptop<span className="text-gradient-mint">Pintar</span>
            </h2>
            <p className="text-sm text-slate-400 mb-8 max-w-[240px] leading-relaxed">
              {t.loginBrandDesc}
            </p>

            {/* Feature pills */}
            <div className="flex flex-col gap-3 w-full max-w-[220px]">
              {[
                { icon: <Monitor size={14} />, text: t.featureCatalog, color: "#2dd4bf" },
                { icon: <Sparkles size={14} />, text: t.featureRecommend, color: "#f97316" },
                { icon: <Shield size={14} />, text: t.featureEducation, color: "#d946ef" },
              ].map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-slate-400"
                >
                  <span style={{ color: f.color }}>{f.icon}</span>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Right: Sign-In Form ─────────────────────── */}
        <div className="flex flex-col justify-center p-8 sm:p-10">
          {/* Mobile-only branding header */}
          <div className="md:hidden text-center mb-6">
            <Image
              src="/Logo.png"
              alt="LaptopPintar"
              width={48}
              height={48}
              className="rounded-xl object-cover mx-auto mb-3"
              priority
            />
          </div>

          {/* Title */}
          <div className="mb-6">
            <h1 className="text-xl font-bold font-[family-name:var(--font-display)] text-white mb-1">
              {t.loginTitle}
            </h1>
            <p className="text-sm text-slate-400">{t.loginSubtitle}</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email / Username */}
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block font-medium">
                {t.loginEmailLabel}
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder={t.loginEmailPlaceholder}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block font-medium">
                {t.loginPasswordLabel}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${inputClass} pr-11`}
                  placeholder={t.loginPasswordPlaceholder}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-4 h-4 rounded border border-white/20 bg-white/5 peer-checked:bg-[#2dd4bf] peer-checked:border-[#2dd4bf] transition-all flex items-center justify-center">
                    {rememberMe && (
                      <svg
                        className="w-3 h-3 text-[#0f172a]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                  {t.loginRemember}
                </span>
              </label>
              <button
                type="button"
                className="text-xs text-[#2dd4bf] hover:text-[#5eead4] transition-colors"
              >
                {t.loginForgot}
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#2dd4bf] to-[#3b82f6] text-white text-sm font-semibold hover:shadow-[0_0_25px_rgba(45,212,191,0.3)] hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={18} />
                  {t.loginBtn}
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-slate-500">{t.loginDivider}</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Google OAuth Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {t.loginGoogle}
          </button>

          {/* Sign up link — routed to /register */}
          <p className="text-center text-xs text-slate-500 mt-5">
            {t.loginNoAccount}{" "}
            <Link
              href="/register"
              className="text-[#2dd4bf] hover:text-[#5eead4] font-medium transition-colors"
            >
              {t.loginSignUp}
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <p className="absolute bottom-6 left-0 right-0 text-center text-[10px] text-slate-600">
        &copy; 2026 LaptopPintar. {t.loginFooter}
      </p>
    </div>
  );
}
