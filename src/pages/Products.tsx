import { useState, useMemo } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { ProductCard } from '@/components/ProductCard';
import { products, categories } from '@/data/boutique';

export function Products() {
  const [active, setActive] = useState<string>('all');

  const filters = [{ id: 'all', name: 'All' }, ...categories.map((c) => ({ id: c.id, name: c.name }))];

  const filtered = useMemo(() => {
    if (active === 'all') return products;
    return products.filter((p) => p.category === active);
  }, [active]);

  return (
    <div className="pt-16">
      {/* Page header */}
      <section className="bg-ink-100/50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 text-center lg:px-10">
          <p className="text-xs uppercase tracking-ultra-wide text-rose-500">Our Collection</p>
          <h1 className="mt-2 font-serif text-5xl font-light text-ink-900 lg:text-6xl">
            Products
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-ink-500">
            Explore our full range of curated pieces, from flowing dresses to handcrafted
            accessories. Tap any item to enquire on WhatsApp.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-16 z-30 border-b border-ink-100 bg-ink-50/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-x-auto px-5 py-4 lg:px-10">
          <SlidersHorizontal className="h-4 w-4 shrink-0 text-ink-400" />
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={`shrink-0 rounded-full px-5 py-2 text-xs uppercase tracking-wider transition-all ${
                active === f.id
                  ? 'bg-rose-500 text-white'
                  : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-10 lg:py-16">
        <p className="mb-8 text-sm text-ink-400">
          Showing {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
        </p>
        <div className="grid grid-cols-2 gap-5 md:gap-6 lg:grid-cols-4">
          {filtered.map((product, i) => (
            <Reveal key={product.id} delay={(i % 4) * 80}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-ink-400">No products in this category yet. Check back soon!</p>
          </div>
        )}
      </section>
    </div>
  );
}
