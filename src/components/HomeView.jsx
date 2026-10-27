import { T } from '../data/translations.js';
import { WA_NUMBER, CALL_CENTRE } from '../config.js';

export default function HomeView({ lang, setTab }) {
  const t = T[lang].home;

  return (
    <>
      {/* Hero */}
      <div className="hero">
        <p className="hero-orgname">{T[lang].orgName}</p>
        <h1>{t.heroTitle}</h1>
        <p>{t.heroSub}</p>
      </div>

      <div className="pw">
        {/* Quick-nav cards */}
        <div className="hgrid">
          {t.cards.map((c) => (
            <button key={c.id} className="hcard" onClick={() => setTab(c.id)}>
              <span className="hcard-icon">{c.icon}</span>
              <span className="hcard-label">{c.label}</span>
              <span className="hcard-desc">{c.desc}</span>
            </button>
          ))}
        </div>

        {/* Support section */}
        <div className="supp">
          <h2 className="supp-head">{t.supportTitle}</h2>
          <p className="supp-sub">{t.supportSub}</p>
          <div className="supp-cards">
            {/* WhatsApp */}
            <div className="sc">
              <span className="sc-icon">💬</span>
              <span className="sc-label">{t.whatsapp}</span>
              <span className="sc-desc">{t.whatsappDesc}</span>
              {WA_NUMBER ? (
                <a
                  className="sc-btn pri"
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(T[lang].waMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
                >
                  {t.whatsapp}
                </a>
              ) : (
                <span className="sc-btn dis">{t.configPlaceholder}</span>
              )}
            </div>

            {/* Call centre */}
            <div className="sc">
              <span className="sc-icon">📞</span>
              <span className="sc-label">{t.callCentre}</span>
              <span className="sc-desc">{t.callCentreDesc}</span>
              {CALL_CENTRE ? (
                <a
                  className="sc-btn sec"
                  href={`tel:${CALL_CENTRE}`}
                  style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
                >
                  {CALL_CENTRE}
                </a>
              ) : (
                <span className="sc-btn dis">{t.configPlaceholder}</span>
              )}
            </div>
          </div>
        </div>

        {/* Offline notice */}
        <div className="off">
          <div className="off-inner">
            <div>
              <h4>{t.offlineTitle}</h4>
              <p>{t.offlineSub}</p>
            </div>
          </div>
        </div>

        {/* Footer disclaimer */}
        <div className="foot">
          <p>{t.disclaimer}</p>
          <p style={{ marginTop: '8px' }}>{t.ippfNotice}</p>
        </div>
      </div>
    </>
  );
}
