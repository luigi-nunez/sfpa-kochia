import { useState } from "react";
import { T } from "../data/translations.js";
import { FAQS } from "../data/faqs.js";

export default function FAQ({ lang }) {
  const t = T[lang];
  const faqList = FAQS[lang];
  const [openId, setOpenId] = useState(null);
  const cats = [...new Set(faqList.map(f => f.cat))];

  return (
    <div>
      <div className="sec-hdr"><h2>{t.nav.faq}</h2></div>
      <div className="faq-section">
        {cats.map(cat => (
          <div key={cat}>
            <div className="faq-cat">{cat}</div>
            {faqList.filter(f => f.cat === cat).map(faq => (
              <div key={faq.id} className={`faq-item${openId === faq.id ? " open" : ""}`}>
                <button className="faq-q"
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  aria-expanded={openId === faq.id}>
                  <span>{faq.q}</span>
                  <span className="faq-chev" aria-hidden="true">⌄</span>
                </button>
                {openId === faq.id && (
                  <div className="faq-a" role="region">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
