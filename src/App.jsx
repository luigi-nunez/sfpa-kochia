import { useState, useEffect } from 'react';
import SFPALogo from './components/SFPALogo.jsx';
import HomeView from './components/HomeView.jsx';
import ResourcesView from './components/ResourcesView.jsx';
import ToolsView from './components/ToolsView.jsx';
import FAQView from './components/FAQView.jsx';
import FacilitiesView from './components/FacilitiesView.jsx';
import ServicesView from './components/ServicesView.jsx';
import { T } from './data/translations.js';
import { WA_NUMBER } from './config.js';

const NAV_ITEMS = [
  { id: 'home', icon: '🏠' },
  { id: 'resources', icon: '📚' },
  { id: 'tools', icon: '🔧' },
  { id: 'faq', icon: '💬' },
  { id: 'facilities', icon: '📍' },
  { id: 'services', icon: '💊' },
];

export default function App() {
  const [lang, setLang] = useState('ar');
  const [tab, setTab] = useState('home');

  // Apply dir/lang to root
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.className = lang;
  }, [lang]);

  function toggleLang() {
    setLang((l) => (l === 'ar' ? 'en' : 'ar'));
  }

  const t = T[lang];

  function renderView() {
    switch (tab) {
      case 'home': return <HomeView lang={lang} setTab={setTab} />;
      case 'resources': return <ResourcesView lang={lang} />;
      case 'tools': return <ToolsView lang={lang} />;
      case 'faq': return <FAQView lang={lang} />;
      case 'facilities': return <FacilitiesView lang={lang} />;
      case 'services': return <ServicesView lang={lang} />;
      default: return <HomeView lang={lang} setTab={setTab} />;
    }
  }

  return (
    <div className="shell">
      {/* ── Desktop nav ── */}
      <nav className="nav-d" aria-label="Main navigation">
        <div className="brand">
          <div className="bmark">
            <SFPALogo size={28} />
          </div>
          <span className="bname">{t.appName}</span>
        </div>
        <div className="nav-links">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-link${tab === item.id ? ' act' : ''}`}
              onClick={() => setTab(item.id)}
            >
              {t.nav[item.id]}
            </button>
          ))}
        </div>
        <button className="lang-btn" onClick={toggleLang} aria-label="Switch language">
          {lang === 'ar' ? 'EN' : 'عربي'}
        </button>
      </nav>

      {/* ── Mobile top bar ── */}
      <header className="nav-mt" aria-label="App header">
        <div className="mbrand">
          <div className="mdot">
            <SFPALogo size={22} />
          </div>
          <span>{t.appName}</span>
        </div>
        <button className="lang-btn" onClick={toggleLang} aria-label="Switch language">
          {lang === 'ar' ? 'EN' : 'عربي'}
        </button>
      </header>

      {/* ── Main content ── */}
      <main className="main" id="main-content">
        {renderView()}
      </main>

      {/* ── Mobile bottom nav ── */}
      <nav className="nav-mb" aria-label="Bottom navigation">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`bnav-item${tab === item.id ? ' act' : ''}`}
            onClick={() => setTab(item.id)}
            aria-current={tab === item.id ? 'page' : undefined}
          >
            <span className="bicon">{item.icon}</span>
            <span className="blabel">{t.nav[item.id]}</span>
          </button>
        ))}
      </nav>

      {/* ── WhatsApp FAB ── */}
      {WA_NUMBER && (
        <a
          className="wafab"
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t.waMsg)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <svg viewBox="0 0 24 24" width="26" height="26" fill="#fff" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
      )}
    </div>
  );
}
