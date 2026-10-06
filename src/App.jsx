import { useState, useRef } from "react";
import { useLang } from "./hooks/useLang.js";
import { T } from "./data/translations.js";
import Nav from "./components/Nav.jsx";
import Home from "./components/Home.jsx";
import Resources from "./components/Resources.jsx";
import Tools from "./components/Tools.jsx";
import FAQ from "./components/FAQ.jsx";
import Facilities from "./components/Facilities.jsx";

export default function App() {
  const [tab, setTab] = useState("home");
  const [lang, setLang] = useLang();
  const mainRef = useRef(null);

  function switchTab(t) {
    setTab(t);
    mainRef.current?.focus();
  }

  const t = T[lang];

  return (
    <div className="app" dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
      <a className="skip-link" href="#main-content">{t.skipToContent}</a>
      <header>
        <Nav tab={tab} setTab={switchTab} lang={lang} setLang={setLang} />
      </header>
      <main id="main-content" tabIndex={-1} ref={mainRef}>
        {tab === "home"       && <Home       lang={lang} setTab={switchTab} />}
        {tab === "resources"  && <Resources  lang={lang} />}
        {tab === "tools"      && <Tools      lang={lang} setTab={switchTab} />}
        {tab === "faq"        && <FAQ        lang={lang} />}
        {tab === "facilities" && <Facilities lang={lang} />}
      </main>
    </div>
  );
}
