import { Instagram, Facebook, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { boutiqueInfo } from '@/data/boutique';
import type { Route } from '@/hooks/useRoute';

type FooterProps = {
  navigate: (r: Route) => void;
};

export function Footer({ navigate }: FooterProps) {
  const links: { label: string; route: Route }[] = [
    { label: 'Home', route: 'home' },
    { label: 'About', route: 'about' },
    { label: 'Products', route: 'products' },
    { label: 'Gallery', route: 'gallery' },
    { label: 'Contact', route: 'contact' },
  ];

  return (
    <footer className="bg-ink-900 text-ink-200">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl font-semibold text-white">
              {boutiqueInfo.name}
            </h3>
            <p className="mt-1 text-xs uppercase tracking-ultra-wide text-rose-300">
              Women's Boutique
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-300">
              Curating timeless fashion for the modern woman. Each piece is
              thoughtfully selected to help you feel elegant, confident, and
              uniquely yourself.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-xs uppercase tracking-ultra-wide text-rose-300">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.route}>
                  <button
                    onClick={() => navigate(l.route)}
                    className="text-sm text-ink-300 transition-colors hover:text-white"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-xs uppercase tracking-ultra-wide text-rose-300">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-ink-300">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                <span>{boutiqueInfo.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{boutiqueInfo.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{boutiqueInfo.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{boutiqueInfo.hours}</span>
              </li>
            </ul>
          </div>

          {/* Social + newsletter */}
          <div>
            <h4 className="mb-4 text-xs uppercase tracking-ultra-wide text-rose-300">
              Follow & Connect
            </h4>
            <div className="mb-5 flex gap-3">
              <a
                href={boutiqueInfo.socials.instagram}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-600 transition-colors hover:border-rose-400 hover:bg-rose-500 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={boutiqueInfo.socials.facebook}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-600 transition-colors hover:border-rose-400 hover:bg-rose-500 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <button
              onClick={() => navigate('contact')}
              className="rounded-full bg-rose-500 px-5 py-2.5 text-sm uppercase tracking-wider text-white transition-colors hover:bg-rose-600"
            >
              Visit Us
            </button>
          </div>
        </div>

        <div className="mt-12 border-t border-ink-700 pt-6 text-center">
          <p className="text-xs text-ink-400">
            &copy; {new Date().getFullYear()} {boutiqueInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
