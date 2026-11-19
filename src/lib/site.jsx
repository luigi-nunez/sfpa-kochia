import { createContext, useContext, useEffect, useState } from 'react';
import { UI } from '../data/ui.js';
import { SITE } from '../content/site.js';
import { waLink } from './i18n.js';
import { T } from '../data/translations.js';

const SiteContext = createContext(null);
const LANG_KEY = 'kochia-lang';

function initialLang() {
  try {
    const q = new URLSearchParams(window.location.search).get('lang');
    if (q === 'en' || q === 'ar') return q;
    const s = localStorage.getItem(LANG_KEY);
    if (s === 'en' || s === 'ar') return s;
  } catch { /* storage unavailable */ }
  return 'ar';
}

export function SiteProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.className = lang;
    try { localStorage.setItem(LANG_KEY, lang); } catch { /* ignore */ }
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === 'ar' ? 'en' : 'ar'));
  const wa = (text) => (SITE.whatsapp ? waLink(SITE.whatsapp, text ?? T[lang].waMsg) : null);

  return <SiteContext.Provider value={{ lang, t: UI[lang], toggleLang, wa }}>{children}</SiteContext.Provider>;
}

export const useSite = () => useContext(SiteContext);

// Install prompt for the PWA. Chrome/Edge/Android fire beforeinstallprompt; iOS Safari needs manual steps.
export function useInstall() {
  const [evt, setEvt] = useState(null);
  const [installed, setInstalled] = useState(() => window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true);
  useEffect(() => {
    const onPrompt = (e) => { e.preventDefault(); setEvt(e); };
    const onInstalled = () => { setInstalled(true); setEvt(null); };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => { window.removeEventListener('beforeinstallprompt', onPrompt); window.removeEventListener('appinstalled', onInstalled); };
  }, []);
  const isIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
  return {
    installed,
    canPrompt: !!evt,
    isIOS,
    install: async () => { if (!evt) return; evt.prompt(); await evt.userChoice; setEvt(null); },
  };
}
