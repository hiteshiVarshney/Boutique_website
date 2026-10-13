import { useState, useEffect, useRef } from 'react';
import { Package, Plus, Loader2, CheckCircle2, AlertCircle, ArrowLeft, Upload, X, Pencil, Trash2 } from 'lucide-react';
import { getProducts, createProduct, updateProduct, deleteProduct, getCategories } from '@/api/client';
import type { Product, Category } from '@/data/boutique';
import type { Route } from '@/hooks/useRoute';

type AdminProductsProps = {
  navigate: (r: Route) => void;
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function AdminProducts({ navigate }: AdminProductsProps) {
  const [form, setForm] = useState({ name: '', category: '', price: '', tag: '' });
  const [imagePreview, setImagePreview] = useState('');
  const [imageFileName, setImageFileName] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [listError, setListError] = useState('');
  const [loadingCats, setLoadingCats] = useState(true);
  const [catError, setCatError] = useState('');
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadProducts = () => {
    setLoadingList(true);
    setListError('');
    getProducts()
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        setListError(err instanceof Error ? err.message : 'Failed to load products');
        setProducts([]);
      })
      .finally(() => setLoadingList(false));
  };

  const loadCategories = () => {
    setLoadingCats(true);
    setCatError('');
    getCategories()
      .then((data) => {
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        setCatError(err instanceof Error ? err.message : 'Failed to load categories');
        setCategories([]);
      })
      .finally(() => setLoadingCats(false));
  };

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select an image file.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
      return;
    }

    setImageFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImagePreview('');
    setImageFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const resetForm = () => {
    setForm({ name: '', category: '', price: '', tag: '' });
    clearImage();
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      tag: product.tag || '',
    });
    setImagePreview(product.image);
    setImageFileName('');
    setStatus('idle');
    setErrorMsg('');
    setSuccessMsg('');
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    resetForm();
  };

  const handleDelete = async () => {
    if (!productToDelete || deleting) return;

    setDeleting(true);
    setDeleteError('');

    try {
      const { persisted } = await deleteProduct(productToDelete.id);
      if (persisted) {
        setSuccessMsg('Product deleted successfully!');
        setStatus('success');
      } else {
        setSuccessMsg('Backend unavailable — product removed in preview only (not deleted from MongoDB).');
        setStatus('success');
      }
      setProductToDelete(null);
      loadProducts();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete product');
    } finally {
      setDeleting(false);
    }
  };

  const cancelDelete = () => {
    setProductToDelete(null);
    setDeleteError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imagePreview) {
      setStatus('error');
      setErrorMsg('Please select a product image.');
      setTimeout(() => setStatus('idle'), 4000);
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      // TODO: Replace with Cloudinary upload. For now, send the data URL directly
      // so the backend's image string field works without a storage service.
      const imageUrl = imagePreview;
      const payload = {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        image: imageUrl,
        tag: form.tag || undefined,
      };

      if (editingProduct) {
        const { persisted } = await updateProduct(editingProduct.id, payload);
        setStatus('success');
        setSuccessMsg(
          persisted
            ? 'Product updated successfully!'
            : 'Backend unavailable — product updated in preview only (not persisted to MongoDB).',
        );
      } else {
        const { persisted } = await createProduct(payload);
        setStatus('success');
        setSuccessMsg(
          persisted
            ? 'Product saved to MongoDB successfully!'
            : 'Backend unavailable — product saved in preview only (not persisted to MongoDB).',
        );
      }

      cancelEdit();
      loadProducts();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to save product');
      setTimeout(() => setStatus('idle'), 5000);
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
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-serif text-xl font-medium text-ink-900">
                  {editingProduct ? 'Edit Product' : 'Add Product'}
                </h2>
                {editingProduct && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="text-sm text-ink-400 transition-colors hover:text-rose-500"
                  >
                    Cancel
                  </button>
                )}
              </div>
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
                  {loadingCats ? (
                    <div className="flex items-center gap-2 py-2.5 text-sm text-ink-400">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading categories...
                    </div>
                  ) : catError ? (
                    <div className="flex items-center gap-2 rounded-lg bg-rose-50 px-3 py-2.5 text-sm text-rose-600">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {catError}
                    </div>
                  ) : (
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
                  )}
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
                    Product Image
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {!imagePreview ? (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-ink-200 bg-ink-50/50 px-4 py-8 text-sm text-ink-400 transition-colors hover:border-rose-400 hover:text-rose-500"
                    >
                      <Upload className="h-6 w-6" />
                      Choose Image
                    </button>
                  ) : (
                    <div className="relative overflow-hidden rounded-lg border border-ink-200">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="aspect-[3/4] w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-ink-900/70 text-white transition-colors hover:bg-ink-900"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <p className="truncate bg-ink-900/60 px-3 py-1.5 text-xs text-white">
                        {imageFileName}
                      </p>
                    </div>
                  )}
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
                    {successMsg}
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
              ) : listError ? (
                <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                  <AlertCircle className="h-8 w-8 text-rose-400" />
                  <p className="text-sm text-rose-600">{listError}</p>
                  <button
                    onClick={loadProducts}
                    className="text-sm text-ink-500 underline transition-colors hover:text-rose-500"
                  >
                    Try again
                  </button>
                </div>
              ) : products.length === 0 ? (
                <p className="py-12 text-center text-sm text-ink-400">No products yet.</p>
              ) : (
                <div className="overflow-hidden">
                  <table className="w-full table-fixed text-left text-sm">
                    <thead>
                      <tr className="border-b border-ink-100 text-xs uppercase tracking-wider text-ink-400">
                        <th className="w-16 pb-3 pr-2 font-medium">Image</th>
                        <th className="pb-3 pr-3 font-medium">Name</th>
                        <th className="hidden pb-3 pr-3 font-medium sm:table-cell">Category</th>
                        <th className="w-20 pb-3 pr-3 font-medium">Price</th>
                        <th className="hidden w-24 pb-3 pr-3 font-medium md:table-cell">Tag</th>
                        <th className="w-28 pb-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink-50">
                      {products.map((p) => (
                        <tr key={p.id} className="transition-colors hover:bg-ink-50/50">
                          <td className="py-3 pr-2">
                            <img
                              src={p.image}
                              alt={p.name}
                              loading="lazy"
                              className="h-10 w-10 rounded-lg object-cover"
                            />
                          </td>
                          <td className="truncate py-3 pr-3 font-medium text-ink-900">{p.name}</td>
                          <td className="hidden truncate py-3 pr-3 text-ink-600 sm:table-cell">{p.category}</td>
                          <td className="py-3 pr-3 text-rose-600">${p.price}</td>
                          <td className="hidden py-3 pr-3 md:table-cell">
                            {p.tag ? (
                              <span className="rounded-full bg-rose-500/10 px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-rose-600">
                                {p.tag}
                              </span>
                            ) : (
                              <span className="text-ink-300">&mdash;</span>
                            )}
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => startEdit(p)}
                                className="flex items-center gap-1 text-sm text-ink-500 transition-colors hover:text-rose-500"
                              >
                                <Pencil className="h-3.5 w-3.5" />
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  setProductToDelete(p);
                                  setDeleteError('');
                                }}
                                className="flex items-center gap-1 text-sm text-ink-400 transition-colors hover:text-rose-600"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                Delete
                              </button>
                            </div>
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

      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <Trash2 className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-ink-900">Delete Product</h3>
            </div>
            <p className="mb-2 text-sm text-ink-600">
              Are you sure you want to delete{' '}
              <span className="font-medium text-ink-900">{productToDelete.name}</span>?
            </p>
            <p className="mb-5 text-sm text-ink-500">
              This action is permanent and cannot be undone. The product will be removed from MongoDB.
            </p>
            {deleteError && (
              <div className="mb-4 flex items-center gap-2 rounded-lg bg-rose-50 px-3 py-2.5 text-sm text-rose-600">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {deleteError}
              </div>
            )}
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                disabled={deleting}
                className="rounded-full border border-ink-200 px-5 py-2.5 text-sm text-ink-600 transition-colors hover:bg-ink-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-2 rounded-full bg-rose-500 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-rose-600 disabled:opacity-60"
              >
                {deleting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Delete Permanently
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
