"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "@/lib/LanguageContext";

function WaveSVG({ dark }: { dark: boolean }) {
  const fill = dark ? "#030712" : "white";
  return (
    <svg
      className="absolute bottom-0 left-0 w-full"
      viewBox="0 0 1440 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0 60C240 100 480 20 720 60C960 100 1200 20 1440 60V120H0V60Z"
        fill={fill}
        fillOpacity={0.5}
        initial={{ d: "M0 60C240 100 480 20 720 60C960 100 1200 20 1440 60V120H0V60Z" }}
        animate={{
          d: [
            "M0 60C240 100 480 20 720 60C960 100 1200 20 1440 60V120H0V60Z",
            "M0 40C240 80 480 40 720 80C960 40 1200 80 1440 40V120H0V40Z",
            "M0 60C240 100 480 20 720 60C960 100 1200 20 1440 60V120H0V60Z",
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M0 80C360 40 720 100 1080 60C1260 40 1380 80 1440 80V120H0V80Z"
        fill={fill}
        fillOpacity={0.8}
        initial={{ d: "M0 80C360 40 720 100 1080 60C1260 40 1380 80 1440 80V120H0V80Z" }}
        animate={{
          d: [
            "M0 80C360 40 720 100 1080 60C1260 40 1380 80 1440 80V120H0V80Z",
            "M0 70C360 90 720 50 1080 90C1260 70 1380 50 1440 70V120H0V70Z",
            "M0 80C360 40 720 100 1080 60C1260 40 1380 80 1440 80V120H0V80Z",
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.path
        d="M0 96C180 80 360 110 540 90C720 70 900 100 1080 85C1260 70 1380 96 1440 96V120H0V96Z"
        fill={fill}
        initial={{ d: "M0 96C180 80 360 110 540 90C720 70 900 100 1080 85C1260 70 1380 96 1440 96V120H0V96Z" }}
        animate={{
          d: [
            "M0 96C180 80 360 110 540 90C720 70 900 100 1080 85C1260 70 1380 96 1440 96V120H0V96Z",
            "M0 90C180 105 360 75 540 100C720 85 900 70 1080 100C1260 85 1380 90 1440 90V120H0V90Z",
            "M0 96C180 80 360 110 540 90C720 70 900 100 1080 85C1260 70 1380 96 1440 96V120H0V96Z",
          ],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </svg>
  );
}

export default function Hero() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === "dark";

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500 min-h-[85vh] flex items-center">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            {t("heroBadge")}
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
            {t("heroTitle")}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            {t("heroSubtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/catalog"
            className="group inline-flex items-center gap-2 bg-white text-emerald-600 font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 hover:scale-105"
          >
            {t("heroCta")}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/recommendations"
            className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/60"
          >
            {t("heroSecondary")}
          </Link>
        </motion.div>
      </div>

      <WaveSVG dark={isDark} />
    </section>
  );
}
