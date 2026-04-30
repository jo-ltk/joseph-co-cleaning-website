"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatCircleDots, X, PaperPlaneRight, ArrowCounterClockwise } from "@phosphor-icons/react";
import styles from "./SmartCubeChatbot.module.css";

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

export default function PremiumSupportAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm the Joseph & Co Assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleClear = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hello! I'm the Joseph & Co Assistant. How can I help you today?",
      },
    ]);
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
              ? "We're very busy right now! Please reach out directly via the WhatsApp button or call Julia on +44 7787857305 — she'll get back to you straight away."
              : "Sorry, I'm having a moment! Please try again or contact us directly via WhatsApp.",
          },
        ]);
        return;
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error("Chatbot network error:", error);
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
    <div className={styles.chatbotContainer}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={styles.chatWindow}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerTitle}>
                <div className={styles.onlineIndicator} />
                <div className={styles.headerText}>
                  <span className={styles.assistantName}>Joseph & Co Assistant</span>
                </div>
              </div>
              <div className={styles.headerActions}>
                <button onClick={handleClear} className={styles.actionButton} aria-label="Restart chat" title="Restart chat">
                  <ArrowCounterClockwise size={18} weight="bold" />
                </button>
                <button onClick={() => setIsOpen(false)} className={styles.actionButton} aria-label="Close chat" title="Close chat">
                  <X size={18} weight="bold" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className={styles.messagesContainer}>
              {messages.map((msg, index) => (
                <div key={index} className={`${styles.messageWrapper} ${styles[msg.role]}`}>
                  <div className={`${styles.message} ${styles[msg.role]}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className={`${styles.messageWrapper} ${styles.assistant}`}>
                  <div className={styles.typingIndicator}>
                    <div className={styles.dot} />
                    <div className={styles.dot} />
                    <div className={styles.dot} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && !isLoading && (
              <div className={styles.suggestionsWrapper}>
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    className={styles.suggestionChip}
                    onClick={() => handleSend(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className={styles.inputArea}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                placeholder="Type your message..."
                className={styles.inputField}
                disabled={isLoading}
              />
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim() || isLoading}
                className={styles.sendButton}
                aria-label="Send message"
              >
                <PaperPlaneRight weight="fill" size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className={styles.launcher}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        aria-label="Open chat assistant"
      >
        {isOpen ? <X size={24} weight="bold" /> : <ChatCircleDots size={28} weight="fill" />}
      </motion.button>
    </div>
  );
}
