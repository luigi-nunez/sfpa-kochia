import { useState } from "react";
import { T } from "../data/translations.js";
import { facilities, WA_NUMBER } from "../data/facilities.js";

function waUrl(facility, lang) {
  const name = lang === "ar" ? facility.nameAr : facility.nameEn;
  const body = lang === "ar"
    ? `مرحبًا، أريد الاستفسار عن عيادة ${name}`
    : `Hello, I would like to enquire about ${name}`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(body)}`;
}

export default function Facilities({ lang }) {
  const t = T[lang];
  const facList = facilities[lang];
  const [query, setQuery] = useState("");

  const filtered = query.trim() === ""
    ? facList
    : facList.filter(f => {
        const q = query.toLowerCase();
        return (
          f.nameEn.toLowerCase().includes(q) ||
          f.nameAr.includes(q) ||
          f.addressEn.toLowerCase().includes(q) ||
          f.addressAr.includes(q)
        );
      });

  return (
    <div>
      <div className="section-header">
        <h2>{t.nav.facilities}</h2>
      </div>

      <div className="fac-search">
        <input
          type="search"
          placeholder={t.searchPlaceholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label={t.searchPlaceholder}
        />
      </div>

      <div className="fac-list">
        {filtered.length === 0 && (
          <p className="no-results">{t.noResults}</p>
        )}
        {filtered.map(f => {
          const name    = lang === "ar" ? f.nameAr    : f.nameEn;
          const address = lang === "ar" ? f.addressAr : f.addressEn;
          const hours   = lang === "ar" ? f.hoursAr   : f.hoursEn;
          const services= lang === "ar" ? f.servicesAr : f.servicesEn;

          return (
            <div key={f.id} className="fac-card">
              <div className="fac-header">
                <div className="fac-icon" aria-hidden="true">🏥</div>
                <div>
                  <div className="fac-name">{name}</div>
                  <div className="fac-state">{address.split(",").slice(-1)[0].trim()}</div>
                </div>
              </div>

              <div className="fac-meta">
                <div className="fac-meta-row">
                  <span className="fac-meta-icon" aria-hidden="true">📍</span>
                  <span>{address}</span>
                </div>
                <div className="fac-meta-row">
                  <span className="fac-meta-icon" aria-hidden="true">🕐</span>
                  <span>{hours}</span>
                </div>
                {f.phone && (
                  <div className="fac-meta-row">
                    <span className="fac-meta-icon" aria-hidden="true">📞</span>
                    <a href={`tel:${f.phone.replace(/\s/g, "")}`} style={{ color: "var(--navy)" }}>
                      {f.phone}
                    </a>
                  </div>
                )}
              </div>

              <div className="fac-services">
                {services.map((s, i) => (
                  <span key={i} className="fac-service-tag">{s}</span>
                ))}
              </div>

              <a
                className="fac-wa-btn"
                href={waUrl(f, lang)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span aria-hidden="true">💬</span> {t.contactClinic}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
