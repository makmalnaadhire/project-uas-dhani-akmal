"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "@/components/providers/LanguageProvider";
import { Send } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const quickReplies = [
  "Rekomendasi laptop coding budget 10 jutaan",
  "Cari laptop gaming ASUS yang active/terbaru",
  "Laptop tipis ringan untuk mahasiswa di bawah 7 juta",
  "Perbandingan MacBook Air M2 vs ThinkPad X1",
];

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (isChatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isChatOpen]);

  const sendPrompt = async (prompt: string) => {
    if (!prompt.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: prompt,
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
          content: "Maaf kakak, sistem AI lagi dalam pengembangan. Maaf ya!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendPrompt(input);
  };

  const handleQuickReply = async (prompt: string) => {
    await sendPrompt(prompt);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {isChatOpen ? (
        <div className="w-[380px] sm:w-[440px] max-h-[82vh] bg-zinc-950/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl flex flex-col mb-4 overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-indigo-600 to-violet-600 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2.5">
              <div>
                <span className="font-bold text-white text-sm tracking-wide block">{t.chatTitle}</span>
                <span className="text-[10px] text-white/60 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-white/70 hover:text-white transition-colors w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-zinc-500 mt-12 space-y-3 px-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center mx-auto text-2xl shadow-lg shadow-indigo-500/20">
                  &#x1F916;
                </div>
                <p className="text-base font-semibold text-zinc-300">{t.chatGreeting}</p>
                <p className="text-sm text-zinc-500 leading-relaxed">{t.chatDesc}</p>
              </div>
            )}

            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-indigo-600 text-white rounded-br-md shadow-md shadow-indigo-500/20"
                    : "bg-zinc-800 text-zinc-100 border border-white/5 rounded-bl-md"
                }`}>
                  <span className={`block font-semibold text-[11px] mb-1 ${
                    m.role === "user" ? "text-indigo-200" : "text-zinc-500"
                  }`}>
                    {m.role === "user" ? t.chatYou : "Ling AI"}
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
                <div className="bg-zinc-800 text-zinc-400 border border-white/5 p-3.5 rounded-2xl rounded-bl-md text-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick replies (only when no messages) */}
          {messages.length === 0 && (
            <div className="px-4 pb-3">
              <p className="text-[11px] text-zinc-500 mb-2 font-medium">Coba tanyakan:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickReplies.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickReply(prompt)}
                    disabled={isLoading}
                    className="text-left px-3 py-2 rounded-xl bg-zinc-800/80 border border-white/5 text-xs text-zinc-300 hover:bg-zinc-700 hover:text-white hover:border-white/10 transition-all duration-200 leading-snug disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input area */}
          <form onSubmit={handleSubmit} className="p-3 bg-zinc-900/80 border-t border-white/5 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-zinc-800 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
              placeholder={t.chatPlaceholder}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 text-white w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed shadow-md shadow-indigo-600/20"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsChatOpen(true)}
          className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white p-4 rounded-full shadow-2xl shadow-indigo-500/30 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 group relative"
        >
          <span className="text-xl">&#x1F4AC;</span>
          <span className="absolute right-14 bg-zinc-900 border border-white/10 text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
            {t.chatTitle}
          </span>
        </button>
      )}
    </div>
  );
}
