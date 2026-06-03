"use client";
import { useMemo, useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "assistant"; content: string };
type Conversation = { id: string; title: string; messages: Msg[] };

export default function Page() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find(c => c.id === activeId) ?? null;
  const messages = activeConv?.messages ?? [];
  const hour = new Date().getHours();
  const greeting = useMemo(() => hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite", [hour]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function unlock() {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password, checkOnly: true }),
    });
    if (res.ok) setUnlocked(true);
    else alert("Senha incorreta.");
  }

  async function generateTitle(userMsg: string): Promise<string> {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password, titleOnly: true, userMsg }),
      });
      const data = await res.json();
      return data.title || userMsg.slice(0, 30);
    } catch {
      return userMsg.slice(0, 30);
    }
  }

  async function send(text?: string) {
    const prompt = (text || input).trim();
    if (!prompt || loading) return;
    setInput("");

    let convId = activeId;
    let isNew = false;

    if (!convId) {
      convId = crypto.randomUUID();
      isNew = true;
      setConversations(prev => [{ id: convId!, title: "Nova conversa", messages: [] }, ...prev]);
      setActiveId(convId);
    }

    const prevMsgs = conversations.find(c => c.id === convId)?.messages ?? [];
    const updatedMessages: Msg[] = [...prevMsgs, { role: "user", content: prompt }];

    setConversations(prev => prev.map(c => c.id === convId ? { ...c, messages: updatedMessages } : c));
    setLoading(true);

    try {
      const [aiRes, title] = await Promise.all([
        fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ password, messages: updatedMessages }),
        }),
        isNew ? generateTitle(prompt) : Promise.resolve(null),
      ]);

      const data = await aiRes.json();
      const answer = data.answer || data.error || "Sem resposta.";

      setConversations(prev =>
        prev.map(c => c.id === convId
          ? { ...c, title: title ?? c.title, messages: [...updatedMessages, { role: "assistant", content: answer }] }
          : c
        )
      );
    } catch {
      setConversations(prev =>
        prev.map(c => c.id === convId
          ? { ...c, messages: [...updatedMessages, { role: "assistant", content: "Erro ao conectar com a IA." }] }
          : c
        )
      );
    } finally {
      setLoading(false);
    }
  }

  if (!unlocked) {
    return (
      <main className="login-screen">
        <div className="siri-orb" />
        <div className="login-card">
          <h1>Zyricon AI</h1>
          <p>Digite sua senha para acessar o painel.</p>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && unlock()}
          />
          <button onClick={unlock}>Entrar</button>
        </div>
      </main>
    );
  }

  return (
    <main className="shell">
      <aside className={`sidebar${sidebarOpen ? " expanded" : ""}`}>
        <div className="sidebar-header">
          <div className="logo-mark">✺</div>
          <span className="brand">Zyricon</span>
          <button className="toggle-btn" onClick={() => setSidebarOpen(o => !o)}>
            {sidebarOpen ? "←" : "→"}
          </button>
        </div>

        <button className="new-chat-btn" onClick={() => setActiveId(null)}>
          <span className="btn-icon">✦</span>
          <span className="btn-label">New Chat</span>
        </button>

        <div className="sidebar-section-label">Features</div>
        <nav className="sidebar-nav">
          <div className="nav-item active">
            <span className="ni-icon">💬</span>
            <span className="ni-label">Chat</span>
          </div>
          <div className="nav-item">
            <span className="ni-icon">📁</span>
            <span className="ni-label">Archived</span>
          </div>
          <div className="nav-item">
            <span className="ni-icon">📚</span>
            <span className="ni-label">Library</span>
          </div>
        </nav>

        <div className="sidebar-section-label">Workspaces</div>
        <nav className="sidebar-nav">
          {conversations.map(conv => (
            <div
              key={conv.id}
              className={`nav-item conv-item${conv.id === activeId ? " active" : ""}`}
              onClick={() => setActiveId(conv.id)}
              title={conv.title}
            >
              <span className="ni-icon">🗂</span>
              <span className="ni-label">{conv.title.length > 20 ? conv.title.slice(0, 20) + "…" : conv.title}</span>
            </div>
          ))}
          {conversations.length === 0 && (
            <div className="nav-item muted">
              <span className="ni-icon">·</span>
              <span className="ni-label">Nenhuma conversa</span>
            </div>
          )}
        </nav>

        <div className="sidebar-bottom">
          <div className="upgrade-row">
            <span className="upgrade-icon">♛</span>
            <div className="upgrade-text">
              <strong>Upgrade to Pro</strong>
              <span>Acesse modelos avançados</span>
            </div>
          </div>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="model-pill">ChatGPT v4.0 ▾</div>
          <div style={{ flex: 1 }} />
          <button className="topbar-btn">⚙ Configuration</button>
          <button className="topbar-btn">↑ Export</button>
        </header>

        {messages.length === 0 ? (
          <div className="hero-area">
            <div className="siri-orb" />
            <h1 className="hero-title">Ready to Create Something New?</h1>

            <div className="quick-chips">
              <button className="chip" onClick={() => send("Criar uma imagem conceitual")}>🖼 Create Image</button>
              <button className="chip" onClick={() => send("Brainstorm de ideias para meu projeto")}>💡 Brainstorm</button>
              <button className="chip" onClick={() => send("Me ajude a criar um plano de ação")}>📋 Make a plan</button>
            </div>

            <div className="composer-wrap">
              <div className="composer">
                <span className="composer-star">✦</span>
                <textarea
                  className="composer-input"
                  placeholder="Ask Anything..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                />
                <div className="composer-bar">
                  <button className="bar-btn">📎 Attach</button>
                  <span className="divider">|</span>
                  <button className="bar-btn">⚙ Settings</button>
                  <span className="divider">|</span>
                  <button className="bar-btn">⊞ Options</button>
                  <div style={{ flex: 1 }} />
                  <button className="mic-btn">🎙</button>
                  <button className="send-btn" onClick={() => send()} disabled={loading}>
                    {loading ? "…" : "↑"}
                  </button>
                </div>
              </div>
            </div>

            <div className="feature-cards">
              <div className="feat-card" onClick={() => send("Me ajude a gerar uma imagem")}>
                <div className="feat-card-top">🖼 <span className="feat-tag">Create Image</span></div>
                <strong>Image Generator</strong>
                <p>Create high-quality images instantly from text.</p>
              </div>
              <div className="feat-card" onClick={() => send("Crie uma apresentação profissional")}>
                <div className="feat-card-top">📊 <span className="feat-tag">Make Slides</span></div>
                <strong>AI Presentation</strong>
                <p>Turn ideas into engaging, professional presentations.</p>
              </div>
              <div className="feat-card" onClick={() => send("Me ajude a escrever código")}>
                <div className="feat-card-top">💻 <span className="feat-tag">Generate Code</span></div>
                <strong>Dev Assistant</strong>
                <p>Generate clean, production ready code in seconds.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="chat-area">
            <div className="chat-header-info">
              <div className="siri-orb small" />
              <span>{activeConv?.title}</span>
            </div>
            <div className="chat-messages">
              {messages.map((m, i) => (
                <div key={i} className={`bubble ${m.role}`}>
                  <div className="bubble-label">{m.role === "user" ? "Você" : "Zyricon"}</div>
                  <pre className="bubble-text">{m.content}</pre>
                </div>
              ))}
              {loading && (
                <div className="bubble assistant">
                  <div className="bubble-label">Zyricon</div>
                  <div className="typing-dots"><span /><span /><span /></div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="chat-composer">
              <div className="composer">
                <span className="composer-star">✦</span>
                <textarea
                  className="composer-input"
                  placeholder="Ask Anything..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                />
                <div className="composer-bar">
                  <button className="bar-btn">📎 Attach</button>
                  <span className="divider">|</span>
                  <button className="bar-btn">⚙ Settings</button>
                  <span className="divider">|</span>
                  <button className="bar-btn">⊞ Options</button>
                  <div style={{ flex: 1 }} />
                  <button className="mic-btn">🎙</button>
                  <button className="send-btn" onClick={() => send()} disabled={loading}>
                    {loading ? "…" : "↑"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
