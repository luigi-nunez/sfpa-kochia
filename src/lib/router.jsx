// Minimal client-side router built on the History API. No dependency needed;
// vercel.json already rewrites every path to index.html, and the service worker
// serves index.html for navigations when offline.
import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const RouterContext = createContext(null);

function readLocation() {
  return { path: window.location.pathname.replace(/\/+$/, '') || '/', search: window.location.search, hash: window.location.hash };
}

export function RouterProvider({ children }) {
  const [loc, setLoc] = useState(readLocation);

  useEffect(() => {
    const onPop = () => setLoc(readLocation());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to, { replace = false } = {}) => {
    const current = window.location.pathname + window.location.search + window.location.hash;
    if (to !== current) window.history[replace ? 'replaceState' : 'pushState']({}, '', to);
    setLoc(readLocation());
  }, []);

  // Scroll to an anchor when present, otherwise to the top, after each navigation.
  useEffect(() => {
    if (loc.hash) {
      const el = document.getElementById(decodeURIComponent(loc.hash.slice(1)));
      if (el) { el.scrollIntoView({ block: 'start' }); return; }
    }
    window.scrollTo(0, 0);
  }, [loc.path, loc.hash]);

  return <RouterContext.Provider value={{ ...loc, navigate }}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  return useContext(RouterContext);
}

export function useQuery() {
  const { search } = useRouter();
  return new URLSearchParams(search);
}

export function Link({ to, children, onClick, className, ...rest }) {
  const { navigate, path } = useRouter();
  const external = /^(https?:|mailto:|tel:)/.test(to);
  if (external) {
    return <a href={to} className={className} target={to.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" {...rest}>{children}</a>;
  }
  const active = to === '/' ? path === '/' : path === to.split(/[?#]/)[0] || path.startsWith(to.split(/[?#]/)[0] + '/');
  return (
    <a
      href={to}
      className={className}
      aria-current={active && to.split(/[?#]/)[0] === path ? 'page' : undefined}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

// Matches "/services/:slug" style patterns. Returns params or null.
export function match(pattern, path) {
  const p = pattern.split('/').filter(Boolean);
  const s = path.split('/').filter(Boolean);
  if (p.length !== s.length) return null;
  const params = {};
  for (let i = 0; i < p.length; i++) {
    if (p[i].startsWith(':')) params[p[i].slice(1)] = decodeURIComponent(s[i]);
    else if (p[i] !== s[i]) return null;
  }
  return params;
}
