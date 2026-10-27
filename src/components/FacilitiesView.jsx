import { T } from '../data/translations.js';
import { FACILITIES } from '../data/facilities.js';

export default function FacilitiesView({ lang }) {
  const t = T[lang].facilities;

  return (
    <div className="pw ph">
      <h1>{t.heading}</h1>
      <p>{t.subtitle}</p>

      {/* Map placeholder */}
      <div className="mpla" style={{ marginTop: '20px' }}>
        <div style={{ fontSize: '32px', marginBottom: '8px' }}>🗺️</div>
        <h3>{t.mapNotice}</h3>
        <p>{t.mapSub}</p>
      </div>

      {/* Clinic list */}
      <div className="facs">
        {FACILITIES.map((f) => (
          <div key={f.id} className="fac">
            <p className="fn">{lang === 'ar' ? f.name_ar : f.name_en}</p>
            <p className="fadr">{lang === 'ar' ? f.address_ar : f.address_en}</p>
            <div className="fmeta">
              <div className="frow">
                <span className="flbl">⏰ {t.hours}</span>
                <span className="fval">{lang === 'ar' ? f.hours_ar : f.hours_en}</span>
              </div>
              <div className="frow">
                <span className="flbl">📞 {t.phone}</span>
                <span className="fval">
                  {f.phone ? <a href={`tel:${f.phone}`}>{f.phone}</a> : <span className="fnp">{t.noPhone}</span>}
                </span>
              </div>
              <div className="frow">
                <span className="flbl">🏥 {t.services}</span>
                <span className="fval">
                  {(lang === 'ar' ? f.services_ar : f.services_en).length > 0 ? (
                    <div className="fsvcs">
                      {(lang === 'ar' ? f.services_ar : f.services_en).map((s, i) => (
                        <span key={i} className="fsvc">{s}</span>
                      ))}
                    </div>
                  ) : (
                    <span className="fnp">{t.noServices}</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: '.75rem', color: 'var(--txtm)', marginTop: '20px', paddingBottom: '8px' }}>
        {t.note}
      </p>
    </div>
  );
}
