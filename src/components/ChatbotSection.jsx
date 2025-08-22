import React, { useEffect, useRef, useState } from "react";
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';

const ChatBubble = ({ role, text }) => (
  <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
    <div
      className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow ${
        role === "user" ? "bg-primary text-primary-contrast" : "bg-white border border-gray-200"
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

  const header = (
    <div className="flex items-center gap-2">
      <i className="pi pi-comment" />
      <h2 className="text-lg font-semibold">SEN Assistant</h2>
      <span className="text-xs text-gray-500">(prototype)</span>
    </div>
  );

  return (
    <section className="mb-6">
      <Panel header={header} toggleable>
        <div className="mb-3 flex flex-wrap gap-2">
          {quick.map((q, i) => (
            <Button
              key={i}
              label={q}
              onClick={() => setInput(q)}
              className="p-button-text p-button-sm"
            />
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

        <div className="p-inputgroup">
          <InputText
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? send() : null)}
            placeholder="Ask about suites, apps, or docs…"
          />
          <Button onClick={send} disabled={busy}>
            {busy ? <ProgressSpinner style={{width: '24px', height: '24px'}} strokeWidth="8" /> : <i className="pi pi-send" />}
          </Button>
        </div>
      </Panel>
    </section>
  );
}
