import { useEffect, useState } from 'react';

export type Route = 'home' | 'about' | 'products' | 'gallery' | 'contact' | 'admin/products' | 'admin/login';

export type RouteQuery = Record<string, string>;

const routeFromHash = (): { route: Route; query: RouteQuery } => {
  const raw = window.location.hash.replace('#/', '').replace('#', '');
  const [path, queryString] = raw.split('?');
  const valid: Route[] = ['home', 'about', 'products', 'gallery', 'contact', 'admin/products', 'admin/login'];
  const route = (valid.includes(path as Route) ? path : 'home') as Route;
  const query: RouteQuery = {};
  if (queryString) {
    for (const pair of queryString.split('&')) {
      const [key, val] = pair.split('=');
      if (key) query[decodeURIComponent(key)] = decodeURIComponent(val || '');
    }
  }
  return { route, query };
};

export function useRoute(): [Route, RouteQuery, (r: Route, query?: RouteQuery) => void] {
  const [state, setState] = useState(() => routeFromHash());

  useEffect(() => {
    const onHash = () => {
      setState(routeFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (r: Route, query?: RouteQuery) => {
    const qs = query && Object.keys(query).length > 0
      ? '?' + Object.entries(query).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&')
      : '';
    window.location.hash = `/${r}${qs}`;
  };

  return [state.route, state.query, navigate];
}
