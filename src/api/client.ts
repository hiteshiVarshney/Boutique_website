import type { Product, Category, Testimonial, GalleryImage } from '@/data/boutique';

const API_BASE = 'http://localhost:5001/api';

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, options);
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(body.error || `Request failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function getProducts(): Promise<Product[]> {
  return request<Product[]>('/products');
}

export function getProductsByCategory(category: string): Promise<Product[]> {
  return request<Product[]>(`/products/${category}`);
}

export function getCategories(): Promise<Category[]> {
  return request<Category[]>('/categories');
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
  });
}

export function sendContactMessage(data: ContactPayload): Promise<{ success: boolean; id: string }> {
  return request<{ success: boolean; id: string }>('/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}
