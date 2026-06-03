export type WaitlistEntry = {
  id: string;
  email: string;
  selectedModel: string;
  language: "pt" | "en";
  useCase: string;
  source: string;
  createdAt: string;
};

type SaveInput = Omit<WaitlistEntry, "id" | "createdAt">;

const memoryStore: WaitlistEntry[] = [];

function tableName() {
  return process.env.WAITLIST_TABLE || "waitlist";
}

function supabaseUrl() {
  return (process.env.SUPABASE_URL || "").replace(/\/$/, "");
}

function supabaseKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || "";
}

function hasSupabase() {
  return Boolean(supabaseUrl() && supabaseKey());
}

export function getStorageMode() {
  return hasSupabase() ? "supabase" : "memory";
}

export function cleanEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function mapSupabaseEntry(item: any): WaitlistEntry {
  return {
    id: String(item.id || ""),
    email: String(item.email || ""),
    selectedModel: String(item.selected_model || item.model || item.selectedModel || "Modelo padrão"),
    language: item.language === "en" ? "en" : "pt",
    useCase: String(item.use_case || item.useCase || ""),
    source: String(item.source || "landing"),
    createdAt: String(item.created_at || item.createdAt || new Date().toISOString()),
  };
}

export async function saveWaitlistEntry(input: SaveInput) {
  const entry: WaitlistEntry = {
    id: crypto.randomUUID(),
    email: cleanEmail(input.email),
    selectedModel: input.selectedModel || "Modelo padrão",
    language: input.language === "en" ? "en" : "pt",
    useCase: input.useCase || "",
    source: input.source || "landing",
    createdAt: new Date().toISOString(),
  };

  if (!hasSupabase()) {
    const existingIndex = memoryStore.findIndex((item) => item.email === entry.email);
    if (existingIndex >= 0) memoryStore[existingIndex] = { ...memoryStore[existingIndex], ...entry };
    else memoryStore.unshift(entry);
    return entry;
  }

  const response = await fetch(`${supabaseUrl()}/rest/v1/${tableName()}`, {
    method: "POST",
    headers: {
      apikey: supabaseKey(),
      authorization: `Bearer ${supabaseKey()}`,
      "content-type": "application/json",
      prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify({
      email: entry.email,
      selected_model: entry.selectedModel,
      language: entry.language,
      use_case: entry.useCase,
      source: entry.source,
    }),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.message || "Erro ao salvar no Supabase.");
  return Array.isArray(data) && data[0] ? mapSupabaseEntry(data[0]) : entry;
}

export async function listWaitlistEntries() {
  if (!hasSupabase()) return memoryStore;

  const response = await fetch(`${supabaseUrl()}/rest/v1/${tableName()}?select=*&order=created_at.desc`, {
    headers: {
      apikey: supabaseKey(),
      authorization: `Bearer ${supabaseKey()}`,
    },
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.message || "Erro ao listar e-mails.");
  return Array.isArray(data) ? data.map(mapSupabaseEntry) : [];
}

export async function deleteWaitlistEntry(id: string) {
  if (!hasSupabase()) {
    const index = memoryStore.findIndex((item) => item.id === id);
    if (index >= 0) memoryStore.splice(index, 1);
    return;
  }

  const response = await fetch(`${supabaseUrl()}/rest/v1/${tableName()}?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: {
      apikey: supabaseKey(),
      authorization: `Bearer ${supabaseKey()}`,
    },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message || "Erro ao excluir e-mail.");
  }
}
