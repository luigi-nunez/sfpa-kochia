import { useState } from "react";
import { useLang } from "./hooks/useLang.js";
import Nav from "./components/Nav.jsx";
import Home from "./components/Home.jsx";
import Resources from "./components/Resources.jsx";
import Tools from "./components/Tools.jsx";
import FAQ from "./components/FAQ.jsx";
import Facilities from "./components/Facilities.jsx";

export default function App() {
  const { lang, toggle } = useLang();
  const [tab, setTab] = useState("home");

  function renderTab() {
    switch (tab) {
      case "home":       return <Home       lang={lang} setTab={setTab} />;
      case "resources":  return <Resources  lang={lang} />;
      case "tools":      return <Tools      lang={lang} />;
      case "faq":        return <FAQ        lang={lang} />;
      case "facilities": return <Facilities lang={lang} />;
      default:           return <Home       lang={lang} setTab={setTab} />;
    }
  }

  return (
    <div className="app">
      <Nav
        tab={tab}
        setTab={setTab}
        lang={lang}
        onToggleLang={toggle}
      />
      <main className="main-content" id="main-content">
        {renderTab()}
      </main>
    </div>
  );
}
