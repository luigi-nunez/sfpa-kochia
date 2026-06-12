// Consolidated nav — 5 tabs on desktop/mobile (Resources replaces separate Info+Videos)
export default function Nav({ tab, setTab, lang, setLang, t }) {
  const NAV = [
    { id: "home",      label: t.nav.home,      emoji: "🏠" },
    { id: "resources", label: t.nav.resources, emoji: "📚" },
    { id: "tools",     label: t.nav.tools,     emoji: "🔧" },
    { id: "faq",       label: t.nav.faq,       emoji: "💬" },
    { id: "facilities",label: t.nav.facilities,emoji: "📍" },
  ];

  const Logo = () => (
    <div className="logo-wrap">
      <div className="logo-circle">K</div>
      <div>
        <div className="logo-name">{t.appName}</div>
        <div className="logo-sub">{t.orgName}</div>
      </div>
    </div>
  );

  const LangToggle = () => (
    <div className="lang-toggle">
      <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
      <button className={`lang-btn ${lang === "ar" ? "active" : ""}`} onClick={() => setLang("ar")}>عر</button>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <nav className="desktop-nav">
        <div className="desktop-nav-inner">
          <Logo />
          <div className="desktop-nav-tabs">
            {NAV.map(n => (
              <button
                key={n.id}
                className={`desk-tab ${tab === n.id ? "active" : ""}`}
                onClick={() => setTab(n.id)}
              >
                <span>{n.emoji}</span>{n.label}
              </button>
            ))}
          </div>
          <LangToggle />
        </div>
      </nav>

      {/* Mobile topbar */}
      <div className="mob-topbar">
        <Logo />
        <LangToggle />
      </div>

      {/* Mobile bottom nav */}
      <nav className="mobile-nav">
        {NAV.map(n => (
          <button
            key={n.id}
            className={`mob-btn ${tab === n.id ? "active" : ""}`}
            onClick={() => setTab(n.id)}
          >
            <span className="mob-icon">{n.emoji}</span>
            <span>{n.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
