import FACILITIES, { WA_NUMBER } from "../data/facilities.js";

export default function Facilities({ lang, t }) {
  return (
    <div>
      <div className="sec-header">
        <h2 className="sec-title">{t.sec.fac.title}</h2>
        <p className="sec-sub">{t.sec.fac.sub}</p>
      </div>

      <div className="map-placeholder">
        <span style={{ fontSize: 34 }}>🗺️</span>
        <span>{t.mapNote}</span>
        <span style={{ fontSize: 11, color: "var(--g400)" }}>
          {lang === "en"
            ? "Google Maps or Leaflet integration — add real coordinates to src/data/facilities.js"
            : "تكامل خرائط جوجل — أضف الإحداثيات الحقيقية في src/data/facilities.js"}
        </span>
      </div>

      <div className="fac-list">
        {FACILITIES.map(f => (
          <div key={f.id} className="card fac-item">
            <div className="fac-pin">📍</div>
            <div style={{ flex: 1 }}>
              <div className="fac-name">{lang === "ar" ? f.nameAr : f.nameEn}</div>
              <div className="fac-addr">{lang === "ar" ? f.addrAr : f.addrEn}</div>
              {/* Hours — new field */}
              <div className="fac-hours">
                🕐 {lang === "ar" ? f.hoursAr : f.hoursEn}
              </div>
              {/* Services — new field, helps crisis users verify coverage before traveling */}
              <div className="fac-services">
                🏥 {lang === "ar" ? f.servicesAr : f.servicesEn}
              </div>
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="fac-wa"
              >
                💬 {lang === "en" ? "WhatsApp" : "واتساب"}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
