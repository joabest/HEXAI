"use client";

import { FormEvent, useMemo, useState } from "react";

type WaitlistEntry = {
  id: string;
  email: string;
  selectedModel: string;
  language: "pt" | "en";
  useCase: string;
  source: string;
  createdAt: string;
};

const Logo = () => <span className="brand-logo small"><span>C</span></span>;

function formatDate(date: string) {
  try {
    return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(date));
  } catch {
    return date;
  }
}

function csvEscape(value: string) {
  return `"${String(value || "").replace(/"/g, '""')}"`;
}

export default function WaitlistAdminPage() {
  const [password, setPassword] = useState("");
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [storage, setStorage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [search, setSearch] = useState("");

  const filteredEntries = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return entries;
    return entries.filter(entry =>
      entry.email.toLowerCase().includes(q) ||
      entry.selectedModel.toLowerCase().includes(q) ||
      entry.useCase.toLowerCase().includes(q)
    );
  }, [entries, search]);

  async function loadEntries(pass = password) {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/waitlist", { headers: { "x-admin-password": pass } });
      const data = await res.json() as { entries?: WaitlistEntry[]; storage?: string; error?: string };
      if (!res.ok) throw new Error(data.error || "Erro ao entrar.");
      setEntries(data.entries || []);
      setStorage(data.storage || "");
      setUnlocked(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar lista.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await loadEntries();
  }

  async function removeEntry(id: string) {
    if (!confirm("Excluir este e-mail da lista?")) return;
    const res = await fetch("/api/waitlist", {
      method: "DELETE",
      headers: { "content-type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ id }),
    });

    if (res.ok) setEntries(prev => prev.filter(entry => entry.id !== id));
    else setError("Não consegui excluir este e-mail.");
  }

  function exportCsv() {
    const header = ["email", "modelo", "idioma", "uso", "origem", "data"].map(csvEscape).join(",");
    const rows = filteredEntries.map(entry => [
      entry.email,
      entry.selectedModel,
      entry.language,
      entry.useCase,
      entry.source,
      entry.createdAt,
    ].map(csvEscape).join(","));
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lista-espera.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!unlocked) {
    return (
      <main className="admin-shell">
        <form className="admin-login" onSubmit={handleLogin}>
          <Logo />
          <h1>Painel da lista de espera</h1>
          <p>Digite a senha administrativa para ver os e-mails capturados pela landing.</p>
          <input type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Senha do painel" />
          <button type="submit" disabled={loading}>{loading ? "Entrando..." : "Entrar"}</button>
          {error && <div className="form-error">{error}</div>}
        </form>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <section className="admin-panel">
        <header className="admin-header">
          <div>
            <span><Logo /> Cenured</span>
            <h1>Lista de espera</h1>
            <p>{entries.length} e-mail{entries.length === 1 ? "" : "s"} salvo{entries.length === 1 ? "" : "s"}. Armazenamento: <strong>{storage || "local"}</strong>.</p>
          </div>
          <div className="admin-actions">
            <button onClick={() => loadEntries()} disabled={loading}>Atualizar</button>
            <button onClick={exportCsv}>Exportar CSV</button>
          </div>
        </header>

        <div className="admin-toolbar">
          <input value={search} onChange={event => setSearch(event.target.value)} placeholder="Buscar por e-mail, modelo ou uso..." />
          <a href="/">Voltar para landing</a>
          <a href="/chat">Abrir chat</a>
        </div>

        {error && <div className="form-error">{error}</div>}

        <div className="waitlist-table-wrap">
          <table className="waitlist-table">
            <thead>
              <tr>
                <th>E-mail</th>
                <th>Modelo</th>
                <th>Uso</th>
                <th>Idioma</th>
                <th>Data</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map(entry => (
                <tr key={entry.id}>
                  <td>{entry.email}</td>
                  <td>{entry.selectedModel}</td>
                  <td>{entry.useCase || "—"}</td>
                  <td>{entry.language.toUpperCase()}</td>
                  <td>{formatDate(entry.createdAt)}</td>
                  <td><button className="danger-btn" onClick={() => removeEntry(entry.id)}>Excluir</button></td>
                </tr>
              ))}
              {filteredEntries.length === 0 && (
                <tr><td colSpan={6} className="empty-cell">Nenhum e-mail encontrado.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
