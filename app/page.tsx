"use client";
import { useMemo, useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "assistant"; content: string };
type Conversation = { id: string; title: string; messages: Msg[] };

const IconChat = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const IconArchive = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>;
const IconBook = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
const IconFolder = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>;
const IconPlus = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconChevronsRight = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>;
const IconChevronsLeft = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/></svg>;
const IconStar = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>;
const IconZap = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const IconImage = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
const IconSlides = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>;
const IconCode = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
const IconAttach = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>;
const IconSettings = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const IconGrid = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
const IconMic = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>;
const IconSend = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>;
const IconCrown = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20M5 20V10l7-7 7 7v10"/></svg>;
const IconGear = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const IconExport = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
const IconChevronDown = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>;

export default function Page() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeConv = conversations.find(c => c.id === activeId) ?? null;
  const messages = activeConv?.messages ?? [];
  const hour = new Date().getHours();
  const greeting = useMemo(() => hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite", [hour]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function unlock() {
    const res = await fetch("/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password, checkOnly: true }) });
    if (res.ok) setUnlocked(true); else alert("Senha incorreta.");
  }

  async function generateTitle(userMsg: string): Promise<string> {
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password, titleOnly: true, userMsg }) });
      const data = await res.json();
      return data.title || userMsg.slice(0, 28);
    } catch { return userMsg.slice(0, 28); }
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
        fetch("/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password, messages: updatedMessages }) }),
        isNew ? generateTitle(prompt) : Promise.resolve(null),
      ]);
      const data = await aiRes.json();
      const answer = data.answer || data.error || "Sem resposta.";
      setConversations(prev => prev.map(c => c.id === convId ? { ...c, title: title ?? c.title, messages: [...updatedMessages, { role: "assistant", content: answer }] } : c));
    } catch {
      setConversations(prev => prev.map(c => c.id === convId ? { ...c, messages: [...updatedMessages, { role: "assistant", content: "Erro ao conectar." }] } : c));
    } finally { setLoading(false); textareaRef.current?.focus(); }
  }

  if (!unlocked) return (
    <main className="login-screen">
      <div className="siri-orb" />
      <div className="login-card">
        <h1>Zyricon AI</h1>
        <p>Digite sua senha para acessar o painel.</p>
        <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && unlock()} />
        <button onClick={unlock}>Entrar</button>
      </div>
    </main>
  );

  const ComposerBlock = () => (
    <div className="composer">
      <div className="composer-top">
        <span className="composer-star"><IconStar /></span>
        <textarea ref={textareaRef} className="composer-input" placeholder="Ask Anything..." value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} />
      </div>
      <div className="composer-bar">
        <button className="bar-btn"><IconAttach /><span>Attach</span></button>
        <div className="bar-divider" />
        <button className="bar-btn"><IconSettings /><span>Settings</span></button>
        <div className="bar-divider" />
        <button className="bar-btn"><IconGrid /><span>Options</span></button>
        <div className="composer-actions">
          <button className="mic-btn"><IconMic /></button>
          <button className="send-btn" onClick={() => send()} disabled={loading}><IconSend /></button>
        </div>
      </div>
    </div>
  );

  return (
    <main className="shell">
      <aside className={`sidebar${sidebarOpen ? " expanded" : ""}`}>
        <div className="sidebar-header">
          <div className="logo-mark">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>
          </div>
          <span className="brand">Zyricon</span>
          <button className="toggle-btn" onClick={() => setSidebarOpen(o => !o)}>
            {sidebarOpen ? <IconChevronsLeft /> : <IconChevronsRight />}
          </button>
        </div>
        <button className="new-chat-btn" onClick={() => setActiveId(null)}>
          <IconPlus /><span className="btn-label">New Chat</span>
        </button>
        <div className="sidebar-section-label">Features</div>
        <nav className="sidebar-nav">
          <div className="nav-item active"><IconChat /><span className="ni-label">Chat</span></div>
          <div className="nav-item"><IconArchive /><span className="ni-label">Archived</span></div>
          <div className="nav-item"><IconBook /><span className="ni-label">Library</span></div>
        </nav>
        <div className="sidebar-section-label">Workspaces</div>
        <nav className="sidebar-nav">
          {conversations.map(conv => (
            <div key={conv.id} className={`nav-item${conv.id === activeId ? " active" : ""}`} onClick={() => setActiveId(conv.id)} title={conv.title}>
              <IconFolder /><span className="ni-label">{conv.title.length > 18 ? conv.title.slice(0, 18) + "…" : conv.title}</span>
            </div>
          ))}
          {conversations.length === 0 && <div className="nav-item muted"><IconFolder /><span className="ni-label">Nenhuma conversa</span></div>}
        </nav>
        <div className="sidebar-spacer" />
        <div className="sidebar-bottom">
          <div className="nav-item"><IconGear /><span className="ni-label">Settings</span></div>
          <div className="upgrade-row">
            <IconCrown />
            <div className="upgrade-text"><strong>Upgrade to Pro</strong><span>Modelos avançados</span></div>
          </div>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="model-pill">ChatGPT v4.0 <IconChevronDown /></div>
          <div className="topbar-spacer" />
          <button className="topbar-btn"><IconGear /><span>Configuration</span></button>
          <button className="topbar-btn"><IconExport /><span>Export</span></button>
        </header>

        {messages.length === 0 ? (
          <div className="hero-area">
            <div className="siri-orb" />
            <h1 className="hero-title">Ready to Create Something New?</h1>
            <div className="quick-chips">
              <button className="chip" onClick={() => send("Criar uma imagem conceitual")}><IconImage />Create Image</button>
              <button className="chip" onClick={() => send("Brainstorm de ideias criativas")}><IconZap />Brainstorm</button>
              <button className="chip" onClick={() => send("Me ajude a criar um plano de ação")}><IconSlides />Make a plan</button>
            </div>
            <div className="composer-wrap"><ComposerBlock /></div>
            <div className="feature-cards">
              <div className="feat-card" onClick={() => send("Me ajude a gerar uma imagem")}>
                <div className="feat-card-top"><div className="feat-icon"><IconImage /></div><span className="feat-tag">Create Image</span></div>
                <strong>Image Generator</strong><p>Create high-quality images instantly from text.</p>
              </div>
              <div className="feat-card" onClick={() => send("Crie uma apresentação profissional")}>
                <div className="feat-card-top"><div className="feat-icon"><IconSlides /></div><span className="feat-tag">Make Slides</span></div>
                <strong>AI Presentation</strong><p>Turn ideas into engaging, professional presentations.</p>
              </div>
              <div className="feat-card" onClick={() => send("Me ajude a escrever código limpo")}>
                <div className="feat-card-top"><div className="feat-icon"><IconCode /></div><span className="feat-tag">Generate Code</span></div>
                <strong>Dev Assistant</strong><p>Generate clean, production ready code in seconds.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="chat-area">
            <div className="chat-header-info"><div className="siri-orb small" /><span>{activeConv?.title}</span></div>
            <div className="chat-messages">
              {messages.map((m, i) => (
                <div key={i} className={`bubble ${m.role}`}>
                  {m.role === "assistant" && <div className="bubble-label">Zyricon</div>}
                  <pre className="bubble-text">{m.content}</pre>
                </div>
              ))}
              {loading && <div className="bubble assistant"><div className="bubble-label">Zyricon</div><div className="typing-dots"><span /><span /><span /></div></div>}
              <div ref={chatEndRef} />
            </div>
            <div className="chat-composer-wrap"><ComposerBlock /></div>
          </div>
        )}
      </section>
    </main>
  );
}
