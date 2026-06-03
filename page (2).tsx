import { NextResponse } from "next/server";
import {
  cleanEmail,
  deleteWaitlistEntry,
  getStorageMode,
  isValidEmail,
  listWaitlistEntries,
  saveWaitlistEntry,
} from "../../../lib/waitlist-store";

export const runtime = "nodejs";

type WaitlistBody = {
  email?: string;
  selectedModel?: string;
  language?: "pt" | "en";
  useCase?: string;
  source?: string;
  id?: string;
};

function adminPassword() {
  return process.env.WAITLIST_ADMIN_PASSWORD || process.env.APP_PASSWORD || "";
}

function isAuthorized(req: Request) {
  const configuredPassword = adminPassword();
  if (!configuredPassword) return true;
  return req.headers.get("x-admin-password") === configuredPassword;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as WaitlistBody;
    const email = cleanEmail(body.email || "");

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Informe um e-mail válido." }, { status: 400 });
    }

    const entry = await saveWaitlistEntry({
      email,
      selectedModel: body.selectedModel || "Modelo padrão",
      language: body.language === "en" ? "en" : "pt",
      useCase: String(body.useCase || "").slice(0, 240),
      source: body.source || "landing",
    });

    return NextResponse.json({ ok: true, entry, storage: getStorageMode() });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Erro ao salvar e-mail." }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
    }

    const entries = await listWaitlistEntries();
    return NextResponse.json({ entries, storage: getStorageMode() });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Erro ao carregar lista." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
    }

    const body = (await req.json()) as WaitlistBody;
    if (!body.id) return NextResponse.json({ error: "ID não informado." }, { status: 400 });

    await deleteWaitlistEntry(body.id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Erro ao excluir." }, { status: 500 });
  }
}
