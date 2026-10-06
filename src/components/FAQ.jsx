import { useState } from "react";
import { T } from "../data/translations.js";
import { faqs } from "../data/faqs.js";

export default function FAQ({ lang }) {
  const t = T[lang];
  const faqList = faqs[lang];
  const [openId, setOpenId] = useState(null);

  // Group by cat
  const cats = [...new Set(faqList.map(f => f.cat))];

  return (
    <div>
      <div className="section-header">
        <h2>{t.nav.faq}</h2>
      </div>

      <div className="faq-section">
        {cats.map(cat => (
          <div key={cat}>
            <div className="faq-cat-title">{cat}</div>
            {faqList.filter(f => f.cat === cat).map(faq => (
              <div
                key={faq.id}
                className={`faq-item${openId === faq.id ? " open" : ""}`}
              >
                <button
                  className="faq-q"
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  aria-expanded={openId === faq.id}
                >
                  <span>{faq.q}</span>
                  <span className="faq-chevron" aria-hidden="true">⌄</span>
                </button>
                {openId === faq.id && (
                  <div className="faq-a" role="region">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
