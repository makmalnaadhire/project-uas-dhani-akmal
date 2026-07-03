"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import ReactMarkdown from "react-markdown";
import Navbar from "./Navbar";
import HeroSection from "./sections/HeroSection";
import CatalogSection from "./sections/CatalogSection";
import RecommendSection from "./sections/RecommendSection";
import EducationSection from "./sections/EducationSection";
import OtherSection from "./sections/OtherSection";
import LaptopModal from "./LaptopModal";
import CompareDrawer from "./CompareDrawer";
import Footer from "./Footer";
import laptopsData from "@/data/laptops.json";

export type Tab = "home" | "catalog" | "recommend" | "education" | "other";

export interface Laptop {
  id: number;
  name: string;
  brand: string;
  cpu: string;
  ram: string;
  storage: string;
  gpu: string;
  price: number;
  condition: string;
  category: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function DharianApp() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [selectedLaptop, setSelectedLaptop] = useState<Laptop | null>(null);
  const [compareList, setCompareList] = useState<Laptop[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [transitioning, setTransitioning] = useState(false);
  const [transitionDir, setTransitionDir] = useState<"left" | "right">("right");

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); 
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isChatOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server returned ${response.status}`);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.content,
        },
      ]);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error("Error AI Chat:", msg);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Maaf kakak, sistem AI lagi dalam pengembangan. Maaf ya! 😊😘",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const laptops = useMemo(() => laptopsData as Laptop[], []);

  useEffect(() => {
    const stored = localStorage.getItem("dharian-wishlist");
    if (stored) {
      try { setWishlist(JSON.parse(stored)); } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dharian-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const tabOrder: Tab[] = ["home", "catalog", "recommend", "education", "other"];

  const switchTab = useCallback((tab: Tab) => {
    if (tab === activeTab) return;
    const fromIdx = tabOrder.indexOf(activeTab);
    const toIdx = tabOrder.indexOf(tab);
    setTransitionDir(toIdx > fromIdx ? "right" : "left");
    setTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setTransitioning(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 250);
  }, [activeTab]);

  const toggleWishlist = useCallback((id: number) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }, []);

  const toggleCompare = useCallback((laptop: Laptop) => {
    setCompareList(prev => {
      const exists = prev.find(l => l.id === laptop.id);
      if (exists) return prev.filter(l => l.id !== laptop.id);
      if (prev.length >= 3) return prev;
      return [...prev, laptop];
    });
  }, []);

  const renderSection = () => {
    const props = { laptops, wishlist, toggleWishlist, compareList, toggleCompare, setSelectedLaptop, switchTab };
    switch (activeTab) {
      case "home": return <HeroSection {...props} />;
      case "catalog": return <CatalogSection {...props} />;
      case "recommend": return <RecommendSection {...props} />;
      case "education": return <EducationSection {...props} />;
      case "other": return <OtherSection {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] relative">
      <Navbar
        activeTab={activeTab}
        switchTab={switchTab}
        wishlistCount={wishlist.length}
        compareCount={compareList.length}
      />

      <main
        className={`transition-all duration-300 ease-out ${
          transitioning
            ? "opacity-0 translate-x-8"
            : "opacity-100 translate-x-0"
        }`}
      >
        {renderSection()}
      </main>

      <Footer switchTab={switchTab} />

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
        
        {isChatOpen ? (
          <div className="w-[340px] sm:w-[380px] h-[480px] bg-zinc-950/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl flex flex-col mb-4 overflow-hidden transition-all duration-300">
            
            <div className="p-4 bg-gradient-to-r from-orange-500 to-amber-500 flex justify-between items-center shadow-md">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="font-bold text-white text-sm tracking-wide">Yanyan AI Assistant</span>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-white/80 hover:text-white transition-colors text-xs font-semibold px-2 py-1 bg-black/20 rounded-md"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-zinc-500 mt-16 space-y-2 px-4">
                  <p className="text-2xl">🤖</p>
                  <p className="text-sm font-medium text-zinc-400">Halo! Ada yang bisa dibantu?</p>
                  <p className="text-xs text-zinc-500">Tanyakan rekomendasi laptop, spesifikasi hardware, atau kecocokan budget kuliah/gaming kamu!</p>
                </div>
              )}

              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                 <div
                  className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed ${
                   m.role === "user"
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-br-none shadow-md"
                    : "bg-zinc-900 text-zinc-100 border border-white/5 rounded-bl-none"
                  }`}
                 >
                  <span className="block font-bold text-[10px] opacity-60 mb-1">
                    {m.role === "user" ? "Kamu" : "Yanyan AI"}
                  </span>

                  {m.role === "assistant" ? (
                    <div className="prose prose-invert prose-sm max-w-none break-words">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap break-words">{m.content}</p>
                  )}

                 </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900 text-zinc-400 border border-white/5 p-3 rounded-xl rounded-bl-none text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-3 bg-zinc-950/50 border-t border-white/10 flex gap-2">
              <input
                value={input}
                onChange={handleInputChange}
                className="flex-1 p-2.5 bg-zinc-900 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-all"
                placeholder="Tanya rekomendasi laptop..."
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-4 rounded-xl text-xs font-semibold transition-all active:scale-95 disabled:opacity-50"
              >
                Kirim
              </button>
            </form>
          </div>
        ) : (
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 group relative"
          >
            <span className="text-xl">💬</span>
            <span className="absolute right-14 bg-zinc-900 border border-white/10 text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
              Tanya AI
            </span>
          </button>
        )}
      </div>

      <LaptopModal
        laptop={selectedLaptop}
        onClose={() => setSelectedLaptop(null)}
        onCompare={toggleCompare}
        compareList={compareList}
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
      />

      <CompareDrawer
        items={compareList}
        onRemove={toggleCompare}
        onClose={() => setCompareList([])}
      />
    </div>
  );
}