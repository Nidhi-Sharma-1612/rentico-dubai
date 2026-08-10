"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MessageCircle, Send, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/shared/SocialIcons";

const WHATSAPP_NUMBER = "971521460222";
const GREETING =
  "👋 Hi! Welcome to Rentico Dubai. Are you looking to book a stay or list your property?";

function buildWhatsAppUrl(message: string) {
  const text = message.trim();
  return text
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${WHATSAPP_NUMBER}`;
}

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const widgetRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointer = (e: MouseEvent) => {
      if (widgetRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    setMessage("");
  };

  const timeLabel = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div ref={widgetRef} className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-4 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex w-72 flex-col overflow-hidden rounded-2xl border border-navy-900/8 bg-white shadow-2xl shadow-navy-950/20 sm:w-80"
          >
            <div className="flex items-center justify-between gap-3 bg-[#25D366] px-4 py-3.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#25D366]">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
                <p className="flex items-center gap-1.5 truncate text-sm font-bold text-white">
                  Chat with Rentico
                  <MessageCircle className="h-4 w-4 shrink-0" />
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Minimize chat"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
              >
                <ChevronDown className="h-4.5 w-4.5" />
              </button>
            </div>

            <div
              className="flex h-72 flex-col gap-3 overflow-y-auto p-4 sm:h-80"
              style={{
                backgroundColor: "#e5ddd5",
                backgroundImage:
                  "radial-gradient(rgba(0,0,0,0.045) 1.4px, transparent 1.4px)",
                backgroundSize: "22px 22px",
              }}
            >
              <div className="w-fit max-w-[85%] rounded-lg rounded-tl-sm bg-white px-3.5 py-2.5 shadow-sm">
                <p className="text-sm leading-relaxed text-navy-900/80">{GREETING}</p>
                <p className="mt-1 text-right text-[10px] text-navy-900/35">{timeLabel}</p>
              </div>
            </div>

            <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-navy-900/8 bg-white p-3">
              <input
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                aria-label="Type a message to send on WhatsApp"
                className="w-full min-w-0 rounded-full bg-navy-50 px-4 py-2.5 text-sm text-navy-900 outline-none placeholder:text-navy-900/40"
              />
              <button
                type="submit"
                aria-label="Send message on WhatsApp"
                disabled={!message.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white transition-colors hover:bg-[#20bd5a] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
        aria-expanded={open}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-navy-950/20 transition-transform hover:scale-105"
      >
        {!open && <span className="absolute inset-0 rounded-full bg-[#25D366]/60 motion-safe:animate-ping" />}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "chat"}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.15 }}
            className="relative flex items-center justify-center"
          >
            {open ? <X className="h-6 w-6" /> : <WhatsAppIcon className="h-7 w-7" />}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
