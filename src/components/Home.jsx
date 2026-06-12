export default function Home({ lang, t, setTab }) {
  const cards = [
    { tab: "resources",  emoji: "📚", label: t.nav.resources  },
    { tab: "tools",      emoji: "🔧", label: t.nav.tools      },
    { tab: "faq",        emoji: "💬", label: t.nav.faq        },
    { tab: "facilities", emoji: "📍", label: t.nav.facilities },
  ];

  return (
    <div>
      <div className="hero">
        <div className="hero-badge">{t.hero.badge}</div>
        <h1 className="hero-title">{t.hero.title}</h1>
        <p className="hero-sub">{t.hero.sub}</p>
        {/* 4 cards on mobile (2×2), full row on wider screens */}
        <div className="hero-grid" style={{ gridTemplateColumns: "repeat(2,1fr)", maxWidth: 320 }}>
          {cards.map(c => (
            <button
              key={c.tab}
              className="hero-card"
              onClick={() => setTab(c.tab)}
              style={{ padding: "18px 10px 14px" }}
            >
              <span className="hero-card-icon">{c.emoji}</span>
              <span className="hero-card-label">{c.label}</span>
            </button>
          ))}
        </div>
        <div className="info-callout">
          <span style={{ fontSize: 20 }}>🌐</span>
          <span className="info-callout-txt">{t.offlineNote}</span>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-logo">{t.appName} — {t.orgName}</div>
        <div>{t.footerLine1}</div>
        <div>{t.footerLine2}</div>
        <div className="footer-links">
          <a href="#" className="footer-link">{t.privacy}</a>
          <a href="#" className="footer-link">{t.about}</a>
        </div>
      </footer>
    </div>
  );
}
