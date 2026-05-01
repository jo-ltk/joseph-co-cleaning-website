"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatCircleDots, X, PaperPlaneRight, ArrowCounterClockwise } from "@phosphor-icons/react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTED_QUESTIONS = [
  "What services do you offer?",
  "Which areas do you cover?",
  "How do I get a quote?",
  "Do you do deep cleaning?",
];

const WELCOME_MESSAGE = "Hello! I'm the Joseph & Co Assistant. How can I help you today?";

export default function PremiumSupportAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 480);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const [hasWarmedUp, setHasWarmedUp] = useState(false);

  useEffect(() => {
    if (isOpen && !hasWarmedUp) {
      // Pre-warm the API route to avoid cold start latency on first message
      fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: "warmup" }], isWarmup: true }),
      }).catch(() => {}); // Ignore errors for warmup
      setHasWarmedUp(true);
    }

    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, hasWarmedUp]);

  const handleClear = () => {
    setMessages([{ role: "assistant", content: WELCOME_MESSAGE }]);
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        const isRateLimit = response.status === 429;
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: isRateLimit
              ? "We're very busy right now! Please reach out via WhatsApp or call Julia on +44 7787857305 — she'll get back to you straight away."
              : "Sorry, I'm having a moment! Please try again or contact us directly via WhatsApp.",
          },
        ]);
        return;
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having a moment! Please try again or contact us directly via WhatsApp.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-[1000] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop */}
            <div
              className="hidden max-[480px]:block fixed inset-0 bg-black/45 backdrop-blur-sm z-[999]"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: isMobile ? 40 : 20, scale: isMobile ? 1 : 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: isMobile ? 40 : 20, scale: isMobile ? 1 : 0.9 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              style={isMobile ? {
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                width: "100%",
                height: "75dvh",
                maxHeight: "75dvh",
                borderRadius: "24px 24px 0 0",
                zIndex: 1001,
                background: "#ffffff",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                boxShadow: "0 -8px 40px rgba(0,0,0,0.2)",
              } : {
                position: "fixed",
                bottom: "168px",
                right: "24px",
                width: "360px",
                maxWidth: "calc(100vw - 48px)",
                height: "500px",
                maxHeight: "calc(100vh - 180px)",
                borderRadius: "20px",
                zIndex: 1001,
                background: "#ffffff",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.05)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                transformOrigin: "bottom right",
              }}
            >
              {/* Header */}
              <div className="bg-[#120f0c] text-white px-5 py-4 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c4da3d] shadow-[0_0_0_2px_rgba(196,218,61,0.2)]" />
                  <span className="font-semibold text-[15px] tracking-tight">Joseph & Co Assistant</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleClear}
                    className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
                    aria-label="Restart chat"
                  >
                    <ArrowCounterClockwise size={18} weight="bold" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
                    aria-label="Close chat"
                  >
                    <X size={18} weight="bold" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4 bg-[#fdfdfc]">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`
                        max-w-[85%] px-4 py-3 rounded-2xl text-[14.5px] leading-relaxed whitespace-pre-wrap break-words
                        ${msg.role === "user"
                          ? "bg-[#120f0c] text-white rounded-br-[4px]"
                          : "bg-[#f5f5f3] text-[#1a1a1a] rounded-bl-[4px] border border-black/[0.03]"
                        }
                      `}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-1 px-4 py-3 bg-[#f5f5f3] rounded-2xl rounded-bl-[4px]">
                      {["-0.32s", "-0.16s", "0s"].map((delay, i) => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-[#8c8c8c] animate-bounce"
                          style={{ animationDelay: delay, animationDuration: "1.4s" }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions */}
              {messages.length === 1 && !isLoading && (
                <div className="px-5 pb-4 bg-[#fdfdfc]">
                  <p className="text-[11px] text-[#8c8c8c] font-medium uppercase tracking-wider mb-2">Quick questions</p>
                  <div className="flex flex-col gap-2">
                    {SUGGESTED_QUESTIONS.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(q)}
                        className="w-fit bg-white border border-[#e0e0e0] rounded-full px-3 py-1.5 text-[13px] text-[#120f0c] cursor-pointer text-left whitespace-nowrap transition-all hover:bg-[#f5f5f3] hover:border-[#c4da3d]"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="px-4 py-4 bg-white border-t border-[#f0f0f0] flex items-center gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 bg-[#f5f5f3] border border-transparent rounded-full px-4 py-3 text-base text-[#1a1a1a] outline-none transition-all placeholder:text-[#8c8c8c] focus:border-[#c4da3d] focus:bg-white font-[inherit]"
                />
                <button
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className="w-10 h-10 rounded-full bg-[#120f0c] text-white flex items-center justify-center flex-shrink-0 transition-all hover:enabled:bg-[#c4da3d] hover:enabled:text-[#120f0c] disabled:bg-[#e0e0e0] disabled:text-[#a0a0a0] disabled:cursor-not-allowed"
                >
                  <PaperPlaneRight weight="fill" size={18} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        aria-label="Open chat assistant"
        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#120f0c] to-[#2a241c] text-white flex items-center justify-center cursor-pointer shadow-[0_8px_24px_rgba(0,0,0,0.15)] border border-white/10"
      >
        {isOpen ? <X size={24} weight="bold" /> : <ChatCircleDots size={28} weight="fill" />}
      </motion.button>
    </div>
  );
}
