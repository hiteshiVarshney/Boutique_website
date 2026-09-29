import { ShoppingBag } from 'lucide-react';
import { boutiqueInfo } from '@/data/boutique';
import type { Product } from '@/data/boutique';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const waLink = `${boutiqueInfo.whatsappLink}&text=I%27m%20interested%20in%20the%20${encodeURIComponent(
    product.name
  )}%20($${product.price}).`;

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 hover:shadow-xl">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
            {product.tag}
          </span>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-ink-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-4 flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-ink-900 transition-transform duration-300 translate-y-4 group-hover:translate-y-0 hover:bg-rose-500 hover:text-white"
          >
            <ShoppingBag className="h-4 w-4" />
            Enquire
          </a>
        </div>
      </div>

      {/* Details */}
      <div className="px-5 py-4 text-center">
        <p className="text-[10px] uppercase tracking-ultra-wide text-ink-400">
          {product.category}
        </p>
        <h3 className="mt-1 font-serif text-lg font-medium text-ink-900">
          {product.name}
        </h3>
        <p className="mt-1.5 text-rose-600 font-medium">${product.price}</p>
      </div>
    </div>
  );
}
