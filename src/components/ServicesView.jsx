import { useState } from 'react';
import { T } from '../data/translations.js';
import { SERVICES } from '../data/services.js';

export default function ServicesView({ lang }) {
  const t = T[lang].services;
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('all');

  const cats = ['all', ...new Set(SERVICES.map((s) => (lang === 'ar' ? s.cat_ar : s.cat_en)))];

  const filtered = SERVICES.filter((s) => {
    const catField = lang === 'ar' ? s.cat_ar : s.cat_en;
    const catMatch = cat === 'all' || catField === cat;
    const q = query.toLowerCase();
    return catMatch && (!q || s.en.toLowerCase().includes(q) || s.ar.includes(query));
  });

  function fmtPrice(price) {
    return price.toLocaleString('en-US');
  }

  return (
    <div className="pw ph">
      <h1>{t.heading}</h1>
      <p>{t.subtitle}</p>

      {/* Search */}
      <div className="sw" style={{ marginTop: '20px' }}>
        <span className="sicon">🔍</span>
        <input
          className="si"
          type="search"
          placeholder={t.searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Category chips */}
      <div className="chips">
        {cats.map((c) => (
          <button
            key={c}
            className={`chip${cat === c ? ' on' : ''}`}
            onClick={() => setCat(c)}
          >
            {c === 'all' ? t.allCategories : c}
          </button>
        ))}
      </div>

      {/* Service list */}
      {filtered.length === 0 ? (
        <p className="svc-none">{t.noResults}</p>
      ) : (
        <div className="svc-list">
          {filtered.map((s) => (
            <div key={s.id} className="svc-row">
              <div className="svc-names">
                <span className="svc-en">{s.en}</span>
                <span className="svc-ar">{s.ar}</span>
              </div>
              {s.price === null ? (
                <span className="svc-free">{t.free}</span>
              ) : (
                <span className="svc-price">{fmtPrice(s.price)} {t.sdg}</span>
              )}
            </div>
          ))}
        </div>
      )}

      <p style={{ fontSize: '.75rem', color: 'var(--txtm)', marginTop: '20px', paddingBottom: '8px' }}>
        {t.disclaimer}
      </p>
    </div>
  );
}
