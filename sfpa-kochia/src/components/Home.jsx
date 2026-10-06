import { WA_NUMBER, CALL_CENTRE_NUMBER, waUrl, isPlaceholder } from "../config.js";
import { T } from "../data/translations.js";

const CARDS = [
  { tab: "resources",  icon: "📖" },
  { tab: "tools",      icon: "🩺" },
  { tab: "faq",        icon: "💬" },
  { tab: "facilities", icon: "📍" },
];

export default function Home({ lang, setTab }) {
  const t = T[lang];
  const callPh = isPlaceholder(CALL_CENTRE_NUMBER);
  const waPh   = isPlaceholder(WA_NUMBER);

  return (
    <div>
      <section className="hero">
        <div className="hero-badge">🔒 {t.heroBadge}</div>
        <h1>{t.heroTitle}</h1>
        <p className="hero-sub">{t.heroSub}</p>
        <div className="hero-conf">
          <span className="hero-conf-icon" aria-hidden="true">🔐</span>
          <span>{t.heroConfidentiality}</span>
        </div>
      </section>

      <div className="get-support" role="complementary" aria-label={t.getSupportTitle}>
        <div className="get-support-title">{t.getSupportTitle}</div>
        <div className="support-actions">
          {waPh
            ? <button className="support-btn" disabled style={{ opacity: 0.55, cursor: "default" }}
                aria-label={`${t.getSupportWA} — ${t.getSupportPlaceholder}`}>
                <div className="support-btn-icon wa" aria-hidden="true">💬</div>
                <div className="support-btn-label">{t.getSupportWA}</div>
                <span className="support-btn-arrow" aria-hidden="true">›</span>
              </button>
            : <a className="support-btn" href={waUrl(lang)} target="_blank" rel="noopener noreferrer"
                aria-label={t.getSupportWA}>
                <div className="support-btn-icon wa" aria-hidden="true">💬</div>
                <div className="support-btn-label">{t.getSupportWA}</div>
                <span className="support-btn-arrow" aria-hidden="true">›</span>
              </a>
          }
          {callPh
            ? <button className="support-btn" disabled style={{ opacity: 0.55, cursor: "default" }}
                aria-label={`${t.getSupportCall} — ${t.getSupportPlaceholder}`}>
                <div className="support-btn-icon call" aria-hidden="true">📞</div>
                <div className="support-btn-label">{t.getSupportCall}</div>
                <span className="support-btn-arrow" aria-hidden="true">›</span>
              </button>
            : <a className="support-btn" href={`tel:+${CALL_CENTRE_NUMBER}`}
                aria-label={t.getSupportCall}>
                <div className="support-btn-icon call" aria-hidden="true">📞</div>
                <div className="support-btn-label">{t.getSupportCall}</div>
                <span className="support-btn-arrow" aria-hidden="true">›</span>
              </a>
          }
          <button className="support-btn" onClick={() => setTab("facilities")} aria-label={t.getSupportClinic}>
            <div className="support-btn-icon loc" aria-hidden="true">📍</div>
            <div className="support-btn-label">{t.getSupportClinic}</div>
            <span className="support-btn-arrow" aria-hidden="true">›</span>
          </button>
        </div>
        {(waPh || callPh) && <div className="support-placeholder">{t.getSupportPlaceholder}</div>}
      </div>

      <div className="home-grid" role="navigation" aria-label="Main sections">
        {CARDS.map(({ tab, icon }) => (
          <button key={tab} className="nav-card" onClick={() => setTab(tab)}
            aria-label={`${t.nav[tab]}: ${t.cardDescs[tab]}`}>
            <div className="card-icon" aria-hidden="true">{icon}</div>
            <h3>{t.nav[tab]}</h3>
            <p>{t.cardDescs[tab]}</p>
          </button>
        ))}
      </div>

      <div className="home-footer" aria-label="Footer">{t.footer}</div>
    </div>
  );
}
