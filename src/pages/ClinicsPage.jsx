import { useState, lazy, Suspense } from 'react';
import { Link, useQuery, useRouter } from '../lib/router.jsx';
import { useSite } from '../lib/site.jsx';
import { fmtNum, waLink } from '../lib/i18n.js';
import { FACILITIES } from '../data/facilities.js';
import { SITE } from '../content/site.js';
import Icon from '../components/Icon.jsx';
import { PageHero, CtaBand, WaButton, Pending } from '../components/site/Blocks.jsx';

const ClinicMap = lazy(() => import('../components/site/ClinicMap.jsx'));

export const cityOf = (c, lang) => (lang === 'ar' ? c.city_ar : c.city_en);

export default function ClinicsPage() {
  const { lang, t } = useSite();
  const c = t.clinics;
  const q = useQuery();
  const { navigate } = useRouter();
  const city = q.get('city') || 'all';
  const [selected, setSelected] = useState(null);

  const cities = [...new Set(FACILITIES.map((f) => f.city_en))];
  const list = city === 'all' ? FACILITIES : FACILITIES.filter((f) => f.city_en === city);
  const nm = (f) => (lang === 'ar' ? f.name_ar : f.name_en);

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} sub={c.sub}>
        <div className="mini-stats">
          <span><strong>{fmtNum(FACILITIES.length, lang)}</strong> {c.count}</span>
          <span><strong>{fmtNum(cities.length, lang)}</strong> {c.cities}</span>
        </div>
      </PageHero>
      <section className="sec">
        <div className="wrap">
          <p className="notice"><Icon name="pin" size={18} />{c.pendingData}</p>
          <div className="clinics-layout">
            <aside className="city-filter" aria-label={c.cities}>
              {[['all', c.all, FACILITIES.length], ...cities.map((ct) => [ct, cityOf(FACILITIES.find((f) => f.city_en === ct), lang), FACILITIES.filter((f) => f.city_en === ct).length])].map(([id, label, n]) => (
                <button key={id} type="button" className={`city-btn${city === id ? ' on' : ''}`} aria-pressed={city === id}
                  onClick={() => navigate(id === 'all' ? '/clinics' : `/clinics?city=${encodeURIComponent(id)}`, { replace: true })}>
                  <span>{label}</span><span className="count">{fmtNum(n, lang)}</span>
                </button>
              ))}
            </aside>
            <div className="clinic-list">
              {list.map((f) => {
                const located = f.lat != null && f.lng != null;
                const waNum = f.whatsapp || SITE.whatsapp;
                return (
                  <article key={f.id} className={`clinic${selected === f.id ? ' sel' : ''}`}>
                    <div className="clinic-head">
                      <h2 className="h3">{nm(f)}</h2>
                      <span className="tag">{cityOf(f, lang)}</span>
                    </div>
                    <ul className="clinic-meta">
                      <li><Icon name="pin" size={18} /><span>{lang === 'ar' ? f.address_ar : f.address_en}</span></li>
                      <li><Icon name="clock" size={18} /><span><span className="lbl">{c.hours}: </span>{lang === 'ar' ? f.hours_ar : f.hours_en}</span></li>
                      <li><Icon name="call" size={18} /><span><span className="lbl">{c.phone}: </span>{f.phone ? <a href={`tel:${f.phone}`} dir="ltr">{f.phone}</a> : <Pending />}</span></li>
                    </ul>
                    <div className="btn-row">
                      {waNum && <a className="btn btn-wa btn-sm" href={waLink(waNum, `${t.common.whatsappUs}: ${nm(f)}`)} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={16} />{t.nav.whatsapp}</a>}
                      <button type="button" className="btn btn-outline btn-sm" disabled={!located} onClick={() => setSelected(f.id)} title={located ? undefined : c.noCoords}>
                        <Icon name="pin" size={16} />{located ? c.showOnMap : c.noCoords}
                      </button>
                      {located && <a className="btn btn-outline btn-sm" href={`https://www.google.com/maps/dir/?api=1&destination=${f.lat},${f.lng}`} target="_blank" rel="noopener noreferrer"><Icon name="navigate" size={16} />{c.directions}</a>}
                      <Link to={`/book?centre=${f.id}`} className="btn btn-cta btn-sm"><Icon name="calendar" size={16} />{c.book}</Link>
                    </div>
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
