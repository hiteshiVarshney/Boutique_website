import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { boutiqueInfo } from '@/data/boutique';
import type { Route } from '@/hooks/useRoute';

const navItems: { label: string; route: Route }[] = [
  { label: 'Home', route: 'home' },
  { label: 'About', route: 'about' },
  { label: 'Products', route: 'products' },
  { label: 'Gallery', route: 'gallery' },
  { label: 'Contact', route: 'contact' },
];

type NavbarProps = {
  current: Route;
  navigate: (r: Route) => void;
};

export function Navbar({ current, navigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (r: Route) => {
    navigate(r);
    setOpen(false);
  };

  const isHome = current === 'home';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? 'bg-ink-50/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
        {/* Logo */}
        <button
          onClick={() => go('home')}
          className="group flex flex-col items-start leading-none"
        >
          <span
            className={`font-serif text-2xl font-semibold tracking-wide transition-colors ${
              scrolled || !isHome ? 'text-ink-900' : 'text-white'
            }`}
          >
            {boutiqueInfo.name}
          </span>
          <span
            className={`mt-0.5 text-[10px] uppercase tracking-ultra-wide transition-colors ${
              scrolled || !isHome ? 'text-rose-500' : 'text-white/80'
            }`}
          >
            Women's Boutique
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <li key={item.route}>
              <button
                onClick={() => go(item.route)}
                className={`relative text-sm uppercase tracking-wider transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-rose-500 after:transition-all after:duration-300 ${
                  current === item.route
                    ? 'after:w-full'
                    : 'after:w-0 hover:after:w-full'
                } ${
                  scrolled || !isHome
                    ? 'text-ink-700 hover:text-rose-600'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <button
            onClick={() => go('products')}
            className="flex items-center gap-2 rounded-full border border-rose-500 px-5 py-2 text-sm uppercase tracking-wider text-rose-600 transition-colors hover:bg-rose-500 hover:text-white"
          >
            <ShoppingBag className="h-4 w-4" />
            Shop
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden ${scrolled || !isHome ? 'text-ink-800' : 'text-white'}`}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-ink-50 transition-all duration-300 lg:hidden ${
          open ? 'max-h-96 border-t border-ink-100' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {navItems.map((item) => (
            <li key={item.route}>
              <button
                onClick={() => go(item.route)}
                className={`block w-full py-3 text-left font-serif text-lg transition-colors ${
                  current === item.route
                    ? 'text-rose-600'
                    : 'text-ink-700 hover:text-rose-500'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
