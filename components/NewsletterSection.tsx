"use client";

import { motion } from "framer-motion";
import { fadeInUp, hoverScale } from "@/lib/motion";
import { useState } from "react";
import { Send } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-500 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Dapatkan Update Terbaru
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Berlangganan newsletter kami untuk mendapatkan info laptop terbaru, tips, dan promo eksklusif.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-white"
            >
              Terima kasih telah berlangganan!
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email Anda"
                required
                className="flex-1 px-5 py-3.5 rounded-xl bg-white/95 text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <motion.button
                type="submit"
                {...hoverScale}
                className="bg-white text-emerald-600 font-bold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                <Send className="w-4 h-4" />
                Subscribe
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
