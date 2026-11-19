import { Link } from '../lib/router.jsx';
import { useSite } from '../lib/site.jsx';

export default function NotFound() {
  const { t } = useSite();
  return (
    <section className="sec">
      <div className="wrap narrow center">
        <h1>{t.notFound.title}</h1>
        <p className="muted">{t.notFound.sub}</p>
        <Link to="/" className="btn btn-cta">{t.notFound.home}</Link>
      </div>
    </section>
  );
}
