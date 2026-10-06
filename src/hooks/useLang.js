import { useState, useEffect } from "react";

function detectLocale() {
  const nav = navigator.language || navigator.userLanguage || "en";
  return nav.toLowerCase().startsWith("ar") ? "ar" : "en";
}

export function useLang() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("kochia_lang") || detectLocale();
    } catch {
      return detectLocale();
    }
  });

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    try {
      localStorage.setItem("kochia_lang", lang);
    } catch {}
  }, [lang]);

  const toggle = () => setLang(l => (l === "ar" ? "en" : "ar"));

  return { lang, toggle };
}
