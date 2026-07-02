"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { slideInLeft, slideInRight, fadeInUp } from "@/lib/motion";

const testimonials = [
  {
    name: "Andi Pratama",
    role: "Software Engineer",
    rating: 5,
    text: "LaptopPintar membantu saya menemukan laptop coding yang sempurna. Fitur perbandingannya sangat membantu!",
    avatar: "A",
    color: "bg-emerald-500",
  },
  {
    name: "Sari Dewi",
    role: "Mahasiswa UI",
    rating: 5,
    text: "Sebagai mahasiswa, saya butuh laptop ringan tapi powerful. Rekomendasi dari LaptopPintar tepat sekali.",
    avatar: "S",
    color: "bg-purple-500",
  },
  {
    name: "Budi Santoso",
    role: "Content Creator",
    rating: 4,
    text: "Fitur estimasi harga second sangat berguna. Saya berhasil mendapat laptop gaming dengan harga terbaik!",
    avatar: "B",
    color: "bg-orange-500",
  },
];

export default function TestimonialsSection() {
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
          Apa Kata Mereka?
        </h2>
        <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg">
          Testimoni dari pengguna LaptopPintar
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={i === 0 ? slideInLeft : i === 2 ? slideInRight : fadeInUp}
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm relative"
          >
            <Quote className="absolute top-6 right-6 w-8 h-8 text-gray-100 dark:text-gray-700" />
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star
                  key={j}
                  className={`w-4 h-4 ${
                    j < t.rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-200 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}
              >
                {t.avatar}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</p>
                <p className="text-gray-400 text-xs">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
