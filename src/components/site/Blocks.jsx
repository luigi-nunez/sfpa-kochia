import { Link } from '../../lib/router.jsx';
import { useSite } from '../../lib/site.jsx';
import { tx, fmtDate } from '../../lib/i18n.js';
import Icon from '../Icon.jsx';

export function Pending({ label, kind = 'tbc' }) {
  const { t } = useSite();
  return <span className={`pending pending-${kind}`}>{label ?? t.common[kind] ?? t.common.tbc}</span>;
}

export function PageHero({ eyebrow, title, sub, children, tone = 'soft' }) {
  return (
    <section className={`phero phero-${tone}`}>
      <div className="wrap">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {sub && <p className="lead">{sub}</p>}
        {children}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, sub, action, center }) {
  return (
    <div className={`shead${center ? ' center' : ''}`}>
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {sub && <p className="muted">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function ServiceTile({ s }) {
  const { lang } = useSite();
  return (
    <Link to={`/services/${s.slug}`} className="stile">
      <span className="icon-badge"><Icon name={s.icon} /></span>
      <span className="stile-t">{tx(s.title, lang)}</span>
      <Icon name="arrow" size={16} className="stile-arrow flip" />
    </Link>
  );
}

export function ProgrammeCard({ p, anchor = true }) {
  const { lang, t } = useSite();
  return (
    <article className="pcard">
      <div className={`pcard-art art-${p.id}`}><Icon name={p.icon} size={44} strokeWidth={1.4} /></div>
      <div className="pcard-body">
        <span className="tag">{tx(p.tag, lang)}</span>
        {p.placeholder && <Pending kind="placeholder" />}
        <h3>{tx(p.title, lang)}</h3>
        <Link to={anchor ? `/programmes#${p.id}` : p.cta.to} className="arrow-link">{t.prog.know}<Icon name="arrow" size={16} className="flip" /></Link>
      </div>
    </article>
  );
}

export function NewsCard({ n, latest }) {
  const { lang, t } = useSite();
  return (
    <article className="ncard">
      <div className="ncard-meta">
        {latest && <span className="tag tag-cta">{t.news.latest}</span>}
        <span className="tag">{tx(n.cat, lang)}</span>
        {n.sample && <Pending kind="sample" />}
      </div>
      <time dateTime={n.date} className="muted-sm">{fmtDate(n.date, lang)}</time>
      <h3><Link to={`/news/${n.slug}`}>{tx(n.title, lang)}</Link></h3>
      <p className="muted">{tx(n.excerpt, lang)}</p>
      <Link to={`/news/${n.slug}`} className="arrow-link" aria-hidden="true" tabIndex={-1}>{t.common.readMore}<Icon name="arrow" size={16} className="flip" /></Link>
    </article>
  );
}

export function CtaBand({ title, sub, children }) {
  return (
    <section className="cta-band">
      <div className="wrap cta-in">
        <div><h2>{title}</h2>{sub && <p>{sub}</p>}</div>
        <div className="btn-row">{children}</div>
      </div>
    </section>
  );
}

export function WaButton({ text, label, className = 'btn btn-wa' }) {
  const { t, wa } = useSite();
  const href = wa(text);
  if (!href) return <span className={`${className} is-disabled`} aria-disabled="true"><Icon name="whatsapp" size={18} />{t.common.comingSoon}</span>;
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={18} />{label ?? t.common.whatsappUs}</a>;
}
