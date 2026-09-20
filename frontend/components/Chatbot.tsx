"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SettingsModal, { LLMProviderOption } from "./SettingsModal";
import { sendChatMessage, ChatMessage } from "@/lib/api";

const QUICK_ACTIONS = [
  "What is Nyaya logic?",
  "How are Indian manuscripts digitized?",
  "What is Bhashini?",
  "Explain Paninian grammar",
];

const STORAGE_PROVIDER_KEY = "vidya_setu_provider";
const STORAGE_API_KEY = "vidya_setu_api_key";

export interface ChatbotProps {
  onOpenSettings?: () => void;
}

export default function Chatbot({ onOpenSettings }: ChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Namaste, seeker of knowledge. I am the Vidya Setu Scribe. Consult me on Indian Knowledge Systems, manuscript preservation, Paninian linguistics, or India's digital public infrastructure.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [provider, setProvider] = useState<LLMProviderOption>("server");
  const [apiKey, setApiKey] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const savedProvider = (localStorage.getItem(STORAGE_PROVIDER_KEY) as LLMProviderOption) || "server";
      const savedKey = localStorage.getItem(STORAGE_API_KEY) || "";
      setProvider(savedProvider);
      setApiKey(savedKey);
    } catch {
      // ignore restricted localStorage
    }
  }, []);

  function handleSaveSettings(newProvider: LLMProviderOption, newKey: string) {
    setProvider(newProvider);
    setApiKey(newKey);
    try {
      localStorage.setItem(STORAGE_PROVIDER_KEY, newProvider);
      localStorage.setItem(STORAGE_API_KEY, newKey);
    } catch {
      // ignore
    }
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const next: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const activeProvider = provider === "server" ? null : provider;
      const activeKey = provider === "server" ? null : apiKey;

      const { reply, sources } = await sendChatMessage({
        messages: next,
        provider: activeProvider,
        apiKey: activeKey,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: reply,
          sources: sources && sources.length > 0 ? sources : undefined,
        },
      ]);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "I could not retrieve the archives at this moment. Please verify backend status and API key.";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ ${message}`,
        },
      ]);
    } finally {
      setLoading(false);
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      });
    }
  }

  function handleClear() {
    setMessages([
      {
        role: "assistant",
        content:
          "The slate has been renewed. Ask a new inquiry regarding Indian Knowledge Systems or language heritage.",
      },
    ]);
  }

  const providerLabel =
    provider === "groq"
      ? "Groq (BYOK)"
      : provider === "openai"
      ? "OpenAI (BYOK)"
      : "Server Default";

  return (
    <div className="w-full">
      {/* --- Two-Column Layout (Matches Reference: Scholar on Left, Content on Right) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* --- Left Column: Framed Sage / Scholar Oil Painting --- */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-[320px] lg:max-w-none p-2 bg-[#2d2015] border-4 border-[#6e5436] outline outline-2 outline-[#1c130b] shadow-[0_12px_30px_rgba(0,0,0,0.85),inset_0_0_15px_rgba(0,0,0,0.7)] rounded-[2px]">
            <div className="relative aspect-[3/4] w-full overflow-hidden border border-[#96774c]/60 shadow-inner">
              <Image
                src="/textures/scholar.jpg"
                alt="Ancient Indian Scholar reading illuminated manuscript by lamp light"
                fill
                priority
                className="object-cover object-center filter contrast-[1.05] brightness-[0.98]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b120a]/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Brass Plate Caption */}
            <div className="mt-2 py-1 px-3 bg-gradient-to-r from-[#594228] via-[#a3804d] to-[#594228] border border-[#2b1f13] text-center shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
              <span className="font-display text-[10px] sm:text-xs tracking-widest text-[#fff8ea] uppercase font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                विद्या गुरुः · The Vidya Scribe
              </span>
            </div>
          </div>
        </div>

        {/* --- Right Column: Header, Conversation Parchment & Vintage Controls --- */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b-2 border-brass-dark/40 pb-2 mb-3">
            <div>
              <h2 className="font-display text-2xl md:text-3xl text-maroon-deep font-bold tracking-wider drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
                BHĀRATĪYA VIDYĀ
              </h2>
              <p className="font-body italic text-xs md:text-sm text-ink/75">
                Archival Inquiries into Indian Knowledge Systems &amp; Heritage
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span
                className="hidden sm:inline-block font-mono text-[10px] px-2 py-0.5 border border-brass-dark/50 bg-[#d9c79f]/70 text-ink-deep font-semibold"
                title={`Active provider: ${providerLabel}`}
              >
                {providerLabel}
              </span>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(true)}
                className="vintage-btn text-[10px] py-1 px-2.5"
                title="Configure LLM API Keys"
              >
                ⚙ Keys
              </button>
            </div>
          </div>

          {/* Conversation History Area (With Vintage Burgundy Scrollbar) */}
          <div
            ref={scrollRef}
            className="vintage-scrollbar h-64 sm:h-72 md:h-80 overflow-y-auto pr-2 space-y-3 mb-3 border-y border-brass-dark/30 py-3 bg-[#e8d7b3]/40 rounded-sm shadow-inner"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[88%] p-3 text-xs sm:text-sm leading-relaxed rounded-sm ${
                  m.role === "user"
                    ? "ml-auto bg-gradient-to-r from-[#5c1a1a] to-[#401212] text-parchment-light border border-brass/50 shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
                    : "mr-auto bg-[#f0e3c5]/90 text-ink border border-brass-dark/40 shadow-[0_2px_5px_rgba(0,0,0,0.15)]"
                }`}
              >
                <div className="font-body whitespace-pre-wrap">{m.content}</div>
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-brass-dark/30 flex flex-wrap items-center gap-1.5 text-[10px]">
                    <span className="font-display text-[9px] uppercase tracking-wider text-maroon-deep font-bold">
                      Grounded Sources:
                    </span>
                    {m.sources.map((src, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded bg-parchment-light border border-brass-dark/40 text-sage-dark font-mono font-medium"
                      >
                        {src}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="mr-auto max-w-[88%] p-3 text-xs sm:text-sm bg-[#f0e3c5]/90 text-ink/75 italic border border-brass-dark/40 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-maroon animate-pulse" />
                The scribe is consulting the Sanskrit archives…
              </div>
            )}
          </div>

          {/* Quick Action Scroll Bubbles */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {QUICK_ACTIONS.map((label) => (
              <button
                key={label}
                type="button"
                disabled={loading}
                onClick={() => sendMessage(label)}
                className="text-[11px] font-body px-2.5 py-1 bg-[#dfcca5]/80 hover:bg-[#ebd9b4] text-ink-deep border border-[#9b7e53] rounded-sm transition-all shadow-[0_1px_2px_rgba(0,0,0,0.2)] disabled:opacity-50 text-left"
              >
                ✦ {label}
              </button>
            ))}
          </div>

          {/* Bottom Row: Torn Manuscript Note + Vintage Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end mb-3 pt-2 border-t border-brass-dark/30">
            {/* Torn Manuscript Note Fragment */}
            <div className="sm:col-span-6 relative">
              <div className="relative h-20 w-full overflow-hidden rounded-sm drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] transform -rotate-1 hover:rotate-0 transition-transform">
                <Image
                  src="/textures/torn_note.jpg"
                  alt="Torn manuscript fragment with sacred Sanskrit verse"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>

            {/* Vintage Action Buttons (Matches PREVIOUS / NEXT in reference) */}
            <div className="sm:col-span-6 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={handleClear}
                disabled={loading}
                className="vintage-btn vintage-btn-arrow-left"
                title="Reset conversation"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => {
                  if (input.trim()) sendMessage(input);
                  else sendMessage("Explain Paninian grammar");
                }}
                disabled={loading}
                className="vintage-btn vintage-btn-arrow-right"
                title="Advance inquiry"
              >
                Next
              </button>
            </div>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the scribe about Indian languages, manuscripts, or public services…"
              className="flex-1 rounded-sm border-2 border-brass-dark/70 bg-[#f9f3e4] px-3 py-2 text-xs sm:text-sm text-ink-deep placeholder:text-ink/50 focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon shadow-inner font-body"
            />
            <button
              type="submit"
              disabled={loading}
              className="vintage-btn px-5 py-2"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveSettings}
        currentProvider={provider}
        currentApiKey={apiKey}
      />
    </div>
  );
}
