import { Link } from '../lib/router.jsx';
import { useSite } from '../lib/site.jsx';
import { tx, fmtNum } from '../lib/i18n.js';
import { GROUPS, SPECIALTIES, getSpecialty } from '../content/specialties.js';
import { SERVICES } from '../data/services.js';
import Icon from '../components/Icon.jsx';
import { PageHero, SectionHead, ServiceTile, CtaBand, WaButton } from '../components/site/Blocks.jsx';
import NotFound from './NotFound.jsx';

function ServiceEntry({ s }) {
  const { lang, t } = useSite();
  return (
    <article className="sentry" id={s.slug}>
      <div className={`sentry-art art-${s.group}`}><Icon name={s.icon} size={40} strokeWidth={1.4} /></div>
      <div className="sentry-body">
        <h3><Link to={`/services/${s.slug}`}>{tx(s.title, lang)}</Link></h3>
        <p className="muted">{tx(s.summary, lang)}</p>
        <ul className="checks sm">{tx(s.bullets, lang).map((b) => <li key={b}><Icon name="check" size={16} />{b}</li>)}</ul>
        <div className="btn-row">
          {s.bookable
            ? <Link to={`/book?service=${s.slug}`} className="btn btn-cta btn-sm">{t.common.bookThis}</Link>
            : <WaButton className="btn btn-wa btn-sm" label={t.common.askWhatsapp} text={`${tx(s.title, lang)}`} />}
          <Link to={`/services/${s.slug}`} className="btn btn-outline btn-sm">{t.common.learnMore}</Link>
        </div>
      </div>
    </article>
  );
}

export function ServicesPage() {
  const { lang, t } = useSite();
  const sv = t.services;
  return (
    <>
      <PageHero eyebrow={sv.eyebrow} title={sv.title} sub={sv.sub}>
        <nav className="anchor-row" aria-label={sv.eyebrow}>
          {GROUPS.map((g) => <Link key={g.id} to={`/services#${g.id}`} className="anchor-chip"><Icon name={g.icon} size={18} />{tx(g.title, lang)}</Link>)}
          <Link to="/services/prices" className="anchor-chip alt">{sv.seePrices}</Link>
        </nav>
      </PageHero>
      {GROUPS.map((g, i) => (
        <section key={g.id} id={g.id} className={`sec${i % 2 ? ' sec-soft' : ''}`}>
          <div className="wrap">
            <SectionHead title={tx(g.title, lang)} sub={tx(g.desc, lang)} />
            <div className="sentries">{SPECIALTIES.filter((s) => s.group === g.id).map((s) => <ServiceEntry key={s.slug} s={s} />)}</div>
          </div>
        </section>
      ))}
      <CtaBand title={sv.questionTitle} sub={sv.questionSub}>
        <WaButton className="btn btn-light btn-lg" />
      </CtaBand>
    </>
  );
}

export function ServiceDetailPage({ slug }) {
  const { lang, t } = useSite();
  const s = getSpecialty(slug);
  if (!s) return <NotFound />;
  const g = GROUPS.find((x) => x.id === s.group);
  const prices = s.priceIds.map((id) => SERVICES.find((p) => p.id === id)).filter(Boolean);
  const related = SPECIALTIES.filter((x) => x.group === s.group && x.slug !== s.slug);
  const sv = t.services;

  return (
    <>
      <section className={`phero phero-soft`}>
        <div className="wrap detail-hero">
          <div>
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link to="/services">{t.nav.services}</Link><span aria-hidden="true">/</span>
              <Link to={`/services#${g.id}`}>{tx(g.title, lang)}</Link>
            </nav>
            <h1>{tx(s.title, lang)}</h1>
            <p className="lead">{tx(s.summary, lang)}</p>
            <div className="btn-row">
              {s.bookable
                ? <Link to={`/book?service=${s.slug}`} className="btn btn-cta btn-lg"><Icon name="calendar" size={20} />{t.nav.book}</Link>
                : <p className="note">{sv.notBookable}</p>}
              <WaButton className={s.bookable ? 'btn btn-outline btn-lg' : 'btn btn-wa btn-lg'} label={t.common.askWhatsapp} text={tx(s.title, lang)} />
            </div>
          </div>
          <div className={`detail-art art-${s.group}`} aria-hidden="true"><Icon name={s.icon} size={96} strokeWidth={1.1} /></div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap detail-grid">
          <div className="card">
            <h2 className="h3">{sv.includes}</h2>
            <ul className="checks">{tx(s.bullets, lang).map((b) => <li key={b}><Icon name="check" size={18} />{b}</li>)}</ul>
          </div>
          <div className="card">
            <h2 className="h3">{sv.pricesTitle}</h2>
            <ul className="price-list">
              {prices.map((p) => (
                <li key={p.id}>
                  <span>{lang === 'ar' ? p.ar : p.en}</span>
                  {p.price === null ? <span className="svc-free">{t.common.free}</span> : <strong className="price">{fmtNum(p.price, 'en')} {t.common.sdg}</strong>}
                </li>
              ))}
            </ul>
            <p className="muted-sm">{lang === 'ar' ? 'الأسعار استرشادية وقابلة للتغيير.' : 'Prices are indicative and may change.'}</p>
            <Link to="/services/prices" className="arrow-link">{sv.seePrices}<Icon name="arrow" size={16} className="flip" /></Link>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="sec sec-soft">
          <div className="wrap">
            <SectionHead title={sv.related} />
            <div className="tiles">{related.map((r) => <ServiceTile key={r.slug} s={r} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
