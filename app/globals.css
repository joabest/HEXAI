* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
  background: #f7f7f5;
  color: #111;
  min-height: 100vh;
}
a { color: inherit; text-decoration: none; }
button, input, textarea, select { font: inherit; }
button { cursor: pointer; }

:root {
  --purple: #7c3aed;
  --purple-dark: #5b21b6;
  --black: #050505;
  --soft-black: #111;
  --line: #e8e8e2;
  --muted: #777;
}

.brand-logo,
.logo-mark {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: inline-grid;
  place-items: center;
  background: linear-gradient(135deg, #8b5cf6, #4c1d95);
  color: #fff;
  font-weight: 800;
  letter-spacing: -0.08em;
  box-shadow: 0 14px 34px rgba(124, 58, 237, .28);
  flex: 0 0 auto;
}
.brand-logo span,
.logo-mark span { transform: translateX(-1px); }
.brand-logo.small,
.logo-mark.small { width: 26px; height: 26px; border-radius: 8px; font-size: 12px; box-shadow: none; }

/* LANDING */
.landing-shell { background: #f7f7f5; color: #111; min-height: 100vh; overflow: hidden; }
.landing-nav {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  border-bottom: 1px solid rgba(0,0,0,.06);
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(247,247,245,.88);
  backdrop-filter: blur(16px);
}
.landing-brand { display: flex; align-items: center; gap: 10px; font-weight: 700; letter-spacing: -.03em; }
.landing-nav nav { display: flex; align-items: center; gap: 28px; font-size: 13px; color: #3d3d3d; }
.landing-nav nav a:hover { color: #000; }
.landing-nav-actions { display: flex; align-items: center; gap: 8px; }
.ghost-action,
.dark-action,
.light-action,
.light-on-dark {
  border: 1px solid transparent;
  border-radius: 999px;
  padding: 9px 15px;
  font-weight: 650;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: transform .18s, box-shadow .18s, background .18s, color .18s, border-color .18s;
}
.ghost-action { background: #fff; border-color: #e9e9e4; color: #333; }
.dark-action { background: #050505; color: #fff; border-color: #050505; }
.light-action { background: #fff; color: #111; border-color: #e9e9e4; }
.light-on-dark { background: #fff; color: #050505; border-color: #fff; margin-top: 18px; }
.big { padding: 12px 20px; font-size: 14px; }
.ghost-action:hover,
.dark-action:hover,
.light-action:hover,
.light-on-dark:hover { transform: translateY(-1px); box-shadow: 0 14px 32px rgba(0,0,0,.11); }
.dark-action:disabled { opacity: .6; cursor: wait; transform: none; }

.landing-hero {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 68px 0 40px;
  min-height: 650px;
  display: grid;
  grid-template-columns: minmax(0, 1.04fr) minmax(340px, .96fr);
  gap: 58px;
  align-items: center;
}
.hero-copy { display: flex; flex-direction: column; align-items: flex-start; gap: 20px; }
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid #e6e6df;
  background: #fff;
  border-radius: 999px;
  color: #454545;
  font-size: 13px;
}
.hero-copy h1 {
  font-size: clamp(44px, 6vw, 82px);
  line-height: .92;
  letter-spacing: -.07em;
  max-width: 790px;
}
.hero-copy p { max-width: 640px; color: #5d5d59; font-size: 18px; line-height: 1.65; }
.hero-search {
  width: min(660px, 100%);
  min-height: 68px;
  background: #fff;
  border: 1px solid #e1e1db;
  border-radius: 18px;
  box-shadow: 0 24px 70px rgba(0,0,0,.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 10px 22px;
  color: #9a9a92;
  cursor: text;
}
.hero-search button { width: 48px; height: 48px; border-radius: 14px; border: 0; background: #050505; color: #fff; display: grid; place-items: center; }
.hero-actions { display: flex; align-items: center; gap: 10px; }
.hero-copy small { color: #999; }
.hero-panel {
  min-height: 490px;
  border-radius: 28px;
  background: #fff;
  border: 1px solid #e7e7e1;
  box-shadow: 0 40px 90px rgba(15, 15, 15, .12);
  padding: 22px;
  position: relative;
  overflow: hidden;
}
.hero-panel::before {
  content: "";
  position: absolute;
  inset: -50px -20px auto auto;
  width: 220px;
  height: 220px;
  background: rgba(124, 58, 237, .15);
  filter: blur(40px);
  border-radius: 999px;
}
.panel-topline { display: flex; align-items: center; gap: 12px; font-weight: 650; color: #111; position: relative; z-index: 1; }
.panel-topline i { margin-left: auto; width: 12px; height: 12px; border-radius: 50%; background: #22c55e; }
.panel-card { background: #f5f5f2; border: 1px solid #ededeb; border-radius: 18px; min-height: 120px; position: relative; overflow: hidden; }
.panel-card::after { content: ""; position: absolute; left: 18px; right: 18px; top: 28px; height: 12px; border-radius: 999px; background: #deded8; box-shadow: 0 28px 0 #e8e8e4, 0 56px 0 #eeeeea; }
.panel-card.wide { min-height: 166px; margin: 24px 0 14px; background: #0b0b0d; border-color: #17171a; }
.panel-card.wide::after { background: #2c2c35; box-shadow: 0 28px 0 #1e1e25, 0 56px 0 #18181e; }
.panel-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }

.brand-strip { width: min(1180px, calc(100% - 32px)); margin: 0 auto; padding: 20px 0 42px; display: grid; grid-template-columns: repeat(8, 1fr); gap: 18px; align-items: center; color: #8d8d87; font-size: 12px; border-bottom: 1px solid #ecece8; }
.brand-strip span { text-align: center; font-weight: 700; letter-spacing: .01em; }
.platform-section,
.metrics-section,
.models-section,
.usecase-section,
.final-cta { width: min(1180px, calc(100% - 32px)); margin: 0 auto; padding: 76px 0; }
.section-title-row { display: flex; align-items: center; justify-content: space-between; font-size: 24px; font-weight: 750; letter-spacing: -.04em; margin-bottom: 22px; }
.feature-mosaic { display: grid; grid-template-columns: 1.1fr 1fr 1fr; gap: 14px; }
.feature-mosaic article,
.usecase-grid article {
  min-height: 210px;
  background: #fff;
  border: 1px solid #e6e6e0;
  border-radius: 22px;
  padding: 26px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.feature-mosaic article:first-child { min-height: 280px; background: #fdfdfb; }
.feature-mosaic h3,
.usecase-grid h3 { font-size: 20px; letter-spacing: -.04em; margin-bottom: 10px; }
.feature-mosaic p,
.usecase-grid p { color: #666; line-height: 1.6; font-size: 14px; }
.metrics-section h2,
.models-section h2,
.usecase-section h2,
.final-cta h2 { font-size: clamp(32px, 4vw, 54px); letter-spacing: -.06em; line-height: 1; max-width: 640px; }
.metrics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 34px; }
.metrics-grid div { background: #fff; border: 1px solid #e7e7e1; border-radius: 22px; padding: 26px; display: flex; align-items: center; justify-content: space-between; }
.metrics-grid strong { font-size: 42px; letter-spacing: -.06em; }
.metrics-grid span { color: #777; }
.models-section { display: grid; grid-template-columns: .72fr 1.28fr; gap: 36px; align-items: start; }
.models-section p { color: #666; margin-top: 16px; line-height: 1.6; }
.model-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
.model-card { background: #fff; border: 1px solid #e5e5df; min-height: 154px; border-radius: 22px; padding: 22px; text-align: left; display: flex; flex-direction: column; gap: 10px; color: #111; transition: transform .18s, box-shadow .18s; }
.model-card:hover { transform: translateY(-2px); box-shadow: 0 20px 48px rgba(0,0,0,.08); }
.model-card strong { font-size: 18px; }
.model-card span { color: #666; line-height: 1.5; flex: 1; }
.model-card svg { align-self: flex-end; }
.private-section { background: #030303; color: #fff; padding: 78px max(16px, calc((100vw - 1180px)/2)); display: grid; grid-template-columns: .8fr 1.2fr; gap: 40px; align-items: center; }
.private-section span { color: #bdbdbd; font-size: 13px; }
.private-section h2 { margin: 10px 0 14px; font-size: clamp(34px, 4vw, 56px); letter-spacing: -.06em; line-height: .96; }
.private-section p { color: #bfbfbf; max-width: 480px; line-height: 1.7; }
.wire-cube { min-height: 330px; border: 1px solid rgba(255,255,255,.1); background-image: linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px); background-size: 34px 34px; border-radius: 24px; display: grid; place-items: center; }
.wire-cube .brand-logo { width: 94px; height: 94px; border-radius: 26px; }
.usecase-grid { margin-top: 28px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.final-cta { text-align: center; display: flex; align-items: center; flex-direction: column; gap: 18px; }
.final-cta p { color: #666; line-height: 1.6; max-width: 600px; }
.landing-footer { background: #030303; color: #fff; padding: 38px max(16px, calc((100vw - 1180px)/2)); display: flex; align-items: center; justify-content: space-between; gap: 20px; }
.landing-footer div { display: flex; align-items: center; gap: 10px; font-weight: 700; }
.landing-footer nav { display: flex; gap: 30px; color: #aaa; font-size: 13px; }
.modal-backdrop { position: fixed; inset: 0; z-index: 80; background: rgba(0,0,0,.5); display: grid; place-items: center; padding: 18px; }
.waitlist-modal { width: min(470px, 100%); background: #fff; color: #111; border-radius: 28px; padding: 28px; position: relative; box-shadow: 0 30px 90px rgba(0,0,0,.28); }
.modal-close { position: absolute; top: 18px; right: 18px; width: 34px; height: 34px; border: 1px solid #e9e9e4; border-radius: 50%; background: #fff; font-size: 22px; }
.waitlist-modal h2 { margin-top: 18px; font-size: 28px; letter-spacing: -.05em; }
.waitlist-modal p { margin: 10px 0 18px; color: #666; line-height: 1.6; }
.selected-model { display: flex; align-items: center; justify-content: space-between; gap: 12px; background: #f5f5f2; border: 1px solid #e8e8e1; border-radius: 16px; padding: 13px; margin-bottom: 16px; }
.selected-model span { color: #777; font-size: 12px; }
.waitlist-modal form { display: flex; flex-direction: column; gap: 14px; }
.waitlist-modal label { display: flex; flex-direction: column; gap: 8px; font-size: 13px; color: #444; font-weight: 650; }
.waitlist-modal input,
.waitlist-modal textarea { width: 100%; border: 1px solid #deded7; border-radius: 14px; padding: 13px 14px; background: #fff; outline: none; color: #111; }
.waitlist-modal textarea { min-height: 96px; resize: vertical; }
.waitlist-modal input:focus,
.waitlist-modal textarea:focus { border-color: var(--purple); box-shadow: 0 0 0 4px rgba(124,58,237,.11); }
.form-success,
.form-error { margin-top: 14px; border-radius: 14px; padding: 12px; font-size: 13px; }
.form-success { background: #ecfdf5; color: #047857; border: 1px solid #bbf7d0; }
.form-error { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }

/* CHAT */
.chat-dark { --chat-bg: #0a0a0a; --chat-panel: #111; --chat-card: #161616; --chat-card-2: #1e1e1e; --chat-text: #ececec; --chat-muted: #888; --chat-faint: #444; --chat-line: #242424; --chat-input: #e0e0e0; --chat-send-bg: #fff; --chat-send-text: #050505; }
.chat-light { --chat-bg: #f5f5f3; --chat-panel: #fff; --chat-card: #fff; --chat-card-2: #f0f0ed; --chat-text: #111; --chat-muted: #666; --chat-faint: #999; --chat-line: #e4e4de; --chat-input: #222; --chat-send-bg: #111; --chat-send-text: #fff; }
.login-screen { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--chat-bg); color: var(--chat-text); gap: 22px; }
.login-card { background: var(--chat-card); border: 1px solid var(--chat-line); border-radius: 18px; padding: 34px 30px; width: min(390px, 92vw); display: flex; flex-direction: column; gap: 14px; }
.login-card h1 { font-size: 24px; font-weight: 680; letter-spacing: -.03em; }
.login-card p { color: var(--chat-muted); font-size: 14px; line-height: 1.5; }
.login-card input { background: var(--chat-card-2); border: 1px solid var(--chat-line); border-radius: 12px; padding: 12px 14px; color: var(--chat-text); outline: none; }
.login-card input:focus { border-color: var(--purple); }
.login-card button { background: var(--chat-send-bg); color: var(--chat-send-text); border: 0; border-radius: 12px; padding: 12px; font-weight: 700; }
.login-tools { display: flex; gap: 8px; }
.login-tools select { background: var(--chat-card); color: var(--chat-text); border: 1px solid var(--chat-line); border-radius: 999px; padding: 8px 12px; }
.shell { height: 100vh; display: flex; overflow: hidden; background: var(--chat-bg); color: var(--chat-text); }
.sidebar { background: var(--chat-panel); border-right: 1px solid var(--chat-line); display: flex; flex-direction: column; width: 56px; flex-shrink: 0; transition: width .2s ease; overflow: hidden; }
.sidebar.expanded { width: 270px; }
.sidebar-header { height: 56px; display: flex; align-items: center; gap: 10px; padding: 8px; border-bottom: 1px solid var(--chat-line); }
.sidebar .logo-mark { width: 34px; height: 34px; border-radius: 10px; }
.brand { font-weight: 700; font-size: 14px; opacity: 0; transition: opacity .14s; white-space: nowrap; }
.sidebar.expanded .brand { opacity: 1; }
.toggle-btn { margin-left: auto; background: transparent; border: 1px solid var(--chat-line); color: var(--chat-muted); border-radius: 10px; width: 34px; height: 34px; display: grid; place-items: center; flex-shrink: 0; }
.toggle-btn:hover { color: var(--chat-text); background: var(--chat-card-2); }
.new-chat-btn { margin: 10px 8px 4px; background: transparent; border: 1px solid var(--chat-line); color: var(--chat-muted); border-radius: 10px; padding: 9px 10px; height: 38px; display: flex; align-items: center; gap: 10px; white-space: nowrap; overflow: hidden; }
.new-chat-btn:hover { background: var(--chat-card-2); color: var(--chat-text); }
.btn-label, .ni-label { opacity: 0; transition: opacity .13s; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sidebar.expanded .btn-label, .sidebar.expanded .ni-label { opacity: 1; }
.sidebar-section-label { font-size: 10px; letter-spacing: .08em; color: var(--chat-faint); text-transform: uppercase; padding: 14px 12px 4px; opacity: 0; max-height: 0; transition: opacity .14s, max-height .2s; white-space: nowrap; }
.sidebar.expanded .sidebar-section-label { opacity: 1; max-height: 34px; }
.sidebar-nav { display: flex; flex-direction: column; gap: 2px; padding: 3px 8px; }
.conversation-list { overflow-y: auto; }
.nav-item { height: 38px; display: flex; align-items: center; gap: 10px; border: 0; width: 100%; background: transparent; color: var(--chat-muted); text-align: left; border-radius: 10px; padding: 9px 10px; font-size: 13px; overflow: hidden; }
.nav-item:hover { background: var(--chat-card-2); color: var(--chat-text); }
.nav-item.active { background: var(--chat-card-2); color: var(--chat-text); }
.nav-item svg { flex: 0 0 auto; }
.nav-item.muted { color: var(--chat-faint); cursor: default; }
.nav-item.muted:hover { background: transparent; color: var(--chat-faint); }
.sidebar-spacer { flex: 1; }
.sidebar-bottom { padding: 8px; border-top: 1px solid var(--chat-line); }
.workspace { flex: 1; background: var(--chat-bg); display: flex; flex-direction: column; overflow: hidden; }
.topbar { display: flex; align-items: center; gap: 8px; padding: 10px 18px; border-bottom: 1px solid var(--chat-line); height: 56px; flex-shrink: 0; }
.topbar-spacer { flex: 1; }
.select-pill { background: var(--chat-card); border: 1px solid var(--chat-line); border-radius: 999px; padding: 7px 10px 7px 13px; color: var(--chat-muted); font-size: 12px; display: flex; align-items: center; gap: 7px; position: relative; min-width: 154px; }
.select-pill.compact { min-width: 88px; }
.select-pill select { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; }
.select-pill:hover, .topbar-btn:hover { background: var(--chat-card-2); color: var(--chat-text); }
.topbar-btn { background: var(--chat-card); border: 1px solid var(--chat-line); border-radius: 999px; padding: 7px 12px; color: var(--chat-muted); font-size: 12px; display: flex; align-items: center; gap: 6px; }
.hero-area { flex: 1; overflow-y: auto; display: flex; flex-direction: column; align-items: center; padding: 56px 24px 32px; gap: 20px; }
.hero-area .logo-mark { width: 62px; height: 62px; border-radius: 18px; }
.hero-title { font-size: 29px; font-weight: 650; color: var(--chat-text); text-align: center; letter-spacing: -.04em; }
.quick-chips { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
.chip { background: var(--chat-card); border: 1px solid var(--chat-line); border-radius: 999px; padding: 8px 14px; color: var(--chat-muted); font-size: 12px; display: flex; align-items: center; gap: 6px; }
.chip:hover { background: var(--chat-card-2); color: var(--chat-text); }
.composer-wrap { width: 100%; max-width: 700px; }
.composer { background: var(--chat-card); border: 1px solid var(--chat-line); border-radius: 16px; overflow: hidden; }
.composer:focus-within { border-color: color-mix(in srgb, var(--purple), var(--chat-line)); }
.composer-top { position: relative; }
.composer-star { position: absolute; top: 15px; left: 15px; color: var(--purple); pointer-events: none; display: flex; }
.composer-input { width: 100%; min-height: 96px; background: transparent; border: 0; resize: none; padding: 16px 16px 12px 42px; color: var(--chat-input); font-size: 14px; outline: none; line-height: 1.55; }
.composer-input::placeholder { color: var(--chat-faint); }
.composer-bar { display: flex; align-items: center; gap: 2px; padding: 9px 11px; border-top: 1px solid var(--chat-line); }
.bar-btn { background: transparent; border: 0; color: var(--chat-faint); font-size: 12px; padding: 5px 8px; border-radius: 8px; display: flex; align-items: center; gap: 5px; }
.bar-btn:hover { color: var(--chat-muted); background: var(--chat-card-2); }
.bar-divider { width: 1px; height: 16px; background: var(--chat-line); margin: 0 2px; }
.composer-actions { margin-left: auto; display: flex; align-items: center; gap: 7px; }
.mic-btn, .send-btn { width: 32px; height: 32px; border-radius: 50%; display: grid; place-items: center; }
.mic-btn { background: var(--chat-card-2); border: 1px solid var(--chat-line); color: var(--chat-muted); }
.send-btn { background: var(--chat-send-bg); border: 0; color: var(--chat-send-text); }
.send-btn:disabled { opacity: .45; cursor: default; }
.feature-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; width: 100%; max-width: 700px; }
.feat-card { background: var(--chat-card); border: 1px solid var(--chat-line); border-radius: 14px; padding: 16px 14px; display: flex; flex-direction: column; gap: 10px; cursor: pointer; }
.feat-card:hover { background: var(--chat-card-2); }
.feat-card-top { display: flex; align-items: center; justify-content: space-between; }
.feat-icon { width: 30px; height: 30px; background: var(--chat-card-2); border-radius: 8px; display: grid; place-items: center; color: var(--chat-muted); }
.feat-tag { font-size: 10px; background: rgba(124,58,237,.13); color: #8b5cf6; border-radius: 6px; padding: 3px 7px; }
.feat-card strong { color: var(--chat-text); font-size: 13px; }
.feat-card p { color: var(--chat-faint); font-size: 12px; line-height: 1.5; }
.chat-area { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.chat-header-info { height: 48px; padding: 10px 22px; border-bottom: 1px solid var(--chat-line); display: flex; align-items: center; gap: 10px; color: var(--chat-muted); font-size: 13px; flex-shrink: 0; }
.chat-header-info .logo-mark { width: 26px; height: 26px; border-radius: 8px; font-size: 12px; }
.chat-header-info em { margin-left: auto; font-style: normal; color: var(--chat-faint); font-size: 12px; }
.chat-messages { flex: 1; overflow-y: auto; padding: 22px; display: flex; flex-direction: column; gap: 6px; max-width: 780px; width: 100%; margin: 0 auto; }
.bubble { padding: 12px 0; }
.bubble.user { padding: 10px 14px; background: var(--chat-card); border: 1px solid var(--chat-line); border-radius: 14px; align-self: flex-end; max-width: 78%; margin: 4px 0; }
.bubble.assistant { max-width: 92%; margin: 4px 0; }
.bubble-label { font-size: 10px; font-weight: 750; letter-spacing: .08em; color: var(--chat-faint); margin-bottom: 6px; text-transform: uppercase; }
.bubble.user .bubble-label { display: none; }
.bubble-text { white-space: pre-wrap; font-family: inherit; font-size: 14px; line-height: 1.75; color: var(--chat-text); }
.typing-dots { display: flex; gap: 4px; align-items: center; padding: 4px 0; }
.typing-dots span { width: 5px; height: 5px; background: var(--chat-faint); border-radius: 50%; animation: tdot 1.4s infinite; }
.typing-dots span:nth-child(2) { animation-delay: .2s; }
.typing-dots span:nth-child(3) { animation-delay: .4s; }
@keyframes tdot { 0%,80%,100% { opacity: .3; transform: scale(.8); } 40% { opacity: 1; transform: scale(1); } }
.chat-composer-wrap { padding: 10px 18px 16px; flex-shrink: 0; max-width: 780px; width: 100%; margin: 0 auto; }
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(124,124,124,.25); border-radius: 99px; }

/* ADMIN */
.admin-shell { min-height: 100vh; background: #f7f7f5; padding: 36px 16px; color: #111; }
.admin-login { width: min(420px, 100%); margin: 12vh auto 0; background: #fff; border: 1px solid #e5e5df; border-radius: 26px; padding: 30px; display: flex; flex-direction: column; gap: 14px; box-shadow: 0 26px 72px rgba(0,0,0,.08); }
.admin-login h1 { font-size: 28px; letter-spacing: -.05em; margin-top: 10px; }
.admin-login p { color: #666; line-height: 1.6; }
.admin-login input { border: 1px solid #deded7; border-radius: 14px; padding: 13px 14px; outline: none; }
.admin-login input:focus { border-color: var(--purple); box-shadow: 0 0 0 4px rgba(124,58,237,.11); }
.admin-login button,
.admin-actions button,
.danger-btn { border: 0; border-radius: 999px; padding: 10px 14px; font-weight: 700; }
.admin-login button,
.admin-actions button { background: #050505; color: #fff; }
.admin-login button:disabled,
.admin-actions button:disabled { opacity: .6; cursor: wait; }
.admin-panel { width: min(1180px, 100%); margin: 0 auto; background: #fff; border: 1px solid #e5e5df; border-radius: 30px; overflow: hidden; box-shadow: 0 26px 72px rgba(0,0,0,.08); }
.admin-header { padding: 30px; display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; border-bottom: 1px solid #eee; }
.admin-header span { display: inline-flex; align-items: center; gap: 8px; font-weight: 700; color: #666; }
.admin-header h1 { font-size: clamp(32px, 4vw, 50px); letter-spacing: -.06em; margin: 10px 0 8px; }
.admin-header p { color: #666; }
.admin-actions { display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }
.admin-toolbar { padding: 16px 30px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid #eee; }
.admin-toolbar input { flex: 1; min-width: 220px; border: 1px solid #deded7; border-radius: 999px; padding: 12px 16px; outline: none; }
.admin-toolbar a { color: #5b21b6; font-weight: 700; font-size: 13px; }
.waitlist-table-wrap { overflow-x: auto; }
.waitlist-table { width: 100%; border-collapse: collapse; min-width: 860px; }
.waitlist-table th, .waitlist-table td { padding: 16px 18px; border-bottom: 1px solid #eee; text-align: left; font-size: 14px; }
.waitlist-table th { color: #777; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; background: #fafaf8; }
.waitlist-table td { color: #222; }
.danger-btn { background: #fee2e2; color: #991b1b; }
.empty-cell { text-align: center !important; color: #888 !important; padding: 34px !important; }

@media (max-width: 860px) {
  .landing-nav nav { display: none; }
  .landing-hero { grid-template-columns: 1fr; padding-top: 42px; gap: 30px; }
  .hero-panel { min-height: 380px; }
  .brand-strip { grid-template-columns: repeat(4, 1fr); }
  .feature-mosaic, .models-section, .private-section, .usecase-grid { grid-template-columns: 1fr; }
  .metrics-grid, .model-grid { grid-template-columns: 1fr; }
  .landing-footer, .admin-header, .admin-toolbar { flex-direction: column; align-items: flex-start; }
  .admin-actions { justify-content: flex-start; }
  .topbar { overflow-x: auto; padding-right: 12px; }
  .topbar-btn span { display: none; }
}
@media (max-width: 640px) {
  .landing-nav { width: min(100% - 22px, 1180px); gap: 10px; }
  .landing-brand span { display: none; }
  .landing-nav-actions .ghost-action { display: none; }
  .landing-hero, .platform-section, .metrics-section, .models-section, .usecase-section, .final-cta, .brand-strip { width: min(100% - 22px, 1180px); }
  .hero-copy h1 { font-size: 42px; }
  .hero-copy p { font-size: 16px; }
  .hero-actions { flex-direction: column; align-items: stretch; width: 100%; }
  .hero-actions .big { width: 100%; }
  .feature-cards { grid-template-columns: 1fr; }
  .sidebar.expanded { width: min(270px, 82vw); }
  .bar-btn span { display: none; }
  .bubble.user { max-width: 90%; }
  .select-pill { min-width: 128px; }
}
