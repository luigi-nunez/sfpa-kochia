import { WA_NUMBER, CALL_CENTRE_NUMBER, waUrl, isPlaceholder } from "../config.js";

export default function GetSupportInline({ t, lang, onFindClinic, showWA = true, showCall = true, showClinic = true }) {
  if (!showWA && !showCall && !showClinic) return null;
  const callPlaceholder = isPlaceholder(CALL_CENTRE_NUMBER);
  const waPlaceholder   = isPlaceholder(WA_NUMBER);

  return (
    <div className="get-support-inline">
      <div className="get-support-inline-title">{t.getSupportTitle}</div>

      {showWA && (
        waPlaceholder
          ? <button className="gs-btn" disabled style={{ opacity: 0.55, cursor: "default" }}
              aria-label={`${t.getSupportWA} — ${t.getSupportPlaceholder}`}>
              <span className="gs-btn-icon" aria-hidden="true">💬</span>
              <span>{t.getSupportWA}</span>
            </button>
          : <a className="gs-btn" href={waUrl(lang)} target="_blank" rel="noopener noreferrer"
              aria-label={t.getSupportWA}>
              <span className="gs-btn-icon" aria-hidden="true">💬</span>
              <span>{t.getSupportWA}</span>
            </a>
      )}

      {showCall && (
        callPlaceholder
          ? <button className="gs-btn" disabled style={{ opacity: 0.55, cursor: "default" }}
              aria-label={`${t.getSupportCall} — ${t.getSupportPlaceholder}`}>
              <span className="gs-btn-icon" aria-hidden="true">📞</span>
              <span>{t.getSupportCall}</span>
            </button>
          : <a className="gs-btn" href={`tel:+${CALL_CENTRE_NUMBER}`}
              aria-label={t.getSupportCall}>
              <span className="gs-btn-icon" aria-hidden="true">📞</span>
              <span>{t.getSupportCall}</span>
            </a>
      )}

      {showClinic && onFindClinic && (
        <button className="gs-btn" onClick={onFindClinic} aria-label={t.getSupportClinic}>
          <span className="gs-btn-icon" aria-hidden="true">📍</span>
          <span>{t.getSupportClinic}</span>
        </button>
      )}

      {(callPlaceholder || waPlaceholder) && (
        <p className="gs-ph">{t.getSupportPlaceholder}</p>
      )}
    </div>
  );
}
