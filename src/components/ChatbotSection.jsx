import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, Loader2 } from "lucide-react";

const ChatBubble = ({ role, text }) => (
  <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
    <div
      className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow ${
        role === "user" ? "bg-blue-600 text-white" : "bg-white border border-gray-200"
      }`}
    >
      {text}
    </div>
  </div>
);

const mockReply = async (prompt) => {
  const p = prompt.toLowerCase();
  await new Promise((r) => setTimeout(r, 500));
  if (p.includes("meridian")) return "Meridian: Lakehouse, Medallion, Vault & Modeler.";
  if (p.includes("kinetic")) return "Kinetic: Flow, Stream, Bridge & Purity for data movement.";
  if (p.includes("mystic")) return "Mystic: Dashboards, NL SQL, Forecasting & LoopSync.";
  if (p.includes("nexus")) return "Nexus: UI generation, OLTP, business logic, approvals.";
  return `You said: “${prompt}”. Ask about Meridian, Kinetic, Mystic, or Nexus.`;
};

export default function ChatbotSection() {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I’m the SEN Assistant. Ask me about suites, apps, or quick links." },
  ]);

  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const send = async () => {
    const q = input.trim();
    if (!q || busy) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setBusy(true);
    const a = await mockReply(q);
    setMessages((m) => [...m, { role: "assistant", text: a }]);
    setBusy(false);
  };

  const quick = ["What is Meridian?", "Show Kinetic apps", "Explain Mystic", "Help"];

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <h2 className="text-lg font-semibold">SEN Assistant</h2>
          <span className="text-xs text-gray-500">(prototype)</span>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-sm rounded-xl border border-gray-200 bg-white px-3 py-1.5 hover:shadow"
        >
          {open ? "Hide" : "Show"}
        </button>
      </div>

      {open && (
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {quick.map((q, i) => (
              <button
                key={i}
                onClick={() => setInput(q)}
                className="rounded-full border border-gray-200 px-3 py-1 text-xs hover:bg-gray-50"
              >
                {q}
              </button>
            ))}
          </div>

          <div
            ref={scrollRef}
            className="mb-3 h-48 overflow-y-auto rounded-xl border border-gray-100 bg-gray-50 p-3 space-y-2"
          >
            {messages.map((m, i) => (
              <ChatBubble key={i} role={m.role} text={m.text} />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => (e.key === "Enter" ? send() : null)}
                placeholder="Ask about suites, apps, or docs…"
                className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-3 pr-10 text-sm outline-none ring-blue-200 focus:ring"
              />
              <button
                onClick={send}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white"
                aria-label="Send"
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
