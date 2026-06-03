* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, Arial, sans-serif;
  background: #0d0d12;
  color: #e8e8f0;
  min-height: 100vh;
}

/* ── LOGIN ── */
.login-screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at 50% 10%, #2a1060 0%, #0d0d12 70%);
  gap: 32px;
}

.login-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 24px;
  padding: 40px 36px;
  width: min(400px, 90vw);
  display: flex;
  flex-direction: column;
  gap: 14px;
  backdrop-filter: blur(12px);
}

.login-card h1 {
  font-size: 28px;
  font-weight: 600;
  color: #fff;
}

.login-card p {
  color: #888;
  font-size: 14px;
}

.login-card input {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 13px 16px;
  color: #fff;
  font-size: 15px;
  outline: none;
}

.login-card input:focus {
  border-color: #7c3aed;
}

.login-card button {
  background: #7c3aed;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 13px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.login-card button:hover { background: #6d28d9; }

/* ── SIRI ORB ── */
.siri-orb {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: radial-gradient(circle at 38% 30%, #c084fc, #7c3aed 50%, #4c1d95 80%, #1e0a4a);
  box-shadow:
    0 0 30px rgba(139, 92, 246, 0.5),
    0 0 60px rgba(109, 40, 217, 0.3),
    inset 0 1px 1px rgba(255,255,255,0.25);
  animation: siri-pulse 3s ease-in-out infinite, siri-glow 3s ease-in-out infinite;
  flex-shrink: 0;
}

.siri-orb.small {
  width: 32px;
  height: 32px;
}

@keyframes siri-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.07); }
}

@keyframes siri-glow {
  0%, 100% {
    box-shadow:
      0 0 30px rgba(139, 92, 246, 0.5),
      0 0 60px rgba(109, 40, 217, 0.3),
      inset 0 1px 1px rgba(255,255,255,0.25);
  }
  50% {
    box-shadow:
      0 0 50px rgba(167, 139, 250, 0.7),
      0 0 90px rgba(139, 92, 246, 0.45),
      inset 0 1px 1px rgba(255,255,255,0.3);
  }
}

/* ── SHELL ── */
.shell {
  height: 100vh;
  display: grid;
  grid-template-columns: 260px 1fr;
  overflow: hidden;
}

/* ── SIDEBAR ── */
.sidebar {
  background: #111118;
  border-right: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  overflow-y: auto;
  gap: 4px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 18px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  margin-bottom: 8px;
}

.logo-mark {
  width: 32px;
  height: 32px;
  background: #7c3aed;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 14px;
  color: #fff;
  flex-shrink: 0;
}

.brand {
  font-weight: 600;
  font-size: 15px;
  color: #e8e8f0;
}

.icon-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 16px;
  padding: 4px;
}

.new-chat-btn {
  margin: 0 12px 12px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  color: #ccc;
  padding: 10px 14px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s;
}

.new-chat-btn:hover { background: rgba(255,255,255,0.11); }

.sidebar-section-label {
  font-size: 11px;
  letter-spacing: 0.08em;
  color: #555;
  padding: 10px 18px 4px;
  text-transform: uppercase;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 8px;
}

.nav-item {
  display: block;
  padding: 9px 12px;
  border-radius: 9px;
  font-size: 13.5px;
  color: #aaa;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background 0.15s, color 0.15s;
}

.nav-item:hover {
  background: rgba(255,255,255,0.06);
  color: #ddd;
}

.nav-item.active {
  background: rgba(124, 58, 237, 0.18);
  color: #c4b5fd;
}

.nav-item.muted {
  color: #444;
  font-size: 12px;
  cursor: default;
}

.nav-item.conv-item {
  font-size: 13px;
}

.upgrade-card {
  margin: auto 12px 0;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  text-align: center;
}

.upgrade-icon {
  font-size: 22px;
  margin-bottom: 4px;
}

.upgrade-card strong {
  font-size: 13px;
  color: #ddd;
}

.upgrade-card p {
  font-size: 11px;
  color: #666;
  line-height: 1.5;
}

.upgrade-btn {
  background: rgba(124, 58, 237, 0.2);
  border: 1px solid rgba(124, 58, 237, 0.4);
  color: #c4b5fd;
  border-radius: 8px;
  padding: 8px 18px;
  font-size: 12px;
  cursor: pointer;
  margin-top: 4px;
  transition: background 0.2s;
}

.upgrade-btn:hover { background: rgba(124, 58, 237, 0.35); }

/* ── WORKSPACE ── */
.workspace {
  background: #0f0f18;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ── TOPBAR ── */
.topbar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  flex-shrink: 0;
}

.model-pill {
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 7px 14px;
  font-size: 13px;
  color: #ccc;
  cursor: pointer;
}

.topbar-btn {
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 7px 14px;
  font-size: 13px;
  color: #ccc;
  cursor: pointer;
  transition: background 0.2s;
}

.topbar-btn:hover { background: rgba(255,255,255,0.12); }

/* ── HERO AREA ── */
.hero-area {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 24px 30px;
  gap: 24px;
}

.hero-title {
  font-size: 36px;
  font-weight: 500;
  color: #f0f0ff;
  text-align: center;
  line-height: 1.25;
  max-width: 560px;
}

/* ── QUICK CHIPS ── */
.quick-chips {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.chip {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 13px;
  color: #ccc;
  cursor: pointer;
  transition: background 0.2s;
}

.chip:hover { background: rgba(255,255,255,0.11); }

/* ── COMPOSER ── */
.composer-wrap {
  width: 100%;
  max-width: 700px;
}

.composer {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}

.composer-star {
  position: absolute;
  top: 18px;
  left: 18px;
  color: #7c3aed;
  font-size: 18px;
  pointer-events: none;
}

.composer-input {
  width: 100%;
  min-height: 100px;
  background: transparent;
  border: none;
  resize: none;
  padding: 18px 18px 14px 46px;
  color: #e0e0ee;
  font-size: 15px;
  outline: none;
  font-family: inherit;
  line-height: 1.5;
}

.composer-input::placeholder { color: #444; }

.composer-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border-top: 1px solid rgba(255,255,255,0.06);
}

.bar-btn {
  background: none;
  border: none;
  color: #666;
  font-size: 13px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: color 0.15s;
}

.bar-btn:hover { color: #aaa; }

.divider { color: #333; }

.mic-btn {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  cursor: pointer;
  font-size: 15px;
  color: #aaa;
}

.send-btn {
  background: #7c3aed;
  border: none;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  cursor: pointer;
  color: #fff;
  font-size: 17px;
  font-weight: 700;
  transition: background 0.2s;
}

.send-btn:hover:not(:disabled) { background: #6d28d9; }
.send-btn:disabled { opacity: 0.5; cursor: default; }

/* ── FEATURE CARDS ── */
.feature-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  width: 100%;
  max-width: 700px;
}

.feat-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.feat-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
}

.feat-tag {
  font-size: 10px;
  background: rgba(124, 58, 237, 0.25);
  color: #c4b5fd;
  border-radius: 6px;
  padding: 3px 8px;
  font-weight: 500;
}

.feat-card strong {
  font-size: 13.5px;
  color: #ddd;
}

.feat-card p {
  font-size: 12px;
  color: #666;
  line-height: 1.5;
}

/* ── CHAT AREA ── */
.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 28px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  font-size: 14px;
  color: #888;
  flex-shrink: 0;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.bubble {
  max-width: 700px;
  border-radius: 14px;
  padding: 16px 18px;
}

.bubble.user {
  background: rgba(124, 58, 237, 0.12);
  border: 1px solid rgba(124, 58, 237, 0.2);
  align-self: flex-end;
}

.bubble.assistant {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  align-self: flex-start;
}

.bubble-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #555;
  margin-bottom: 6px;
  text-transform: uppercase;
}

.bubble-text {
  white-space: pre-wrap;
  font-family: inherit;
  font-size: 14.5px;
  line-height: 1.65;
  color: #ddd;
}

.typing-dots {
  display: flex;
  gap: 5px;
  align-items: center;
  height: 20px;
}

.typing-dots span {
  width: 7px;
  height: 7px;
  background: #7c3aed;
  border-radius: 50%;
  animation: bounce 1.2s infinite;
}

.typing-dots span:nth-child(2) { animation-delay: 0.2s; }
.typing-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}

.chat-composer {
  padding: 16px 24px 20px;
  flex-shrink: 0;
  border-top: 1px solid rgba(255,255,255,0.05);
}

/* ── SCROLLBAR ── */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #2a2a3a; border-radius: 4px; }

@media (max-width: 768px) {
  .shell { grid-template-columns: 1fr; }
  .sidebar { display: none; }
  .feature-cards { grid-template-columns: 1fr; }
  .hero-title { font-size: 26px; }
}
