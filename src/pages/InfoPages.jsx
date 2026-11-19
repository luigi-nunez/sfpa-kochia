import { useState } from 'react';
import { Link } from '../lib/router.jsx';
import { useSite } from '../lib/site.jsx';
import { tx, fmtDate, fmtNum, waLink } from '../lib/i18n.js';
import { SITE } from '../content/site.js';
import { PROGRAMMES, FEATURED_PROGRAMMES } from '../content/programmes.js';
import { ABOUT, DEPARTMENTS, PARTNERS } from '../content/org.js';
import { NEWS, getNews } from '../content/news.js';
import Icon from '../components/Icon.jsx';
import { PageHero, SectionHead, ProgrammeCard, NewsCard, CtaBand, WaButton, Pending } from '../components/site/Blocks.jsx';
import NotFound from './NotFound.jsx';

export function TelehealthPage() {
  const { t } = useSite();
  const x = t.tele;
  return (
    <>
      <section className="phero phero-navy">
        <div className="wrap tele-hero">
          <div>
            <p className="eyebrow light">{x.eyebrow}</p>
            <h1>{x.title}</h1>
            <p className="lead">{x.sub}</p>
            <div className="btn-row">
              <WaButton className="btn btn-wa btn-lg" />
              {SITE.callCentre && <a className="btn btn-light btn-lg" href={`tel:${SITE.callCentre}`}><Icon name="call" size={20} />{x.callNow} <span dir="ltr">{SITE.callCentre}</span></a>}
            </div>
          </div>
          <div className="chat-mock" aria-hidden="true">
            <div className="chat-head"><span className="icon-badge sm wa"><Icon name="whatsapp" size={16} /></span>{x.mockLabel}<span className="dot-online" /></div>
            <p className="bubble in">{x.mock1}</p>
            <p className="bubble out">{x.mock2}</p>
            <p className="bubble in">{x.mock3}</p>
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap two-col">
          <div>
            <h2>{x.whatTitle}</h2>
            <ul className="checks">{x.whatList.map((w) => <li key={w}><Icon name="check" size={18} />{w}</li>)}</ul>
          </div>
          <div className="benefits">
            {x.benefits.map((bn) => (
              <div key={bn.t} className="benefit"><span className="icon-badge"><Icon name={bn.icon} /></span><div><strong>{bn.t}</strong><p className="muted">{bn.d}</p></div></div>
            ))}
          </div>
        </div>
      </section>
      <section className="sec sec-soft">
        <div className="wrap">
          <SectionHead title={x.howTitle} center />
          <ol className="steps">
            {x.steps.map((s, i) => <li key={s.t}><span className="step-n">{i + 1}</span><h3>{s.t}</h3><p className="muted">{s.d}</p></li>)}
          </ol>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <div className="soon card">
            <span className="icon-badge"><Icon name="video" /></span>
            <div><h2 className="h3">{x.videoTitle} <Pending kind="comingSoon" /></h2><p className="muted">{x.videoSub}</p></div>
          </div>
        </div>
      </section>
    </>
  );
}

export function ProgrammesPage() {
  const { lang, t, wa } = useSite();
  const x = t.prog;
  return (
    <>
      <PageHero eyebrow={x.eyebrow} title={x.title} sub={x.sub} />
      <section className="sec">
        <div className="wrap grid-3">{PROGRAMMES.map((p) => <ProgrammeCard key={p.id} p={p} />)}</div>
      </section>
      {PROGRAMMES.map((p, i) => (
        <section key={p.id} id={p.id} className={`sec${i % 2 === 0 ? ' sec-soft' : ''}`}>
          <div className={`wrap prog-detail${i % 2 ? ' rev' : ''}`}>
            <div className={`prog-art art-${p.id}`} aria-hidden="true"><Icon name={p.icon} size={88} strokeWidth={1.1} /></div>
            <div>
              <div className="ncard-meta"><span className="tag">{tx(p.tag, lang)}</span><span className="tag tag-status">{x[p.status]}</span></div>
              <h2>{tx(p.title, lang)}</h2>
              <p className="lead">{tx(p.desc, lang)}</p>
              {tx(p.pillars, lang).length > 0 && <>
                <h3 className="h4">{x.pillars}</h3>
                <ul className="checks">{tx(p.pillars, lang).map((pl) => <li key={pl}><Icon name="check" size={18} />{pl}</li>)}</ul>
              </>}
              {p.cta.type === 'whatsapp'
                ? (wa() && <a className="btn btn-wa" href={wa(tx(p.cta.msg, lang))} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={18} />{tx(p.cta.label, lang)}</a>)
                : <Link className="btn btn-cta" to={p.cta.to}>{tx(p.cta.label, lang)}</Link>}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

export function NewsPage() {
  const { t } = useSite();
  return (
    <>
      <PageHero eyebrow={t.news.eyebrow} title={t.news.title} sub={t.news.sub} />
      <section className="sec">
        <div className="wrap">
          <div className="news-list">{NEWS.map((n, i) => <NewsCard key={n.slug} n={n} latest={i === 0} />)}</div>
        </div>
      </section>
    </>
  );
}

export function NewsArticle({ slug }) {
  const { lang, t } = useSite();
  const n = getNews(slug);
  if (!n) return <NotFound />;
  return (
    <article className="sec">
      <div className="wrap narrow prose">
        <Link to="/news" className="arrow-link back"><Icon name="arrow" size={16} className="flip-back" />{t.news.back}</Link>
        <div className="ncard-meta"><span className="tag">{tx(n.cat, lang)}</span>{n.sample && <Pending kind="sample" />}</div>
        <h1>{tx(n.title, lang)}</h1>
        <time dateTime={n.date} className="muted">{fmtDate(n.date, lang)}</time>
        <div className="img-ph" aria-hidden="true"><Icon name="globe" size={40} strokeWidth={1.2} /></div>
        {tx(n.body, lang).map((p) => <p key={p}>{p}</p>)}
      </div>
    </article>
  );
}

export function AboutPage() {
  const { lang, t } = useSite();
  const a = t.about;
  const year = (n) => n.toLocaleString(lang === 'ar' ? 'ar-SD' : 'en-US', { useGrouping: false });
  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} sub={a.sub} />
      <section className="sec">
        <div className="wrap grid-2">
          <div className="card mv"><span className="icon-badge"><Icon name="heart" /></span><h2 className="h3">{a.missionT}</h2><p>{tx(ABOUT.mission, lang)}</p></div>
          <div className="card mv"><span className="icon-badge"><Icon name="globe" /></span><h2 className="h3">{a.visionT}</h2><p>{tx(ABOUT.vision, lang)}</p></div>
        </div>
      </section>
      <section className="sec sec-soft">
        <div className="wrap">
          <SectionHead title={a.goalsT} center />
          <ol className="goals">{ABOUT.goals.map((g, i) => <li key={g.en}><span className="step-n">{fmtNum(i + 1, lang)}</span><p>{tx(g, lang)}</p></li>)}</ol>
        </div>
      </section>
      <section className="sec">
        <div className="wrap grid-2">
          <div>
            <h2>{a.historyT}</h2>
            <p className="founded"><span>{a.founded}</span> <strong>{year(SITE.founded)}</strong></p>
            <p>{tx(ABOUT.history, lang)}</p>
          </div>
          <div className="card ippf"><h2 className="h3">{a.ippfT}</h2><p>{tx(ABOUT.ippf, lang)}</p></div>
        </div>
      </section>
      <section className="sec sec-soft" id="departments">
        <div className="wrap">
          <SectionHead title={a.deptT} sub={a.deptSub} center />
          <div className="grid-3">
            {DEPARTMENTS.items.map((d) => (
              <div key={d.id} className="card dept">
                <span className="icon-badge sm"><Icon name={d.icon} size={18} /></span>
                <h3>{tx(d.name, lang)}</h3>
                {d.desc && <p className="muted">{tx(d.desc, lang)}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="sec" id="partners">
        <div className="wrap">
          <SectionHead title={a.partnersT} sub={a.partnersSub} center />
          <div className="grid-3">
            {PARTNERS.items.map((p) => (
              <div key={p.id} className="card partner">
                <span className="tag">{tx(p.type, lang)}</span>
                <h3>{tx(p.name, lang)}</h3>
                <p className="muted">{tx(p.role, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title={a.visit}>
        <Link to="/clinics" className="btn btn-light btn-lg">{t.nav.clinics}</Link>
        <Link to="/book" className="btn btn-cta btn-lg">{t.nav.book}</Link>
      </CtaBand>
    </>
  );
}

export function ContactPage() {
  const { lang, t } = useSite();
  const c = t.contact;
  const [reason, setReason] = useState(c.reasons[0]);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!msg.trim()) { setErr(c.msgErr); return; }
    setErr('');
    const text = `${c.reason}: ${reason}\n${name ? `${c.name.replace(/\s*\(.*\)/, '')}: ${name}\n` : ''}\n${msg}`;
    if (SITE.whatsapp) window.open(waLink(SITE.whatsapp, text), '_blank', 'noopener');
  }

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} sub={c.sub} />
      <section className="sec">
        <div className="wrap contact-grid">
          <form className="card" onSubmit={submit} noValidate>
            <div className="field">
              <label htmlFor="ct-reason">{c.reason}</label>
              <select id="ct-reason" value={reason} onChange={(e) => setReason(e.target.value)}>{c.reasons.map((r) => <option key={r}>{r}</option>)}</select>
            </div>
            <div className="field">
              <label htmlFor="ct-name">{c.name}</label>
              <input id="ct-name" autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="ct-msg">{c.message} *</label>
              <textarea id="ct-msg" rows={5} value={msg} onChange={(e) => setMsg(e.target.value)} aria-invalid={!!err} aria-describedby="ct-hint" />
              <p className="hint" id="ct-hint">{err ? <span className="err">{err}</span> : c.privacy}</p>
            </div>
            <button type="submit" className="btn btn-wa btn-block" disabled={!SITE.whatsapp}><Icon name="whatsapp" size={18} />{c.send}</button>
          </form>
          <aside>
            <h2 className="h3">{c.channels}</h2>
            <ul className="channel-list">
              {SITE.callCentre && <li><span className="icon-badge sm"><Icon name="call" size={18} /></span><div><small>{t.common.callUs}</small><a href={`tel:${SITE.callCentre}`} dir="ltr">{SITE.callCentre}</a></div></li>}
              {SITE.whatsapp && <li><span className="icon-badge sm wa"><Icon name="whatsapp" size={18} /></span><div><small>WhatsApp</small><a href={waLink(SITE.whatsapp, '')} dir="ltr" target="_blank" rel="noopener noreferrer">+{SITE.whatsapp}</a></div></li>}
              <li><span className="icon-badge sm"><Icon name="mail" size={18} /></span><div><small>{c.email}</small>{SITE.email ? <a href={`mailto:${SITE.email}`}>{SITE.email}</a> : <Pending />}</div></li>
              <li><span className="icon-badge sm"><Icon name="pin" size={18} /></span><div><small>{c.address}</small>{SITE.address ? tx(SITE.address, lang) : <Pending />}</div></li>
              <li><span className="icon-badge sm"><Icon name="clock" size={18} /></span><div><small>{c.hours}</small>{SITE.hours ? tx(SITE.hours, lang) : t.clinics.hoursAsk}</div></li>
              {SITE.socials.length > 0 && <li><span className="icon-badge sm"><Icon name="globe" size={18} /></span><div><small>{c.social}</small><span className="social-links">{SITE.socials.map((so) => <a key={so.id} href={so.url} target="_blank" rel="noopener noreferrer">{so.id}</a>)}</span></div></li>}
            </ul>
            <Link to="/clinics" className="arrow-link">{t.nav.clinics}<Icon name="arrow" size={16} className="flip" /></Link>
          </aside>
        </div>
      </section>
    </>
  );
}

export function DonatePage() {
  const { t } = useSite();
  const d = t.donate;
  return (
    <>
      <PageHero eyebrow={d.eyebrow} title={d.title} sub={d.sub} tone="navy" />
      <section className="sec">
        <div className="wrap donate-grid">
          <div className="card donate-box">
            <span className="pill pill-soft"><Icon name="lock" size={14} />{d.secure}</span>
            <h2>{d.donateNow}</h2>
            {SITE.donationUrl
              ? <a className="btn btn-cta btn-lg btn-block" href={SITE.donationUrl} target="_blank" rel="noopener noreferrer">{d.donateNow}</a>
              : <><button type="button" className="btn btn-cta btn-lg btn-block" disabled>{d.donateNow}</button><p className="notice">{d.pending}</p></>}
            <p className="muted-sm">{d.noCard}</p>
          </div>
          <div>
            <h2 className="h3">{d.stepsT}</h2>
            <ol className="steps compact">{d.steps.map((s, i) => <li key={s}><span className="step-n">{i + 1}</span><p>{s}</p></li>)}</ol>
          </div>
        </div>
      </section>
      <section className="sec sec-soft">
        <div className="wrap">
          <SectionHead title={d.where} center />
          <div className="grid-3">{FEATURED_PROGRAMMES.map((p) => <ProgrammeCard key={p.id} p={p} />)}</div>
        </div>
      </section>
      <CtaBand title={d.partnersT} sub={d.partners}>
        <Link to="/contact" className="btn btn-light btn-lg">{d.write}</Link>
        <WaButton className="btn btn-wa btn-lg" />
      </CtaBand>
    </>
  );
}

export function PrivacyPage() {
  const { t } = useSite();
  return (
    <section className="sec">
      <div className="wrap narrow prose">
        <h1>{t.privacy.title}</h1>
        {t.privacy.body.map((p) => <p key={p} className={/^(Placeholder|محتوى مؤقت)/.test(p) ? 'placeholder-text' : ''}>{p}</p>)}
      </div>
    </section>
  );
}
