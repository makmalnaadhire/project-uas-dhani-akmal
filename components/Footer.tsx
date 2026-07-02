"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Laptop } from "lucide-react";
import { fadeIn } from "@/lib/motion";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const links = [
    { label: t("footerAbout"), href: "/about" },
    { label: t("footerContact"), href: "/contact" },
    { label: t("footerPrivacy"), href: "#" },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400 border-t border-gray-800">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Laptop className="w-6 h-6 text-emerald-400" />
            <span className="font-bold text-lg text-white">LaptopPintar</span>
          </div>

          <div className="flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="text-sm">
            &copy; {new Date().getFullYear()} LaptopPintar. {t("footerRights")}
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
