import { useEffect } from 'react';
import { RouterProvider, useRouter, match } from './lib/router.jsx';
import { SiteProvider, useSite } from './lib/site.jsx';
import { VoiceProvider, useVoice } from './hooks/useVoice.jsx';
import useTheme from './hooks/useTheme.js';
import { Header, Footer, MobileBar, FloatingActions } from './components/site/Chrome.jsx';
import HomePage from './pages/HomePage.jsx';
import { ServicesPage, ServiceDetailPage } from './pages/ServicesPages.jsx';
import ClinicsPage from './pages/ClinicsPage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import { TelehealthPage, ProgrammesPage, NewsPage, NewsArticle, AboutPage, ContactPage, DonatePage, PrivacyPage } from './pages/InfoPages.jsx';
import NotFound from './pages/NotFound.jsx';
// Kochia's original content views, kept as-is under the Learn menu and the price list.
import ResourcesView from './components/ResourcesView.jsx';
import ToolsView from './components/ToolsView.jsx';
import FAQView from './components/FAQView.jsx';
import ServicesView from './components/ServicesView.jsx';

const TITLES = { en: 'SFPA Sudan', ar: 'جمعية تنظيم الأسرة السودانية' };

function Routes() {
  const { path } = useRouter();
  const { lang } = useSite();
  const voice = useVoice();
  useEffect(() => { voice.stop(); }, [path]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { document.title = TITLES[lang]; }, [lang]);

  let p;
  if (path === '/') return <HomePage />;
  if (path === '/about') return <AboutPage />;
  if (path === '/services') return <ServicesPage />;
  if (path === '/services/prices') return <ServicesView lang={lang} />;
  if ((p = match('/services/:slug', path))) return <ServiceDetailPage slug={p.slug} />;
  if (path === '/clinics') return <ClinicsPage />;
  if (path === '/book') return <BookingPage />;
  if (path === '/telehealth') return <TelehealthPage />;
  if (path === '/programmes') return <ProgrammesPage />;
  if (path === '/news') return <NewsPage />;
  if ((p = match('/news/:slug', path))) return <NewsArticle slug={p.slug} />;
  if (path === '/contact') return <ContactPage />;
  if (path === '/donate') return <DonatePage />;
  if (path === '/privacy') return <PrivacyPage />;
  if (path === '/learn') return <ResourcesView lang={lang} />;
  if (path === '/tools') return <ToolsView lang={lang} />;
  if (path === '/faq') return <FAQView lang={lang} />;
  return <NotFound />;
}

function Shell() {
  const [theme, toggleTheme] = useTheme();
  const { lang } = useSite();
  return (
    <VoiceProvider lang={lang}>
      <div className="shell">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main className="main" id="main-content" tabIndex={-1}>
          <Routes />
        </main>
        <Footer />
        <MobileBar />
        <FloatingActions />
      </div>
    </VoiceProvider>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <SiteProvider>
        <Shell />
      </SiteProvider>
    </RouterProvider>
  );
}
