import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  if (process.env.APP_PASSWORD && body.password !== process.env.APP_PASSWORD) return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
  if (body.checkOnly) return NextResponse.json({ ok: true });

  const messages = body.messages || [];
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Configure OPENROUTER_API_KEY na Vercel." });

  const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}`, "HTTP-Referer": "https://hexai.vercel.app", "X-Title": "HEXAI" },
    body: JSON.stringify({ model: process.env.OPENROUTER_MODEL || "openrouter/free", messages: [{ role: "system", content: "Você é o HEXAI, assistente pessoal do Joab. Responda em português, direto e com foco em criação, código, marketing e produtividade." }, ...messages] })
  });
  const data = await r.json();
  return NextResponse.json({ answer: data?.choices?.[0]?.message?.content || data?.error?.message || "Não consegui gerar resposta." });
}
