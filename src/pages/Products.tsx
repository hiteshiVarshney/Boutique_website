import { useState, useMemo, useEffect } from 'react';
import { SlidersHorizontal, Loader2, AlertCircle } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { ProductCard } from '@/components/ProductCard';
import { getProducts, getProductsByCategory, getCategories } from '@/api/client';
import type { Product, Category } from '@/data/boutique';

export function Products() {
  const [active, setActive] = useState<string>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetcher = active === 'all' ? getProducts() : getProductsByCategory(active);
    fetcher
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [active]);

  const filters = [{ id: 'all', name: 'All' }, ...categories.map((c) => ({ id: c.id, name: c.name }))];

  const filtered = useMemo(() => products, [products]);

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
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-rose-400" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
            <AlertCircle className="h-8 w-8 text-rose-400" />
            <p className="text-sm text-ink-500">Could not load products. Please try again later.</p>
          </div>
        ) : (
          <>
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
          </>
        )}
      </section>
    </div>
  );
}
