// Appointment request flow: clinic, service, preferred day, then hand-off to WhatsApp or a call.
// Data-minimising by design: no name, phone, or time fields; choices live only in component
// state and are never saved or sent by this site. The WhatsApp hand-off pre-writes a message
// with a discreet service label (by service group) so a saved chat on a shared phone reveals
// as little as possible. The user can edit or delete the text in WhatsApp before sending.
import { useState } from 'react';
import { useQuery } from '../lib/router.jsx';
import { useSite } from '../lib/site.jsx';
import { tx } from '../lib/i18n.js';
import { FACILITIES } from '../data/facilities.js';
import { SPECIALTIES } from '../content/specialties.js';
import { SITE } from '../content/site.js';
import Icon from '../components/Icon.jsx';
import { WaButton } from '../components/site/Blocks.jsx';
import { cityOf } from './ClinicsPage.jsx';

const TOTAL = 4;
const GENERAL_DAYS = ['asap', 'thisWeek', 'nextWeek'];
const WEEKDAYS = ['sun', 'mon', 'tue', 'wed', 'thu']; // Sudan working week; Friday and Saturday are the weekend
const dist = (a, b) => Math.hypot(a.lat - b.lat, (a.lng - b.lng) * Math.cos((a.lat * Math.PI) / 180));

export default function BookingPage() {
  const { lang, t, wa } = useSite();
  const b = t.book;
  const q = useQuery();
  const pre = SPECIALTIES.find((s) => s.slug === q.get('service') && s.bookable);
  const preC = FACILITIES.find((f) => f.id === q.get('centre'));

  const [step, setStep] = useState(preC ? (pre ? 3 : 2) : 1);
  const [centre, setCentre] = useState(preC?.id ?? null);
  const [service, setService] = useState(pre?.slug ?? null);
  const [day, setDay] = useState(null);
  const [via, setVia] = useState(null);
  const [order, setOrder] = useState(FACILITIES);
  const [locMsg, setLocMsg] = useState('');

  const C = FACILITIES.find((f) => f.id === centre);
  const S = SPECIALTIES.find((s) => s.slug === service);
  const nm = (f) => (lang === 'ar' ? f.name_ar : f.name_en);
  const dayLabel = (d) => b.days[d];

  function locate() {
    const located = FACILITIES.filter((f) => f.lat != null && f.lng != null);
    if (!located.length) { setLocMsg(b.locNone); return; }
    if (!navigator.geolocation) { setLocMsg(b.locDenied); return; }
    setLocMsg(b.locating);
    // The position is used only in this browser to sort the list. It is never sent anywhere.
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const me = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setOrder([...located].sort((x, y) => dist(me, x) - dist(me, y)).concat(FACILITIES.filter((f) => f.lat == null)));
        setLocMsg('');
      },
      () => setLocMsg(b.locDenied),
      { timeout: 8000, maximumAge: 600000 },
    );
  }

  function goTo(s) {
    setStep(s);
    requestAnimationFrame(() => document.getElementById('book-step')?.focus());
  }
  function startOver() {
    setCentre(null); setService(null); setDay(null); setVia(null); goTo(1);
  }

  const canNext = { 1: !!centre, 2: !!service, 3: !!day }[step];

  // Built only on the final step, from the user's choices. Uses the discreet group label, not the service name.
  const waMsg = step === 4 && C && S && day
    ? [b.waIntro, `${b.waClinic}: ${nm(C)}`, `${b.waFor}: ${b.waService[S.group]}`, `${b.waDay}: ${dayLabel(day)}`].join('\n')
    : '';
  const waHref = waMsg ? wa(waMsg) : null;

  return (
    <section className="sec book">
      <div className="wrap narrow">
        <p className="eyebrow">{b.eyebrow}</p>
        <h1 className="book-title">{b.title}</h1>
        <div className="demo-banner" role="note"><Icon name="lock" size={18} /><span>{b.demoBanner}</span></div>

        <div className="progress" aria-hidden="true"><span style={{ width: `${(step / TOTAL) * 100}%` }} /></div>
        <p className="muted-sm">{b.step} {step} {b.of} {TOTAL}</p>

        <div className="card book-card" id="book-step" tabIndex={-1} aria-live="polite">
          {step === 1 && (
            <fieldset>
              <legend className="h2">{b.s1}</legend>
              <div className="btn-row"><button type="button" className="btn btn-outline btn-sm" onClick={locate}><Icon name="navigate" size={16} />{b.useLocation}</button></div>
              {locMsg && <p className="muted-sm">{locMsg}</p>}
              <div className="opt-list">
                {order.map((f) => (
                  <label key={f.id} className={`opt${centre === f.id ? ' on' : ''}`}>
                    <input type="radio" name="centre" checked={centre === f.id} onChange={() => setCentre(f.id)} />
                    <span className="opt-main"><strong>{nm(f)}</strong><small>{cityOf(f, lang)} · {lang === 'ar' ? f.address_ar : f.address_en}</small></span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {step === 2 && (
            <fieldset>
              <legend className="h2">{b.s2}</legend>
              <p className="muted-sm">{b.s2note}</p>
              <div className="opt-grid">
                {SPECIALTIES.map((s) => s.bookable ? (
                  <label key={s.slug} className={`opt opt-tile${service === s.slug ? ' on' : ''}`}>
                    <input type="radio" name="service" checked={service === s.slug} onChange={() => setService(s.slug)} />
                    <Icon name={s.icon} size={22} /><span>{tx(s.title, lang)}</span>
                  </label>
                ) : (
                  <div key={s.slug} className="opt opt-tile opt-wa">
                    <Icon name={s.icon} size={22} /><span>{tx(s.title, lang)}</span>
                    <WaButton className="btn btn-wa btn-xs" label={t.common.askWhatsapp} text={tx(s.title, lang)} />
                  </div>
                ))}
              </div>
            </fieldset>
          )}

          {step === 3 && (
            <fieldset>
              <legend className="h2">{b.s3}</legend>
              <p className="muted-sm">{b.s3note}</p>
              <div className="opt-list">
                {GENERAL_DAYS.map((d) => (
                  <label key={d} className={`opt${day === d ? ' on' : ''}`}>
                    <input type="radio" name="day" checked={day === d} onChange={() => setDay(d)} />
                    <span className="opt-main"><strong>{dayLabel(d)}</strong></span>
                  </label>
                ))}
              </div>
              <p className="label">{b.dOr}</p>
              <div className="seg">
                {WEEKDAYS.map((d) => (
                  <label key={d} className={day === d ? 'on' : ''}>
                    <input type="radio" name="day" checked={day === d} onChange={() => setDay(d)} />{dayLabel(d)}
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {step === 4 && (
            <fieldset>
              <legend className="h2">{b.s4}</legend>
              <p className="muted-sm">{b.s4note}</p>

              <dl className="summary">
                {[[b.centre, nm(C), 1], [b.service, tx(S.title, lang), 2], [b.day, dayLabel(day), 3]].map(([k, v, st]) => (
                  <div key={k}><dt>{k}</dt><dd>{v}</dd><button type="button" className="link-btn" onClick={() => goTo(st)}>{b.change}</button></div>
                ))}
              </dl>

              <div className="opt-grid via-grid">
                <label className={`opt opt-tile${via === 'wa' ? ' on' : ''}`}>
                  <input type="radio" name="via" checked={via === 'wa'} onChange={() => setVia('wa')} />
                  <Icon name="whatsapp" size={22} /><span>{b.viaWa}</span><small>{b.viaWaD}</small>
                </label>
                <label className={`opt opt-tile${via === 'call' ? ' on' : ''}`}>
                  <input type="radio" name="via" checked={via === 'call'} onChange={() => setVia('call')} />
                  <Icon name="call" size={22} /><span>{b.viaCall}</span><small>{b.viaCallD}</small>
                </label>
              </div>

              {via === 'wa' && (
                <div className="via-panel">
                  <p className="label">{b.waPreview}</p>
                  <pre className="wa-preview">{waMsg}</pre>
                  <p className="muted-sm">{b.waEdit} {b.waNumberNote}</p>
                  {waHref
                    ? <a className="btn btn-wa btn-block" href={waHref} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={18} />{b.waOpen}</a>
                    : <span className="btn btn-wa btn-block is-disabled" aria-disabled="true"><Icon name="whatsapp" size={18} />{t.common.tbc}</span>}
                </div>
              )}

              {via === 'call' && (
                <div className="via-panel">
                  <p className="label">{b.callTell}</p>
                  <ul className="call-list">
                    <li>{b.centre}: <strong>{nm(C)}</strong></li>
                    <li>{b.service}: <strong>{tx(S.title, lang)}</strong></li>
                    <li>{b.day}: <strong>{dayLabel(day)}</strong></li>
                  </ul>
                  <p className="muted-sm">{b.callNumberNote}</p>
                  {SITE.callCentre
                    ? <a className="btn btn-cta btn-block" href={`tel:${SITE.callCentre}`}><Icon name="call" size={18} />{b.callNow} <span dir="ltr">{SITE.callCentre}</span></a>
                    : <span className="btn btn-cta btn-block is-disabled" aria-disabled="true"><Icon name="call" size={18} />{t.common.tbc}</span>}
                </div>
              )}

              <p className="req-note" role="note"><Icon name="clock" size={18} /><span>{b.request}</span></p>
            </fieldset>
          )}
        </div>

        <div className="book-nav">
          {step > 1 ? <button type="button" className="btn btn-outline" onClick={() => goTo(step - 1)}>{b.prev}</button> : <span />}
          {step < TOTAL
            ? <button type="button" className="btn btn-cta" disabled={!canNext} onClick={() => goTo(step + 1)}>{b.next}</button>
            : <button type="button" className="btn btn-outline" onClick={startOver}>{b.startOver}</button>}
        </div>
      </div>
    </section>
  );
}
