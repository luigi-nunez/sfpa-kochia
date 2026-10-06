import { T } from "../data/translations.js";

const TABS = [
  { id: "home",      icon: "🏠" },
  { id: "resources", icon: "📖" },
  { id: "tools",     icon: "🩺" },
  { id: "faq",       icon: "💬" },
  { id: "facilities",icon: "📍" },
];

// SFPA logo mark — simplified people figures + red circle (SVG inline)
function SfpaLogoMark() {
  return (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Red circle accent */}
      <circle cx="20" cy="6" r="5" fill="#CC2200" />
      {/* People figures */}
      <circle cx="8"  cy="10" r="3"   fill="#0D1F6E" />
      <circle cx="16" cy="10" r="3"   fill="#0D1F6E" />
      <path d="M3 22 Q5 15 8 15 Q11 15 13 22"  fill="#0D1F6E" />
      <path d="M11 22 Q13 15 16 15 Q19 15 21 22" fill="#0D1F6E" />
    </svg>
  );
}

export default function Nav({ tab, setTab, lang, onToggleLang }) {
  const t = T[lang];

  return (
    <>
      {/* Top bar */}
      <header className="nav-top">
        <div className="nav-logo">
          <div className="nav-logo-mark">
            <SfpaLogoMark />
          </div>
          <div className="nav-org">
            <span className="nav-org-en">SFPA · {t.appName}</span>
            <span className="nav-org-ar">{t.orgName}</span>
          </div>
        </div>
        <button
          className="nav-lang-btn"
          onClick={onToggleLang}
          aria-label="Switch language"
        >
          {lang === "ar" ? "EN" : "ع"}
        </button>
      </header>

      {/* Bottom tab bar */}
      <nav className="nav-bottom" aria-label="Main navigation">
        {TABS.map(({ id, icon }) => (
          <button
            key={id}
            className={`nav-tab${tab === id ? " active" : ""}`}
            onClick={() => setTab(id)}
            aria-current={tab === id ? "page" : undefined}
          >
            <span className="nav-icon" aria-hidden="true">{icon}</span>
            <span>{t.nav[id]}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
