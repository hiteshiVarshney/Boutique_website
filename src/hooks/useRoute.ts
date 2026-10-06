import { useEffect, useState } from 'react';

export type Route = 'home' | 'about' | 'products' | 'gallery' | 'contact' | 'admin/products';

const routeFromHash = (): Route => {
  const hash = window.location.hash.replace('#/', '').replace('#', '');
  const valid: Route[] = ['home', 'about', 'products', 'gallery', 'contact', 'admin/products'];
  return (valid.includes(hash as Route) ? hash : 'home') as Route;
};

export function useRoute(): [Route, (r: Route) => void] {
  const [route, setRoute] = useState<Route>(routeFromHash);

  useEffect(() => {
    const onHash = () => {
      setRoute(routeFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (r: Route) => {
    window.location.hash = `/${r}`;
  };

  return [route, navigate];
}
