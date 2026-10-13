import type { Product, Category, Testimonial, GalleryImage } from '@/data/boutique';
import { products as seedProducts, categories as seedCategories } from '@/data/boutique';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

// In-memory fallback store for preview environments without a running backend.
// Initialized from the static seed data; used only for public GET endpoints
// when the API is unreachable. Protected write operations never fall back.
let fallbackProducts: Product[] = [...seedProducts];
const fallbackCategories: Category[] = [...seedCategories];

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...options,
      credentials: 'include',
    });
  } catch {
    // Network-level failure: backend is genuinely unreachable.
    throw new ApiUnreachableError('Cannot connect to the backend server.');
  }
  if (!res.ok) {
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new ApiUnreachableError('Cannot connect to the backend server.');
    }
    const body = await res.json().catch(() => ({ error: `Request failed with status ${res.status}` }));
    throw new Error(body.error || `Request failed with status ${res.status}`);
  }
  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new ApiUnreachableError('Cannot connect to the backend server.');
  }
  return res.json() as Promise<T>;
}

class ApiUnreachableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiUnreachableError';
  }
}

// Returns true only when the error indicates the backend itself could not be
// reached (network failure), not when the backend returned an HTTP error.
function isUnreachable(err: unknown): boolean {
  return err instanceof ApiUnreachableError;
}

export function getProducts(): Promise<Product[]> {
  return request<Product[]>('/products').catch(() => [...fallbackProducts]);
}

export function getProductsByCategory(category: string): Promise<Product[]> {
  return request<Product[]>(`/products/${category}`).catch(
    () => fallbackProducts.filter((p) => p.category === category),
  );
}

export function getCategories(): Promise<Category[]> {
  return request<Category[]>('/categories').catch(() => [...fallbackCategories]);
}

export function getGallery(): Promise<GalleryImage[]> {
  return request<GalleryImage[]>('/gallery');
}

export function getTestimonials(): Promise<Testimonial[]> {
  return request<Testimonial[]>('/testimonials');
}

export type CreateProductResult = {
  product: Product;
  persisted: boolean;
};

export function createProduct(data: Omit<Product, 'id'>): Promise<CreateProductResult> {
  return request<Product>('/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((product) => ({ product, persisted: true }))
    .catch((err) => {
      if (!isUnreachable(err)) {
        throw err;
      }
      throw new Error(
        'Cannot connect to the backend server. Product management requires the backend to be running with authentication configured.',
      );
    });
}

export function updateProduct(id: number, data: Omit<Product, 'id'>): Promise<UpdateProductResult> {
  return request<Product>(`/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((product) => ({ product, persisted: true }))
    .catch((err) => {
      if (!isUnreachable(err)) {
        throw err;
      }
      throw new Error(
        'Cannot connect to the backend server. Product management requires the backend to be running with authentication configured.',
      );
    });
}

export type UpdateProductResult = {
  product: Product;
  persisted: boolean;
};

export type DeleteProductResult = {
  success: boolean;
  persisted: boolean;
};

export function deleteProduct(id: number): Promise<DeleteProductResult> {
  return request<{ success: boolean; id: number }>(`/products/${id}`, {
    method: 'DELETE',
  })
    .then(() => ({ success: true, persisted: true }))
    .catch((err) => {
      if (!isUnreachable(err)) {
        throw err;
      }
      throw new Error(
        'Cannot connect to the backend server. Product management requires the backend to be running with authentication configured.',
      );
    });
}

export function sendContactMessage(data: ContactPayload): Promise<{ success: boolean; id: string }> {
  return request<{ success: boolean; id: string }>('/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}
