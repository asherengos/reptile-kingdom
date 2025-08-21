import React, { useState } from 'react';

// Helper to build a srcset string for responsive images
export const getSrcset = (images) => {
  if (!images || !images.desktop) return '';
  const base = images.desktop;
  // Provide three width descriptors. In static hosting this can map to same URL; CDNs can rewrite if configured.
  return `${base} 400w, ${base} 800w, ${base} 1200w`;
};

const ResponsiveImage = ({ images = {}, alt = '', caption = '', sizes = '(max-width:600px) 100vw, 50vw', className = '' }) => {
  const [loaded, setLoaded] = useState(false);
  const hasImage = images && (images.desktop || images.mobile);
  const src = images?.mobile || images?.desktop || '/images/placeholder.webp';
  const srcSet = getSrcset(images);

  return (
    <figure className={`relative ${className}`} aria-label={alt || images?.alt || 'image'}>
      {/* LQIP/blurhash placeholder */}
      {!loaded && (images?.lqip || images?.blurhash) && (
        <div
          className="absolute inset-0 bg-cover bg-center rounded-2xl animate-pulse"
          style={{ backgroundImage: `url(${images.lqip || images.blurhash})`, filter: 'blur(10px)' }}
          aria-hidden="true"
        />
      )}

      {/* Fallback placeholder when no image available */}
      {!hasImage && (
        <div className="w-full h-48 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500">
          🖼️
        </div>
      )}

      {hasImage && (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt || images?.alt || ''}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`w-full h-auto rounded-2xl transition-transform duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {caption && (
        <figcaption className="sr-only">{caption}</figcaption>
      )}
    </figure>
  );
};

export default ResponsiveImage;


