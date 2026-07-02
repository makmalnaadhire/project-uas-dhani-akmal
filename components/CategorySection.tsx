"use client";

import { motion } from "framer-motion";
import { Gamepad2, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { staggerContainer, fadeInUp, wiggle } from "@/lib/motion";

const categories = [
  {
    title: "Gaming",
    description: "Laptop performa tinggi untuk gaming AAA dan streaming",
    icon: Gamepad2,
    color: "from-purple-500 to-indigo-600",
    href: "/catalog?needs=gaming",
  },
  {
    title: "Office",
    description: "Laptop produktif untuk kerja kantoran dan bisnis",
    icon: Briefcase,
    color: "from-emerald-500 to-teal-600",
    href: "/catalog?needs=office",
  },
  {
    title: "Student",
    description: "Laptop terjangkau untuk kuliah dan tugas sehari-hari",
    icon: GraduationCap,
    color: "from-orange-500 to-amber-600",
    href: "/catalog?needs=student",
  },
];

export default function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="text-center mb-14"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
          Pilih Berdasarkan Kebutuhan
        </h2>
        <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg">
          Kategori laptop untuk setiap aktivitasmu
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {categories.map((category) => (
          <motion.div key={category.title} variants={fadeInUp} {...wiggle} className="group">
            <Link
              href={category.href}
              className="block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className={`h-48 bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                <category.icon className="w-16 h-16 text-white/80" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                  {category.description}
                </p>
                <div className="flex items-center gap-2 text-emerald-500 font-semibold group-hover:gap-3 transition-all duration-200">
                  Lihat Semua
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
