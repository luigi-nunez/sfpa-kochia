import { T } from "../data/translations.js";

const CARDS = [
  { tab: "resources", icon: "📖", descKey: "heroTitle" },
  { tab: "tools",     icon: "🩺", descKey: "toolsIntro" },
  { tab: "faq",       icon: "💬", descKey: "disclaimer" },
  { tab: "facilities",icon: "📍", descKey: "searchPlaceholder" },
];

const CARD_DESCS = {
  en: {
    resources:  "Articles and videos on family planning, STIs, maternal health, and more.",
    tools:      "Quick self-check tools for contraception, pregnancy, and STI guidance.",
    faq:        "Answers to common questions about SFPA services and reproductive health.",
    facilities: "Find your nearest SFPA clinic and get in touch directly.",
  },
  ar: {
    resources:  "مقالات وفيديوهات حول تنظيم الأسرة والأمراض الجنسية وصحة الأم والمزيد.",
    tools:      "أدوات فحص ذاتي سريعة لمنع الحمل والحمل وإرشادات الأمراض الجنسية.",
    faq:        "إجابات على الأسئلة الشائعة حول خدمات الجمعية والصحة الإنجابية.",
    facilities: "ابحث عن أقرب عيادة للجمعية وتواصل مباشرة.",
  },
};

export default function Home({ lang, setTab }) {
  const t = T[lang];
  const descs = CARD_DESCS[lang];

  return (
    <div>
      {/* Hero */}
      <section className="home-hero">
        <div className="hero-badge">🔒 {t.heroBadge}</div>
        <h1>{t.heroTitle}</h1>
        <p className="hero-sub">{t.heroSub}</p>
        <div className="hero-sfpa-tag">
          <span className="sfpa-dot" />
          <span className="sfpa-tagline">{t.sfpaTagline}</span>
        </div>
      </section>

      {/* Confidentiality banner */}
      <div className="home-banner" role="note">
        <span className="banner-icon">🔐</span>
        <span className="banner-text">{t.heroBannerText}</span>
      </div>

      {/* Navigation cards */}
      <div className="home-grid">
        {CARDS.map(({ tab, icon }) => (
          <button
            key={tab}
            className="nav-card"
            onClick={() => setTab(tab)}
            aria-label={t.nav[tab]}
          >
            <div className="card-icon" aria-hidden="true">{icon}</div>
            <h3>{t.nav[tab]}</h3>
            <p>{descs[tab]}</p>
          </button>
        ))}
      </div>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "16px 16px 8px", fontSize: "11px", color: "var(--grey-400)" }}>
        {t.footerText}
      </footer>
    </div>
  );
}
