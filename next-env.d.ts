"use client";

import { FormEvent, useMemo, useState } from "react";

const Logo = ({ small = false }: { small?: boolean }) => (
  <span className={small ? "brand-logo small" : "brand-logo"} aria-hidden="true">
    <span>C</span>
  </span>
);

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const IconSpark = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
    <path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" />
  </svg>
);

const copy = {
  pt: {
    navProduct: "Produto",
    navModels: "Modelos",
    navSecurity: "Segurança",
    navPanel: "Lista de espera",
    tryNow: "Entrar na lista",
    badge: "Central privada para equipes, criadores e negócios",
    heroTitle: "Escolha o modelo ideal e organize sua criação com IA em um só lugar.",
    heroText: "Uma landing limpa com captura de e-mails, painel administrativo e chat privado com alternância de idioma, tema e versão do modelo.",
    placeholder: "O que você quer criar hoje?",
    mainCta: "Testar modelo",
    secondaryCta: "Ver painel",
    trusted: "Criado para produtividade real",
    platformTitle: "A plataforma",
    featureOne: "Modelos por objetivo",
    featureOneText: "Rápido, criativo, código ou raciocínio. Você escolhe a experiência sem mostrar nomes internos ao visitante.",
    featureTwo: "Chat privado",
    featureTwoText: "Interface dark/light, histórico local, exportação de conversa e menu lateral retrátil.",
    featureThree: "Lista de espera",
    featureThreeText: "Cada e-mail enviado pela landing fica disponível no painel /lista-espera para gerenciar e exportar.",
    metricsTitle: "Respostas que ajudam no trabalho",
    metricA: "para ideias",
    metricB: "para código",
    metricC: "para negócios",
    appsTitle: "Conecta com todos os fluxos",
    openTitle: "Privado por padrão",
    openText: "A interface pública não revela o nome real da IA. O usuário vê apenas a marca visual e modelos por finalidade.",
    useCasesTitle: "Use para melhorar a produtividade de todos",
    useSales: "Vendas",
    useSalesText: "Propostas, follow-ups e campanhas.",
    useCompany: "Empresa",
    useCompanyText: "Planejamento, documentos e organização.",
    useEngineering: "Desenvolvimento",
    useEngineeringText: "Código, revisão e ideias técnicas.",
    finalTitle: "Comece pela lista de espera",
    finalText: "Quando alguém clicar para testar, a página pede e-mail antes de liberar qualquer acesso.",
    footerProduct: "Produto",
    footerResources: "Recursos",
    footerCompany: "Empresa",
    modalTitle: "Entrar na lista de espera",
    modalText: "Escolha um modelo, informe seu e-mail e deixe registrado o interesse para acesso antecipado.",
    emailLabel: "E-mail",
    useCaseLabel: "Uso principal",
    useCasePlaceholder: "Ex: marketing, código, atendimento, apresentações...",
    close: "Fechar",
    submit: "Salvar e-mail",
    success: "E-mail salvo na lista de espera.",
    error: "Não consegui salvar. Tente novamente.",
    language: "English",
    selected: "Modelo escolhido",
  },
  en: {
    navProduct: "Product",
    navModels: "Models",
    navSecurity: "Security",
    navPanel: "Waitlist",
    tryNow: "Join waitlist",
    badge: "Private console for teams, creators and businesses",
    heroTitle: "Choose the right model and organize AI creation in one place.",
    heroText: "A clean landing page with email capture, admin dashboard and a private chat with language, theme and model switching.",
    placeholder: "What do you want to create today?",
    mainCta: "Test model",
    secondaryCta: "View panel",
    trusted: "Built for real productivity",
    platformTitle: "The platform",
    featureOne: "Models by goal",
    featureOneText: "Fast, creative, code or reasoning. Visitors choose the experience without seeing internal model names.",
    featureTwo: "Private chat",
    featureTwoText: "Dark/light interface, local history, chat export and retractable sidebar.",
    featureThree: "Waitlist",
    featureThreeText: "Every email submitted on the landing page appears in /lista-espera for management and export.",
    metricsTitle: "Answers you can use at work",
    metricA: "for ideas",
    metricB: "for code",
    metricC: "for business",
    appsTitle: "Connects with every workflow",
    openTitle: "Private by default",
    openText: "The public interface does not reveal the real AI name. Users only see the visual brand and goal-based models.",
    useCasesTitle: "Improve productivity for every team",
    useSales: "Sales",
    useSalesText: "Proposals, follow-ups and campaigns.",
    useCompany: "Company",
    useCompanyText: "Planning, documents and organization.",
    useEngineering: "Engineering",
    useEngineeringText: "Code, review and technical ideas.",
    finalTitle: "Start with a waitlist",
    finalText: "When someone tries a model, the page requests an email before any access.",
    footerProduct: "Product",
    footerResources: "Resources",
    footerCompany: "Company",
    modalTitle: "Join the waitlist",
    modalText: "Choose a model, enter your email and register interest for early access.",
    emailLabel: "Email",
    useCaseLabel: "Main use",
    useCasePlaceholder: "Ex: marketing, code, support, presentations...",
    close: "Close",
    submit: "Save email",
    success: "Email saved to the waitlist.",
    error: "Could not save. Try again.",
    language: "Português",
    selected: "Selected model",
  },
};

const models = [
  { key: "default", pt: "Modelo Padrão", en: "Default Model", textPt: "Equilíbrio para tarefas gerais.", textEn: "Balanced for general tasks." },
  { key: "fast", pt: "Modelo Rápido", en: "Fast Model", textPt: "Respostas curtas e ágeis.", textEn: "Short and quick answers." },
  { key: "creative", pt: "Modelo Criativo", en: "Creative Model", textPt: "Ideias, anúncios e conteúdo.", textEn: "Ideas, ads and content." },
  { key: "code", pt: "Modelo Código", en: "Code Model", textPt: "Ajuda para programação.", textEn: "Programming assistance." },
];

const appNames = ["Docs", "Drive", "Email", "CRM", "Notion", "GitHub", "Sheets", "Slack", "Calendar", "Vercel", "Supabase", "Tasks"];

type Lang = "pt" | "en";

export default function LandingPage() {
  const [lang, setLang] = useState<Lang>("pt");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [email, setEmail] = useState("");
  const [useCase, setUseCase] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const t = copy[lang];

  const selectedModelName = useMemo(() => lang === "pt" ? selectedModel.pt : selectedModel.en, [lang, selectedModel]);

  function openModal(model = selectedModel) {
    setSelectedModel(model);
    setModalOpen(true);
    setStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, useCase, language: lang, selectedModel: selectedModelName, source: "landing" }),
      });

      if (!res.ok) throw new Error("waitlist");
      setStatus("success");
      setEmail("");
      setUseCase("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="landing-shell">
      <header className="landing-nav">
        <a className="landing-brand" href="#top" aria-label="Cenured">
          <Logo />
          <span>Cenured</span>
        </a>
        <nav>
          <a href="#produto">{t.navProduct}</a>
          <a href="#modelos">{t.navModels}</a>
          <a href="#seguranca">{t.navSecurity}</a>
          <a href="/lista-espera">{t.navPanel}</a>
        </nav>
        <div className="landing-nav-actions">
          <button className="ghost-action" onClick={() => setLang(lang === "pt" ? "en" : "pt")}>{t.language}</button>
          <button className="dark-action" onClick={() => openModal()}>{t.tryNow}</button>
        </div>
      </header>

      <section className="landing-hero" id="top">
        <div className="hero-copy">
          <span className="hero-badge"><IconSpark />{t.badge}</span>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>
          <div className="hero-search" onClick={() => openModal()}>
            <span>{t.placeholder}</span>
            <button aria-label={t.mainCta}><IconArrow /></button>
          </div>
          <div className="hero-actions">
            <button className="dark-action big" onClick={() => openModal()}>{t.mainCta}</button>
            <a className="light-action big" href="/lista-espera">{t.secondaryCta}</a>
          </div>
          <small>{t.trusted}</small>
        </div>
        <div className="hero-panel" aria-hidden="true">
          <div className="panel-topline">
            <Logo small />
            <span>{selectedModelName}</span>
            <i />
          </div>
          <div className="panel-card wide" />
          <div className="panel-grid">
            <div className="panel-card" />
            <div className="panel-card" />
            <div className="panel-card" />
            <div className="panel-card" />
          </div>
        </div>
      </section>

      <section className="brand-strip" aria-label="logos">
        {appNames.slice(0, 8).map(name => <span key={name}>{name}</span>)}
      </section>

      <section id="produto" className="platform-section">
        <div className="section-title-row"><span>{t.platformTitle}</span><Logo small /></div>
        <div className="feature-mosaic">
          <article>
            <h3>{t.featureOne}</h3>
            <p>{t.featureOneText}</p>
          </article>
          <article>
            <h3>{t.featureTwo}</h3>
            <p>{t.featureTwoText}</p>
          </article>
          <article>
            <h3>{t.featureThree}</h3>
            <p>{t.featureThreeText}</p>
          </article>
        </div>
      </section>

      <section className="metrics-section">
        <h2>{t.metricsTitle}</h2>
        <div className="metrics-grid">
          <div><strong>64%</strong><span>{t.metricA}</span></div>
          <div><strong>68%</strong><span>{t.metricB}</span></div>
          <div><strong>76%</strong><span>{t.metricC}</span></div>
        </div>
      </section>

      <section id="modelos" className="models-section">
        <div>
          <h2>{t.appsTitle}</h2>
          <p>{lang === "pt" ? "Selecione uma experiência antes de entrar na lista de espera." : "Select an experience before joining the waitlist."}</p>
        </div>
        <div className="model-grid">
          {models.map(model => (
            <button key={model.key} className="model-card" onClick={() => openModal(model)}>
              <strong>{lang === "pt" ? model.pt : model.en}</strong>
              <span>{lang === "pt" ? model.textPt : model.textEn}</span>
              <IconArrow />
            </button>
          ))}
        </div>
      </section>

      <section id="seguranca" className="private-section">
        <div>
          <span>Open Source</span>
          <h2>{t.openTitle}</h2>
          <p>{t.openText}</p>
          <button className="light-on-dark" onClick={() => openModal()}>{t.tryNow}</button>
        </div>
        <div className="wire-cube"><Logo /></div>
      </section>

      <section className="usecase-section">
        <h2>{t.useCasesTitle}</h2>
        <div className="usecase-grid">
          <article><h3>{t.useSales}</h3><p>{t.useSalesText}</p></article>
          <article><h3>{t.useCompany}</h3><p>{t.useCompanyText}</p></article>
          <article><h3>{t.useEngineering}</h3><p>{t.useEngineeringText}</p></article>
        </div>
      </section>

      <section className="final-cta">
        <h2>{t.finalTitle}</h2>
        <p>{t.finalText}</p>
        <button className="dark-action big" onClick={() => openModal()}>{t.tryNow}</button>
      </section>

      <footer className="landing-footer">
        <div><Logo small /><span>Cenured</span></div>
        <nav>
          <span>{t.footerProduct}</span>
          <span>{t.footerResources}</span>
          <span>{t.footerCompany}</span>
        </nav>
      </footer>

      {modalOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="waitlist-modal">
            <button className="modal-close" onClick={() => setModalOpen(false)} aria-label={t.close}>×</button>
            <Logo />
            <h2>{t.modalTitle}</h2>
            <p>{t.modalText}</p>
            <div className="selected-model"><span>{t.selected}</span><strong>{selectedModelName}</strong></div>
            <form onSubmit={handleSubmit}>
              <label>
                {t.emailLabel}
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="voce@email.com" required />
              </label>
              <label>
                {t.useCaseLabel}
                <textarea value={useCase} onChange={e => setUseCase(e.target.value)} placeholder={t.useCasePlaceholder} />
              </label>
              <button className="dark-action big" type="submit" disabled={status === "loading"}>
                {status === "loading" ? "..." : t.submit}
              </button>
            </form>
            {status === "success" && <div className="form-success">{t.success}</div>}
            {status === "error" && <div className="form-error">{t.error}</div>}
          </div>
        </div>
      )}
    </main>
  );
}
