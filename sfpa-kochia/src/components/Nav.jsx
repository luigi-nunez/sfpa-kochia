import { T } from "../data/translations.js";

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect width="28" height="28" rx="7" fill="rgba(255,255,255,0.2)" />
      <ellipse cx="14" cy="11" rx="5" ry="7" fill="none" stroke="white" strokeWidth="2" />
      <ellipse cx="14" cy="17" rx="5" ry="5" fill="rgba(204,34,0,0.85)" />
      <circle cx="14" cy="14" r="2" fill="white" />
    </svg>
  );
}

const TABS = [
  { id: "home",       icon: "🏠" },
  { id: "resources",  icon: "📖" },
  { id: "tools",      icon: "🩺" },
  { id: "faq",        icon: "💬" },
  { id: "facilities", icon: "📍" },
];

export default function Nav({ tab, setTab, lang, setLang }) {
  const t = T[lang];
  const ariaLabel = lang === "ar" ? "Switch to English" : "التبديل إلى العربية";

  return (
    <>
      <div className="nav-top">
        <div className="nav-logo">
          <LogoMark />
          <span>{t.appName}</span>
        </div>
        <button
          className="lang-btn"
          onClick={() => setLang(lang === "en" ? "ar" : "en")}
          aria-label={ariaLabel}
        >
          {lang === "en" ? "العربية" : "English"}
        </button>
      </div>
      <nav className="nav-bottom" aria-label="Main navigation">
        {TABS.map(({ id, icon }) => (
          <button
            key={id}
            className={`tab-btn${tab === id ? " active" : ""}`}
            onClick={() => setTab(id)}
            aria-current={tab === id ? "page" : undefined}
            aria-label={t.nav[id]}
          >
            <span className="tab-icon" aria-hidden="true">{icon}</span>
            <span className="tab-label">{t.nav[id]}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
