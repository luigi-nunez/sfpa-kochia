// Bilingual content helpers. Content objects use { en, ar } pairs so a headless CMS
// (WordPress REST, Strapi, Sanity, etc.) can later return the same shape.
export const tx = (v, lang) => (v && typeof v === 'object' && !Array.isArray(v) ? v[lang] ?? v.en : v);

export function fmtNum(n, lang) {
  return n.toLocaleString(lang === 'ar' ? 'ar-SD' : 'en-US');
}

export function fmtDate(iso, lang, opts = { day: 'numeric', month: 'long', year: 'numeric' }) {
  const d = typeof iso === 'string' ? new Date(iso + (iso.length === 10 ? 'T12:00:00' : '')) : iso;
  return d.toLocaleDateString(lang === 'ar' ? 'ar-SD' : 'en-GB', opts);
}

export function waLink(number, text) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
