export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
};

export interface SendChatMessageOptions {
  messages: ChatMessage[];
  provider?: "openai" | "groq" | null;
  apiKey?: string | null;
}

export async function sendChatMessage({
  messages,
  provider,
  apiKey,
}: SendChatMessageOptions): Promise<{ reply: string; sources: string[] }> {
  // Strip out UI-only fields before sending over wire
  const wireMessages = messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const payload: Record<string, unknown> = { messages: wireMessages };
  if (provider && apiKey) {
    payload.provider = provider;
    payload.api_key = apiKey;
  }

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const message = (errorData && errorData.detail) || `Chat request failed: ${res.status}`;
    throw new Error(message);
  }

  return res.json();
}
