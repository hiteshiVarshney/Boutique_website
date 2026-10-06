import type { Product, Category, Testimonial, GalleryImage } from '@/data/boutique';
import { products as seedProducts, categories as seedCategories } from '@/data/boutique';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

// In-memory fallback store for preview environments without a running backend.
// Initialized from the static seed data; used only when the API is unreachable.
let fallbackProducts: Product[] = [...seedProducts];
const fallbackCategories: Category[] = [...seedCategories];

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, options);
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(body.error || `Request failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
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

export function createProduct(data: Omit<Product, 'id'>): Promise<Product> {
  return request<Product>('/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).catch(() => {
    const nextId = fallbackProducts.length > 0
      ? Math.max(...fallbackProducts.map((p) => p.id)) + 1
      : 1;
    const product: Product = {
      id: nextId,
      name: data.name,
      category: data.category,
      price: data.price,
      image: data.image,
      tag: data.tag,
    };
    fallbackProducts = [...fallbackProducts, product];
    return product;
  });
}

export function sendContactMessage(data: ContactPayload): Promise<{ success: boolean; id: string }> {
  return request<{ success: boolean; id: string }>('/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}
