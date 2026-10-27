import { useState } from 'react';
import { T } from '../data/translations.js';
import { ARTICLES } from '../data/articles.js';
import { VIDEOS } from '../data/videos.js';

function ArticleDetail({ article, lang, onBack }) {
  const t = T[lang].resources;
  const title = lang === 'ar' ? article.title_ar : article.title_en;
  const body = lang === 'ar' ? article.body_ar : article.body_en;

  return (
    <div className="pw adet">
      <button className="aback" onClick={onBack}>{t.backToList}</button>
      <h1>{title}</h1>
      {body.map((blk, i) => (
        <div key={i} className="ablk">
          <h3>{blk.heading}</h3>
          <p>{blk.text}</p>
        </div>
      ))}
      <p style={{ fontSize: '.75rem', color: 'var(--txtm)', marginTop: '24px' }}>{t.disclaimer}</p>
    </div>
  );
}

export default function ResourcesView({ lang }) {
  const t = T[lang].resources;
  const [subtab, setSubtab] = useState('articles');
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('all');
  const [selected, setSelected] = useState(null);

  const cats_en = ['all', ...new Set(ARTICLES.map((a) => a.cat_en))];
  const cats_ar = ['all', ...new Set(ARTICLES.map((a) => a.cat_ar))];
  const catLabels = lang === 'ar' ? cats_ar : cats_en;

  const filtered = ARTICLES.filter((a) => {
    const catField = lang === 'ar' ? a.cat_ar : a.cat_en;
    const allCat = lang === 'ar' ? cats_ar[0] : cats_en[0];
    const catMatch = cat === allCat || catField === cat;
    const q = query.toLowerCase();
    return catMatch && (!q || a.title_en.toLowerCase().includes(q) || a.title_ar.includes(query));
  });

  if (selected) {
    return <ArticleDetail article={selected} lang={lang} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="pw ph">
      <h1>{t.heading}</h1>
      <p>{t.subtitle}</p>

      {/* Sub-tabs */}
      <div className="stabs" style={{ marginTop: '20px' }}>
        <button className={`stab${subtab === 'articles' ? ' on' : ''}`} onClick={() => setSubtab('articles')}>
          {t.tabs.articles}
        </button>
        <button className={`stab${subtab === 'videos' ? ' on' : ''}`} onClick={() => setSubtab('videos')}>
          {t.tabs.videos}
        </button>
      </div>

      {subtab === 'articles' && (
        <>
          {/* Search */}
          <div className="sw">
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
            {catLabels.map((c) => (
              <button
                key={c}
                className={`chip${cat === c ? ' on' : ''}`}
                onClick={() => setCat(c)}
              >
                {c === 'all' ? t.allCategories : c}
              </button>
            ))}
          </div>

          {/* Article list */}
          <div className="cgrid">
            {filtered.length === 0 ? (
              <p style={{ color: 'var(--txtm)', padding: '24px 0' }}>{t.noResults}</p>
            ) : filtered.map((a) => (
              <div key={a.id} className="acard" onClick={() => setSelected(a)}>
                <p className="acat">{lang === 'ar' ? a.cat_ar : a.cat_en}</p>
                <p className="atitle">{lang === 'ar' ? a.title_ar : a.title_en}</p>
                <p className="asum">{lang === 'ar' ? a.summary_ar : a.summary_en}</p>
                <p className="acta">{t.readMore}</p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '.75rem', color: 'var(--txtm)', marginTop: '24px', paddingBottom: '8px' }}>
            {t.disclaimer}
          </p>
        </>
      )}

      {subtab === 'videos' && (
        <div className="cgrid">
          {VIDEOS.map((v) => (
            <div key={v.id} className="vcard">
              <div className="vcs">
                <span className="vcs-icon">▶</span>
                <span className="vcs-label">{lang === 'ar' ? v.thumbLabel_ar : v.thumbLabel_en}</span>
              </div>
              <div className="vmeta">
                <p className="vcat">{lang === 'ar' ? v.cat_ar : v.cat_en}</p>
                <p className="vtitle">{lang === 'ar' ? v.title_ar : v.title_en}</p>
                <p style={{ fontSize: '.75rem', color: 'var(--txtm)', marginTop: '4px' }}>{v.duration}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
