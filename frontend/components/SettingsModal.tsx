"use client";

import { useEffect, useState } from "react";
import OrnateFrame from "./OrnateFrame";

export type LLMProviderOption = "server" | "groq" | "openai";

export interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (provider: LLMProviderOption, apiKey: string) => void;
  currentProvider: LLMProviderOption;
  currentApiKey: string;
}

export default function SettingsModal({
  isOpen,
  onClose,
  onSave,
  currentProvider,
  currentApiKey,
}: SettingsModalProps) {
  const [provider, setProvider] = useState<LLMProviderOption>(currentProvider);
  const [apiKey, setApiKey] = useState(currentApiKey);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    setProvider(currentProvider);
    setApiKey(currentApiKey);
  }, [currentProvider, currentApiKey, isOpen]);

  if (!isOpen) return null;

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    onSave(provider, apiKey.trim());
    onClose();
  }

  function handleReset() {
    setProvider("server");
    setApiKey("");
    onSave("server", "");
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div className="w-full max-w-lg">
        <OrnateFrame className="w-full bg-parchment text-ink shadow-2xl">
          <div className="flex items-start justify-between border-b border-brass/40 pb-3 mb-4">
            <div>
              <span className="font-deva text-xs tracking-wider text-brass-dark font-medium">
                प्रणाली व्यवस्था
              </span>
              <h3
                id="settings-title"
                className="font-display text-xl text-maroon-deep font-semibold"
              >
                Model & Key Configuration
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-ink/60 hover:text-maroon transition-colors text-2xl leading-none p-1"
              aria-label="Close settings"
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-sm font-body">
            <div>
              <label className="block font-medium text-ink mb-2">
                Inference Provider Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "server", label: "Server Default", sub: "from .env" },
                  { id: "groq", label: "Groq (BYOK)", sub: "Llama 3.1" },
                  { id: "openai", label: "OpenAI (BYOK)", sub: "GPT-4o mini" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setProvider(item.id as LLMProviderOption)}
                    className={`px-3 py-2 text-left rounded-sm border transition-all ${
                      provider === item.id
                        ? "border-maroon bg-parchment-light shadow-sm ring-1 ring-maroon"
                        : "border-brass/50 bg-parchment-dark/30 hover:bg-parchment-dark/60 text-ink/80"
                    }`}
                  >
                    <div className="font-semibold text-xs text-maroon-deep">
                      {item.label}
                    </div>
                    <div className="text-[10px] text-ink/60">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {provider === "server" ? (
              <div className="rounded-sm border border-brass/40 bg-parchment-light/80 p-3 text-xs leading-relaxed text-ink/80">
                <span className="font-semibold text-maroon-deep">Server Key Mode: </span>
                Chat queries will use the API key and provider defined in your
                server&apos;s <code className="bg-parchment-dark/60 px-1 py-0.5 rounded">backend/.env</code> file. No personal key will be sent from your browser.
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="api-key-input"
                    className="block font-medium text-ink text-xs"
                  >
                    {provider === "groq" ? "Groq API Key" : "OpenAI API Key"}
                  </label>
                  <a
                    href={
                      provider === "groq"
                        ? "https://console.groq.com/keys"
                        : "https://platform.openai.com/api-keys"
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-sage hover:text-maroon underline transition-colors"
                  >
                    Get a {provider === "groq" ? "Groq" : "OpenAI"} key &rarr;
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="api-key-input"
                    type={showKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={
                      provider === "groq" ? "gsk_..." : "sk-..."
                    }
                    required={true}
                    className="w-full rounded-sm border border-brass/60 bg-parchment-light px-3 py-2 pr-16 text-xs text-ink placeholder:text-ink/40 focus:border-maroon focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-wider text-brass-dark hover:text-maroon px-1"
                  >
                    {showKey ? "Hide" : "Show"}
                  </button>
                </div>
                <p className="text-[11px] text-ink/60 italic">
                  Stored securely in your browser&apos;s local storage and only sent with your chat requests.
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-brass/40">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-maroon hover:text-maroon-light underline tracking-wide"
              >
                Reset to Server Default
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-sm border border-brass/60 bg-transparent px-3 py-1.5 text-xs text-ink hover:bg-parchment-dark/40 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-sm bg-maroon px-4 py-1.5 text-xs text-parchment-light hover:bg-maroon-light transition-colors font-medium tracking-wide shadow-sm"
                >
                  Save Configuration
                </button>
              </div>
            </div>
          </form>
        </OrnateFrame>
      </div>
    </div>
  );
}
