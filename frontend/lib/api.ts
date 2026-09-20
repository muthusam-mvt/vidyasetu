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

function getApiEndpoint(): string {
  if (process.env.NEXT_PUBLIC_API_BASE) {
    return `${process.env.NEXT_PUBLIC_API_BASE}/api/chat`;
  }
  if (typeof window !== "undefined" && window.location.hostname.includes("onrender.com")) {
    return "https://vidya-setu-backend.onrender.com/api/chat";
  }
  return "/api/chat";
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

  const endpoint = getApiEndpoint();

  const res = await fetch(endpoint, {
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
