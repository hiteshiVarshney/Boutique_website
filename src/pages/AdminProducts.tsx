import { useState, useEffect } from 'react';
import { Package, Plus, Loader2, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { getProducts, createProduct } from '@/api/client';
import { getCategories } from '@/api/client';
import type { Product, Category } from '@/data/boutique';
import type { Route } from '@/hooks/useRoute';

type AdminProductsProps = {
  navigate: (r: Route) => void;
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function AdminProducts({ navigate }: AdminProductsProps) {
  const [form, setForm] = useState({ name: '', category: '', price: '', image: '', tag: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  const loadProducts = () => {
    setLoadingList(true);
    getProducts()
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoadingList(false));
  };

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
    loadProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      await createProduct({
        name: form.name,
        category: form.category,
        price: Number(form.price),
        image: form.image,
        tag: form.tag || undefined,
      });
      setStatus('success');
      setForm({ name: '', category: '', price: '', image: '', tag: '' });
      loadProducts();
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to create product');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-ink-50 pt-16">
      <div className="mx-auto max-w-5xl px-5 py-10 lg:px-10">
        {/* Back link + heading */}
        <button
          onClick={() => navigate('home')}
          className="mb-6 flex items-center gap-1.5 text-sm text-ink-500 transition-colors hover:text-rose-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </button>

        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-light text-ink-900">Product Management</h1>
            <p className="text-sm text-ink-500">Add new products to your boutique catalog</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm lg:p-8">
              <h2 className="mb-5 font-serif text-xl font-medium text-ink-900">Add Product</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-wider text-ink-500">
                    Product Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-ink-200 bg-ink-50/50 px-4 py-2.5 text-sm text-ink-800 outline-none transition-colors focus:border-rose-400 focus:bg-white"
                    placeholder="Silk Wrap Dress"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-wider text-ink-500">
                    Category
                  </label>
                  <select
                    required
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full rounded-lg border border-ink-200 bg-ink-50/50 px-4 py-2.5 text-sm text-ink-800 outline-none transition-colors focus:border-rose-400 focus:bg-white"
                  >
                    <option value="">Select a category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-wider text-ink-500">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full rounded-lg border border-ink-200 bg-ink-50/50 px-4 py-2.5 text-sm text-ink-800 outline-none transition-colors focus:border-rose-400 focus:bg-white"
                    placeholder="189"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-wider text-ink-500">
                    Image URL
                  </label>
                  <input
                    type="url"
                    required
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="w-full rounded-lg border border-ink-200 bg-ink-50/50 px-4 py-2.5 text-sm text-ink-800 outline-none transition-colors focus:border-rose-400 focus:bg-white"
                    placeholder="https://images.pexels.com/..."
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs uppercase tracking-wider text-ink-500">
                    Tag <span className="text-ink-400">(optional)</span>
                  </label>
                  <select
                    value={form.tag}
                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                    className="w-full rounded-lg border border-ink-200 bg-ink-50/50 px-4 py-2.5 text-sm text-ink-800 outline-none transition-colors focus:border-rose-400 focus:bg-white"
                  >
                    <option value="">None</option>
                    <option value="New">New</option>
                    <option value="Bestseller">Bestseller</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-rose-500 px-6 py-3 text-sm uppercase tracking-wider text-white transition-all hover:bg-rose-600 hover:shadow-lg disabled:opacity-60"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      Add Product
                    </>
                  )}
                </button>

                {status === 'success' && (
                  <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    Product created successfully!
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-center gap-2 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {errorMsg}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Product list */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm lg:p-8">
              <h2 className="mb-5 font-serif text-xl font-medium text-ink-900">
                Existing Products
                <span className="ml-2 text-sm font-normal text-ink-400">({products.length})</span>
              </h2>

              {loadingList ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-rose-400" />
                </div>
              ) : products.length === 0 ? (
                <p className="py-12 text-center text-sm text-ink-400">No products yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-ink-100 text-xs uppercase tracking-wider text-ink-400">
                        <th className="pb-3 pr-4 font-medium">Image</th>
                        <th className="pb-3 pr-4 font-medium">Name</th>
                        <th className="pb-3 pr-4 font-medium">Category</th>
                        <th className="pb-3 pr-4 font-medium">Price</th>
                        <th className="pb-3 font-medium">Tag</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink-50">
                      {products.map((p) => (
                        <tr key={p.id} className="transition-colors hover:bg-ink-50/50">
                          <td className="py-3 pr-4">
                            <img
                              src={p.image}
                              alt={p.name}
                              loading="lazy"
                              className="h-12 w-12 rounded-lg object-cover"
                            />
                          </td>
                          <td className="py-3 pr-4 font-medium text-ink-900">{p.name}</td>
                          <td className="py-3 pr-4 text-ink-600">{p.category}</td>
                          <td className="py-3 pr-4 text-rose-600">${p.price}</td>
                          <td className="py-3">
                            {p.tag ? (
                              <span className="rounded-full bg-rose-500/10 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-rose-600">
                                {p.tag}
                              </span>
                            ) : (
                              <span className="text-ink-300">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
