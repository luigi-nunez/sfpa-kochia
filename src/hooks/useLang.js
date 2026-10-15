import { useState } from "react";

function detectLocale() {
  const nav = navigator.language || navigator.userLanguage || "en";
  return nav.toLowerCase().startsWith("ar") ? "ar" : "en";
}

export default function useLang() {
  const [lang, setLang] = useState(() => detectLocale());
  return [lang, setLang];
}
