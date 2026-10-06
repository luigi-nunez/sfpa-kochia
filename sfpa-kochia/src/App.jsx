import "./styles.css";
import useLang from "./hooks/useLang.js";
import T from "./data/translations.js";
import { WA_NUMBER } from "./data/facilities.js";
import { useState } from "react";

import Nav        from "./components/Nav.jsx";
import Home       from "./components/Home.jsx";
import Resources  from "./components/Resources.jsx";
import Tools      from "./components/Tools.jsx";
import FAQ        from "./components/FAQ.jsx";
import Facilities from "./components/Facilities.jsx";

export default function App() {
  const [lang, setLang] = useLang();          // detects navigator.language on first load
  const [tab, setTab]   = useState("home");
  const t = T[lang];
  const isAr = lang === "ar";

  return (
    <div
      className={isAr ? "app-ar" : "app-en"}
      dir={isAr ? "rtl" : "ltr"}
      style={{ minHeight: "100vh", background: "var(--off-white)" }}
    >
      <Nav tab={tab} setTab={setTab} lang={lang} setLang={setLang} t={t} />

      <main className="main-content">
        {tab === "home"       && <Home       lang={lang} t={t} setTab={setTab} />}
        {tab === "resources"  && <Resources  lang={lang} t={t} />}
        {tab === "tools"      && <Tools      lang={lang} t={t} />}
        {tab === "faq"        && <FAQ        lang={lang} t={t} />}
        {tab === "facilities" && <Facilities lang={lang} t={t} />}
      </main>

      {/* WhatsApp FAB — visible on all screens */}
      <a
        href={`https://wa.me/${WA_NUMBER}`}
        target="_blank"
        rel="noreferrer"
        className="wa-fab"
        title={t.wa}
        aria-label={t.wa}
      >
        💬
      </a>
    </div>
  );
}
