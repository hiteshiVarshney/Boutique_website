import { useState, useEffect } from 'react';
import { ArrowRight, Star, Quote, Loader2 } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { ProductCard } from '@/components/ProductCard';
import { getProducts, getCategories, getTestimonials } from '@/api/client';
import { heroImage, boutiqueInfo } from '@/data/boutique';
import type { Route } from '@/hooks/useRoute';
import type { Product, Category, Testimonial } from '@/data/boutique';

type HomeProps = {
  navigate: (r: Route) => void;
};

export function Home({ navigate }: HomeProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(() => {});
    getCategories().then(setCategories).catch(() => {});
    getTestimonials().then(setTestimonials).catch(() => {});
  }, []);

  const featured = products.filter((p) => p.tag).concat(products.slice(0, 8)).slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Boutique hero" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-900/50 via-ink-900/30 to-ink-900/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center">
          <p className="mb-4 animate-fade-in text-xs uppercase tracking-ultra-wide text-white/80">
            Est. 2015 &middot; Paris
          </p>
          <h1 className="animate-fade-up text-balance font-serif text-5xl font-light leading-tight text-white sm:text-6xl lg:text-7xl">
            {boutiqueInfo.tagline}
          </h1>
          <p className="mx-auto mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-white/85 [animation-delay:200ms]">
            Discover hand-curated collections that celebrate femininity, craftsmanship, and
            effortless elegance for every moment of your life.
          </p>
          <div className="mt-9 flex animate-fade-up flex-col items-center justify-center gap-4 [animation-delay:400ms] sm:flex-row">
            <button
              onClick={() => navigate('products')}
              className="group flex items-center gap-2 rounded-full bg-rose-500 px-8 py-3.5 text-sm uppercase tracking-wider text-white transition-all hover:bg-rose-600 hover:shadow-lg"
            >
              Shop Collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => navigate('gallery')}
              className="rounded-full border border-white/60 px-8 py-3.5 text-sm uppercase tracking-wider text-white transition-all hover:bg-white hover:text-ink-900"
            >
              View Lookbook
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex h-12 w-7 items-start justify-center rounded-full border-2 border-white/40 p-1.5">
            <div className="h-2 w-1 animate-bounce rounded-full bg-white/70" />
          </div>
        </div>
      </section>

      {/* Marquee banner */}
      <div className="overflow-hidden bg-ink-900 py-3.5">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array(4).fill(0).map((_, i) => (
            <span key={i} className="mx-8 text-xs uppercase tracking-ultra-wide text-ink-300">
              Free Shipping Over $200 &middot; New Arrivals Weekly &middot; Personal Styling via WhatsApp &middot; Sustainable Fabrics &middot;
            </span>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <Reveal className="mb-14 text-center">
          <p className="text-xs uppercase tracking-ultra-wide text-rose-500">Browse by</p>
          <h2 className="mt-2 font-serif text-4xl font-light text-ink-900 lg:text-5xl">
            Shop Categories
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-ink-500">
            From everyday essentials to statement pieces, explore our curated collections
            designed for the modern woman.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 100}>
              <button
                onClick={() => navigate('products')}
                className="group relative block w-full overflow-hidden rounded-2xl"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                  <h3 className="font-serif text-2xl font-medium text-white">{cat.name}</h3>
                  <p className="mt-1 text-sm text-white/70">{cat.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-rose-300 transition-all group-hover:gap-3">
                    Explore <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-ink-100/60 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal className="mb-14 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div>
              <p className="text-xs uppercase tracking-ultra-wide text-rose-500">Handpicked for you</p>
              <h2 className="mt-2 font-serif text-4xl font-light text-ink-900 lg:text-5xl">
                Featured Collection
              </h2>
            </div>
            <button
              onClick={() => navigate('products')}
              className="group flex items-center gap-2 text-sm uppercase tracking-wider text-ink-700 transition-colors hover:text-rose-600"
            >
              View All
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Reveal>

          <div className="grid grid-cols-2 gap-5 md:gap-6 lg:grid-cols-4">
            {featured.length > 0 ? (
              featured.map((product, i) => (
                <Reveal key={product.id} delay={(i % 4) * 80}>
                  <ProductCard product={product} />
                </Reveal>
              ))
            ) : (
              <div className="col-span-full flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-rose-400" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Editorial split */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://images.pexels.com/photos/6070168/pexels-photo-6070168.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200"
                alt="Editorial fashion"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div>
              <p className="text-xs uppercase tracking-ultra-wide text-rose-500">Our Philosophy</p>
              <h2 className="mt-3 font-serif text-4xl font-light leading-tight text-ink-900 lg:text-5xl">
                Fashion that tells your story
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-600">
                We believe every woman deserves to feel extraordinary. Our collections are
                sourced from independent designers and crafted with sustainable materials,
                ensuring each piece is as kind to the planet as it is beautiful.
              </p>
              <p className="mt-4 leading-relaxed text-ink-500">
                From the first stitch to the final fitting, we obsess over the details so
                you don't have to. This is more than fashion — it's a celebration of you.
              </p>
              <button
                onClick={() => navigate('about')}
                className="mt-8 group flex items-center gap-2 rounded-full border border-ink-300 px-7 py-3 text-sm uppercase tracking-wider text-ink-700 transition-all hover:border-rose-500 hover:text-rose-600"
              >
                Our Story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-ink-900 py-20 text-white lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <Reveal className="mb-14 text-center">
            <p className="text-xs uppercase tracking-ultra-wide text-rose-300">Loved by women worldwide</p>
            <h2 className="mt-2 font-serif text-4xl font-light lg:text-5xl">
              What Our Clients Say
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 120}>
                <figure className="relative rounded-2xl bg-ink-800/60 p-8 transition-colors hover:bg-ink-800">
                  <Quote className="mb-4 h-8 w-8 text-rose-400/50" />
                  <div className="mb-4 flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <blockquote className="text-sm leading-relaxed text-ink-200">
                    "{t.text}"
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      loading="lazy"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-serif text-lg text-white">{t.name}</p>
                      <p className="text-xs text-ink-400">{t.location}</p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/6069967/pexels-photo-6069967.jpeg?auto=compress&cs=tinysrgb&h=800&w=1920"
            alt="CTA background"
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-ink-900/70" />
        </div>
        <div className="relative z-10 mx-auto max-w-2xl px-5 py-24 text-center lg:py-32">
          <Reveal>
            <h2 className="font-serif text-4xl font-light text-white lg:text-5xl">
              Ready to find your next favourite piece?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/80">
              Chat with our personal stylists on WhatsApp for tailored recommendations
              and exclusive offers.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={() => navigate('contact')}
                className="rounded-full bg-rose-500 px-8 py-3.5 text-sm uppercase tracking-wider text-white transition-all hover:bg-rose-600 hover:shadow-lg"
              >
                Get in Touch
              </button>
              <a
                href={boutiqueInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/50 px-8 py-3.5 text-sm uppercase tracking-wider text-white transition-all hover:bg-white hover:text-ink-900"
              >
                WhatsApp Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
