import { useState, lazy, Suspense } from 'react';
import { Link, useQuery, useRouter } from '../lib/router.jsx';
import { useSite } from '../lib/site.jsx';
import { fmtNum, waLink } from '../lib/i18n.js';
import { FACILITIES, STATES } from '../data/facilities.js';
import { SITE } from '../content/site.js';
import Icon from '../components/Icon.jsx';
import { PageHero, CtaBand, WaButton, Pending } from '../components/site/Blocks.jsx';

const ClinicMap = lazy(() => import('../components/site/ClinicMap.jsx'));

export const cityOf = (c, lang) => (lang === 'ar' ? c.city_ar : c.city_en);
export const stateOf = (c, lang) => (lang === 'ar' ? c.state_ar : c.state_en);
// Town plus street address when SFPA has published one, without repeating the town.
export const placeOf = (c, lang) => (c.addressIsTownOnly ? cityOf(c, lang) : (lang === 'ar' ? c.address_ar : c.address_en));

export default function ClinicsPage() {
  const { lang, t } = useSite();
  const c = t.clinics;
  const q = useQuery();
  const { navigate } = useRouter();
  const state = q.get('state') || 'all';
  const [selected, setSelected] = useState(null);

  const list = state === 'all' ? FACILITIES : FACILITIES.filter((f) => f.state_en === state);
  const nm = (f) => (lang === 'ar' ? f.name_ar : f.name_en);
  const points = FACILITIES.reduce((n, f) => n + f.servicePoints.length, 0);

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} sub={c.sub}>
        <div className="mini-stats">
          <span><strong>{fmtNum(FACILITIES.length, lang)}</strong> {c.count}</span>
          <span><strong>{fmtNum(STATES.length, lang)}</strong> {c.states}</span>
          <span><strong>{fmtNum(points, lang)}</strong> {c.points}</span>
        </div>
      </PageHero>
      <section className="sec">
        <div className="wrap">
          <div className="notice notice-warn" role="note">
            <Icon name="shield" size={18} />
            <span>{c.statusNote} {SITE.callCentre && <>{c.callFirst} <a href={`tel:${SITE.callCentre}`} dir="ltr">{SITE.callCentre}</a>.</>}</span>
          </div>
          <div className="clinics-layout">
            <aside className="city-filter" aria-label={c.states}>
              {[['all', c.all, FACILITIES.length], ...STATES.map((s) => [s, stateOf(FACILITIES.find((f) => f.state_en === s), lang), FACILITIES.filter((f) => f.state_en === s).length])].map(([id, label, n]) => (
                <button key={id} type="button" className={`city-btn${state === id ? ' on' : ''}`} aria-pressed={state === id}
                  onClick={() => { setSelected(null); navigate(id === 'all' ? '/clinics' : `/clinics?state=${encodeURIComponent(id)}`, { replace: true }); }}>
                  <span>{label}</span><span className="count">{fmtNum(n, lang)}</span>
                </button>
              ))}
            </aside>
            <div className="clinic-list">
              {list.map((f) => {
                const located = f.lat != null && f.lng != null;
                const exact = located && f.precision === 'exact';
                const waNum = f.whatsapp || SITE.whatsapp;
                return (
                  <article key={f.id} id={`branch-${f.id}`} className={`clinic${selected === f.id ? ' sel' : ''}`}>
                    <div className="clinic-head">
                      <div>
                        <h2 className="h3">{nm(f)}</h2>
                        <p className="muted-sm">{cityOf(f, lang)}</p>
                      </div>
                      <Pending kind="reported" label={c.reported} />
                    </div>
                    {f.advisory && <p className="clinic-advisory"><Icon name="shield" size={16} />{c.advisory}</p>}
                    <ul className="clinic-meta">
                      <li><Icon name="pin" size={18} /><span>{placeOf(f, lang)}{f.addressIsTownOnly && <> <Pending label={c.streetTbc} /></>}</span></li>
                      <li><Icon name="clock" size={18} /><span><span className="lbl">{c.hours}: </span>{f.hours_en ? (lang === 'ar' ? f.hours_ar : f.hours_en) : <Pending />}</span></li>
                      <li><Icon name="call" size={18} /><span><span className="lbl">{c.phone}: </span>
                        {f.phone
                          ? <a href={`tel:${f.phone}`} dir="ltr">{f.phone}</a>
                          : <><Pending />{SITE.callCentre && <> {c.useCallCentre} <a href={`tel:${SITE.callCentre}`} dir="ltr">{SITE.callCentre}</a></>}</>}
                      </span></li>
                    </ul>
                    {f.servicePoints.length > 0 && (
                      <details className="spoints">
                        <summary>{c.servicePoints} ({fmtNum(f.servicePoints.length, lang)})</summary>
                        <ul>
                          {f.servicePoints.map((p) => (
                            <li key={p.name_ar}><strong>{lang === 'ar' ? p.name_ar : p.name_en}</strong><span className="tag">{lang === 'ar' ? p.type_ar : p.type_en}</span></li>
                          ))}
                        </ul>
                      </details>
                    )}
                    <div className="btn-row">
                      {waNum && <a className="btn btn-wa btn-sm" href={waLink(waNum, `${t.common.whatsappUs}: ${nm(f)}`)} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={16} />{t.nav.whatsapp}</a>}
                      <button type="button" className="btn btn-outline btn-sm" disabled={!located} onClick={() => setSelected(f.id)} title={located ? undefined : c.noCoords}>
                        <Icon name="pin" size={16} />{located ? c.showOnMap : c.noCoords}
                      </button>
                      {exact && <a className="btn btn-outline btn-sm" href={`https://www.google.com/maps/dir/?api=1&destination=${f.lat},${f.lng}`} target="_blank" rel="noopener noreferrer"><Icon name="navigate" size={16} />{c.directions}</a>}
                      <Link to={`/book?centre=${f.id}`} className="btn btn-cta btn-sm"><Icon name="calendar" size={16} />{c.book}</Link>
                    </div>
                    <p className="source-line"><a href={f.source} target="_blank" rel="noopener noreferrer">{c.source}</a></p>
                  </article>
                );
              })}
            </div>
            <div className="map-col">
              <h2 className="h3">{c.mapTitle}</h2>
              <p className="muted-sm">{c.mapHint}</p>
              <Suspense fallback={<div className="map-wrap"><div className="map" /></div>}>
                <ClinicMap clinics={list} selected={selected} onSelect={setSelected} />
              </Suspense>
              <p className="map-legend"><span className="legend-pin" aria-hidden="true" />{c.legendApprox}</p>
            </div>
          </div>
        </div>
      </section>
      <CtaBand title={c.remoteTitle} sub={c.remoteSub}>
        <Link to="/telehealth" className="btn btn-light btn-lg">{t.nav.telehealth}</Link>
        <WaButton className="btn btn-wa btn-lg" />
      </CtaBand>
    </>
  );
}
