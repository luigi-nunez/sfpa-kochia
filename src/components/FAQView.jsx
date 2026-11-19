import { useState } from 'react';
import { useVoice } from '../hooks/useVoice.jsx';
import { T } from '../data/translations.js';
import { FAQS } from '../data/faqs.js';
import SpeakButton from './SpeakButton.jsx';

export default function FAQView({ lang }) {
  const t = T[lang].faq;
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(null);
  const voice = useVoice();

  const filtered = FAQS.filter((f) => {
    const q = query.toLowerCase();
    return !q || f.q_en.toLowerCase().includes(q) || f.q_ar.includes(query) || f.a_en.toLowerCase().includes(q);
  });

  function toggle(id) {
    voice?.stop();
    setOpen(open === id ? null : id);
  }

  return (
    <div className="pw ph">
      <h1>{t.heading}</h1>
      <p>{t.subtitle}</p>

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

      {filtered.length === 0 ? (
        <p className="fnone">{t.noResults}</p>
      ) : (
        <div className="flist">
          {filtered.map((f) => (
            <div key={f.id} className={`fitem${open === f.id ? ' op' : ''}`}>
              <button className="fq" onClick={() => toggle(f.id)}>
                <span>{lang === 'ar' ? f.q_ar : f.q_en}</span>
                <span className="fchev">▼</span>
              </button>
              <div className="fans">
                <div className="fains">
                  {open === f.id && (
                    <SpeakButton
                      id={`faq-${f.id}`}
                      lang={lang}
                      className="spk-block"
                      text={lang === 'ar' ? `${f.q_ar}\n${f.a_ar}` : `${f.q_en}\n${f.a_en}`}
                    />
                  )}
                  {lang === 'ar' ? f.a_ar : f.a_en}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
