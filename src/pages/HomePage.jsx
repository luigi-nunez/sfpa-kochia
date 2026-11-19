import { useState } from 'react';
import { Link } from '../lib/router.jsx';
import { useSite } from '../lib/site.jsx';
import { tx, fmtNum } from '../lib/i18n.js';
import { GROUPS, SPECIALTIES } from '../content/specialties.js';
import { FEATURED_PROGRAMMES } from '../content/programmes.js';
import { NEWS } from '../content/news.js';
import { SITE } from '../content/site.js';
import Icon from '../components/Icon.jsx';
import { SectionHead, ServiceTile, ProgrammeCard, NewsCard, CtaBand, WaButton } from '../components/site/Blocks.jsx';

function HeroArt() {
  const { t } = useSite();
  const h = t.home;
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="hero-blob" />
      <img src="/logo.png" alt="" className="hero-logo" />
      <div className="float-card fc-1">
        <span className="icon-badge sm"><Icon name="calendar" size={18} /></span>
        <span><small>{h.heroCard1}</small><strong>{h.heroCard1v}</strong></span>
      </div>
      <div className="float-card fc-2">
        <span className="icon-badge sm wa"><Icon name="whatsapp" size={18} /></span>
        <span><small>{h.heroCard2}</small><strong>{h.heroCard2v}</strong></span>
      </div>
      <div className="float-card fc-3">
        <span className="icon-badge sm"><Icon name="lock" size={18} /></span>
        <strong>{h.heroCard3}</strong>
      </div>
      <div className="hero-badge">
        <strong>{h.badgeTitle}</strong>
        <small>{h.badgeSub}</small>
      </div>
    </div>
  );
}

function Specialties() {
  const { lang, t } = useSite();
  const featured = SPECIALTIES.filter((s) => s.featured);
  const [active, setActive] = useState(featured[0].slug);
  const s = featured.find((x) => x.slug === active);
  return (
    <section className="sec">
      <div className="wrap">
        <SectionHead eyebrow={t.home.specEyebrow} title={t.home.specTitle} center />
        <div className="chips center" role="tablist" aria-label={t.home.specEyebrow}>
          {featured.map((f) => (
            <button key={f.slug} role="tab" id={`tab-${f.slug}`} aria-selected={active === f.slug} aria-controls="spec-panel" className={`chip${active === f.slug ? ' on' : ''}`} onClick={() => setActive(f.slug)}>
              {tx(f.title, lang)}
            </button>
          ))}
        </div>
        <div className="spec-panel" id="spec-panel" role="tabpanel" aria-labelledby={`tab-${s.slug}`}>
          <div className={`spec-art art-${s.group}`}><Icon name={s.icon} size={72} strokeWidth={1.2} /></div>
          <div className="spec-body">
            <h3>{tx(s.title, lang)}</h3>
            <p className="muted">{tx(s.summary, lang)}</p>
            <ul className="checks">
              {tx(s.bullets, lang).map((b) => <li key={b}><Icon name="check" size={18} />{b}</li>)}
            </ul>
            <div className="btn-row">
              <Link to={`/book?service=${s.slug}`} className="btn btn-cta">{t.common.bookThis}: {tx(s.title, lang)}</Link>
              <Link to={`/services/${s.slug}`} className="btn btn-outline">{t.common.learnMore}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { lang, t } = useSite();
  const h = t.home;

  return (
    <>
      <section className="home-hero">
        <div className="wrap home-hero-in">
          <div className="hero-copy">
            <p className="eyebrow">{h.eyebrow}</p>
            <h1>{h.title}</h1>
            <p className="lead">{h.sub}</p>
            <ul className="hero-points">
              {h.points.map((p) => <li key={p}><Icon name="check" size={18} />{p}</li>)}
            </ul>
            <div className="btn-row">
              <Link to="/book" className="btn btn-cta btn-lg"><Icon name="calendar" size={20} />{h.ctaBook}</Link>
              <Link to="/programmes" className="btn btn-outline btn-lg">{h.ctaProgrammes}</Link>
            </div>
          </div>
          <HeroArt />
        </div>
      </section>

      <div className="wrap quick">
        {h.quick.map((q) => (
          <Link key={q.to} to={q.to} className="qcard">
            <span className="icon-badge"><Icon name={q.icon} /></span>
            <span className="qcard-t">{q.title}</span>
            <span className="muted">{q.desc}</span>
            <Icon name="arrow" size={18} className="qcard-arrow flip" />
          </Link>
        ))}
        {SITE.callCentre && (
          <a href={`tel:${SITE.callCentre}`} className="qcard qcard-call">
            <span className="icon-badge"><Icon name="call" /></span>
            <span className="qcard-t">{h.callTitle} <span dir="ltr">{SITE.callCentre}</span></span>
            <span className="muted">{h.callDesc}</span>
            <Icon name="arrow" size={18} className="qcard-arrow flip" />
          </a>
        )}
      </div>


      <Specialties />

      <section className="sec sec-soft">
        <div className="wrap">
          <SectionHead eyebrow={h.catalogEyebrow} title={h.catalogTitle} action={<Link to="/services" className="arrow-link">{t.nav.allServices}<Icon name="arrow" size={16} className="flip" /></Link>} />
          <div className="cat-groups">
            {GROUPS.map((g) => (
              <div key={g.id} className="cat-group">
                <h3><Link to={`/services#${g.id}`}>{tx(g.title, lang)}</Link></h3>
                <div className="tiles">
                  {SPECIALTIES.filter((s) => s.group === g.id).map((s) => <ServiceTile key={s.slug} s={s} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHead eyebrow={h.progEyebrow} title={h.progTitle} center />
          <div className="grid-3">{FEATURED_PROGRAMMES.map((p) => <ProgrammeCard key={p.id} p={p} />)}</div>
        </div>
      </section>

      <section className="sec sec-soft">
        <div className="wrap">
          <SectionHead eyebrow={h.newsEyebrow} title={h.newsTitle} action={<Link to="/news" className="arrow-link">{h.newsAll}<Icon name="arrow" size={16} className="flip" /></Link>} />
          <div className="grid-3">{NEWS.slice(0, 3).map((n, i) => <NewsCard key={n.slug} n={n} latest={i === 0} />)}</div>
        </div>
      </section>

      <CtaBand title={h.ctaTitle} sub={h.ctaSub}>
        <Link to="/book" className="btn btn-cta btn-lg">{h.bookOnline}</Link>
        {SITE.callCentre && <a className="btn btn-light btn-lg" href={`tel:${SITE.callCentre}`}><Icon name="call" size={20} />{t.common.callUs} <span dir="ltr">{SITE.callCentre}</span></a>}
        <WaButton className="btn btn-light btn-lg" />
      </CtaBand>
    </>
  );
}
