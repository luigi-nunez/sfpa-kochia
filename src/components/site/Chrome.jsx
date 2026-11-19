// Site chrome modelled on CEMOPLAF: sticky header with mega menu and booking CTA,
// mobile drawer, sticky mobile action bar, dark four-column footer, and a donation modal.
import { useEffect, useRef, useState } from 'react';
import { Link, useRouter } from '../../lib/router.jsx';
import { useSite, useInstall } from '../../lib/site.jsx';
import { tx } from '../../lib/i18n.js';
import { GROUPS, SPECIALTIES } from '../../content/specialties.js';
import { SITE } from '../../content/site.js';
import Icon from '../Icon.jsx';
import ThemeToggle from '../ThemeToggle.jsx';

function Brand({ compact = false }) {
  const { lang } = useSite();
  return (
    <Link to="/" className="brand-link" aria-label={tx(SITE.name, lang)}>
      <span className="brand-chip"><img src="/logo.png" alt="" width="60" height="31" /></span>
      {!compact && (
        <span className="brand-text">
          <strong>{tx(SITE.short, lang)}</strong>
          <small>{lang === 'ar' ? 'Sudan Family Planning Association' : 'جمعية تنظيم الأسرة السودانية'}</small>
        </span>
      )}
    </Link>
  );
}

function LangButton() {
  const { lang, toggleLang } = useSite();
  return (
    <button type="button" className="lang-btn" onClick={toggleLang} lang={lang === 'ar' ? 'en' : 'ar'} aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}>
      {lang === 'ar' ? 'EN' : 'عربي'}
    </button>
  );
}

function Dropdown({ id, label, open, setOpen, children, wide }) {
  const ref = useRef(null);
  useEffect(() => {
    if (open !== id) return;
    const onDoc = (e) => { if (!ref.current?.contains(e.target)) setOpen(null); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(null); };
    document.addEventListener('pointerdown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open, id, setOpen]);
  const isOpen = open === id;
  const viaHover = useRef(false);
  return (
    <div className={`dd${isOpen ? ' open' : ''}`} ref={ref}
      onMouseEnter={() => { if (open !== id) { viaHover.current = true; setOpen(id); } }}
      onMouseLeave={() => { viaHover.current = false; setOpen(null); }}>
      <button type="button" className="hnav-link" aria-expanded={isOpen} aria-controls={`dd-${id}`}
        onClick={() => { if (viaHover.current) { viaHover.current = false; return; } setOpen(isOpen ? null : id); }}>
        {label}<Icon name="chevron" size={16} />
      </button>
      <div id={`dd-${id}`} className={`dd-panel${wide ? ' wide' : ''}`} hidden={!isOpen} onClick={(e) => { if (e.target.closest('a')) setOpen(null); }}>
        {children}
      </div>
    </div>
  );
}

export function Header({ theme, toggleTheme }) {
  const { lang, t } = useSite();
  const { path } = useRouter();
  const [open, setOpen] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setDrawer(false); setOpen(null); }, [path]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => { document.body.style.overflow = drawer ? 'hidden' : ''; }, [drawer]);

  const n = t.nav;
  return (
    <>
      <a href="#main-content" className="skip">{n.skip}</a>
      <header className={`hdr${scrolled ? ' scrolled' : ''}`}>
        <div className="wrap hdr-in">
          <Brand />
          <nav className="hnav" aria-label="Main">
            <Link to="/about" className="hnav-link">{n.about}</Link>
            <Dropdown id="svc" label={n.services} open={open} setOpen={setOpen} wide>
              <div className="mega">
                {GROUPS.map((g) => (
                  <div key={g.id} className="mega-col">
                    <Link to={`/services#${g.id}`} className="mega-head"><Icon name={g.icon} size={18} />{tx(g.title, lang)}</Link>
                    {SPECIALTIES.filter((s) => s.group === g.id).map((s) => (
                      <Link key={s.slug} to={`/services/${s.slug}`} className="mega-link">{tx(s.title, lang)}</Link>
                    ))}
                  </div>
                ))}
              </div>
              <div className="mega-foot">
                <Link to="/services" className="mega-all">{n.allServices}<Icon name="arrow" size={16} className="flip" /></Link>
                <Link to="/services/prices" className="mega-all">{n.prices}<Icon name="arrow" size={16} className="flip" /></Link>
              </div>
            </Dropdown>
            <Link to="/programmes" className="hnav-link">{n.programmes}</Link>
            <Link to="/clinics" className="hnav-link">{n.clinics}</Link>
            <Link to="/telehealth" className="hnav-link">{n.telehealth}</Link>
            <Dropdown id="learn" label={n.learn} open={open} setOpen={setOpen}>
              <Link to="/learn" className="dd-link"><Icon name="book" size={18} />{n.articles}</Link>
              <Link to="/tools" className="dd-link"><Icon name="check" size={18} />{n.tools}</Link>
              <Link to="/faq" className="dd-link"><Icon name="chat" size={18} />{n.faq}</Link>
            </Dropdown>
            <Link to="/news" className="hnav-link">{n.news}</Link>
            <Link to="/contact" className="hnav-link">{n.contact}</Link>
            <Link to="/donate" className="hnav-link">{n.donate}</Link>
          </nav>
          <div className="hdr-acts">
            <ThemeToggle theme={theme} onToggle={toggleTheme} lang={lang} />
            <LangButton />
            <Link to="/book" className="btn btn-cta hdr-cta"><Icon name="calendar" size={18} />{n.book}</Link>
            <button type="button" className="burger" aria-label={n.menu} aria-expanded={drawer} aria-controls="drawer" onClick={() => setDrawer(true)}>
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>
      <Drawer open={drawer} onClose={() => setDrawer(false)} theme={theme} toggleTheme={toggleTheme} />
    </>
  );
}

function Drawer({ open, onClose, theme, toggleTheme }) {
  const { lang, t, wa } = useSite();
  const n = t.nav;
  const panel = useRef(null);
  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector('button')?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  return (
    <div className={`drawer-ov${open ? ' open' : ''}`} onClick={onClose} aria-hidden={!open}>
      <div id="drawer" className="drawer" role="dialog" aria-modal="true" aria-label={n.menu} ref={panel} onClick={(e) => e.stopPropagation()} inert={open ? undefined : ''}>
        <div className="drawer-top">
          <Brand compact />
          <div className="hdr-acts">
            <ThemeToggle theme={theme} onToggle={toggleTheme} lang={lang} />
            <LangButton />
            <button type="button" className="burger" onClick={onClose} aria-label={n.close}><Icon name="close" /></button>
          </div>
        </div>
        <Link to="/book" className="btn btn-cta btn-block"><Icon name="calendar" size={18} />{n.book}</Link>
        <nav className="drawer-nav" aria-label={n.menu}>
          <Link to="/">{n.home}</Link>
          <Link to="/about">{n.about}</Link>
          <details>
            <summary>{n.services}<Icon name="chevron" size={18} /></summary>
            <Link to="/services" className="sub">{n.allServices}</Link>
            {GROUPS.map((g) => <Link key={g.id} to={`/services#${g.id}`} className="sub">{tx(g.title, lang)}</Link>)}
            <Link to="/services/prices" className="sub">{n.prices}</Link>
          </details>
          <Link to="/programmes">{n.programmes}</Link>
          <Link to="/clinics">{n.clinics}</Link>
          <Link to="/telehealth">{n.telehealth}</Link>
          <details>
            <summary>{n.learn}<Icon name="chevron" size={18} /></summary>
            <Link to="/learn" className="sub">{n.articles}</Link>
            <Link to="/tools" className="sub">{n.tools}</Link>
            <Link to="/faq" className="sub">{n.faq}</Link>
          </details>
          <Link to="/news">{n.news}</Link>
          <Link to="/contact">{n.contact}</Link>
          <Link to="/donate">{n.donate}</Link>
        </nav>
        {wa() && <a className="btn btn-wa btn-block" href={wa()} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={18} />{t.common.whatsappUs}</a>}
        <InstallButton className="btn btn-ghost btn-block" />
      </div>
    </div>
  );
}

export function InstallButton({ className }) {
  const { t } = useSite();
  const { installed, canPrompt, isIOS, install } = useInstall();
  const [hint, setHint] = useState(false);
  if (installed || (!canPrompt && !isIOS)) return null;
  return (
    <>
      <button type="button" className={className} onClick={() => (canPrompt ? install() : setHint((h) => !h))}>
        <Icon name="download" size={18} />{t.nav.install}
      </button>
      {hint && <p className="install-hint">{t.install.iosHint}</p>}
    </>
  );
}

export function MobileBar() {
  const { t, wa } = useSite();
  const n = t.nav;
  return (
    <nav className="mbar" aria-label="Quick actions">
      <Link to="/" className="mbar-i"><Icon name="home" /><span>{n.home}</span></Link>
      <Link to="/learn" className="mbar-i"><Icon name="book" /><span>{n.learn}</span></Link>
      <Link to="/book" className="mbar-i mbar-cta"><span className="mbar-fab"><Icon name="calendar" /></span><span>{n.bookShort}</span></Link>
      <Link to="/clinics" className="mbar-i"><Icon name="pin" /><span>{n.clinics}</span></Link>
      {wa() ? (
        <a href={wa()} className="mbar-i mbar-wa" target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" /><span>{n.whatsapp}</span></a>
      ) : (
        <Link to="/contact" className="mbar-i"><Icon name="chat" /><span>{n.contact}</span></Link>
      )}
    </nav>
  );
}

export function FloatingActions() {
  const { t, wa } = useSite();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  return (
    <>
      <button type="button" className="donate-tab" onClick={() => setOpen(true)}><Icon name="gift" size={18} />{t.nav.donate}</button>
      {wa() && (
        <a className="wa-fab" href={wa()} target="_blank" rel="noopener noreferrer" aria-label={t.common.whatsappUs}><Icon name="whatsapp" size={28} /></a>
      )}
      {open && (
        <div className="ov" onClick={() => setOpen(false)}>
          <div className="dmodal" role="dialog" aria-modal="true" aria-labelledby="dmodal-t" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="mclose" onClick={() => setOpen(false)} aria-label={t.nav.close} autoFocus><Icon name="close" size={18} /></button>
            <span className="pill pill-soft"><Icon name="lock" size={14} />{t.donate.secure}</span>
            <h2 id="dmodal-t">{t.donate.modalT}</h2>
            <p>{t.donate.modalD}</p>
            <Link to="/donate" className="btn btn-cta btn-block" onClick={() => setOpen(false)}>{t.donate.donateNow}</Link>
          </div>
        </div>
      )}
    </>
  );
}

export function Footer() {
  const { lang, t, wa } = useSite();
  const f = t.footer;
  const n = t.nav;
  return (
    <footer className="ftr">
      <div className="wrap ftr-grid">
        <div className="ftr-brand">
          <span className="brand-chip lg"><img src="/logo.png" alt={tx(SITE.name, lang)} width="94" height="48" /></span>
          <p>{f.about}</p>
          <div className="ftr-social">
            {SITE.socials.length ? SITE.socials.map((s) => <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer">{s.id}</a>) : <span className="muted-sm">{f.socialsPending}</span>}
          </div>
          {wa() && <a className="btn btn-wa btn-sm" href={wa()} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={16} />{t.common.whatsappUs}</a>}
        </div>
        <div>
          <h3>{f.navT}</h3>
          <ul>
            {[['/', n.home], ['/about', n.about], ['/services', n.services], ['/programmes', n.programmes], ['/clinics', n.clinics], ['/telehealth', n.telehealth], ['/news', n.news], ['/donate', n.donate], ['/contact', n.contact]].map(([to, l]) => (
              <li key={to}><Link to={to}>{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3>{f.servicesT}</h3>
          <ul>
            {SPECIALTIES.filter((s) => s.featured).map((s) => <li key={s.slug}><Link to={`/services/${s.slug}`}>{tx(s.title, lang)}</Link></li>)}
            <li><Link to="/services/prices">{n.prices}</Link></li>
          </ul>
        </div>
        <div>
          <h3>{f.contactT}</h3>
          <ul className="ftr-contact">
            <li><Icon name="pin" size={18} /><span>{SITE.address ? tx(SITE.address, lang) : `${t.contact.address}: ${t.common.tbc}`}</span></li>
            {SITE.callCentre && <li><Icon name="call" size={18} /><a href={`tel:${SITE.callCentre}`} dir="ltr">{SITE.callCentre}</a></li>}
            <li><Icon name="mail" size={18} /><span>{SITE.email || `${t.contact.email}: ${t.common.tbc}`}</span></li>
            <li><Icon name="clock" size={18} /><span>{SITE.hours ? tx(SITE.hours, lang) : `${t.contact.hours}: ${t.common.tbc}`}</span></li>
          </ul>
          <InstallButton className="btn btn-outline-light btn-sm" />
        </div>
      </div>
      <div className="wrap ftr-legal">
        <p>{f.disclaimer}</p>
        <p>{f.ippf}</p>
        <p>© {new Date().getFullYear()} {f.rights} · <Link to="/privacy">{f.privacy}</Link></p>
      </div>
    </footer>
  );
}
