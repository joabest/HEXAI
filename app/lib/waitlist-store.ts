import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export type WaitlistEntry = {
  id: string;
  email: string;
  selectedModel: string;
  language: "pt" | "en";
  useCase: string;
  source: string;
  createdAt: string;
};

const TABLE_NAME = process.env.SUPABASE_WAITLIST_TABLE || "waitlist";

function hasSupabaseConfig() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function normalizeUrl(url: string) {
  return url.replace(/\/+$/, "");
}

function getLocalFilePath() {
  const localPath = path.join(process.cwd(), ".data", "waitlist.json");
  const tempPath = path.join("/tmp", "waitlist.json");
  return process.env.VERCEL ? tempPath : localPath;
}

async function readLocalEntries(): Promise<WaitlistEntry[]> {
  try {
    const raw = await readFile(getLocalFilePath(), "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeLocalEntries(entries: WaitlistEntry[]) {
  const filePath = getLocalFilePath();
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(entries, null, 2), "utf8");
}

async function listFromSupabase(): Promise<WaitlistEntry[]> {
  const url = `${normalizeUrl(process.env.SUPABASE_URL!)}/rest/v1/${TABLE_NAME}?select=*&order=created_at.desc`;
  const res = await fetch(url, {
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error(await res.text());
  const rows = (await res.json()) as Array<Record<string, string>>;
  return rows.map(row => ({
    id: row.id,
    email: row.email,
    selectedModel: row.selected_model || "",
    language: (row.language === "en" ? "en" : "pt") as "pt" | "en",
    useCase: row.use_case || "",
    source: row.source || "landing",
    createdAt: row.created_at,
  }));
}

async function saveToSupabase(entry: WaitlistEntry) {
  const url = `${normalizeUrl(process.env.SUPABASE_URL!)}/rest/v1/${TABLE_NAME}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
      "content-type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      id: entry.id,
      email: entry.email,
      selected_model: entry.selectedModel,
      language: entry.language,
      use_case: entry.useCase,
      source: entry.source,
      created_at: entry.createdAt,
    }),
  });

  if (!res.ok) throw new Error(await res.text());
}

async function deleteFromSupabase(id: string) {
  const url = `${normalizeUrl(process.env.SUPABASE_URL!)}/rest/v1/${TABLE_NAME}?id=eq.${encodeURIComponent(id)}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
      authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
    },
  });

  if (!res.ok) throw new Error(await res.text());
}

export function cleanEmail(email: string) {
  return String(email || "").trim().toLowerCase();
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function listWaitlistEntries(): Promise<WaitlistEntry[]> {
  if (hasSupabaseConfig()) return listFromSupabase();
  const entries = await readLocalEntries();
  return entries.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function saveWaitlistEntry(input: Omit<WaitlistEntry, "id" | "createdAt">): Promise<WaitlistEntry> {
  const email = cleanEmail(input.email);
  const now = new Date().toISOString();
  const entry: WaitlistEntry = {
    id: randomUUID(),
    email,
    selectedModel: input.selectedModel || "Padrão",
    language: input.language === "en" ? "en" : "pt",
    useCase: input.useCase || "",
    source: input.source || "landing",
    createdAt: now,
  };

  if (hasSupabaseConfig()) {
    await saveToSupabase(entry);
    return entry;
  }

  const entries = await readLocalEntries();
  const withoutDuplicate = entries.filter(item => item.email !== email);
  withoutDuplicate.unshift(entry);
  await writeLocalEntries(withoutDuplicate);
  return entry;
}

export async function deleteWaitlistEntry(id: string) {
  if (hasSupabaseConfig()) {
    await deleteFromSupabase(id);
    return;
  }

  const entries = await readLocalEntries();
  await writeLocalEntries(entries.filter(item => item.id !== id));
}

export function getStorageMode() {
  if (hasSupabaseConfig()) return "supabase";
  return process.env.VERCEL ? "temporary" : "local";
}
