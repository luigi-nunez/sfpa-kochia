import { useState } from "react";
import { T } from "../data/translations.js";
import { FACILITIES } from "../data/facilities.js";

export default function Facilities({ lang }) {
  const t = T[lang];
  const [q, setQ] = useState("");
  const [view, setView] = useState("list");
  const [selectedId, setSelectedId] = useState(null);
  const filtered = q.trim() === ""
    ? FACILITIES
    : FACILITIES.filter(f => {
        const s = q.toLowerCase();
        return f.nameEn.toLowerCase().includes(s)
          || f.nameAr.includes(s)
          || f.stateEn.toLowerCase().includes(s);
      });

  return (
    <div>
      <div className="sec-hdr"><h2>{t.nav.facilities}</h2></div>
      <div className="fac-tabs" role="tablist">
        {["map", "list"].map(k => (
          <button key={k} className={`fac-tab${view === k ? " active" : ""}`}
            onClick={() => setView(k)} role="tab" aria-selected={view === k}>
            {t.facTabs[k]}
          </button>
        ))}
      </div>

      {view === "map" && (
        <div className="fac-map-ph" role="img" aria-label={t.facMapPlaceholderTitle}>
          <div className="fac-map-ph-icon" aria-hidden="true">🗺</div>
          <div className="fac-map-ph-title">{t.facMapPlaceholderTitle}</div>
          <div className="fac-map-ph-sub">{t.facMapPlaceholderSub}</div>
        </div>
      )}

      <div className="fac-search">
        <input type="search" placeholder={t.searchPlaceholder} value={q}
          onChange={e => setQ(e.target.value)} aria-label={t.searchPlaceholder} />
      </div>

      <div className="facs">
        <div className="fac-notice" role="note">
          <span aria-hidden="true">⚠</span>
          <span>{t.facNotice}</span>
        </div>
        {filtered.length === 0 && <p className="no-res">{t.noResults}</p>}
        {filtered.map(f => {
          const name     = lang === "ar" ? f.nameAr    : f.nameEn;
          const state    = lang === "ar" ? f.stateAr   : f.stateEn;
          const address  = lang === "ar" ? f.addressAr : f.addressEn;
          const hours    = lang === "ar" ? f.hoursAr   : f.hoursEn;
          const services = lang === "ar" ? f.servicesAr : f.servicesEn;
          const isSelected = f.id === selectedId;
          return (
            <div key={f.id} className={`fac-card${isSelected ? " selected" : ""}`}
              onClick={() => setSelectedId(isSelected ? null : f.id)}
              role="button" tabIndex={0} aria-expanded={isSelected}
              onKeyDown={e => e.key === "Enter" && setSelectedId(isSelected ? null : f.id)}
              aria-label={name}>
              <div className="fac-header">
                <div className="fac-icon-wrap" aria-hidden="true">🏥</div>
                <div>
                  <div className="fac-name">{name}</div>
                  <div className="fac-state">{state}</div>
                </div>
              </div>
              {isSelected && (
                <>
                  <div className="fac-meta">
                    <div className="fac-row">
                      <span className="fac-row-icon" aria-hidden="true">📍</span>
                      <span>{address}</span>
                    </div>
                    <div className="fac-row">
                      <span className="fac-row-icon" aria-hidden="true">🕐</span>
                      <span>{hours}</span>
                    </div>
                  </div>
                  <div className="fac-tags" role="list" aria-label="Services">
                    {services.map((s, i) => (
                      <span key={i} className="fac-tag" role="listitem">{s}</span>
                    ))}
                  </div>
                  <div className="fac-contact-ph">
                    <span aria-hidden="true">📞</span>
                    <span>{t.facContactPh}</span>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
