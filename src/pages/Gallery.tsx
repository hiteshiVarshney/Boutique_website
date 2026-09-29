import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { galleryImages } from '@/data/boutique';

export function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const next = useCallback(() => {
    setLightbox((cur) => (cur === null ? cur : (cur + 1) % galleryImages.length));
  }, []);
  const prev = useCallback(() => {
    setLightbox((cur) => (cur === null ? cur : (cur - 1 + galleryImages.length) % galleryImages.length));
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, close, next, prev]);

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-ink-100/50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 text-center lg:px-10">
          <p className="text-xs uppercase tracking-ultra-wide text-rose-500">Visual Diary</p>
          <h1 className="mt-2 font-serif text-5xl font-light text-ink-900 lg:text-6xl">
            Gallery
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-ink-500">
            A glimpse into our world — from editorial shoots to candid moments inside the
            boutique. Click any image to view it full size.
          </p>
        </div>
      </section>

      {/* Masonry grid */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-10 lg:py-16">
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {galleryImages.map((img, i) => (
            <Reveal key={i} delay={(i % 4) * 60}>
              <button
                onClick={() => setLightbox(i)}
                className="group relative block w-full overflow-hidden rounded-xl"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    i % 3 === 0 ? 'aspect-[3/4]' : i % 3 === 1 ? 'aspect-square' : 'aspect-[4/5]'
                  }`}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-ink-900/0 transition-colors duration-300 group-hover:bg-ink-900/30">
                  <ZoomIn className="h-7 w-7 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/90 backdrop-blur-sm animate-fade-in"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 lg:left-8"
            aria-label="Previous"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <figure className="mx-16 max-h-[85vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].alt}
              className="max-h-[85vh] w-auto rounded-lg object-contain animate-scale-in"
            />
            <figcaption className="mt-4 text-center text-sm text-white/70">
              {galleryImages[lightbox].alt} &middot; {lightbox + 1} / {galleryImages.length}
            </figcaption>
          </figure>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 lg:right-8"
            aria-label="Next"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>
      )}
    </div>
  );
}
