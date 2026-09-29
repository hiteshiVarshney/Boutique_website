import { Check, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { aboutHeroImage, boutiqueInterior, boutiqueInfo } from '@/data/boutique';
import type { Route } from '@/hooks/useRoute';

type AboutProps = {
  navigate: (r: Route) => void;
};

const values = [
  { title: 'Craftsmanship', desc: 'Every garment is selected for its quality of fabric, cut, and construction.' },
  { title: 'Sustainability', desc: 'We partner with designers who prioritize ethical and eco-conscious production.' },
  { title: 'Individuality', desc: 'Our stylists help you find pieces that reflect your unique personality.' },
  { title: 'Community', desc: 'A welcoming space where every woman feels seen, valued, and celebrated.' },
];

const stats = [
  { number: '10K+', label: 'Happy Clients' },
  { number: '500+', label: 'Curated Pieces' },
  { number: '50+', label: 'Designers' },
  { number: '9', label: 'Years of Style' },
];

export function About({ navigate }: AboutProps) {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={aboutHeroImage} alt="About us" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-ink-900/55" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-5 text-center">
          <p className="mb-3 animate-fade-in text-xs uppercase tracking-ultra-wide text-white/80">
            Our Story
          </p>
          <h1 className="animate-fade-up font-serif text-5xl font-light text-white lg:text-6xl">
            A Boutique Born from Passion
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-2xl">
              <img
                src={boutiqueInterior}
                alt="Boutique interior"
                loading="lazy"
                className="aspect-[5/4] w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div>
              <p className="text-xs uppercase tracking-ultra-wide text-rose-500">How it began</p>
              <h2 className="mt-3 font-serif text-4xl font-light leading-tight text-ink-900 lg:text-5xl">
                From a small atelier to a beloved destination
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-600">
                {boutiqueInfo.name} started in 2015 as a tiny atelier in the heart of Paris,
                founded by a mother-daughter duo with a shared love for timeless fashion.
                What began as a passion project quickly grew into a destination for women
                seeking pieces that transcended trends.
              </p>
              <p className="mt-4 leading-relaxed text-ink-500">
                Today, we curate collections from over 50 independent designers, each chosen
                for their commitment to quality, sustainability, and the art of slow fashion.
                Our doors are open, our WhatsApp is always on, and our mission remains the same:
                to help every woman who walks in feel like the best version of herself.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-ink-100/60 py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80} className="text-center">
                <p className="font-serif text-4xl font-light text-rose-600 lg:text-5xl">
                  {s.number}
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-ink-500">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <Reveal className="mb-14 text-center">
          <p className="text-xs uppercase tracking-ultra-wide text-rose-500">What we stand for</p>
          <h2 className="mt-2 font-serif text-4xl font-light text-ink-900 lg:text-5xl">
            Our Core Values
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 100}>
              <div className="rounded-2xl border border-ink-100 p-7 transition-all hover:border-rose-300 hover:shadow-lg">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                  <Check className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-xl font-medium text-ink-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team / invitation */}
      <section className="bg-ink-900 py-20 text-white lg:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <Reveal>
            <h2 className="font-serif text-4xl font-light lg:text-5xl">
              Come visit our boutique
            </h2>
            <p className="mx-auto mt-4 max-w-md text-ink-300">
              {boutiqueInfo.address}. We would love to help you find your next favourite piece.
            </p>
            <button
              onClick={() => navigate('contact')}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-rose-500 px-8 py-3.5 text-sm uppercase tracking-wider text-white transition-all hover:bg-rose-600"
            >
              Plan Your Visit
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
