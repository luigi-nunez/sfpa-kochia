// Six-step booking flow modelled on CEMOPLAF's "Agéncemo". DEMONSTRATION ONLY:
// everything lives in component state, nothing is persisted or transmitted, and
// personal fields are wiped as soon as the user confirms. Connect to a real
// scheduling backend (for example OpenEMR) only after SFPA approves data safeguards.
import { useMemo, useState } from 'react';
import { Link, useQuery } from '../lib/router.jsx';
import { useSite } from '../lib/site.jsx';
import { tx, fmtDate } from '../lib/i18n.js';
import { FACILITIES } from '../data/facilities.js';
import { SPECIALTIES } from '../content/specialties.js';
import Icon from '../components/Icon.jsx';
import { WaButton } from '../components/site/Blocks.jsx';
import { cityOf } from './ClinicsPage.jsx';

const TIMES = ['08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'];
const TOTAL = 6;

function nextDays(n = 14) {
  const out = [];
  const d = new Date(); d.setHours(12, 0, 0, 0);
  while (out.length < n) {
    d.setDate(d.getDate() + 1);
    const wd = d.getDay();
    if (wd !== 5 && wd !== 6) out.push(d.toISOString().slice(0, 10)); // Sudan weekend: Friday and Saturday
  }
  return out;
}
// Deterministic mock availability so the demo looks realistic and stable.
const isFull = (day, time) => [...(day + time)].reduce((a, ch) => a + ch.charCodeAt(0), 0) % 4 === 0;
const dist = (a, b) => Math.hypot(a.lat - b.lat, (a.lng - b.lng) * Math.cos((a.lat * Math.PI) / 180));
const makeCode = () => 'SFPA-' + Array.from(crypto.getRandomValues(new Uint8Array(4))).map((b) => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[b % 32]).join('');

function icsFor({ centre, service, day, time, code }) {
  const [h, m] = time.split(':').map(Number);
  const start = `${day.replace(/-/g, '')}T${String(h).padStart(2, '0')}${String(m).padStart(2, '0')}00`;
  const endM = h * 60 + m + 30;
  const end = `${day.replace(/-/g, '')}T${String(Math.floor(endM / 60)).padStart(2, '0')}${String(endM % 60).padStart(2, '0')}00`;
  const body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//SFPA//Kochia//EN', 'BEGIN:VEVENT', `UID:${code}@sfpa-kochia`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`, `DTSTART;TZID=Africa/Khartoum:${start}`, `DTEND;TZID=Africa/Khartoum:${end}`,
    `SUMMARY:SFPA - ${service}`, `LOCATION:${centre}`, `DESCRIPTION:Booking code ${code}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const url = URL.createObjectURL(new Blob([body], { type: 'text/calendar' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: `sfpa-${code}.ics` });
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function BookingPage() {
  const { lang, t } = useSite();
  const b = t.book;
  const q = useQuery();
  const pre = SPECIALTIES.find((s) => s.slug === q.get('service') && s.bookable);
  const preC = FACILITIES.find((f) => f.id === q.get('centre'));

  const [step, setStep] = useState(preC ? (pre ? 3 : 2) : 1);
  const [centre, setCentre] = useState(preC?.id ?? null);
  const [service, setService] = useState(pre?.slug ?? null);
  const [day, setDay] = useState(null);
  const [time, setTime] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pref, setPref] = useState('wa');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(null);
  const [order, setOrder] = useState(FACILITIES);
  const [locMsg, setLocMsg] = useState('');

  const days = useMemo(() => nextDays(), []);
  const C = FACILITIES.find((f) => f.id === centre);
  const S = SPECIALTIES.find((s) => s.slug === service);
  const nm = (f) => (lang === 'ar' ? f.name_ar : f.name_en);
  const longDay = (d) => fmtDate(d, lang, { weekday: 'long', day: 'numeric', month: 'long' });

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

  function validateDetails() {
    const e = {};
    if (!name.trim()) e.name = b.nameErr;
    if (phone && !/^\d{9,12}$/.test(phone.replace(/\s/g, ''))) e.phone = b.phoneErr;
    setErrors(e);
    return !Object.keys(e).length;
  }

  function confirm() {
    if (!consent) return;
    setDone({ code: makeCode(), centre: C, service: S, day, time, pref });
    // Wipe personal details immediately; the confirmation screen does not need them.
    setName(''); setPhone(''); setConsent(false);
  }

  function reset(keep) {
    setDone(null); setDay(null); setTime(null);
    if (keep) { setStep(3); return; }
    setCentre(null); setService(null); setStep(1);
  }

  const prefLabel = { wa: b.prefWa, call: b.prefCall, none: b.prefNone };

  if (done) {
    const svc = tx(done.service.title, lang);
    const ctr = nm(done.centre);
    const shareMsg = `${b.shareText}\n${b.code}: ${done.code}\n${ctr}\n${svc}\n${longDay(done.day)}, ${done.time}`;
    return (
      <section className="sec book">
        <div className="wrap narrow">
          <div className="done card">
            <span className="done-icon"><Icon name="check" size={36} strokeWidth={2.4} /></span>
            <h1>{b.doneTitle} <span className="muted">{b.doneDemo}</span></h1>
            <p className="code">{b.code}: <strong dir="ltr">{done.code}</strong></p>
            <p className="muted">{b.arrive}</p>
            <dl className="summary">
              <div><dt>{b.centre}</dt><dd>{ctr}</dd></div>
              <div><dt>{b.service}</dt><dd>{svc}</dd></div>
              <div><dt>{b.day}</dt><dd>{longDay(done.day)}</dd></div>
              <div><dt>{b.time}</dt><dd dir="ltr">{done.time}</dd></div>
            </dl>
            <div className="btn-grid no-print">
              <button type="button" className="btn btn-outline" onClick={() => icsFor({ centre: done.centre.name_en, service: done.service.title.en, day: done.day, time: done.time, code: done.code })}><Icon name="calendar" size={18} />{b.addCal}</button>
              <a className="btn btn-wa" href={`https://wa.me/?text=${encodeURIComponent(shareMsg)}`} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={18} />{b.shareWa}</a>
              <button type="button" className="btn btn-outline" onClick={() => window.print()}><Icon name="printer" size={18} />{b.print}</button>
              <button type="button" className="btn btn-outline" onClick={() => reset(true)}><Icon name="clock" size={18} />{b.changeTime}</button>
              <button type="button" className="btn btn-cta" onClick={() => reset(false)}>{b.another}</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const canNext = { 1: !!centre, 2: !!service, 3: !!day, 4: !!time, 5: true, 6: consent }[step];
  function next() {
    if (step === 5 && !validateDetails()) return;
    if (step === 6) { confirm(); return; }
    setStep((s) => Math.min(TOTAL, s + 1));
    requestAnimationFrame(() => document.getElementById('book-step')?.focus());
  }
  function prev() { setStep((s) => Math.max(1, s - 1)); }

  return (
    <section className="sec book">
      <div className="wrap narrow">
        <p className="eyebrow">{b.eyebrow}</p>
        <h1 className="book-title">{b.title}</h1>
        <div className="demo-banner" role="note"><Icon name="lock" size={18} /><span><strong>{t.common.demo}.</strong> {b.demoBanner}</span></div>

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
              <div className="day-grid">
                {days.map((d) => (
                  <label key={d} className={`day${day === d ? ' on' : ''}`}>
                    <input type="radio" name="day" checked={day === d} onChange={() => { setDay(d); setTime(null); }} />
                    <small>{fmtDate(d, lang, { weekday: 'short' })}</small>
                    <strong>{fmtDate(d, lang, { day: 'numeric' })}</strong>
                    <small>{fmtDate(d, lang, { month: 'short' })}</small>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {step === 4 && (
            <fieldset>
              <legend className="h2">{b.s4}</legend>
              <p className="muted-sm">{longDay(day)}</p>
              <div className="time-grid">
                {TIMES.map((tm) => {
                  const full = isFull(day, tm);
                  return (
                    <label key={tm} className={`time${time === tm ? ' on' : ''}${full ? ' full' : ''}`}>
                      <input type="radio" name="time" disabled={full} checked={time === tm} onChange={() => setTime(tm)} />
                      <span dir="ltr">{tm}</span>{full && <small>{b.full}</small>}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          {step === 5 && (
            <fieldset>
              <legend className="h2">{b.s5}</legend>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setName(lang === 'ar' ? 'مستخدم تجريبي' : 'Demo User'); setPhone('249900000000'); setErrors({}); }}>{b.fillSample}</button>
              <div className="field">
                <label htmlFor="bk-name">{b.name} *</label>
                <input id="bk-name" autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'bk-name-e' : undefined} />
                {errors.name && <p className="err" id="bk-name-e">{errors.name}</p>}
              </div>
              <div className="field">
                <label htmlFor="bk-phone">{b.phone}</label>
                <input id="bk-phone" inputMode="numeric" autoComplete="off" dir="ltr" value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={!!errors.phone} aria-describedby="bk-phone-h" />
                <p className="hint" id="bk-phone-h">{errors.phone ? <span className="err">{errors.phone}</span> : b.phoneHint}</p>
              </div>
              <div className="field">
                <span className="label">{b.pref}</span>
                <div className="seg">
                  {Object.entries(prefLabel).map(([k, l]) => (
                    <label key={k} className={pref === k ? 'on' : ''}><input type="radio" name="pref" checked={pref === k} onChange={() => setPref(k)} />{l}</label>
                  ))}
                </div>
              </div>
            </fieldset>
          )}

          {step === 6 && (
            <div>
              <h2>{b.s6}</h2>
              <dl className="summary">
                {[[b.centre, nm(C), 1], [b.service, tx(S.title, lang), 2], [b.day, longDay(day), 3], [b.time, time, 4], [b.contact, `${name}${phone ? ` · ${phone}` : ''} · ${prefLabel[pref]}`, 5]].map(([k, v, st]) => (
                  <div key={k}><dt>{k}</dt><dd>{v}</dd><button type="button" className="link-btn" onClick={() => setStep(st)}>{b.change}</button></div>
                ))}
              </dl>
              <label className="consent">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                <span>{b.consent} <Link to="/privacy">{b.privacyMore}</Link></span>
              </label>
            </div>
          )}
        </div>

        <div className="book-nav">
          {step > 1 ? <button type="button" className="btn btn-outline" onClick={prev}>{b.prev}</button> : <span />}
          <button type="button" className="btn btn-cta" disabled={!canNext} onClick={next}>{step === 6 ? b.confirm : b.next}</button>
        </div>
      </div>
    </section>
  );
}
