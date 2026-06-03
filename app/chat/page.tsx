"use client";

import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";

type Lang = "pt" | "en";
type Theme = "dark" | "light";
type ModelKey = "default" | "fast" | "creative" | "code" | "reasoning";
type Msg = { role: "user" | "assistant"; content: string };
type Conversation = { id: string; title: string; messages: Msg[]; createdAt: string };

type IconProps = { size?: number };

const IconChat = ({ size = 15 }: IconProps) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
const IconArchive = ({ size = 15 }: IconProps) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8" /><rect x="1" y="3" width="22" height="5" /><line x1="10" y1="12" x2="14" y2="12" /></svg>;
const IconBook = ({ size = 15 }: IconProps) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>;
const IconFolder = ({ size = 15 }: IconProps) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>;
const IconPlus = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
const IconChevronsRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" /></svg>;
const IconChevronsLeft = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="11 17 6 12 11 7" /><polyline points="18 17 13 12 18 7" /></svg>;
const IconStar = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>;
const IconZap = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
const IconImage = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>;
const IconSlides = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>;
const IconCode = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>;
const IconAttach = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05 12.25 20.24a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>;
const IconSettings = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>;
const IconGrid = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>;
const IconMic = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>;
const IconSend = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>;
const IconGear = ({ size = 15 }: IconProps) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>;
const IconExport = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>;
const IconChevronDown = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>;

const BrandMark = () => <div className="logo-mark"><span>C</span></div>;

const modelOptions: Array<{ key: ModelKey; pt: string; en: string }> = [
  { key: "default", pt: "Modelo padrão", en: "Default model" },
  { key: "fast", pt: "Modelo rápido", en: "Fast model" },
  { key: "creative", pt: "Modelo criativo", en: "Creative model" },
  { key: "code", pt: "Modelo código", en: "Code model" },
  { key: "reasoning", pt: "Modelo raciocínio", en: "Reasoning model" },
];

const dictionary = {
  pt: {
    passwordTitle: "Acesso privado",
    passwordText: "Digite sua senha para acessar o chat.",
    passwordPlaceholder: "Senha",
    enter: "Entrar",
    newChat: "Nova conversa",
    features: "Recursos",
    chat: "Chat",
    archived: "Arquivadas",
    library: "Biblioteca",
    conversations: "Conversas",
    noConversation: "Nenhuma conversa",
    settings: "Ajustes",
    themeDark: "Escuro",
    themeLight: "Claro",
    language: "Idioma",
    configuration: "Configuração",
    export: "Exportar chat",
    title: "Pronto para criar algo novo?",
    createImage: "Criar imagem",
    brainstorm: "Brainstorm",
    makePlan: "Fazer plano",
    placeholder: "Pergunte qualquer coisa...",
    attach: "Anexar",
    options: "Opções",
    imageCardTitle: "Gerador de imagem",
    imageCardText: "Crie imagens de alta qualidade a partir de texto.",
    slidesCardTitle: "Apresentação IA",
    slidesCardText: "Transforme ideias em apresentações profissionais.",
    codeCardTitle: "Dev Assistente",
    codeCardText: "Gere código limpo e pronto para produção.",
    assistantLabel: "Assistente",
    wrongPassword: "Senha incorreta.",
    connectionError: "Erro ao conectar.",
    emptyExport: "Abra uma conversa antes de exportar.",
  },
  en: {
    passwordTitle: "Private access",
    passwordText: "Enter your password to access the chat.",
    passwordPlaceholder: "Password",
    enter: "Enter",
    newChat: "New chat",
    features: "Features",
    chat: "Chat",
    archived: "Archived",
    library: "Library",
    conversations: "Conversations",
    noConversation: "No conversation",
    settings: "Settings",
    themeDark: "Dark",
    themeLight: "Light",
    language: "Language",
    configuration: "Configuration",
    export: "Export chat",
    title: "Ready to create something new?",
    createImage: "Create image",
    brainstorm: "Brainstorm",
    makePlan: "Make a plan",
    placeholder: "Ask anything...",
    attach: "Attach",
    options: "Options",
    imageCardTitle: "Image Generator",
    imageCardText: "Create high-quality images from text.",
    slidesCardTitle: "AI Presentation",
    slidesCardText: "Turn ideas into professional presentations.",
    codeCardTitle: "Dev Assistant",
    codeCardText: "Generate clean production-ready code.",
    assistantLabel: "Assistant",
    wrongPassword: "Wrong password.",
    connectionError: "Connection error.",
    emptyExport: "Open a conversation before exporting.",
  },
};

function safeTitle(text: string) {
  return text.trim().replace(/[\\/:*?"<>|]/g, "").slice(0, 45) || "conversa";
}

export default function ChatPage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("pt");
  const [theme, setTheme] = useState<Theme>("dark");
  const [modelKey, setModelKey] = useState<ModelKey>("default");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const t = dictionary[lang];

  const activeConv = conversations.find(c => c.id === activeId) ?? null;
  const messages = activeConv?.messages ?? [];
  const modelLabel = useMemo(() => modelOptions.find(m => m.key === modelKey)?.[lang] || modelOptions[0][lang], [modelKey, lang]);

  useEffect(() => {
    const savedConversations = localStorage.getItem("private-chat-conversations");
    const savedTheme = localStorage.getItem("private-chat-theme") as Theme | null;
    const savedLang = localStorage.getItem("private-chat-language") as Lang | null;
    const savedModel = localStorage.getItem("private-chat-model") as ModelKey | null;
    const savedActive = localStorage.getItem("private-chat-active");

    if (savedConversations) {
      try {
        const parsed = JSON.parse(savedConversations) as Conversation[];
        if (Array.isArray(parsed)) setConversations(parsed);
      } catch {
        setConversations([]);
      }
    }
    if (savedTheme === "dark" || savedTheme === "light") setTheme(savedTheme);
    if (savedLang === "pt" || savedLang === "en") setLang(savedLang);
    if (modelOptions.some(option => option.key === savedModel)) setModelKey(savedModel);
    if (savedActive) setActiveId(savedActive);
  }, []);

  useEffect(() => {
    localStorage.setItem("private-chat-conversations", JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => { localStorage.setItem("private-chat-theme", theme); }, [theme]);
  useEffect(() => { localStorage.setItem("private-chat-language", lang); }, [lang]);
  useEffect(() => { localStorage.setItem("private-chat-model", modelKey); }, [modelKey]);
  useEffect(() => { if (activeId) localStorage.setItem("private-chat-active", activeId); }, [activeId]);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  async function unlock() {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password, checkOnly: true, language: lang }),
    });
    if (res.ok) setUnlocked(true);
    else alert(t.wrongPassword);
  }

  async function generateTitle(userMsg: string): Promise<string> {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password, titleOnly: true, userMsg, language: lang, modelKey }),
      });
      const data = await res.json() as { title?: string };
      return data.title || userMsg.slice(0, 28);
    } catch {
      return userMsg.slice(0, 28);
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
      setConversations(prev => [{ id: convId!, title: lang === "pt" ? "Nova conversa" : "New conversation", messages: [], createdAt: new Date().toISOString() }, ...prev]);
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
          body: JSON.stringify({ password, messages: updatedMessages, language: lang, modelKey }),
        }),
        isNew ? generateTitle(prompt) : Promise.resolve(null),
      ]);
      const data = await aiRes.json() as { answer?: string; error?: string };
      const answer = data.answer || data.error || (lang === "pt" ? "Sem resposta." : "No answer.");
      setConversations(prev => prev.map(c => c.id === convId ? { ...c, title: title ?? c.title, messages: [...updatedMessages, { role: "assistant", content: answer }] } : c));
    } catch {
      setConversations(prev => prev.map(c => c.id === convId ? { ...c, messages: [...updatedMessages, { role: "assistant", content: t.connectionError }] } : c));
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  }

  function newChat() {
    setActiveId(null);
    setInput("");
  }

  function exportChat() {
    if (!activeConv) {
      alert(t.emptyExport);
      return;
    }

    const content = activeConv.messages.map(message => `${message.role === "user" ? "Você" : t.assistantLabel}:\n${message.content}`).join("\n\n---\n\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${safeTitle(activeConv.title)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleModelChange(event: ChangeEvent<HTMLSelectElement>) {
    setModelKey(event.target.value as ModelKey);
  }

  function handleLanguageChange(event: ChangeEvent<HTMLSelectElement>) {
    setLang(event.target.value as Lang);
  }

  function handleThemeChange(event: ChangeEvent<HTMLSelectElement>) {
    setTheme(event.target.value as Theme);
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      send();
    }
  }

  const ComposerBlock = () => (
    <div className="composer">
      <div className="composer-top">
        <span className="composer-star"><IconStar /></span>
        <textarea
          ref={textareaRef}
          className="composer-input"
          placeholder={t.placeholder}
          value={input}
          onChange={event => setInput(event.target.value)}
          onKeyDown={handleInputKeyDown}
        />
      </div>
      <div className="composer-bar">
        <button className="bar-btn" type="button"><IconAttach /><span>{t.attach}</span></button>
        <div className="bar-divider" />
        <button className="bar-btn" type="button"><IconSettings /><span>{t.settings}</span></button>
        <div className="bar-divider" />
        <button className="bar-btn" type="button"><IconGrid /><span>{t.options}</span></button>
        <div className="composer-actions">
          <button className="mic-btn" type="button"><IconMic /></button>
          <button className="send-btn" type="button" onClick={() => send()} disabled={loading}><IconSend /></button>
        </div>
      </div>
    </div>
  );

  if (!unlocked) return (
    <main className={`login-screen chat-${theme}`}>
      <BrandMark />
      <div className="login-card">
        <h1>{t.passwordTitle}</h1>
        <p>{t.passwordText}</p>
        <input type="password" placeholder={t.passwordPlaceholder} value={password} onChange={event => setPassword(event.target.value)} onKeyDown={event => event.key === "Enter" && unlock()} />
        <button onClick={unlock}>{t.enter}</button>
      </div>
      <div className="login-tools">
        <select value={lang} onChange={handleLanguageChange}><option value="pt">Português</option><option value="en">English</option></select>
        <select value={theme} onChange={handleThemeChange}><option value="dark">{dictionary[lang].themeDark}</option><option value="light">{dictionary[lang].themeLight}</option></select>
      </div>
    </main>
  );

  return (
    <main className={`shell chat-${theme}`}>
      <aside className={`sidebar${sidebarOpen ? " expanded" : ""}`}>
        <div className="sidebar-header">
          <BrandMark />
          <span className="brand">Cenured</span>
          <button className="toggle-btn" type="button" onClick={() => setSidebarOpen(open => !open)} aria-label="Alternar menu lateral">
            {sidebarOpen ? <IconChevronsLeft /> : <IconChevronsRight />}
          </button>
        </div>
        <button className="new-chat-btn" type="button" onClick={newChat}>
          <IconPlus /><span className="btn-label">{t.newChat}</span>
        </button>
        <div className="sidebar-section-label">{t.features}</div>
        <nav className="sidebar-nav">
          <div className="nav-item active"><IconChat /><span className="ni-label">{t.chat}</span></div>
          <div className="nav-item"><IconArchive /><span className="ni-label">{t.archived}</span></div>
          <div className="nav-item"><IconBook /><span className="ni-label">{t.library}</span></div>
        </nav>
        <div className="sidebar-section-label">{t.conversations}</div>
        <nav className="sidebar-nav conversation-list">
          {conversations.map(conv => (
            <button key={conv.id} className={`nav-item${conv.id === activeId ? " active" : ""}`} onClick={() => setActiveId(conv.id)} title={conv.title}>
              <IconFolder /><span className="ni-label">{conv.title.length > 22 ? `${conv.title.slice(0, 22)}…` : conv.title}</span>
            </button>
          ))}
          {conversations.length === 0 && <div className="nav-item muted"><IconFolder /><span className="ni-label">{t.noConversation}</span></div>}
        </nav>
        <div className="sidebar-spacer" />
        <div className="sidebar-bottom">
          <div className="nav-item"><IconGear /><span className="ni-label">{t.settings}</span></div>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <label className="select-pill">
            <span>{modelLabel}</span>
            <select value={modelKey} onChange={handleModelChange} aria-label="Modelo">
              {modelOptions.map(option => <option key={option.key} value={option.key}>{option[lang]}</option>)}
            </select>
            <IconChevronDown />
          </label>
          <div className="topbar-spacer" />
          <label className="select-pill compact">
            <span>{lang === "pt" ? "PT" : "EN"}</span>
            <select value={lang} onChange={handleLanguageChange} aria-label={t.language}>
              <option value="pt">Português</option>
              <option value="en">English</option>
            </select>
            <IconChevronDown />
          </label>
          <label className="select-pill compact">
            <span>{theme === "dark" ? t.themeDark : t.themeLight}</span>
            <select value={theme} onChange={handleThemeChange} aria-label="Tema">
              <option value="dark">{t.themeDark}</option>
              <option value="light">{t.themeLight}</option>
            </select>
            <IconChevronDown />
          </label>
          <button className="topbar-btn" type="button"><IconGear /><span>{t.configuration}</span></button>
          <button className="topbar-btn" type="button" onClick={exportChat}><IconExport /><span>{t.export}</span></button>
        </header>

        {messages.length === 0 ? (
          <div className="hero-area">
            <BrandMark />
            <h1 className="hero-title">{t.title}</h1>
            <div className="quick-chips">
              <button className="chip" type="button" onClick={() => send(lang === "pt" ? "Crie uma imagem conceitual" : "Create a concept image")}><IconImage />{t.createImage}</button>
              <button className="chip" type="button" onClick={() => send(lang === "pt" ? "Faça um brainstorm de ideias criativas" : "Brainstorm creative ideas")}><IconZap />{t.brainstorm}</button>
              <button className="chip" type="button" onClick={() => send(lang === "pt" ? "Me ajude a criar um plano de ação" : "Help me create an action plan")}><IconSlides />{t.makePlan}</button>
            </div>
            <div className="composer-wrap"><ComposerBlock /></div>
            <div className="feature-cards">
              <div className="feat-card" onClick={() => send(lang === "pt" ? "Me ajude a gerar uma imagem" : "Help me generate an image")}>
                <div className="feat-card-top"><div className="feat-icon"><IconImage /></div><span className="feat-tag">{t.createImage}</span></div>
                <strong>{t.imageCardTitle}</strong><p>{t.imageCardText}</p>
              </div>
              <div className="feat-card" onClick={() => send(lang === "pt" ? "Crie uma apresentação profissional" : "Create a professional presentation")}>
                <div className="feat-card-top"><div className="feat-icon"><IconSlides /></div><span className="feat-tag">{t.makePlan}</span></div>
                <strong>{t.slidesCardTitle}</strong><p>{t.slidesCardText}</p>
              </div>
              <div className="feat-card" onClick={() => send(lang === "pt" ? "Me ajude a escrever código limpo" : "Help me write clean code")}>
                <div className="feat-card-top"><div className="feat-icon"><IconCode /></div><span className="feat-tag">Code</span></div>
                <strong>{t.codeCardTitle}</strong><p>{t.codeCardText}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="chat-area">
            <div className="chat-header-info"><BrandMark /><span>{activeConv?.title}</span><em>{modelLabel}</em></div>
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`bubble ${message.role}`}>
                  {message.role === "assistant" && <div className="bubble-label">{t.assistantLabel}</div>}
                  <pre className="bubble-text">{message.content}</pre>
                </div>
              ))}
              {loading && <div className="bubble assistant"><div className="bubble-label">{t.assistantLabel}</div><div className="typing-dots"><span /><span /><span /></div></div>}
              <div ref={chatEndRef} />
            </div>
            <div className="chat-composer-wrap"><ComposerBlock /></div>
          </div>
        )}
      </section>
    </main>
  );
}
