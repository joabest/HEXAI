"use client";
import { useMemo, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function Page() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const hour = new Date().getHours();
  const greeting = useMemo(() => hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite", [hour]);

  async function unlock() {
    const res = await fetch("/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password, checkOnly: true }) });
    if (res.ok) setUnlocked(true); else alert("Senha incorreta. Configure APP_PASSWORD na Vercel.");
  }

  async function send(text?: string) {
    const prompt = (text || input).trim();
    if (!prompt || loading) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: prompt }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password, messages: next }) });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.answer || data.error || "Sem resposta." }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Erro ao conectar com a IA." }]);
    } finally { setLoading(false); }
  }

  if (!unlocked) return <main className="login"><div className="orb"/><section className="loginCard"><b>HEXAI</b><h1>Seu assistente pessoal</h1><p>Digite sua senha para abrir o painel.</p><input type="password" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&unlock()}/><button onClick={unlock}>Entrar</button></section></main>;

  return <main className="shell">
    <aside className="rail"><div className="logo">✺</div><span className="active">⌂</span><span>○</span><span>↺</span><span>▣</span><span>⌘</span><span>◌</span><div className="grow"/><span>♬</span><span>⚙</span><div className="avatar">J</div></aside>
    <section className="sources"><div className="card"><h2>Sources</h2><div className="ghostBox">▧</div><p>Add from connected knowledge or upload to thread.</p><div className="row"><button>Attach file</button><button>Upload media</button></div><small>@ Browse existing content</small></div><div className="card"><h2>Suggested tasks</h2><div className="chips"><button onClick={()=>send("Crie uma landing page moderna em HTML CSS e JS")}>Criar landing page</button><button onClick={()=>send("Explique e corrija este erro de código")}>Corrigir erro</button><button onClick={()=>send("Faça um roteiro de posts para Instagram")}>Roteiro de posts</button></div></div></section>
    <section className="workspace"><header><select><option>HEXAI Free</option></select><div/><button className="light">Search thread</button><button className="dark">+ New Thread</button></header><div className="hero"><div className="orb small"/><h1>{greeting}, Joab<br/>What's on <em>your mind?</em></h1><div className="composer"><textarea placeholder="Ask AI a question or make a request..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==="Enter" && !e.shiftKey){ e.preventDefault(); send(); }}}/><div className="composerBar"><button>Attach</button><button>Writing Styles⌄</button><label>Citation <input type="checkbox" defaultChecked/></label><button className="send" onClick={()=>send()}>{loading ? "..." : "↑"}</button></div></div><p className="label">GET STARTED WITH AN EXAMPLE BELOW</p><div className="examples"><button onClick={()=>send("Faça uma lista de tarefas para meu projeto pessoal")}>Write a to-do list for a personal project</button><button onClick={()=>send("Gere um e-mail profissional para responder uma proposta")}>Generate an email to reply to a job offer</button><button onClick={()=>send("Resuma este artigo em um parágrafo")}>Summarize this article in one paragraph</button><button onClick={()=>send("Como funciona IA em capacidade técnica?")}>How does AI work in a technical capacity</button></div><div className="chat">{messages.map((m,i)=><article key={i} className={m.role}><b>{m.role === "user" ? "Você" : "HEXAI"}</b><pre>{m.content}</pre></article>)}</div></div></section>
  </main>;
}
